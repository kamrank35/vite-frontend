import { useState } from "react";
import { addItem } from "../services/api.js";

function AddItem() {

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);

    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(!validateForm()) return;

    if (price <= 0) {
      alert("Price must be positive");
      return;
    }

    const formData = new FormData();

    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("image", image);

    setLoading(true);

    try {
      await addItem(formData); // calling API service

      setMessage("Item added successfully");

      // Reset form
      setName("");
      setDescription("");
      setPrice("");
      setImage(null);
      setPreview(null);

    } catch (error) {
      console.error(error);

      setMessage("Failed to add item");

    }
    finally{
      setLoading(false);
    }
  };
  const validateForm = () => {
  let newErrors = {};

  if (!name.trim()) {
    newErrors.name = "Item name is required";
  }

  if (!price) {
    newErrors.price = "Price is required";  
  } else if (price <= 0) {
    newErrors.price = "Price must be greater than 0";
  }

  setErrors(newErrors);

  return Object.keys(newErrors).length === 0;
};

  return (
    <div className="container mt-4">
      {message && ( 
  <div className="alert alert-warning alert-dismissible fade show" role="alert">
  <strong>{message}</strong>
  <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
</div>
)}
    <div className="col-lg-12 col-md-8 col-sm-6">
      <h2>Add Item</h2>

      <form onSubmit={handleSubmit}>

        {/* Name */}
        <div className="mb-3">
          <label className="form-label">Item Name:</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            // required
          />

          {errors.name && (
    <div className="text-danger">{errors.name}</div>
  )}
        </div>

        {/* Description */}
        <div className="mb-3">
          <label className="form-label">Description:</label>
          <textarea
            className="form-control"
            rows="3"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        {/* Price */}
        <div className="mb-3">  
          <label className="form-label">Price:</label>
          <input
            type="number"
            className="form-control"
            // min="1"
            // required
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />

          {errors.price && (
    <div className="text-danger">{errors.price}</div>
  )}
        </div>

        {/* Image Upload */}
        <div className="mb-3">
          <label className="form-label">Upload Image:</label>
          <input
            type="file"
            className="form-control"
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>

        {/* Image Preview */}
        {preview && (
          <div className="mb-3">
            <p>Image Preview:</p>
            <img
              src={preview}
              alt="Preview"
              style={{ width: "150px", borderRadius: "5px" }}
            />
          </div>
        )}

        <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? "Adding..." : "Add Item"}
        </button>

      </form>
      </div>
    </div>
  );
}

export default AddItem;