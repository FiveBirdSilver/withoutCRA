import React, { useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient, useInfiniteQuery } from "react-query";
import { useInView } from "react-intersection-observer";

import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import { editData, getInfinitData, setData } from "./apis";

function App() {
  const queryClient = useQueryClient();
  const { ref, inView } = useInView();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("Male");

  const request = {
    name: name,
    email: email,
    gender: gender,
  };

  const { data, fetchNextPage } = useInfiniteQuery(
    ["info"],
    async ({ pageParam = 1 }) => {
      const res = await getInfinitData(pageParam);
      return {
        list: res,
        page: pageParam,
      };
    },
    {
      getNextPageParam: (lastPage) => {
        return lastPage?.page + 1;
      },
    }
  );

  useEffect(() => {
    if (inView) fetchNextPage();
  }, [inView]);

  // 정보 추가
  const addInfo = useMutation(setData, {
    onError: (data, error, variables) => {
      alert("잠시 후 다시 시도해주세요.");
    },
    onSuccess: (data, variables) => {
      alert("정보가 추가되었습니다.");
      queryClient.invalidateQueries("info");
    },
  });

  // 정보 수정
  const editInfo = useMutation(editData, {
    onError: (data, error, variables) => {
      alert("잠시 후 다시 시도해주세요.");
    },
    onSuccess: (data, variables) => {
      alert("정보가 수정되었습니다.");
      queryClient.invalidateQueries("info");
    },
  });

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === "name") setName(value);
    else setEmail(value);
  };

  const handleOnCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target;
    if (value === "Male" && checked) setGender("Male");
    else if (value === "Female" && checked) setGender("Female");
    else return;
  };

  const handleOnCreate = async () => {
    addInfo.mutate(request);
  };

  const handleOnEdit = () => {
    editInfo.mutate(request);
  };

  return (
    <div>
      <div style={{ display: "flex", alignContent: "center", justifyContent: "center", gap: "20px" }}>
        <TextField
          id="outlined-basic"
          label="이름"
          name="name"
          variant="outlined"
          value={name}
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
        <Button variant="outlined" onClick={handleOnEdit}>
          수정
        </Button>
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        {data?.pages
          .map((page) => page.list)
          .flat()
          .map((v: any, index) => (
            <div style={{ display: "flex", gap: "20px", alignContent: "center", justifyContent: "center" }} key={v.id}>
              <p>No. {v.id}</p>
              <p>이름 : {v.name}</p>
              <p>이메일 : {v.email}</p>
              <p>성별: {v.gender === "Male" ? "남" : "여"}</p>
            </div>
          ))}
      </div>
      <div ref={ref} />
    </div>
  );
}

export default App;
