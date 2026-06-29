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

            // Fix 1: // =====================================================================              </div>
            content = content.replace(/\/\/ =====================================================================\s+<\/div>/g, '// =====================================================================');
            
            // Fix 2: {/* ===================================      </div>
            // Wait, if it has </div> we probably shouldn't just remove it if it closes something. 
            // Actually, if it's `{/* === </div>`, it's an unclosed comment. We should close the comment.
            // Let's replace any `{/* ====` up to the end of the line that DOES NOT contain `*/}` with `{/* ================== */}`
            const unclosedCommentRegex = /\{\/\* =+(?!.*?\*\/\}).*/g;
            content = content.replace(unclosedCommentRegex, (match) => {
                // If it contains </div>, maybe we should move </div> outside?
                let hasDiv = match.includes('</div>');
                if (hasDiv) {
                    return `{/* =================================== */}      </div>`;
                }
                return `{/* =================================== */}`;
            });

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
