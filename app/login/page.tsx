"use client";
import "../../styles/Auth.css";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FcGoogle } from "react-icons/fc";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { setUserData } from "@/store/slices/authSlices";
const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

type LoginSchema = z.infer<typeof loginSchema>;

const Login: React.FC = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();

  const successMessage = searchParams.get("success");
  const errorParam = searchParams.get("error");
    const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
  });

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/blog");
    }
  }, [status, router]);

const onSubmit = async (data: LoginSchema) => {
    dispatch(
      setUserData({
        name: "",
        email: data.email,
        password: "",
      })
    );

    await signIn("credentials", {
      ...data,
      callbackUrl: "/blog",
    });
  };
  if (status === "loading") return <p className="text-center">Loading...</p>;

  return (
    <div className="auth-container">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="auth-sub-container"
      >
        {/* Left Side - Image */}
        <div className="img-container">
          <Image
            src="/img-10.jpg"
            alt="login"
            width={100}
            height={100}
            quality={100}
          />
        </div>

        {/* Right Side - Form */}
        <div className="right-auth-container">
          <header className="">
            <h1 className="">
              {successMessage || "Welcome Back"}
            </h1>
            <p className="">
              Please sign in to see the dashboard.
            </p>
          </header>

          <form onSubmit={handleSubmit(onSubmit)} className="">
            <div className="input-container">
              <label htmlFor="Email">Email</label>
              <input
                type="email"
                placeholder="Email"
                className={` ${
                  errors.email
                    ? "error"
                    : ""
                }`}
                {...register("email")}
              />
              {errors.email && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="input-container">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                placeholder="Password"
                className={` ${
                  errors.password
                    ? "error"
                    : "non-error"
                }`}
                {...register("password")}
              />
              {errors.password && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              className={` ${
                !isValid
                  ? "invalid"
                  : "non-invalid"
              }`}
              disabled={!isValid}
            >
              Login
            </button>

            {errorParam && (
              <p className="text-sm text-red-500 text-center">{errorParam}</p>
            )}
          </form>

          <div className="flex items-center justify-center">
            <button
              onClick={() => signIn("google")}
              className="google-auth"
            >
              <FcGoogle size={20} />
              Login with Google
            </button>
          </div>

          <div className="text-center text-sm text-gray-500">- OR -</div>

          <div className="text-center text-sm">
            Don’t have an account?{" "}
            <Link href="/sign-up" className="text-indigo-600 hover:underline">
              Create new account
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
