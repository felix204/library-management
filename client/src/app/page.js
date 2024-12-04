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

  useEffect(() => {
    const fetchData = async () => {
      if (!isAuthenticated) {
        router.push("/login");
        return;
      }
      
      if (!books?.data?.length) {
        dispatch(getAllBooks());
      }
    };

    fetchData();
  }, [isAuthenticated]);

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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {books?.data?.map((book) => (
          <BookCard key={book._id} book={book} />
        ))}
      </div>
    </div>
  );
}
