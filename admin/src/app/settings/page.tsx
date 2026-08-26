"use client";

import { useState, useEffect } from "react";
import api from "@/lib/api";
import { SiteSettings } from "@/types/siteSettings";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import {
  Globe,
  Phone,
  Info,
  Handshake,
  Image as ImageIcon,
  Upload,
  Save,
  Loader2,
  Trash2,
  Plus,
  Share2,
} from "lucide-react";
import Image from "next/image";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<"hero" | "contact" | "footer" | "about" | "b2b">("hero");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingField, setUploadingField] = useState<string | null>(null);

  const [settings, setSettings] = useState<SiteSettings>({
    hero: {
      title: "",
      subtitle: "",
      badge: "",
    },
    contact: {
      phone: "",
      alternatePhone: "",
      email: "",
      address: "",
      workingHours: "",
      mapEmbedUrl: "",
    },
    footer: {
      tagline: "",
      copyright: "",
      facebookUrl: "",
      instagramUrl: "",
      whatsappNumber: "",
      twitterUrl: "",
      linkedinUrl: "",
    },
    aboutUs: {
      title: "",
      subtitle: "",
      content: "",
      mission: "",
      vision: "",
      stats: [],
    },
    b2b: {
      title: "",
      subtitle: "",
      content: "",
      benefits: [],
    },
  });

  // Fetch settings from API
  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    setLoading(true);
    try {
      const res = await api.get<{ success: boolean; data: SiteSettings }>("/site-settings");
      if (res.data?.data) {
        setSettings(res.data.data);
      }
    } catch (err) {
      console.error("Failed to fetch settings:", err);
      toast.error("Failed to load site settings");
    } finally {
      setLoading(false);
    }
  };

  // Image upload handler
  const handleImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldPath: string
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingField(fieldPath);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await api.post("/upload/image", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const uploadedImage = {
        url: res.data?.url || res.data?.data?.url || "",
        public_id: res.data?.public_id || res.data?.data?.public_id || "",
      };

      if (!uploadedImage.url) {
        toast.error("Image upload returned empty URL");
        return;
      }

      // Update nested state
      if (fieldPath === "logo") {
        setSettings((prev) => ({ ...prev, logo: uploadedImage }));
      } else if (fieldPath === "footerLogo") {
        setSettings((prev) => ({ ...prev, footerLogo: uploadedImage }));
      } else if (fieldPath === "hero.bgImage") {
        setSettings((prev) => ({
          ...prev,
          hero: { ...prev.hero, bgImage: uploadedImage },
        }));
      } else if (fieldPath === "aboutUs.bannerImage") {
        setSettings((prev) => ({
          ...prev,
          aboutUs: { ...prev.aboutUs, bannerImage: uploadedImage },
        }));
      } else if (fieldPath === "b2b.bannerImage") {
        setSettings((prev) => ({
          ...prev,
          b2b: { ...prev.b2b, bannerImage: uploadedImage },
        }));
      }

      toast.success("Image uploaded successfully");
    } catch (err) {
      console.error("Image upload failed:", err);
      toast.error("Failed to upload image");
    } finally {
      setUploadingField(null);
    }
  };

  // Save settings handler
  const handleSave = async () => {
    setSaving(true);
    try {
      await api.put("/site-settings", settings);
      toast.success("Site content & settings saved successfully!");
    } catch (err) {
      console.error("Failed to save settings:", err);
      toast.error("Failed to save site settings");
    } finally {
      setSaving(false);
    }
  };

  // Dynamic Array Helper: Stats for About Us
  const addStat = () => {
    setSettings((prev) => ({
      ...prev,
      aboutUs: {
        ...prev.aboutUs,
        stats: [...(prev.aboutUs.stats || []), { label: "", value: "" }],
      },
    }));
  };

  const updateStat = (index: number, field: "label" | "value", val: string) => {
    setSettings((prev) => {
      const updated = [...(prev.aboutUs.stats || [])];
      updated[index] = { ...updated[index], [field]: val };
      return { ...prev, aboutUs: { ...prev.aboutUs, stats: updated } };
    });
  };

  const removeStat = (index: number) => {
    setSettings((prev) => ({
      ...prev,
      aboutUs: {
        ...prev.aboutUs,
        stats: (prev.aboutUs.stats || []).filter((_, i) => i !== index),
      },
    }));
  };

  // Dynamic Array Helper: Benefits for B2B
  const addBenefit = () => {
    setSettings((prev) => ({
      ...prev,
      b2b: {
        ...prev.b2b,
        benefits: [...(prev.b2b.benefits || []), ""],
      },
    }));
  };

  const updateBenefit = (index: number, val: string) => {
    setSettings((prev) => {
      const updated = [...(prev.b2b.benefits || [])];
      updated[index] = val;
      return { ...prev, b2b: { ...prev.b2b, benefits: updated } };
    });
  };

  const removeBenefit = (index: number) => {
    setSettings((prev) => ({
      ...prev,
      b2b: {
        ...prev.b2b,
        benefits: (prev.b2b.benefits || []).filter((_, i) => i !== index),
      },
    }));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex items-center gap-3 text-muted-foreground font-medium">
          <Loader2 className="w-6 h-6 animate-spin text-primary" />
          <span>Loading dynamic site settings...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6 p-4 sm:p-6 pb-20">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-card border border-border rounded-xl p-6 shadow-sm">
        <div>
          <h1 className="text-2xl font-extrabold text-foreground flex items-center gap-2.5">
            <Globe className="w-7 h-7 text-primary" />
            Website Content & CMS Settings
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage your website logo, hero banners, contact info, footer, About Us, and B2B content dynamically.
          </p>
        </div>

        <Button onClick={handleSave} disabled={saving} className="bg-primary hover:bg-primary/90 gap-2 shrink-0">
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          {saving ? "Saving Changes..." : "Save All Settings"}
        </Button>
      </div>

      {/* Navigation Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-border pb-3">
        {[
          { id: "hero", label: "Logo & Hero Banner", icon: ImageIcon },
          { id: "contact", label: "Contact Info & Map", icon: Phone },
          { id: "footer", label: "Footer & Social", icon: Share2 },
          { id: "about", label: "About Us Page", icon: Info },
          { id: "b2b", label: "B2B Partnership", icon: Handshake },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                isActive
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "bg-card border border-border text-muted-foreground hover:text-foreground hover:border-muted-foreground/40"
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab 1: Logo & Hero */}
      {activeTab === "hero" && (
        <div className="space-y-6">
          {/* Logo Uploads */}
          <div className="bg-card border border-border rounded-xl p-6 shadow-sm space-y-4">
            <h2 className="text-lg font-bold text-foreground">Brand Logos</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Main Header Logo */}
              <div className="space-y-3">
                <label className="text-sm font-semibold text-foreground block">Main Header Logo</label>
                <div className="flex items-center gap-4">
                  {settings.logo?.url ? (
                    <div className="relative w-36 h-16 rounded-lg overflow-hidden border border-border bg-slate-900 flex items-center justify-center p-2">
                      <Image src={settings.logo.url} alt="Main Logo" fill className="object-contain" />
                    </div>
                  ) : (
                    <div className="w-36 h-16 rounded-lg border border-dashed border-border flex items-center justify-center text-xs text-muted-foreground">
                      No Logo Uploaded
                    </div>
                  )}
                  <label className="cursor-pointer">
                    <Button variant="outline" size="sm" asChild disabled={uploadingField === "logo"}>
                      <span>
                        {uploadingField === "logo" ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                        Upload Logo
                      </span>
                    </Button>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleImageUpload(e, "logo")}
                    />
                  </label>
                </div>
              </div>

              {/* Footer Logo */}
              <div className="space-y-3">
                <label className="text-sm font-semibold text-foreground block">Footer Logo</label>
                <div className="flex items-center gap-4">
                  {settings.footerLogo?.url ? (
                    <div className="relative w-36 h-16 rounded-lg overflow-hidden border border-border bg-slate-900 flex items-center justify-center p-2">
                      <Image src={settings.footerLogo.url} alt="Footer Logo" fill className="object-contain" />
                    </div>
                  ) : (
                    <div className="w-36 h-16 rounded-lg border border-dashed border-border flex items-center justify-center text-xs text-muted-foreground">
                      No Footer Logo
                    </div>
                  )}
                  <label className="cursor-pointer">
                    <Button variant="outline" size="sm" asChild disabled={uploadingField === "footerLogo"}>
                      <span>
                        {uploadingField === "footerLogo" ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                        Upload Footer Logo
                      </span>
                    </Button>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleImageUpload(e, "footerLogo")}
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Hero Banner Form */}
          <div className="bg-card border border-border rounded-xl p-6 shadow-sm space-y-4">
            <h2 className="text-lg font-bold text-foreground">Homepage Hero Banner</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-foreground mb-1 block">Hero Badge / Tag</label>
                <Input
                  placeholder="e.g. ✨ Best Price Guaranteed"
                  value={settings.hero.badge}
                  onChange={(e) =>
                    setSettings((prev) => ({
                      ...prev,
                      hero: { ...prev.hero, badge: e.target.value },
                    }))
                  }
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-foreground mb-1 block">Hero Main Title</label>
                <Input
                  placeholder="e.g. Explore Dubai Like Never Before"
                  value={settings.hero.title}
                  onChange={(e) =>
                    setSettings((prev) => ({
                      ...prev,
                      hero: { ...prev.hero, title: e.target.value },
                    }))
                  }
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-foreground mb-1 block">Hero Subtitle / Description</label>
              <Textarea
                rows={3}
                placeholder="Write a catchy tagline or description..."
                value={settings.hero.subtitle}
                onChange={(e) =>
                  setSettings((prev) => ({
                    ...prev,
                    hero: { ...prev.hero, subtitle: e.target.value },
                  }))
                }
              />
            </div>

            {/* Hero Background Image */}
            <div className="space-y-2 pt-2">
              <label className="text-xs font-semibold text-foreground block">Hero Background Image</label>
              <div className="flex items-center gap-4">
                {settings.hero.bgImage?.url ? (
                  <div className="relative w-48 h-24 rounded-lg overflow-hidden border border-border bg-slate-900">
                    <Image src={settings.hero.bgImage.url} alt="Hero Background" fill className="object-cover" />
                  </div>
                ) : (
                  <div className="w-48 h-24 rounded-lg border border-dashed border-border flex items-center justify-center text-xs text-muted-foreground">
                    No Background Uploaded
                  </div>
                )}
                <label className="cursor-pointer">
                  <Button variant="outline" size="sm" asChild disabled={uploadingField === "hero.bgImage"}>
                    <span>
                      {uploadingField === "hero.bgImage" ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                      Upload Background
                    </span>
                  </Button>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleImageUpload(e, "hero.bgImage")}
                  />
                </label>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Contact Info */}
      {activeTab === "contact" && (
        <div className="bg-card border border-border rounded-xl p-6 shadow-sm space-y-4">
          <h2 className="text-lg font-bold text-foreground">Contact Details & Map</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-foreground mb-1 block">Primary Phone Number</label>
              <Input
                placeholder="e.g. +91 98765 43210"
                value={settings.contact.phone}
                onChange={(e) =>
                  setSettings((prev) => ({
                    ...prev,
                    contact: { ...prev.contact, phone: e.target.value },
                  }))
                }
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-foreground mb-1 block">Alternate Phone / Toll-Free</label>
              <Input
                placeholder="e.g. +91 91234 56789"
                value={settings.contact.alternatePhone || ""}
                onChange={(e) =>
                  setSettings((prev) => ({
                    ...prev,
                    contact: { ...prev.contact, alternatePhone: e.target.value },
                  }))
                }
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-foreground mb-1 block">Support Email</label>
              <Input
                placeholder="e.g. info@travel2dubai.co.in"
                value={settings.contact.email}
                onChange={(e) =>
                  setSettings((prev) => ({
                    ...prev,
                    contact: { ...prev.contact, email: e.target.value },
                  }))
                }
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-foreground mb-1 block">Working Hours</label>
              <Input
                placeholder="e.g. Mon - Sat: 9:30 AM - 7:00 PM"
                value={settings.contact.workingHours || ""}
                onChange={(e) =>
                  setSettings((prev) => ({
                    ...prev,
                    contact: { ...prev.contact, workingHours: e.target.value },
                  }))
                }
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-foreground mb-1 block">Office Address</label>
            <Textarea
              rows={3}
              placeholder="e.g. Suite 402, Travel Plaza, Connaught Place, New Delhi, India"
              value={settings.contact.address}
              onChange={(e) =>
                setSettings((prev) => ({
                  ...prev,
                  contact: { ...prev.contact, address: e.target.value },
                }))
              }
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-foreground mb-1 block">Google Maps Embed URL</label>
            <Input
              placeholder="https://www.google.com/maps/embed?..."
              value={settings.contact.mapEmbedUrl || ""}
              onChange={(e) =>
                setSettings((prev) => ({
                  ...prev,
                  contact: { ...prev.contact, mapEmbedUrl: e.target.value },
                }))
              }
            />
          </div>
        </div>
      )}

      {/* Tab 3: Footer */}
      {activeTab === "footer" && (
        <div className="bg-card border border-border rounded-xl p-6 shadow-sm space-y-4">
          <h2 className="text-lg font-bold text-foreground">Footer Content & Social Media Links</h2>

          <div>
            <label className="text-xs font-semibold text-foreground mb-1 block">Footer Tagline / Short Description</label>
            <Textarea
              rows={2}
              placeholder="Your trusted partner for memorable travel packages..."
              value={settings.footer.tagline}
              onChange={(e) =>
                setSettings((prev) => ({
                  ...prev,
                  footer: { ...prev.footer, tagline: e.target.value },
                }))
              }
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-foreground mb-1 block">Copyright Notice</label>
            <Input
              placeholder="© 2026 Travel2Dubai. All rights reserved."
              value={settings.footer.copyright}
              onChange={(e) =>
                setSettings((prev) => ({
                  ...prev,
                  footer: { ...prev.footer, copyright: e.target.value },
                }))
              }
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div>
              <label className="text-xs font-semibold text-foreground mb-1 block">WhatsApp Direct Number (with Country Code)</label>
              <Input
                placeholder="e.g. +919876543210"
                value={settings.footer.whatsappNumber || ""}
                onChange={(e) =>
                  setSettings((prev) => ({
                    ...prev,
                    footer: { ...prev.footer, whatsappNumber: e.target.value },
                  }))
                }
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-foreground mb-1 block">Facebook Page URL</label>
              <Input
                placeholder="https://facebook.com/..."
                value={settings.footer.facebookUrl || ""}
                onChange={(e) =>
                  setSettings((prev) => ({
                    ...prev,
                    footer: { ...prev.footer, facebookUrl: e.target.value },
                  }))
                }
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-foreground mb-1 block">Instagram Profile URL</label>
              <Input
                placeholder="https://instagram.com/..."
                value={settings.footer.instagramUrl || ""}
                onChange={(e) =>
                  setSettings((prev) => ({
                    ...prev,
                    footer: { ...prev.footer, instagramUrl: e.target.value },
                  }))
                }
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-foreground mb-1 block">Twitter / X URL</label>
              <Input
                placeholder="https://twitter.com/..."
                value={settings.footer.twitterUrl || ""}
                onChange={(e) =>
                  setSettings((prev) => ({
                    ...prev,
                    footer: { ...prev.footer, twitterUrl: e.target.value },
                  }))
                }
              />
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: About Us */}
      {activeTab === "about" && (
        <div className="bg-card border border-border rounded-xl p-6 shadow-sm space-y-4">
          <h2 className="text-lg font-bold text-foreground">About Us Page Content</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-foreground mb-1 block">Page Title</label>
              <Input
                placeholder="e.g. About Travel2Dubai"
                value={settings.aboutUs.title}
                onChange={(e) =>
                  setSettings((prev) => ({
                    ...prev,
                    aboutUs: { ...prev.aboutUs, title: e.target.value },
                  }))
                }
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-foreground mb-1 block">Page Subtitle</label>
              <Input
                placeholder="e.g. Crafting exceptional journeys..."
                value={settings.aboutUs.subtitle}
                onChange={(e) =>
                  setSettings((prev) => ({
                    ...prev,
                    aboutUs: { ...prev.aboutUs, subtitle: e.target.value },
                  }))
                }
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-foreground mb-1 block">Main Content / Company Story</label>
            <Textarea
              rows={5}
              placeholder="Write full company overview and history..."
              value={settings.aboutUs.content}
              onChange={(e) =>
                setSettings((prev) => ({
                  ...prev,
                  aboutUs: { ...prev.aboutUs, content: e.target.value },
                }))
              }
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-foreground mb-1 block">Mission Statement</label>
              <Textarea
                rows={3}
                placeholder="e.g. To deliver world-class..."
                value={settings.aboutUs.mission || ""}
                onChange={(e) =>
                  setSettings((prev) => ({
                    ...prev,
                    aboutUs: { ...prev.aboutUs, mission: e.target.value },
                  }))
                }
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-foreground mb-1 block">Vision Statement</label>
              <Textarea
                rows={3}
                placeholder="e.g. To become India's leading..."
                value={settings.aboutUs.vision || ""}
                onChange={(e) =>
                  setSettings((prev) => ({
                    ...prev,
                    aboutUs: { ...prev.aboutUs, vision: e.target.value },
                  }))
                }
              />
            </div>
          </div>

          {/* About Us Banner Image */}
          <div className="space-y-2 pt-2">
            <label className="text-xs font-semibold text-foreground block">About Us Banner Image</label>
            <div className="flex items-center gap-4">
              {settings.aboutUs.bannerImage?.url ? (
                <div className="relative w-48 h-24 rounded-lg overflow-hidden border border-border bg-slate-900">
                  <Image src={settings.aboutUs.bannerImage.url} alt="About Us Banner" fill className="object-cover" />
                </div>
              ) : (
                <div className="w-48 h-24 rounded-lg border border-dashed border-border flex items-center justify-center text-xs text-muted-foreground">
                  No Image Uploaded
                </div>
              )}
              <label className="cursor-pointer">
                <Button variant="outline" size="sm" asChild disabled={uploadingField === "aboutUs.bannerImage"}>
                  <span>
                    {uploadingField === "aboutUs.bannerImage" ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                    Upload Banner
                  </span>
                </Button>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleImageUpload(e, "aboutUs.bannerImage")}
                />
              </label>
            </div>
          </div>

          {/* About Us Key Statistics */}
          <div className="space-y-3 pt-4 border-t border-border">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-foreground">Company Achievement Statistics</h3>
              <Button type="button" variant="outline" size="sm" onClick={addStat} className="gap-1 text-xs">
                <Plus className="w-3.5 h-3.5" /> Add Stat
              </Button>
            </div>

            {(settings.aboutUs.stats || []).map((st, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <Input
                  placeholder="e.g. 50,000+"
                  value={st.value}
                  onChange={(e) => updateStat(idx, "value", e.target.value)}
                  className="w-1/3"
                />
                <Input
                  placeholder="e.g. Happy Travelers"
                  value={st.label}
                  onChange={(e) => updateStat(idx, "label", e.target.value)}
                  className="flex-1"
                />
                <Button type="button" variant="ghost" size="icon" onClick={() => removeStat(idx)} className="text-destructive shrink-0">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 5: B2B Partnership */}
      {activeTab === "b2b" && (
        <div className="bg-card border border-border rounded-xl p-6 shadow-sm space-y-4">
          <h2 className="text-lg font-bold text-foreground">B2B Partnership Page Content</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-foreground mb-1 block">B2B Page Title</label>
              <Input
                placeholder="e.g. B2B Travel Partner Program"
                value={settings.b2b.title}
                onChange={(e) =>
                  setSettings((prev) => ({
                    ...prev,
                    b2b: { ...prev.b2b, title: e.target.value },
                  }))
                }
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-foreground mb-1 block">B2B Page Subtitle</label>
              <Input
                placeholder="e.g. Partner with Travel2Dubai to grow..."
                value={settings.b2b.subtitle}
                onChange={(e) =>
                  setSettings((prev) => ({
                    ...prev,
                    b2b: { ...prev.b2b, subtitle: e.target.value },
                  }))
                }
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-foreground mb-1 block">B2B Program Overview</label>
            <Textarea
              rows={4}
              placeholder="Explain agent benefits, wholesale rates..."
              value={settings.b2b.content}
              onChange={(e) =>
                setSettings((prev) => ({
                  ...prev,
                  b2b: { ...prev.b2b, content: e.target.value },
                }))
              }
            />
          </div>

          {/* B2B Banner Image */}
          <div className="space-y-2 pt-2">
            <label className="text-xs font-semibold text-foreground block">B2B Page Banner Image</label>
            <div className="flex items-center gap-4">
              {settings.b2b.bannerImage?.url ? (
                <div className="relative w-48 h-24 rounded-lg overflow-hidden border border-border bg-slate-900">
                  <Image src={settings.b2b.bannerImage.url} alt="B2B Banner" fill className="object-cover" />
                </div>
              ) : (
                <div className="w-48 h-24 rounded-lg border border-dashed border-border flex items-center justify-center text-xs text-muted-foreground">
                  No Banner Uploaded
                </div>
              )}
              <label className="cursor-pointer">
                <Button variant="outline" size="sm" asChild disabled={uploadingField === "b2b.bannerImage"}>
                  <span>
                    {uploadingField === "b2b.bannerImage" ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                    Upload Banner
                  </span>
                </Button>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleImageUpload(e, "b2b.bannerImage")}
                />
              </label>
            </div>
          </div>

          {/* B2B Partner Benefits List */}
          <div className="space-y-3 pt-4 border-t border-border">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-foreground">Partner Benefits List</h3>
              <Button type="button" variant="outline" size="sm" onClick={addBenefit} className="gap-1 text-xs">
                <Plus className="w-3.5 h-3.5" /> Add Benefit
              </Button>
            </div>

            {(settings.b2b.benefits || []).map((bnf, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <Input
                  placeholder="e.g. Direct DMC Wholesale Pricing for Dubai Packages & Visas"
                  value={bnf}
                  onChange={(e) => updateBenefit(idx, e.target.value)}
                  className="flex-1"
                />
                <Button type="button" variant="ghost" size="icon" onClick={() => removeBenefit(idx)} className="text-destructive shrink-0">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
