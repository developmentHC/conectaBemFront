"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { AlertTriangle, ArrowLeft, CalendarDays, CheckCircle2, Clock3, Info, Loader2, MapPin, Wallet, X } from "lucide-react";
import toast from "react-hot-toast";
import { useAppointmentDetail } from "@/features/agentamentos/hooks/useAppointmentDetail";
import { useCancelAppointment } from "@/features/agentamentos/hooks/useCancelAppointment";
import type { AppointmentAddress, AppointmentService, AppointmentStatusVariant, IAppointmentDetail } from "@/types/appointment";

const STATUS_COPY: Record<
    AppointmentStatusVariant,
    { label: string; bg: string; text: string; border: string; indicator: string }
> = {
    pending: {
        label: "Pendente de confirmação",
        bg: "bg-amber-50",
        text: "text-amber-800",
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

const MAX_REASON_LENGTH = 300;

export default function CancelAppointmentPage() {
    const params = useParams<{ appointmentId: string }>();
    const appointmentId = useMemo(() => {
        if (!params?.appointmentId) return "";
        return Array.isArray(params.appointmentId) ? params.appointmentId[0] : params.appointmentId;
    }, [params]);

    const router = useRouter();
    const { data, isLoading, error } = useAppointmentDetail(appointmentId);
    const cancelMutation = useCancelAppointment();
    const [reason, setReason] = useState("");
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);
    const reasonCount = reason.length;

    const isSubmitting = cancelMutation.isPending;

    const autoResizeTextarea = (element: HTMLTextAreaElement) => {
        element.style.height = "auto";
        element.style.height = `${element.scrollHeight}px`;
    };

    const handleReasonChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        const incoming = event.target.value;
        const nextValue = incoming.slice(0, MAX_REASON_LENGTH);
        setReason(nextValue);
        autoResizeTextarea(event.target);
    };

    useEffect(() => {
        if (textareaRef.current) {
            autoResizeTextarea(textareaRef.current);
        }
    }, [reason]);

    const closeSuccessModal = () => {
        setIsSuccessModalOpen(false);
        router.replace("/agendamentos-pacientes");
    };

    const triggerCancellation = () => {
        const trimmed = reason.trim();

        if (!trimmed || trimmed.length < 10) {
            toast.error("Descreva o motivo do cancelamento (mín. 10 caracteres).");
            setIsConfirmModalOpen(false);
            return;
        }

        cancelMutation.mutate(
            { appointmentId, reason: trimmed },
            {
                onSuccess: () => {
                    setIsConfirmModalOpen(false);
                    setIsSuccessModalOpen(true);
                    setReason("");
                    toast.success("Agendamento cancelado com sucesso.");
                },
                onError: () => {
                    toast.error("Não foi possível concluir o cancelamento.");
                },
            },
        );
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const trimmed = reason.trim();

        if (!trimmed || trimmed.length < 10) {
            toast.error("Descreva o motivo do cancelamento (mín. 10 caracteres).");
            return;
        }

        setIsConfirmModalOpen(true);
    };

    if (!appointmentId) {
        return (
            <main className="mx-auto max-w-3xl px-4 py-10">
                <section className="rounded-lg border border-slate-200 bg-white p-8 text-center">
                    <p className="text-base text-slate-600">Identificador do agendamento inválido.</p>
                    <Link href="/agendamentos-pacientes" className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-blue-700">
                        <ArrowLeft className="h-4 w-4" />
                        Voltar para Meus Agendamentos
                    </Link>
                </section>
            </main>
        );
    }

    if (isLoading) {
        return (
            <main className="mx-auto max-w-3xl px-4 py-10">
                <div className="rounded-lg border border-slate-200 bg-white p-8 text-center">
                    <Loader2 className="mx-auto h-8 w-8 animate-spin text-blue-600" />
                    <p className="mt-3 text-sm text-slate-500">Carregando informações do agendamento...</p>
                </div>
            </main>
        );
    }

    if (error || !data) {
        return (
            <main className="mx-auto max-w-3xl px-4 py-10">
                <section className="rounded-lg border border-slate-200 bg-white p-8 text-center">
                    <p className="text-base text-slate-600">Não foi possível carregar este agendamento.</p>
                    <Link href="/agendamentos-pacientes" className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-blue-700">
                        <ArrowLeft className="h-4 w-4" />
                        Voltar para Meus Agendamentos
                    </Link>
                </section>
            </main>
        );
    }

    const normalizedStatus = normalizeStatus(data);
    const statusTokens = STATUS_COPY[normalizedStatus];
    const { date, time } = formatDateTime(data);
    const formattedPrice = formatPrice(data);
    const formattedAddress = formatAddress(data);
    const services: AppointmentService[] = data.services?.length
        ? data.services
        : data.serviceName
            ? [
                {
                    id: data.serviceId ?? "service",
                    name: data.serviceName,
                    durationMinutes: data.duration,
                    price: data.price,
                },
            ]
            : [];
    const serviceIdLabel = data.serviceId ?? services[0]?.id ?? "—";
    const professionalImage = data.professional?.profileImageUrl ?? data.professional?.image ?? "/images/professional/woman (1).jpeg";

    return (
        <div className="min-h-screen bg-[#f3f5fa] px-3 py-10 sm:px-2">
            <main className="mx-auto w-full max-w-5xl space-y-6">
                <Link
                    href={`/agendamentos-pacientes/${appointmentId}`}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-[#3857F4]"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Voltar
                </Link>
                <div>
                    <p className="text-2xl font-semibold text-[#1F2340]">Cancelar agendamento</p>
                    <p className="text-xs font-medium text-[#8B90B3]">ID Serviço: {serviceIdLabel}</p>

                </div>

                <section className="rounded-lg border border-[#E1E4FF] bg-white p-6 shadow-sm space-y-6">


                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <span className={`inline-flex w-full items-center justify-center gap-2 rounded-xl border px-4 py-2 text-sm font-semibold ${statusTokens.border} ${statusTokens.bg} ${statusTokens.text}`}>
                            <span className={`h-2 w-2 rounded-lg ${statusTokens.indicator}`} />
                            {statusTokens.label}
                        </span>

                    </div>


                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                        <div className="relative h-28 w-28 overflow-hidden rounded-lg border border-[#E0E4FF] bg-white ]">
                            <Image src={professionalImage} alt={data.professional?.name ?? "Profissional"} fill className="object-cover" sizes="112px" />
                        </div>
                        <div className="space-y-2 text-sm text-[#1F2340]">
                            <h2 className="text-xl font-semibold text-[#2843A4]">{data.professional?.name ?? "Profissional"}</h2>
                            <div className="space-y-2">
                                <div className="flex items-center gap-3">
                                    <CalendarDays className="h-4 w-4 text-[#1d1d20]" />
                                    <p className="text-base font-medium">
                                        <span className="font-semibold">Data:</span> {date}
                                    </p>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Clock3 className="h-4 w-4 text-[#1d1d20]" />
                                    <p className="text-base font-medium">
                                        <span className="font-semibold">Horário:</span> {time}
                                    </p>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Wallet className="h-4 w-4 text-[#1d1d20]" />
                                    <p className="text-base font-medium">
                                        <span className="font-semibold">Preço:</span> {formattedPrice}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr className="mx-auto my-1 w-[98%] border-t border-[#CBC8D0]" />
                    <div className="flex items-center gap-2 px-4 text-sm">
                        <MapPin className="h-4 w-4 text-[#3857F4]" />
                        <p className="text-[#4B5278]">{formattedAddress}</p>
                    </div>
                    <hr className="mx-auto my-1 w-[98%] border-t border-[#CBC8D0]" />
                </section>
                <section>
                    <div>
                        <p className="text-sm font-semibold  text-[#1F2340]">Serviços a serem cancelados</p>
                        <p className="text-xs  text-[#8B90B3]">Todos os serviços que serão cancelados com este(a) profissional.</p>
                        <div className="mt-4 space-y-4">
                            {services.length ? (
                                services.map((service) => {
                                    const durationLabel = service.durationMinutes ? `${service.durationMinutes} minutos` : "—";
                                    const servicePrice = typeof service.price === "number"
                                        ? service.price.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })
                                        : "—";
                                    const serviceDescription = service.description ?? "Descrição indisponível no momento.";
                                    return (
                                        <article key={service.id} className="rounded-lg border border-[#E0E4FF] bg-[#FDFDFE] p-4">
                                            <p className="text-base font-semibold text-[#1F2340]">{service.name}</p>
                                            <div className="mt-3 grid gap-3 text-sm text-[#4B5278] sm:grid-cols-2">
                                                <p>
                                                    <span className="font-semibold text-[#1F2340]">Duração:</span> {durationLabel}
                                                </p>
                                                <p>
                                                    <span className="font-semibold text-[#1F2340]">Preço:</span> {servicePrice}
                                                </p>
                                            </div>
                                            <p className="mt-3 text-sm text-[#6E749D]">{serviceDescription}</p>
                                        </article>
                                    );
                                })
                            ) : (
                                <p className="text-sm text-[#8A8FB8]">Nenhum serviço cadastrado para cancelamento.</p>
                            )}
                        </div>
                    </div>
                </section>

                <section className="rounded-lg border border-[#FFE1E1] bg-white p-6 shadow-sm space-y-6">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="cancel-reason" className="text-sm font-semibold text-[#1F2340]">
                                Justifique o seu cancelamento
                            </label>
                            <textarea
                                id="cancel-reason"
                                name="cancel-reason"
                                ref={textareaRef}
                                rows={1}
                                value={reason}
                                onChange={handleReasonChange}
                                maxLength={MAX_REASON_LENGTH}
                                placeholder="Descreva o motivo do cancelamento para avisarmos o profissional."
                                className="mt-2 w-full resize-none overflow-hidden rounded-lg border border-[#E0E4FF] bg-[#F8F9FF] px-4 py-3 text-sm text-[#1F2340] focus:border-[#3857F4] focus:bg-white focus:outline-none"
                            />
                            <div className="mt-2 flex justify-end text-xs text-[#8B90B3]">
                                <span>{String(reasonCount).padStart(3, "0")}/{MAX_REASON_LENGTH}</span>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="flex flex-col gap-3">
                                <div className="flex items-start gap-3 rounded-lg border border-[#ADBAEB] bg-[#FFF3F3] px-4 py-3 text-sm text-[#1D1B20]">
                                    <Info className="mt-0.5 h-4 w-4 text-[#C53030]" />
                                    <span>Atenção! Esse cancelamento não poderá ser desfeito ao clicar no botão abaixo.</span>
                                </div>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="inline-flex items-center justify-center gap-3 self-center rounded-lg border-2 border-[#C53030] bg-white px-28 py-2 text-base font-semibold text-[#C53030] transition-colors hover:bg-[#FFF3F3] disabled:cursor-not-allowed disabled:opacity-70"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Cancelando...
                                        </>
                                    ) : (
                                        <>
                                            <X className="h-4 w-4" />
                                            Cancelar agendamento
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </form>
                </section>
            </main>

            {isConfirmModalOpen ? (
                <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/20 px-4 py-8 backdrop-blur-sm">
                    <div className="relative w-full max-w-lg rounded-lg bg-white p-6 shadow-xl">
                        <button
                            type="button"
                            aria-label="Fechar modal de confirmação"
                            onClick={() => setIsConfirmModalOpen(false)}
                            className="absolute right-4 top-4 rounded-full p-1 text-[#667085] transition hover:bg-slate-100"
                        >
                            <X className="h-4 w-4" />
                        </button>
                        <div className="space-y-4">
                            <div className="flex items-start gap-3">
                                <AlertTriangle className="h-6 w-6 text-rose-500" />
                                <div>
                                    <p className="text-lg font-semibold text-[#1F2340]">Confirmar cancelamento?</p>
                                    <p className="text-sm text-[#4B5278]">Essa ação notificará o profissional e liberará o horário selecionado.</p>
                                </div>
                            </div>
                            <div className="rounded-lg border border-[#FFE1E1] bg-[#FFF5F5] px-4 py-3 text-sm text-[#6E1F1F]">
                                O cancelamento não poderá ser desfeito após a confirmação.
                            </div>
                            <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
                                <button
                                    type="button"
                                    onClick={() => setIsConfirmModalOpen(false)}
                                    className="inline-flex items-center justify-center rounded-lg border border-[#E0E4FF] px-5 py-2 text-sm font-semibold text-[#4B5278] hover:bg-[#F8F9FF]"
                                >
                                    Manter agendamento
                                </button>
                                <button
                                    type="button"
                                    onClick={triggerCancellation}
                                    disabled={isSubmitting}
                                    className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-[#C53030] bg-[#C53030] px-6 py-2 text-sm font-semibold text-white transition hover:bg-[#A11F1F] disabled:cursor-not-allowed disabled:opacity-70"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <Loader2 className="h-4 w-4 animate-spin" />
                                            Confirmando...
                                        </>
                                    ) : (
                                        <>
                                            <X className="h-4 w-4" />
                                            Confirmar cancelamento
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            ) : null}

            {isSuccessModalOpen ? (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 px-4 py-8 backdrop-blur-sm">
                    <div className="relative w-full max-w-xl rounded-lg bg-white p-8 shadow-2xl">
                        <button
                            type="button"
                            aria-label="Fechar modal"
                            onClick={closeSuccessModal}
                            className="absolute right-4 top-4 rounded-full p-1 text-[#667085] transition hover:bg-slate-100"
                        >
                            <X className="h-4 w-4" />
                        </button>
                        <div className="flex items-start gap-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50">
                                <CheckCircle2 className="h-6 w-6 text-emerald-500" />
                            </div>
                            <div>
                                <p className="text-lg font-semibold text-[#1F2340]">Cancelamento efetuado</p>
                                <p className="text-sm text-[#4B5278]">Seu agendamento foi cancelado com sucesso!</p>
                            </div>
                        </div>
                        <div className="mt-6 flex w-full justify-center">
                            <button
                                type="button"
                                onClick={closeSuccessModal}
                                className="inline-flex min-w-[200px] items-center justify-center rounded-lg bg-[#3857F4] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[#3857F4]/25"
                            >
                                Voltar para Meus Agendamentos
                            </button>
                        </div>
                    </div>
                </div>
            ) : null}
        </div>
    );
}
