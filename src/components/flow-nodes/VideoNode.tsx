import { memo } from "react";
import { Handle, Position, NodeProps } from "reactflow";
import { Video } from "lucide-react";

const VideoNode = ({ data }: NodeProps) => {
  return (
    <div className="bg-card border-2 border-orange-500 rounded-lg shadow-lg p-4 min-w-[180px]">
      <Handle
        type="target"
        position={Position.Top}
        className="!bg-orange-500 !w-3 !h-3"
      />
      <div className="flex items-center gap-2 mb-2">
        <Video className="h-5 w-5 text-orange-500" />
        <div className="font-semibold text-foreground text-sm">Vídeo</div>
      </div>
      <div className="text-xs text-muted-foreground">
        {data.videoUrl ? "Vídeo configurado" : "Configure o vídeo"}
      </div>
      <Handle
        type="source"
        position={Position.Bottom}
        className="!bg-orange-500 !w-3 !h-3"
      />
    </div>
  );
};

export default memo(VideoNode);
