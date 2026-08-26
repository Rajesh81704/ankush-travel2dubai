import { Request, Response } from "express";
import { SiteSettingsModel } from "@/models/siteSettings.model";
import { logger } from "@/utils/logger";

/**
 * GET /api/site-settings
 * Returns global site content and settings. Creates default settings if none exists.
 */
export const getSiteSettings = async (_req: Request, res: Response) => {
  try {
    let settings = await SiteSettingsModel.findOne();
    if (!settings) {
      settings = await SiteSettingsModel.create({});
    }
    return res.status(200).json({
      success: true,
      data: settings,
    });
  } catch (error: any) {
    logger.error("Error fetching site settings:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch site settings",
      error: error.message,
    });
  }
};

/**
 * PUT /api/site-settings
 * Updates global site content and settings (Admin authentication required).
 */
export const updateSiteSettings = async (req: Request, res: Response) => {
  try {
    const updateData = req.body;
    let settings = await SiteSettingsModel.findOne();

    if (!settings) {
      settings = await SiteSettingsModel.create(updateData);
    } else {
      // Merge updateData into settings document
      if (updateData.logo) settings.logo = { ...settings.logo, ...updateData.logo };
      if (updateData.footerLogo) settings.footerLogo = { ...settings.footerLogo, ...updateData.footerLogo };
      if (updateData.hero) settings.hero = { ...settings.hero, ...updateData.hero };
      if (updateData.contact) settings.contact = { ...settings.contact, ...updateData.contact };
      if (updateData.footer) settings.footer = { ...settings.footer, ...updateData.footer };
      if (updateData.aboutUs) settings.aboutUs = { ...settings.aboutUs, ...updateData.aboutUs };
      if (updateData.b2b) settings.b2b = { ...settings.b2b, ...updateData.b2b };

      await settings.save();
    }

    return res.status(200).json({
      success: true,
      message: "Site settings updated successfully",
      data: settings,
    });
  } catch (error: any) {
    logger.error("Error updating site settings:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to update site settings",
      error: error.message,
    });
  }
};
