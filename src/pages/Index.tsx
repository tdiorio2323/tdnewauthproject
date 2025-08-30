import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase, SUPABASE_ENABLED } from "@/integrations/supabase/client";

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // If Supabase is not configured, fall back to auth route
    if (!SUPABASE_ENABLED) {
      navigate('/auth');
      return;
    }

    // Check current session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        // Get user role from users table
        supabase
          .from('users')
          .select('role')
          .eq('id', session.user.id)
          .single()
          .then(({ data }) => {
            if (data) {
              if (data.role === 'admin') {
                navigate('/admin');
              } else if (data.role === 'brand') {
                navigate('/brand');
              } else {
                navigate('/shop');
              }
            }
          });
      } else {
        // No session, redirect to auth
        navigate('/auth');
      }
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session) {
        supabase
          .from('users')
          .select('role')
          .eq('id', session.user.id)
          .single()
          .then(({ data }) => {
            if (data) {
              if (data.role === 'admin') {
                navigate('/admin');
              } else if (data.role === 'brand') {
                navigate('/brand');
              } else {
                navigate('/shop');
              }
            }
          });
      } else if (event === 'SIGNED_OUT') {
        navigate('/auth');
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/home-bg.jpg')" }}
    >
      <div className="min-h-screen flex items-center justify-center bg-white/10 backdrop-blur-[1px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
