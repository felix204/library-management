const BookCard = ({ book }) => {
  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <img className="rounded-t-lg w-full h-48 object-cover" src={book.imageUrl} alt={book.title} />
      <div className="p-5">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {book.title}
        </h5>
        <p className="mb-2 text-sm text-gray-600 dark:text-gray-400">
          Yazar: {book.author}
        </p>
        <p className="mb-2 text-sm text-gray-600 dark:text-gray-400">
          Kategori: {book.category}
        </p>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {book.description}
        </p>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">Stok: {book.stock}</span>
          <a
            href="#"
            className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Detaylar
            <svg
              className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};

export default BookCard; 