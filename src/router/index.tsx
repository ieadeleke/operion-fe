import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "@/providers";

// Layouts
import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import { AuthLayout } from "@/components/layouts/AuthLayout";

// Auth pages
import { LoginPage } from "@/features/auth/pages/LoginPage";
import { RegisterPage } from "@/features/auth/pages/RegisterPage";

// Dashboard pages
import { DashboardPage } from "@/features/dashboard/pages/DashboardPage";

// Placeholder pages (to be implemented)
function BookingsPage() {
  return <div className="space-y-4"><h1 className="text-3xl font-bold">Bookings</h1><p className="text-muted-foreground">Booking calendar and management coming soon.</p></div>;
}

function GuestsPage() {
  return <div className="space-y-4"><h1 className="text-3xl font-bold">Guests</h1><p className="text-muted-foreground">Guest CRM coming soon.</p></div>;
}

function RoomsPage() {
  return <div className="space-y-4"><h1 className="text-3xl font-bold">Rooms</h1><p className="text-muted-foreground">Room management coming soon.</p></div>;
}

function EmailsPage() {
  return <div className="space-y-4"><h1 className="text-3xl font-bold">Emails</h1><p className="text-muted-foreground">AI Email automation coming soon.</p></div>;
}

function CallsPage() {
  return <div className="space-y-4"><h1 className="text-3xl font-bold">Calls</h1><p className="text-muted-foreground">AI Call assistant coming soon.</p></div>;
}

function InvoicesPage() {
  return <div className="space-y-4"><h1 className="text-3xl font-bold">Invoices</h1><p className="text-muted-foreground">Invoice OCR & AP automation coming soon.</p></div>;
}

function AnalyticsPage() {
  return <div className="space-y-4"><h1 className="text-3xl font-bold">Analytics</h1><p className="text-muted-foreground">Reporting dashboard coming soon.</p></div>;
}

function SettingsPage() {
  return <div className="space-y-4"><h1 className="text-3xl font-bold">Settings</h1><p className="text-muted-foreground">System settings coming soon.</p></div>;
}

// Protected route wrapper
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}

// Public route wrapper (redirect to dashboard if authenticated)
function PublicRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
}

export function AppRouter() {
  return (
    <Routes>
      {/* Public routes */}
      <Route
        element={
          <PublicRoute>
            <AuthLayout />
          </PublicRoute>
        }
      >
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>

      {/* Protected routes */}
      <Route
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/bookings" element={<BookingsPage />} />
        <Route path="/guests" element={<GuestsPage />} />
        <Route path="/rooms" element={<RoomsPage />} />
        <Route path="/emails" element={<EmailsPage />} />
        <Route path="/calls" element={<CallsPage />} />
        <Route path="/invoices" element={<InvoicesPage />} />
        <Route path="/analytics" element={<AnalyticsPage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Route>

      {/* Redirect root to dashboard or login */}
      <Route path="/" element={<Navigate to="/dashboard" replace />} />

      {/* 404 */}
      <Route
        path="*"
        element={
          <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-4xl font-bold mb-4">404</h1>
              <p className="text-muted-foreground">Page not found</p>
            </div>
          </div>
        }
      />
    </Routes>
  );
}
