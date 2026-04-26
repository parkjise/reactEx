import React from 'react';
import styled, { css } from 'styled-components';

export type BadgeStatus = 'success' | 'error' | 'warning' | 'info' | 'default';

interface BadgeProps {
  status?: BadgeStatus;
  children: React.ReactNode;
  dot?: boolean;
}

const getBadgeColors = (status: BadgeStatus) => {
  switch (status) {
    case 'success':
      return css`
        background-color: ${({ theme }) => theme.colors.success}15;
        color: ${({ theme }) => theme.colors.success};
        border: 1px solid ${({ theme }) => theme.colors.success}30;
      `;
    case 'error':
      return css`
        background-color: ${({ theme }) => theme.colors.error}15;
        color: ${({ theme }) => theme.colors.error};
        border: 1px solid ${({ theme }) => theme.colors.error}30;
      `;
    case 'warning':
      return css`
        background-color: #F59E0B15;
        color: #F59E0B;
        border: 1px solid #F59E0B30;
      `;
    case 'info':
      return css`
        background-color: ${({ theme }) => theme.colors.primary}15;
        color: ${({ theme }) => theme.colors.primary};
        border: 1px solid ${({ theme }) => theme.colors.primary}30;
      `;
    case 'default':
    default:
      return css`
        background-color: ${({ theme }) => theme.colors.background};
        color: ${({ theme }) => theme.colors.textMuted};
        border: 1px solid ${({ theme }) => theme.colors.border};
      `;
  }
};

const BadgeWrapper = styled.span<{ $status: BadgeStatus }>`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 2px 8px;
  font-size: 0.75rem;
  font-weight: 700;
  border-radius: 12px;
  white-space: nowrap;
  ${({ $status }) => getBadgeColors($status)}
`;

const Dot = styled.span<{ $status: BadgeStatus }>`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: currentColor; /* 상위 요소의 텍스트 색상을 따라감 */
`;

export const Badge: React.FC<BadgeProps> = ({ status = 'default', dot = false, children }) => {
  return (
    <BadgeWrapper $status={status}>
      {dot && <Dot $status={status} />}
      {children}
    </BadgeWrapper>
  );
};
