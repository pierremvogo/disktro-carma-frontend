"use client";

import { useEffect, useState } from "react";
import Footer from "../layouts/footer";
import Header from "../layouts/header";
import { wait } from "@/@disktro/utils";
import CustomAlert from "@/@disktro/CustomAlert";
import CustomSuccess from "@/@disktro/CustomSuccess";
import { UserModuleObject as ModuleObject } from "../module";
import Loader from "@/@disktro/Loader";
interface ResetPasswordFormProps {
  initialToken?: string;
}
export default function ResetPasswordForm({
  initialToken = "",
}: ResetPasswordFormProps) {
  const [token, setToken] = useState(initialToken);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!token || !password || !confirmPassword) {
      setErrorMessage("Please fill in all fields.");
      return;
    }
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }
    try {
      setSuccessMessage("");
      setErrorMessage("");
      setIsLoading(true);
      setSuccess(false);
      const res = await ModuleObject.service.resetPassword(token, password);
      await wait();
      setIsLoading(false);
      setSuccessMessage(res.message);
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
          <div className="max-w-md w-full p-8 bg-white/60 backdrop-blur-md rounded-3xl shadow-lg">
            <h2 className="text-3xl font-bold text-center text-[#1F89A5] mb-6">
              🔒 Reset Password
            </h2>

            {success ? (
              <p className="text-black text-center font-medium">
                ✅ Your password has been reset successfully. <br />
                You can now{" "}
                <a
                  href="/auth/login"
                  className="text-green-600 hover:text-green-900"
                >
                  log in
                </a>
                .
              </p>
            ) : (
              <>
                {error && (
                  <p className="text-red-500 text-center mb-4">{error}</p>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  <input
                    type="password"
                    placeholder="New password"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />

                  <input
                    type="password"
                    placeholder="Confirm new password"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />

                  {successMessage && <CustomSuccess message={successMessage} />}
                  {errorMessage && <CustomAlert message={errorMessage} />}
                  <button
                    disabled={isLoading}
                    type="submit"
                    className="w-full cursor-pointer bg-[#1F89A5] text-white py-2 rounded-md hover:bg-[#1A4C61] transition flex items-center justify-center gap-2"
                  >
                    {isLoading ? <Loader /> : "Reset Password"}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
}
