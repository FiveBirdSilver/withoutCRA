import { useParams } from "react-router-dom";

function Detail(props: any) {
  const { id } = useParams();
  return <div>Hello {id}</div>;
}
export default Detail;
