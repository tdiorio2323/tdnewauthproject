import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase";

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check current session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        // Get user role from profiles table
        supabase
          .from('profiles')
          .select('role')
          .eq('user_id', session.user.id)
          .single()
          .then(({ data }) => {
            if (data) {
              if (data.role === 'admin') {
                navigate('/admin');
              } else if (data.role === 'brand') {
                navigate('/brand');
              } else {
                navigate('/customize');
              }
            } else {
              navigate('/customize');
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
          .from('profiles')
          .select('role')
          .eq('user_id', session.user.id)
          .single()
          .then(({ data }) => {
            if (data) {
              if (data.role === 'admin') {
                navigate('/admin');
              } else if (data.role === 'brand') {
                navigate('/brand');
              } else {
                navigate('/customize');
              }
            } else {
              navigate('/customize');
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