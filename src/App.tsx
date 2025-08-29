import { Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Cabana from "./pages/Cabana";
import NotFound from "./pages/NotFound";
// If you have a Toaster component, you can add it later

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/cabana" element={<Cabana />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {/* Add <Toaster /> back in after things compile */}
    </>
  );
}