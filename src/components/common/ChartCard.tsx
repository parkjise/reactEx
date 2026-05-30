import React, { useState, useMemo } from 'react';
import styled from 'styled-components';
import ReactECharts from 'echarts-for-react';
import { Card } from './Card';
import { Button } from './Button';
import { CodeViewer } from '../CodeViewer';

interface ChartCardProps {
  title: string;
  description: string;
  useCase: string;
  option: any;
  codeSnippet: string;
  height?: string;
  onEvents?: Record<string, Function>;
}

const ChartWrapper = styled.div<{ height: string }>`
  height: ${({ height }) => height};
  width: 100%;
  margin: 20px 0;
`;

const UseCaseBox = styled.div`
  background-color: ${({ theme }) => theme.colors.background};
  padding: 12px 16px;
  border-radius: 6px;
  border-left: 4px solid ${({ theme }) => theme.colors.primary};
  margin-bottom: 16px;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.textMuted};
`;

const HeaderRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 8px;
`;

export const ChartCard: React.FC<ChartCardProps> = ({
  title,
  description,
  useCase,
  option,
  codeSnippet,
  height = '350px',
  onEvents
}) => {
  const [showCode, setShowCode] = useState(false);

  const formattedCodeSnippet = useMemo(() => {
    let code = codeSnippet.trim();
    
    // 이미 주석으로 시작하는 수동 설정이 아니라면 파일명 헤더 추가
    if (!code.startsWith('// 1. echartsOptions.ts') && !code.startsWith('//')) {
      code = `// 1. echartsOptions.ts\n${code}`;
    }

    // React 컴포넌트 마크업이 포함되어 있지 않다면 자동으로 추가
    if (!code.includes('<ReactECharts')) {
      code += `\n\n// 2. React Component\n<ReactECharts \n  option={option} \n  style={{ height: '100%', width: '100%' }}\n  opts={{ renderer: 'svg' }}\n/>`;
    }

    return code;
  }, [codeSnippet]);

  return (
    <Card>
      <HeaderRow>
        <h3 style={{ margin: 0, color: 'var(--text-color)' }}>{title}</h3>
        <Button 
          variant="outline" 
          size="small" 
          onClick={() => setShowCode(!showCode)}
          icon={showCode ? 'ri-eye-off-line' : 'ri-code-s-slash-line'}
        >
          {showCode ? '코드 숨기기' : '옵션 코드 보기'}
        </Button>
      </HeaderRow>
      
      <p style={{ color: '#64748b', marginBottom: '16px', fontSize: '0.95rem' }}>
        {description}
      </p>

      <UseCaseBox>
        <strong>💡 실무 활용:</strong> {useCase}
      </UseCaseBox>

      <ChartWrapper height={height}>
        <ReactECharts 
          option={option} 
          style={{ height: '100%', width: '100%' }}
          opts={{ renderer: 'svg' }}
          notMerge={true}
          lazyUpdate={true}
          onEvents={onEvents}
        />
      </ChartWrapper>

      {showCode && (
        <div style={{ marginTop: '20px', animation: 'fadeIn 0.3s ease' }}>
          <CodeViewer 
            rawCode={formattedCodeSnippet} 
            filename="ECharts Implementation" 
          />
        </div>
      )}
    </Card>
  );
};
