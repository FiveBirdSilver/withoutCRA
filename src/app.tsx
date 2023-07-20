import React, { useEffect, useState } from "react";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import { getData, setData } from "./apis";

function App() {
  const [title, setTitle] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("Male");

  const getPosts = async () => {
    await getData().then((res) => console.log(res));
  };

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === "title") setTitle(value);
    else setEmail(value);
  };

  const handleOnCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target;
    if (value === "Male" && checked) setGender("Male");
    else if (value === "Female" && checked) setGender("Female");
    else return;
  };

  const handleOnCreate = async () => {
    const sendData = {
      title: title,
      email: email,
      gender: gender,
    };
    await setData(sendData);
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div>
      <div style={{ display: "flex", alignContent: "center", justifyContent: "center", gap: "20px" }}>
        <TextField
          id="outlined-basic"
          label="이름"
          name="title"
          variant="outlined"
          value={title}
          onChange={handleOnChange}
        />
        <TextField
          id="outlined-basic"
          label="이메일"
          name="email"
          variant="outlined"
          value={email}
          onChange={handleOnChange}
        />
        <FormControlLabel
          control={<Checkbox onChange={handleOnCheck} value="Male" checked={gender === "Male"} />}
          label="남"
        />
        <FormControlLabel
          control={<Checkbox onChange={handleOnCheck} value="Female" checked={gender === "Female"} />}
          label="여"
        />
        <Button variant="outlined" onClick={handleOnCreate}>
          추가
        </Button>
      </div>
      <div></div>
    </div>
  );
}

export default App;
