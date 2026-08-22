import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { User, Phone, Mail, MapPin, MessageCircle, Send } from "lucide-react";
import api from "@/lib/api";
import { useAppSelector } from "@/store/hooks";

const popularDestinations = [
  "Goa",
  "Manali",
  "Kashmir",
  "Leh-Ladakh",
  "Kerala",
  "Rajasthan",
  "Himachal Pradesh",
  "Uttarakhand",
  "Andaman",
  "Meghalaya",
];

export const FloatingInquiryForm = () => {
  const user = useAppSelector((state) => state.auth.user);

  const [formData, setFormData] = useState({
    name: "",
    mobileNumber: "",
    email: "",
    destination: "",
    message: "",
  });

  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        name: prev.name || user.name || "",
        email: prev.email || user.email || "",
        mobileNumber: prev.mobileNumber || user.phone || "",
      }));
    }
  }, [user]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    api
      .post("/inquiries", formData)
      .then(() => {
        toast.success(
          "🎉 Inquiry submitted successfully! Our travel expert will contact you within 24 hours."
        );
      })
      .catch((error) => {
        toast.error("❌ Failed to submit inquiry. Please try again later.");
        console.error("Inquiry submission error:", error);
      });

    setFormData({
      name: "",
      mobileNumber: "",
      email: "",
      destination: "",
      message: "",
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <Card className="w-full max-w-sm bg-slate-700/95 backdrop-blur-lg shadow-2xl border-0 rounded-3xl py-0">
      <CardHeader className="bg-gradient-to-r from-orange-500/90 to-red-500/90 text-white rounded-t-3xl pb-3 pt-3">
        <CardTitle className="text-center text-2xl font-extrabold tracking-tight drop-shadow-lg">
          ✈️ Plan Your Dream Trip
        </CardTitle>
        <p className="text-center text-sm font-medium mt-2 text-orange-100">
          Get a free quote from our travel experts!
        </p>
      </CardHeader>

      <CardContent className="p-4">
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name */}
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-orange-400 h-5 w-5" />
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              className="w-full pl-10 pr-3 py-3 border border-slate-600 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-slate-700/80 placeholder-slate-400 text-base transition"
              placeholder="Your Name"
              autoComplete="name"
            />
          </div>

          {/* Mobile */}
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-orange-400 h-5 w-5" />
            <input
              type="tel"
              required
              value={formData.mobileNumber}
              onChange={(e) =>
                handleInputChange("mobileNumber", e.target.value)
              }
              className="w-full pl-10 pr-3 py-3 border border-slate-600 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-slate-700/80 placeholder-slate-400 text-base transition"
              placeholder="Mobile Number"
              autoComplete="tel"
              pattern="[0-9]{10,}"
              maxLength={15}
            />
          </div>

          {/* Email */}
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-orange-400 h-5 w-5" />
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              className="w-full pl-10 pr-3 py-3 border border-slate-600 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-slate-700/80 placeholder-slate-400 text-base transition"
              placeholder="Email Address"
              autoComplete="email"
            />
          </div>

          {/* Destination */}
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-orange-400 h-5 w-5" />
            <select
              value={formData.destination}
              onChange={(e) => handleInputChange("destination", e.target.value)}
              className="w-full pl-10 pr-3 py-3 border border-slate-600 rounded-xl focus:ring-2 focus:ring-orange-500 bg-slate-700/80 text-base text-slate-200 transition"
              required
            >
              <option value="" disabled>
                Select Destination
              </option>
              {popularDestinations.map((dest) => (
                <option key={dest} value={dest}>
                  {dest}
                </option>
              ))}
            </select>
          </div>

          {/* Message */}
          <div className="relative">
            <MessageCircle className="absolute left-3 top-4 text-orange-400 h-5 w-5" />
            <textarea
              rows={3}
              value={formData.message}
              onChange={(e) => handleInputChange("message", e.target.value)}
              className="w-full pl-10 pr-3 py-3 border border-slate-600 rounded-xl focus:ring-2 focus:ring-orange-500 bg-slate-700/80 placeholder-slate-400 text-base transition resize-none"
              placeholder="Your travel plans or requirements..."
            />
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full h-12 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-lg font-bold shadow-xl rounded-xl flex items-center justify-center gap-2 transition-all duration-200"
          >
            <Send className="h-5 w-5" />
            Send Enquiry
          </Button>
        </form>
        <div className="mt-6 text-center text-xs text-gray-400">
          <span>
            <span className="font-semibold text-orange-500">100% Privacy:</span>{" "}
            Your details are safe with us.
          </span>
        </div>
      </CardContent>
    </Card>
  );
};
