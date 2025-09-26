// Supabase temporarily disabled for frontend development
const mockSupabase = {
	auth: {
		getSession: async () => ({ data: { session: null } }),
		signInWithPassword: async () => ({
			data: { user: null },
			error: { message: "supabase disabled" },
		}),
		signUp: async () => ({
			data: { user: null },
			error: { message: "supabase disabled" },
		}),
		signOut: async () => ({ error: null }),
	},
	from: () => ({
		select: async () => ({
			data: [],
			error: { message: "supabase disabled" },
		}),
		insert: async () => ({
			data: null,
			error: { message: "supabase disabled" },
		}),
		update: async () => ({
			data: null,
			error: { message: "supabase disabled" },
		}),
		delete: async () => ({
			data: null,
			error: { message: "supabase disabled" },
		}),
		upsert: async () => ({
			data: null,
			error: { message: "supabase disabled" },
		}),
		eq() {
			return this;
		},
		single() {
			return this;
		},
		order() {
			return this;
		},
		in() {
			return this;
		},
	}),
} as any;

export const supabase = mockSupabase;
export default mockSupabase;
