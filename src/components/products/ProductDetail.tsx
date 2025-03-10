
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import { Product, PackageItem } from "./types";
import ProductHeader from "./ProductHeader";
import ProductInfoTab from "./info/ProductInfoTab";
import PackagesTab from "./packages/PackagesTab";
import PackageForm from "./packages/PackageForm";

const ProductDetail = () => {
  const { productId } = useParams();
  const { t } = useLanguage();
  const [product, setProduct] = useState<Product | null>(null);
  const [packages, setPackages] = useState<PackageItem[]>([]);
  const [showPackageDialog, setShowPackageDialog] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("info");

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

  const handleCreatePackage = (packageData: PackageItem) => {
    console.log("Package data to submit:", packageData);
    
    const newPackage: PackageItem = {
      ...packageData,
      id: packages.length + 1
    };
    
    setPackages([...packages, newPackage]);
    setShowPackageDialog(false);
    
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
      <ProductHeader 
        product={product} 
        onAddPackage={() => setShowPackageDialog(true)} 
      />
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-2">
          <TabsTrigger value="info">Product Info</TabsTrigger>
          <TabsTrigger value="packages">Packages ({packages.length})</TabsTrigger>
        </TabsList>
        
        <TabsContent value="info" className="space-y-4 mt-4">
          <ProductInfoTab product={product} />
        </TabsContent>
        
        <TabsContent value="packages" className="mt-4">
          <PackagesTab 
            packages={packages} 
            onAddPackage={() => setShowPackageDialog(true)} 
            onDeletePackage={handleDeletePackage} 
          />
        </TabsContent>
      </Tabs>
      
      <PackageForm 
        open={showPackageDialog} 
        onOpenChange={setShowPackageDialog}
        onSubmit={handleCreatePackage}
      />
    </div>
  );
};

export default ProductDetail;
