import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Replace these stray </div> tags at the end of the 7 files.
const filesToFixEndDiv = [
  "src/pages/RevenueManagement/EmployeeRevenue.jsx",
  "src/pages/RevenueManagement/Expenses.jsx",
  "src/pages/RevenueManagement/FinancialHealth.jsx",
  "src/pages/RevenueManagement/Profit&LossRevenue.jsx",
  "src/pages/RevenueManagement/ServiceRevenue.jsx",
  "src/pages/RevenueManagement/RevenueForecasting.jsx",
  "src/pages/RevenueManagement/Targets.jsx"
];

for (const file of filesToFixEndDiv) {
  const fullPath = path.join(__dirname, file);
  if (fs.existsSync(fullPath)) {
    let content = fs.readFileSync(fullPath, 'utf8');
    const original = content;
    // Replace `{/* ==== */}      </div>` with `{/* ==== */}`
    content = content.replace(/\{\/\* =+ \*\/\}\s+<\/div>/g, '{/* =================================== */}');
    
    if (content !== original) {
      console.log(`Fixed trailing </div> in ${file}`);
      fs.writeFileSync(fullPath, content);
    }
  }
}

// Now let's read the task log and try to fix the specific line errors automatically.
// If the error points to a </div> or expected </AdminShell> at a </div>, we just remove the </div> on that line.
const logPath = "C:\\Users\\Shankar\\.gemini\\antigravity-ide\\brain\\cd57be2b-1265-4107-8aae-f2c4c8ebca78\\.system_generated\\tasks\\task-250.log";
if (fs.existsSync(logPath)) {
  const logContent = fs.readFileSync(logPath, 'utf8');
  
  // Look for:
  // [builtin:vite-transform] Expected corresponding JSX closing tag for 'AdminShell'.
  //      ╭─[ src/pages/RevenueManagement/ExecutiveDashboard.jsx:260:13 ]
  
  const regex = /╭─\[ (src\/[^:]+):(\d+):\d+ \]/g;
  let match;
  
  // Track files we've edited so we only apply one fix per file per run, 
  // because line numbers shift if we delete lines!
  const editedFiles = new Set();
  
  while ((match = regex.exec(logContent)) !== null) {
    const file = match[1];
    const lineStr = match[2];
    const lineNum = parseInt(lineStr, 10);
    
    if (editedFiles.has(file)) continue;
    
    // We already fixed some manually above, skip those if they were already fixed.
    if (filesToFixEndDiv.includes(file)) continue;

    const fullPath = path.join(__dirname, file);
    if (!fs.existsSync(fullPath)) continue;

    let content = fs.readFileSync(fullPath, 'utf8');
    const lines = content.split('\n');
    
    // Check what is at this line. If it's a </div>, just delete it or comment it.
    const targetLineIdx = lineNum - 1;
    if (targetLineIdx >= 0 && targetLineIdx < lines.length) {
       const lineContent = lines[targetLineIdx];
       if (lineContent.includes('</div>') || lineContent.includes('</AdminShell>')) {
           // We comment it out so we don't shift line numbers (though we only edit once per file anyway)
           console.log(`Fixing error at ${file}:${lineNum} - "${lineContent.trim()}"`);
           lines[targetLineIdx] = `/* REMOVED ${lineContent.trim()} */`;
           fs.writeFileSync(fullPath, lines.join('\n'));
           editedFiles.add(file);
       }
    }
  }
}

console.log("Done fixing from log.");
