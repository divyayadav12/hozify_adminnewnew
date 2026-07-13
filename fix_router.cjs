const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'src/modules/cms/appManagement/userApp/pages');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.jsx'));

files.forEach(file => {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  let changed = false;

  // Replace imports
  if (content.includes("from 'react-router-dom'")) {
    content = content.replace(/import\s+\{[^}]+\}\s+from\s+'react-router-dom';/g, "import { useApp } from '../../../../../hooks/useApp';");
    changed = true;
  }

  // Replace hook calls
  if (content.includes("useNavigate()")) {
    content = content.replace(/const\s+navigate\s*=\s*useNavigate\(\);/g, "const { navigate } = useApp();");
    changed = true;
  }
  
  if (content.includes("useParams()")) {
    content = content.replace(/const\s+\{\s*id\s*\}\s*=\s*useParams\(\);/g, "const { navigate, route } = useApp();\n  const id = route.split('/').pop();");
    // Since navigate might be declared twice if both useParams and useNavigate are used, we need to clean that up.
    // If it declared both, it would look like:
    // const { navigate } = useApp();
    // const { navigate, route } = useApp();
    // Let's fix that.
    changed = true;
  }

  // Deduplicate useApp destructurings
  if (content.includes("const { navigate } = useApp();") && content.includes("const { navigate, route } = useApp();")) {
    content = content.replace("const { navigate } = useApp();\n", "");
    // Just in case it's on the same line or similar
    content = content.replace("const { navigate } = useApp();", "");
  }

  if (changed) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated ${file}`);
  }
});

console.log('Done!');
