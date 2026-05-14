import Block1Hook from "./narrative/Block1Hook";
import Block2Disruption from "./narrative/Block2Disruption";
import Block3Break from "./narrative/Block3Break";
import Block4Reveal from "./narrative/Block4Reveal";
import Block5Law from "./narrative/Block5Law";
import Block6Implication from "./narrative/Block6Implication";
import Block7Contrast from "./narrative/Block7Contrast";
import Block8Authority from "./narrative/Block8Authority";
import Block9Ecosystem from "./narrative/Block9Ecosystem";
import Block10EmailGate from "./narrative/Block10EmailGate";
import Block10OPPProof from "./narrative/Block10OPPProof";
import Block11Final from "./narrative/Block11Final";

export default function ScrollNarrative() {
  return (
    <div data-ocid="narrative.container" className="relative overflow-hidden">
      <Block1Hook />
      <Block2Disruption />
      <Block3Break />
      <Block4Reveal />
      <Block5Law />
      <Block6Implication />
      <Block7Contrast />
      <Block8Authority />
      <Block9Ecosystem />
      <Block10OPPProof />
      <Block10EmailGate />
      <Block11Final />
    </div>
  );
}
