const lucide = require('lucide-react');
const icons = [
  'Wallet',
  'ArrowUpRight',
  'ArrowDownLeft',
  'Clock',
  'CheckCircle2',
  'XCircle',
  'Undo2',
  'Search',
  'Filter',
  'Download',
  'FileSpreadsheet',
  'FileText',
  'Eye',
  'X',
  'ChevronLeft',
  'ChevronRight'
];
const missing = icons.filter(icon => !lucide[icon]);
console.log('Missing icons:', missing);
