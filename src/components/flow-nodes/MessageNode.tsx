import { memo } from "react";
import { Handle, Position, NodeProps } from "reactflow";
import { MessageSquare } from "lucide-react";

const MessageNode = ({ data }: NodeProps) => {
  return (
    <div className="bg-card border-2 border-blue-500 rounded-lg shadow-lg p-4 min-w-[180px] max-w-[250px]">
      <Handle
        type="target"
        position={Position.Top}
        className="!bg-blue-500 !w-3 !h-3"
      />
      <div className="flex items-center gap-2 mb-2">
        <MessageSquare className="h-5 w-5 text-blue-500" />
        <div className="font-semibold text-foreground text-sm">Mensagem</div>
      </div>
      <div className="text-xs text-muted-foreground line-clamp-3">
        {data.message ? data.message : "Clique 2x para configurar"}
      </div>
      <Handle
        type="source"
        position={Position.Bottom}
        className="!bg-blue-500 !w-3 !h-3"
      />
    </div>
  );
};

export default memo(MessageNode);
