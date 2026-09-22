import EcosystemCards from "./EcosystemCards";
import Footer from "./Footer";
import FounderCard from "./FounderCard";
import PillarsGrid from "./PillarsGrid";
import ProofBlock from "./ProofBlock";

export default function ScrollNarrative() {
  return (
    <div data-ocid="narrative.container" className="relative overflow-hidden">
      <EcosystemCards />
      <PillarsGrid />
      <FounderCard />
      <ProofBlock />
      <Footer />
    </div>
  );
}
