export const initNodes = [
  {
    id: "1",
    type: "custom",
    data: {
      title: "Block 1",
      description: "Make HTTP request",
      icon: "/location.svg",
      color: "#006acc",
    },
    position: { x: 0, y: 50 },
  },
  {
    id: "2",
    type: "custom",
    data: {
      title: "Block 2",
      description: "Make HTTP request",
      icon: "/location.svg",
      color: "#006acc",
    },
    position: { x: -200, y: 200 },
  },
  {
    id: "3",
    type: "custom",
    data: {
      title: "Block 3",
      description: "Make HTTP request",
      icon: "/location.svg",
      color: "#006acc",
    },
    position: { x: 200, y: 200 },
  },
];

export const initEdges = [
  {
    id: "e1-2",
    source: "1",
    target: "2",
    type: "smoothstep",
  },
  {
    id: "e1-3",
    source: "1",
    target: "3",
    type: "smoothstep",
  },
];
