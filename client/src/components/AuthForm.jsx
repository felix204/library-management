'use client'
import { useState } from 'react';
import Link from 'next/link';

export default function AuthForm({ 
    type = 'login', // login veya register
    onSubmit, 
    loading, 
    error 
}) {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        name: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="bg-white p-8 rounded shadow-md w-96">
                <h1 className="text-2xl font-bold mb-6">
                    {type === 'login' ? 'Giriş Yap' : 'Kayıt Ol'}
                </h1>
                
                {error && <div className="text-red-500 mb-4">{error}</div>}
                
                <form onSubmit={handleSubmit} className="space-y-4">
                    {type === 'register' && (
                        <input
                            type="text"
                            placeholder="İsim"
                            className="w-full p-2 border rounded"
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                        />
                    )}
                    
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
                        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                        disabled={loading}
                    >
                        {loading 
                            ? (type === 'login' ? 'Giriş yapılıyor...' : 'Kayıt yapılıyor...') 
                            : (type === 'login' ? 'Giriş Yap' : 'Kayıt Ol')}
                    </button>
                </form>
                
                <div className="mt-4 text-center">
                    {type === 'login' ? (
                        <Link href="/register" className="text-blue-500 hover:text-blue-600">
                            Hesabınız yok mu? Kayıt olun
                        </Link>
                    ) : (
                        <Link href="/login" className="text-blue-500 hover:text-blue-600">
                            Zaten hesabınız var mı? Giriş yapın
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
} 