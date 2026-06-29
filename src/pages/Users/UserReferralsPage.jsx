import React, { useState } from "react";
import AdminShell from "../../components/layouts/AdminShell";
import { usersMockData } from "./usersMockData";
import {
  Users,
  CheckCircle,
  DollarSign,
  Gift,
  Filter,
  Download,
  TrendingUp,
  Activity as ActivityIcon,
  Wallet as WalletIcon,
  Settings as SettingsIcon,
  Lock,
  Bell,
  User as UserIcon,
  Clock,
  History,
  CreditCard,
  LogOut,
} from "lucide-react";

const Overview = ({ user }) => (
  <div className="grid grid-cols-12 gap-8 mt-6">
    {/* Profile Card */}
    <div className="col-span-4 bg-white border rounded-xl p-6">
      <div className="flex gap-5">
        <img
          src={user.avatar}
          alt={user.name}
          className="w-24 h-24 rounded-xl object-cover"
        />
        <div>
          <h2 className="text-3xl font-bold">{user.name}</h2>
          <p className="text-slate-500 mt-1">
            {user.membershipType} • Joined {user.registrationDate}
          </p>
          <div className="flex gap-2 mt-3">
            <span className="px-4 py-1 rounded-full bg-indigo-100 text-indigo-700 text-sm">
              Referral Hero
            </span>
            <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-sm">
              Top 1%
            </span>
          </div>
          <div className="mt-3">
            <span
              className={`px-3 py-1 rounded-full text-xs font-medium ${
                user.status === "Active"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {user.status}
            </span>
          </div>
        </div>
      </div>
      <div className="mt-8 border-t pt-6">
        <h3 className="font-semibold text-lg mb-4">Basic Details</h3>
        <div className="flex flex-col gap-3">
          <div className="flex justify-between">
            <span className="text-slate-500">Email</span>
            <span className="font-medium">{user.email}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Phone</span>
            <span className="font-medium">{user.mobile}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Location</span>
            <span className="font-medium">{user.addresses?.[0] || 'N/A'}</span>
          </div>
        </div>
      </div>
    </div>

    {/* Stats */}
    <div className="col-span-8 flex flex-col justify-between">
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="bg-white border rounded-xl p-5">
          <Users className="text-indigo-600 mb-3" />
          <p className="text-xl text-slate-500">Referral Count</p>
          <h3 className="text-3xl font-bold">{user.referrals.totalReferrals}</h3>
        </div>
        <div className="bg-white border rounded-xl p-5">
          <CheckCircle className="text-green-600 mb-3" />
          <p className="text-sm text-slate-500">Successful</p>
          <h3 className="text-3xl font-bold">{user.referrals.totalReferrals}</h3>
        </div>
        <div className="bg-white border rounded-xl p-5">
          <Gift className="text-orange-500 mb-3" />
          <p className="text-sm text-slate-500">Referral Code</p>
          <h3 className="text-xl font-bold">{user.referrals.referralCode}</h3>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 h-full">
        <div className="bg-white border rounded-xl p-5 flex flex-col justify-center">
          <DollarSign className="text-purple-600 mb-3" />
          <p className="text-sm text-slate-500">Total Earnings</p>
          <h3 className="text-3xl font-bold">₹{user.referrals.earnedAmount}</h3>
        </div>
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl p-5 flex flex-col justify-center">
          <TrendingUp className="mb-3" />
          <p className="mt-2 text-indigo-100">Growth Rate</p>
          <h3 className="text-3xl font-bold">+22%</h3>
        </div>
      </div>
    </div>
  </div>
);

const Activity = ({ user }) => (
  <div className="mt-6 bg-white border rounded-xl p-6">
    <h3 className="text-xl font-semibold mb-6">Timeline of Actions</h3>
    <div className="flex flex-col gap-6">
      <div className="flex gap-4">
        <div className="mt-1 bg-indigo-100 text-indigo-600 p-2 rounded-full">
          <LogOut size={18} />
        </div>
        <div>
          <h4 className="font-semibold text-slate-800">Login Successful</h4>
          <p className="text-sm text-slate-500">Logged in from Mumbai, IN (IP: 192.168.1.1)</p>
          <span className="text-xs text-slate-400 mt-1 block">2 hours ago</span>
        </div>
      </div>
      <div className="flex gap-4">
        <div className="mt-1 bg-green-100 text-green-600 p-2 rounded-full">
          <CreditCard size={18} />
        </div>
        <div>
          <h4 className="font-semibold text-slate-800">Transaction Completed</h4>
          <p className="text-sm text-slate-500">Paid ₹5,000 for Service Booking #BK-90021</p>
          <span className="text-xs text-slate-400 mt-1 block">Yesterday, 14:30</span>
        </div>
      </div>
      <div className="flex gap-4">
        <div className="mt-1 bg-orange-100 text-orange-600 p-2 rounded-full">
          <History size={18} />
        </div>
        <div>
          <h4 className="font-semibold text-slate-800">Profile Updated</h4>
          <p className="text-sm text-slate-500">Changed primary phone number.</p>
          <span className="text-xs text-slate-400 mt-1 block">3 days ago</span>
        </div>
      </div>
    </div>
  </div>
);

const Referrals = ({ user, referrals }) => (
  <div className="mt-6 flex flex-col gap-6">
    <div className="bg-white border rounded-xl overflow-hidden">
      <div className="p-5 border-b flex justify-between items-center">
        <div>
          <h3 className="text-xl font-semibold">Referral History</h3>
          <p className="text-sm text-slate-500">Showing all users referred by {user.name}</p>
        </div>
        <div className="flex gap-2">
          <button className="border px-4 py-2 rounded-lg hover:bg-slate-50 transition-colors flex items-center gap-2">
            <Filter size={16} /> Filter
          </button>
          <button className="bg-[#5B3DF5] text-white px-4 py-2 rounded-lg hover:bg-[#4a31cc] transition-colors flex items-center gap-2">
            <Download size={16} /> Export Report
          </button>
        </div>
      </div>
      <div className="table-responsive" style={{ overflowX: 'auto', width: '100%', WebkitOverflowScrolling: 'touch' }}>
        <table className="w-full">
          <thead>
            <tr className="bg-slate-50 text-left border-b">
              <th className="p-4 font-semibold text-slate-600">User</th>
              <th className="font-semibold text-slate-600">Date Joined</th>
              <th className="font-semibold text-slate-600">Reward</th>
              <th className="font-semibold text-slate-600">Status</th>
              <th className="font-semibold text-slate-600">Action</th>
            </tr>
          </thead>
          <tbody>
            {referrals.map((item, index) => (
              <tr key={index} className="border-b last:border-0 hover:bg-slate-50/50">
                <td className="p-4">
                  <div>
                    <p className="font-medium text-slate-800">{item.name}</p>
                    <p className="text-sm text-slate-500">{item.email}</p>
                  </div>
                </td>
                <td className="text-slate-600">{item.joined}</td>
                <td className="font-medium">
                  <span className="text-green-600">{item.reward}</span>
                </td>
                <td>
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                    {item.status}
                  </span>
                </td>
                <td>
                  <button className="text-[#5B3DF5] font-medium hover:underline">
                    View Profile
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    
    <div className="bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-100 rounded-xl p-6 flex justify-between items-center shadow-sm">
      <div>
        <h3 className="text-xl font-semibold text-orange-900">
          Boost {user.name.split(' ')[0]}'s Referrals 🚀
        </h3>
        <p className="text-orange-700 mt-1">
          Enable a limited-time bonus campaign.
        </p>
      </div>
      <button className="bg-orange-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-orange-700 transition-colors shadow-sm">
        Activate Bonus
      </button>
    </div>
  </div>
);

const Wallet = ({ user }) => (
  <div className="mt-6 flex flex-col gap-6">
    <div className="grid grid-cols-3 gap-6">
      <div className="bg-white border rounded-xl p-6 shadow-sm">
        <p className="text-sm text-slate-500 mb-1">Wallet Balance</p>
        <h3 className="text-3xl font-bold text-slate-800">₹{(user.wallet?.balance || 0).toLocaleString()}</h3>
      </div>
      <div className="bg-white border rounded-xl p-6 shadow-sm">
        <p className="text-sm text-slate-500 mb-1">Total Earnings</p>
        <h3 className="text-3xl font-bold text-green-600">₹{user.referrals.earnedAmount.toLocaleString()}</h3>
      </div>
      <div className="bg-white border rounded-xl p-6 shadow-sm">
        <p className="text-sm text-slate-500 mb-1">Pending Amount</p>
        <h3 className="text-3xl font-bold text-orange-500">₹450</h3>
      </div>
    </div>

    <div className="bg-white border rounded-xl overflow-hidden">
      <div className="p-5 border-b">
        <h3 className="text-xl font-semibold">Wallet Transaction History</h3>
      </div>
      <div className="table-responsive" style={{ overflowX: 'auto', width: '100%', WebkitOverflowScrolling: 'touch' }}>
        <table className="w-full">
          <thead>
            <tr className="bg-slate-50 text-left border-b">
              <th className="p-4 font-semibold text-slate-600">Transaction ID</th>
              <th className="font-semibold text-slate-600">Date</th>
              <th className="font-semibold text-slate-600">Type</th>
              <th className="font-semibold text-slate-600">Amount</th>
              <th className="font-semibold text-slate-600">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="p-4 font-medium text-slate-800">TXN-88291</td>
              <td className="text-slate-600">2026-06-25</td>
              <td className="text-slate-600">Referral Bonus</td>
              <td className="text-green-600 font-medium">+₹150</td>
              <td><span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">Completed</span></td>
            </tr>
            <tr className="border-b">
              <td className="p-4 font-medium text-slate-800">TXN-88204</td>
              <td className="text-slate-600">2026-06-22</td>
              <td className="text-slate-600">Withdrawal</td>
              <td className="text-slate-800 font-medium">-₹1,000</td>
              <td><span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">Completed</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

const Settings = ({ user }) => (
  <div className="mt-6 flex flex-col gap-6">
    <div className="bg-white border rounded-xl p-6">
      <div className="flex items-center gap-3 mb-6">
        <UserIcon className="text-indigo-600" />
        <h3 className="text-xl font-semibold">Profile Settings</h3>
      </div>
      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
          <input type="text" defaultValue={user.name} className="w-full border rounded-lg px-4 py-2 outline-none focus:border-indigo-500 transition-colors" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
          <input type="email" defaultValue={user.email} className="w-full border rounded-lg px-4 py-2 outline-none focus:border-indigo-500 transition-colors" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Phone Number</label>
          <input type="text" defaultValue={user.mobile} className="w-full border rounded-lg px-4 py-2 outline-none focus:border-indigo-500 transition-colors" />
        </div>
      </div>
    </div>

    <div className="bg-white border rounded-xl p-6">
      <div className="flex items-center gap-3 mb-6">
        <Lock className="text-indigo-600" />
        <h3 className="text-xl font-semibold">Change Password</h3>
      </div>
      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Current Password</label>
          <input type="password" placeholder="••••••••" className="w-full border rounded-lg px-4 py-2 outline-none focus:border-indigo-500 transition-colors" />
        </div>
        <div></div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">New Password</label>
          <input type="password" placeholder="••••••••" className="w-full border rounded-lg px-4 py-2 outline-none focus:border-indigo-500 transition-colors" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Confirm New Password</label>
          <input type="password" placeholder="••••••••" className="w-full border rounded-lg px-4 py-2 outline-none focus:border-indigo-500 transition-colors" />
        </div>
      </div>
    </div>

    <div className="bg-white border rounded-xl p-6">
      <div className="flex items-center gap-3 mb-6">
        <Bell className="text-indigo-600" />
        <h3 className="text-xl font-semibold">Notification Settings & Preferences</h3>
      </div>
      <div className="flex flex-col gap-4">
        <label className="flex items-center gap-3 cursor-pointer">
          <input type="checkbox" defaultChecked className="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500" />
          <span className="text-slate-700">Email Notifications for Successful Referrals</span>
        </label>
        <label className="flex items-center gap-3 cursor-pointer">
          <input type="checkbox" defaultChecked className="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500" />
          <span className="text-slate-700">SMS Alerts for Wallet Transactions</span>
        </label>
        <label className="flex items-center gap-3 cursor-pointer">
          <input type="checkbox" className="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500" />
          <span className="text-slate-700">Weekly Performance Reports</span>
        </label>
      </div>
    </div>
    
    <div className="flex justify-end mt-2">
      <button className="bg-[#5B3DF5] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#4a31cc] transition-colors shadow-sm">
        Save Changes
      </button>
    </div>
  </div>
);

export default function UserReferralsPage() {
  const [activeTab, setActiveTab] = useState("Overview");
  const user = usersMockData[0];

  const referrals = user.referrals.referredUsers.map((name, index) => ({
    name,
    email: `user${index + 1}@example.com`,
    joined: "2026-05-10",
    reward: "₹150",
    status: "Successful",
  }));

  const tabs = ["Overview", "Activity", "Referrals", "Wallet", "Settings"];

  return (
    <AdminShell
      activeTab="User Management"
      searchPlaceholder="Search referrals or users..."
    >
      <div className="flex gap-16 border-b border-slate-200 text-base mt-2 px-2">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-4 font-semibold transition-all duration-300 ${
              activeTab === tab
                ? "border-b-[3px] border-[#5B3DF5] text-[#5B3DF5]"
                : "border-b-[3px] border-transparent text-slate-600 hover:text-slate-800"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div>
        {activeTab === "Overview" && <Overview user={user} />}
        {activeTab === "Activity" && <Activity user={user} />}
        {activeTab === "Referrals" && <Referrals user={user} referrals={referrals} />}
        {activeTab === "Wallet" && <Wallet user={user} />}
        {activeTab === "Settings" && <Settings user={user} />}
      </div>
    </AdminShell>
  );
}