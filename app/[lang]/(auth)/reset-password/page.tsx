import ResetPasswordForm from "./ResetPasswordForm";

export const metadata = {
  title: "Reset Password - Simple",
  description: "Page description",
};

export default function ResetPassword() {
  return (
    <section className="bg-gradient-to-b from-gray-100 to-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="pt-32 pb-12 md:pt-40 md:pb-20">
          {/* Page header */}
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
            <h1 className="h1 mb-4">Let&apos;s get you back up on your feet</h1>
            <p className="text-xl text-gray-600">
              Enter the email address you used when you signed up for your
              account, and we&apos;ll email you a link to reset your password.
            </p>
          </div>

          {/* Form */}
          <div className="max-w-sm mx-auto">
            <ResetPasswordForm />
          </div>
        </div>
      </div>
    </section>
  );
}
