import { ReactNode } from 'react';
import { Card as AntCard } from 'antd';

interface CardProps {
  title?: string;
  extra?: ReactNode;
  children: ReactNode;
  loading?: boolean;
  className?: string;
  variant?: "borderless" | "outlined" | undefined;
}

export function Card({
  title,
  extra,
  children,
  loading = false,
  className = '',
  variant = undefined,
}: CardProps) {
  return (
    <AntCard
      title={title}
      extra={extra}
      loading={loading}
      variant={variant}
      className={`shadow-sm hover:shadow-md transition-shadow ${className}`}
    >
      {children}
    </AntCard>
  );
}

export default Card;
