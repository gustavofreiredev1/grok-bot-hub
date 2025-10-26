import { memo } from "react";
import { Handle, Position, NodeProps } from "reactflow";
import { Webhook } from "lucide-react";

const WebhookNode = ({ data }: NodeProps) => {
  return (
    <div className="bg-card border-2 border-indigo-500 rounded-lg shadow-lg p-4 min-w-[180px]">
      <Handle
        type="target"
        position={Position.Top}
        className="!bg-indigo-500 !w-3 !h-3"
      />
      <div className="flex items-center gap-2 mb-2">
        <Webhook className="h-5 w-5 text-indigo-500" />
        <div className="font-semibold text-foreground text-sm">Webhook</div>
      </div>
      <div className="text-xs text-muted-foreground">
        {data.url ? "URL configurada" : "Configure o webhook"}
      </div>
      <Handle
        type="source"
        position={Position.Bottom}
        className="!bg-indigo-500 !w-3 !h-3"
      />
    </div>
  );
};

export default memo(WebhookNode);
