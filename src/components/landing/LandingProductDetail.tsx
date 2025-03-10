import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTheme } from "@/contexts/ThemeContext";
import { ArrowLeft, Star, ShoppingCart, Calendar, Package, CheckCircle, Shield, Zap, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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

  const getAverageRating = (): string => {
    if (!reviews.length) return "0";
    const total = reviews.reduce((sum, review) => sum + review.rating, 0);
    return (total / reviews.length).toFixed(1);
  };

  const getProductImage = () => {
    const images = [
      "photo-1488590528505-98d2b5aba04b",
      "photo-1518770660439-4636190af475", 
      "photo-1461749280684-dccba630e2f6",
      "photo-1486312338219-ce68d2c6f44d",
      "photo-1649972904349-6e44c42644a7"
    ];
    
    const imageIndex = (product.id - 1) % images.length;
    return `https://images.unsplash.com/${images[imageIndex]}?auto=format&fit=crop&w=800&q=80`;
  };

  const handleBuyNow = () => {
    navigate("/login");
  };

  return (
    <div className="space-y-12">
      <div className={`rounded-xl overflow-hidden ${theme === "dark" ? "bg-gray-800" : "bg-white"} shadow-lg`}>
        <div 
          className={`h-64 bg-center bg-cover`}
          style={{ backgroundImage: `url(${getProductImage()})` }}
        >
        </div>
        <div className="p-6">
          <div className="flex flex-col md:flex-row justify-between items-start gap-4">
            <div>
              <div className="flex items-center mb-4">
                <Button 
                  variant="ghost" 
                  className="mr-2" 
                  onClick={onBack}
                >
                  <ArrowLeft className="h-5 w-5 mr-1" />
                  {t("backToProducts")}
                </Button>
              </div>
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
            <div className="flex flex-col items-end gap-3">
              <Badge 
                variant="default"
                className={`text-sm px-3 py-1 mb-2 ${product.isActive ? "bg-green-500 hover:bg-green-600" : "bg-red-500 hover:bg-red-600"}`}
              >
                {product.isActive ? t("active") : t("inactive")}
              </Badge>
              <Button 
                size="lg" 
                className="px-8 py-6 text-lg bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                onClick={handleBuyNow}
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                {t("buyNow")}
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Overview Section */}
      <section id="overview" className="space-y-6">
        <h2 className="text-3xl font-semibold mb-8">{t("overview")}</h2>
        <div className={`p-6 rounded-lg ${theme === "dark" ? "bg-gray-800" : "bg-white"} shadow`}>
          <h3 className="text-2xl font-semibold mb-4">{t("productDescription")}</h3>
          <p className="mb-8 text-lg">{product.post?.description || "No description available."}</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className={`p-6 rounded-lg ${theme === "dark" ? "bg-gray-700" : "bg-gray-50"}`}>
              <div className="flex items-start">
                <Shield className="h-8 w-8 text-primary mr-4 mt-1" />
                <div>
                  <h4 className="text-xl font-medium mb-2">{t("secureProtection")}</h4>
                  <p>{t("secureProtectionDesc")}</p>
                </div>
              </div>
            </div>
            
            <div className={`p-6 rounded-lg ${theme === "dark" ? "bg-gray-700" : "bg-gray-50"}`}>
              <div className="flex items-start">
                <Zap className="h-8 w-8 text-yellow-500 mr-4 mt-1" />
                <div>
                  <h4 className="text-xl font-medium mb-2">{t("easyIntegration")}</h4>
                  <p>{t("easyIntegrationDesc")}</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-8">
            <h3 className="text-xl font-medium mb-4">{t("productDetails")}</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-center">
                <Calendar className="h-5 w-5 mr-3 text-primary" />
                <span>{t("released")}: {product.created}</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 mr-3 text-green-500" />
                <span>{t("version")}: {product.version}</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-5 w-5 mr-3 text-blue-500" />
                <span>{t("lastUpdated")}: {new Date(Date.now() - Math.random() * 5000000000).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Packages Section */}
      <section id="packages" className="space-y-6">
        <h2 className="text-3xl font-semibold mb-8">{t("packages")}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {packages.map((pkg) => (
            <Card key={pkg.id} className={`${theme === "dark" ? "bg-gray-800 border-gray-700" : "bg-white"} transition-all duration-300 hover:shadow-xl hover:translate-y-[-4px] flex flex-col`}>
              <CardHeader className={`${pkg.name === "Premium" ? "bg-gradient-to-r from-amber-400 to-yellow-500" : pkg.name === "Enterprise" ? "bg-gradient-to-r from-purple-600 to-indigo-600" : "bg-gray-100 dark:bg-gray-700"} text-center py-6`}>
                <CardTitle className={`${pkg.name === "Premium" || pkg.name === "Enterprise" ? "text-white" : ""}`}>
                  {pkg.name}
                </CardTitle>
                <div className={`text-3xl font-bold mt-2 ${pkg.name === "Premium" || pkg.name === "Enterprise" ? "text-white" : ""}`}>
                  ${pkg.price}
                </div>
                <div className={`text-sm ${pkg.name === "Premium" || pkg.name === "Enterprise" ? "text-white/80" : "text-muted-foreground"}`}>
                  {pkg.time_of_use} {t("months")}
                </div>
              </CardHeader>
              <CardContent className="pt-6 flex-grow">
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
                  {pkg.name !== "Basic" && (
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                      <span>{t("prioritySupport")}</span>
                    </li>
                  )}
                  {pkg.name === "Enterprise" && (
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                      <span>{t("customBranding")}</span>
                    </li>
                  )}
                </ul>
                <div className="mt-6 pt-4">
                  <Button className="w-full" onClick={handleBuyNow}>
                    {t("buyNow")}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
      
      {/* Reviews Section */}
      <section id="reviews" className="space-y-6">
        <h2 className="text-3xl font-semibold mb-8">{t("customerReviews")}</h2>
        <div className={`p-6 rounded-lg ${theme === "dark" ? "bg-gray-800" : "bg-white"} shadow mb-6`}>
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
            <div className="flex items-center mb-4 md:mb-0">
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
                <span className="ml-2 text-sm text-muted-foreground">
                  ({reviews.length} {t("reviews")})
                </span>
              </div>
            </div>
            <Button variant="outline">
              {t("writeReview")}
            </Button>
          </div>
        </div>
        
        <div className="space-y-4">
          {reviews.map((review) => (
            <div 
              key={review.id} 
              className={`p-6 rounded-lg ${theme === "dark" ? "bg-gray-800" : "bg-white"} shadow transition-all duration-300 hover:shadow-md`}
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
              <p className="mt-4">{review.comment}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default LandingProductDetail;
