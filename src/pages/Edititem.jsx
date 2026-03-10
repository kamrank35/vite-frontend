import { useEffect, useState } from "react";
import { useParams,useNavigate } from "react-router-dom";
import { getItemById, updateItem } from "../services/API.JS";

function EditItem() {

  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [message, setMessage] = useState("");

  const handlenavigate = () => {
    navigate("/items");
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);

    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    fetchItem();
  }, []);

  const fetchItem = async () => {
    try {
      setLoading(true);

      const res = await getItemById(id);

      setName(res.data.name);
      setDescription(res.data.description);
      setPrice(res.data.price);

      if (res.data.image) {
        setPreview(`http://localhost:5000/uploads/${res.data.image}`);
      }

    } catch (error) {
      console.error(error);
    }
    finally{
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);

    if (image) {
      formData.append("image", image);
    }
    setLoading(true);
    try {
      await updateItem(id, formData);
      setMessage("Item Updated Successfully");



    } catch (error) {
      console.error(error);
      setMessage("Failed to update item");
    }
    finally{
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      {message && (
        <div className="alert alert-warning alert-dismissible fade show" role="alert">
          <strong>{message}</strong>
          <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={handlenavigate}></button>
        </div>
      
      )}

      <h2>Edit Item</h2>

      <form onSubmit={handleSubmit}>

        <div className="mb-3">
          <label>Item Name</label>
          <input
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label>Description</label>
          <textarea
            className="form-control"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label>Price</label>
          <input
            type="number"
            className="form-control"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label>Replace Image (optional)</label>
          <input
            type="file"
            className="form-control"
            onChange={handleImageChange}
          />
        </div>

        {preview && (
          <img src={preview} width="120" alt="preview" />
        )}

        <br />

        <button className="btn btn-primary mt-3" disabled={loading}>
          {loading ? "Updating..." : "Update Item"}

        </button>

      </form>

    </div>
  );
}

export default EditItem;