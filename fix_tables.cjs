const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  if (!fs.existsSync(dir)) return;
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

let updatedFiles = 0;

walkDir('./src', function(filePath) {
  if (filePath.endsWith('.jsx') || filePath.endsWith('.tsx') || filePath.endsWith('.js')) {
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;

    // 1. Remove existing table-responsive wrappers so we can re-wrap cleanly
    content = content.replace(/<div\s+className=["']table-responsive["'][^>]*>\s*(<table\b[^>]*>[\s\S]*?<\/table>)\s*<\/div>/g, '$1');
    
    // 2. Remove any previous table-responsive-wrapper just in case of multiple runs
    content = content.replace(/<div\s+className=["']table-responsive-wrapper["'][^>]*>\s*(<table\b[^>]*>[\s\S]*?<\/table>)\s*<\/div>/g, '$1');

    // 3. Wrap all naked tables
    content = content.replace(/(<table\b[^>]*>[\s\S]*?<\/table>)/g, '<div className="table-responsive-wrapper">\n$1\n</div>');

    if (content !== original) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`Updated tables in: ${filePath}`);
      updatedFiles++;
    }
  }
});

console.log(`\nDone! Updated ${updatedFiles} files.`);
