const fs = require('fs');

const bspPath = 'src/pages/Partners/BSPPartners.jsx';
let bspContent = fs.readFileSync(bspPath, 'utf8');

const missingCode = `
  const [isCityDropdownOpen, setIsCityDropdownOpen] = useState(false);
  const [isServiceDropdownOpen, setIsServiceDropdownOpen] = useState(false);
  const availableCities = ["All Cities", "Delhi", "Mumbai", "Bangalore"];
  const availableServices = ["All Services", "Logistics", "Retail", "Manufacturing"];
  
  const filteredPartners = [
    { id: "BSP-101", businessName: "Acme Corp", owner: "John Doe", city: "Delhi", rating: 4.8, status: "Active", walletBalance: 150000, compliance: 100 },
    { id: "BSP-102", businessName: "Globex", owner: "Jane Smith", city: "Mumbai", rating: 4.5, status: "Pending", walletBalance: 50000, compliance: 80 }
  ].filter(p => (activeTab === 'All' || p.status === activeTab) && (selectedCity === 'All Cities' || p.city === selectedCity));

  const formatIndianCurrency = (val) => "₹" + val.toLocaleString('en-IN');
  const togglePartnerKyc = (id) => console.log("Toggle KYC for", id);
  const openKycModal = (id) => console.log("Open KYC Modal for", id);
`;

if (!bspContent.includes('isCityDropdownOpen')) {
  bspContent = bspContent.replace('const [searchQuery, setSearchQuery] = useState("");', 'const [searchQuery, setSearchQuery] = useState("");\n' + missingCode);
  fs.writeFileSync(bspPath, bspContent);
  console.log('Fixed BSPPartners.jsx');
}
