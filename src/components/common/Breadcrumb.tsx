import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

export interface BreadcrumbItem {
  label: string;
  path?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

const BreadcrumbContainer = styled.nav`
  display: flex;
  align-items: center;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.textMuted};
`;

const ItemWrapper = styled.div`
  display: flex;
  align-items: center;

  a {
    color: ${({ theme }) => theme.colors.textMuted};
    transition: color 0.2s;
    
    &:hover {
      color: ${({ theme }) => theme.colors.primary};
      text-decoration: underline;
    }
  }

  span.active {
    color: ${({ theme }) => theme.colors.text};
    font-weight: 600;
  }
`;

const Separator = styled.i`
  margin: 0 8px;
  font-size: 1.1rem;
  color: ${({ theme }) => theme.colors.border};
`;

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ items, className }) => {
  return (
    <BreadcrumbContainer className={className}>
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        
        return (
          <ItemWrapper key={index}>
            {item.path && !isLast ? (
              <Link to={item.path}>{item.label}</Link>
            ) : (
              <span className={isLast ? 'active' : ''}>{item.label}</span>
            )}
            
            {!isLast && <Separator className="ri-arrow-right-s-line" />}
          </ItemWrapper>
        );
      })}
    </BreadcrumbContainer>
  );
};
