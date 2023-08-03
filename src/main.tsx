// /** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient, useInfiniteQuery, useQuery } from "react-query";
import { useInView } from "react-intersection-observer";

import { jsx, css } from "@emotion/react";

import { styled } from "@mui/material/styles";
import { Grid, Box } from "@material-ui/core";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControlLabel from "@mui/material/FormControlLabel";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

import { editData, getData, getInfinitData, setData } from "./apis";
import Insert from "./insert";
import { useRecoilValue } from "recoil";
import { keywordState } from "./store";

function Main() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { ref, inView } = useInView();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("Male");

  const keyword = useRecoilValue(keywordState);

  const request = {
    name: name,
    email: email,
    gender: gender,
  };

  const testFecth = useQuery(["test"], async () => await getData(keyword));

  console.log("keyword", keyword);
  console.log("data", testFecth);
  // 데이터 조회
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

  useEffect(() => {
    testFecth.refetch();
  }, [keyword]);

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

  const handleOnCreate = () => {
    addInfo.mutate(request);
    setEmail("");
    setName("");
  };

  const handleOnEdit = () => {
    editInfo.mutate(request);
  };

  const StyledPaper = styled(Paper)(({ theme }) => ({
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)",
    ":hover": {
      boxShadow: "0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22)",
    },
    transition: "all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)",
    padding: theme.spacing(2),
    maxWidth: "1000px",
    color: theme.palette.text.primary,
    cursor: "pointer",
  }));

  const noMargin = css`
    margin: 0;
  `;

  return (
    <div
      css={css`
        padding: 20px;
      `}
    >
      <div style={{ display: "flex", alignContent: "center", justifyContent: "center", gap: "20px" }}>
        {/* <TextField
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
        </Button> */}
        <Insert />
      </div>

      {/* {data?.pages
        .map((page) => page.list)
        .flat()
        .map((v: any, index) => (
          <>
            <Box sx={{ flexGrow: 1, overflow: "hidden", px: 3 }}>
              <StyledPaper
                sx={{
                  my: 1,
                  mx: "auto",
                  p: 2,
                }}
                onClick={() => {
                  navigate(`/detail/${v.id}`);
                }}
              >
                <Grid container wrap="nowrap" spacing={2}>
                  <Grid item xs={12}>
                    <Typography noWrap sx={{ display: "flex", gap: "20px", justifyContent: "center" }}>
                      <p css={noMargin}>No.{v.id}</p>
                      <p css={noMargin}>이름 : {v.name}</p>
                      <p css={noMargin}>이메일 : {v.email}</p>
                      <p css={noMargin}>성별: {v.gender === "Male" ? "남" : "여"}</p>
                    </Typography>
                  </Grid>
                </Grid>
              </StyledPaper>
            </Box>
          </>
        ))}
      <div ref={ref} /> */}
      {testFecth?.data?.map((v: any) => (
        <>
          <p css={noMargin}>No.{v.id}</p>
          <p css={noMargin}>이름 : {v.name}</p>
          <p css={noMargin}>이메일 : {v.email}</p>
          <p css={noMargin}>성별: {v.gender === "Male" ? "남" : "여"}</p>
        </>
      ))}
    </div>
  );
}

export default Main;
