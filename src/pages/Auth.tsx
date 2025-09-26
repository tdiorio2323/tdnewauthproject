import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthPage } from "@/components/AuthPage";
import { supabase } from "@/integrations/supabase/client";

const Auth = () => {
	const navigate = useNavigate();
	const location = useLocation();

	useEffect(() => {
		// Check if user is already logged in
		supabase.auth.getSession().then(({ data: { session } }) => {
			if (session) {
				// Get user role from user_roles table
				supabase
					.from("user_roles")
					.select("role")
					.eq("user_id", session.user.id)
					.single()
					.then(({ data }) => {
						if (data) {
							if (data.role === "admin") {
								navigate("/admin");
							} else if (data.role === "brand") {
								navigate("/brand");
							} else {
								navigate("/shop");
							}
						} else {
							// Default to shop if no role found
							navigate("/shop");
						}
					});
			}
		});
	}, [navigate]);

	// Pass through redirect query if present
	const params = new URLSearchParams(location.search);
	const redirect = params.get("redirect") || undefined;
	return <AuthPage />;
};

export default Auth;
