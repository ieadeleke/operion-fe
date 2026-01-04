import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function LoginPage() {
  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">Operion AI</CardTitle>
        <CardDescription>Hotel Management Platform</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 text-center">
        <p className="text-sm text-muted-foreground">
          This is the infrastructure setup for <span className="font-semibold text-foreground">Operion AI</span>.
        </p>
        <div className="space-y-2 text-sm">
          <p className="text-green-600 font-medium">Frontend + Tailwind + Shadcn + Routing ready.</p>
          <p className="text-muted-foreground">React 19 + TypeScript + Vite</p>
        </div>
      </CardContent>
    </Card>
  );
}
