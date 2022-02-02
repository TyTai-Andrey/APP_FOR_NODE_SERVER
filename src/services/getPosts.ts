
const getPosts = async (token: string) => {
  try {
    const rawResponse = await fetch(
      `/api/post/`,
      {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );
    if (rawResponse.ok) {
      const response = await rawResponse.json();
      return response;
    }
    return false;
  } catch {
    return false;
  }
};

export default getPosts;
