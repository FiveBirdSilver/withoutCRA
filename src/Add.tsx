import { useSetRecoilState } from "recoil";
import { keywordState } from "./store";
import { useEffect, useState } from "react";
import { Button, Input } from "@mui/material";

const Insert = () => {
  const [key, setkey] = useState("");
  const setKeyword = useSetRecoilState(keywordState);

  return (
    <div>
      <Input onChange={(e) => setkey(e.target.value)} value={key} />
      <Button onClick={() => setKeyword(key)}>검색</Button>
    </div>
  );
};
export default Insert;
