const fs = require('fs');
const path = require('path');
const lucide = require('lucide-react');

function checkDir(dir) {
    if (!fs.existsSync(dir)) return;
    const files = fs.readdirSync(dir);
    for (const f of files) {
        const fullPath = path.join(dir, f);
        if (fs.statSync(fullPath).isDirectory()) {
            checkDir(fullPath);
        } else if (fullPath.endsWith('.jsx')) {
            const code = fs.readFileSync(fullPath, 'utf8');
            const match = code.match(/import\s*\{\s*([\s\S]+?)\s*\}\s*from\s*['"]lucide-react['"]/);
            if (match) {
                const imports = match[1].split(',').map(s => s.trim()).filter(Boolean);
                imports.forEach(i => {
                    const iconName = i.split(/\s+as\s+/)[0]; 
                    if (!lucide[iconName]) {
                        console.log(`[Error] ${fullPath} uses undefined icon: ${iconName}`);
                    }
                });
            }
        }
    }
}

console.log("Checking for undefined Lucide icons...");
checkDir(path.join(__dirname, 'src/pages/Partners'));
checkDir(path.join(__dirname, 'src/pages/PartnerDetails'));
console.log("Done checking.");
