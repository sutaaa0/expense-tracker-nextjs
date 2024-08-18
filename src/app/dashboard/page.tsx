// src/app/page.tsx
import { useEffect, useState } from 'react';
import axios from '../../utils/axios';

const HomePage = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/endpoint'); // Ganti dengan endpoint yang sesuai
        setData(response.data);
      } catch (err) {
        setError('Error fetching data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Home Page</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default HomePage;
