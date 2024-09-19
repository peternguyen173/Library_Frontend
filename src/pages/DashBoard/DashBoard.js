import React, { useEffect, useState } from "react";
import axios from "axios";
import "./DashBoard.css";
import { getAllBooks, searchBooksByCategory, searchBooksByAuthor, searchBooksByTitle } from "../../api/book";

const DashBoard = () => {
    const [books, setBooks] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [totalPages, setTotalPages] = useState(0);
    const [searchType, setSearchType] = useState('tên sách');
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isSearchPerformed, setIsSearchPerformed] = useState(false);

    useEffect(() => {
        if (isSearchPerformed) {
            fetchBooks(currentPage, pageSize, searchType, searchQuery);
        } else {
            fetchBooks(currentPage, pageSize);
        }
    }, [currentPage, pageSize, isSearchPerformed]);

    const fetchBooks = async (page, size, type, query) => {
        setLoading(true);
        setError(null);
        try {
            let response;
            if (isSearchPerformed && type && query) {
                if (type === 'thể loại') {
                    response = await searchBooksByCategory(query, page, size);
                } else if (type === 'tác giả') {
                    response = await searchBooksByAuthor(query, page, size);
                } else if (type === 'tên sách') {
                    response = await searchBooksByTitle(query, page, size);
                }
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
        setCurrentPage(0);
        setIsSearchPerformed(true);
        setError(null);
        fetchBooks(0, pageSize, searchType, searchQuery);
    };

    // Function to handle Enter key press
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <div className="books-container">
            <div className="search-bar">
                <h2>Tìm kiếm sách</h2>

                Tìm kiếm theo
                <select
                    className="alo"
                    value={searchType}
                    onChange={(e) => setSearchType(e.target.value)}
                >
                    <option value="tên sách">tên sách</option>
                    <option value="tác giả">tác giả</option>
                    <option value="thể loại">thể loại</option>
                </select>
                :
                <input
                    className="input2"
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={handleKeyDown} // Add this line to handle Enter key
                    placeholder={`Nhập ${searchType}`}
                />
                <button onClick={handleSearch}>Search</button>
            </div>

            {error && <div style={{color: 'red'}}>{error}</div>}
            {loading && <div>Đang tải...</div>}
            <br />
            <h2>{isSearchPerformed ? 'Kết quả tìm kiếm' : 'Danh sách sách hiện có'}</h2>

            <div className="books-list">
                <div className="table-header">
                    <div>Tên sách</div>
                    <div>Tác giả</div>
                    <div>Nhà xuất bản</div>
                    <div>Thể loại</div>
                    <div>Số trang</div>
                    <div>Xem</div>
                </div>
                {books.length === 0 ? (
                    <div>No books found</div>
                ) : (
                    books.map((book) => (
                        <div className="table-row" key={book.id}>
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
                        </div>
                    ))
                )}
                <div className="pagination">
                    <span>{`Trang số ${currentPage + 1} / ${totalPages}`}</span>
                    <button onClick={handlePrevPage} disabled={currentPage === 0}>Previous</button>
                    <button onClick={handleNextPage} disabled={currentPage >= totalPages - 1}>Next</button>
                </div>
            </div>
        </div>
    );
};

export default DashBoard;
