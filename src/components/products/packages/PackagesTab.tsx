
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import PackagesTable from "./PackagesTable";
import EmptyPackages from "./EmptyPackages";
import { PackageItem } from "../types";

interface PackagesTabProps {
  packages: PackageItem[];
  onAddPackage: () => void;
  onDeletePackage: (packageId: number | undefined) => void;
}

const PackagesTab: React.FC<PackagesTabProps> = ({ packages, onAddPackage, onDeletePackage }) => {
  return (
    <>
      {packages.length > 0 ? (
        <Card>
          <CardHeader>
            <CardTitle>Product Packages</CardTitle>
            <CardDescription>Manage packages for this product</CardDescription>
          </CardHeader>
          <CardContent>
            <PackagesTable packages={packages} onDeletePackage={onDeletePackage} />
          </CardContent>
        </Card>
      ) : (
        <EmptyPackages onAddPackage={onAddPackage} />
      )}
    </>
  );
};

export default PackagesTab;
