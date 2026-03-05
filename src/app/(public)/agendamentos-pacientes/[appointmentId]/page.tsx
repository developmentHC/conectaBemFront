"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
    AlertTriangle,
    ArrowLeft,
    BadgeInfo,
    CalendarDays,
    Clock3,
    Info,
    MapPin,
    Wallet,
} from "lucide-react";
import { useAppointmentDetail } from "@/features/agentamentos/hooks/useAppointmentDetail";
import type {
    AppointmentAddress,
    AppointmentService,
    AppointmentStatusVariant,
    IAppointmentDetail,
} from "@/types/appointment";
import { useMemo } from "react";

const STATUS_COPY: Record<AppointmentStatusVariant, { label: string; bg: string; text: string; border: string; indicator: string }> = {
    pending: {
        label: "Pendente de confirmação",
        bg: "bg-amber-50",
        text: "text-amber-900",
        border: "border-amber-200",
        indicator: "bg-[#FDB022]",
    },
    confirmed: {
        label: "Agendamento confirmado",
        bg: "bg-emerald-50",
        text: "text-emerald-900",
        border: "border-emerald-200",
        indicator: "bg-emerald-400",
    },
    completed: {
        label: "Agendamento concluído",
        bg: "bg-indigo-50",
        text: "text-indigo-900",
        border: "border-indigo-200",
        indicator: "bg-indigo-400",
    },
    canceled: {
        label: "Agendamento cancelado",
        bg: "bg-slate-100",
        text: "text-slate-700",
        border: "border-slate-200",
        indicator: "bg-slate-400",
    },
};

function normalizeStatus(detail?: IAppointmentDetail): AppointmentStatusVariant {
    if (detail?.derivedStatus) return detail.derivedStatus;
    const raw = String(detail?.status ?? "").toLowerCase();
    if (raw.includes("pend")) return "pending";
    if (raw.includes("concl")) return "completed";
    if (raw.includes("cancel")) return "canceled";
    return "confirmed";
}

function formatDateTime(detail?: IAppointmentDetail) {
    const iso = detail?.dateTime ?? (detail?.date && detail?.time ? `${detail.date}T${detail.time}` : detail?.date);
    if (!iso) return { date: "—", time: detail?.time ?? "—" };
    const dateObj = new Date(iso);
    return {
        date: new Intl.DateTimeFormat("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric" }).format(dateObj),
        time: new Intl.DateTimeFormat("pt-BR", { hour: "2-digit", minute: "2-digit" }).format(dateObj),
    };
}

