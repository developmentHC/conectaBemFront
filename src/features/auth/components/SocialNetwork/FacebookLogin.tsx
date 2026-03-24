"use client";

import { Button } from "@mui/material";
import Image from "next/image";
import { signIn } from "next-auth/react";

export default function FacebookLogin() {
  return (
    <Button
      className="bg-white text-black text-sm"
      variant="outlined"
      size="large"
      startIcon={
        <Image alt="google logo" src={"/images/facebook-logo.svg"} width={20} height={20} />
      }
      onClick={() => signIn("facebook")}
    >
      Entrar com o Facebook
    </Button>
  );
}
