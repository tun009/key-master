
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
    
    // Authentication
    login: "Login",
    logout: "Logout",
    register: "Register",
    email: "Email",
    password: "Password",
    confirmPassword: "Confirm Password",
    name: "Name",
    rememberMe: "Remember me",
    forgotPassword: "Forgot password?",
    resetPassword: "Reset Password",
    enterEmailForReset: "Enter your email address and we'll send you a link to reset your password.",
    sendResetLink: "Send Reset Link",
    sending: "Sending...",
    loggingIn: "Logging in...",
    registering: "Registering...",
    enterCredentials: "Enter your credentials to access your account",
    createAccount: "Create an Account",
    enterDetailsToRegister: "Enter your details to create a new account",
    yourName: "Your name",
    dontHaveAccount: "Don't have an account?",
    alreadyHaveAccount: "Already have an account?",
    passwordsDoNotMatch: "Passwords do not match",
    passwordTooShort: "Password must be at least 6 characters",
    adminLogin: "Admin Login",
    
    // Landing Page
    getStarted: "Get Started",
    learnMore: "Learn More",
    featuredProducts: "Featured Products",
    keyFeatures: "Key Features",
    secureProtection: "Secure Protection",
    secureProtectionDesc: "Protect your software with advanced encryption and license validation technology.",
    easyIntegration: "Easy Integration",
    easyIntegrationDesc: "Simple SDK and API integration for all major programming languages and platforms.",
    detailedAnalytics: "Detailed Analytics",
    detailedAnalyticsDesc: "Get insights into license usage, customer behavior, and sales performance.",
    allRightsReserved: "All Rights Reserved",
    terms: "Terms",
    privacy: "Privacy",
    contact: "Contact",
    active: "Active",
    inactive: "Inactive",
    packages: "Packages",
    viewDetails: "View Details",
    backToProducts: "Back to Products",
    reviews: "Reviews",
    overview: "Overview",
    productDescription: "Product Description",
    productDetails: "Product Details",
    released: "Released",
    version: "Version",
    months: "Months",
    devices: "Devices",
    technicalSupport: "Technical Support",
    updates: "Free Updates",
    buyNow: "Buy Now",
    customerReviews: "Customer Reviews",
    writeReview: "Write a Review",
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
    
    // Authentication
    login: "Đăng nhập",
    logout: "Đăng xuất",
    register: "Đăng ký",
    email: "Email",
    password: "Mật khẩu",
    confirmPassword: "Xác nhận mật khẩu",
    name: "Tên",
    rememberMe: "Ghi nhớ đăng nhập",
    forgotPassword: "Quên mật khẩu?",
    resetPassword: "Đặt lại mật khẩu",
    enterEmailForReset: "Nhập địa chỉ email của bạn và chúng tôi sẽ gửi cho bạn liên kết để đặt lại mật khẩu.",
    sendResetLink: "Gửi liên kết đặt lại",
    sending: "Đang gửi...",
    loggingIn: "Đang đăng nhập...",
    registering: "Đang đăng ký...",
    enterCredentials: "Nhập thông tin đăng nhập để truy cập tài khoản của bạn",
    createAccount: "Tạo tài khoản",
    enterDetailsToRegister: "Nhập thông tin của bạn để tạo tài khoản mới",
    yourName: "Tên của bạn",
    dontHaveAccount: "Chưa có tài khoản?",
    alreadyHaveAccount: "Đã có tài khoản?",
    passwordsDoNotMatch: "Mật khẩu không khớp",
    passwordTooShort: "Mật khẩu phải có ít nhất 6 ký tự",
    adminLogin: "Đăng nhập Admin",
    
    // Landing Page
    getStarted: "Bắt đầu",
    learnMore: "Tìm hiểu thêm",
    featuredProducts: "Sản phẩm nổi bật",
    keyFeatures: "Tính năng chính",
    secureProtection: "Bảo vệ an toàn",
    secureProtectionDesc: "Bảo vệ phần mềm của bạn với công nghệ mã hóa nâng cao và xác thực giấy phép.",
    easyIntegration: "Dễ dàng tích hợp",
    easyIntegrationDesc: "SDK và API tích hợp đơn giản cho tất cả các ngôn ngữ lập trình và nền tảng chính.",
    detailedAnalytics: "Phân tích chi tiết",
    detailedAnalyticsDesc: "Nắm bắt thông tin về việc sử dụng giấy phép, hành vi khách hàng và hiệu suất bán hàng.",
    allRightsReserved: "Đã đăng ký Bản quyền",
    terms: "Điều khoản",
    privacy: "Riêng tư",
    contact: "Liên hệ",
    active: "Hoạt động",
    inactive: "Không hoạt động",
    packages: "Gói",
    viewDetails: "Xem chi tiết",
    backToProducts: "Quay lại Sản phẩm",
    reviews: "Đánh giá",
    overview: "Tổng quan",
    productDescription: "Mô tả sản phẩm",
    productDetails: "Chi tiết sản phẩm",
    released: "Phát hành",
    version: "Phiên bản",
    months: "Tháng",
    devices: "Thiết bị",
    technicalSupport: "Hỗ trợ kỹ thuật",
    updates: "Cập nhật miễn phí",
    buyNow: "Mua ngay",
    customerReviews: "Đánh giá khách hàng",
    writeReview: "Viết đánh giá",
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
