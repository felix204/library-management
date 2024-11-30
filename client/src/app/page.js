'use client'
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';

export default function Home() {
    const { isAuthenticated } = useSelector((state) => state.auth);
    const router = useRouter();

    useEffect(() => {
        if (!isAuthenticated) {
            router.push('/login');
        }
    }, [isAuthenticated, router]);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center">
            <h1 className="text-3xl font-bold mb-4">Hoşgeldiniz</h1>
            <p>Bu sayfa sadece giriş yapmış kullanıcılar tarafından görüntülenebilir.</p>
        </div>
    );
}