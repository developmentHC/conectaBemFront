"use client";

import { CloseIcon, InfoIcon } from "@/assets/icons";
import { FormMultiStep } from "@/components/FormMultiStep";
import { Box, Button, IconButton, Modal, Typography } from "@mui/material";
import Link from "next/link";
import { useState } from "react";

export default function Registro() {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    borderRadius: "8px",
    width: 400,
    maxWidth: "95%",
    bgcolor: "#F3F5FA",
    boxShadow: 24,
    p: "24px 16px",
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  };

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <main className="flex justify-center w-full">
      <div className="flex flex-col gap-8 w-full md:max-w-[450px] mt-8">
        <FormMultiStep.Header className="gap-4">
          {/* <Link href={"/auth"} className="w-fit">
            <FormMultiStep.BackStepButton />
          </Link> */}
          <FormMultiStep.Title>Tudo pronto para começar</FormMultiStep.Title>
          <FormMultiStep.Progress progress={20} />
          <FormMultiStep.Description>Você deseja se cadastrar como:</FormMultiStep.Description>
        </FormMultiStep.Header>
        <div className="flex flex-col gap-6">
          <Button className="text-black w-full" variant="outlined" onClick={handleOpen}>
            Paciente
          </Button>
          <Link href={"/auth/registro-profissional"}>
            <Button className="text-black w-full" variant="outlined">
              Profissional
            </Button>
          </Link>
        </div>
        <div>
          <FormMultiStep.NeedHelpButton className="flex items-center  text-gray-600 gap-2" />
        </div>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        slotProps={{
          backdrop: {
            sx: {
              backgroundColor: "rgba(25, 40, 80, 0.6)",
              backdropFilter: "blur(3px)",
            },
          },
        }}
      >
        <Box sx={style}>
          <Box className="flex items-center justify-between">
            <Typography className="text-2xl" sx={{ fontWeight: "700" }} id="modal-modal-title" variant="h5">
              Cadastrar como
            </Typography>
            <IconButton className="w-fit h-fit" onClick={handleClose}>
              <CloseIcon height={20} width={20} className="fill-[#1C1B1F]" />
            </IconButton>
          </Box>
          <Typography id="modal-description" variant="body1">
            Tem certeza que deseja se cadastrar como <span className="font-semibold">paciente?</span>
          </Typography>
          <Typography variant="body2" className="flex font-normal text-gray-700 items-center gap-2">
            <InfoIcon className="fill-input-code-border" height={20} width={21} />
            Atenção, esta ação não poderá ser desfeita.
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: "12px", width: "100%", mt: "8px" }}>
            <Link href="/auth/registro-paciente" style={{ width: "100%" }}>
              <Button variant="contained" color="primary" size="large" fullWidth>
                Prosseguir Com Cadastro
              </Button>
            </Link>
            <Button variant="outlined" size="large" onClick={handleClose} fullWidth>
              Voltar
            </Button>
          </Box>
        </Box>
      </Modal>
    </main>
  );
}
