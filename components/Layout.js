import { useState, useEffect } from 'react';
import LoadingComponent from '@/components/LoadingComponent';

export default function Layout({ children, loading }) {
    const [isLoading, setIsLoading] = useState(true);
    return (
        <>
            <main onLoad={() => {
                if (typeof loading == 'undefined') setIsLoading(false);
            }}>
                <LoadingComponent isLoading={typeof loading == 'undefined' ? isLoading : loading}></LoadingComponent>
                {children}
            </main>
        </>
    )
}