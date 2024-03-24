const BASE_URL = `${process.env.NEXT_PUBLIC_API_DOMAIN}/properties`;

export const getAll = async () => {
  try {
    const res = await fetch(BASE_URL);
    if (!res.ok) {
      throw new Error("Error fetching properties.");
    }
    const resBody = await res.json();
    return resBody;
  } catch (error) {
    console.log(error);
  }
};

export const getById = async (id: string) => {
  try {
    const res = await fetch(`${BASE_URL}/${id}`);
    if (!res.ok) {
      throw new Error("Error fetching properties.");
    }
    const resBody = await res.json();
    return resBody;
  } catch (error) {
    console.log(error);
  }
};
