import { Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Cabana from "./pages/Cabana";
import DynamicHandle from "./pages/DynamicHandle";
import Success from "./pages/Success";
import Cancel from "./pages/Cancel";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/cabana" element={<Cabana />} />   {/* static before dynamic */}
      <Route path="/success" element={<Success />} />
      <Route path="/cancel" element={<Cancel />} />
      <Route path="/:handle" element={<DynamicHandle />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
