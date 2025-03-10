
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import { Product } from "../types";

interface ProductInfoTabProps {
  product: Product;
}

const ProductInfoTab: React.FC<ProductInfoTabProps> = ({ product }) => {
  return (
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
  );
};

export default ProductInfoTab;
