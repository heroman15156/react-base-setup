import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../api/axios.ts";
import { Link } from "react-router-dom";

const getUser = () => {
  return axiosInstance.get("/users/error-500").then((resp) => resp.data);
};

export default function PostPage() {
  const { data } = useQuery({
    queryKey: ["user", "test"],
    queryFn: getUser,
    throwOnError: true,
  });

  console.log(data, "data");

  // console.log(data, "data");

  return (
    <div>
      POST <Link to="/">Home</Link>
    </div>
  );
}
