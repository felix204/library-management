"use client";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import BookCard from "@/components/BookCard";
import { getAllBooks } from "@/api";

export default function Home() {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { books, loading, error } = useSelector((state) => state.book);
  const router = useRouter();

  const handleLogout = async () => {
    /* await dispatch(userLogout()); */
    router.push('/login');
  };

  if (loading) {
    return <div className="text-center p-4">Yükleniyor...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 p-4">{error}</div>;
  }

  if (!books || !Array.isArray(books?.data)) {
    return <div className="text-center p-4">Kitap bulunamadı.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Kitaplar</h1>
        <button 
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Çıkış Yap
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {books?.data?.map((book) => (
          <BookCard key={book._id} book={book} />
        ))}
      </div>
    </div>
  );
}
