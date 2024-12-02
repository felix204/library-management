'use client'
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { userLogin } from '@/api';
import AuthForm from '@/components/AuthForm';

export default function LoginPage() {
    const dispatch = useDispatch();
    const router = useRouter();
    const { loading, error } = useSelector((state) => state.auth);

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