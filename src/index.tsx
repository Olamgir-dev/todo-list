import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { MainRouter } from './routers';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <QueryClientProvider client={queryClient}>
    <MainRouter />
  </QueryClientProvider>
);
