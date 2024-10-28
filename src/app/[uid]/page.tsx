import { type Metadata } from "next";
import { AcctContent } from "./content";
interface AcctPageProps {
  params: {
    uid: string;
  };
}
export const metadata: Metadata = {
  title: "Wallet",
};
export default async function AcctPage({ params }: AcctPageProps) {
  return <AcctContent {...params} />;
}
