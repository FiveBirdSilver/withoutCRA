import { useEffect } from "react";
import { getData, setData } from "./apis";

function App() {
  const getPosts = async () => {
    const res = await getData();
    console.log(res);
  };

  const handleOnCreate = async () => {
    const res = await setData({
      title: "hohomin",
      email: "hohomin@gmail.com",
      gender: "male",
    });
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div>
      <button onClick={handleOnCreate}>리스트 추가</button>
    </div>
  );
}

export default App;
