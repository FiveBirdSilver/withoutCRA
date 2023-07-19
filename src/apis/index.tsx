import axios from "axios";

interface Props {
  title: string;
  email: string;
  gender: string;
}

// 리스트 조회
const getData = async () => {
  const result = await axios("http://localhost:8080/data");
  if (result.status === 200) return result.data;
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

export { getData, setData };