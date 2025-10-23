"use client";

import { useState } from "react";
import Footer from "../layouts/footer";
import Header from "../layouts/header";
import { wait } from "@/@disktro/utils";
import CustomAlert from "@/@disktro/CustomAlert";
import CustomSuccess from "@/@disktro/CustomSuccess";
import { UserModuleObject as ModuleObject } from "../module";
import Loader from "@/@disktro/Loader";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
  type FormRegister = {
    name: string;
    surname: string;
    email: string;
    password: string;
    confirmPassword: string;
  };
  const DefaultValue: FormRegister = {
    name: "",
    surname: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const [errors, setErrors] = useState<FormRegister>(DefaultValue);
  const [isArtist, setIsArtist] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [form, setForm] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const router = useRouter();

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const newErrors: any = {};
    if (!form.name) newErrors.name = "Name is required";
    if (!form.surname) newErrors.surname = "Surame is required";
    if (!form.email) newErrors.email = "Email is required";
    if (!form.password) newErrors.password = "Password is required";
    if (form.password !== form.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        const payload = {
          ...form,
          type: isArtist ? "artist" : "user",
        };
        setSuccessMessage("");
        setErrorMessage("");
        setIsLoading(true);
        setSuccess(false);
        const res = await ModuleObject.service.createUser(payload);
        await wait();
        setIsLoading(false);
        setSuccessMessage(res.message);
        setSuccess(true);
        router.push("/auth/confirm-email");
      } catch (error) {
        console.log(error);
        setErrorMessage((error as Error).message);
        setIsLoading(false);
        setSuccess(false);
      }
    } else {
      console.log("some error ", newErrors);
    }
  };

  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Header />
        <div className="flex-1 flex items-center justify-center px-4">
          <div className="max-w-md mx-auto p-8 bg-white/60 backdrop-blur-md rounded-3xl shadow-lg mt-12">
            <h2 className="text-3xl font-bold text-center text-[#1F89A5] mb-6">
              🚀 Register
            </h2>
            {success ? (
              <p className="text-green-600 font-medium text-center">
                Registration successful! Please check your email to confirm your
                account.
              </p>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <label htmlFor="name" className="text">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Your name"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm">{errors.name}</p>
                )}
                <label htmlFor="surname" className="text">
                  Surname
                </label>
                <input
                  type="text"
                  name="surname"
                  placeholder="Your surname"
                  value={form.surname}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
                {errors.surname && (
                  <p className="text-red-500 text-sm">{errors.surname}</p>
                )}
                <label htmlFor="email" className="text">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="Your email"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email}</p>
                )}
                <label htmlFor="password" className="text">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="Your Password"
                  value={form.password}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
                {errors.password && (
                  <p className="text-red-500 text-sm">{errors.password}</p>
                )}
                <label htmlFor="confirmPassword" className="text">
                  Confirm password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm your password"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md"
                />
                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm">
                    {errors.confirmPassword}
                  </p>
                )}

                {/* ✅ Alignement à droite */}
                <div className="flex justify-end">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      className="cursor-pointer"
                      type="checkbox"
                      checked={isArtist}
                      onChange={() => setIsArtist(!isArtist)}
                    />
                    <span>Je suis un artiste</span>
                  </label>
                </div>
                {successMessage && <CustomSuccess message={successMessage} />}
                {errorMessage && <CustomAlert message={errorMessage} />}
                <button
                  disabled={isLoading}
                  type="submit"
                  className="w-full cursor-pointer bg-[#1F89A5] text-white py-2 rounded-md hover:bg-[#1A4C61] transition flex items-center justify-center gap-2"
                >
                  {isLoading ? <Loader /> : "Continue"}
                </button>
              </form>
            )}
            {/* Option pour rediriger vers la page de login si l'utilisateur a déjà un compte */}
            <div className="text-center mt-4">
              <button
                onClick={() => router.push("/auth/login")}
                className="text-sm cursor-pointer text-[#1F89A5] hover:underline"
              >
                Already have an account? Log in
              </button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
