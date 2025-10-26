import { memo } from "react";
import { Handle, Position, NodeProps } from "reactflow";
import { GitBranch } from "lucide-react";

const ConditionNode = ({ data }: NodeProps) => {
  return (
    <div className="bg-card border-2 border-yellow-500 rounded-lg shadow-lg p-4 min-w-[180px] max-w-[250px]">
      <Handle
        type="target"
        position={Position.Top}
        className="!bg-yellow-500 !w-3 !h-3"
      />
      <div className="flex items-center gap-2 mb-2">
        <GitBranch className="h-5 w-5 text-yellow-500" />
        <div className="font-semibold text-foreground text-sm">Condição</div>
      </div>
      <div className="text-xs text-muted-foreground mb-3 line-clamp-2">
        {data.variable ? `${data.variable} ${data.operator || "=="} ${data.value || ""}` : "Clique 2x para configurar"}
      </div>
      <div className="flex justify-between">
        <div className="text-xs text-green-400 font-medium">Sim</div>
        <div className="text-xs text-red-400 font-medium">Não</div>
      </div>
      <Handle
        type="source"
        position={Position.Bottom}
        id="yes"
        className="!bg-green-500 !w-3 !h-3 !left-[25%]"
      />
      <Handle
        type="source"
        position={Position.Bottom}
        id="no"
        className="!bg-red-500 !w-3 !h-3 !left-[75%]"
      />
    </div>
  );
};

export default memo(ConditionNode);
