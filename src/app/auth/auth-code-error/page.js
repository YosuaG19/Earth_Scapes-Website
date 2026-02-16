export default function AuthCodeError() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold text-red-600">Authentication Error</h1>
      <p className="mt-2 text-gray-600">
        Link verifikasi mungkin sudah kadaluarsa atau sudah pernah digunakan.
      </p>
      <a href="/signup" className="mt-4 text-blue-500 underline">
        Kembali ke Signup
      </a>
    </div>
  );
}