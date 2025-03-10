
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Eye, EyeOff, Lock, Mail, User, ArrowRight, KeyRound } from "lucide-react";
import { Switch } from "@/components/ui/switch";

const Login = () => {
  const { t } = useLanguage();
  const { login, forgotPassword, isLoading } = useAuth();
  const navigate = useNavigate();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [isForgotDialogOpen, setIsForgotDialogOpen] = useState(false);
  
  const handleLogin = async (e: React.FormEvent, isAdmin = false) => {
    e.preventDefault();
    if (await login(email, password, isAdmin)) {
      navigate("/");
    }
  };
  
  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (await forgotPassword(forgotEmail)) {
      setIsForgotDialogOpen(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-secondary/20 p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold">{t("login")}</CardTitle>
          <CardDescription>
            {t("enterCredentials")}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={(e) => handleLogin(e)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">{t("email")}</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="name@example.com" 
                  className="pl-10"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">{t("password")}</Label>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input 
                  id="password" 
                  type={showPassword ? "text" : "password"} 
                  className="pl-10"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)} 
                  required
                />
                <Button 
                  type="button" 
                  variant="ghost" 
                  size="icon"
                  className="absolute right-1 top-1 text-muted-foreground"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Switch 
                  id="remember-me" 
                  checked={rememberMe}
                  onCheckedChange={setRememberMe}
                />
                <Label htmlFor="remember-me" className="cursor-pointer">{t("rememberMe")}</Label>
              </div>
              <Dialog open={isForgotDialogOpen} onOpenChange={setIsForgotDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="link" className="px-0">{t("forgotPassword")}</Button>
                </DialogTrigger>
                <DialogContent>
                  <form onSubmit={handleForgotPassword}>
                    <DialogHeader>
                      <DialogTitle>{t("resetPassword")}</DialogTitle>
                      <DialogDescription>
                        {t("enterEmailForReset")}
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="forgot-email">{t("email")}</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input 
                            id="forgot-email" 
                            type="email" 
                            placeholder="name@example.com" 
                            className="pl-10"
                            value={forgotEmail}
                            onChange={(e) => setForgotEmail(e.target.value)}
                            required
                          />
                        </div>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="submit" disabled={isLoading}>
                        {isLoading ? t("sending") : t("sendResetLink")}
                      </Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? t("loggingIn") : t("login")}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </form>
          <div className="mt-4 flex flex-col gap-2">
            <Button 
              variant="outline" 
              className="w-full"
              onClick={(e) => handleLogin(e, true)}
              disabled={isLoading}
            >
              <KeyRound className="mr-2 h-4 w-4" />
              {t("adminLogin")}
            </Button>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <div className="text-center w-full">
            <span className="text-sm text-muted-foreground">
              {t("dontHaveAccount")}{" "}
              <Link to="/register" className="underline text-primary">
                {t("register")}
              </Link>
            </span>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
