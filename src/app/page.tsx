/* eslint-disable @typescript-eslint/no-floating-promises */
'use client';

import { useChat } from '@ai-sdk/react';
import MarkdownPreview from '@uiw/react-markdown-preview';
import { MoonIcon, SunIcon } from 'lucide-react';
import { useTheme } from 'next-themes';
import { FormEventHandler, useEffect, useRef, useState } from 'react';

import { AIChatIcon } from 'src/assets/icons';
import { Button } from 'src/components/ui/shadcn-ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from 'src/components/ui/shadcn-ui/card';
import { Input } from 'src/components/ui/shadcn-ui/input';
import { ScrollArea } from 'src/components/ui/shadcn-ui/scroll-area';
import TypewriterMarkdown from 'src/components/ui/shared/TypewriterMarkdown';

const Homepage = () => {
  const { theme, setTheme } = useTheme();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [input, setInput] = useState('');
  const { messages, sendMessage } = useChat();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    scrollToBottom();
    setInput('');
    sendMessage({ text: input });
  };

  useEffect(() => {
    const elem: HTMLElement | null = document.querySelector(
      'div[data-radix-scroll-area-viewport] > div'
    );
    if (elem) elem.style.removeProperty('display');
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4 dark:bg-gray-900">
      <Card className="w-full max-w-6xl bg-white dark:bg-gray-800">
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center">
            <AIChatIcon className="mr-2 size-8 text-blue-500 dark:text-blue-400" />
            <CardTitle className="text-gray-900 dark:text-white">
              AI Chat made by minhchi1509
            </CardTitle>
          </div>
          <Button
            className="size-8 rounded-full bg-gray-200 dark:bg-gray-700"
            variant="outline"
            size="icon"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          >
            <SunIcon className="size-[1.2rem] rotate-0 scale-100 text-yellow-500 transition-all dark:-rotate-90 dark:scale-0" />
            <MoonIcon className="absolute size-[1.2rem] rotate-90 scale-0 text-blue-500 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Switch Theme</span>
          </Button>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[60vh] pr-4">
            {messages.map((m, index) => (
              <div
                key={m.id}
                className={`mb-4 ${m.role === 'user' ? 'text-right' : 'text-left'}`}
              >
                {m.role === 'user' ? (
                  <span className="inline-block max-w-[75%] rounded-lg bg-blue-500 p-2.5 text-left text-white">
                    {m.parts.map((part, i) => {
                      switch (part.type) {
                        case 'text':
                          return <div key={`${m.id}-${i}`}>{part.text}</div>;
                      }
                    })}
                  </span>
                ) : (
                  <div className="flex flex-row gap-2">
                    <AIChatIcon className="size-6 text-blue-500 dark:text-blue-400 shrink-0" />
                    {m.parts.map((part, i) => {
                      switch (part.type) {
                        case 'text':
                          return index === messages.length - 1 ? (
                            <TypewriterMarkdown
                              key={`${m.id}-${i}`}
                              streamingText={part.text}
                              typingSpeed={1}
                            />
                          ) : (
                            <MarkdownPreview
                              key={`${m.id}-${i}`}
                              source={part.text}
                              style={{
                                maxWidth: 'calc(100% - 2rem)',
                                backgroundColor: 'transparent'
                              }}
                              wrapperElement={{
                                'data-color-mode':
                                  theme === 'dark' ? 'dark' : 'light'
                              }}
                              className="text-gray-800 dark:text-gray-200"
                            />
                          );
                      }
                    })}
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} id="message-end-mlpiu" />
          </ScrollArea>
        </CardContent>
        <CardFooter>
          <form onSubmit={handleSubmit} className="flex w-full space-x-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="grow bg-white text-gray-900 dark:bg-gray-700 dark:text-white"
            />
            <Button
              disabled={!input.trim()}
              type="submit"
              className="bg-blue-500 text-white hover:bg-blue-600"
            >
              Send
            </Button>
          </form>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Homepage;
