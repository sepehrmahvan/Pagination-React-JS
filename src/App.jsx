import { useEffect, useState } from "react";
import "./app.scss";

export default function App() {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(5);

  let pageNums = [1, 2, 3, 4, 5];
  let perArray = [5, 10, 15, 20, 30];

  useEffect(() => {
    fetch("https://api.github.com/users?page=" + page + "&per_page=" + perPage)
      .then((res) => res.json())
      .then((res) => setUsers(res));
  }, [page, perPage]);

  const usersView = users.map((user) => (
    <div className="page" key={user.id}>
      <img src={user.avatar_url} alt={user.login} />
      <p>{user.login}</p>
    </div>
  ));

  const buttons = pageNums.map((button) => (
    <button key={button} onClick={() => setPage(button)}>
      {button}
    </button>
  ));

  const options = perArray.map((option) => (
    <option key={option}>
      {option}
    </option>
  ));
  return (
    <>
      <header>
        <div className="page-num">{buttons}</div>
        <div className="select">
          <select name="format" onChange={(e) => setPerPage(e.target.value)}>{options}</select>
        </div>
      </header>
      <div className="users">{usersView}</div>
    </>
  );
}
