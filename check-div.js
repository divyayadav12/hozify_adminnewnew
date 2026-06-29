import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.join(__dirname, 'src/pages/RevenueManagement/ExecutiveDashboard.jsx');

const content = fs.readFileSync(filePath, 'utf8');

let divDepth = 0;
const lines = content.split('\n');
for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const opens = (line.match(/<div/g) || []).length;
    const closes = (line.match(/<\/div>/g) || []).length;
    
    divDepth += (opens - closes);
    if (i > 95 && i < 370) {
        // Just print depth at key lines
        if (line.includes('space-y-6') || line.includes('FOOTER SECTION') || line.includes('RECENT REPORTS SYSTEM') || line.includes('</AdminShell>')) {
            console.log(`Line ${i+1}: Depth ${divDepth} - ${line.trim()}`);
        }
        if (divDepth < 0) {
            console.log(`WARNING: Negative depth at line ${i+1}: ${line.trim()}`);
        }
    }
}
console.log(`Final depth: ${divDepth}`);
