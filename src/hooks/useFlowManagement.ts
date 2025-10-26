import { useState } from "react";
import { Node, Edge } from "reactflow";
import { toast } from "sonner";

export const useFlowManagement = () => {
  const [flows, setFlows] = useState<any[]>([]);
  const [currentFlow, setCurrentFlow] = useState<any>(null);

  // Salvar fluxo no localStorage (pode ser expandido para Supabase)
  const saveFlow = (flowName: string, nodes: Node[], edges: Edge[]) => {
    const flow = {
      id: currentFlow?.id || `flow-${Date.now()}`,
      name: flowName,
      nodes,
      edges,
      createdAt: currentFlow?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const savedFlows = JSON.parse(localStorage.getItem("flows") || "[]");
    const existingIndex = savedFlows.findIndex((f: any) => f.id === flow.id);

    if (existingIndex >= 0) {
      savedFlows[existingIndex] = flow;
    } else {
      savedFlows.push(flow);
    }

    localStorage.setItem("flows", JSON.stringify(savedFlows));
    setFlows(savedFlows);
    setCurrentFlow(flow);
    toast.success(`Fluxo "${flowName}" salvo com sucesso!`);
    
    return flow;
  };

  // Carregar todos os fluxos
  const loadFlows = () => {
    const savedFlows = JSON.parse(localStorage.getItem("flows") || "[]");
    setFlows(savedFlows);
    return savedFlows;
  };

  // Carregar um fluxo específico
  const loadFlow = (flowId: string) => {
    const savedFlows = JSON.parse(localStorage.getItem("flows") || "[]");
    const flow = savedFlows.find((f: any) => f.id === flowId);
    
    if (flow) {
      setCurrentFlow(flow);
      toast.success(`Fluxo "${flow.name}" carregado!`);
      return flow;
    }
    
    toast.error("Fluxo não encontrado");
    return null;
  };

  // Deletar fluxo
  const deleteFlow = (flowId: string) => {
    const savedFlows = JSON.parse(localStorage.getItem("flows") || "[]");
    const filteredFlows = savedFlows.filter((f: any) => f.id !== flowId);
    localStorage.setItem("flows", JSON.stringify(filteredFlows));
    setFlows(filteredFlows);
    toast.success("Fluxo deletado!");
  };

  // Exportar fluxo como JSON
  const exportFlow = (flowName: string, nodes: Node[], edges: Edge[]) => {
    const flow = { name: flowName, nodes, edges };
    const dataStr = JSON.stringify(flow, null, 2);
    const dataUri = "data:application/json;charset=utf-8," + encodeURIComponent(dataStr);
    const exportFileDefaultName = `${flowName.replace(/\s+/g, "-")}.json`;

    const linkElement = document.createElement("a");
    linkElement.setAttribute("href", dataUri);
    linkElement.setAttribute("download", exportFileDefaultName);
    linkElement.click();
    toast.success("Fluxo exportado!");
  };

  // Importar fluxo de arquivo JSON
  const importFlow = (file: File): Promise<any> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const flow = JSON.parse(e.target?.result as string);
          const importedFlow = {
            id: `flow-${Date.now()}`,
            ...flow,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          };
          
          const savedFlows = JSON.parse(localStorage.getItem("flows") || "[]");
          savedFlows.push(importedFlow);
          localStorage.setItem("flows", JSON.stringify(savedFlows));
          
          setFlows(savedFlows);
          setCurrentFlow(importedFlow);
          toast.success(`Fluxo "${flow.name}" importado!`);
          resolve(importedFlow);
        } catch (error) {
          toast.error("Erro ao importar fluxo");
          reject(error);
        }
      };
      reader.readAsText(file);
    });
  };

  // Duplicar fluxo
  const duplicateFlow = (flowId: string) => {
    const savedFlows = JSON.parse(localStorage.getItem("flows") || "[]");
    const flow = savedFlows.find((f: any) => f.id === flowId);
    
    if (flow) {
      const duplicatedFlow = {
        ...flow,
        id: `flow-${Date.now()}`,
        name: `${flow.name} (Cópia)`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      
      savedFlows.push(duplicatedFlow);
      localStorage.setItem("flows", JSON.stringify(savedFlows));
      setFlows(savedFlows);
      toast.success("Fluxo duplicado!");
      return duplicatedFlow;
    }
    
    return null;
  };

  return {
    flows,
    currentFlow,
    saveFlow,
    loadFlows,
    loadFlow,
    deleteFlow,
    exportFlow,
    importFlow,
    duplicateFlow,
  };
};
