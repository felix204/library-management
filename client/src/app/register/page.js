'use client'
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { userRegister } from '@/api';
import Link from 'next/link';

export default function RegisterPage() {
    const dispatch = useDispatch();
    const router = useRouter();
    const { loading, error, registrationSuccess } = useSelector((state) => state.user);

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        name: ''
    });

    useEffect(() => {
        if (registrationSuccess) {
            router.push('/login');
        }
    }, [registrationSuccess, router]);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(userRegister(formData));
    };

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="bg-white p-8 rounded shadow-md w-96">
                <h1 className="text-2xl font-bold mb-6">Kayıt Ol</h1>
                {error && <div className="text-red-500 mb-4">{error}</div>}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        placeholder="İsim"
                        className="w-full p-2 border rounded"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        className="w-full p-2 border rounded"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                    <input
                        type="password"
                        placeholder="Şifre"
                        className="w-full p-2 border rounded"
                        value={formData.password}
                        onChange={(e) => setFormData({...formData, password: e.target.value})}
                    />
                    <button 
                        type="submit"
                        className="w-full bg-blue-500 text-white p-2 rounded"
                        disabled={loading}
                    >
                        {loading ? 'Kayıt yapılıyor...' : 'Kayıt Ol'}
                    </button>
                </form>
                <div className="mt-4 text-center">
                    <Link href="/login" className="text-blue-500">
                        Zaten hesabınız var mı? Giriş yapın
                    </Link>
                </div>
            </div>
        </div>
    );
} 