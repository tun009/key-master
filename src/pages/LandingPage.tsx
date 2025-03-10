
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTheme } from "@/contexts/ThemeContext";
import { Sun, Moon, ChevronDown, Star, ShoppingCart, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { LanguageSwitcher } from "@/components/language/LanguageSwitcher";
import { Product } from "@/components/products/types";
import { Badge } from "@/components/ui/badge";
import LandingProductDetail from "@/components/landing/LandingProductDetail";

const LandingPage = () => {
  const { t, language } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showProductDetail, setShowProductDetail] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch mock products
    const fetchProducts = () => {
      setLoading(true);
      setTimeout(() => {
        const mockProducts = Array(6).fill(null).map((_, index) => ({
          id: index + 1,
          name: `Product ${index + 1}`,
          slug: `product-${index + 1}`,
          version: `${Math.floor(Math.random() * 5)}.${Math.floor(Math.random() * 10)}.${Math.floor(Math.random() * 10)}`,
          packages: Math.floor(Math.random() * 5) + 1,
          licenses: Math.floor(Math.random() * 100) + 10,
          isActive: Math.random() > 0.2,
          created: new Date(Date.now() - Math.random() * 10000000000).toLocaleDateString(),
          update_url: "https://example.com/update",
          download_url: "https://example.com/download",
          status: Math.random() > 0.2 ? "active" : "inactive",
          post: {
            title: `Great Product ${index + 1}`,
            description: `This is a detailed description of Product ${index + 1}. It includes all the features and benefits.`,
            html: `<h1>Product ${index + 1}</h1><p>Detailed content here</p>`,
            keywords: "license, software, protection",
            show_full_page: true
          }
        }));
        setProducts(mockProducts);
        setLoading(false);
      }, 800);
    };

    fetchProducts();
  }, []);

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setShowProductDetail(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToProducts = () => {
    setShowProductDetail(false);
    setSelectedProduct(null);
  };

  return (
    <div className={`min-h-screen ${theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"}`}>
      {/* Header */}
      <header className={`w-full ${theme === "dark" ? "bg-gray-800" : "bg-white"} shadow-md`}>
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Package className="h-8 w-8 text-primary" />
              <h1 className="text-2xl font-bold">{t("licenseManager")}</h1>
            </div>
            <div className="flex items-center space-x-4">
              <LanguageSwitcher />
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                aria-label="Toggle theme"
              >
                {theme === "light" ? (
                  <Moon className="h-5 w-5" />
                ) : (
                  <Sun className="h-5 w-5" />
                )}
              </Button>
              <Button variant="outline" size="sm" asChild>
                <Link to="/login">{t("login")}</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      {!showProductDetail && (
        <section className={`py-20 px-4 ${theme === "dark" ? "bg-gradient-to-b from-gray-800 to-gray-900" : "bg-gradient-to-b from-blue-50 to-blue-100"}`}>
          <div className="container mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              {language === "en" ? "Secure Your Software with Powerful License Management" : "Bảo vệ phần mềm của bạn với quản lý giấy phép mạnh mẽ"}
            </h1>
            <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto">
              {language === "en" 
                ? "Protect your intellectual property and manage customer licenses with our robust solution" 
                : "Bảo vệ tài sản trí tuệ và quản lý giấy phép khách hàng với giải pháp mạnh mẽ của chúng tôi"}
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button size="lg" className="text-lg px-8 py-6">
                {t("getStarted")}
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 py-6">
                {t("learnMore")}
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        {showProductDetail && selectedProduct ? (
          <LandingProductDetail 
            product={selectedProduct} 
            onBack={handleBackToProducts} 
          />
        ) : (
          <>
            <h2 className="text-3xl font-bold mb-8 text-center">{t("featuredProducts")}</h2>
            
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {Array(6).fill(null).map((_, index) => (
                  <Card key={index} className="h-96 animate-pulse">
                    <CardHeader className="h-24 bg-gray-200 dark:bg-gray-700 rounded-t-lg" />
                    <CardContent className="space-y-4 pt-4">
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
                      <div className="h-20 bg-gray-200 dark:bg-gray-700 rounded" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {products.map((product) => (
                  <Card 
                    key={product.id} 
                    className={`overflow-hidden transition-all duration-300 hover:shadow-xl cursor-pointer transform hover:-translate-y-1 ${
                      theme === "dark" ? "bg-gray-800 border-gray-700" : "bg-white"
                    }`}
                    onClick={() => handleProductClick(product)}
                  >
                    <div className={`h-32 ${theme === "dark" ? "bg-gradient-to-r from-purple-900 to-blue-900" : "bg-gradient-to-r from-blue-400 to-purple-500"}`} />
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle>{product.name}</CardTitle>
                          <CardDescription>
                            v{product.version}
                          </CardDescription>
                        </div>
                        <Badge variant={product.isActive ? "default" : "secondary"}>
                          {product.isActive ? t("active") : t("inactive")}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm mb-4">
                        {product.post?.description.substring(0, 120)}...
                      </p>
                      <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center">
                          <Package className="mr-1 h-4 w-4" />
                          <span>{product.packages} {t("packages")}</span>
                        </div>
                        <div className="flex items-center">
                          <ShoppingCart className="mr-1 h-4 w-4" />
                          <span>{product.licenses} {t("licenses")}</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="border-t flex justify-between items-center">
                      <div className="flex items-center">
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star 
                              key={star} 
                              className={`h-4 w-4 ${star <= Math.floor(Math.random() * 5) + 1 ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`} 
                            />
                          ))}
                        </div>
                        <span className="text-sm ml-2">({Math.floor(Math.random() * 100) + 5})</span>
                      </div>
                      <Button size="sm" variant="secondary">
                        {t("viewDetails")}
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
          </>
        )}
      </main>

      {/* Features Section */}
      {!showProductDetail && (
        <section className={`py-16 ${theme === "dark" ? "bg-gray-800" : "bg-gray-100"}`}>
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">{t("keyFeatures")}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: t("secureProtection"),
                  description: t("secureProtectionDesc")
                },
                {
                  title: t("easyIntegration"),
                  description: t("easyIntegrationDesc")
                },
                {
                  title: t("detailedAnalytics"),
                  description: t("detailedAnalyticsDesc")
                }
              ].map((feature, index) => (
                <div 
                  key={index} 
                  className={`p-6 rounded-lg ${
                    theme === "dark" ? "bg-gray-700" : "bg-white shadow-md"
                  }`}
                >
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p>{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className={`py-8 ${theme === "dark" ? "bg-gray-900 text-gray-300" : "bg-gray-200 text-gray-700"}`}>
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p>&copy; 2024 {t("licenseManager")}. {t("allRightsReserved")}</p>
            </div>
            <div className="flex space-x-4">
              <Link to="#" className="hover:underline">{t("terms")}</Link>
              <Link to="#" className="hover:underline">{t("privacy")}</Link>
              <Link to="#" className="hover:underline">{t("contact")}</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
