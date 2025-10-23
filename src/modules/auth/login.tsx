"use client";

import { useState } from "react";
import Footer from "../layouts/footer";
import Header from "../layouts/header";
import { useRouter } from "next/navigation";
import { wait } from "@/@disktro/utils";
import CustomAlert from "@/@disktro/CustomAlert";
import CustomSuccess from "@/@disktro/CustomSuccess";
import { UserModuleObject as ModuleObject } from "../module";
import Loader from "@/@disktro/Loader";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const router = useRouter();

  const handleLogin = async (e: any) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMessage("Please fill all fields");
      return;
    }
    console.log("Logging in with:", { email, password });
    try {
      setSuccessMessage("");
      setErrorMessage("");
      setIsLoading(true);
      setSuccess(false);
      const res = await ModuleObject.service.loginUser({ email, password });
      setIsLoading(false);
      setSuccessMessage(res.message);
      await wait();
      localStorage.setItem(ModuleObject.localState.ACCESS_TOKEN, res.token);
      localStorage.setItem(ModuleObject.localState.USER_ID, res.user.id);
      const res1 = await ModuleObject.service.getUser(res.user.id);
      localStorage.setItem(
        ModuleObject.localState.USER_DATA,
        JSON.stringify(res1.data)
      );
      router.push("/home");
      setSuccess(true);
    } catch (error) {
      console.log(error);
      setErrorMessage((error as Error).message);
      setIsLoading(false);
      setSuccess(false);
    }
  };

  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Header />
        <div className="flex-1 flex items-center justify-center px-4">
          <div className="max-w-md mx-auto p-8 bg-white/60 backdrop-blur-md rounded-3xl shadow-lg mt-12">
            <h2 className="text-3xl font-bold text-center  text-[#1F89A5] mb-6">
              🔐 Login
            </h2>
            <form onSubmit={handleLogin} className="space-y-4">
              <label htmlFor="email" className="text">
                Email
              </label>
              <input
                type="email"
                placeholder="Your Email"
                className="w-full p-2 border border-gray-300 rounded-md"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <label htmlFor="password" className="text">
                Password
              </label>
              <input
                type="password"
                placeholder="Your Password"
                className="w-full p-2 border border-gray-300 rounded-md"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {successMessage && <CustomSuccess message={successMessage} />}
              {errorMessage && <CustomAlert message={errorMessage} />}
              <button
                disabled={isLoading}
                type="submit"
                className="w-full cursor-pointer bg-[#1F89A5] text-white py-2 rounded-md hover:bg-[#1A4C61] transition flex items-center justify-center gap-2"
              >
                {isLoading ? <Loader /> : "Login"}
              </button>
            </form>
            <div className="text-right mt-2">
              <button
                onClick={() => router.push("/auth/password-forgot")}
                className="text-sm text-[#1F89A5] hover:underline  cursor-pointer"
              >
                Forgot password?
              </button>
            </div>
            {/* New Button to go to Register Page */}
            <div className="text-center mt-4">
              <button
                onClick={() => router.push("/auth/register")}
                className="text-sm cursor-pointer text-[#1F89A5] hover:underline"
              >
                New here? Create an account.
              </button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
