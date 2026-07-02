import React, { useState } from "react";
import AdminShell from "../../components/layouts/AdminShell";
import { useToast } from "../../components/common/ToastNotification";

function StepItem({ number, title, active }) {
  return (
    <div className="flex items-center flex-1">
      <div className="flex flex-col items-center">
        <div
          className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm border-2 transition-all ${
            active
              ? "bg-indigo-900 border-indigo-900 text-white"
              : "bg-white border-slate-300 text-slate-500"
          }`}
        >
          {number}
        </div>

        <span
          className={`mt-2 text-xs font-medium ${
            active ? "text-indigo-900" : "text-slate-500"
          }`}
        >
          {title}
        </span>
      </div>

      {number !== 4 && (
        <div className="flex-1 h-px bg-slate-300 mx-4 mb-6"></div>
      )}
    </div>
  );
}

export default function CreateCampaignPage() {
  const { addToast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);

  return (
    <AdminShell
      activeTab="Referrals"
      searchPlaceholder="Search campaigns or users..."
    >
      <div className="min-h-screen bg-slate-200 p-4 md:p-6 lg:p-8">

        {/* STEPPER */}
        <div className="bg-white border border-slate-300 rounded-xl p-6 shadow-sm">
          <div className="flex flex-col md:flex-row items-start md:items-center">
            <StepItem
              number="1"
              title="Details"
              active={currentStep >= 1}
            />
            <StepItem
              number="2"
              title="Rewards"
              active={currentStep >= 2}
            />
            <StepItem
              number="3"
              title="Rules"
              active={currentStep >= 3}
            />
            <StepItem
              number="4"
              title="Launch"
              active={currentStep >= 4}
            />
          </div>
        </div>

        {/* FORM CARD */}
        <div className="mt-6 bg-white border border-slate-300 rounded-xl shadow-sm p-6 md:p-8">
          
          {/* STEP 1 */}
          {currentStep === 1 && (
            <div className="animate-in fade-in duration-300">
              <h1 className="text-3xl font-black text-slate-900">
                Campaign Identity
              </h1>

              <p className="text-slate-600 mt-2 mb-8 text-sm">
                Provide the foundational information for your referral program.
              </p>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Campaign Name
                  </label>

                  <input
                    type="text"
                    placeholder="e.g. Q4 Loyalty Boost"
                    className="w-full h-12 px-4 border border-slate-400 rounded-lg bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Internal Campaign ID
                  </label>

                  <input
                    type="text"
                    placeholder="CAM-2023-001"
                    className="w-full h-12 px-4 border border-slate-400 rounded-lg bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                  />
                </div>
              </div>

              <div className="mt-6">
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Campaign Description
                </label>

                <textarea
                  rows={5}
                  placeholder="Briefly describe the purpose and goals of this campaign..."
                  className="w-full border border-slate-400 rounded-lg bg-slate-50 p-4 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Start Date
                  </label>

                  <input
                    type="text"
                    placeholder="mm/dd/yyyy"
                    className="w-full h-12 px-4 border border-slate-400 rounded-lg bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    End Date
                  </label>

                  <input
                    type="text"
                    placeholder="mm/dd/yyyy"
                    className="w-full h-12 px-4 border border-slate-400 rounded-lg bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                  />
                </div>
              </div>

              <div className="border-t border-slate-200 mt-10 pt-8 flex justify-end">
                <button 
                  onClick={() => setCurrentStep(2)}
                  className="bg-indigo-900 hover:bg-indigo-800 text-white px-10 py-3 rounded-lg font-bold tracking-wide transition-all cursor-pointer text-sm shadow-sm"
                >
                  CONTINUE
                </button>
              </div>
            </div>
          )}

          {/* STEP 2 */}
          {currentStep === 2 && (
            <div className="animate-in fade-in duration-300">
              <h1 className="text-3xl font-black text-slate-900">
                Rewards Setup
              </h1>

              <p className="text-slate-600 mt-2 mb-8 text-sm">
                Define what users get for successful referrals.
              </p>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Reward Type
                  </label>

                  <select
                    className="w-full h-12 px-4 border border-slate-400 rounded-lg bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                  >
                    <option>Fixed Amount ($)</option>
                    <option>Percentage Discount (%)</option>
                    <option>Loyalty Points</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Reward Trigger Event
                  </label>

                  <select
                    className="w-full h-12 px-4 border border-slate-400 rounded-lg bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                  >
                    <option>Upon Successful Purchase</option>
                    <option>Upon Registration</option>
                    <option>Upon KYC Completion</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Referrer Reward Value
                  </label>

                  <input
                    type="text"
                    placeholder="e.g. 50"
                    className="w-full h-12 px-4 border border-slate-400 rounded-lg bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Referee (Invited User) Reward Value
                  </label>

                  <input
                    type="text"
                    placeholder="e.g. 25"
                    className="w-full h-12 px-4 border border-slate-400 rounded-lg bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                  />
                </div>
              </div>

              <div className="border-t border-slate-200 mt-10 pt-8 flex justify-between">
                <button 
                  onClick={() => setCurrentStep(1)}
                  className="border border-slate-300 text-slate-700 px-8 py-3 rounded-lg font-bold hover:bg-slate-50 transition-all cursor-pointer text-sm"
                >
                  BACK
                </button>
                <button 
                  onClick={() => setCurrentStep(3)}
                  className="bg-indigo-900 hover:bg-indigo-800 text-white px-10 py-3 rounded-lg font-bold tracking-wide transition-all cursor-pointer text-sm shadow-sm"
                >
                  CONTINUE
                </button>
              </div>
            </div>
          )}

          {/* STEP 3 */}
          {currentStep === 3 && (
            <div className="animate-in fade-in duration-300">
              <h1 className="text-3xl font-black text-slate-900">
                Rules & Eligibility
              </h1>

              <p className="text-slate-600 mt-2 mb-8 text-sm">
                Set boundaries and conditions to prevent fraud.
              </p>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Minimum Purchase Amount ($)
                  </label>

                  <input
                    type="text"
                    placeholder="e.g. 100"
                    className="w-full h-12 px-4 border border-slate-400 rounded-lg bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Maximum Referrals per User
                  </label>

                  <input
                    type="number"
                    placeholder="e.g. 10"
                    className="w-full h-12 px-4 border border-slate-400 rounded-lg bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                  />
                </div>
              </div>
              
              <div className="mt-6">
                <label className="flex items-center gap-3 mb-3 cursor-pointer">
                  <input type="checkbox" className="w-5 h-5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" />
                  <span className="text-sm font-semibold text-slate-700">Require email verification for rewards</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" className="w-5 h-5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" />
                  <span className="text-sm font-semibold text-slate-700">Enable advanced fraud detection (IP & Device matching)</span>
                </label>
              </div>

              <div className="border-t border-slate-200 mt-10 pt-8 flex justify-between">
                <button 
                  onClick={() => setCurrentStep(2)}
                  className="border border-slate-300 text-slate-700 px-8 py-3 rounded-lg font-bold hover:bg-slate-50 transition-all cursor-pointer text-sm"
                >
                  BACK
                </button>
                <button 
                  onClick={() => setCurrentStep(4)}
                  className="bg-indigo-900 hover:bg-indigo-800 text-white px-10 py-3 rounded-lg font-bold tracking-wide transition-all cursor-pointer text-sm shadow-sm"
                >
                  CONTINUE
                </button>
              </div>
            </div>
          )}

          {/* STEP 4 */}
          {currentStep === 4 && (
            <div className="animate-in fade-in duration-300">
              <h1 className="text-3xl font-black text-slate-900">
                Review & Launch
              </h1>

              <p className="text-slate-600 mt-2 mb-8 text-sm">
                Verify all configurations before making the campaign live.
              </p>

              <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 space-y-4">
                <div className="grid grid-cols-2 border-b border-slate-200 pb-4">
                  <span className="text-slate-500 font-bold text-sm">Campaign Name</span>
                  <span className="text-slate-900 font-black text-sm">Q4 Loyalty Boost (Pending)</span>
                </div>
                <div className="grid grid-cols-2 border-b border-slate-200 pb-4">
                  <span className="text-slate-500 font-bold text-sm">Reward Structure</span>
                  <span className="text-slate-900 font-black text-sm">Fixed Amount ($50 Referrer / $25 Referee)</span>
                </div>
                <div className="grid grid-cols-2 border-b border-slate-200 pb-4">
                  <span className="text-slate-500 font-bold text-sm">Trigger Event</span>
                  <span className="text-slate-900 font-black text-sm">Upon Successful Purchase</span>
                </div>
                <div className="grid grid-cols-2">
                  <span className="text-slate-500 font-bold text-sm">Fraud Protection</span>
                  <span className="text-emerald-600 font-black text-sm">Enabled</span>
                </div>
              </div>

              <div className="border-t border-slate-200 mt-10 pt-8 flex justify-between">
                <button 
                  onClick={() => setCurrentStep(3)}
                  className="border border-slate-300 text-slate-700 px-8 py-3 rounded-lg font-bold hover:bg-slate-50 transition-all cursor-pointer text-sm"
                >
                  BACK
                </button>
                <button 
                  onClick={() => {
                    addToast("Campaign Successfully Launched!", "success");
                    setCurrentStep(1); // Reset to beginning for demo
                  }}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-10 py-3 rounded-lg font-black tracking-wide transition-all cursor-pointer text-sm shadow-sm"
                >
                  LAUNCH CAMPAIGN
                </button>
              </div>
            </div>
          )}

        </div>

      </div>
    </AdminShell>
  );
}
