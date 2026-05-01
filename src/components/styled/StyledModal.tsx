// src/components/styled/StyledModal.tsx
import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import styled, { keyframes } from 'styled-components';
import { variables } from '../../styles/variables';
import { flexCenter } from '../../styles/mixins';

interface StyledModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  width?: string;
}

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const slideUp = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const Overlay = styled.div`
  ${flexCenter}
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: ${variables.zIndex.modalBackdrop};
  animation: ${fadeIn} 0.2s ease-out;
`;

const ModalContainer = styled.div<{ width?: string }>`
  background: ${({ theme }) => theme.colors.surface};
  width: ${({ width }) => width || '400px'};
  max-width: 90vw;
  border-radius: ${({ theme }) => theme.radius.card};
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  z-index: ${variables.zIndex.modal};
  animation: ${slideUp} 0.3s ease-out;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${variables.spacing.lg};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};

  h2 {
    margin: 0;
    font-size: 1.2rem;
    color: ${({ theme }) => theme.colors.text};
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.textMuted};
  cursor: pointer;
  padding: 4px;
  line-height: 1;
  transition: color ${variables.transition.fast};

  &:hover {
    color: ${({ theme }) => theme.colors.text};
  }
`;

const ModalBody = styled.div`
  padding: ${variables.spacing.lg};
  max-height: 60vh;
  overflow-y: auto;
  color: ${({ theme }) => theme.colors.text};
`;

const ModalFooter = styled.div`
  padding: ${variables.spacing.lg};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  justify-content: flex-end;
  gap: ${variables.spacing.sm};
  background-color: ${({ theme }) => theme.colors.background};
`;

export const StyledModal: React.FC<StyledModalProps> = ({ isOpen, onClose, title, children, footer, width }) => {
  // ESC 키로 닫기
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // 스크롤 방지
  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  if (!isOpen) return null;

  return createPortal(
    <Overlay onClick={onClose}>
      <ModalContainer width={width} onClick={(e) => e.stopPropagation()}>
        {title && (
          <ModalHeader>
            <h2>{title}</h2>
            <CloseButton onClick={onClose}>&times;</CloseButton>
          </ModalHeader>
        )}
        <ModalBody>{children}</ModalBody>
        {footer && <ModalFooter>{footer}</ModalFooter>}
      </ModalContainer>
    </Overlay>,
    document.body
  );
};
