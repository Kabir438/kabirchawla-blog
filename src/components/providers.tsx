"use client";
import {
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query';
import type { PropsWithChildren } from 'react';

const queryClient = new QueryClient()

export default function Providers({ children }: PropsWithChildren) {
    return (
        <QueryClientProvider client={queryClient}>
            {/* <NextProgress delay={150} options={{ showSpinner: false }} /> */}
            {children}
        </QueryClientProvider>
    )
}