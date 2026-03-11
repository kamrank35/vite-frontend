import { useEffect, useState } from "react";
import { getItems } from "../services/api";
import Table from "../components/Table";

function ItemList() {

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      setLoading(true);

      const res = await getItems();
      setItems(res.data);

    } catch (error) {
      console.error(error);
      
    }
    finally{
      setLoading(false);
    }
  };
  if (loading) {
    return <p className="text-center mt-4">Loading items...</p>;
  }

  if (error) {
    return <p className="text-danger text-center mt-4">{error}</p>;
  }
  return (
    <div className="container mt-4">
      <h2>Item List</h2>
      {loading ? (
        <p className="text-center">Loading items...</p>
        ) : (
        <Table data={items} refreshedItems={fetchItems} />
      )}
    </div>
  );
}

export default ItemList;