'use client';
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';
import { PropsWithChildren } from 'react';
import { Toaster } from 'sonner';

import TanstackQueryProvider from './TanstackQueryProvider';
import ThemesProvider from 'src/components/providers/ThemesProvider';

const AppProvider = ({ children }: PropsWithChildren) => {
  return (
    <ThemesProvider attribute="class" defaultTheme="system" enableSystem>
      <ProgressBar
        options={{ showSpinner: false }}
        shallowRouting
        style={`#nprogress .bar {
                position: fixed;
                z-index: 9999;
                top: 0;
                left: 0;
                width: 100%;
                background:#22c55e;
                height: 3px;
              }
              `}
      />
      <Toaster />
      <TanstackQueryProvider>{children}</TanstackQueryProvider>
    </ThemesProvider>
  );
};

export default AppProvider;
