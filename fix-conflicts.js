import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath = path.join(__dirname, 'src', 'materio-theme.css');
let content = fs.readFileSync(filePath, 'utf8');

const conflictRegex = /<<<<<<< HEAD\r?\n([\s\S]*?)=======\r?\n([\s\S]*?)>>>>>>> [a-f0-9]+\r?\n/g;

// Replace with HEAD content
const newContent = content.replace(conflictRegex, '$1');

fs.writeFileSync(filePath, newContent);
console.log('Fixed conflicts in materio-theme.css');
