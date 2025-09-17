"use client";

import { FormEvent, useState, useId } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { SearchInput } from "@/components/SearchInput/SearchInput";
import { Button } from "@mui/material"

export default function NotFoundPage() {
	const illustrationSrc = "/images/Error 404.svg";

	const router = useRouter();
	const [q, setQ] = useState("");
	const inputId = useId();

	function onSearch(e: FormEvent) {
		e.preventDefault();
		const query = q.trim();
		if (!query) return;
		router.push(`/search?q=${encodeURIComponent(query)}`);
	}

	return (
		<div className="flex flex-col">
			<main className="mx-auto w-full max-w-7xl flex-1 px-4 pt-8 md:pt-12 pb-0">
				<div className="grid items-center gap-10 md:grid-cols-2">
					<section className="order-1 md:order-2">
						<div className="relative mx-auto max-w-md">
							<Image
								src={illustrationSrc}
								alt="Ilustração de página não encontrada"
								className="h-auto w-full"
								width={400}
								height={300}
								priority={false}
							/>
						</div>
					</section>

					<section className="order-2 md:order-1">
						<h1 className="mt-2 text-3xl font-bold text-gray-900 sm:text-4xl">
							OOps,
						</h1>
						<p className="mt-3 text-gray-600">
							Não encontramos essa pagina, mas estamos aqui para te ajudar.
							<br />
							Respire fundo, vamos te guiar de volta.
						</p>

						<form onSubmit={onSearch} className="mt-6">
							<label htmlFor={inputId} className="sr-only">
								O que você está procurando?
							</label>
							<SearchInput
								id={inputId}
								value={q}
								onChange={(e) => setQ(e.target.value)}
								placeholder="O que você está buscando?"
							/>

						</form>

						<div className="mt-4 flex justify-start">
							<Button
								
								variant="contained"
								sx={{
									borderRadius: "0.75rem", // ~rounded-xl
									backgroundColor: "#2563eb", // bg-blue-600
									color: "#fde047", // text-yellow-300
									fontWeight: 500,
									padding: "0.75rem 1.5rem", // py-3 px-6
									textTransform: "none", // remove uppercase default do MUI
									boxShadow: "0 1px 3px rgba(0,0,0,0.2)", // shadow
									"&:hover": {
										backgroundColor: "#1d4ed8", // bg-blue-700
									},
								}}
							>
								Voltar ao início
							</Button>

						</div>


					</section>
				</div>
			</main>
		</div>
	);
}
