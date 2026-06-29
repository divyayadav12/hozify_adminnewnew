import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const directoryToScan = path.join(__dirname, 'src');

function fixConflictsInDirectory(dir) {
    const files = fs.readdirSync(dir);

    for (const file of files) {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
            fixConflictsInDirectory(fullPath);
        } else if (stat.isFile() && (fullPath.endsWith('.jsx') || fullPath.endsWith('.js') || fullPath.endsWith('.css') || fullPath.endsWith('.json'))) {
            try {
                let content = fs.readFileSync(fullPath, 'utf8');
                if (content.includes('<<<<<<< HEAD')) {
                    console.log(`Fixing conflicts in ${fullPath}`);
                    const conflictRegex = /<<<<<<< HEAD\r?\n([\s\S]*?)=======\r?\n([\s\S]*?)>>>>>>> .*?(?:\r?\n|$)/g;
                    const newContent = content.replace(conflictRegex, '$1');
                    fs.writeFileSync(fullPath, newContent);
                }
            } catch (err) {
                console.error(`Failed to read/write ${fullPath}`, err);
            }
        }
    }
}

console.log('Starting global conflict resolution...');
fixConflictsInDirectory(directoryToScan);
console.log('Finished resolving conflicts.');
