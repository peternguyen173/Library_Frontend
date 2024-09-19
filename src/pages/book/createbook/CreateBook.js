'use client'
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import './CreateBook.css';
import { createBook } from "../../../api/book";
import Cookies from "js-cookie";

const CreateBook = () => {
    const [book, setBook] = useState({
        title: "",
        author: "",
        publisher: "",
        category: "",
        description: "",
        numberOfPages: 0,
        previewText: "",
        image: null,
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setBook({ ...book, [name]: value });
    };

    const handleImageChange = (event) => {
        if (event.target.files && event.target.files.length > 0) {
            setBook({ ...book, image: event.target.files[0] });
        }
    };

    const handleCreateBook = async (event) => {
        event.preventDefault();
        try {
            const token = Cookies.get("authToken");

            const response = await createBook(book, token);
            if (response) {
                toast.success("Thêm sách thành công", {
                    position: "top-center",
                });
            } else {
                toast.error("Failed to create book. Please fill in all required fields.", {
                    position: "top-center",
                });
            }
        } catch (error) {
            console.error("An error occurred during book creation", error);
            toast.error(error.response.data, {
                position: "top-center",
            });
        }
    };

    return (
        <section>
            <form className="form1" onSubmit={handleCreateBook}>
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
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                        />
                        {book.image && <img src={URL.createObjectURL(book.image)} alt="Book cover" width="100" />}
                        {book.imageUrl && !book.image && <img src={book.imageUrl} alt="Book cover" width="100" />}

                    </div>

                    <button type="submit">Thêm sách vào hệ thống</button>
                </div>
            </form>
            <ToastContainer />
        </section>
    );
};

export default CreateBook;
