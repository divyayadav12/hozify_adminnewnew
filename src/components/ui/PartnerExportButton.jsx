import React from "react";
import { Download } from "lucide-react";

export default function PartnerExportButton({ onClick, label = "Export Report", className = "" }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center gap-2 rounded-2xl bg-sky-500 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-sky-400 ${className}`}
    >
      <Download size={16} className="text-white" />
      <span>{label}</span>
    </button>
  );
}
