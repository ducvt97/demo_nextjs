const BASE_URL = `${process.env.NEXT_PUBLIC_API_DOMAIN}/user`;

export const getUser = async (id: string) => {
  try {
    const res = await fetch(`${BASE_URL}/${id}`);
    if (!res.ok) {
      throw new Error("Error fetching user.");
    }
    const resBody = await res.json();
    return resBody;
  } catch (error) {
    console.log(error);
  }
};
