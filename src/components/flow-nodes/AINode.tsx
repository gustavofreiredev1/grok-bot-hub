import { memo } from "react";
import { Handle, Position, NodeProps } from "reactflow";
import { Brain } from "lucide-react";

const AINode = ({ data }: NodeProps) => {
  return (
    <div className="bg-card border-2 border-fuchsia-500 rounded-lg shadow-lg p-4 min-w-[180px]">
      <Handle
        type="target"
        position={Position.Top}
        className="!bg-fuchsia-500 !w-3 !h-3"
      />
      <div className="flex items-center gap-2 mb-2">
        <Brain className="h-5 w-5 text-fuchsia-500" />
        <div className="font-semibold text-foreground text-sm">IA</div>
      </div>
      <div className="text-xs text-muted-foreground">
        {data.aiModel ? data.aiModel : "Configure a IA"}
      </div>
      <Handle
        type="source"
        position={Position.Bottom}
        className="!bg-fuchsia-500 !w-3 !h-3"
      />
    </div>
  );
};

export default memo(AINode);
