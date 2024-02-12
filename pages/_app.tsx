import React from 'react';
import { ReactQueryDevtools } from 'react-query/devtools';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

interface MyAppProps {
  Component: React.ComponentType;
  pageProps: any; 
}

function MyApp({ Component, pageProps }: MyAppProps) {
  return (
      <QueryClientProvider client={queryClient}>
           <Component {...pageProps} />
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default MyApp;

