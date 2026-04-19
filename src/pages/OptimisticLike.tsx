import React, { useState } from 'react';
import styled from 'styled-components';

const Card = styled.div`
  max-width: 620px;
  padding: 24px;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background-color: ${({ theme }) => theme.colors.surface};
`;

const LikeButton = styled.button<{ $liked: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-top: 18px;
  padding: 12px 16px;
  border-radius: 10px;
  border: 1px solid ${({ theme, $liked }) => ($liked ? theme.colors.primary : theme.colors.border)};
  background-color: ${({ theme, $liked }) => ($liked ? `${theme.colors.primary}12` : theme.colors.surface)};
  color: ${({ theme, $liked }) => ($liked ? theme.colors.primary : theme.colors.text)};
  font-weight: 700;
`;

const Message = styled.div`
  margin-top: 14px;
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: 1.6;
`;

export const OptimisticLike: React.FC = () => {
  const [liked, setLiked] = useState(false);
  const [count, setCount] = useState(128);
  const [message, setMessage] = useState('버튼을 누르면 서버 응답 전에 UI를 먼저 바꿉니다.');

  const handleLike = async () => {
    const previousLiked = liked;
    const previousCount = count;

    setLiked(!previousLiked);
    setCount(previousLiked ? previousCount - 1 : previousCount + 1);
    setMessage('낙관적으로 먼저 반영했습니다. 서버 응답을 기다리는 중입니다.');

    try {
      await new Promise((resolve, reject) => {
        window.setTimeout(() => {
          Math.random() > 0.35 ? resolve(true) : reject(new Error('서버 저장에 실패했습니다.'));
        }, 700);
      });

      setMessage('서버 저장까지 완료되었습니다.');
    } catch {
      setLiked(previousLiked);
      setCount(previousCount);
      setMessage('실패해서 이전 상태로 롤백했습니다.');
    }
  };

  return (
    <Card>
      <h2>낙관적 좋아요</h2>
      <p>응답을 기다리지 않고 UI를 먼저 갱신해서 더 빠르게 느껴지게 만드는 패턴입니다.</p>

      <LikeButton $liked={liked} onClick={handleLike}>
        <i className={liked ? 'ri-thumb-up-fill' : 'ri-thumb-up-line'}></i>
        좋아요 {count}
      </LikeButton>

      <Message>{message}</Message>
    </Card>
  );
};

/*
[설명]
낙관적 업데이트(optimistic update)는 사용자가 버튼을 눌렀을 때 서버 응답을 기다리지 않고, 성공할 것이라고 가정한 뒤 화면을 먼저 바꾸는 패턴입니다. 좋아요, 북마크, 토글 스위치처럼 성공 확률이 높고 즉각 반응이 중요한 액션에서 매우 자주 사용됩니다. 사용자는 기다림 없이 결과를 본다고 느끼기 때문에 체감 성능이 크게 좋아집니다.

이 예제에서 중요한 부분은 변경 전 상태를 먼저 백업해 두는 것입니다. `previousLiked`, `previousCount`를 저장해 둔 뒤 UI를 먼저 바꾸고, 요청이 실패하면 그 값으로 롤백합니다. 실무에서는 낙관적 업데이트만 기억하고 롤백 경로를 빠뜨리면 데이터가 화면과 서버 사이에서 어긋나는 문제가 생깁니다.

낙관적 업데이트는 아무 곳에나 쓰면 안 됩니다. 되돌리는 비용이 낮고, 충돌 가능성이 낮고, 사용자가 즉각 반응을 기대하는 액션에 적합합니다. 반대로 금액 결제, 재고 차감, 권한 변경처럼 실패 리스크가 큰 액션은 신중하게 써야 합니다.

실무 체크포인트는 아래와 같습니다.
- 서버 실패 시 이전 상태로 복원하는 롤백 경로를 반드시 마련합니다.
- 동시에 여러 번 누르는 상황까지 고려해 버튼 잠금 또는 요청 중 표시를 붙이는 경우가 많습니다.
- React Query 같은 라이브러리를 사용하면 optimistic update와 rollback을 더 체계적으로 관리할 수 있습니다.
*/
