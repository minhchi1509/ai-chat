'use client';
import MarkdownPreview from '@uiw/react-markdown-preview';
import { useChat } from 'ai/react';

import { AIChatIcon } from 'src/assets/icons';
import { Button } from 'src/components/ui/library/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from 'src/components/ui/library/card';
import { Input } from 'src/components/ui/library/input';
import { ScrollArea } from 'src/components/ui/library/scroll-area';

const Homepage = () => {
  const { messages, input, handleInputChange, handleSubmit } = useChat();
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <Card className="w-full max-w-6xl">
        <CardHeader className="flex flex-row gap-2">
          <AIChatIcon className="mr-2 size-8" />
          <CardTitle>AI Chat made by minhchi1509</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[60vh] pr-4">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`mb-4 ${m.role === 'user' ? 'text-right' : 'text-left'}`}
              >
                {m.role === 'user' ? (
                  <span
                    className={`inline-block max-w-md rounded-lg bg-blue-500 p-2.5 text-left text-white`}
                  >
                    {m.content}
                  </span>
                ) : (
                  <div className="flex gap-2">
                    <AIChatIcon className="size-6" />
                    <MarkdownPreview
                      source={m.content}
                      wrapperElement={{
                        'data-color-mode': 'light'
                      }}
                    />
                  </div>
                )}
              </div>
            ))}
          </ScrollArea>
        </CardContent>
        <CardFooter>
          <form onSubmit={handleSubmit} className="flex w-full space-x-2">
            <Input
              value={input}
              onChange={handleInputChange}
              placeholder="Type your message..."
              className="grow"
            />
            <Button type="submit">Send</Button>
          </form>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Homepage;