
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
import { Plus, MoreVertical, Search, Edit, Trash, CheckCircle, ShoppingCart, Eye } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";

const OrdersList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showDialog, setShowDialog] = useState(false);
  
  // Mock data for initial UI development
  const orders = Array.from({ length: 15 }).map((_, i) => ({
    id: i + 1,
    orderCode: `ORD-${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
    user: `user${Math.floor(Math.random() * 10) + 1}@example.com`,
    productPackage: `Package ${Math.floor(Math.random() * 5) + 1}`,
    price: (Math.random() * 100).toFixed(2),
    status: ['pending', 'completed', 'failed'][Math.floor(Math.random() * 3)],
    created: new Date(Date.now() - Math.random() * 10000000000).toLocaleDateString(),
  }));

  const filteredOrders = orders.filter(order => 
    order.orderCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.productPackage.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Helper for status badge color
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'default';
      case 'pending': return 'secondary';
      case 'failed': return 'destructive';
      default: return 'secondary';
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Orders</h2>
        <Button onClick={() => setShowDialog(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Create Order
        </Button>
      </div>
      
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search orders..."
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
              <TableHead>Order Code</TableHead>
              <TableHead>User</TableHead>
              <TableHead>Package</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created</TableHead>
              <TableHead className="w-[80px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredOrders.length > 0 ? (
              filteredOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <ShoppingCart className="h-4 w-4 text-primary" />
                      {order.orderCode}
                    </div>
                  </TableCell>
                  <TableCell>{order.user}</TableCell>
                  <TableCell>{order.productPackage}</TableCell>
                  <TableCell>${order.price}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusColor(order.status) as any}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell>{order.created}</TableCell>
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
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          Update Status
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          <Trash className="mr-2 h-4 w-4" />
                          Delete Order
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  No orders found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create New Order</DialogTitle>
            <DialogDescription>
              Create a new order for a user.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="user" className="text-right text-sm">User</label>
              <Input id="user" className="col-span-3" placeholder="user@example.com" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="package" className="text-right text-sm">Package</label>
              <Input id="package" className="col-span-3" placeholder="Select package" />
            </div>
          </div>
          
          <DialogFooter>
            <Button type="submit" onClick={() => {
              setShowDialog(false);
              toast({
                title: "Order created",
                description: "New order has been created successfully",
              });
            }}>
              <CheckCircle className="mr-2 h-4 w-4" />
              Create Order
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default OrdersList;
