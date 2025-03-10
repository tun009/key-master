
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, Plus } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Product } from "./types";

interface ProductHeaderProps {
  product: Product;
  onAddPackage: () => void;
}

const ProductHeader: React.FC<ProductHeaderProps> = ({ product, onAddPackage }) => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  return (
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
      <Button onClick={onAddPackage}>
        <Plus className="mr-2 h-4 w-4" />
        Add Package
      </Button>
    </div>
  );
};

export default ProductHeader;
