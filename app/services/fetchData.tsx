interface Response<T> {
  data: T[];
}

const fetchData = async <T,>(url: string): Promise<T[]> => {
  const res = await fetch(url, {
    next: {
      revalidate: 30,
    },
  });

  const json = await res.json();
  console.log("json", json);
  const data: T[] = json.data;

  return data;
};

export default fetchData;
