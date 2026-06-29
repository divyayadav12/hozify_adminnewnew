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

            // Pattern: 
            // {/* =================================== */}
            //             TOP HEADER ROW (No Search Bar)
            //            ========================================== */}
            // We want to replace the first `}` with nothing, so it stays a block comment.
            // Wait, we can just replace `{/* =================================== */}` with `{/* ===================================` globally, 
            // BUT ONLY if there's a dangling `*/}` soon after.
            
            // Let's use a regex that matches `{/* =================================== */}` followed by up to 100 characters that include a `*/}`.
            content = content.replace(/\{\/\* =+ \*\/\}([\s\S]{1,150}?)\*\/\}/g, (match, p1) => {
                return `{/* ==========================================${p1}*/}`;
            });

            if (content !== original) {
                console.log(`Fixed syntax in ${fullPath}`);
                fs.writeFileSync(fullPath, content);
            }
        }
    }
}

console.log('Fixing syntax errors 3...');
fixSyntaxErrors(directoryToScan);
console.log('Finished fixing.');
