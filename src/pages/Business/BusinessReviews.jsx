import React, { useState } from "react";
import AdminShell from "../../components/layouts/AdminShell";
import { useToast } from "../../components/common/ToastNotification";
import {
  Search,
  Download,
  Filter,
  Star,
  MapPin,
  Clock3,
  CheckCircle2,
  Flag,
  ChevronDown,
  Pencil,
} from "lucide-react";

export default function BusinessReviews() {
  const { addToast } = useToast();
  // 1. Pagination & Sorting States
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("Most Recent");

  // 2. Clickable Interactive Reviews Dataset State
  const [reviews, setReviews] = useState([
    {
      id: 1,
      name: "Sarah Jenkins",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200",
      rating: 5,
      time: "2 hours ago",
      badge: "VERIFIED PURCHASE",
      badgeColor: "bg-green-100 text-green-700",
      review:
        "The service at the Downtown Branch was exceptional. The staff was incredibly professional and the onboarding process was smoother than I expected. Highly recommend for enterprise-level needs!",
      branch: "Downtown Branch",
      category: "Onboarding Service",
      actionRequired: false,
    },
    {
      id: 2,
      name: "Marcus Thorne",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200",
      rating: 2,
      time: "5 hours ago",
      badge: "ACTION REQUIRED",
      badgeColor: "bg-red-100 text-red-600",
      review:
        "Disappointed with the delay in live tracking updates. We had a time-sensitive delivery and the system was lagging by nearly 15 minutes. This needs to be addressed for enterprise clients.",
      branch: "North Hub",
      category: "Live Tracking",
      actionRequired: true,
    },
    {
      id: 3,
      name: "Elena Rodriguez",
      image:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200",
      rating: 4,
      time: "1 day ago",
      review:
        "Overall great experience. The pricing for materials was transparent and much better than competitors. Only small gripe was the parking at the East Branch, but the staff was helpful.",
      branch: "East Branch",
      category: "Materials",
      actionRequired: false,
    },
  ]);

  // 3. Click Handlers for Review Actions
  const handleResolve = (id) => {
    setReviews(prev =>
      prev.map(r => r.id === id ? { ...r, actionRequired: false, badge: "RESOLVED", badgeColor: "bg-slate-100 text-slate-700" } : r)
    );
    addToast(`Review #${id} marked as Resolved!`, 'success');
  };

  const handleFlag = (id) => {
    addToast(`Review #${id} has been flagged for moderation.`, 'warning');
  };

  const handleQuickApprove = (id) => {
    setReviews(prev =>
      prev.map(r => r.id === id ? { ...r, actionRequired: false, badge: "APPROVED", badgeColor: "bg-emerald-100 text-emerald-700" } : r)
    );
    addToast(`Review #${id} instantly approved.`, 'success');
  };

  const toggleSort = () => {
    const nextSort = sortBy === "Most Recent" ? "Highest Rating" : "Most Recent";
    setSortBy(nextSort);
  };

  return (
    <AdminShell
      activeTab="Business Reviews"
      searchPlaceholder="Search reviews, users, or sentiment data..."
    >
      <div className="space-y-6">

        {/* HEADER */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-[42px] font-bold text-black leading-tight">
              Reviews Management
            </h1>
            <p className="text-gray-500 mt-2 text-base">
              Monitor brand reputation and customer sentiment across all
              business branches.
            </p>
          </div>

          <div className="flex gap-3">
            <button 
              onClick={() => addToast("Filter drawer toggled", "info")}
              className="h-9 px-5 border border-gray-300 bg-white rounded-md flex items-center gap-2 hover:bg-gray-50 cursor-pointer"
            >
              <Filter size={16} />
              Filter
            </button>
            <button 
              onClick={() => {
                addToast('Generating reviews CSV...', 'success');
                const headers = "Review ID,Author,Rating,Time,Review,Branch,Category";
                const csvRows = reviews.map(r => 
                  `"${r.id}","${r.name}","${r.rating}","${r.time}","${r.review.replace(/"/g, '""')}","${r.branch}","${r.category}"`
                );
                const csvContent = [headers, ...csvRows].join('\n');
                const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
                const url = URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.setAttribute('href', url);
                link.setAttribute('download', 'business_reviews_report.csv');
                link.style.visibility = 'hidden';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
              }}
              className="h-9 px-5 border border-gray-300 bg-white rounded-md flex items-center gap-2 hover:bg-gray-50 cursor-pointer"
            >
              <Download size={16} />
              Export Report
            </button>
          </div>
        </div>

        {/* TOP ANALYTICS */}
        <div className="grid grid-cols-12 gap-6">

          {/* SCORE CARD */}
          <div className="col-span-4 border border-gray-200 bg-white p-6 rounded-sm">
            <h3 className="uppercase tracking-[4px] text-gray-500 text-sm mb-8">
              Sentiment Score
            </h3>
            <div className="flex items-end gap-2">
              <span className="text-2xl font-bold">4.8</span>
              <span className="text-gray-400 text-sm mb-0.5">/ 5.0</span>
            </div>
            <div className="flex mt-4 text-yellow-400">
              {[1, 2, 3, 4, 5].map((item) => (
                <Star
                  key={item}
                  size={22}
                  fill="currentColor"
                  strokeWidth={0}
                />
              ))}
            </div>
            <p className="text-green-600 text-2xl mt-6">
              ↗ +0.4% from last month
            </p>
          </div>

          {/* DISTRIBUTION */}
          <div className="col-span-8 border border-gray-200 bg-white p-6 rounded-sm">
            <h3 className="uppercase tracking-[4px] text-gray-500 text-sm mb-10">
              Sentiment Analysis Distribution
            </h3>
            <div className="space-y-8">
              <div className="flex items-center gap-4">
                <span className="w-20 text-sm font-medium">Positive</span>
                <div className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-green-500 w-[82%]" />
                </div>
                <span className="text-gray-500 text-sm">82%</span>
              </div>

              <div className="flex items-center gap-4">
                <span className="w-20 text-sm font-medium">Neutral</span>
                <div className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 w-[12%]" />
                </div>
                <span className="text-gray-500 text-sm">12%</span>
              </div>

              <div className="flex items-center gap-4">
                <span className="w-20 text-sm font-medium">Negative</span>
                <div className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-red-500 w-[6%]" />
                </div>
                <span className="text-gray-500 text-sm">6%</span>
              </div>
            </div>
          </div>
        </div>

        {/* REVIEWS SECTION */}
        <div className="border border-gray-200 bg-white">
          <div className="flex items-center justify-between px-6 py-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold">All Reviews</h2>
            <button 
              onClick={toggleSort}
              className="flex items-center gap-2 text-2xl text-gray-700 cursor-pointer hover:text-indigo-700 transition-colors"
            >
              {sortBy}
              <ChevronDown size={20} />
            </button>
          </div>

          <div>
            {reviews.map((review) => (
              <div
                key={review.id}
                className="px-6 py-4 border-b border-gray-200 last:border-b-0"
              >
                <div className="flex justify-between items-start">
                  {/* LEFT SIDE */}
                  <div className="flex gap-5 flex-1">
                    <img
                      src={review.image}
                      alt={review.name}
                      className="w-10 h-10 rounded-full object-cover border"
                    />

                    <div className="flex-1">
                      {/* NAME */}
                      <h3 className="text-sm font-semibold text-gray-900">
                        {review.name}
                      </h3>

                      {/* RATING */}
                      <div className="flex items-center gap-3 mt-1">
                        <div className="flex text-yellow-400">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              size={18}
                              fill={star <= review.rating ? "currentColor" : "none"}
                              strokeWidth={1.5}
                            />
                          ))}
                        </div>
                        <span className="text-gray-400">•</span>
                        <span className="text-gray-500 text-sm">{review.time}</span>
                        {review.badge && (
                          <span className={`px-3 py-1 text-xs font-semibold rounded ${review.badgeColor}`}>
                            {review.badge}
                          </span>
                        )}
                      </div>

                      {/* REVIEW TEXT */}
                      <p className="mt-3 text-sm leading-relaxed text-gray-700 max-w-6xl">
                        {review.review}
                      </p>

                      {/* TAGS */}
                      <div className="flex items-center gap-8 mt-5">
                        <div className="flex items-center gap-2 text-gray-500">
                          <MapPin size={16} />
                          <span>{review.branch}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-500">
                          <Clock3 size={16} />
                          <span>{review.category}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* ACTIONS */}
                  {review.actionRequired && (
                    <div className="flex items-center gap-3 ml-8">
                      <button 
                        onClick={() => handleFlag(review.id)}
                        className="w-11 h-9 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-50 cursor-pointer"
                        title="Flag Review"
                      >
                        <Flag size={18} />
                      </button>
                      <button 
                        onClick={() => handleQuickApprove(review.id)}
                        className="w-11 h-9 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-50 cursor-pointer"
                        title="Approve Clear"
                      >
                        <CheckCircle2 size={18} />
                      </button>
                      <button 
                        onClick={() => handleResolve(review.id)}
                        className="bg-indigo-700 hover:bg-indigo-800 text-white px-6 h-9 rounded flex items-center gap-2 font-medium cursor-pointer"
                      >
                        Resolve
                        <Pencil size={15} />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* FOOTER */}
          <div className="flex justify-between items-center px-6 py-6 border-t border-gray-200">
            <p className="text-gray-500">Showing 1-10 of 482 reviews</p>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => currentPage > 1 && setCurrentPage(prev => prev - 1)}
                className="px-5 h-10 border border-gray-300 text-gray-500 hover:bg-gray-50 cursor-pointer disabled:opacity-50"
                disabled={currentPage === 1}
              >
                Previous
              </button>
              {[1, 2, 3].map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-10 h-10 border cursor-pointer ${
                    currentPage === page
                      ? "bg-indigo-700 text-white border-indigo-700"
                      : "border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  {page}
                </button>
              ))}
              <button 
                onClick={() => currentPage < 3 && setCurrentPage(prev => prev + 1)}
                className="px-5 h-10 border border-gray-300 hover:bg-gray-50 cursor-pointer"
              >
                Next
              </button>
            </div>
          </div>

        </div>
      </div>
    </AdminShell>
  );
}