"use client";

import { useId, useRef, useState, type FormEvent } from "react";
import { FileSignature } from "lucide-react";
import { UserModuleObject } from "../module";

const contractUrl = process.env.NEXT_PUBLIC_ARTIST_CONTRACT_URL?.trim();
const version = process.env.NEXT_PUBLIC_ARTIST_CONTRACT_VERSION?.trim();
const configured = Boolean(version && contractUrl && /^(https:\/\/|\/(?!\/))/i.test(contractUrl));

const copy = {
  english: {
    title: "Artist contract", close: "Close", open: "Read the contract",
    unavailable: "The artist contract is pending publication.",
    name: "Full name (signature)", consent: "I have read and agree to this version of the artist contract.",
    sign: "Sign and download a copy", download: "Download signature record",
    local: "The signature record is stored in this browser.",
    error: "The signature could not be saved in this browser.",
  },
  spanish: {
    title: "Contrato de artista", close: "Cerrar", open: "Leer el contrato",
    unavailable: "El contrato de artista está pendiente de publicación.",
    name: "Nombre completo (firma)", consent: "He leído y acepto esta versión del contrato de artista.",
    sign: "Firmar y descargar una copia", download: "Descargar constancia de firma",
    local: "La constancia de firma se guarda en este navegador.",
    error: "No se pudo guardar la firma en este navegador.",
  },
  catalan: {
    title: "Contracte d’artista", close: "Tanca", open: "Llegeix el contracte",
    unavailable: "El contracte d’artista està pendent de publicació.",
    name: "Nom complet (signatura)", consent: "He llegit i accepto aquesta versió del contracte d’artista.",
    sign: "Signa i descarrega una còpia", download: "Descarrega el justificant de signatura",
    local: "El justificant de signatura es desa en aquest navegador.",
    error: "No s’ha pogut desar la signatura en aquest navegador.",
  },
};

type Signature = {
  artistId: string;
  version: string;
  contractUrl: string;
  signature: string;
  acceptedAt: string;
};

export function ArtistContract({ language }: { language: string }) {
  const text = copy[language as keyof typeof copy] ?? copy.english;
  const dialog = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const [artistId, setArtistId] = useState("");
  const [receipt, setReceipt] = useState<Signature | null>(null);
  const [error, setError] = useState(false);
  const key = (id: string) => `bbok.artist-contract.${id}.${version}`;

  function open() {
    const id = localStorage.getItem(UserModuleObject.localState.USER_ID) ?? "";
    setArtistId(id);
    setError(false);
    setReceipt(null);
    if (configured && id) {
      try {
        const saved = JSON.parse(localStorage.getItem(key(id)) ?? "null") as Signature | null;
        if (saved?.artistId === id && saved.version === version && saved.contractUrl === contractUrl) {
          setReceipt(saved);
        }
      } catch {}
    }
    dialog.current?.showModal();
  }

  function download(record: Signature) {
    const url = URL.createObjectURL(new Blob([JSON.stringify(record, null, 2)], { type: "application/json" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = "bbok-artist-contract-signature.json";
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  function sign(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!configured || !artistId || !version || !contractUrl || receipt) return;
    const fields = new FormData(event.currentTarget);
    const signature = String(fields.get("signature") ?? "").trim();
    if (!signature || fields.get("acceptance") !== "on") {
      const input = event.currentTarget.elements.namedItem("signature");
      if (input instanceof HTMLInputElement) {
        input.value = signature;
        input.reportValidity();
      }
      return;
    }
    const record = { artistId, version, contractUrl, signature, acceptedAt: new Date().toISOString() };
    try {
      localStorage.setItem(key(artistId), JSON.stringify(record));
      setReceipt(record);
      setError(false);
      download(record);
    } catch {
      setError(true);
    }
  }

  return (
    <>
      <button type="button" onClick={open} aria-haspopup="dialog"
        className="flex shrink-0 items-center gap-2 rounded-lg border border-white/40 bg-white/20 px-4 py-3 text-white hover:bg-white/30">
        <FileSignature size={20} aria-hidden="true" />
        {text.title}
      </button>
      <dialog ref={dialog} aria-labelledby={titleId}
        className="bbok-modal fixed inset-0 m-auto max-h-[85dvh] w-[min(32rem,calc(100%-2rem))] overflow-y-auto rounded-xl border border-white/30 bg-zinc-950 p-5 text-white"
        onClose={() => dialog.current?.querySelector("form")?.reset()}>
        <header className="mb-4 flex items-center justify-between gap-3">
          <h2 id={titleId} className="text-xl font-semibold">{text.title}</h2>
          <button type="button" className="rounded px-2 py-1 hover:bg-white/20" onClick={() => dialog.current?.close()} aria-label={text.close}>×</button>
        </header>
        {configured ? (
          <div className="space-y-4">
            <a href={contractUrl} target="_blank" rel="noopener noreferrer" className="block underline">{text.open} ({version})</a>
            <p className="text-sm text-white/75">{text.local}</p>
            {receipt ? (
              <>
                <p role="status">{receipt.signature} · {new Date(receipt.acceptedAt).toLocaleDateString()}</p>
                <button type="button" onClick={() => download(receipt)} className="rounded bg-purple-700 px-4 py-2">{text.download}</button>
              </>
            ) : artistId && (
              <form onSubmit={sign} className="space-y-4">
                <label className="block">
                  {text.name}
                  <input name="signature" required maxLength={160} autoComplete="name" className="mt-1 text-black" />
                </label>
                <label className="flex items-start gap-2">
                  <input name="acceptance" type="checkbox" required className="mt-1" />
                  {text.consent}
                </label>
                <button type="submit" className="rounded bg-purple-700 px-4 py-2 hover:bg-purple-600">{text.sign}</button>
                {error && <p role="alert" className="text-red-300">{text.error}</p>}
              </form>
            )}
          </div>
        ) : <p>{text.unavailable}</p>}
      </dialog>
    </>
  );
}
