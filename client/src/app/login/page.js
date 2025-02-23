'use client'
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { userLogin } from '@/api';
import AuthForm from '@/components/AuthForm';
import { useEffect } from 'react';

export default function LoginPage() {
    const dispatch = useDispatch();
    const router = useRouter();
    const { loading, error, isAuthenticated } = useSelector((state) => state.auth);

    useEffect(() => {
        if (isAuthenticated) {
            router.push('/');
        }
    }, [isAuthenticated, router]);

    const handleLogin = (formData) => {
        dispatch(userLogin(formData));
    };

    return (
        <AuthForm 
            type="login"
            onSubmit={handleLogin}
            loading={loading}
            error={error}
        />
    );
} 