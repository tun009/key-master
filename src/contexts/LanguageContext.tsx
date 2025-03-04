
import React, { createContext, useContext, useState, ReactNode } from "react";

// Define the available languages
export type Language = "en" | "vi";

// Define the translation structure
interface Translations {
  [key: string]: {
    [key: string]: string;
  };
}

// Create translations for English and Vietnamese
const translations: Translations = {
  en: {
    // Dashboard
    dashboard: "Dashboard",
    licenses: "Licenses",
    products: "Products",
    users: "Users",
    orders: "Orders",
    settings: "Settings",
    licenseManager: "License Manager",
    
    // Header
    notifications: "Notifications",
    viewAllNotifications: "View all notifications",
    myAccount: "My Account",
    profile: "Profile",
    logOut: "Log out",
    
    // Error page
    pageNotFound: "Oops! Page not found",
    returnToHome: "Return to Home",
    
    // Common
    loading: "Loading...",
    error: "An error occurred",
    submit: "Submit",
    cancel: "Cancel",
    delete: "Delete",
    edit: "Edit",
    save: "Save",
    search: "Search",
    filter: "Filter",
    sort: "Sort",
    create: "Create",
    update: "Update",
    newLicense: "New License",
    newProduct: "New Product",
    newUser: "New User",
    newOrder: "New Order",
  },
  vi: {
    // Dashboard
    dashboard: "Bảng điều khiển",
    licenses: "Giấy phép",
    products: "Sản phẩm",
    users: "Người dùng",
    orders: "Đơn hàng",
    settings: "Cài đặt",
    licenseManager: "Quản lý giấy phép",
    
    // Header
    notifications: "Thông báo",
    viewAllNotifications: "Xem tất cả thông báo",
    myAccount: "Tài khoản của tôi",
    profile: "Hồ sơ",
    logOut: "Đăng xuất",
    
    // Error page
    pageNotFound: "Rất tiếc! Không tìm thấy trang",
    returnToHome: "Trở về trang chủ",
    
    // Common
    loading: "Đang tải...",
    error: "Đã xảy ra lỗi",
    submit: "Gửi",
    cancel: "Hủy",
    delete: "Xóa",
    edit: "Sửa",
    save: "Lưu",
    search: "Tìm kiếm",
    filter: "Lọc",
    sort: "Sắp xếp",
    create: "Tạo mới",
    update: "Cập nhật",
    newLicense: "Giấy phép mới",
    newProduct: "Sản phẩm mới",
    newUser: "Người dùng mới",
    newOrder: "Đơn hàng mới",
  }
};

// Create the language context
interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Create a provider component
export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>("en");

  // Translation function
  const t = (key: string): string => {
    if (translations[language] && translations[language][key]) {
      return translations[language][key];
    }
    
    // Fallback to English or return the key if not found
    return translations.en[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Create a custom hook for using the language context
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
