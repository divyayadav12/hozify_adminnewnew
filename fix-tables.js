import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const srcDir = path.join(__dirname, 'src');

function fixTables(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
            fixTables(fullPath);
        } else if (stat.isFile() && fullPath.endsWith('.jsx')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            let original = content;

            // Fix the double <table> open tag issue
            const regex = /(<div className="table-responsive"[^>]*><table[^>]*>)\r?\n\s*<table[^>]*>/g;
            content = content.replace(regex, '$1');

            if (content !== original) {
                console.log(`Fixed double table in ${fullPath}`);
                fs.writeFileSync(fullPath, content);
            }
        }
    }
}

console.log('Fixing double table tags...');
fixTables(srcDir);
console.log('Done fixing tables.');
