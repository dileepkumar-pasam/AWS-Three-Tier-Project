import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import API_BASE_URL from "./config";

const Update = () => {
  const [book, setBook] = useState({
    title: "",
    desc: "",
    price: "",
    cover: "",
  });

  const [error, setError] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const bookId = location.pathname.split("/")[2];

  // Fetch the book data when the component mounts
  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/books`);
        const foundBook = res.data.find((b) => b.id === parseInt(bookId));
        if (foundBook) setBook(foundBook);
      } catch (err) {
        console.log(err);
        setError(true);
      }
    };

    fetchBook();
  }, [bookId]);

  const handleChange = (e) => {
    setBook((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`${API_BASE_URL}/books/${bookId}`, book);
      navigate("/");
    } catch (err) {
      console.log(err);
      setError(true);
    }
  };

  return (
    <div className="form">
      <h1>Update the Book</h1>

      <input
        type="text"
        placeholder="Book title"
        name="title"
        value={book.title}
        onChange={handleChange}
      />
      <textarea
        rows={5}
        placeholder="Book description"
        name="desc"
        value={book.desc}
        onChange={handleChange}
      />
      <input
        type="number"
        placeholder="Book price"
        name="price"
        value={book.price}
        onChange={handleChange}
         onInput={(e) => {
    // remove all non-digit characters
    e.target.value = e.target.value.replace(/[^0-9]/g, '');
  }}
      />
      <input
        type="text"
        placeholder="Book cover URL"
        name="cover"
        value={book.cover}
        onChange={handleChange}
      />

      <button onClick={handleClick}>Update</button>
      {error && <p style={{ color: "red" }}>Something went wrong!</p>}
      <Link to="/">See all books</Link>
    </div>
  );
};

export default Update;
