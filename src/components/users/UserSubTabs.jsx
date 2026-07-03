import React from 'react';
import { useApp } from '../../hooks/useApp';
import { ROUTES } from '../../config/routes';
import { useToast } from '../common/ToastNotification';

export default function UserSubTabs() {
  const { route, navigate } = useApp();
  const { addToast } = useToast();

  const tabs = [
    { label: "Overview", path: ROUTES.users, toast: "Navigating to Overview" },
    { label: "Activity Logs", path: ROUTES.userActivityLogs, toast: "Navigating to Activity Logs" },
    { label: "Referrals", path: ROUTES.userReferrals, toast: "Navigating to Referrals" },
    { label: "Wallet Transactions", path: ROUTES.userWallets, toast: "Reloaded Wallet Transactions" },
    { label: "Timeline", path: ROUTES.userTimeline, toast: "Navigating to Timeline" },
  ];

  return (
    <div style={{ display: "flex", gap: "8px", borderBottom: "1px solid var(--line, #e2e8f0)", paddingBottom: "12px", marginBottom: "24px", overflowX: "auto" }}>
      {tabs.map(tab => {
        const isActive = route === tab.path;
        return (
          <button
            key={tab.path}
            onClick={() => { navigate(tab.path); addToast(tab.toast, "success"); }}
            style={{
              padding: "8px 16px",
              border: isActive ? "1.5px solid #2A2454" : "1px solid #cbd5e1",
              borderRadius: "8px",
              background: isActive ? "#e0e7ff" : "#fff",
              color: isActive ? "#2A2454" : "#64748b",
              fontWeight: "700",
              fontSize: "13px",
              cursor: "pointer",
              whiteSpace: "nowrap"
            }}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
