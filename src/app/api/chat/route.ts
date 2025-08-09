import { google } from '@ai-sdk/google';
import { convertToModelMessages, streamText, UIMessage } from 'ai';

import { errorHandler } from 'src/utils/common.util';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = (await req.json()) as {
    messages: UIMessage[];
  };

  const result = streamText({
    model: google('gemini-1.5-flash'),
    messages: convertToModelMessages(messages)
  });

  return result.toUIMessageStreamResponse({
    onError: errorHandler
  });
}
