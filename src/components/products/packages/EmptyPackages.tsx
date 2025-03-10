
import React from "react";
import { Button } from "@/components/ui/button";
import { Package, Plus } from "lucide-react";

interface EmptyPackagesProps {
  onAddPackage: () => void;
}

const EmptyPackages: React.FC<EmptyPackagesProps> = ({ onAddPackage }) => {
  return (
    <div className="flex flex-col items-center justify-center bg-muted/20 border rounded-lg p-8">
      <Package className="h-16 w-16 text-muted-foreground mb-4" />
      <h3 className="text-lg font-medium mb-2">No Packages</h3>
      <p className="text-muted-foreground mb-4">This product doesn't have any packages yet</p>
      <Button onClick={onAddPackage}>
        <Plus className="mr-2 h-4 w-4" />
        Add Package
      </Button>
    </div>
  );
};

export default EmptyPackages;
