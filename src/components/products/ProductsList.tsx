
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
import { 
  Plus, 
  MoreVertical, 
  Search, 
  Edit, 
  Trash, 
  CheckCircle, 
  Package, 
  PackagePlus
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";

const ProductsList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showDialog, setShowDialog] = useState(false);
  
  // Mock data for initial UI development
  const products = Array.from({ length: 6 }).map((_, i) => ({
    id: i + 1,
    name: `Product ${i + 1}`,
    slug: `product-${i + 1}`,
    version: `${Math.floor(Math.random() * 10)}.${Math.floor(Math.random() * 10)}.${Math.floor(Math.random() * 10)}`,
    packages: Math.floor(Math.random() * 4) + 1,
    licenses: Math.floor(Math.random() * 100),
    isActive: Math.random() > 0.2,
    created: new Date(Date.now() - Math.random() * 10000000000).toLocaleDateString(),
  }));

  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.slug.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.version.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Products</h2>
        <Button onClick={() => setShowDialog(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Product
        </Button>
      </div>
      
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search products..."
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
              <TableHead>Name</TableHead>
              <TableHead>Version</TableHead>
              <TableHead>Packages</TableHead>
              <TableHead>Licenses</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created</TableHead>
              <TableHead className="w-[80px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <Package className="h-4 w-4 text-primary" />
                      {product.name}
                    </div>
                    <div className="text-xs text-muted-foreground">{product.slug}</div>
                  </TableCell>
                  <TableCell>{product.version}</TableCell>
                  <TableCell>{product.packages}</TableCell>
                  <TableCell>{product.licenses}</TableCell>
                  <TableCell>
                    <Badge variant={product.isActive ? "default" : "secondary"}>
                      {product.isActive ? "Active" : "Inactive"}
                    </Badge>
                  </TableCell>
                  <TableCell>{product.created}</TableCell>
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
                          Edit Product
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <PackagePlus className="mr-2 h-4 w-4" />
                          Add Package
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          <Trash className="mr-2 h-4 w-4" />
                          Delete Product
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  No products found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add New Product</DialogTitle>
            <DialogDescription>
              Create a new product for license management.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="name" className="text-right text-sm">Name</label>
              <Input id="name" className="col-span-3" placeholder="Product name" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="slug" className="text-right text-sm">Slug</label>
              <Input id="slug" className="col-span-3" placeholder="product-slug" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="version" className="text-right text-sm">Version</label>
              <Input id="version" className="col-span-3" placeholder="1.0.0" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="download" className="text-right text-sm">Download URL</label>
              <Input id="download" className="col-span-3" placeholder="https://..." />
            </div>
          </div>
          
          <DialogFooter>
            <Button type="submit" onClick={() => {
              setShowDialog(false);
              toast({
                title: "Product created",
                description: "New product has been added successfully",
              });
            }}>
              <CheckCircle className="mr-2 h-4 w-4" />
              Create Product
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProductsList;
