interface Response<T> {
  data: T[];
}

const fetchData = async <T,>(url: string, revalidate = 30): Promise<T[]> => {
  const res = await fetch(url, {
    next: {
      revalidate: revalidate,
    },
  });

  const json = await res.json();
  const data: T[] = json.data;

  return data;
};
export async function fetchSingle<T>(url: string): Promise<T> {
  const res = await fetch(url, {
    next: {
      revalidate: 30,
    },
  });

  const json = await res.json();
  const data: T = json.data;

  return data;
}
export default fetchData;
