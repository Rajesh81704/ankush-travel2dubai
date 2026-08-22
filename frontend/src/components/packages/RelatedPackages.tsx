import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Star } from "lucide-react";
import Image from "next/image";
import type { RelatedPackage } from "./types";

interface RelatedPackagesProps {
  packages: RelatedPackage[];
}

export function RelatedPackages({ packages }: RelatedPackagesProps) {
  return (
    <Card className="sticky top-[72vh]">
      <CardHeader>
        <CardTitle>You Might Also Like</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {packages.map((pkg) => (
          <div key={pkg.id} className="flex space-x-3">
            <Image
              src={pkg.image || "/placeholder.svg"}
              alt={pkg.title}
              className="w-16 h-16 object-cover rounded"
              width={100}
              height={100}
            />
            <div className="flex-1">
              <h4 className="font-medium text-sm">{pkg.title}</h4>
              <p className="text-xs text-gray-600">{pkg.location}</p>
              <div className="flex items-center justify-between mt-1">
                <div className="flex items-center">
                  <Star className="w-3 h-3 fill-yellow-400 text-yellow-400 mr-1" />
                  <span className="text-xs">{pkg.rating}</span>
                </div>
                <span className="text-sm font-semibold text-orange-500">
                  ${pkg.price}
                </span>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
