import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./ViewBook.css";
import {getBookById} from "../../../api/book";

const ViewBook = () => {
    const { id } = useParams(); // Get the book ID from the URL
    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBook = async () => {
            try {
                const response = await getBookById(id);
                console.log("book",response);
                setBook(response);
            } catch (error) {
                console.error("Error fetching book details:", error);
                setError("Failed to fetch book details.");
            } finally {
                setLoading(false);
            }
        };
        fetchBook();
    }, [id]);

    if (loading) {
        return <div>Đang tải...</div>;
    }

    if (error) {
        return <div style={{ color: 'red' }}>{error}</div>;
    }

    if (!book) {
        return <div>Không tìm thấy</div>;
    }

    return (
        <div className="book-details-container">
            <div className="book-image">
                <img src={book.imageUrl} alt={book.title} />
            </div>
            <div className="book-info">
                <h1>{book.title}</h1>
                <h2>Tác giả: {book.author}</h2>
                <p><strong>Thể loại:</strong> {book.category}</p>
                <p><strong>Nhà xuất bản:</strong> {book.publisher}</p>
                <p><strong>Số trang:</strong> {book.numberOfPages}</p>
                <p><strong>Mô tả:</strong> {book.description}</p>
                <p><strong>Tóm tắt:</strong> {book.previewText}</p>
            </div>
        </div>
    );
};

export default ViewBook;
