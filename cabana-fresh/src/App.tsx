import React from "react";

export default function App() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-black via-gray-900 to-black text-white">
      <div className="w-full max-w-md bg-black/40 rounded-2xl p-6 border border-white/10 backdrop-blur-md">
        {/* Header */}
        <h1 className="text-center text-2xl font-bold mb-6"> @JOINCABANA</h1>

        {/* Social Links */}
        <div className="space-y-3">
          <a
            href="#"
            className="block w-full rounded-lg bg-white/10 px-4 py-3 hover:bg-white/20 transition"
          >
            Instagram
          </a>
          <a
            href="#"
            className="block w-full rounded-lg bg-white/10 px-4 py-3 hover:bg-white/20 transition"
          >
            YouTube
          </a>
          <a
            href="#"
            className="block w-full rounded-lg bg-white/10 px-4 py-3 hover:bg-white/20 transition"
          >
            TikTok
          </a>
          <a
            href="#"
            className="block w-full rounded-lg bg-white/10 px-4 py-3 hover:bg-white/20 transition"
          >
            Shop
          </a>
        </div>

        {/* VIP Access */}
        <div className="mt-6 border border-white/20 rounded-lg p-4 bg-black/30">
          <h2 className="font-semibold text-lg">VIP Access</h2>
          <p className="text-sm text-gray-300 mb-3">
            Get early access and your own link page.
          </p>
          <form className="space-y-3">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-3 py-2 rounded-lg bg-black/50 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <button
              type="submit"
              className="w-full py-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 font-semibold hover:opacity-90"
            >
              Claim VIP Access
            </button>
          </form>
        </div>

        {/* Footer */}
        <div className="mt-6 text-center text-xs text-gray-400">
          <p>Terms • Privacy • DMCA</p>
        </div>
      </div>
    </div>
  );
}