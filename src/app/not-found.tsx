"use client";

import Link from "next/link";
import Image from "next/image";
import { SearchInput } from "@/components/SearchInput/SearchInput";
import { Button } from "@mui/material"

export default function NotFoundPage() {
	const illustrationSrc = "/images/Error 404.svg";

		
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

						<form  className="mt-6">
							
							<SearchInput />

						</form>

						<div className="mt-4 flex justify-start">
							<Button
								variant="contained"
								color="primary"
								size="large"
								component={Link}
								href="/"
								className="rounded-lg text-lime-500"
							>
								Voltar ao Início
							</Button>

						</div>


					</section>
				</div>
			</main>
		</div>
	);
}
