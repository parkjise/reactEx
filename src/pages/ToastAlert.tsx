import React, { useState } from 'react';
import styled from 'styled-components';

interface Toast {
  id: number;
  message: string;
}

const ToastContainer = styled.div`
  position: fixed;
  bottom: 30px;
  right: 30px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  z-index: 1000;
`;

const ToastItem = styled.div`
  background-color: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};
  padding: 15px 20px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  border-left: 5px solid ${({ theme }) => theme.colors.success};
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-width: 300px;
  animation: slideUp 0.3s ease;

  button {
    color: ${({ theme }) => theme.colors.textMuted};
    padding: 5px;
  }

  @keyframes slideUp {
    from { transform: translateY(100%); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }
`;

const ShowButton = styled.button`
  padding: 10px 20px;
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  border-radius: 4px;
`;

let toastId = 0;

export const ToastAlert: React.FC = () => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = (message: string) => {
    const newToast = { id: toastId++, message };
    setToasts((prev) => [...prev, newToast]);

    // 3초 뒤 자동 삭제
    setTimeout(() => {
      removeToast(newToast.id);
    }, 3000);
  };

  const removeToast = (id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <div>
      <h2>팝업/토스트 알림 (Toast Alert)</h2>
      <p>우측 하단에 잠깐 떴다가 사라지는 임시 알림창 UI 패턴입니다.</p>

      <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
        <ShowButton onClick={() => showToast('저장되었습니다.')}>
          성공 메시지 띄우기
        </ShowButton>
        <ShowButton onClick={() => showToast('장바구니에 담았습니다.')}>
          안내 메시지 띄우기
        </ShowButton>
      </div>

      {/* 상태 배열(toasts) 기반으로 렌더링. position: fixed 이므로 우측 하단에 고정됨 */}
      {/* 실제 서비스에서는 Portal을 이용하여 보통의 DOM계층에서 완전히 분리하는 것이 좋습니다. */}
      <ToastContainer>
        {toasts.map((toast) => (
          <ToastItem key={toast.id}>
            <span><i className="ri-check-line" style={{ color: '#4caf50', marginRight: '10px' }}/> {toast.message}</span>
            <button onClick={() => removeToast(toast.id)}>
              <i className="ri-close-line" />
            </button>
          </ToastItem>
        ))}
      </ToastContainer>
    </div>
  );
};

/*
[설명]
여러 개의 알림 팝업(Toast)을 배열 상태로 관리하고, `setTimeout`으로 자동 소멸시키는 패턴입니다.

실무 패턴:
- 토스트는 여러 개가 겹칠 수 있으므로 요소(태그)가 아니라 **객체배열**로 관리합니다.
- 토스트가 생성되는 함수 안에서 동시에 `setTimeout` 타이머를 걸어 해당 객체의 ID를 배열에서 필터시켜 삭제(`removeToast`)하도록 클로저를 활용합니다.
*/
