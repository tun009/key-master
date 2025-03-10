import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTheme } from "@/contexts/ThemeContext";
import { Sun, Moon, ChevronDown, Star, ShoppingCart, Package, Shield, Zap, Lightbulb, Database } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { LanguageSwitcher } from "@/components/language/LanguageSwitcher";
import { Product } from "@/components/products/types";
import { Badge } from "@/components/ui/badge";
import LandingProductDetail from "@/components/landing/LandingProductDetail";
import ContactForm from "@/components/landing/ContactForm";

const LandingPage = () => {
  const { t, language } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showProductDetail, setShowProductDetail] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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

  const keyFeatures = [
    {
      title: t("secureProtection"),
      description: t("secureProtectionDesc"),
      icon: <Shield className="h-10 w-10 text-primary mb-4" />,
      bgClass: theme === "dark" ? "bg-blue-950/40" : "bg-blue-50",
    },
    {
      title: t("easyIntegration"),
      description: t("easyIntegrationDesc"),
      icon: <Zap className="h-10 w-10 text-yellow-500 mb-4" />,
      bgClass: theme === "dark" ? "bg-yellow-950/40" : "bg-yellow-50",
    },
    {
      title: t("detailedAnalytics"),
      description: t("detailedAnalyticsDesc"),
      icon: <Database className="h-10 w-10 text-green-500 mb-4" />,
      bgClass: theme === "dark" ? "bg-green-950/40" : "bg-green-50",
    },
    {
      title: t("smartAutomation"),
      description: t("smartAutomationDesc"),
      icon: <Lightbulb className="h-10 w-10 text-purple-500 mb-4" />,
      bgClass: theme === "dark" ? "bg-purple-950/40" : "bg-purple-50",
    }
  ];

  const footerLinks = [
    {
      title: t("company"),
      links: [
        { name: t("about"), url: "#" },
        { name: t("careers"), url: "#" },
        { name: t("contact"), url: "#" },
        { name: t("blog"), url: "#" }
      ]
    },
    {
      title: t("resources"),
      links: [
        { name: t("documentation"), url: "#" },
        { name: t("api"), url: "#" },
        { name: t("community"), url: "#" },
        { name: t("tutorials"), url: "#" }
      ]
    },
    {
      title: t("legal"),
      links: [
        { name: t("terms"), url: "#" },
        { name: t("privacy"), url: "#" },
        { name: t("cookies"), url: "#" },
        { name: t("license"), url: "#" }
      ]
    }
  ];

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
            <h2 className="text-3xl font-bold mb-4 text-center">{t("keyFeatures")}</h2>
            <p className="text-xl text-center mb-12 max-w-2xl mx-auto text-muted-foreground">
              {t("keyFeaturesSubtitle")}
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {keyFeatures.map((feature, index) => (
                <div 
                  key={index} 
                  className={`p-6 rounded-xl ${feature.bgClass} border transition-all duration-300 hover:shadow-lg hover:scale-105 text-center ${
                    theme === "dark" ? "border-gray-700" : "border-gray-200"
                  }`}
                >
                  <div className="flex justify-center">{feature.icon}</div>
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Contact Section */}
      {!showProductDetail && (
        <section className="py-16">
          <div className="container mx-auto px-4">
            <ContactForm />
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className={`py-12 ${theme === "dark" ? "bg-gray-900 text-gray-300 border-t border-gray-800" : "bg-gray-200 text-gray-700 border-t border-gray-300"}`}>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Package className="h-8 w-8 text-primary" />
                <h3 className="text-xl font-bold">{t("licenseManager")}</h3>
              </div>
              <p className="mb-4 text-muted-foreground">
                {t("footerDescription")}
              </p>
              <div className="flex space-x-4">
                <a href="#" className="hover:text-primary transition-colors">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd"></path>
                  </svg>
                </a>
                <a href="#" className="hover:text-primary transition-colors">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                  </svg>
                </a>
                <a href="#" className="hover:text-primary transition-colors">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"></path>
                  </svg>
                </a>
              </div>
            </div>
            
            {footerLinks.map((column, idx) => (
              <div key={idx}>
                <h3 className="font-semibold text-lg mb-4">{column.title}</h3>
                <ul className="space-y-2">
                  {column.links.map((link, linkIdx) => (
                    <li key={linkIdx}>
                      <Link to={link.url} className="hover:text-primary transition-colors">
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          
          <div className="pt-8 mt-8 border-t flex flex-col md:flex-row justify-between items-center border-gray-700">
            <div className="mb-4 md:mb-0">
              <p>&copy; 2024 {t("licenseManager")}. {t("allRightsReserved")}</p>
            </div>
            <div className="flex space-x-6">
              <Link to="#" className="hover:text-primary transition-colors">{t("terms")}</Link>
              <Link to="#" className="hover:text-primary transition-colors">{t("privacy")}</Link>
              <Link to="#" className="hover:text-primary transition-colors">{t("contact")}</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
