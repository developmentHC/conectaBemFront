"use client";

import { Button } from "@mui/material";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";

export const GoogleLogin = () => {
  const { data: session } = useSession();

  console.log(session?.sessionToken);

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
      onClick={() => signIn("google")}
    >
      Entrar com o Google
    </Button>
  );
};
