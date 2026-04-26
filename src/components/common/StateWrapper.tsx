import React from 'react';
import styled, { keyframes } from 'styled-components';

interface StateWrapperProps {
  isLoading?: boolean;
  isEmpty?: boolean;
  isError?: boolean;
  emptyMessage?: string;
  errorMessage?: string;
  onRetry?: () => void;
  children: React.ReactNode;
  className?: string;
}

const pulse = keyframes`
  0% { opacity: 1; }
  50% { opacity: 0.5; }
  100% { opacity: 1; }
`;

const StateContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  text-align: center;
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px dashed ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.card};
  min-height: 200px;
`;

const IconWrapper = styled.div<{ $color: string }>`
  font-size: 2.5rem;
  color: ${({ $color }) => $color};
  margin-bottom: 16px;
`;

const Title = styled.div`
  font-size: 1.1rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 8px;
`;

const Description = styled.div`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.textMuted};
`;

const RetryButton = styled.button`
  margin-top: 20px;
  padding: 8px 16px;
  background-color: ${({ theme }) => theme.colors.primary};
  color: #fff;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryHover};
  }
`;

// 스켈레톤 로딩 UI (단순 막대기 형태)
const SkeletonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
`;

const SkeletonBar = styled.div<{ $width?: string; $height?: string }>`
  height: ${({ $height }) => $height || '20px'};
  width: ${({ $width }) => $width || '100%'};
  background-color: ${({ theme }) => theme.colors.border};
  border-radius: 4px;
  animation: ${pulse} 1.5s ease-in-out infinite;
`;

export const StateWrapper: React.FC<StateWrapperProps> = ({
  isLoading,
  isEmpty,
  isError,
  emptyMessage = '데이터가 없습니다.',
  errorMessage = '오류가 발생했습니다.',
  onRetry,
  children,
  className
}) => {
  if (isLoading) {
    return (
      <StateContainer className={className} style={{ border: 'none', background: 'transparent' }}>
        <SkeletonContainer>
          <SkeletonBar $height="30px" $width="40%" />
          <SkeletonBar />
          <SkeletonBar />
          <SkeletonBar $width="80%" />
        </SkeletonContainer>
      </StateContainer>
    );
  }

  if (isError) {
    return (
      <StateContainer className={className}>
        <IconWrapper $color="#EE5D50">
          <i className="ri-error-warning-line" />
        </IconWrapper>
        <Title>문제가 발생했습니다</Title>
        <Description>{errorMessage}</Description>
        {onRetry && (
          <RetryButton onClick={onRetry}>
            <i className="ri-refresh-line" /> 다시 시도
          </RetryButton>
        )}
      </StateContainer>
    );
  }

  if (isEmpty) {
    return (
      <StateContainer className={className}>
        <IconWrapper $color="#A3AED0">
          <i className="ri-inbox-archive-line" />
        </IconWrapper>
        <Title>내역이 없습니다</Title>
        <Description>{emptyMessage}</Description>
      </StateContainer>
    );
  }

  return <>{children}</>;
};
