export default function Debug() {
  return (
    <pre style={{color:'#fff', padding:16}}>
      URL: {import.meta.env.VITE_SUPABASE_URL}
      {"\n"}
      KEY: {import.meta.env.VITE_SUPABASE_ANON_KEY?.slice(0,15)}...
    </pre>
  );
}