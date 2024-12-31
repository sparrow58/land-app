import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4 bg-background">
      <div className="text-center space-y-4">
        <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto" />
        <h2 className="text-2xl font-semibold text-primary">Loading...</h2>
        <p className="text-muted-foreground">Hopefully not for too long :)</p>
      </div>
    </main>
  );
}