function formatPrice(detail?: IAppointmentDetail) {
    const total = typeof detail?.price === "number"
        ? detail.price
        : detail?.services?.reduce((acc, item) => acc + (item.price ?? 0), 0);
    if (typeof total !== "number" || Number.isNaN(total)) return "—";
    return total.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function getPrimaryAddress(address?: AppointmentAddress | AppointmentAddress[] | null) {
    if (!address) return null;
    if (Array.isArray(address)) {
        return address.find((item) => item?.active) ?? address[0] ?? null;
    }
    return address;
}

function formatAddress(detail?: IAppointmentDetail) {
    if (detail?.selectedAddress) return detail.selectedAddress;
    const address = getPrimaryAddress(detail?.address);
    if (!address) return "—";
    const chunks = [address.address, address.number, address.neighborhood].filter(Boolean);
    const cityState = [address.city, address.state].filter(Boolean).join(" - ");
    if (cityState) chunks.push(cityState);
    return chunks.join(", ");
}

const STATIC_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
const STATIC_MAPS_BASE_URL = "https://maps.googleapis.com/maps/api/staticmap";

function buildStaticMapUrl(address?: string | null) {
    if (!address || address === "—" || !STATIC_MAPS_API_KEY) return null;
    const params = new URLSearchParams({
        center: address,
        zoom: "15",
        size: "640x320",
        scale: "2",
        maptype: "roadmap",
        markers: `color:0x3857F4|${address}`,
        key: STATIC_MAPS_API_KEY,
    });
    return `${STATIC_MAPS_BASE_URL}?${params.toString()}`;
}

function AppointmentDetailSkeleton() {
    return (
        <main className="mx-auto max-w-6xl px-4 py-10">
            <div className="space-y-3">
                <div className="h-6 w-32 animate-pulse rounded-lg bg-slate-200" />
                <div className="h-10 w-64 animate-pulse rounded-lg bg-slate-200" />
                <div className="h-4 w-80 animate-pulse rounded-lg bg-slate-100" />
                <div className="h-64 w-full animate-pulse rounded-lg bg-slate-100" />
            </div>
        </main>
    );
}

function EmptyState({ message }: { message: string }) {
    return (
        <div className="rounded-lg border border-slate-200 bg-white p-10 text-center">
            <BadgeInfo className="mx-auto mb-3 h-10 w-10 text-slate-400" />
            <p className="text-base text-slate-600">{message}</p>
            <Link href="/agendamentos-pacientes" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-blue-700">
                <ArrowLeft className="h-4 w-4" />
                Voltar para Meus Agendamentos
            </Link>
        </div>
    );
}

export default function AppointmentDetailPage() {
    const params = useParams<{ appointmentId: string }>();
    const appointmentId = useMemo(() => {
        if (!params?.appointmentId) return "";
        return Array.isArray(params.appointmentId) ? params.appointmentId[0] : params.appointmentId;
    }, [params]);

    const { data, isLoading, error } = useAppointmentDetail(appointmentId);

    if (!appointmentId) {
        return (
            <main className="mx-auto max-w-6xl px-4 py-10">
                <EmptyState message="Identificador do agendamento inválido." />
            </main>
        );
    }

    if (isLoading) {
        return <AppointmentDetailSkeleton />;
    }

    if (error) {
        return (
            <main className="mx-auto max-w-6xl px-4 py-10">
                <EmptyState message="Não foi possível carregar os detalhes do agendamento." />
            </main>
        );
    }

    if (!data) {
        return (
            <main className="mx-auto max-w-6xl px-4 py-10">
                <EmptyState message="Agendamento não encontrado." />
            </main>
        );
    }

    const normalizedStatus = normalizeStatus(data);
    const statusTokens = STATUS_COPY[normalizedStatus];
    const { date, time } = formatDateTime(data);
    const formattedAddress = formatAddress(data);
    const formattedPrice = formatPrice(data);
    const canCancel = normalizedStatus === "pending" || normalizedStatus === "confirmed";
    const services = data.services ?? (data.serviceName ? [{ id: data.serviceId ?? "service", name: data.serviceName }] : []);

    const professionalImage = data.professional?.profileImageUrl ?? data.professional?.image ?? "/images/professional/woman (1).jpeg";
    const contactMailto = `mailto:contato@conectabem.com?subject=${encodeURIComponent(
        `Pergunta sobre o agendamento ${appointmentId}`,
    )}`;
    const serviceIdLabel = data.serviceId ?? services[0]?.id ?? "—";
    const observationText = data.yourObservation ?? "Nenhuma observação registrada.";
    const observationCount = observationText === "Nenhuma observação registrada." ? 0 : observationText.length;
    const staticMapUrl = buildStaticMapUrl(formattedAddress);
    const mapImageSrc = data.mapSnapshot ?? staticMapUrl;
    const mapsLinkUrl = data.mapUrl
        ?? (formattedAddress && formattedAddress !== "—"
            ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(formattedAddress)}`
            : null);

    return (
        <div className="min-h-screen bg-[#f3f5fa] px-3 py-10 sm:px-4">
            <div className="mx-auto w-full max-w-6xl space-y-6">
                <Link href="/agendamentos-pacientes" className="inline-flex items-center gap-2 text-sm font-semibold text-[#3857F4]">
                    <ArrowLeft className="h-4 w-4" />
                    Voltar
                </Link>

                <section className="rounded-lg p-6">
                    <header className="space-y-1">
                        <h1 className="text-2xl font-semibold text-[#1F2340]">Informações do Agendamento</h1>
                        <p className="text-xs font-medium text-[#8B90B3]">ID Serviço: {serviceIdLabel}</p>
                    </header>

                    {normalizedStatus === "pending" ? (
                        <div className="mt-5 flex flex-col gap-3">
                            <div className="flex flex-col gap-3 rounded-lg border border-[#C53030] bg-[#FFFFFF] p-4 text-sm text-[#1D1B20]">
                                <div className="flex items-start gap-3">
                                    <AlertTriangle className="h-5 w-5 flex-shrink-0 text-[#C53030]" />
                                    <p>A partir de agora o profissional terá que confirmar a sua solicitação. Você será notificado assim que o agendamento for aceito.</p>
                                </div>
                            </div>
                        </div>
                    ) : null}



                    <article className="mt-6 rounded-lg border border-[#E1E4FF] bg-[#FFF] p-6">

                        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                            <span className={`inline-flex w-full items-center justify-center gap-2 rounded-xl border px-4 py-2 text-sm font-semibold ${statusTokens.border} ${statusTokens.bg} ${statusTokens.text}`}>
                                <span className={`h-2 w-2 rounded-lg ${statusTokens.indicator}`} />
                                {statusTokens.label}
                            </span>

                        </div>
                        <div className="mt-6 space-y-5">
                            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                                <div className="relative h-28 w-28 overflow-hidden rounded-lg border border-[#E0E4FF] bg-white shadow-[0_10px_40px_rgba(56,87,244,0.08)]">
                                    <Image src={professionalImage} alt={data.professional?.name ?? "Profissional"} fill className="object-cover" sizes="112px" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-semibold text-[#2843A4]">{data.professional?.name}</h2>
                                    <div className="mt-4 space-y-2 text-sm text-[#1F2340]">
                                        <div className="flex items-center gap-3">
                                            <CalendarDays className="h-4 w-4 text-[#1d1d20
                                            ]" />
                                            <p className="text-base font-medium">
                                                <span className="font-semibold text-[#1d1d20
                                                ]">Data:</span> {date}
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <Clock3 className="h-4 w-4 text-[#1d1d20
                                            ]" />
                                            <p className="text-base font-medium">
                                                <span className="font-semibold text-[#1d1d20
                                                ]">Horário:</span> {time}
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <Wallet className="h-4 w-4 text-[#1d1d20
                                            ]" />
                                            <p className="text-base font-medium">
                                                <span className="font-semibold                                                  text-[#1d1d20                                                 ]">Preço:</span> {formattedPrice}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <hr className=" mx-auto w-[98%] border-t border-[#CBC8D0]" />
                            <div className="flex items-start gap-3 px-4 ">
                                <MapPin className="h-5 w-5 text-[#9790A2]" />
                                <p className="text-sm font-semibold text-[#1F2340]">
                                    {formattedAddress}
                                </p>
                            </div>
                            <hr className=" mx-auto w-[98%] border-t border-[#CBC8D0]" />
                        </div>

                        <div className="mt-6  px-4 py-3">
                            <p className="text-sm font-semibold text-[#1F2340]">Serviços Agendados:</p>
                            {services.length ? (
                                <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-[#4B5278]">
                                    {services.map((service: AppointmentService) => (
                                        <li key={service.id}>{service.name}</li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="mt-3 text-sm text-[#8A8FB8]">Nenhum serviço cadastrado.</p>
                            )}
                        </div>

                        <div className="mt-6 flex flex-col gap-3 md:flex-row">
                            <Link
                                href={contactMailto}
                                className="inline-flex w-full items-center justify-center rounded-lg bg-[#3857F4] px-6 py-3 text-center text-sm font-semibold text-white shadow-lg shadow-[#3857F4]/30 md:flex-1"
                            >
                                Perguntar ao profissional
                            </Link>

                            {canCancel ? (
                                <Link
                                    href={`/agendamentos-pacientes/${appointmentId}/cancelar`}
                                    className="inline-flex w-full items-center justify-center rounded-lg border border-[#C53030] bg-white px-6 py-3 text-sm font-semibold text-[#C53030] md:flex-1"
                                >
                                    X  Cancelar agendamento
                                </Link>
                            ) : null}
                        </div>
                    </article>

                    <div className="mt-6 flex items-start gap-3 rounded-lg border border-[#F3E1E1] bg-[#FFF3F3] px-4 py-3 text-sm text-[#1D1B20]">
                        <Info className="mt-1 h-4 w-4 text-[#C53030]" />
                        <span>O valor da consulta deve ser pago diretamente ao profissional no dia do agendamento.</span>
                    </div>

                    <section className="mt-6 space-y-6">
                        <div className="rounded-lg border border-[#E1E4FF] bg-white/60 p-5">
                            <div className="flex items-center justify-between">
                                <p className="text-sm font-semibold text-[#1F2340]">Suas observações</p>
                                <button type="button" disabled className="text-xs font-semibold text-[#9BA1C7] opacity-70">
                                    editar
                                </button>
                            </div>
                            <div className="mt-3 rounded-lg border border-[#E0E4FF] bg-[#F8F9FF] p-4 text-sm text-[#4B5278] min-h-[120px]">
                                {observationText}
                                <div className="mt-3 text-right text-xs text-[#A1A5C8]">{String(observationCount).padStart(3, "0")}/300</div>
                            </div>
                        </div>

                        <div className="rounded-lg  p-5">
                            <p className="text-sm font-semibold text-[#1F2340]">Endereço Selecionado</p>
                            <p className="text-xs text-[#8B90B3]">Veja no mapa o endereço escolhido para realizar o seu atendimento.</p>

                            <div className="mt-4 flex items-start gap-3 rounded-lg border border-[#E0E4FF] bg-[#F8F9FF] px-4 py-3">
                                <div className="flex h-6 w-6 items-center justify-center text-[#9790A2] shadow-inner">
                                    <MapPin className="h-4 w-4" />
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-[#1F2340]">{formattedAddress}</p>

                                </div>
                            </div>

                            <div className="mt-4 overflow-hidden rounded-lg border border-[#E0E4FF] bg-[#E3E9FF]">
                                {mapImageSrc ? (
                                    <Image src={mapImageSrc} alt="Mapa do endereço do atendimento" width={1024} height={400} className="h-56 w-full object-cover" />
                                ) : (
                                    <div className="flex h-56 w-full flex-col items-center justify-center bg-[radial-gradient(circle_at_top,_#dfe6ff,_#b8c7ff)] text-[#31428B]">
                                        <MapPin className="h-8 w-8" />
                                        <p className="mt-2 text-sm font-semibold">Prévia do mapa indisponível</p>
                                    </div>
                                )}
                                {mapsLinkUrl ? (
                                    <Link
                                        href={mapsLinkUrl}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="block bg-[#3857F4] px-6 py-3 text-center text-sm font-semibold text-white"
                                    >
                                        Abrir no mapa
                                    </Link>
                                ) : null}
                            </div>
                        </div>
                    </section>


                </section>
            </div>
        </div>
    );
}
