function AuthLayout({ children }) {
  return (
    <div className="flex w-screen h-screen">
      <div className="hidden lg:flex w-[45%] h-full bg-gray-100 flex-col justify-center items-center">
        <div className="max-w-[380px]">
          <img src="/secure_login_pdn4.svg" alt="login illustration" />
        </div>

        <h1 className="text-3xl font-bold mt-10">Blockchain Voting System</h1>
      </div>

      <main className="grow h-screen flex flex-col justify-center items-center">{children}</main>
    </div>
  );
}

export default AuthLayout;
