import React from 'react';
import styled from 'styled-components';

export interface Step {
  title: string;
  description?: string;
}

interface StepIndicatorProps {
  steps: Step[];
  currentStep: number; // 0-indexed
  className?: string;
}

const StepsContainer = styled.div`
  display: flex;
  align-items: flex-start;
  width: 100%;
`;

const StepItem = styled.div<{ $isActive: boolean; $isCompleted: boolean }>`
  flex: 1;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  z-index: 1;

  /* 연결선 (마지막 요소 제외) */
  &:not(:last-child)::after {
    content: '';
    position: absolute;
    top: 16px;
    left: 50%;
    width: 100%;
    height: 2px;
    background-color: ${({ theme, $isCompleted }) => 
      $isCompleted ? theme.colors.primary : theme.colors.border};
    z-index: -1;
    transition: background-color 0.3s ease;
  }
`;

const StepCircle = styled.div<{ $isActive: boolean; $isCompleted: boolean }>`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 0.9rem;
  margin-bottom: 8px;
  background-color: ${({ theme, $isActive, $isCompleted }) => {
    if ($isActive || $isCompleted) return theme.colors.primary;
    return theme.colors.surface;
  }};
  color: ${({ theme, $isActive, $isCompleted }) => {
    if ($isActive || $isCompleted) return '#fff';
    return theme.colors.textMuted;
  }};
  border: 2px solid ${({ theme, $isActive, $isCompleted }) => {
    if ($isActive || $isCompleted) return theme.colors.primary;
    return theme.colors.border;
  }};
  transition: all 0.3s ease;
  
  i {
    font-size: 1.1rem;
  }
`;

const StepTitle = styled.div<{ $isActive: boolean; $isCompleted: boolean }>`
  font-size: 0.9rem;
  font-weight: ${({ $isActive }) => ($isActive ? '700' : '500')};
  color: ${({ theme, $isActive, $isCompleted }) => {
    if ($isActive || $isCompleted) return theme.colors.text;
    return theme.colors.textMuted;
  }};
`;

const StepDescription = styled.div`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.textMuted};
  margin-top: 4px;
`;

export const StepIndicator: React.FC<StepIndicatorProps> = ({ steps, currentStep, className }) => {
  return (
    <StepsContainer className={className}>
      {steps.map((step, index) => {
        const isActive = index === currentStep;
        const isCompleted = index < currentStep;

        return (
          <StepItem key={index} $isActive={isActive} $isCompleted={isCompleted}>
            <StepCircle $isActive={isActive} $isCompleted={isCompleted}>
              {isCompleted ? <i className="ri-check-line" /> : index + 1}
            </StepCircle>
            <StepTitle $isActive={isActive} $isCompleted={isCompleted}>
              {step.title}
            </StepTitle>
            {step.description && (
              <StepDescription>{step.description}</StepDescription>
            )}
          </StepItem>
        );
      })}
    </StepsContainer>
  );
};
