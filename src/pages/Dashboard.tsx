import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { EXAMPLE_CATEGORIES, EXAMPLE_LIST } from '../constants/exampleCatalog';

const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const PageTitle = styled.h1`
  font-size: 1.8rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 24px;
`;

const CategoryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 20px;
`;

const CategoryCard = styled.div`
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.card};
  padding: 24px;

  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 12px;
  }

  .title {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 1rem;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.text};
  }

  .count {
    color: ${({ theme }) => theme.colors.primary};
    font-size: 1.5rem;
    font-weight: 800;
  }

  p {
    margin: 0 0 18px;
    color: ${({ theme }) => theme.colors.textMuted};
    line-height: 1.6;
  }
`;

const ExampleLinkList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ExampleShortcut = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 12px 14px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  transition: transform 0.2s ease, background-color 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    background-color: ${({ theme }) => theme.colors.primary}10;
  }

  .left {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .summary {
    color: ${({ theme }) => theme.colors.textMuted};
    font-size: 0.82rem;
  }
`;

const StatCard = styled.div`
  background-color: ${({ theme }) => theme.colors.surface};
  /* border: 1px solid ${({ theme }) => theme.colors.border}; */
  border-radius: ${({ theme }) => theme.radius.card};
  padding: 24px;
  display: flex;
  align-items: center;
  gap: 20px;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.03); /* 은은한 섀도우 */
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0px 8px 24px rgba(0, 0, 0, 0.06);
  }

  .icon-wrapper {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background-color: ${({ theme }) => theme.colors.primary}15; /* 투명도가 있는 배경 */
    color: ${({ theme }) => theme.colors.primary};
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.8rem;
  }

  .content {
    display: flex;
    flex-direction: column;
    gap: 6px;

    .title {
      font-size: 0.95rem;
      font-weight: 500;
      color: ${({ theme }) => theme.colors.textMuted};
    }
    .value {
      font-size: 2rem;
      font-weight: 800;
      color: ${({ theme }) => theme.colors.text};
    }
  }
`;

// 성능을 고려해 requestAnimationFrame을 사용한 부드러운 숫자 카운팅 훅
const useCountUp = (target: number, duration: number = 1000) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTimestamp: number | null = null;
    let animationFrame: number;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      
      const easeOutProgress = progress * (2 - progress);
      setCount(Math.floor(easeOutProgress * target));

      if (progress < 1) {
        animationFrame = window.requestAnimationFrame(step);
      }
    };

    animationFrame = window.requestAnimationFrame(step);

    return () => window.cancelAnimationFrame(animationFrame);
  }, [target, duration]);

  return count;
};

// 애니메이션이 적용된 리팩토링 버전 카드
const AnimatedStatCard: React.FC<{ title: string; target: number; icon: string; prefix?: string; suffix?: string }> = ({ title, target, icon, prefix = '', suffix = '' }) => {
  const count = useCountUp(target);
  
  return (
    <StatCard>
      <div className="icon-wrapper">
        <i className={icon}></i>
      </div>
      <div className="content">
        <span className="title">{title}</span>
        <span className="value">{prefix}{count.toLocaleString()}{suffix}</span>
      </div>
    </StatCard>
  );
};

export const Dashboard: React.FC = () => {
  const practicalExamples = EXAMPLE_LIST.filter((item) => item.path !== '/').length;

  return (
    <DashboardContainer>
      <PageTitle>대시보드</PageTitle>

      <StatsGrid>
        <AnimatedStatCard icon="ri-layout-grid-line" title="전체 실무 예제" target={practicalExamples} />
        <AnimatedStatCard icon="ri-folder-chart-line" title="카테고리 수" target={EXAMPLE_CATEGORIES.length - 1} />
        <AnimatedStatCard icon="ri-code-box-line" title="상세 코드 설명 제공" target={practicalExamples} suffix="개" />
        <AnimatedStatCard icon="ri-rocket-line" title="추천 시작 순서" target={3} suffix="단계" />
      </StatsGrid>

      <CategoryGrid>
        {EXAMPLE_CATEGORIES.filter((category) => category.key !== 'overview').map((category) => (
          <CategoryCard key={category.key}>
            <div className="header">
              <div className="title">
                <i className={category.icon}></i>
                <span>{category.title}</span>
              </div>
              <span className="count">{category.items.length}</span>
            </div>
            <p>{category.description}</p>
            <ExampleLinkList>
              {category.items.slice(0, 3).map((item) => (
                <ExampleShortcut key={item.path} to={item.path}>
                  <div className="left">
                    <i className={item.icon}></i>
                    <div>
                      <div>{item.label}</div>
                      <div className="summary">{item.summary}</div>
                    </div>
                  </div>
                  <i className="ri-arrow-right-line"></i>
                </ExampleShortcut>
              ))}
            </ExampleLinkList>
          </CategoryCard>
        ))}
      </CategoryGrid>
    </DashboardContainer>
  );
};
