
import React from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { Send } from "lucide-react";

const ContactForm = () => {
  const { t } = useLanguage();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted");
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl font-bold">{t("contactUs")}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Input
              placeholder={t("yourName")}
              className="w-full"
            />
          </div>
          <div>
            <Input
              type="email"
              placeholder={t("yourEmail")}
              className="w-full"
            />
          </div>
          <div>
            <Textarea
              placeholder={t("yourMessage")}
              className="w-full min-h-[150px]"
            />
          </div>
          <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
            <Send className="w-4 h-4 mr-2" />
            {t("sendMessage")}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ContactForm;
