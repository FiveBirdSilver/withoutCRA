import axios from "axios";

interface Props {
  name: string;
  email: string;
  gender: string;
}

// 리스트 조회
const getData = async (req: string) => {
  const result = await axios.get(`http://localhost:8080/data?name=${req}`);
  if (result.status === 200) return result.data;
};

// 리스트 무한 스크롤
const getInfinitData = async (page: number, keyword: string) => {
  const limit = 20;
  const result = await axios.get(`http://localhost:8080/data?name=${keyword}&_page=${page}&_limit=${limit}`);
  const notKeywordResult = await axios.get(`http://localhost:8080/data?_page=${page}&_limit=${limit}`);

  if (keyword !== "" && result.status === 200) return result.data;
  else if (notKeywordResult.status === 200) return notKeywordResult.data;
};

// 리스트 추가
const setData = async (data: Props) => {
  const result = await axios.post("http://localhost:8080/data", data, {
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  if (result.status === 201) return "success";
};

// 리스트 수정
const editData = async (data: Props) => {
  const result = await axios.patch("http://localhost:8080/data/3", data, {
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  if (result.status === 201) return "success";
};
export { getData, getInfinitData, setData, editData };
