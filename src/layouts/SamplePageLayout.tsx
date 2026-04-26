import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const HeaderSection = styled.section`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.card};
  padding: 24px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
`;

const Title = styled.h1`
  font-size: 1.8rem;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  gap: 8px;

  i {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const Description = styled.p`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: 1.5;
  margin-bottom: 20px;
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const InfoBox = styled.div<{ $type?: 'highlight' }>`
  background: ${({ theme, $type }) => ($type === 'highlight' ? `${theme.colors.primary}10` : theme.colors.background)};
  border: 1px solid ${({ theme, $type }) => ($type === 'highlight' ? `${theme.colors.primary}30` : theme.colors.border)};
  border-radius: 8px;
  padding: 16px;

  h3 {
    font-size: 0.95rem;
    font-weight: 700;
    color: ${({ theme, $type }) => ($type === 'highlight' ? theme.colors.primary : theme.colors.text)};
    margin-bottom: 12px;
    display: flex;
    align-items: center;
    gap: 6px;
  }

  ul {
    padding-left: 20px;
    margin: 0;
    li {
      font-size: 0.9rem;
      color: ${({ theme }) => theme.colors.text};
      margin-bottom: 6px;
      line-height: 1.4;
    }
  }

  p {
    font-size: 0.9rem;
    color: ${({ theme }) => theme.colors.text};
    line-height: 1.5;
    margin: 0;
  }
`;

const ContentSection = styled.section`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.card};
  padding: 24px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
`;

interface SamplePageLayoutProps {
  title: string;
  icon?: string;
  description: string;
  learningPoints: string[];
  whyImportant: string;
  children: React.ReactNode;
}

export const SamplePageLayout: React.FC<SamplePageLayoutProps> = ({
  title,
  icon = 'ri-lightbulb-flash-line',
  description,
  learningPoints,
  whyImportant,
  children,
}) => {
  return (
    <Container>
      <HeaderSection>
        <Title>
          <i className={icon}></i>
          {title}
        </Title>
        <Description>{description}</Description>

        <InfoGrid>
          <InfoBox>
            <h3><i className="ri-check-double-line"></i> 핵심 학습 포인트</h3>
            <ul>
              {learningPoints.map((point, idx) => (
                <li key={idx}>{point}</li>
              ))}
            </ul>
          </InfoBox>
          <InfoBox $type="highlight">
            <h3><i className="ri-briefcase-4-line"></i> 실무 도입 이유</h3>
            <p>{whyImportant}</p>
          </InfoBox>
        </InfoGrid>
      </HeaderSection>

      <ContentSection>
        {children}
      </ContentSection>
    </Container>
  );
};
