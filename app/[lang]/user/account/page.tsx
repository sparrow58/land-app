import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ProfileForm } from "./ProfileForm";
import { getUserById } from "@/app/services/user/getUserService";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/nextAuthOptions";

export default async function AccountPage() {
  const session = await getServerSession(authOptions);
  const user = await getUserById(session?.user.id!);
  if (!user) {
    return <div>Sign in first</div>;
  }
  return (
    <div className="container max-w-3xl">
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium">Account</h3>
          <p className="text-sm text-muted-foreground">
            Manage your account settings and set your preferences.
          </p>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Profile</CardTitle>
            <CardDescription>
              This is how others will see you on the site.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ProfileForm user={user} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
