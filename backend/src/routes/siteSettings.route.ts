import express, { RequestHandler } from "express";
import {
  getSiteSettings,
  updateSiteSettings,
} from "@/controllers/siteSettings.controller";
import { adminVerify } from "@/middlewares/adminverify.middleware";

const siteSettingsRouter = express.Router();

// Public route to fetch dynamic content
siteSettingsRouter.get("/", getSiteSettings as RequestHandler);

// Admin protected route to update content
siteSettingsRouter.put("/", adminVerify, updateSiteSettings as RequestHandler);

export default siteSettingsRouter;
