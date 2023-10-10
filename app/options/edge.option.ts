import { MarkerType } from "reactflow";

export const defaultEdgeOptions = {
    style: { strokeWidth: 1.5, stroke: 'white' },
    type: 'smoothstep',
    markerEnd: {
      type: MarkerType.ArrowClosed,
      color: 'white',
    },
  };