"use client";

import { Button } from "@mui/material";
import Image from "next/image";
import { signIn } from "next-auth/react";

export const GoogleLogin = () => {
  return (
    <Button
      className="bg-white text-black text-sm"
      variant="outlined"
      size="large"
      startIcon={<Image alt="google logo" src={"/images/google-logo.svg"} width={20} height={20} />}
      onClick={() =>
        signIn("google", {
          callbackUrl: "/",
        })
      }
    >
      Entrar com o Google
    </Button>
  );
};
