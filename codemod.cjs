const fs = require('fs');
const path = require('path');
const jscodeshift = require('jscodeshift');

const j = jscodeshift.withParser('tsx');

function transformFile(filePath) {
  const source = fs.readFileSync(filePath, 'utf8');
  if (!source.includes('<select')) return;

  const root = j(source);
  let hasSelect = false;

  // Find all <select> elements
  root.find(j.JSXElement, { openingElement: { name: { name: 'select' } } }).forEach(path => {
    hasSelect = true;
    const selectNode = path.node;
    const props = selectNode.openingElement.attributes || [];
    
    // Extract options
    const optionsArray = [];
    const children = selectNode.children || [];
    
    // Helper to get text from children recursively
    const getText = (childrenNodes) => {
      let text = '';
      childrenNodes.forEach(c => {
        if (c.type === 'JSXText') {
          text += c.value.trim();
        } else if (c.type === 'JSXExpressionContainer' && c.expression.type === 'StringLiteral') {
          text += c.expression.value;
        } else if (c.type === 'JSXElement' || c.type === 'JSXFragment') {
          text += getText(c.children);
        }
      });
      return text;
    };

    children.forEach(child => {
      if (child.type === 'JSXElement' && child.openingElement.name.name === 'option') {
        const optionProps = child.openingElement.attributes || [];
        let valueStr = '';
        let hasValueProp = false;
        
        optionProps.forEach(attr => {
          if (attr.type === 'JSXAttribute' && attr.name.name === 'value') {
            hasValueProp = true;
            if (attr.value && attr.value.type === 'StringLiteral') {
              valueStr = attr.value.value;
            } else if (attr.value && attr.value.type === 'JSXExpressionContainer') {
               // We will just stringify the expression
              if (attr.value.expression.type === 'StringLiteral') {
                valueStr = attr.value.expression.value;
              } else {
                 // For complex expressions, we might just use the raw source, but for simplicity let's assume it's simple
                valueStr = 'DYNAMIC_VALUE';
              }
            }
          }
        });
        
        const labelStr = getText(child.children);
        if (!hasValueProp) {
           valueStr = labelStr;
        }
        
        optionsArray.push({ label: labelStr, value: valueStr });
      }
    });

    // Create options array AST
    const optionsAst = j.arrayExpression(
      optionsArray.map(opt => j.objectExpression([
        j.property('init', j.identifier('label'), j.literal(opt.label)),
        j.property('init', j.identifier('value'), j.literal(opt.value))
      ]))
    );

    // If options are entirely dynamic (e.g., from a map), we keep the children and log it
    let hasDynamicOptions = false;
    children.forEach(c => {
      if (c.type === 'JSXExpressionContainer') {
        hasDynamicOptions = true;
      }
    });

    if (hasDynamicOptions) {
      console.log(`Skipping select in ${filePath} due to dynamic options`);
      hasSelect = false;
      return; // Skip replacing this specific select
    }

    // Modify the select tag
    selectNode.openingElement.name.name = 'Select';
    if (selectNode.closingElement) {
      selectNode.closingElement.name.name = 'Select';
    }
    
    // Add options prop
    props.push(j.jsxAttribute(j.jsxIdentifier('options'), j.jsxExpressionContainer(optionsAst)));
    
    // Clear children
    selectNode.children = [];
    selectNode.openingElement.selfClosing = true;
    selectNode.closingElement = null;
  });

  if (hasSelect) {
    // Add import statement if not exists
    const hasImport = root.find(j.ImportDeclaration).filter(p => {
      const sourcePath = p.node.source.value;
      return sourcePath.includes('Select') && p.node.specifiers.some(s => s.local && s.local.name === 'Select');
    }).length > 0;

    if (!hasImport) {
      // Calculate relative path to components/ui/Select
      const absoluteSelectPath = path.resolve(__dirname, 'src/components/ui/Select');
      const fileDir = path.dirname(filePath);
      let relativePath = path.relative(fileDir, absoluteSelectPath).replace(/\\/g, '/');
      if (!relativePath.startsWith('.')) relativePath = './' + relativePath;
      
      const importDecl = j.importDeclaration(
        [j.importDefaultSpecifier(j.identifier('Select'))],
        j.literal(relativePath)
      );
      
      const body = root.get().node.program.body;
      const lastImport = body.filter(node => node.type === 'ImportDeclaration').pop();
      
      if (lastImport) {
        body.splice(body.indexOf(lastImport) + 1, 0, importDecl);
      } else {
        body.unshift(importDecl);
      }
    }

    fs.writeFileSync(filePath, root.toSource(), 'utf8');
    console.log(`Updated ${filePath}`);
  }
}

function walkDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walkDir(fullPath);
    } else if (fullPath.endsWith('.jsx') || fullPath.endsWith('.tsx')) {
      try {
        transformFile(fullPath);
      } catch (err) {
        console.error(`Error transforming ${fullPath}: ${err.message}`);
      }
    }
  }
}

walkDir(path.join(__dirname, 'src'));
