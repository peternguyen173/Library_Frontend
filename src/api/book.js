import instance from "./axiosClient";

// Create a new book (Admin required)
export const createBook = async (bookData) => {
    try {
        const formData = new FormData();
        formData.append("title", bookData.title);
        formData.append("author", bookData.author);
        formData.append("category", bookData.category);
        formData.append("publisher", bookData.publisher);
        formData.append("description", bookData.description);
        formData.append("numberOfPages", bookData.numberOfPages);
        formData.append("previewText", bookData.previewText);
        if (bookData.image) {
            formData.append("image", bookData.image);
        }

        const response = await instance.post("/book", formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });
        return response.data;
    } catch (error) {
        console.error("Error creating book:", error);
        throw error;
    }
};

// Update a book by ID (Admin required)
export const updateBook = async (id, bookData) => {
    try {
        const formData = new FormData();
        formData.append("title", bookData.title);
        formData.append("author", bookData.author);
        formData.append("category", bookData.category);
        formData.append("publisher", bookData.publisher);
        formData.append("description", bookData.description);
        formData.append("numberOfPages", bookData.numberOfPages);
        formData.append("previewText", bookData.previewText);


        if (bookData.image) {
            formData.append("image", bookData.image);
            formData.append("imageUrl", null);

        }
        else{
            formData.append("imageUrl", bookData.imageUrl);
        }

        const response = await instance.put(`/book/${id}`, formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });
        return response.data;
    } catch (error) {
        console.error("Error updating book:", error);
        throw error;
    }
};

// Delete a book by ID (Admin required)
export const deleteBook = async (id) => {
    try {
        const response = await instance.delete(`/book/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error deleting book:", error);
        throw error;
    }
};

// Get a book by ID
export const getBookById = async (id) => {
    try {
        const response = await instance.get(`/book/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching book details:", error);
        throw error;
    }
};

// Get all books
export const getAllBooks = async (page, size ) => {
    try {
        // Send a GET request with pagination parameters
        const response = await instance.get("/book", {
            params: {
                page,
                size,
            },
        });

        // Return the paginated movie data from the response
        return response.data;
    } catch (error) {
        console.error("Error fetching all books:", error);
        throw error;
    }
};

// Search books by category
export const searchBooksByCategory = async (category) => {
    try {
        const response = await instance.get(`/book/search/category`, { params: { category } });
        return response.data;
    } catch (error) {
        console.error("Error searching books by category:", error);
        throw error;
    }
};

// Search books by author
export const searchBooksByAuthor = async (author) => {
    try {
        const response = await instance.get(`/book/search/author`, { params: { author } });
        return response.data;
    } catch (error) {
        console.error("Error searching books by author:", error);
        throw error;
    }
};

// Search books by title
export const searchBooksByTitle = async (title) => {
    try {
        const response = await instance.get(`/book/search/title`, { params: { title } });
        return response.data;
    } catch (error) {
        console.error("Error searching books by author:", error);
        throw error;
    }
};
