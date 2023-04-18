import axios from "axios";

export async function getData(url: string, species?: string) {
  const params = species ? { species } : {};
  const response = await axios.get(url, { params });

  return response.data;
}
