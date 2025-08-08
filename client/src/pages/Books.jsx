import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import API_BASE_URL from "./config";

const Books = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchAllBooks = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/books`);
        setBooks(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllBooks();
  }, []);

  console.log(books);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/books/${id}`);
      window.location.reload()
    } catch (err) {
      console.log(err);
    }
  };

return (
  <div>
  <div className={`header ${books.length === 0 ? 'empty' : ''}`}>
  <h1>DevOps Book Store</h1>
  <button className="addNewBook">
    <Link to="/add" style={{ color: "inherit", textDecoration: "none" }}>
      Add New Book
    </Link>
  </button>
</div>


    <div className="books-grid">
      {books.map((book) => (
        <div key={book.id} className="book-card">
<img
  src={book.cover ? book.cover : "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg"}
  
/>
          <h2>Title: {book.title}</h2>
          <p>Description: {book.desc}</p>
          <p>Price: ₹ {book.price}</p>

          <div className="actions">
            <button className="delete" onClick={() => handleDelete(book.id)}>
              Delete
            </button>
            <button className="update">
              <Link
                to={`/update/${book.id}`}
                style={{ color: "inherit", textDecoration: "none" }}
              >
                Update
              </Link>
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
);


};

export default Books;
