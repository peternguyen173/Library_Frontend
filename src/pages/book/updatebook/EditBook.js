'use client'
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import './EditBook.css';
import { updateBook, getBookById } from "../../../api/book";
import Cookies from "js-cookie";
import { useParams, useNavigate } from 'react-router-dom';

const EditBook = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [book, setBook] = useState({
        title: "",
        author: "",
        publisher: "",
        category: "",
        description: "",
        numberOfPages: 0,
        previewText: "",
        image: null,
        imageUrl: ""
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchBook = async () => {
            try {
                const fetchedBook = await getBookById(id);
                setBook({
                    title: fetchedBook.title,
                    author: fetchedBook.author,
                    publisher: fetchedBook.publisher,
                    category: fetchedBook.category,
                    description: fetchedBook.description,
                    numberOfPages: fetchedBook.numberOfPages,
                    previewText: fetchedBook.previewText,
                    imageUrl: fetchedBook.imageUrl
                });
            } catch (error) {
                console.error("An error occurred while fetching the book", error);
                toast.error("Failed to fetch book details.", {
                    position: "top-center",
                });
            }
        };

        fetchBook();
    }, [id]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setBook({ ...book, [name]: value });
    };

    const handleImageChange = (event) => {
        if (event.target.files && event.target.files.length > 0) {
            setBook({ ...book, image: event.target.files[0] });
        }
    };

    const handleUpdateBook = async (event) => {
        event.preventDefault();
        setLoading(true);
        try {
            // Prepare the updated book data
            const updatedBookData = {
                ...book,
            };

            // Nếu không có ảnh mới được chọn, giữ lại imageUrl cũ
            if (!book.image) {
                updatedBookData.imageUrl = book.imageUrl;
            } else {
                delete updatedBookData.imageUrl; // Loại bỏ imageUrl khi có ảnh mới
            }

            // Update the book
            const response = await updateBook(id, updatedBookData);
            console.log("res",response)
            if (response) {
                toast.success("Cập nhật sách thành công!", {
                    position: "top-center",
                });
                setTimeout(() => navigate(`/book/${id}`), 2400);
            } else {
                toast.error("Failed to update book. Please fill in all required fields.", {
                    position: "top-center",
                });
            }
        } catch (error) {
            console.error("An error occurred during book update", error);
            toast.error(error.response?.data || "An error occurred", {
                position: "top-center",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <section>
            <form className="form1" onSubmit={handleUpdateBook}>
                <div className="formpage">
                    <div className="hu">
                        <div className="hi">
                            <label className="label1">Tên sách: </label>
                            <input className="input1"
                                   type="text"
                                   name="title"
                                   placeholder="Tên sách"
                                   value={book.title}
                                   onChange={handleInputChange}
                                   required
                            />
                        </div>
                        <div className="hi">
                            <label className="label1">Tác giả: </label>
                            <input className="input1"
                                   type="text"
                                   name="author"
                                   placeholder="Tác giả"
                                   value={book.author}
                                   onChange={handleInputChange}
                                   required
                            />
                        </div>
                    </div>
                    <div className="hu">
                        <div className="hi">
                            <label className="label1">Nhà xuất bản: </label>
                            <input className="input1"
                                   type="text"
                                   name="publisher"
                                   placeholder="Nhà xuất bản"
                                   value={book.publisher}
                                   onChange={handleInputChange}
                            />
                        </div>
                        <div className="hi">
                            <label className="label1">Thể loại: </label>
                            <input className="input1"
                                   type="text"
                                   name="category"
                                   placeholder="Thể loại"
                                   value={book.category}
                                   onChange={handleInputChange}
                            />
                        </div>
                    </div>
                    <div className="ntd3">
                        <label className="label1">Mô tả: </label>
                        <textarea className="textarea1"
                                  name="description"
                                  placeholder="Mô tả"
                                  value={book.description}
                                  onChange={handleInputChange}
                        />
                    </div>
                    <div className="ntd3">
                        <label className="label1">Số trang: </label>
                        <input className="input1"
                               type="number"
                               name="numberOfPages"
                               placeholder="Số trang"
                               value={book.numberOfPages}
                               onChange={handleInputChange}
                        />
                    </div>
                    <div className="ntd3">
                        <label className="label1">Tóm tắt: </label>
                        <textarea className="textarea1"
                                  name="previewText"
                                  placeholder="Tóm tắt"
                                  value={book.previewText}
                                  onChange={handleInputChange}
                        />
                    </div>
                    <div className="ntd3">
                        <label className="label1">Ảnh: </label>
                        <input className="input1"
                               type="file"
                               accept="image/*"
                               onChange={handleImageChange}
                        />
                        {book.image && <img src={URL.createObjectURL(book.image)} alt="Book cover" width="100" />}
                        {book.imageUrl && !book.image && <img src={book.imageUrl} alt="Book cover" width="100" />}
                    </div>
                    <button type="submit" disabled={loading}>
                        {loading ? "Đang cập nhật..." : "Cập nhật sách"}
                    </button>
                </div>
            </form>
            <ToastContainer />
        </section>
    );
};

export default EditBook;
