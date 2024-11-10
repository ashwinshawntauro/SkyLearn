import AuthProvider from "../providers/AuthProvider"

export default function Home() {
  return (
    <AuthProvider>
      <div className="flex relative top-1/2 justify-center min-h-full font-[family-name:var(--font-geist-sans)]">
        Welcome to Skylearn
      </div>
    </AuthProvider>
  );
}
