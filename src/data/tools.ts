import {
  Bot,
  Filter,
  Users,
  PhoneCall,
  MessageCircle,
  UserPlus,
  Send,
} from "lucide-react";
import { Tool } from "@/components/ToolCard";

export const tools: Tool[] = [
  {
    id: "ai-attendant",
    name: "Atendente IA ChatGPT",
    shortName: "Atendente IA",
    description: "Chatbot inteligente com IA para atendimento 24/7. Responde automaticamente usando ChatGPT.",
    icon: Bot,
    route: "/tools/ai-attendant",
    category: "automation",
    isPro: false,
    stats: {
      label: "Modelo",
      value: "GPT-4",
    },
  },
  {
    id: "number-validator",
    name: "Validador de Números",
    shortName: "Validador",
    description: "Filtre e valide números de WhatsApp em massa. Identifique números ativos, inativos e bloqueados.",
    icon: Filter,
    route: "/tools/validator",
    category: "validation",
    stats: {
      label: "Velocidade",
      value: "1000/min",
    },
  },
  {
    id: "group-extractor",
    name: "Extrator de Grupos",
    shortName: "Extrator Grupos",
    description: "Extraia todos os membros de grupos do WhatsApp rapidamente. Exporte para CSV ou contatos.",
    icon: Users,
    route: "/tools/group-extractor",
    category: "extraction",
    stats: {
      label: "Formatos",
      value: "CSV, VCF",
    },
  },
  {
    id: "contact-capture",
    name: "Captura de Contatos",
    shortName: "Captura Contatos",
    description: "Capture automaticamente números desconhecidos de chamadas e mensagens recebidas.",
    icon: PhoneCall,
    route: "/tools/contact-capture",
    category: "extraction",
    isNew: true,
    stats: {
      label: "Modo",
      value: "Real-time",
    },
  },
  {
    id: "chat-extractor",
    name: "Extrator de Chats",
    shortName: "Extrator Chats",
    description: "Extraia contatos de conversas do WhatsApp Web. Extensão Chrome para fácil uso.",
    icon: MessageCircle,
    route: "/tools/chat-extractor",
    category: "extraction",
    stats: {
      label: "Plataforma",
      value: "Chrome",
    },
  },
  {
    id: "unknown-scanner",
    name: "Scanner de Desconhecidos",
    shortName: "Scanner",
    description: "Interface visual para encontrar e exportar contatos não salvos com filtros avançados.",
    icon: UserPlus,
    route: "/tools/unknown-scanner",
    category: "extraction",
    isPro: true,
    stats: {
      label: "Filtros",
      value: "Avançados",
    },
  },
  {
    id: "mass-sender",
    name: "Disparador em Massa",
    shortName: "Disparador",
    description: "Envie mensagens e mídias em massa com controle de taxa anti-ban e personalização.",
    icon: Send,
    route: "/tools/mass-sender",
    category: "messaging",
    isPro: true,
    stats: {
      label: "Anti-ban",
      value: "Sim",
    },
  },
];

export const getToolById = (id: string): Tool | undefined => {
  return tools.find((tool) => tool.id === id);
};

export const getToolsByCategory = (category: Tool["category"]): Tool[] => {
  return tools.filter((tool) => tool.category === category);
};
