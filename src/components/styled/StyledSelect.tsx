// src/components/styled/StyledSelect.tsx
import React, { forwardRef } from 'react';
import styled from 'styled-components';
import { variables } from '../../styles/variables';

interface StyledSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  fullWidth?: boolean;
  options: { label: string; value: string | number }[];
}

const SelectWrapper = styled.div<{ fullWidth?: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 6px;
  width: ${({ fullWidth }) => (fullWidth ? '100%' : 'auto')};
  margin-bottom: ${variables.spacing.md};
`;

const Label = styled.label`
  font-size: 0.9rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
`;

const SelectContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;

  /* 커스텀 화살표 아이콘 */
  &::after {
    content: '\\EA4S'; /* RemixIcon arrow-down-s-line 대략적 표현 또는 CSS 화살표 */
    font-family: 'remixicon';
    position: absolute;
    right: 12px;
    pointer-events: none;
    color: ${({ theme }) => theme.colors.textMuted};
  }
`;

const BaseSelect = styled.select<{ hasError?: boolean }>`
  width: 100%;
  padding: 10px 36px 10px 12px; /* 오른쪽 패딩을 늘려 화살표 공간 확보 */
  border: 1px solid ${({ theme, hasError }) => 
    hasError ? theme.colors.error : theme.colors.border};
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};
  font-size: 0.95rem;
  outline: none;
  appearance: none; /* 기본 브라우저 화살표 숨김 */
  cursor: pointer;
  transition: all ${variables.transition.fast};

  &:focus {
    border-color: ${({ theme, hasError }) => 
      hasError ? theme.colors.error : theme.colors.primary};
    box-shadow: 0 0 0 3px ${({ hasError }) => 
      hasError ? 'rgba(238, 93, 80, 0.15)' : 'rgba(49, 106, 255, 0.15)'};
  }

  &:disabled {
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.textMuted};
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.span`
  color: ${({ theme }) => theme.colors.error};
  font-size: 0.8rem;
`;

export const StyledSelect = forwardRef<HTMLSelectElement, StyledSelectProps>(
  ({ label, error, fullWidth, options, className, ...props }, ref) => {
    return (
      <SelectWrapper fullWidth={fullWidth} className={className}>
        {label && <Label>{label}</Label>}
        <SelectContainer>
          <BaseSelect ref={ref} hasError={!!error} {...props}>
            <option value="" disabled hidden>선택해주세요</option>
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </BaseSelect>
        </SelectContainer>
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </SelectWrapper>
    );
  }
);

StyledSelect.displayName = 'StyledSelect';
