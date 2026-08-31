"use client";

import { useEffect } from "react";
import { useSiteSettings } from "@/context/SiteSettingsContext";

export function DynamicFavicon() {
  const { settings } = useSiteSettings();

  useEffect(() => {
    if (typeof window !== "undefined" && settings.logo?.url) {
      // Find existing favicon link or create a new one
      let link: HTMLLinkElement | null = document.querySelector("link[rel*='icon']");
      if (!link) {
        link = document.createElement("link");
        link.rel = "shortcut icon";
        document.getElementsByTagName("head")[0].appendChild(link);
      }
      link.href = settings.logo.url;

      // Update apple touch icon if present
      let appleLink: HTMLLinkElement | null = document.querySelector("link[rel='apple-touch-icon']");
      if (appleLink) {
        appleLink.href = settings.logo.url;
      }
    }
  }, [settings.logo?.url]);

  return null;
}
