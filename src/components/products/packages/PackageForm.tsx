
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { CheckCircle, X } from "lucide-react";
import { PackageItem } from "../types";

interface PackageFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (packageData: PackageItem) => void;
}

const defaultPackage: PackageItem = {
  name: "",
  price: 99.99,
  price_unit: "USD",
  limit_devices: 5,
  time_of_use: 12,
  is_active: true,
  status: "active"
};

const PackageForm: React.FC<PackageFormProps> = ({ open, onOpenChange, onSubmit }) => {
  const [packageForm, setPackageForm] = useState<PackageItem>(defaultPackage);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value, type } = e.target;
    
    if (type === 'number') {
      setPackageForm({
        ...packageForm,
        [id]: parseFloat(value) || 0
      });
    } else {
      setPackageForm({
        ...packageForm,
        [id]: value
      });
    }
  };

  const handleSwitchChange = (checked: boolean) => {
    setPackageForm({
      ...packageForm,
      is_active: checked
    });
  };

  const handleStatusChange = (status: string) => {
    setPackageForm({
      ...packageForm,
      status
    });
  };

  const handleSubmit = () => {
    onSubmit(packageForm);
    setPackageForm(defaultPackage);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>Add New Package</DialogTitle>
          <DialogDescription>
            Create a new package for this product.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              value={packageForm.name}
              onChange={handleInputChange}
              className="col-span-3"
              placeholder="Basic Plan"
            />
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="price" className="text-right">
              Price
            </Label>
            <div className="col-span-3 flex gap-2">
              <Input
                id="price"
                type="number"
                value={packageForm.price}
                onChange={handleInputChange}
                className="flex-1"
              />
              <Input
                id="price_unit"
                value={packageForm.price_unit}
                onChange={handleInputChange}
                className="w-20"
                placeholder="USD"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="limit_devices" className="text-right">
              Device Limit
            </Label>
            <Input
              id="limit_devices"
              type="number"
              value={packageForm.limit_devices}
              onChange={handleInputChange}
              className="col-span-3"
            />
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="time_of_use" className="text-right">
              Months
            </Label>
            <Input
              id="time_of_use"
              type="number"
              value={packageForm.time_of_use}
              onChange={handleInputChange}
              className="col-span-3"
            />
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Status</Label>
            <div className="flex gap-4 col-span-3">
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  id="status-active"
                  name="status"
                  checked={packageForm.status === "active"}
                  onChange={() => handleStatusChange("active")}
                />
                <Label htmlFor="status-active">Active</Label>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  id="status-inactive"
                  name="status"
                  checked={packageForm.status === "inactive"}
                  onChange={() => handleStatusChange("inactive")}
                />
                <Label htmlFor="status-inactive">Inactive</Label>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="is_active" className="text-right">
              Is Active
            </Label>
            <div className="flex items-center space-x-2">
              <Switch
                id="is_active"
                checked={packageForm.is_active}
                onCheckedChange={handleSwitchChange}
              />
              <Label htmlFor="is_active">
                {packageForm.is_active ? "Yes" : "No"}
              </Label>
            </div>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            <X className="mr-2 h-4 w-4" />
            Cancel
          </Button>
          <Button onClick={handleSubmit}>
            <CheckCircle className="mr-2 h-4 w-4" />
            Create Package
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PackageForm;
