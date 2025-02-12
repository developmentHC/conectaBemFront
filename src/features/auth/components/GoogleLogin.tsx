"use client";

// import { useEmailStore } from "@/stores/emailStore";
import { Button } from "@mui/material";
import {  signIn } from "next-auth/react";
import Image from "next/image";
// import { useEffect } from "react";

export const GoogleLogin = () => {
  // const { setEmail, email } = useEmailStore();
  // console.log(email);

  return (
    <Button
      className="text-black bg-white text-sm"
      variant="outlined"
      size="large"
      startIcon={
        <Image
          alt="google logo"
          src={"/images/google-logo.svg"}
          width={20}
          height={20}
        />
      }
      onClick={() => signIn("google", {
        redirectTo: "http://localhost:3000/auth/confirm-code",
      })}
    >
      Entrar com o Google
    </Button>
  );
};