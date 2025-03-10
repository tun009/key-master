
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
  PackagePlus,
  Globe,
  Download,
  Key,
  FileText,
  Image,
  Upload,
  Eye
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLanguage } from "@/contexts/LanguageContext";
import { useNavigate } from "react-router-dom";

export interface PackageItem {
  id?: number;
  name: string;
  price: number;
  price_unit: string;
  limit_devices: number;
  time_of_use: number;
  is_active: boolean;
  status: string;
}

export interface Product {
  id: number;
  name: string;
  slug: string;
  version: string;
  packages: number;
  licenses: number;
  isActive: boolean;
  created: string;
  uuid?: string;
  update_url?: string;
  download_url?: string;
  encrypt_public_key?: string;
  encrypt_private_key?: string;
  status?: string;
  thumbnail?: File | null;
  post?: {
    title: string;
    description: string;
    html: string;
    keywords: string;
    show_full_page: boolean;
  };
}

const ProductsList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showDialog, setShowDialog] = useState(false);
  const [activeTab, setActiveTab] = useState("general");
  const { t } = useLanguage();
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
  const navigate = useNavigate();
  
  const [productForm, setProductForm] = useState({
    name: "",
    slug: "",
    version: "",
    update_url: "",
    download_url: "",
    encrypt_public_key: "",
    encrypt_private_key: "",
    status: "active",
    thumbnail: null as File | null,
    post: {
      title: "",
      description: "",
      html: "",
      keywords: "",
      show_full_page: true
    }
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    
    if (id.includes('post.')) {
      const postField = id.split('.')[1];
      setProductForm({
        ...productForm,
        post: {
          ...productForm.post,
          [postField]: value
        }
      });
    } else {
      setProductForm({
        ...productForm,
        [id]: value
      });
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      setProductForm({
        ...productForm,
        thumbnail: file
      });
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setThumbnailPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSwitchChange = (checked: boolean) => {
    setProductForm({
      ...productForm,
      post: {
        ...productForm.post,
        show_full_page: checked
      }
    });
  };

  const handleStatusChange = (status: string) => {
    setProductForm({
      ...productForm,
      status: status
    });
  };

  const handleViewProductDetails = (productId: number) => {
    navigate(`/products/${productId}`);
  };

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

  const handleCreateProduct = () => {
    console.log("Product data to submit:", productForm);
    setShowDialog(false);
    
    setProductForm({
      name: "",
      slug: "",
      version: "",
      update_url: "",
      download_url: "",
      encrypt_public_key: "",
      encrypt_private_key: "",
      status: "active",
      thumbnail: null,
      post: {
        title: "",
        description: "",
        html: "",
        keywords: "",
        show_full_page: true
      }
    });
    
    setThumbnailPreview(null);
    setActiveTab("general");
    
    toast({
      title: "Product created",
      description: "New product has been added successfully",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">{t('products')}</h2>
        <Button onClick={() => setShowDialog(true)}>
          <Plus className="mr-2 h-4 w-4" />
          {t('newProduct')}
        </Button>
      </div>
      
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={`${t('search')} ${t('products')}...`}
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
                        <DropdownMenuItem onClick={() => handleViewProductDetails(product.id)}>
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
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
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>Add New Product</DialogTitle>
            <DialogDescription>
              Create a new product for license management.
            </DialogDescription>
          </DialogHeader>
          
          <Tabs 
            value={activeTab} 
            onValueChange={setActiveTab} 
            className="w-full mt-2"
          >
            <TabsList className="grid grid-cols-2">
              <TabsTrigger value="general">General Info</TabsTrigger>
              <TabsTrigger value="post">Post Content</TabsTrigger>
            </TabsList>
            
            <TabsContent value="general" className="py-4">
              <div className="grid gap-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="name" className="text-right text-sm">Name</label>
                  <Input 
                    id="name" 
                    className="col-span-3" 
                    placeholder="Product name"
                    value={productForm.name}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="slug" className="text-right text-sm">Slug</label>
                  <Input 
                    id="slug" 
                    className="col-span-3" 
                    placeholder="product-slug"
                    value={productForm.slug}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="grid grid-cols-4 items-start gap-4">
                  <label htmlFor="thumbnail" className="text-right text-sm pt-2">Thumbnail</label>
                  <div className="col-span-3">
                    <div className="flex items-center gap-4">
                      <div className="flex-shrink-0">
                        {thumbnailPreview ? (
                          <div className="relative w-24 h-24 overflow-hidden rounded-md border">
                            <img 
                              src={thumbnailPreview} 
                              alt="Thumbnail preview" 
                              className="object-cover w-full h-full"
                            />
                          </div>
                        ) : (
                          <div className="w-24 h-24 flex items-center justify-center rounded-md border bg-muted">
                            <Image className="h-8 w-8 text-muted-foreground" />
                          </div>
                        )}
                      </div>
                      <div className="flex-grow">
                        <label htmlFor="thumbnailUpload" className="cursor-pointer">
                          <div className="flex items-center gap-2 px-4 py-2 border rounded-md hover:bg-muted">
                            <Upload className="h-4 w-4" />
                            <span>Upload Image</span>
                          </div>
                          <input 
                            type="file" 
                            id="thumbnailUpload" 
                            accept="image/*" 
                            className="hidden"
                            onChange={handleFileUpload}
                          />
                        </label>
                        <p className="text-xs text-muted-foreground mt-1">
                          Recommended size: 512x512px. Max size: 2MB
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="version" className="text-right text-sm">Version</label>
                  <Input 
                    id="version" 
                    className="col-span-3" 
                    placeholder="1.0.0"
                    value={productForm.version}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="update_url" className="text-right text-sm">Update URL</label>
                  <div className="col-span-3 flex items-center">
                    <Globe className="h-4 w-4 mr-2 text-muted-foreground" />
                    <Input 
                      id="update_url" 
                      placeholder="https://example.com/update"
                      value={productForm.update_url}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="download_url" className="text-right text-sm">Download URL</label>
                  <div className="col-span-3 flex items-center">
                    <Download className="h-4 w-4 mr-2 text-muted-foreground" />
                    <Input 
                      id="download_url" 
                      placeholder="https://example.com/download"
                      value={productForm.download_url}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="encrypt_public_key" className="text-right text-sm">Public Key</label>
                  <div className="col-span-3 flex items-center">
                    <Key className="h-4 w-4 mr-2 text-muted-foreground" />
                    <Input 
                      id="encrypt_public_key" 
                      placeholder="Public key for encryption"
                      value={productForm.encrypt_public_key}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="encrypt_private_key" className="text-right text-sm">Private Key</label>
                  <div className="col-span-3 flex items-center">
                    <Key className="h-4 w-4 mr-2 text-muted-foreground" />
                    <Input 
                      id="encrypt_private_key" 
                      placeholder="Private key for encryption"
                      value={productForm.encrypt_private_key}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label className="text-right text-sm">Status</label>
                  <div className="flex gap-4 col-span-3">
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        id="status-active"
                        name="status"
                        checked={productForm.status === "active"}
                        onChange={() => handleStatusChange("active")}
                      />
                      <Label htmlFor="status-active">Active</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        id="status-inactive"
                        name="status"
                        checked={productForm.status === "inactive"}
                        onChange={() => handleStatusChange("inactive")}
                      />
                      <Label htmlFor="status-inactive">Inactive</Label>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="post" className="py-4">
              <div className="grid gap-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="post.title" className="text-right text-sm">Title</label>
                  <Input 
                    id="post.title" 
                    className="col-span-3" 
                    placeholder="Post title"
                    value={productForm.post.title}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="grid grid-cols-4 items-start gap-4">
                  <label htmlFor="post.description" className="text-right text-sm pt-2">Description</label>
                  <Textarea 
                    id="post.description" 
                    className="col-span-3 min-h-[80px]" 
                    placeholder="Product description"
                    value={productForm.post.description}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="grid grid-cols-4 items-start gap-4">
                  <label htmlFor="post.html" className="text-right text-sm pt-2">HTML Content</label>
                  <div className="col-span-3 flex items-center">
                    <FileText className="h-4 w-4 mr-2 text-muted-foreground self-start mt-2" />
                    <Textarea 
                      id="post.html" 
                      className="min-h-[150px]" 
                      placeholder="<h1>Product content</h1>"
                      value={productForm.post.html}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="post.keywords" className="text-right text-sm">Keywords</label>
                  <Input 
                    id="post.keywords" 
                    className="col-span-3" 
                    placeholder="keyword1, keyword2, keyword3"
                    value={productForm.post.keywords}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="post.show_full_page" className="text-right text-sm">Show Full Page</label>
                  <div className="flex items-center space-x-2">
                    <Switch 
                      id="post.show_full_page" 
                      checked={productForm.post.show_full_page}
                      onCheckedChange={handleSwitchChange}
                    />
                    <Label htmlFor="post.show_full_page">
                      {productForm.post.show_full_page ? "Yes" : "No"}
                    </Label>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDialog(false)}>
              Cancel
            </Button>
            <Button type="submit" onClick={handleCreateProduct}>
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
