import { MarkerType } from "reactflow";

export const defaultEdgeOptions = {
  style: { strokeWidth: 1.5, stroke: "white" },
  type: "custom",
  markerEnd: {
    type: MarkerType.ArrowClosed,
    color: "white",
  },
};


export const getImageForState = (state?: string) => {
  switch (state) {
    case "success":
      return "check.svg";
    case "fail":
      return "error2.svg";
    case "process":
      return "waiting.svg";
    default:
      return null;
  }
};