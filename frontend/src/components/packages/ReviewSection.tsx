"use client";

import { useEffect, useState, useCallback } from "react";
import { Star, Pencil, Trash2, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import api from "@/lib/api";
import { useAppSelector } from "@/store";
import { toast } from "sonner";

export interface Review {
  _id?: string;
  id?: number | string;
  author?: string;
  user?: {
    _id?: string;
    id?: string;
    name?: string;
    email?: string;
    avatar?: string;
  } | string;
  rating: number;
  date?: string;
  createdAt?: string;
  title?: string;
  content?: string;
  comment?: string;
  helpful?: number;
  verified?: boolean;
  avatar?: string;
}

const ReviewSection = ({ packageId }: { packageId: string }) => {
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newReview, setNewReview] = useState({
    title: "",
    content: "",
    rating: 5,
  });
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Edit State
  const [editingReviewId, setEditingReviewId] = useState<string | null>(null);
  const [editData, setEditData] = useState({ rating: 5, content: "" });
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const user = useAppSelector((state) => state.auth.user);

  const fetchReviews = useCallback(async () => {
    if (!packageId) {
      setReviews([]);
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      const response = await api.get(`/reviews?packageId=${packageId}`);
      if (Array.isArray(response.data)) {
        setReviews(response.data);
      } else {
        setReviews([]);
      }
    } catch (err) {
      console.error("Error fetching reviews:", err);
      setReviews([]);
    } finally {
      setLoading(false);
    }
  }, [packageId]);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast.error("Please login to submit a review");
      return;
    }

    if (!newReview.content.trim()) {
      toast.error("Please write a review comment");
      return;
    }

    try {
      setSubmitting(true);
      const response = await api.post("/reviews", {
        package: packageId,
        rating: newReview.rating,
        comment: newReview.content.trim(),
        title: newReview.title.trim(),
      });

      if (response.status === 201 || response.data?.success || response.data?.review) {
        toast.success("Review submitted successfully!");
        setShowReviewForm(false);
        setNewReview({ title: "", content: "", rating: 5 });
        fetchReviews();
      } else {
        toast.error("Failed to submit review");
      }
    } catch (err: unknown) {
      console.error("Error submitting review:", err);
      const axiosError = err as { response?: { status?: number; data?: { message?: string } } };
      const errorMsg =
        axiosError?.response?.data?.message ||
        (axiosError?.response?.status === 401
          ? "Please log in to submit a review."
          : "Failed to submit review. Please check your connection or log in.");
      toast.error(errorMsg);
    } finally {
      setSubmitting(false);
    }
  };

  const handleStartEdit = (review: Review) => {
    const id = review._id || String(review.id);
    setEditingReviewId(id);
    setEditData({
      rating: review.rating || 5,
      content: review.comment || review.content || "",
    });
  };

  const handleSaveEditReview = async (reviewId: string) => {
    if (!editData.content.trim()) {
      toast.error("Please enter review text.");
      return;
    }
    try {
      setSubmitting(true);
      const response = await api.put(`/reviews/${reviewId}`, {
        rating: editData.rating,
        comment: editData.content.trim(),
      });

      if (response.status === 200 || response.data?.success) {
        toast.success("Your review has been updated!");
        setEditingReviewId(null);
        fetchReviews();
      } else {
        toast.error("Failed to update review.");
      }
    } catch (err: unknown) {
      console.error("Error updating review:", err);
      const axiosError = err as { response?: { data?: { message?: string } } };
      toast.error(axiosError?.response?.data?.message || "Failed to update review.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteMyReview = async (reviewId: string) => {
    if (!confirm("Are you sure you want to delete your review?")) return;
    try {
      setDeletingId(reviewId);
      const response = await api.delete(`/reviews/${reviewId}`);
      if (response.status === 200 || response.data?.success) {
        toast.success("Your review has been deleted.");
        fetchReviews();
      } else {
        toast.error("Failed to delete review.");
      }
    } catch (err: unknown) {
      console.error("Error deleting review:", err);
      const axiosError = err as { response?: { data?: { message?: string } } };
      toast.error(axiosError?.response?.data?.message || "Failed to delete review.");
    } finally {
      setDeletingId(null);
    }
  };

  const totalReviews = reviews.length;
  const averageRating =
    totalReviews > 0
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews
      : 0;

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating ? "text-yellow-400 fill-current" : "text-gray-300"
        }`}
      />
    ));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-500"></div>
      </div>
    );
  }

  const currentUserId = user?.id || (user as { _id?: string })?._id;

  return (
    <div className="space-y-8">
      {/* Review Summary Header */}
      <div className="bg-gradient-to-br from-amber-50/60 to-orange-50/40 rounded-2xl p-8 border border-amber-200/60 shadow-sm">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center">
            <div className="text-center">
              <div className="text-4xl font-extrabold text-amber-600">
                {totalReviews > 0 ? averageRating.toFixed(1) : "N/A"}
              </div>
              <div className="flex justify-center mt-1">
                {renderStars(Math.round(averageRating))}
              </div>
              <div className="text-xs text-gray-500 mt-1 font-medium">
                {totalReviews > 0
                  ? `Based on ${totalReviews} ${totalReviews === 1 ? "review" : "reviews"}`
                  : "No reviews yet"}
              </div>
            </div>
            <div className="ml-6 border-l border-amber-200/80 pl-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-1">
                Customer Reviews & Ratings
              </h3>
              <p className="text-sm text-gray-600">
                {totalReviews > 0
                  ? "Verified feedback from travelers who booked this package"
                  : "Be the first to review this package"}
              </p>
            </div>
          </div>

          {user ? (
            <Button
              onClick={() => setShowReviewForm(!showReviewForm)}
              className="bg-amber-500 hover:bg-amber-600 text-white font-bold px-6 py-2.5 rounded-full shadow-md transition-all duration-200"
            >
              {showReviewForm ? "Cancel Review" : "Write a Review"}
            </Button>
          ) : (
            <div className="mt-2 md:mt-0">
              <p className="text-xs text-gray-600 mb-2">
                Want to share your experience?
              </p>
              <Button
                onClick={() => (window.location.href = "/login")}
                className="bg-slate-900 hover:bg-slate-800 text-white font-medium px-4 py-2 rounded-full text-xs transition-all duration-200 flex items-center gap-2"
              >
                <span>Login to write a review</span>
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* New Review Form */}
      {showReviewForm && user && (
        <Card className="border-2 border-amber-300/80 bg-white shadow-lg rounded-2xl overflow-hidden">
          <CardContent className="p-6">
            <form onSubmit={handleSubmitReview} className="space-y-5">
              <div>
                <label className="block text-sm font-bold text-gray-800 mb-2">
                  Overall Rating
                </label>
                <div className="flex items-center space-x-2">
                  <div className="flex space-x-1">
                    {Array.from({ length: 5 }, (_, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() =>
                          setNewReview({ ...newReview, rating: i + 1 })
                        }
                        className="focus:outline-none p-1 transition-transform hover:scale-110"
                      >
                        <Star
                          className={`w-7 h-7 ${
                            i < newReview.rating
                              ? "text-amber-400 fill-amber-400"
                              : "text-gray-300"
                          } transition-colors`}
                        />
                      </button>
                    ))}
                  </div>
                  <span className="text-sm font-extrabold text-amber-600 ml-2">
                    {newReview.rating} / 5 Stars
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-800 mb-1.5">
                  Title (Optional)
                </label>
                <input
                  type="text"
                  value={newReview.title}
                  onChange={(e) =>
                    setNewReview({ ...newReview, title: e.target.value })
                  }
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent text-sm bg-white text-black font-medium placeholder:text-gray-400"
                  placeholder="e.g. Unforgettable Kerala Backwaters Trip!"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-800 mb-1.5">
                  Your Review
                </label>
                <Textarea
                  value={newReview.content}
                  onChange={(e) =>
                    setNewReview({ ...newReview, content: e.target.value })
                  }
                  placeholder="Tell us about the hotels, itinerary, guides, and overall experience..."
                  className="min-h-[120px] resize-none border-gray-300 rounded-xl text-sm bg-white text-black font-medium placeholder:text-gray-400"
                  required
                />
              </div>

              <div className="flex space-x-3 pt-2">
                <Button
                  type="submit"
                  disabled={submitting}
                  className="bg-amber-500 hover:bg-amber-600 text-white font-bold px-6 py-2 rounded-xl text-sm"
                >
                  {submitting ? "Submitting..." : "Submit Review"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowReviewForm(false)}
                  className="px-6 py-2 rounded-xl text-sm border-gray-300"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Reviews List */}
      {reviews.length > 0 ? (
        <div className="space-y-4">
          {reviews.map((review, index) => {
            const reviewId = String(review._id || review.id || index);
            const authorName =
              (typeof review.user === "object" && review.user?.name) ||
              review.author ||
              "Verified Traveler";
            const userAvatar =
              (typeof review.user === "object" && review.user?.avatar) ||
              review.avatar ||
              `https://ui-avatars.com/api/?name=${encodeURIComponent(authorName)}&background=F59E0B&color=fff`;
            const dateStr =
              review.date ||
              (review.createdAt
                ? new Date(review.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })
                : "Recently");
            const contentStr = review.comment || review.content || "";

            const reviewUserId =
              typeof review.user === "object"
                ? review.user?._id || review.user?.id
                : review.user;
            const isOwner = Boolean(
              currentUserId &&
                reviewUserId &&
                String(currentUserId) === String(reviewUserId)
            );

            const isEditing = editingReviewId === reviewId;

            return (
              <div
                key={reviewId}
                className="bg-white rounded-2xl p-6 border border-gray-200/80 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden border border-amber-200 relative bg-amber-50 shrink-0">
                      <Image
                        src={userAvatar}
                        alt={authorName}
                        width={40}
                        height={40}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                        <span>{authorName}</span>
                        {isOwner && (
                          <span className="text-[10px] font-bold bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full border border-amber-200">
                            You
                          </span>
                        )}
                      </h4>
                      <span className="text-[11px] text-gray-500">{dateStr}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex items-center space-x-1.5 bg-amber-50 px-3 py-1 rounded-full border border-amber-200/60">
                      <div className="flex">{renderStars(isEditing ? editData.rating : review.rating)}</div>
                      <span className="text-xs font-bold text-amber-700">
                        {(isEditing ? editData.rating : review.rating)}.0
                      </span>
                    </div>

                    {/* Edit / Delete Buttons for Owner */}
                    {isOwner && !isEditing && (
                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => handleStartEdit(review)}
                          className="p-1.5 rounded-lg bg-gray-100 hover:bg-amber-100 text-gray-700 hover:text-amber-800 transition-colors text-xs font-semibold flex items-center gap-1 border border-gray-200"
                          title="Edit your review"
                        >
                          <Pencil className="w-3.5 h-3.5" />
                          <span className="hidden sm:inline">Edit</span>
                        </button>

                        <button
                          type="button"
                          disabled={deletingId === reviewId}
                          onClick={() => handleDeleteMyReview(reviewId)}
                          className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600 hover:text-rose-700 transition-colors text-xs font-semibold flex items-center gap-1 border border-rose-200"
                          title="Delete your review"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span className="hidden sm:inline">Delete</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Inline Edit Form vs Normal Display */}
                {isEditing ? (
                  <div className="mt-3 bg-amber-50/50 p-4 rounded-xl border border-amber-200 space-y-3">
                    <div>
                      <label className="block text-xs font-bold text-gray-800 mb-1">
                        Change Rating:
                      </label>
                      <div className="flex items-center space-x-1">
                        {Array.from({ length: 5 }, (_, i) => (
                          <button
                            key={i}
                            type="button"
                            onClick={() => setEditData({ ...editData, rating: i + 1 })}
                            className="p-1 focus:outline-none"
                          >
                            <Star
                              className={`w-6 h-6 ${
                                i < editData.rating
                                  ? "text-amber-400 fill-amber-400"
                                  : "text-gray-300"
                              }`}
                            />
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-800 mb-1">
                        Edit Comment:
                      </label>
                      <Textarea
                        value={editData.content}
                        onChange={(e) =>
                          setEditData({ ...editData, content: e.target.value })
                        }
                        className="min-h-[90px] border-gray-300 rounded-xl text-xs bg-white text-black font-medium"
                      />
                    </div>

                    <div className="flex items-center gap-2 pt-1">
                      <Button
                        type="button"
                        disabled={submitting}
                        onClick={() => handleSaveEditReview(reviewId)}
                        className="bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs px-4 py-1.5 rounded-lg flex items-center gap-1"
                      >
                        <Check className="w-3.5 h-3.5" /> Save Changes
                      </Button>

                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setEditingReviewId(null)}
                        className="text-xs px-4 py-1.5 rounded-lg border-gray-300 flex items-center gap-1"
                      >
                        <X className="w-3.5 h-3.5" /> Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <>
                    {review.title && (
                      <h5 className="font-bold text-gray-900 text-sm mb-1">
                        {review.title}
                      </h5>
                    )}
                    <p className="text-gray-700 text-xs sm:text-sm leading-relaxed">
                      {contentStr}
                    </p>
                  </>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-10 bg-white rounded-2xl border border-dashed border-gray-200 text-gray-500">
          <div className="w-12 h-12 rounded-full bg-amber-50 text-amber-500 flex items-center justify-center mx-auto mb-3">
            <Star className="w-6 h-6 fill-amber-400" />
          </div>
          <p className="font-bold text-gray-700 text-sm">No reviews yet</p>
          <p className="text-xs text-gray-400 mt-1">Be the first to share your travel experience for this package!</p>
        </div>
      )}
    </div>
  );
};

export default ReviewSection;
