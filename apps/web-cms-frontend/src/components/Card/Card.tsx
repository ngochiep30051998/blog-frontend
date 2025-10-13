import { ReactNode } from 'react';
import { Card as AntCard } from 'antd';

interface CardProps {
  title?: string;
  extra?: ReactNode;
  children: ReactNode;
  loading?: boolean;
  className?: string;
  bordered?: boolean;
}

export function Card({
  title,
  extra,
  children,
  loading = false,
  className = '',
  bordered = true,
}: CardProps) {
  return (
    <AntCard
      title={title}
      extra={extra}
      loading={loading}
      bordered={bordered}
      className={`shadow-sm hover:shadow-md transition-shadow ${className}`}
    >
      {children}
    </AntCard>
  );
}

export default Card;
