import { memo } from "react";
import { Handle, Position, NodeProps } from "reactflow";
import { PlayCircle } from "lucide-react";

const StartNode = ({ data }: NodeProps) => {
  return (
    <div className="bg-card border-2 border-green-500 rounded-lg shadow-lg p-4 min-w-[180px]">
      <div className="flex items-center gap-2 mb-2">
        <PlayCircle className="h-5 w-5 text-green-500" />
        <div className="font-semibold text-foreground text-sm">Início</div>
      </div>
      <div className="text-xs text-muted-foreground">{data.label}</div>
      <Handle
        type="source"
        position={Position.Bottom}
        className="!bg-green-500 !w-3 !h-3"
      />
    </div>
  );
};

export default memo(StartNode);
