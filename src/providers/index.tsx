import { BrowserRouter } from "react-router-dom";
import { QueryProvider } from "./QueryProvider";
import { AuthProvider } from "./AuthProvider";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <BrowserRouter>
      <QueryProvider>
        <AuthProvider>{children}</AuthProvider>
      </QueryProvider>
    </BrowserRouter>
  );
}

export { useAuth } from "./AuthProvider";
