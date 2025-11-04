import { memo } from "react";
import { Handle, Position, NodeProps } from "reactflow";
import { MessageSquareDashed } from "lucide-react";

const InputNode = ({ data }: NodeProps) => {
  return (
    <div className="bg-card border-2 border-teal-500 rounded-lg shadow-lg p-4 min-w-[180px]">
      <Handle
        type="target"
        position={Position.Top}
        className="!bg-teal-500 !w-3 !h-3"
      />
      <div className="flex items-center gap-2 mb-2">
        <MessageSquareDashed className="h-5 w-5 text-teal-500" />
        <div className="font-semibold text-foreground text-sm">Entrada de Usuário</div>
      </div>
      <div className="text-xs text-muted-foreground">
        {data.variable ? `Salvar em: ${data.variable}` : "Configure a entrada"}
      </div>
      <Handle
        type="source"
        position={Position.Bottom}
        className="!bg-teal-500 !w-3 !h-3"
      />
    </div>
  );
};

export default memo(InputNode);
