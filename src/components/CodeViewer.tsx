import React, { useState } from 'react';
import styled from 'styled-components';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

const ViewerContainer = styled.div`
  margin-top: 60px;
  border-top: 2px dashed ${({ theme }) => theme.colors.border};
  padding-top: 40px;
  padding-bottom: 40px;
`;

const SectionTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 15px;
  color: ${({ theme }) => theme.colors.text};
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 8px;

  i {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const ExplanationBox = styled.div`
  background-color: ${({ theme }) => theme.colors.primary}10;
  border-left: 4px solid ${({ theme }) => theme.colors.primary};
  padding: 20px;
  border-radius: 4px;
  margin-bottom: 30px;
  color: ${({ theme }) => theme.colors.text};
  font-size: 0.95rem;
`;

const ExplanationParagraph = styled.p`
  margin: 0 0 14px;
  line-height: 1.8;

  &:last-child {
    margin-bottom: 0;
  }
`;

const ExplanationList = styled.ul`
  margin: 0 0 14px;
  padding-left: 20px;
  line-height: 1.8;

  &:last-child {
    margin-bottom: 0;
  }
`;

const CodeHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #1e1e1e;
  border-bottom: 1px solid #333;
  color: #ccc;
  padding: 12px 20px;
  border-radius: 10px 10px 0 0;
  font-family: monospace;
  font-size: 0.9rem;
`;

const CopyButton = styled.button`
  background-color: transparent;
  color: #fff;
  border: 1px solid #666;
  padding: 6px 12px;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.85rem;

  &:hover {
    background-color: #444;
  }
`;

const HighlighterWrapper = styled.div`
  pre {
    margin: 0 !important;
    border-radius: 0 0 10px 10px !important;
    font-size: 0.9rem !important;

    &::-webkit-scrollbar {
      height: 8px;
    }
    &::-webkit-scrollbar-thumb {
      background-color: #666;
      border-radius: 4px;
    }
  }
`;

interface CodeViewerProps {
  rawCode: string;
  filename: string;
}

const parseExplanationBlocks = (rawExplanation: string) =>
  rawExplanation
    .split('\n\n')
    .map((block) => block.trim())
    .filter(Boolean)
    .map((block) => {
      const lines = block.split('\n').map((line) => line.trim()).filter(Boolean);
      const isList = lines.every((line) => line.startsWith('- '));

      return {
        type: isList ? 'list' : 'paragraph',
        lines: isList ? lines.map((line) => line.slice(2)) : [block],
      };
    });

export const CodeViewer: React.FC<CodeViewerProps> = ({ rawCode, filename }) => {
  const [copied, setCopied] = useState(false);

  const explanationMatch = rawCode.match(/\/\*\s*\[설명\]([\s\S]*?)\*\//);
  const explanation = explanationMatch ? explanationMatch[1].trim() : '이 코드에 대한 설명이 아직 작성되지 않았습니다.';
  const explanationBlocks = parseExplanationBlocks(explanation);

  const handleCopy = () => {
    navigator.clipboard.writeText(rawCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <ViewerContainer>
      <SectionTitle>
        <i className="ri-lightbulb-flash-fill"></i> 아주 상세한 코드 설명
      </SectionTitle>
      <ExplanationBox>
        {explanationBlocks.map((block, index) =>
          block.type === 'list' ? (
            <ExplanationList key={`${filename}-list-${index}`}>
              {block.lines.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ExplanationList>
          ) : (
            <ExplanationParagraph key={`${filename}-paragraph-${index}`}>
              {block.lines[0]}
            </ExplanationParagraph>
          ),
        )}
      </ExplanationBox>

      <SectionTitle style={{ marginTop: '40px' }}>
        <i className="ri-code-s-slash-line"></i> 컴포넌트 소스 코드
      </SectionTitle>
      <CodeHeader>
        <span>{filename}</span>
        <CopyButton onClick={handleCopy}>
          <i className={copied ? "ri-check-line" : "ri-file-copy-line"}></i>
          {copied ? 'Copied!' : 'Copy Code'}
        </CopyButton>
      </CodeHeader>
      
      <HighlighterWrapper>
        <SyntaxHighlighter 
          language="tsx" 
          style={vscDarkPlus}
          showLineNumbers={true}
        >
          {rawCode}
        </SyntaxHighlighter>
      </HighlighterWrapper>
    </ViewerContainer>
  );
};
