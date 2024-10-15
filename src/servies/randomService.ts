import { fetchRandomData } from "../repositories/randomRepository.ts";

const getRandomData = async () => {
  return await fetchRandomData();
};

export { getRandomData };
