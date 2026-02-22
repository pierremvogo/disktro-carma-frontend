import { ScreenEmbed } from "@/modules/components/screenEmbed";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ view?: string }>;
}) {
  const { view } = await searchParams;
  return <ScreenEmbed initialView={view} />;
}
