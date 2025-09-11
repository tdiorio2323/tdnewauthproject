import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { savePageSettings } from "@/lib/pageSettings";

export default function Seed() {
  const { handle = "demo" } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function run() {
      await savePageSettings({
        handle,
        theme: "glass",
        font: "Inter",
        colors: [160, 100, 60, 15],
        buttonStyle: "glass",
        buttonLayout: "rounded",
        icon: "✨",
      });
      navigate(`/${handle}`);
    }
    run();
  }, [handle, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center text-sm text-slate-600">
        Seeding page settings for <span className="font-medium">@{handle}</span>...
      </div>
    </div>
  );
}

