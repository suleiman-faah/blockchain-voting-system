function AuthLayout({ children }) {
  return (
    <div className="flex h-screen w-screen">
      <div className="hidden h-full w-[45%] flex-col items-center justify-center bg-gray-100 lg:flex">
        <div className="max-w-[380px]">
          <img src="/secure_login_pdn4.svg" alt="login illustration" />
        </div>

        <h1 className="mt-10 text-3xl font-bold">Blockchain Voting System</h1>
      </div>

      <main className="flex h-screen grow flex-col items-center justify-center">{children}</main>
    </div>
  );
}

export default AuthLayout;
