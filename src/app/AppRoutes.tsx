import { Route, Routes } from "react-router-dom";
import HomePage from "@/features/site/HomePage";
import AboutPage from "@/features/site/AboutPage";
import ContactPage from "@/features/site/ContactPage";
import NotFoundPage from "@/features/site/NotFoundPage";
import ListingsPage from "@/features/listings/pages/ListingsPage";
import MapPage from "@/features/listings/pages/MapPage";
import PropertyDetailPage from "@/features/listings/pages/PropertyDetailPage";
import AddListingPage from "@/features/listings/pages/AddListingPage";
import AuthPage from "@/features/auth/AuthPage";
import AgentDashboardPage from "@/features/agent/AgentDashboardPage";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/listings" element={<ListingsPage />} />
      <Route path="/map" element={<MapPage />} />
      <Route path="/listing/:id" element={<PropertyDetailPage />} />
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/dashboard" element={<AgentDashboardPage />} />
      <Route path="/dodaj" element={<AddListingPage />} />
      <Route path="/o-nas" element={<AboutPage />} />
      <Route path="/kontakt" element={<ContactPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
