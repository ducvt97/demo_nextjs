import { IProperty } from "@/models/property";

const BASE_URL = `${process.env.PUBLIC_API_DOMAIN}/properties`;

export const getAll = async () => {
  const res = await fetch(`${BASE_URL}/`);
  console.log(res.json());

  return res.json();
};
