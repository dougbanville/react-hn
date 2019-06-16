import React, { Component, useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";

const App = () => {
  const [news, setNews] = useState([]);

  const [searchQuery, setSearchQueary] = useState("react");

  const [url, setUrl] = useState(`http://hn.algolia.com/api/v1/search?query=react`);

  const [loading, setLoading] = useState(false);

  const fetchNews = () => {
    setLoading(true);
    fetch(`http://hn.algolia.com/api/v1/search?query=${searchQuery}`)
      .then(result => result.json())
      .then(data => (setNews(data.hits), setLoading(false)))
      .catch(e => console.log(e));
  };

  useEffect(() => {
    fetchNews();
  }, [url]);

  const handleChange = e => {
    setSearchQueary(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    setUrl(`http://hn.algolia.com/api/v1/search?query=${searchQuery}`);
  };

  const showLoading = () => (loading ? <h2>Loading...</h2> : "");

  const showForm = () => (
    <form onSubmit={handleSubmit}>
      <input type="text" value={searchQuery} onChange={handleChange} />
    </form>
  );

  const showNews = () => news.map((n, i) => <p key={i}>{n.title}</p>);

  return (
    <div>
      <h2>News</h2>
      {showLoading()}
      {showForm()}
      {showNews()}
    </div>
  );
};

export default App;
