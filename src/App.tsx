import { Route, Routes } from "react-router-dom";
import SplashPage from "./pages/SplashPage";
import HubPage from "./pages/HubPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import PaymentPage from "./pages/PaymentPage";
import PaymentMethodPage from "./pages/PaymentMethodPage";
import FilterPage from "./pages/FilterPage";
import SuccessPage from "./pages/SuccessPage";
import PolicyPage from "./pages/PolicyPage";
import WalletPage from "./pages/WalletPage";
import ProfilePage from "./pages/ProfilePage";
import ProfileSettingsPage from "./pages/ProfileSettingsPage";
import ErrorPage from "./pages/ErrorPage";
import TrackingPage from "./pages/TrackingPage";
import SearchEmptyPage from "./pages/SearchEmptyPage";
import NotificationPage from "./pages/NotificationPage";
import NotificationDetailPage from "./pages/NotificationDetailPage";
import SupportPage from "./pages/SupportPage";
import AddressPage from "./pages/AddressPage";
import OrdersPage from "./pages/OrdersPage";
import RatingPage from "./pages/RatingPage";
import ReviewsPage from "./pages/ReviewsPage";
import OrderDetailPage from "./pages/OrderDetailPage";
import AboutPage from "./pages/AboutPage";
import CategoryPage from "./pages/CategoryPage";
import VouchersPage from "./pages/VouchersPage";
import PaymentCardsPage from "./pages/PaymentCardsPage";
import ChangePasswordPage from "./pages/ChangePasswordPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import ProductDocLapPage from "./pages/ProductDocLapPage";
import ProductNonLaPage from "./pages/ProductNonLaPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<SplashPage />} />
      <Route path="/danh-muc" element={<CategoryPage />} />
      <Route path="/san-pham/ao-banh-mi" element={<ProductDetailPage />} />
      <Route path="/san-pham/ao-doc-lap" element={<ProductDocLapPage />} />
      <Route path="/san-pham/ao-non-la" element={<ProductNonLaPage />} />
      <Route path="/hub" element={<HubPage />} />
      <Route path="/gioi-thieu" element={<AboutPage />} />
      <Route path="/trang-chu" element={<HomePage />} />
      <Route path="/dang-nhap" element={<LoginPage />} />
      <Route path="/dang-ky" element={<RegisterPage />} />
      <Route path="/thanh-toan" element={<PaymentPage />} />
      <Route path="/chon-phuong-thuc-thanh-toan" element={<PaymentMethodPage />} />
      <Route path="/bo-loc" element={<FilterPage />} />
      <Route path="/dat-hang-thanh-cong" element={<SuccessPage />} />
      <Route path="/chinh-sach" element={<PolicyPage />} />
      <Route path="/vi-tien" element={<WalletPage />} />
      <Route path="/toi" element={<ProfilePage />} />
      <Route path="/thong-tin-ca-nhan" element={<ProfileSettingsPage />} />
      <Route path="/uu-dai" element={<VouchersPage />} />
      <Route path="/the-thanh-toan" element={<PaymentCardsPage />} />
      <Route path="/doi-mat-khau" element={<ChangePasswordPage />} />
      <Route path="/loi" element={<ErrorPage />} />
      <Route path="/theo-doi-don-hang" element={<TrackingPage />} />
      <Route path="/tim-kiem" element={<SearchEmptyPage />} />
      <Route path="/thong-bao" element={<NotificationPage />} />
      <Route path="/chi-tiet-thong-bao" element={<NotificationDetailPage />} />
      <Route path="/ho-tro" element={<SupportPage />} />
      <Route path="/dia-chi-giao-hang" element={<AddressPage />} />
      <Route path="/don-hang" element={<OrdersPage />} />
      <Route path="/danh-gia" element={<RatingPage />} />
      <Route path="/xem-danh-gia" element={<ReviewsPage />} />
      <Route path="/chi-tiet-don-hang" element={<OrderDetailPage />} />
      <Route path="*" element={<SplashPage />} />
    </Routes>
  );
}
