import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import * as parser from '@babel/parser';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const directoryToScan = path.join(__dirname, 'src');
let errorCount = 0;

function checkSyntax(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory()) {
            checkSyntax(fullPath);
        } else if (stat.isFile() && (fullPath.endsWith('.jsx') || fullPath.endsWith('.js'))) {
            const content = fs.readFileSync(fullPath, 'utf8');
            try {
                parser.parse(content, {
                    sourceType: 'module',
                    plugins: ['jsx']
                });
            } catch (err) {
                console.log(`Syntax Error in ${fullPath.replace(__dirname, '')}:${err.loc?.line}:${err.loc?.column} - ${err.message}`);
                errorCount++;
            }
        }
    }
}

console.log('Checking for syntax errors...');
checkSyntax(directoryToScan);
console.log(`Total syntax errors: ${errorCount}`);
