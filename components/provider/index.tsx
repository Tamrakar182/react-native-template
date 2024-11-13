import { ReactNode } from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from '@/utils/api'
import { AuthProvider } from '@/context/AuthContext';

const Provider = ({ children }: { children: ReactNode }) => {
    return (
        <AuthProvider>
            <QueryClientProvider client={queryClient}>
                <SafeAreaProvider>
                    {children}
                </SafeAreaProvider>
            </QueryClientProvider>
        </AuthProvider>
    )
}

export default Provider