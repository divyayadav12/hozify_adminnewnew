import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const directoryToScan = path.join(__dirname, 'src');

function fixSyntaxErrors(dir) {
    const files = fs.readdirSync(dir);

    for (const file of files) {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
            fixSyntaxErrors(fullPath);
        } else if (stat.isFile() && (fullPath.endsWith('.jsx') || fullPath.endsWith('.js'))) {
            let content = fs.readFileSync(fullPath, 'utf8');
            let original = content;

            // Fix the double */} issue that was introduced.
            // Pattern we created: {/* =================================== */}
            // Followed by whitespace and ===================== */}
            content = content.replace(/\{\/\* =+( )?\*\/}(\r?\n.*?\*\/})/g, (match, p1, p2) => {
                return `{/* ==========================================${p2}`;
            });

            // Also fix the BSPPartners.jsx Rogue </div>
            content = content.replace(/\/\/ =====================================================================\s+<\/div>/g, '// =====================================================================');

            if (content !== original) {
                console.log(`Fixed syntax in ${fullPath}`);
                fs.writeFileSync(fullPath, content);
            }
        }
    }
}

console.log('Fixing syntax errors...');
fixSyntaxErrors(directoryToScan);
console.log('Finished fixing.');
