import { useState, useEffect, createContext, useContext, ReactNode } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

export interface WhatsAppInstance {
  id: string;
  name: string;
  phoneNumber: string;
  apiKey: string;
  apiUrl: string;
  isConnected: boolean;
  lastSync?: string;
}

interface WhatsAppConfigContextType {
  instances: WhatsAppInstance[];
  activeInstance: WhatsAppInstance | null;
  isLoading: boolean;
  addInstance: (instance: Omit<WhatsAppInstance, "id" | "isConnected">) => Promise<void>;
  updateInstance: (id: string, data: Partial<WhatsAppInstance>) => Promise<void>;
  removeInstance: (id: string) => Promise<void>;
  setActiveInstance: (id: string) => void;
  testConnection: (id: string) => Promise<boolean>;
  refreshInstances: () => Promise<void>;
}

const WhatsAppConfigContext = createContext<WhatsAppConfigContextType | undefined>(undefined);

export const useWhatsAppConfig = () => {
  const context = useContext(WhatsAppConfigContext);
  if (!context) {
    throw new Error("useWhatsAppConfig must be used within a WhatsAppConfigProvider");
  }
  return context;
};

const STORAGE_KEY = "whatsapp_instances";
const ACTIVE_INSTANCE_KEY = "whatsapp_active_instance";

interface WhatsAppConfigProviderProps {
  children: ReactNode;
}

export const WhatsAppConfigProvider = ({ children }: WhatsAppConfigProviderProps) => {
  const { user } = useAuth();
  const [instances, setInstances] = useState<WhatsAppInstance[]>([]);
  const [activeInstance, setActiveInstanceState] = useState<WhatsAppInstance | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user) {
      const storedInstances = localStorage.getItem(`${STORAGE_KEY}_${user.id}`);
      const storedActiveId = localStorage.getItem(`${ACTIVE_INSTANCE_KEY}_${user.id}`);
      
      if (storedInstances) {
        const parsed = JSON.parse(storedInstances) as WhatsAppInstance[];
        setInstances(parsed);
        
        if (storedActiveId && parsed.length > 0) {
          const active = parsed.find((i) => i.id === storedActiveId);
          setActiveInstanceState(active || parsed[0]);
        } else if (parsed.length > 0) {
          setActiveInstanceState(parsed[0]);
        }
      }
      setIsLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (user && instances.length > 0) {
      localStorage.setItem(`${STORAGE_KEY}_${user.id}`, JSON.stringify(instances));
    }
  }, [instances, user]);

  useEffect(() => {
    if (user && activeInstance) {
      localStorage.setItem(`${ACTIVE_INSTANCE_KEY}_${user.id}`, activeInstance.id);
    }
  }, [activeInstance, user]);

  const addInstance = async (instanceData: Omit<WhatsAppInstance, "id" | "isConnected">) => {
    if (instances.length >= 3) {
      toast.error("Limite máximo de 3 instâncias atingido");
      return;
    }

    const newInstance: WhatsAppInstance = {
      ...instanceData,
      id: crypto.randomUUID(),
      isConnected: false,
    };

    setInstances((prev) => [...prev, newInstance]);
    
    if (!activeInstance) {
      setActiveInstanceState(newInstance);
    }
    
    toast.success("Instância adicionada com sucesso!");
  };

  const updateInstance = async (id: string, data: Partial<WhatsAppInstance>) => {
    setInstances((prev) =>
      prev.map((instance) =>
        instance.id === id ? { ...instance, ...data } : instance
      )
    );
    
    if (activeInstance?.id === id) {
      setActiveInstanceState((prev) => prev ? { ...prev, ...data } : null);
    }
    
    toast.success("Instância atualizada!");
  };

  const removeInstance = async (id: string) => {
    if (instances.length === 1) {
      toast.error("É necessário ter pelo menos 1 instância");
      return;
    }

    setInstances((prev) => prev.filter((instance) => instance.id !== id));
    
    if (activeInstance?.id === id) {
      const remaining = instances.filter((i) => i.id !== id);
      setActiveInstanceState(remaining[0] || null);
    }
    
    toast.success("Instância removida!");
  };

  const setActiveInstance = (id: string) => {
    const instance = instances.find((i) => i.id === id);
    if (instance) {
      setActiveInstanceState(instance);
    }
  };

  const testConnection = async (id: string): Promise<boolean> => {
    const instance = instances.find((i) => i.id === id);
    if (!instance) return false;

    try {
      toast.info("Testando conexão...");
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      const isConnected = Math.random() > 0.2;
      
      await updateInstance(id, { 
        isConnected, 
        lastSync: isConnected ? new Date().toISOString() : undefined 
      });
      
      if (isConnected) {
        toast.success("Conexão estabelecida com sucesso!");
      } else {
        toast.error("Falha na conexão. Verifique suas credenciais.");
      }
      
      return isConnected;
    } catch {
      toast.error("Erro ao testar conexão");
      return false;
    }
  };

  const refreshInstances = async () => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    setIsLoading(false);
  };

  const value: WhatsAppConfigContextType = {
    instances,
    activeInstance,
    isLoading,
    addInstance,
    updateInstance,
    removeInstance,
    setActiveInstance,
    testConnection,
    refreshInstances,
  };

  return (
    <WhatsAppConfigContext.Provider value={value}>
      {children}
    </WhatsAppConfigContext.Provider>
  );
};

export { WhatsAppConfigContext };
