import { AcctContent } from "./content";
interface AcctPageProps {
  params: {
    acct: string | undefined;
  };
}
export default async function AcctPage({ params }: AcctPageProps) {
  return <AcctContent {...params} />;
}
