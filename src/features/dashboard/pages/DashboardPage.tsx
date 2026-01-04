import { useAuth } from "@/providers";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Users, Home, TrendingUp } from "lucide-react";

export function DashboardPage() {
  const { user } = useAuth();

  const stats = [
    { name: "Total Bookings", value: "0", icon: Calendar, description: "This month" },
    { name: "Total Guests", value: "0", icon: Users, description: "Active guests" },
    { name: "Available Rooms", value: "0", icon: Home, description: "Out of 0" },
    { name: "Revenue", value: "£0", icon: TrendingUp, description: "This month" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Welcome back, {user?.firstName}!</h1>
        <p className="text-muted-foreground">Here's what's happening with your hotel today.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.name}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">{stat.name}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <CardDescription>{stat.description}</CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Bookings</CardTitle>
            <CardDescription>Latest booking activity</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">No bookings yet. Create your first booking to get started.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Today's Schedule</CardTitle>
            <CardDescription>Check-ins and check-outs</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">No scheduled activities for today.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
