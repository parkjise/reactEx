// src/components/styled/StyledTable.tsx
import React from 'react';
import styled from 'styled-components';
import { variables } from '../../styles/variables';
import { textEllipsis } from '../../styles/mixins';

interface StyledTableProps {
  columns: { key: string; header: string; width?: string; align?: 'left' | 'center' | 'right' }[];
  data: Record<string, any>[];
}

const TableContainer = styled.div`
  width: 100%;
  overflow-x: auto;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.card};
  background: ${({ theme }) => theme.colors.surface};
`;

const TableElement = styled.table`
  width: 100%;
  border-collapse: collapse;
  min-width: 600px;
`;

const Thead = styled.thead`
  background-color: ${({ theme }) => theme.colors.background};
  border-bottom: 2px solid ${({ theme }) => theme.colors.border};
`;

const Th = styled.th<{ width?: string; align?: string }>`
  padding: ${variables.spacing.md};
  text-align: ${({ align }) => align || 'left'};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 0.85rem;
  width: ${({ width }) => width || 'auto'};
`;

const Tr = styled.tr`
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  transition: background-color ${variables.transition.fast};

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background-color: rgba(0, 0, 0, 0.02);
  }
`;

const Td = styled.td<{ align?: string }>`
  padding: ${variables.spacing.md};
  text-align: ${({ align }) => align || 'left'};
  color: ${({ theme }) => theme.colors.text};
  font-size: 0.95rem;
  
  /* 말줄임 처리 적용 가능 */
  ${textEllipsis}
  max-width: 200px; /* textEllipsis 작동을 위해 max-width 필요 */
`;

export const StyledTable: React.FC<StyledTableProps> = ({ columns, data }) => {
  return (
    <TableContainer>
      <TableElement>
        <Thead>
          <Tr>
            {columns.map((col) => (
              <Th key={col.key} width={col.width} align={col.align}>
                {col.header}
              </Th>
            ))}
          </Tr>
        </Thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <Tr key={rowIndex}>
              {columns.map((col) => (
                <Td key={col.key} align={col.align}>
                  {row[col.key]}
                </Td>
              ))}
            </Tr>
          ))}
        </tbody>
      </TableElement>
    </TableContainer>
  );
};
