import { Empty as AntEmpty, Button } from 'antd';

interface EmptyStateProps {
  title?: string;
  description?: string;
  actionText?: string;
  onAction?: () => void;
}

export function EmptyState({
  title = 'Không có dữ liệu',
  description = 'Chưa có dữ liệu để hiển thị',
  actionText,
  onAction,
}: EmptyStateProps) {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <AntEmpty
        description={
          <div>
            <p className="text-gray-900 font-medium mb-1">{title}</p>
            <p className="text-gray-500 text-sm">{description}</p>
          </div>
        }
      >
        {actionText && onAction && (
          <Button type="primary" onClick={onAction}>
            {actionText}
          </Button>
        )}
      </AntEmpty>
    </div>
  );
}

export default EmptyState;
