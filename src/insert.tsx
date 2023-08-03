import { useSetRecoilState } from "recoil";
import { keywordState } from "./store";
import { useEffect, useState } from "react";

const Insert = () => {
  const [key, setkey] = useState("");
  const setKeyword = useSetRecoilState(keywordState);

  useEffect(() => {
    setKeyword("오세은");
  }, []);

  return (
    <div>
      <input onChange={(e) => setkey(e.target.value)} />
      <button onClick={() => setKeyword(key)}>검색</button>
    </div>
  );
};
export default Insert;
