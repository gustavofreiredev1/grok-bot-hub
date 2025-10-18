import { memo } from "react";
import { Handle, Position, NodeProps } from "reactflow";
import { StopCircle } from "lucide-react";

const EndNode = ({ data }: NodeProps) => {
  return (
    <div className="bg-card border-2 border-red-500 rounded-lg shadow-lg p-4 min-w-[180px]">
      <Handle
        type="target"
        position={Position.Top}
        className="!bg-red-500 !w-3 !h-3"
      />
      <div className="flex items-center gap-2 mb-2">
        <StopCircle className="h-5 w-5 text-red-500" />
        <div className="font-semibold text-foreground text-sm">Fim</div>
      </div>
      <div className="text-xs text-muted-foreground">{data.label}</div>
    </div>
  );
};

export default memo(EndNode);
