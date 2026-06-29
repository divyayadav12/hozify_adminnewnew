export const MOCK_PAN_RECORDS = [
  {
    id: "1",
    panNumber: "ABCDE1234F",
    holderName: "HOZIFY ENTERPRISES PRIVATE LIMITED",
    issueDate: "12/05/2021",
    category: "Company (C)",
    fileName: "pan_card_biz_7782.jpg",
    fileSize: "1.2 MB",
    scanAccuracy: "98%",
    partnerName: "Hozify Global Pvt Ltd",
    partnerId: "#HZ-99812-B",
    submittedBy: "Rahul Sharma",
    submissionDate: "Oct 24, 2023 | 14:32",
    accountTier: "Premium Merchant",
    checks: {
      format: "PASSED",
      nsdl: "PASSED",
      tamper: "WARN: SLIGHT BLUR"
    },
    timeline: [
      { id: 't1', title: 'OCR Process Completed', desc: '2 minutes ago', active: true },
      { id: 't2', title: 'Document Uploaded', desc: '5 minutes ago', active: false }
    ]
  },
  {
    id: "2",
    panNumber: "XYZPD9876C",
    holderName: "LUMINA TECH SOLUTIONS PVT LTD",
    issueDate: "18/09/2022",
    category: "Company (C)",
    fileName: "pan_lumina_9921.png",
    fileSize: "850 KB",
    scanAccuracy: "95%",
    partnerName: "Lumina Tech Solutions",
    partnerId: "#HZ-10877-D",
    submittedBy: "Alok Gupta",
    submissionDate: "Jan 12, 2024 | 09:15",
    accountTier: "Enterprise Tier",
    checks: {
      format: "PASSED",
      nsdl: "PASSED",
      tamper: "PASSED"
    },
    timeline: [
      { id: 't1', title: 'OCR Process Completed', desc: '3 minutes ago', active: true },
      { id: 't2', title: 'Document Uploaded', desc: '10 minutes ago', active: false }
    ]
  },
  {
    id: "3",
    panNumber: "MNOPS4321A",
    holderName: "AMIT KUMAR SINGH",
    issueDate: "05/11/2019",
    category: "Individual (P)",
    fileName: "pan_amit_v2.jpg",
    fileSize: "1.7 MB",
    scanAccuracy: "88%",
    partnerName: "Amit Service Provider",
    partnerId: "#HZ-22904-A",
    submittedBy: "Amit Kumar Singh",
    submissionDate: "Mar 05, 2024 | 18:45",
    accountTier: "Standard Merchant",
    checks: {
      format: "PASSED",
      nsdl: "WARN: INACTIVE PAN",
      tamper: "WARN: REFLECTION"
    },
    timeline: [
      { id: 't1', title: 'NSDL Match Warning Raised', desc: '1 minute ago', active: true },
      { id: 't2', title: 'OCR Process Completed', desc: '4 minutes ago', active: false },
      { id: 't3', title: 'Document Uploaded', desc: '12 minutes ago', active: false }
    ]
  }
];
