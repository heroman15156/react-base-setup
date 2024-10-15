import axiosInstance from "../api/axios.ts";

type RandomData = {
  created_at: string;
  icon_url: string;
  id: string;
  updated_at: string;
  url: string;
  value: string;
};

async function fetchRandomData(): Promise<RandomData> {
  const result = await axiosInstance
    .get<RandomData>("/jokes/random")
    .then((resp) => resp.data);
  return result;
}

export { fetchRandomData };
