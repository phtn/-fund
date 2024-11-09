import { type Metadata } from "next";
import { AcctContent } from "./content";
import { Scroll } from "./framer/scroll";
interface AcctPageProps {
  params: {
    uid: string;
  };
}
export const metadata: Metadata = {
  title: "Wallet",
};
export default async function AcctPage({ params }: AcctPageProps) {
  return (
    <div className="flex">
      <AcctContent {...params} />
      <Scroll />
    </div>
  );
}
