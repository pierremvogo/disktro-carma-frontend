"use client";

import { useState } from "react";
import Header from "../layouts/header";
import Footer from "../layouts/footer";
import { wait } from "@/@disktro/utils";
import CustomAlert from "@/@disktro/CustomAlert";
import CustomSuccess from "@/@disktro/CustomSuccess";
import { MediaModuleObject as ModuleObject } from "../module";
import Loader from "@/@disktro/Loader";

export default function ConfirmEmailForm() {
  const [token, setToken] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleConfirm = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!token) {
      setStatus("error");
      setMessage("Please enter the token you received.");
      return;
    }
    try {
      setSuccessMessage("");
      setErrorMessage("");
      setIsLoading(true);
      setSuccess(false);
      const res = await ModuleObject.service.verifyEmail(token);
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
          <div className="max-w-md mx-auto p-8 bg-white/60 backdrop-blur-md rounded-3xl shadow-lg mt-20 text-center">
            <h2 className="text-3xl font-bold text-purple-700 mb-6">
              📩 Confirm Your Email
            </h2>

            <form onSubmit={handleConfirm} className="space-y-4">
              <input
                type="text"
                placeholder="Enter your confirmation token"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md"
              />
              {successMessage && <CustomSuccess message={successMessage} />}
              {errorMessage && <CustomAlert message={errorMessage} />}
              <button
                disabled={isLoading}
                type="submit"
                className="w-full cursor-pointer bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 transition flex items-center justify-center gap-2"
              >
                {isLoading ? <Loader /> : "Confirm Email"}
              </button>
            </form>

            {status !== "idle" && (
              <p
                className={`mt-4 text-sm font-medium ${
                  status === "success" ? "text-green-600" : "text-red-600"
                }`}
              >
                {message}
              </p>
            )}
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
