"use client";

import { useState, useEffect } from "react";
import Footer from "../layouts/footer";
import Header from "../layouts/header";
import Loader from "@/@disktro/Loader";
import { wait } from "@/@disktro/utils";
import CustomAlert from "@/@disktro/CustomAlert";
import CustomSuccess from "@/@disktro/CustomSuccess";
import { UserModuleObject as ModuleObject } from "../module";

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [countdown, setCountdown] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [resendAvailable, setResendAvailable] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!email) {
      setErrorMessage("Please enter your email.");
      return;
    }
    try {
      setSuccessMessage("");
      setErrorMessage("");
      setIsLoading(true);
      setSuccess(false);
      const res = await ModuleObject.service.forgotPassword({ email: email });
      await wait();
      setIsLoading(false);
      setSuccessMessage(res.message);
      setCountdown(60); // 60 secondes avant de pouvoir renvoyer
      setResendAvailable(true);
      setSuccess(true);
    } catch (error) {
      console.log(error);
      setErrorMessage((error as Error).message);
      setIsLoading(false);
      setSuccess(false);
    }
  };

  const handleResend = async () => {
    // Re-soumettre le formulaire (tu peux extraire cette logique si tu préfères)
    if (!email) return;
    try {
      setSuccessMessage("");
      setErrorMessage("");
      setIsLoading(true);
      setSuccess(true);
      setCountdown(60); // 60 secondes avant de pouvoir renvoyer
      const res = await ModuleObject.service.forgotPassword(email);
      await wait();
      setIsLoading(false);
      setSuccessMessage(res.message);
    } catch (error) {
      console.log(error);
      setErrorMessage((error as Error).message);
      setIsLoading(false);
      setSuccess(false);
    }
  };

  // 🔄 Gérer le compte à rebours
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (countdown <= 0) {
      setResendAvailable(true);
      return;
    }

    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [countdown]);

  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Header />
        <div className="flex-1 flex items-center justify-center px-4">
          <div className="max-w-md mx-auto p-8 bg-white/60 backdrop-blur-md rounded-3xl shadow-lg mt-12">
            <h2 className="text-3xl font-bold text-center text-purple-700 mb-6">
              🔁 Forgot Password
            </h2>

            {success ? (
              <div className="text-center space-y-4">
                <p className="text-green-600 font-medium">
                  If this email exists in our system, we’ve sent you a reset
                  link 💌
                </p>

                {resendAvailable ? (
                  <button
                    onClick={handleResend}
                    className=" cursor-pointer text-purple-600 font-semibold underline hover:text-purple-800"
                  >
                    Didn’t receive the email? Resend it
                  </button>
                ) : (
                  <p className="text-sm text-gray-600">
                    You can request a new email in {countdown}s...
                  </p>
                )}
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {successMessage && <CustomSuccess message={successMessage} />}
                {errorMessage && <CustomAlert message={errorMessage} />}
                <button
                  disabled={isLoading}
                  type="submit"
                  className="w-full cursor-pointer bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 transition flex items-center justify-center gap-2"
                >
                  {isLoading ? <Loader /> : "Send reset link"}
                </button>
              </form>
            )}
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
