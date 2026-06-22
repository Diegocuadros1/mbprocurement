import MarketingChrome from "@/components/site/MarketingChrome";

export default function MarketingLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <MarketingChrome>{children}</MarketingChrome>;
}
