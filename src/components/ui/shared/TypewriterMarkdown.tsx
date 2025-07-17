import MarkdownPreview from '@uiw/react-markdown-preview';
import { useTheme } from 'next-themes';
import { FC, useEffect, useRef, useState } from 'react';

interface TypewriterMarkdownProps {
  streamingText: string;
  typingSpeed?: number;
}

const TypewriterMarkdown: FC<TypewriterMarkdownProps> = ({
  streamingText,
  typingSpeed = 30
}) => {
  const { theme } = useTheme();
  const [typedText, setTypedText] = useState('');
  const fullTextRef = useRef('');
  const indexRef = useRef(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastScrollPosition = useRef(0);
  const isUserScrolling = useRef(false);

  const handleScrollToBottom = () => {
    document
      .getElementById('message-end-mlpiu')
      ?.scrollIntoView({ behavior: 'smooth' });
  };

  const typeNextChar = () => {
    const fullText = fullTextRef.current;
    const currentIndex = indexRef.current;

    if (currentIndex < fullText.length) {
      setTypedText(fullText.slice(0, currentIndex + 1));
      indexRef.current += 1;
      if (!isUserScrolling.current) {
        handleScrollToBottom();
      }
      timeoutRef.current = setTimeout(typeNextChar, typingSpeed);
    } else {
      timeoutRef.current = null;
    }
  };

  useEffect(() => {
    const scrollArea = document.querySelector(
      'div[data-radix-scroll-area-viewport]'
    );
    if (!scrollArea) return;
    const handleScroll = () => {
      const scrollTop = scrollArea.scrollTop;
      const isScrolledUp = scrollTop < lastScrollPosition.current;
      if (isScrolledUp) {
        isUserScrolling.current = true;
      }
      lastScrollPosition.current = scrollTop;
    };

    scrollArea.addEventListener('scroll', handleScroll);

    return () => {
      scrollArea.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    // Nếu không có thay đổi, không làm gì
    if (streamingText === fullTextRef.current) return;

    // Hủy timeout cũ nếu đang chạy
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Nếu gõ tiếp phần mới
    if (typedText && streamingText.startsWith(typedText)) {
      fullTextRef.current = streamingText;
      indexRef.current = typedText.length;
    } else {
      // Gõ lại từ đầu
      fullTextRef.current = streamingText;
      indexRef.current = 0;
      setTypedText('');
    }

    timeoutRef.current = setTimeout(typeNextChar, typingSpeed);

    // Cleanup khi component unmount
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [streamingText, typingSpeed]);

  return (
    <MarkdownPreview
      source={typedText}
      style={{
        maxWidth: 'calc(100% - 2rem)',
        backgroundColor: 'transparent'
      }}
      wrapperElement={{
        'data-color-mode': theme === 'dark' ? 'dark' : 'light'
      }}
      className="text-gray-800 dark:text-gray-200"
    />
  );
};

export default TypewriterMarkdown;
