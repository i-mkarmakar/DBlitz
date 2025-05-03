'use client';

import React, { useCallback } from "react";
import {
  addEdge,
  Background,
  BackgroundVariant,
  ReactFlow,
  useEdgesState,
  useNodesState,
  getNodesBounds,
  getViewportForBounds,
  Panel,
  Connection,
  Edge,
  Node,
} from "@xyflow/react";
import { ArrowLeft, Download } from "lucide-react";
import "@xyflow/react/dist/style.css";
import EntityNode, { EntityNodeProps } from "@/components/erd/entity-node";
import RelationEdge, { RelationEdgeProps } from "@/components/erd/relation-edge";
import { Button } from "@/components/ui/button";
import Toolbar from "@/components/erd/toolbar";
import { toPng } from "html-to-image";
import { placeholderData } from "@/lib/constants";

const imageWidth = 1024;
const imageHeight = 768;

const initialNodes: Node[] = [
  {
    id: "1",
    position: { x: 10, y: 10 },
    data: { name: "", attributes: [{ name: "", type: "string" }], open: true },
    type: "entity",
  },
  {
    id: "2",
    position: { x: 400, y: 400 },
    data: { name: "", attributes: [{ name: "", type: "string" }], open: false },
    type: "entity",
  },
];

const initialEdges: Edge[] = [
  {
    id: "e1-2",
    source: "1",
    target: "2",
    type: "relation",
    data: { type: "1-m" },
  },
];

const edgeTypes = {
  relation: RelationEdge,
};

const nodeTypes = {
  entity: EntityNode,
};

export default function ErdBoard() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params: Connection) => {
      setEdges((eds) =>
        addEdge(
          { ...params, type: "relation", data: { type: "1-m" } },
          eds
        )
      );
    },
    [setEdges]
  );

  const downloadImage = (dataUrl: string) => {
    const a = document.createElement("a");
    a.download = "schema.png";
    a.href = dataUrl;
    a.click();
  };

  const onDownloadClick = () => {
    const bounds = getNodesBounds(nodes);
    const viewport = getViewportForBounds(bounds, imageWidth, imageHeight, 0.5, 2, 0.1);

    const flow = document.querySelector(".react-flow__viewport") as HTMLElement;
    if (!flow) return;

    toPng(flow, {
      backgroundColor: "white",
      width: imageWidth,
      height: imageHeight,
      style: {
        width: `${imageWidth}px`,
        height: `${imageHeight}px`,
        transform: `translate(${viewport.x}px, ${viewport.y}px) scale(${viewport.zoom})`,
      },
    }).then(downloadImage);
  };

  const onUseExample = () => {
    const exampleNodes: Node[] = placeholderData.entities.map((entity, index) => ({
      id: `n-${index}`,
      position: { x: 50 + index * 250, y: 50 + index * 100 },
      data: { name: entity.name, attributes: entity.attributes, open: true },
      type: "entity",
    }));

    const exampleEdges: Edge[] = placeholderData.relations.map((relation, index) => {
      const from = exampleNodes.find((node) => node.data.name === relation.from);
      const to = exampleNodes.find((node) => node.data.name === relation.to);
      if (!from || !to) return null;
      return {
        id: `e-${index}`,
        source: from.id,
        target: to.id,
        type: "relation",
        data: { type: relation.type },
      };
    }).filter(Boolean) as Edge[];

    setNodes(exampleNodes);
    setEdges(exampleEdges);
  };

  return (
    <div className="relative w-full h-screen rounded">
      <Button
        onClick={() => window.history.back()}
        variant="ghost"
        className="absolute cursor-pointer top-4 left-4 z-50 font-medium py-1 px-3 rounded flex items-center gap-2"
      >
        <ArrowLeft />
        Back
      </Button>

      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        fitView
      >
        <Background variant={BackgroundVariant.Dots} gap={12} size={1} />

        <Panel position="top-right">
          <div className="flex gap-2">
            <Button variant="ghost" onClick={onUseExample} className="cursor-pointer">Use Example</Button>
            <Button variant="ghost" onClick={onDownloadClick} className="cursor-pointer" title="Download Image">
              <Download size={20} />
            </Button>
          </div>
        </Panel>

        <Toolbar />
      </ReactFlow>
    </div>
  );
}
