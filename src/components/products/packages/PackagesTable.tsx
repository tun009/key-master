
import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Package, Edit, Trash, MoreVertical, Smartphone, Clock, DollarSign } from "lucide-react";
import { PackageItem } from "../types";

interface PackagesTableProps {
  packages: PackageItem[];
  onDeletePackage: (packageId: number | undefined) => void;
}

const PackagesTable: React.FC<PackagesTableProps> = ({ packages, onDeletePackage }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Devices</TableHead>
          <TableHead>Time (Months)</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="w-[80px]">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {packages.map((pkg) => (
          <TableRow key={pkg.id}>
            <TableCell className="font-medium">
              <div className="flex items-center gap-2">
                <Package className="h-4 w-4 text-primary" />
                {pkg.name}
              </div>
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-1">
                <DollarSign className="h-3 w-3 text-muted-foreground" />
                {pkg.price} {pkg.price_unit}
              </div>
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-1">
                <Smartphone className="h-3 w-3 text-muted-foreground" />
                {pkg.limit_devices}
              </div>
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3 text-muted-foreground" />
                {pkg.time_of_use}
              </div>
            </TableCell>
            <TableCell>
              <Badge variant={pkg.is_active ? "default" : "secondary"}>
                {pkg.is_active ? "Active" : "Inactive"}
              </Badge>
            </TableCell>
            <TableCell>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuItem>
                    <Edit className="mr-2 h-4 w-4" />
                    Edit Package
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    className="text-destructive"
                    onClick={() => onDeletePackage(pkg.id)}
                  >
                    <Trash className="mr-2 h-4 w-4" />
                    Delete Package
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default PackagesTable;
