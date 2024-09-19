import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ManageBook.css";
import {
    getAllBooks,
    searchBooksByCategory,
    searchBooksByAuthor,
    searchBooksByTitle,
    deleteBookById,
    deleteBook
} from "../../../api/book"; // Assuming you have this function

const ManageBook = () => {
    const [books, setBooks] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [totalPages, setTotalPages] = useState(0);
    const [searchType, setSearchType] = useState('title');
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isSearchPerformed, setIsSearchPerformed] = useState(false);

    useEffect(() => {
        fetchBooks(currentPage, pageSize);
    }, [currentPage, pageSize]);

    const fetchBooks = async (page, size, type, query) => {
        setLoading(true);
        setError(null);
        try {
            let response;
            if (type === 'category') {
                response = await searchBooksByCategory(query);
            } else if (type === 'author') {
                response = await searchBooksByAuthor(query);
            } else if (type === 'title') {
                response = await searchBooksByTitle(query);
            } else {
                response = await getAllBooks(page, size);
            }

            const data = response;
            setBooks(data.content || data.books || []);
            setTotalPages(data.totalPages || 0);
        } catch (error) {
            console.error("Failed to fetch books", error);
            setError("Failed to fetch books");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (bookId, name, author) => {
        const isConfirmed = window.confirm(`Bạn có chắc chắn muốn xóa sách: ${name}, tác giả: ${author}?`);
        if (isConfirmed) {
            try {
                await deleteBook(bookId); // Assuming you have a deleteBookById function in your API
                setBooks(books.filter(book => book.id !== bookId)); // Remove the deleted book from the UI
                alert("Xóa sách thành công!");
            } catch (error) {
                console.error("Failed to delete book", error);
                setError("Failed to delete book");
            }
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages - 1) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleSearch = () => {
        if (!searchQuery.trim()) {
            setError('Vui lòng nhập thông tin sách cần tìm kiếm!');
            return;
        }

        setCurrentPage(0);
        setIsSearchPerformed(true);
        setError(null);
        fetchBooks(0, pageSize, searchType, searchQuery);
    };

    return (
        <div className="books-container">
            <div className="search-bar">
                <h2>Tìm kiếm sách</h2>

                Tìm kiếm theo <select className="alo"
                                      value={searchType}
                                      onChange={(e) => setSearchType(e.target.value)}
            >
                <option value="tên sách">tên sách</option>
                <option value="tác giả">tác giả</option>
                <option value="thể loại">thể loại</option>
            </select>:
                <input className="input2"
                       type="text"
                       value={searchQuery}
                       onChange={(e) => setSearchQuery(e.target.value)}
                       placeholder={`Nhập ${searchType}`}
                />
                <button onClick={handleSearch}>Search</button>
            </div>

            {error && <div style={{color: 'red'}}>{error}</div>}
            {loading && <div>Đang tải...</div>}

            <h2>{isSearchPerformed ? 'Kết quả tìm kiếm' : 'Danh sách sách hiện có'}</h2>

            <div className="books-list">
                <div className="table-header1">
                    <div>Tên sách</div>
                    <div>Tác giả</div>
                    <div>Nhà xuất bản</div>
                    <div>Thể loại</div>
                    <div>Số trang</div>
                    <div>Xem</div>
                    <div>Chỉnh sửa</div>
                    <div>Xóa</div>
                </div>
                {books.length === 0 ? (
                    <div>No books found</div>
                ) : (
                    books.map((book) => (
                        <div className="table-row1" key={book.id}>
                            <div>{book.title}</div>
                            <div>{book.author}</div>
                            <div>{book.publisher}</div>
                            <div>{book.category}</div>
                            <div>{book.numberOfPages}</div>
                            <div className="action-icon">
                                <a href={`/book/${book.id}`}>
                                    <button className="edit-btn">
                                        <i className="fas fa-eye"></i>
                                    </button>
                                </a>
                            </div>
                            <div className="action-icon">
                                <a href={`/book/editbook/${book.id}`}>
                                    <button className="delete-btn">
                                        <i className="fas fa-edit"></i>
                                    </button>
                                </a>
                            </div>
                            <div className="action-icon">
                                <button className="delete-btn"
                                        onClick={() => handleDelete(book.id, book.title, book.author)}>
                                    <i className="fas fa-trash"></i>
                                </button>
                            </div>
                        </div>
                    ))
                )}
                <div className="pagination">
                    <span>{`Showing ${currentPage * pageSize + 1} to ${Math.min((currentPage + 1) * pageSize, books.length)} of ${books.length}`}</span>
                    <button onClick={handlePrevPage} disabled={currentPage === 0}>Previous</button>
                    <button onClick={handleNextPage} disabled={currentPage >= totalPages - 1}>Next</button>
                </div>
            </div>
        </div>
    );
};

export default ManageBook;
