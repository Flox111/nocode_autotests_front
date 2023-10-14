import React, { FC } from "react";
import {
  EdgeProps,
  getBezierPath,
  EdgeLabelRenderer,
  BaseEdge,
  MarkerType,
  SmoothStepEdge,
} from "reactflow";

const CustomEdge: FC<EdgeProps> = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  markerEnd,
  sourceHandleId,
  style,
  source,
  target,
}) => {
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  if (sourceHandleId?.startsWith("source")) {
    return (
      <SmoothStepEdge
        id={id}
        targetX={targetX}
        markerEnd={markerEnd}
        style={style}
        source={source}
        target={target}
        sourcePosition={sourcePosition}
        targetPosition={targetPosition}
        sourceX={sourceX}
        sourceY={sourceY}
        targetY={targetY}
      />
    );
  } else {
    return (
      <SmoothStepEdge
        id={id}
        targetX={targetX}
        markerEnd={markerEnd}
        style={style}
        source={source}
        target={target}
        sourcePosition={sourcePosition}
        targetPosition={targetPosition}
        sourceX={sourceX}
        sourceY={sourceY}
        targetY={targetY}
        label={sourceHandleId}
        labelStyle={{
          fontSize: "11.5px",
          fill: "white",
          textTransform: "capitalize",
          fontWeight: 600
        }}
        labelBgStyle={{
          fill: "#444444"
        }}
        labelBgPadding={[8, 8]}
        labelBgBorderRadius={6}
      />
    );
  }
};

export default CustomEdge;
