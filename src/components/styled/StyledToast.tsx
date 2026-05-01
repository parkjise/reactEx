// src/components/styled/StyledToast.tsx
import React, { useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { variables } from '../../styles/variables';

export type ToastType = 'success' | 'error' | 'info';

interface StyledToastProps {
  message: string;
  type?: ToastType;
  isVisible: boolean;
  onClose: () => void;
  duration?: number;
}

const slideIn = keyframes`
  from { transform: translateX(100%); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
`;

const ToastContainer = styled.div<{ type: ToastType }>`
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: ${variables.zIndex.toast};
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 20px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  animation: ${slideIn} 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  
  background-color: ${({ theme, type }) => {
    switch (type) {
      case 'success': return theme.colors.success;
      case 'error': return theme.colors.error;
      default: return theme.colors.primary;
    }
  }};
  color: white;
  font-weight: 500;
`;

const CloseBtn = styled.button`
  background: none;
  border: none;
  color: white;
  opacity: 0.7;
  cursor: pointer;
  padding: 0;
  margin-left: 8px;
  
  &:hover {
    opacity: 1;
  }
`;

export const StyledToast: React.FC<StyledToastProps> = ({ 
  message, 
  type = 'info', 
  isVisible, 
  onClose,
  duration = 3000
}) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  if (!isVisible) return null;

  return (
    <ToastContainer type={type}>
      <span>{message}</span>
      <CloseBtn onClick={onClose}>&times;</CloseBtn>
    </ToastContainer>
  );
};
