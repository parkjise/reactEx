// src/components/styled/StyledCheckbox.tsx
import React, { forwardRef } from 'react';
import styled from 'styled-components';
import { flexCenter } from '../../styles/mixins';
import { variables } from '../../styles/variables';

interface StyledCheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const CheckboxLabel = styled.label<{ disabled?: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  opacity: ${({ disabled }) => (disabled ? 0.6 : 1)};
  font-size: 0.95rem;
  color: ${({ theme }) => theme.colors.text};
`;

const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
  border: 0;
  clip: rect(0 0 0 0);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`;

const StyledCheckboxUI = styled.div<{ checked: boolean; disabled?: boolean }>`
  ${flexCenter}
  width: 20px;
  height: 20px;
  background: ${({ checked, theme }) => (checked ? theme.colors.primary : theme.colors.surface)};
  border: 2px solid ${({ checked, theme }) => (checked ? theme.colors.primary : theme.colors.border)};
  border-radius: 4px;
  transition: all ${variables.transition.fast};

  /* 아이콘 v 마크 (svg나 가상선택자로 표현) */
  &::after {
    content: '';
    display: ${({ checked }) => (checked ? 'block' : 'none')};
    width: 5px;
    height: 10px;
    border: solid white;
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
    margin-bottom: 2px;
  }

  ${HiddenCheckbox}:focus + & {
    box-shadow: 0 0 0 3px rgba(49, 106, 255, 0.2);
  }
`;

export const StyledCheckbox = forwardRef<HTMLInputElement, StyledCheckboxProps>(
  ({ label, className, checked, disabled, ...props }, ref) => {
    return (
      <CheckboxLabel className={className} disabled={disabled}>
        <HiddenCheckbox ref={ref} checked={checked} disabled={disabled} {...props} />
        <StyledCheckboxUI checked={!!checked} disabled={disabled} />
        {label && <span>{label}</span>}
      </CheckboxLabel>
    );
  }
);

StyledCheckbox.displayName = 'StyledCheckbox';
