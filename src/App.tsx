import { Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import CreatorSignup from "./pages/CreatorSignup";
import CustomizePage from "./pages/CustomizePage";
import CreatorPage from "./pages/CreatorPage";
import NotFound from "./pages/NotFound";
import { ThemeProvider } from "./contexts/ThemeContext";
import Auth from './pages/Auth';
import WorkLink from './pages/WorkLink';

export default function App() {
  return (
    <ThemeProvider>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/work/link" element={<WorkLink />} />
        <Route path="/creator-signup" element={<CreatorSignup />} />
        <Route path="/customize/:handle" element={<CustomizePage />} />
        <Route path="/:handle" element={<CreatorPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </ThemeProvider>
  );
}
