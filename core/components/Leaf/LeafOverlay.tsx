import {styled} from "@/core/styled";
import Leaf from "./Leaf";

const LeafOverlay = styled(Leaf, {
  outerStyle: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
});

export default LeafOverlay;