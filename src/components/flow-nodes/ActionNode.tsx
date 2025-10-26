import { memo } from "react";
import { Handle, Position, NodeProps } from "reactflow";
import { Zap } from "lucide-react";

const ActionNode = ({ data }: NodeProps) => {
  return (
    <div className="bg-card border-2 border-violet-500 rounded-lg shadow-lg p-4 min-w-[180px] max-w-[250px]">
      <Handle
        type="target"
        position={Position.Top}
        className="!bg-violet-500 !w-3 !h-3"
      />
      <div className="flex items-center gap-2 mb-2">
        <Zap className="h-5 w-5 text-violet-500" />
        <div className="font-semibold text-foreground text-sm">Ação</div>
      </div>
      <div className="text-xs text-muted-foreground line-clamp-2">
        {data.actionType ? data.actionType.replace("_", " ").toUpperCase() : "Clique 2x para configurar"}
      </div>
      <Handle
        type="source"
        position={Position.Bottom}
        className="!bg-violet-500 !w-3 !h-3"
      />
    </div>
  );
};

export default memo(ActionNode);
