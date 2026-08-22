"use client";

import { useEffect } from "react";
import { useAppDispatch, useAppSelector, checkAuthStatus } from "@/store";

interface UserWrapperProps {
  children: React.ReactNode;
}

export function UserWrapper({ children }: UserWrapperProps) {
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((state) => state.auth);

  useEffect(() => {
    // Check authentication status on component mount
    dispatch(checkAuthStatus());
  }, [dispatch]);

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 rounded-full border-3 border-[#E5E7EB] border-t-[#F59E0B] animate-spin mx-auto mb-3" />
          <p className="text-[#9CA3AF] text-sm">Loading...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
