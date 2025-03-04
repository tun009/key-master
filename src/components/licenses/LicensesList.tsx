
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Plus, MoreVertical, Search, Copy, Edit, Trash, CheckCircle, KeyIcon, Info } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const LicensesList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showDialog, setShowDialog] = useState(false);
  
  // Mock data for initial UI development
  const licenses = Array.from({ length: 10 }).map((_, i) => ({
    id: i + 1,
    licenseCode: `LICENSE-${Math.random().toString(36).substring(2, 10).toUpperCase()}`,
    product: `Product ${(i % 3) + 1}`,
    owner: `user${i + 1}@example.com`,
    devices: Math.floor(Math.random() * 5) + 1,
    limitDevices: 5,
    expired: new Date(Date.now() + Math.random() * 10000000000).toLocaleDateString(),
    created: new Date(Date.now() - Math.random() * 10000000000).toLocaleDateString(),
  }));

  const filteredLicenses = licenses.filter(license => 
    license.licenseCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
    license.owner.toLowerCase().includes(searchQuery.toLowerCase()) ||
    license.product.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const handleCopyLicense = (license: string) => {
    navigator.clipboard.writeText(license);
    toast({
      title: "License copied",
      description: "License code copied to clipboard",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">License Keys</h2>
        <Button onClick={() => setShowDialog(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Create License
        </Button>
      </div>
      
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search licenses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8"
          />
        </div>
      </div>
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>License Code</TableHead>
              <TableHead>Product</TableHead>
              <TableHead>Owner</TableHead>
              <TableHead>Devices</TableHead>
              <TableHead>Expires</TableHead>
              <TableHead>Created</TableHead>
              <TableHead className="w-[80px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredLicenses.length > 0 ? (
              filteredLicenses.map((license) => (
                <TableRow key={license.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <KeyIcon className="h-4 w-4 text-primary" />
                      {license.licenseCode}
                    </div>
                  </TableCell>
                  <TableCell>{license.product}</TableCell>
                  <TableCell>{license.owner}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      {license.devices} / {license.limitDevices}
                      {license.devices >= license.limitDevices && 
                        <Info className="h-4 w-4 text-amber-500" />
                      }
                    </div>
                  </TableCell>
                  <TableCell>{license.expired}</TableCell>
                  <TableCell>{license.created}</TableCell>
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
                        <DropdownMenuItem onClick={() => handleCopyLicense(license.licenseCode)}>
                          <Copy className="mr-2 h-4 w-4" />
                          Copy License
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit Details
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          <Trash className="mr-2 h-4 w-4" />
                          Revoke License
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  No licenses found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create New License</DialogTitle>
            <DialogDescription>
              Generate a new license key for a user.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            {/* Form fields would go here - placeholder for now */}
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="product" className="text-right text-sm">Product</label>
              <Input id="product" className="col-span-3" placeholder="Select product" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="user" className="text-right text-sm">User</label>
              <Input id="user" className="col-span-3" placeholder="User email" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="devices" className="text-right text-sm">Devices</label>
              <Input id="devices" className="col-span-3" placeholder="Max devices" type="number" defaultValue={5} />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="expires" className="text-right text-sm">Expires</label>
              <Input id="expires" className="col-span-3" type="date" />
            </div>
          </div>
          
          <DialogFooter>
            <Button type="submit" onClick={() => {
              setShowDialog(false);
              toast({
                title: "License created",
                description: "New license has been generated successfully",
              });
            }}>
              <CheckCircle className="mr-2 h-4 w-4" />
              Create License
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LicensesList;
