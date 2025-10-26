import { memo } from "react";
import { Handle, Position, NodeProps } from "reactflow";
import { Image } from "lucide-react";

const ImageNode = ({ data }: NodeProps) => {
  return (
    <div className="bg-card border-2 border-pink-500 rounded-lg shadow-lg p-4 min-w-[180px]">
      <Handle
        type="target"
        position={Position.Top}
        className="!bg-pink-500 !w-3 !h-3"
      />
      <div className="flex items-center gap-2 mb-2">
        <Image className="h-5 w-5 text-pink-500" />
        <div className="font-semibold text-foreground text-sm">Imagem</div>
      </div>
      <div className="text-xs text-muted-foreground">
        {data.imageUrl ? "Imagem configurada" : "Configure a imagem"}
      </div>
      <Handle
        type="source"
        position={Position.Bottom}
        className="!bg-pink-500 !w-3 !h-3"
      />
    </div>
  );
};

export default memo(ImageNode);
