import React, { useEffect, useState } from "react";
import { getData, setData } from "./apis";

function App() {
  const [title, setTitle] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");

  const getPosts = async () => {
    await getData();
  };

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    if (id === "title") setTitle(value);
    else setEmail(value);
  };

  const handleOnCreate = async () => {
    const sendData = {
      title: title,
      email: email,
      gender: "male",
    };
    await setData(sendData);
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div>
      <input id="title" value={title} onChange={handleOnChange} placeholder="이름" />
      <input id="email" value={email} onChange={handleOnChange} placeholder="이메일" />
      <button onClick={handleOnCreate}>리스트 추가</button>
    </div>
  );
}

export default App;
