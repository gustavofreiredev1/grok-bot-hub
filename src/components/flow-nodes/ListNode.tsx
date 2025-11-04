import { memo } from "react";
import { Handle, Position, NodeProps } from "reactflow";
import { List } from "lucide-react";

const ListNode = ({ data }: NodeProps) => {
  return (
    <div className="bg-card border-2 border-amber-500 rounded-lg shadow-lg p-4 min-w-[180px]">
      <Handle
        type="target"
        position={Position.Top}
        className="!bg-amber-500 !w-3 !h-3"
      />
      <div className="flex items-center gap-2 mb-2">
        <List className="h-5 w-5 text-amber-500" />
        <div className="font-semibold text-foreground text-sm">Lista</div>
      </div>
      <div className="text-xs text-muted-foreground">
        {data.listItems?.length > 0 
          ? `${data.listItems.length} item(ns)` 
          : "Configure a lista"}
      </div>
      <Handle
        type="source"
        position={Position.Bottom}
        className="!bg-amber-500 !w-3 !h-3"
      />
    </div>
  );
};

export default memo(ListNode);
