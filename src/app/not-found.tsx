"use client";

import { FormEvent, useState, useId } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { SearchIcon } from "../../public/images/icons/search";



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
		<div className="flex min-h-screen flex-col bg-white">
			<main className="mx-auto w-full max-w-7xl flex-1 px-4 pt-8 md:pt-12 pb-4">
				<button
					type="button"
					onClick={() => router.back()}
					className="mb-6 inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900"
					aria-label="Voltar para a página anterior"
				>
					<svg
						className="h-5 w-5"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth={2}
						strokeLinecap="round"
						strokeLinejoin="round"
						aria-hidden="true"
					>
						<path d="M15 18l-6-6 6-6" />
					</svg>
					Voltar
				</button>

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
							<div className="flex overflow-hidden rounded-xl border border-gray-200">
								<input
									id={inputId}
									type="search"
									value={q}
									onChange={(e) => setQ(e.target.value)}
									placeholder="O que você está procurando?"
									className="w-full px-4 py-3 outline-none"
								/>
								<button
									type="submit"
									className="px-4 py-3 text-white bg-blue-600 hover:bg-blue-700 transition"
								>
									<SearchIcon className="h-5 w-5" fill="currentColor" />
								</button>
							</div>
						</form>

						<div className="mt-6 max-w-md">
							<Link
								href="/auth"
								className="block w-full rounded-xl bg-blue-600 px-4 py-3 text-center font-medium text-white shadow hover:bg-blue-700 transition"
							>
								Fazer login
							</Link>
						</div>
					</section>
				</div>
			</main>
		</div>
	);
}
