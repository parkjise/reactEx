import React from 'react';
import styled from 'styled-components';

interface CardProps {
  title?: React.ReactNode;
  extra?: React.ReactNode;
  children: React.ReactNode;
  padding?: string;
  className?: string;
}

const CardWrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.card};
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
`;

const CardHeader = styled.div`
  padding: 16px 20px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CardTitle = styled.div`
  font-size: 1rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
`;

const CardExtra = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const CardBody = styled.div<{ $padding: string }>`
  padding: ${({ $padding }) => $padding};
  flex: 1;

  @media (max-width: 768px) {
    padding: ${({ $padding }) => $padding === '20px' ? '12px' : $padding};
  }
`;

export const Card: React.FC<CardProps> = ({ title, extra, children, padding = '20px', className }) => {
  return (
    <CardWrapper className={className}>
      {(title || extra) && (
        <CardHeader>
          {title && <CardTitle>{title}</CardTitle>}
          {extra && <CardExtra>{extra}</CardExtra>}
        </CardHeader>
      )}
      <CardBody $padding={padding}>{children}</CardBody>
    </CardWrapper>
  );
};
