import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AlertCircle, Home } from "lucide-react";

export default function NotFound() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4 bg-background text-center">
      <div className="max-w-md space-y-6">
        <AlertCircle className="w-16 h-16 text-destructive mx-auto" />
        <h2 className="text-4xl font-bold text-foreground">Oops! Not Found</h2>
        <p className="text-xl text-muted-foreground">
          We couldn&apos;t find the page you were looking for.
        </p>
        <Button asChild size="lg" className="mt-6">
          <Link href="/">
            <Home className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </Button>
      </div>
    </main>
  );
}
