import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { 
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { 
  ChevronLeft, 
  Plus, 
  Package, 
  Edit, 
  Trash, 
  CheckCircle, 
  X,
  MoreVertical,
  Smartphone,
  Clock,
  DollarSign
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { useLanguage } from "@/contexts/LanguageContext";
import { Product, PackageItem } from "./ProductsList";

const ProductDetail = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [product, setProduct] = useState<Product | null>(null);
  const [packages, setPackages] = useState<PackageItem[]>([]);
  const [showPackageDialog, setShowPackageDialog] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("info");

  const [packageForm, setPackageForm] = useState<PackageItem>({
    name: "",
    price: 99.99,
    price_unit: "USD",
    limit_devices: 5,
    time_of_use: 12,
    is_active: true,
    status: "active"
  });

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

  useEffect(() => {
    const fetchData = () => {
      setLoading(true);
      try {
        setTimeout(() => {
          const mockProduct = {
            id: parseInt(productId || "0"),
            name: `Product ${productId}`,
            slug: `product-${productId}`,
            version: "1.0.0",
            packages: 3,
            licenses: 25,
            isActive: true,
            created: new Date().toLocaleDateString(),
            update_url: "https://example.com/update",
            download_url: "https://example.com/download",
            encrypt_public_key: "public-key-example",
            encrypt_private_key: "private-key-example",
            status: "active",
            post: {
              title: "Product Introduction",
              description: "Detailed product description",
              html: "<h1>Product Content</h1>",
              keywords: "keyword1, keyword2",
              show_full_page: true
            }
          };

          const mockPackages: PackageItem[] = [
            {
              id: 1,
              name: "Basic",
              price: 99.99,
              price_unit: "USD",
              limit_devices: 5,
              time_of_use: 12,
              is_active: true,
              status: "active"
            },
            {
              id: 2,
              name: "Premium",
              price: 199.99,
              price_unit: "USD",
              limit_devices: 10,
              time_of_use: 24,
              is_active: true,
              status: "active"
            },
            {
              id: 3,
              name: "Enterprise",
              price: 499.99,
              price_unit: "USD",
              limit_devices: 50,
              time_of_use: 36,
              is_active: false,
              status: "inactive"
            }
          ];

          setProduct(mockProduct);
          setPackages(mockPackages);
          setLoading(false);
        }, 500);
      } catch (err) {
        setError("Failed to load product data");
        setLoading(false);
      }
    };

    fetchData();
  }, [productId]);

  const handleCreatePackage = () => {
    console.log("Package data to submit:", packageForm);
    
    const newPackage: PackageItem = {
      ...packageForm,
      id: packages.length + 1
    };
    
    setPackages([...packages, newPackage]);
    setShowPackageDialog(false);
    
    setPackageForm({
      name: "",
      price: 99.99,
      price_unit: "USD",
      limit_devices: 5,
      time_of_use: 12,
      is_active: true,
      status: "active"
    });
    
    toast({
      title: "Package created",
      description: "New package has been added successfully",
    });
  };

  const handleDeletePackage = (packageId: number | undefined) => {
    if (!packageId) return;
    
    setPackages(packages.filter(pkg => pkg.id !== packageId));
    
    toast({
      title: "Package deleted",
      description: "Package has been removed successfully",
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p>{t('loading')}</p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="flex items-center justify-center h-64">
        <p>{error || "Product not found"}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => navigate("/products")}
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            {t('products')}
          </Button>
          <h2 className="text-2xl font-bold">{product.name}</h2>
          <Badge variant={product.isActive ? "default" : "secondary"}>
            {product.isActive ? "Active" : "Inactive"}
          </Badge>
        </div>
        <Button onClick={() => setShowPackageDialog(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Package
        </Button>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-2">
          <TabsTrigger value="info">Product Info</TabsTrigger>
          <TabsTrigger value="packages">Packages ({packages.length})</TabsTrigger>
        </TabsList>
        
        <TabsContent value="info" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Product Details</CardTitle>
              <CardDescription>View and manage product information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium mb-1">Name</h3>
                  <p>{product.name}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium mb-1">Slug</h3>
                  <p>{product.slug}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium mb-1">Version</h3>
                  <p>{product.version}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium mb-1">Created</h3>
                  <p>{product.created}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium mb-1">Update URL</h3>
                  <p>{product.update_url}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium mb-1">Download URL</h3>
                  <p>{product.download_url}</p>
                </div>
              </div>

              {product.post && (
                <div className="mt-6">
                  <h3 className="text-lg font-medium mb-2">Post Content</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-sm font-medium mb-1">Title</h4>
                      <p>{product.post.title}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium mb-1">Keywords</h4>
                      <p>{product.post.keywords}</p>
                    </div>
                  </div>
                  <div className="mt-2">
                    <h4 className="text-sm font-medium mb-1">Description</h4>
                    <p>{product.post.description}</p>
                  </div>
                </div>
              )}
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="mr-2">
                <Edit className="mr-2 h-4 w-4" />
                Edit Product
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="packages" className="mt-4">
          {packages.length > 0 ? (
            <Card>
              <CardHeader>
                <CardTitle>Product Packages</CardTitle>
                <CardDescription>Manage packages for this product</CardDescription>
              </CardHeader>
              <CardContent>
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
                                onClick={() => handleDeletePackage(pkg.id)}
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
              </CardContent>
            </Card>
          ) : (
            <div className="flex flex-col items-center justify-center bg-muted/20 border rounded-lg p-8">
              <Package className="h-16 w-16 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">No Packages</h3>
              <p className="text-muted-foreground mb-4">This product doesn't have any packages yet</p>
              <Button onClick={() => setShowPackageDialog(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Add Package
              </Button>
            </div>
          )}
        </TabsContent>
      </Tabs>
      
      <Dialog open={showPackageDialog} onOpenChange={setShowPackageDialog}>
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
            <Button variant="outline" onClick={() => setShowPackageDialog(false)}>
              <X className="mr-2 h-4 w-4" />
              Cancel
            </Button>
            <Button onClick={handleCreatePackage}>
              <CheckCircle className="mr-2 h-4 w-4" />
              Create Package
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProductDetail;
