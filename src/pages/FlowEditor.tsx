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
  NodeMouseHandler,
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
  Upload,
  Trash2,
  Copy,
  List,
} from "lucide-react";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import StartNode from "@/components/flow-nodes/StartNode";
import MessageNode from "@/components/flow-nodes/MessageNode";
import AudioNode from "@/components/flow-nodes/AudioNode";
import ImageNode from "@/components/flow-nodes/ImageNode";
import VideoNode from "@/components/flow-nodes/VideoNode";
import DelayNode from "@/components/flow-nodes/DelayNode";
import ConditionNode from "@/components/flow-nodes/ConditionNode";
import ActionNode from "@/components/flow-nodes/ActionNode";
import WebhookNode from "@/components/flow-nodes/WebhookNode";
import EndNode from "@/components/flow-nodes/EndNode";
import NodeToolbox from "@/components/flow-nodes/NodeToolbox";
import { NodeConfigDialog } from "@/components/flow-nodes/NodeConfigDialog";
import { useFlowManagement } from "@/hooks/useFlowManagement";

const nodeTypes = {
  start: StartNode,
  message: MessageNode,
  audio: AudioNode,
  image: ImageNode,
  video: VideoNode,
  delay: DelayNode,
  condition: ConditionNode,
  action: ActionNode,
  webhook: WebhookNode,
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
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [isConfigDialogOpen, setIsConfigDialogOpen] = useState(false);
  const [isFlowListOpen, setIsFlowListOpen] = useState(false);
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const [reactFlowInstance, setReactFlowInstance] = useState<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const { 
    flows, 
    currentFlow,
    saveFlow, 
    loadFlows, 
    loadFlow, 
    deleteFlow, 
    exportFlow, 
    importFlow,
    duplicateFlow 
  } = useFlowManagement();

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

  const onNodeDoubleClick: NodeMouseHandler = useCallback((event, node) => {
    if (node.type !== "start" && node.type !== "end") {
      setSelectedNode(node);
      setIsConfigDialogOpen(true);
    }
  }, []);

  const handleNodeConfigSave = (data: any) => {
    if (!selectedNode) return;
    
    setNodes((nds) =>
      nds.map((node) =>
        node.id === selectedNode.id
          ? { ...node, data: { ...node.data, ...data } }
          : node
      )
    );
  };

  const handleSave = () => {
    saveFlow(flowName, nodes, edges);
  };

  const handleLoadFlow = (flowId: string) => {
    const flow = loadFlow(flowId);
    if (flow) {
      setNodes(flow.nodes || []);
      setEdges(flow.edges || []);
      setFlowName(flow.name || "Fluxo Carregado");
      setIsFlowListOpen(false);
    }
  };

  const handleExport = () => {
    exportFlow(flowName, nodes, edges);
  };

  const handleImport = () => {
    fileInputRef.current?.click();
  };

  const handleFileImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const flow = await importFlow(file);
      setNodes(flow.nodes || []);
      setEdges(flow.edges || []);
      setFlowName(flow.name || "Fluxo Importado");
    }
  };

  const handleDeleteNode = () => {
    if (!selectedNode) return;
    setNodes((nds) => nds.filter((node) => node.id !== selectedNode.id));
    setEdges((eds) => eds.filter((edge) => 
      edge.source !== selectedNode.id && edge.target !== selectedNode.id
    ));
    toast.success("Nó deletado!");
  };

  const handleClearCanvas = () => {
    setNodes(initialNodes);
    setEdges([]);
    toast.success("Canvas limpo!");
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
          <Dialog open={isFlowListOpen} onOpenChange={setIsFlowListOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" onClick={() => loadFlows()}>
                <List className="h-4 w-4 mr-2" />
                Meus Fluxos
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[70vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Meus Fluxos Salvos</DialogTitle>
              </DialogHeader>
              <div className="space-y-2">
                {flows.length === 0 ? (
                  <p className="text-muted-foreground text-center py-8">
                    Nenhum fluxo salvo ainda
                  </p>
                ) : (
                  flows.map((flow) => (
                    <Card key={flow.id} className="p-4 hover:bg-accent/50 transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h4 className="font-semibold text-foreground">{flow.name}</h4>
                          <p className="text-xs text-muted-foreground">
                            Atualizado: {new Date(flow.updatedAt).toLocaleString("pt-BR")}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleLoadFlow(flow.id)}
                          >
                            <FolderOpen className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => {
                              const dup = duplicateFlow(flow.id);
                              if (dup) loadFlows();
                            }}
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => {
                              deleteFlow(flow.id);
                              loadFlows();
                            }}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))
                )}
              </div>
            </DialogContent>
          </Dialog>
          <Button variant="outline" size="sm" onClick={handleImport}>
            <Upload className="h-4 w-4 mr-2" />
            Importar
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            accept=".json"
            className="hidden"
            onChange={handleFileImport}
          />
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
            onNodeDoubleClick={onNodeDoubleClick}
            nodeTypes={nodeTypes}
            fitView
            className="bg-background"
          >
            <Background variant={BackgroundVariant.Dots} gap={16} size={1} />
            <Controls />
            <Panel position="bottom-right" className="bg-card border border-border rounded-lg p-2 m-4">
              <div className="flex gap-2">
                {selectedNode && (
                  <Button 
                    variant="destructive" 
                    size="icon"
                    onClick={handleDeleteNode}
                    title="Deletar nó selecionado"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={handleClearCanvas}
                  title="Limpar canvas"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </Panel>
          </ReactFlow>
        </div>
      </div>

      {/* Node Configuration Dialog */}
      <NodeConfigDialog
        isOpen={isConfigDialogOpen}
        onClose={() => setIsConfigDialogOpen(false)}
        nodeType={selectedNode?.type || ""}
        nodeData={selectedNode?.data || {}}
        onSave={handleNodeConfigSave}
      />

      {/* Tutorial Hint */}
      <Card className="absolute bottom-24 left-80 max-w-sm bg-card border-border p-4 m-4 shadow-lg">
        <p className="text-sm text-muted-foreground">
          💡 <strong>Dica:</strong> Arraste nós da barra lateral para o canvas, 
          conecte-os e <strong>clique duas vezes</strong> em um nó para configurá-lo.
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
