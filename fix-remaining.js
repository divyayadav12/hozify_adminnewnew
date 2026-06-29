import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const srcDir = path.join(__dirname, 'src');

function fixFiles(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
            fixFiles(fullPath);
        } else if (stat.isFile() && fullPath.endsWith('.jsx')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            let original = content;

            // Fix the bad comment we injected
            content = content.replace(/\/\* REMOVED <\/div> \*\//g, '');
            
            if (content !== original) {
                console.log(`Fixed bad comment in ${fullPath}`);
                fs.writeFileSync(fullPath, content);
            }
        }
    }
}

console.log('Fixing bad comments...');
fixFiles(srcDir);

// Now read the log and add missing </div>
const logPath = "C:\\Users\\Shankar\\.gemini\\antigravity-ide\\brain\\cd57be2b-1265-4107-8aae-f2c4c8ebca78\\.system_generated\\tasks\\task-297.log";
if (fs.existsSync(logPath)) {
  const logContent = fs.readFileSync(logPath, 'utf8');
  const regex = /\[builtin:vite-transform\] Expected corresponding JSX closing tag for '([^']+)'.\s+╭─\[ (src\/[^:]+):(\d+):\d+ \]/g;
  let match;
  
  const editedFiles = new Set();
  
  while ((match = regex.exec(logContent)) !== null) {
    const tag = match[1];
    const file = match[2];
    const lineNum = parseInt(match[3], 10);
    
    if (editedFiles.has(file)) continue;

    const fullPath = path.join(__dirname, file);
    if (!fs.existsSync(fullPath)) continue;

    let content = fs.readFileSync(fullPath, 'utf8');
    const lines = content.split('\n');
    
    // If the error is expecting </div> at </AdminShell>, we add it.
    if (tag === 'div') {
       const targetLineIdx = lineNum - 1;
       if (targetLineIdx >= 0 && targetLineIdx < lines.length) {
           const lineContent = lines[targetLineIdx];
           if (lineContent.includes('</AdminShell>')) {
               console.log(`Adding missing </div> before </AdminShell> in ${file}`);
               lines[targetLineIdx] = lineContent.replace('</AdminShell>', '</div>\n</AdminShell>');
               fs.writeFileSync(fullPath, lines.join('\n'));
               editedFiles.add(file);
           }
       }
    }
  }
}

console.log('Done.');
