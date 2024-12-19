/* eslint-disable import/no-unresolved */
import { Metadata } from 'next';
import { PropsWithChildren } from 'react';

import 'src/themes/global.css';
import AppProvider from 'src/components/providers/AppProvider';

export const metadata: Metadata = {
  title: 'AI Chat App',
  description: 'Welcome to my AI Chat App',
  icons: '/app-logo.png'
};

const RootLayout = ({ children }: PropsWithChildren) => {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
};

export default RootLayout;
