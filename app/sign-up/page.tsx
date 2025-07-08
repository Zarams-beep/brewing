"use client";
import "../../styles/Auth.css";
import { useForm } from "react-hook-form";
import { registerSchema, RegisterData } from "@/utils/schema/register";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<RegisterData>({
    resolver: zodResolver(registerSchema),
    mode: "onChange",
  });

  const router = useRouter();
  const searchParams = useSearchParams();
  const errorParam = searchParams.get("error");
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (data: RegisterData) => {
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (res.status === 201) {
        router.push("/login?success=Account has been created");
      } else {
        const errMsg = await res.text();
        setError(errMsg || "Something went wrong");
      }
    } catch (err) {
      setError("Server error");
    }
  };

  return (
    <div className="auth-container">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="auth-sub-container"
      >
        {/* Left - Image */}
        <div className="img-container">
          <Image
            src="/img-16.jpg"
            alt="Register"
            width={500}
            height={600}
          />
        </div>

        {/* Right - Form */}
        <div className="right-auth-container">
         <header> <h1 className="">Create an Account</h1>
          <p className="">
            Please sign up to access your dashboard
          </p></header>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="input-container">
              <label htmlFor="Username">Username</label>
              <input
                {...register("name")}
                type="name"
                className={` ${
                  errors.name
                    ? "error"
                    : ""
                }`}
                placeholder="Enter username"
              />
              {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>}
            </div>

            <div className="input-container">
              <label htmlFor="Email">Email</label>
              <input
                {...register("email")}
                type="email"
                className={` ${
                  errors.email
                    ? "error"
                    : ""
                }`}
                placeholder="Enter email"
              />
              {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>}
            </div>

            <div className="input-container">
              <label htmlFor="Password">Password</label>
              <input
                {...register("password")}
                type="password"
                className={` ${
                  errors.password
                    ? "error"
                    : "non-error"
                }`}
                placeholder="Enter password"
              />
              {errors.password && <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>}
            </div>

            <button
              type="submit"
              disabled={!isValid}
              className={` ${
                !isValid
                  ? "invalid"
                  : "non-invalid"
              }`}
            >
              Register
            </button>

            {error && <p className="text-sm text-red-500 text-center">{error}</p>}
            {errorParam && <p className="text-sm text-red-500 text-center">{errorParam}</p>}
          </form>

          <span className="text-sm text-gray-500 dark:text-gray-400 block text-center my-4">- OR -</span>

          <Link href="/login" className="block text-center text-indigo-600 hover:underline text-sm">
            Already have an account? Login
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
