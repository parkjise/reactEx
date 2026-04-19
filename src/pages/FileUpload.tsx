import React, { useState, useRef } from 'react';
import styled from 'styled-components';

const UploadArea = styled.div<{ $isDragActive: boolean }>`
  border: 2px dashed ${({ theme, $isDragActive }) => ($isDragActive ? theme.colors.primary : theme.colors.border)};
  background-color: ${({ theme, $isDragActive }) => ($isDragActive ? theme.colors.primary + '11' : theme.colors.surface)};
  padding: 50px 20px;
  text-align: center;
  border-radius: 8px;
  margin-top: 20px;
  cursor: pointer;
  transition: all 0.2s ease;

  i {
    font-size: 3rem;
    color: ${({ theme, $isDragActive }) => ($isDragActive ? theme.colors.primary : theme.colors.textMuted)};
  }

  p {
    margin-top: 10px;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.text};
  }
`;

const FileList = styled.ul`
  margin-top: 20px;
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;

  li {
    padding: 12px 20px;
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
    display: flex;
    justify-content: space-between;
    align-items: center;

    &:last-child {
      border-bottom: none;
    }

    button {
      color: ${({ theme }) => theme.colors.error};
      padding: 5px;
    }
  }
`;

export const FileUpload: React.FC = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [isDragActive, setIsDragActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragActive(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragActive(false);
    
    // 가져온 파일을 상태 배열에 추가
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFiles = Array.from(e.dataTransfer.files);
      setFiles((prev) => [...prev, ...droppedFiles]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFiles = Array.from(e.target.files);
      setFiles((prev) => [...prev, ...selectedFiles]);
    }
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div>
      <h2>드래그 앤 드롭 파일 업로드</h2>
      <p>HTML5 Drag and Drop API를 활용한 파일 첨부 컴포넌트 패턴입니다.</p>

      {/* 보이지 않는 실제 input 태그 */}
      <input 
        type="file" 
        multiple 
        ref={inputRef} 
        style={{ display: 'none' }} 
        onChange={handleFileChange}
      />

      <UploadArea 
        $isDragActive={isDragActive}
        onDragEnter={handleDragEnter}
        onDragOver={(e) => e.preventDefault()} // 필수: dragover 콜백에서 기본동작 막기
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()} // 클릭 시 숨겨진 input 실행
      >
        <i className="ri-upload-cloud-2-line" />
        <p>파일을 이 곳으로 드래그 하거나, 클릭하여 선택하세요.</p>
      </UploadArea>

      {files.length > 0 && (
        <FileList>
          {files.map((file, idx) => (
            <li key={idx}>
              <span>{file.name} ({(file.size / 1024).toFixed(1)} KB)</span>
              <button onClick={() => removeFile(idx)}>
                <i className="ri-close-circle-line"></i>
              </button>
            </li>
          ))}
        </FileList>
      )}
    </div>
  );
};

/*
[설명]
네이티브 드래그앤드롭 이벤트 리스너를 활용하는 파일 첨부 예제입니다.

실무 패턴:
- `input type="file"`의 네이티브 디자인이 못생겼기 때문에 `display: none` 으로 숨겨둡니다.
- `useRef`를 이용해 버튼이나 영역을 클릭했을 때 몰래 숨겨둔 input의 `.click()` 메서드를 강제로 호출합니다.
- `onDrop` 이벤트를 받을 때는 브라우저 기본 동작(파일 열기)을 막기 위해 `e.preventDefault()` 적용이 필수입니다.
*/
