"use client";

import React, { useCallback } from "react";
import {
  addEdge,
  Background,
  BackgroundVariant,
  ReactFlow,
  ReactFlowProvider,
  useEdgesState,
  useNodesState,
  getNodesBounds,
  getViewportForBounds,
  Panel,
  Connection,
  Edge,
  Node,
  ReactFlowState,
  useReactFlow,
  useStore,
  useStoreApi,
} from "@xyflow/react";
import {
  ArrowLeft,
  Download,
  Lock,
  Unlock,
  PlusIcon,
  ZoomIn,
  ZoomOut,
  Ratio,
} from "lucide-react";
import "@xyflow/react/dist/style.css";
import EntityNode from "@/components/entity-node";
import RelationEdge from "@/components/relation-edge";
import { Button } from "@/components/ui/button";
import { toPng } from "html-to-image";
import { placeholderData } from "@/lib/constants";
import { shallow } from "zustand/shallow";

const selector = (s: ReactFlowState) => ({
  isInteractive: s.nodesDraggable || s.nodesConnectable || s.elementsSelectable,
  minZoomReached: s.transform[2] <= s.minZoom,
  maxZoomReached: s.transform[2] >= s.maxZoom,
});

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

function ErdBoardInner() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const { zoomIn, zoomOut, fitView } = useReactFlow();
  const store = useStoreApi();
  const { isInteractive, minZoomReached, maxZoomReached } = useStore(selector, shallow);

  const createNode = useCallback(() => {
    setNodes((prev) => {
      const last = prev[prev.length - 1];
      const newId = (parseInt(last?.id || "0") + 1).toString();
      return [
        ...prev,
        {
          id: newId,
          type: "entity",
          data: {
            name: "",
            attributes: [{ name: "", type: "string" }],
            open: true,
          },
          position: {
            x: (last?.position.x || 10) + 300,
            y: last?.position.y || 10,
          },
        },
      ];
    });
  }, [setNodes]);

  const onConnect = useCallback(
    (params: Connection) => {
      setEdges((eds) =>
        addEdge({ ...params, type: "relation", data: { type: "1-m" } }, eds)
      );
    },
    [setEdges]
  );

  const onToggleInteractivity = () => {
    store.setState({
      nodesDraggable: !isInteractive,
      nodesConnectable: !isInteractive,
      elementsSelectable: !isInteractive,
    });
  };

  const onZoomInHandler = () => zoomIn();
  const onZoomOutHandler = () => zoomOut();
  const onFitViewHandler = () => fitView({ padding: 0.1 });

  const onDownloadClick = () => {
    const bounds = getNodesBounds(nodes);
    const viewport = getViewportForBounds(
      bounds,
      imageWidth,
      imageHeight,
      0.5,
      2,
      0.1
    );
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

  const downloadImage = (dataUrl: string) => {
    const a = document.createElement("a");
    a.download = "schema.png";
    a.href = dataUrl;
    a.click();
  };

  const onUseExample = () => {
    const exampleNodes: Node[] = placeholderData.entities.map((entity, index) => ({
      id: `n-${index}`,
      position: { x: 50 + index * 250, y: 50 + index * 100 },
      data: { name: entity.name, attributes: entity.attributes, open: true },
      type: "entity",
    }));

    const exampleEdges: Edge[] = placeholderData.relations
      .map((relation, index) => {
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
      })
      .filter(Boolean) as Edge[];

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
          <div className="absolute right-4 flex flex-row gap-2">
            <Button variant="ghost" onClick={onUseExample} className="cursor-pointer">
              Use Example
            </Button>
            <Button
              variant="ghost"
              onClick={onDownloadClick}
              title="Download Image"
              className="cursor-pointer"
            >
              <Download size={20} />
            </Button>
          </div>
        </Panel>
        </ReactFlow>
        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex gap-4">
          <Button
            title={isInteractive ? "Lock Interactions" : "Unlock Interactions"}
            onClick={onToggleInteractivity}
            className="cursor-pointer"
          >
            {isInteractive ? <Lock size={20} /> : <Unlock size={20} />}
          </Button>
          <Button
            title="Zoom In"
            onClick={onZoomInHandler}
            disabled={maxZoomReached}
            className="cursor-pointer"
          >
            <ZoomIn size={20} />
          </Button>
          <Button
            title="Add Entity"
            onClick={createNode}
            className="bg-[#ff5941] text-white hover:bg-[#ff5941]/90 cursor-pointer p-4 transform scale-125"
          >
            <PlusIcon size={30} />
          </Button>
          <Button
            title="Zoom Out"
            onClick={onZoomOutHandler}
            disabled={minZoomReached}
            className="cursor-pointer"
          >
            <ZoomOut size={20} />
          </Button>
          <Button
            title="Fit View"
            onClick={onFitViewHandler}
            className="cursor-pointer"
          >
            <Ratio size={20} />
          </Button>
        </div>
    </div>
  );
}

export default function ErdBoard() {
  return (
    <ReactFlowProvider>
      <ErdBoardInner />
    </ReactFlowProvider>
  );
}
