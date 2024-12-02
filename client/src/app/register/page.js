'use client'
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { userRegister } from '@/api';
import AuthForm from '@/components/AuthForm';

export default function RegisterPage() {
    const dispatch = useDispatch();
    const router = useRouter();
    const { loading, error, registrationSuccess } = useSelector((state) => state.user);

    const handleRegister = (formData) => {
        dispatch(userRegister(formData));
    };

    return (
        <AuthForm 
            type="register"
            onSubmit={handleRegister}
            loading={loading}
            error={error}
        />
    );
} 