import { useState, useCallback, useRef } from "react";
import ReactFlow, {
  Node,
  Edge,
  Controls,
  Background,
  BackgroundVariant,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  ReactFlowProvider,
  Panel,
} from "reactflow";
import "reactflow/dist/style.css";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Save,
  FolderOpen,
  Download,
  Play,
  Rocket,
  Undo2,
  Redo2,
  Plus,
} from "lucide-react";
import { toast } from "sonner";
import StartNode from "@/components/flow-nodes/StartNode";
import MessageNode from "@/components/flow-nodes/MessageNode";
import ConditionNode from "@/components/flow-nodes/ConditionNode";
import ActionNode from "@/components/flow-nodes/ActionNode";
import EndNode from "@/components/flow-nodes/EndNode";
import NodeToolbox from "@/components/flow-nodes/NodeToolbox";

const nodeTypes = {
  start: StartNode,
  message: MessageNode,
  condition: ConditionNode,
  action: ActionNode,
  end: EndNode,
};

const initialNodes: Node[] = [
  {
    id: "1",
    type: "start",
    position: { x: 250, y: 50 },
    data: { label: "Início do Fluxo" },
  },
];

const FlowEditorContent = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [flowName, setFlowName] = useState("Novo Fluxo");
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const [reactFlowInstance, setReactFlowInstance] = useState<any>(null);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      const type = event.dataTransfer.getData("application/reactflow");
      if (!type || !reactFlowInstance) return;

      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      const newNode: Node = {
        id: `${type}-${Date.now()}`,
        type,
        position,
        data: {
          label: `${type.charAt(0).toUpperCase() + type.slice(1)} Node`,
        },
      };

      setNodes((nds) => nds.concat(newNode));
      toast.success(`Nó "${type}" adicionado`);
    },
    [reactFlowInstance, setNodes]
  );

  const handleSave = () => {
    const flow = {
      name: flowName,
      nodes,
      edges,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem(`flow-${Date.now()}`, JSON.stringify(flow));
    toast.success(`Fluxo "${flowName}" salvo com sucesso!`);
  };

  const handleLoad = () => {
    const keys = Object.keys(localStorage).filter((key) =>
      key.startsWith("flow-")
    );
    if (keys.length === 0) {
      toast.error("Nenhum fluxo salvo encontrado");
      return;
    }
    const lastKey = keys[keys.length - 1];
    const savedFlow = JSON.parse(localStorage.getItem(lastKey) || "{}");
    setNodes(savedFlow.nodes || []);
    setEdges(savedFlow.edges || []);
    setFlowName(savedFlow.name || "Fluxo Carregado");
    toast.success("Fluxo carregado com sucesso!");
  };

  const handleExport = () => {
    const flow = { name: flowName, nodes, edges };
    const dataStr = JSON.stringify(flow, null, 2);
    const dataUri =
      "data:application/json;charset=utf-8," + encodeURIComponent(dataStr);
    const exportFileDefaultName = `${flowName.replace(/\s+/g, "-")}.json`;

    const linkElement = document.createElement("a");
    linkElement.setAttribute("href", dataUri);
    linkElement.setAttribute("download", exportFileDefaultName);
    linkElement.click();
    toast.success("Fluxo exportado!");
  };

  const handleTest = () => {
    if (nodes.length === 0) {
      toast.error("Adicione nós ao fluxo antes de testar");
      return;
    }
    toast.info("Modo de simulação ativado. Verifique os logs no console.");
    console.log("Testando fluxo:", { nodes, edges });
  };

  const handleDeploy = () => {
    if (nodes.length === 0) {
      toast.error("Adicione nós ao fluxo antes de implantar");
      return;
    }
    toast.success(`Fluxo "${flowName}" implantado e ativo no WhatsApp!`);
  };

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Top Toolbar */}
      <div className="border-b border-border bg-card p-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 flex-1">
          <Input
            value={flowName}
            onChange={(e) => setFlowName(e.target.value)}
            className="max-w-xs bg-background"
            placeholder="Nome do Fluxo"
          />
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handleSave}>
            <Save className="h-4 w-4 mr-2" />
            Salvar
          </Button>
          <Button variant="outline" size="sm" onClick={handleLoad}>
            <FolderOpen className="h-4 w-4 mr-2" />
            Carregar
          </Button>
          <Button variant="outline" size="sm" onClick={handleExport}>
            <Download className="h-4 w-4 mr-2" />
            Exportar
          </Button>
          <Button variant="outline" size="sm" onClick={handleTest}>
            <Play className="h-4 w-4 mr-2" />
            Testar
          </Button>
          <Button
            className="bg-primary text-primary-foreground"
            size="sm"
            onClick={handleDeploy}
          >
            <Rocket className="h-4 w-4 mr-2" />
            Implantar
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar Toolbox */}
        <NodeToolbox />

        {/* React Flow Canvas */}
        <div className="flex-1 relative" ref={reactFlowWrapper}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onInit={setReactFlowInstance}
            onDrop={onDrop}
            onDragOver={onDragOver}
            nodeTypes={nodeTypes}
            fitView
            className="bg-background"
          >
            <Background variant={BackgroundVariant.Dots} gap={16} size={1} />
            <Controls />
            <Panel position="bottom-right" className="bg-card border border-border rounded-lg p-2 m-4">
              <div className="flex gap-2">
                <Button variant="outline" size="icon">
                  <Undo2 className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <Redo2 className="h-4 w-4" />
                </Button>
              </div>
            </Panel>
          </ReactFlow>
        </div>
      </div>

      {/* Tutorial Hint */}
      <Card className="absolute bottom-24 left-80 max-w-sm bg-card border-border p-4 m-4 shadow-lg">
        <p className="text-sm text-muted-foreground">
          💡 <strong>Dica:</strong> Arraste nós da barra lateral para o canvas e
          conecte-os para criar seu fluxo de automação.
        </p>
      </Card>
    </div>
  );
};

const FlowEditor = () => {
  return (
    <ReactFlowProvider>
      <FlowEditorContent />
    </ReactFlowProvider>
  );
};

export default FlowEditor;
