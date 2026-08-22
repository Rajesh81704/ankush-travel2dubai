export enum B2BInquiryType {
  CorporatePackages = "Corporate Packages",
  GroupTours = "Group Tours",
  MICE = "MICE (Meetings, Incentives, Conferences, Events)",
  CustomItineraries = "Custom Itineraries",
  PartnershipOpportunities = "Partnership Opportunities",
  Other = "Other",
}

export interface B2BRequestForm {
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  website: string;
  inquiryType: string;
  message: string;
}

export interface B2BRequest {
  _id: string;
  companyName: string;
  email: string;
  phone: string;
  website?: string;
  message: string;
  contactName: string;
  inquiryType: string;
  createdAt: string;
  status?: "pending" | "contacted" | "approved" | "rejected";
}

export interface B2BApiResponse {
  success: boolean;
  message: string;
  data?: B2BRequest;
}