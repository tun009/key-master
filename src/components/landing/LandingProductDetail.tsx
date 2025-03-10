
import React, { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTheme } from "@/contexts/ThemeContext";
import { ArrowLeft, Star, ShoppingCart, Calendar, Package, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Product, PackageItem } from "@/components/products/types";
import { Badge } from "@/components/ui/badge";

interface LandingProductDetailProps {
  product: Product;
  onBack: () => void;
}

interface Review {
  id: number;
  name: string;
  rating: number;
  date: string;
  comment: string;
}

const LandingProductDetail: React.FC<LandingProductDetailProps> = ({ product, onBack }) => {
  const { t, language } = useLanguage();
  const { theme } = useTheme();
  const [packages, setPackages] = useState<PackageItem[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [activeTab, setActiveTab] = useState("overview");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = () => {
      setLoading(true);
      
      // Generate mock packages
      const mockPackages: PackageItem[] = Array(product.packages || 3).fill(null).map((_, index) => ({
        id: index + 1,
        name: index === 0 ? "Basic" : index === 1 ? "Premium" : "Enterprise",
        price: index === 0 ? 29.99 : index === 1 ? 99.99 : 199.99,
        price_unit: "USD",
        limit_devices: index === 0 ? 2 : index === 1 ? 5 : 10,
        time_of_use: index === 0 ? 6 : index === 1 ? 12 : 24,
        is_active: true,
        status: "active"
      }));
      
      // Generate mock reviews
      const reviewCount = Math.floor(Math.random() * 10) + 5;
      const mockReviews: Review[] = Array(reviewCount).fill(null).map((_, index) => ({
        id: index + 1,
        name: `User ${index + 1}`,
        rating: Math.floor(Math.random() * 5) + 1,
        date: new Date(Date.now() - Math.random() * 10000000000).toLocaleDateString(),
        comment: index % 3 === 0 
          ? "Great product, works exactly as described and saved me a lot of time."
          : index % 3 === 1
          ? "Good value for money. The customer support is responsive and helpful."
          : "This product has been essential for my business. Highly recommended!"
      }));
      
      setPackages(mockPackages);
      setReviews(mockReviews);
      setLoading(false);
    };
    
    fetchData();
  }, [product]);

  const getAverageRating = () => {
    if (!reviews.length) return 0;
    const total = reviews.reduce((sum, review) => sum + review.rating, 0);
    return (total / reviews.length).toFixed(1);
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center mb-6">
        <Button 
          variant="ghost" 
          className="mr-4" 
          onClick={onBack}
        >
          <ArrowLeft className="h-5 w-5 mr-1" />
          {t("backToProducts")}
        </Button>
      </div>
      
      <div className={`rounded-xl overflow-hidden ${theme === "dark" ? "bg-gray-800" : "bg-white"} shadow-lg`}>
        <div className={`h-48 ${theme === "dark" ? "bg-gradient-to-r from-blue-900 to-purple-900" : "bg-gradient-to-r from-blue-500 to-purple-600"}`}>
        </div>
        <div className="p-6">
          <div className="flex flex-col md:flex-row justify-between items-start gap-4">
            <div>
              <h1 className="text-3xl font-bold">{product.name}</h1>
              <div className="flex items-center mt-2 text-sm">
                <div className="flex items-center mr-4">
                  <Star className="h-5 w-5 text-yellow-500 fill-yellow-500 mr-1" />
                  <span>{getAverageRating()}</span>
                  <span className="ml-1 text-muted-foreground">({reviews.length} {t("reviews")})</span>
                </div>
                <div className="flex items-center mr-4">
                  <Package className="h-5 w-5 mr-1" />
                  <span>{packages.length} {t("packages")}</span>
                </div>
                <div className="flex items-center">
                  <ShoppingCart className="h-5 w-5 mr-1" />
                  <span>{product.licenses} {t("licenses")}</span>
                </div>
              </div>
            </div>
            <Badge 
              variant={product.isActive ? "default" : "secondary"}
              className="text-sm px-3 py-1"
            >
              {product.isActive ? t("active") : t("inactive")}
            </Badge>
          </div>
        </div>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-3 mb-8">
          <TabsTrigger value="overview">{t("overview")}</TabsTrigger>
          <TabsTrigger value="packages">{t("packages")}</TabsTrigger>
          <TabsTrigger value="reviews">{t("reviews")}</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6">
          <div className={`p-6 rounded-lg ${theme === "dark" ? "bg-gray-800" : "bg-white"} shadow`}>
            <h2 className="text-2xl font-semibold mb-4">{t("productDescription")}</h2>
            <p className="mb-4">{product.post?.description || "No description available."}</p>
            
            <div className="mt-8">
              <h3 className="text-lg font-medium mb-3">{t("productDetails")}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2" />
                  <span>{t("released")}: {product.created}</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 mr-2" />
                  <span>{t("version")}: {product.version}</span>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="packages" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {packages.map((pkg) => (
              <Card key={pkg.id} className={`${theme === "dark" ? "bg-gray-800 border-gray-700" : "bg-white"}`}>
                <CardHeader className={`${pkg.name === "Premium" ? "bg-gradient-to-r from-amber-400 to-yellow-500" : "bg-gray-100 dark:bg-gray-700"} text-center py-6`}>
                  <CardTitle className={`${pkg.name === "Premium" ? "text-white" : ""}`}>
                    {pkg.name}
                  </CardTitle>
                  <div className={`text-3xl font-bold mt-2 ${pkg.name === "Premium" ? "text-white" : ""}`}>
                    ${pkg.price}
                  </div>
                  <div className={`text-sm ${pkg.name === "Premium" ? "text-white/80" : "text-muted-foreground"}`}>
                    {pkg.time_of_use} {t("months")}
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <ul className="space-y-3">
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                      <span>{pkg.limit_devices} {t("devices")}</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                      <span>{t("technicalSupport")}</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                      <span>{t("updates")}</span>
                    </li>
                  </ul>
                  <Button className="w-full mt-6">
                    {t("buyNow")}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="reviews" className="space-y-6">
          <div className={`p-6 rounded-lg ${theme === "dark" ? "bg-gray-800" : "bg-white"} shadow mb-6`}>
            <h2 className="text-2xl font-semibold mb-4">{t("customerReviews")}</h2>
            <div className="flex items-center mb-6">
              <div className="flex items-center">
                <div className="text-4xl font-bold mr-4">{getAverageRating()}</div>
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star 
                      key={star} 
                      className={`h-5 w-5 ${
                        star <= Math.ceil(parseFloat(getAverageRating())) 
                          ? "text-yellow-500 fill-yellow-500" 
                          : "text-gray-300"
                      }`} 
                    />
                  ))}
                </div>
              </div>
              <div className="ml-4 text-sm text-muted-foreground">
                {reviews.length} {t("reviews")}
              </div>
            </div>
            <Button variant="outline">
              {t("writeReview")}
            </Button>
          </div>
          
          <div className="space-y-4">
            {reviews.map((review) => (
              <div 
                key={review.id} 
                className={`p-4 rounded-lg ${theme === "dark" ? "bg-gray-800" : "bg-white"} shadow`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-medium">{review.name}</div>
                    <div className="text-sm text-muted-foreground">{review.date}</div>
                  </div>
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star 
                        key={star} 
                        className={`h-4 w-4 ${star <= review.rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`} 
                      />
                    ))}
                  </div>
                </div>
                <p className="mt-2">{review.comment}</p>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
      
      <div className="flex justify-center mt-8">
        <Button size="lg" className="px-8">
          {t("buyNow")}
        </Button>
      </div>
    </div>
  );
};

export default LandingProductDetail;
