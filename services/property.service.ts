const BASE_URL = `${process.env.NEXT_PUBLIC_API_DOMAIN}/properties`;

export const getAll = async () => {
  try {
    const res = await fetch(BASE_URL, { cache: "no-cache" });
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

export const getByUser = async (id: string) => {
  try {
    const res = await fetch(`${BASE_URL}/user/${id}`);
    if (!res.ok) {
      throw new Error("Error fetching properties.");
    }
    const resBody = await res.json();
    return resBody;
  } catch (error) {
    console.log(error);
  }
};

export const deleteProperty = async (id: string) => {
  try {
    console.log('fvdfv');
    const res = await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
    console.log(res);
    
    if (!res.ok) {
      throw new Error("Error deleting property.");
    }
    const resBody = await res.json();
    return resBody;
  } catch (error) {
    console.log(error);
  }
};
