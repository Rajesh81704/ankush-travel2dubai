"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import api from "@/lib/api";
import { B2BRequest } from "@/types/b2b";
import {
  Building,
  Mail,
  Phone,
  Globe,
  Calendar,
  User,
  Trash2,
  Eye,
  MessageSquare,
} from "lucide-react";

export const B2BAdminDashboard = () => {
  const [requests, setRequests] = useState<B2BRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRequest, setSelectedRequest] = useState<B2BRequest | null>(null);

  const fetchB2BRequests = async () => {
    try {
      setLoading(true);
      const response = await api.get<B2BRequest[]>("/b2b-requests");
      setRequests(response.data);
    } catch (error) {
      console.error("Error fetching B2B requests:", error);
      toast.error("Failed to load B2B requests");
    } finally {
      setLoading(false);
    }
  };

  const deleteRequest = async (id: string) => {
    if (!confirm("Are you sure you want to delete this B2B request?")) return;

    try {
      await api.delete(`/b2b-requests/${id}`);
      toast.success("B2B request deleted successfully");
      fetchB2BRequests(); // Refresh the list
    } catch (error) {
      console.error("Error deleting B2B request:", error);
      toast.error("Failed to delete B2B request");
    }
  };

  const getStatusBadge = (status?: string) => {
    switch (status) {
      case "contacted":
        return <Badge className="bg-blue-100 text-blue-800">Contacted</Badge>;
      case "approved":
        return <Badge className="bg-green-100 text-green-800">Approved</Badge>;
      case "rejected":
        return <Badge className="bg-red-100 text-red-800">Rejected</Badge>;
      default:
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
    }
  };

  useEffect(() => {
    fetchB2BRequests();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">B2B Partnership Requests</h2>
        <Button onClick={fetchB2BRequests} variant="outline" size="sm">
          Refresh
        </Button>
      </div>

      {requests.length === 0 ? (
        <Card>
          <CardContent className="p-6 text-center">
            <p className="text-gray-500">No B2B requests found.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Request List */}
          <div className="space-y-4">
            {requests.map((request) => (
              <Card
                key={request._id}
                className={`cursor-pointer hover:shadow-md transition-shadow ${
                  selectedRequest?._id === request._id ? "ring-2 ring-blue-500" : ""
                }`}
                onClick={() => setSelectedRequest(request)}
              >
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Building className="h-4 w-4 text-gray-500" />
                        <h3 className="font-semibold text-gray-900">{request.companyName}</h3>
                        {getStatusBadge(request.status)}
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <User className="h-3 w-3" />
                          <span>{request.contactName}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Mail className="h-3 w-3" />
                          <span>{request.email}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedRequest(request);
                        }}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteRequest(request._id);
                        }}
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </div>
                  <div className="mt-3 text-sm text-gray-500">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <Phone className="h-3 w-3" />
                        <span>{request.phone}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        <span>{new Date(request.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Request Details */}
          {selectedRequest && (
            <Card className="sticky top-6 h-fit">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Request Details</span>
                  {getStatusBadge(selectedRequest.status)}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-1">Company Information</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Building className="h-4 w-4 text-gray-400" />
                      <span className="font-medium">{selectedRequest.companyName}</span>
                    </div>
                    {selectedRequest.website && (
                      <div className="flex items-center gap-2">
                        <Globe className="h-4 w-4 text-gray-400" />
                        <a
                          href={selectedRequest.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          {selectedRequest.website}
                        </a>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-1">Contact Person</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-gray-400" />
                      <span>{selectedRequest.contactName}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-gray-400" />
                      <a href={`mailto:${selectedRequest.email}`} className="text-blue-600 hover:underline">
                        {selectedRequest.email}
                      </a>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-gray-400" />
                      <a href={`tel:${selectedRequest.phone}`} className="text-blue-600 hover:underline">
                        {selectedRequest.phone}
                      </a>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-1">Inquiry Type</h4>
                  <Badge variant="secondary">{selectedRequest.inquiryType}</Badge>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-1 flex items-center gap-2">
                    <MessageSquare className="h-4 w-4" />
                    Message
                  </h4>
                  <p className="text-gray-700 bg-gray-50 p-3 rounded-lg">{selectedRequest.message}</p>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-1">Submitted</h4>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Calendar className="h-4 w-4" />
                    <span>{new Date(selectedRequest.createdAt).toLocaleString()}</span>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <h4 className="text-sm font-medium text-gray-500 mb-2">Actions</h4>
                  <div className="flex gap-2">
                    <Button variant="default" className="flex-1">
                      Mark as Contacted
                    </Button>
                    <Button variant="destructive" className="flex-1" onClick={() => deleteRequest(selectedRequest._id)}>
                      Delete Request
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  );
};