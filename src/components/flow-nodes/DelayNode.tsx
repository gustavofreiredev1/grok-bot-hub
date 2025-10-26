import { memo } from "react";
import { Handle, Position, NodeProps } from "reactflow";
import { Clock } from "lucide-react";

const DelayNode = ({ data }: NodeProps) => {
  return (
    <div className="bg-card border-2 border-cyan-500 rounded-lg shadow-lg p-4 min-w-[180px]">
      <Handle
        type="target"
        position={Position.Top}
        className="!bg-cyan-500 !w-3 !h-3"
      />
      <div className="flex items-center gap-2 mb-2">
        <Clock className="h-5 w-5 text-cyan-500" />
        <div className="font-semibold text-foreground text-sm">Delay</div>
      </div>
      <div className="text-xs text-muted-foreground">
        {data.delay ? `Aguardar ${data.delay}s` : "Configure o delay"}
      </div>
      <Handle
        type="source"
        position={Position.Bottom}
        className="!bg-cyan-500 !w-3 !h-3"
      />
    </div>
  );
};

export default memo(DelayNode);
