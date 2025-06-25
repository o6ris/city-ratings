export default function EmailConfirmationPage() {
  return (
    <div className="flex flex-col gap-4 h-screen p-4">
      <h1 className="text-2xl font-bold mb-4">Email Confirmation</h1>
      <p className="text-lg">
        Please check your email for a confirmation link.
      </p>
      <p className="text-lg">
        If you don&apos;t see it, check your spam folder.
      </p>
    </div>
  );
}