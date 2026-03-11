import { Link,useNavigate } from "react-router-dom";
import { deleteItem } from "../services/api.js";
import Swal from "sweetalert2";
function Table({ data, refreshedItems }) {
  const navigate = useNavigate();
  const handleDelete = async (id) => {
    const confirmDelete = await Swal.fire({
      title: "Are you sure?",
      text: "This item will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel"
  });
    if (!confirmDelete.isConfirmed) return;

    try {

      await deleteItem(id);

      Swal.fire(
        "Deleted!",
        "Your item has been deleted.",
        "success"
      );

      refreshedItems(); // reload items
      // navigate("/items"); 


    } catch (error) {
      console.error(error);
      Swal.fire(
        "Error!",
        "Failed to delete item.",
        "error"
      );
    }
  };
    

  return (
    <div className="table-responsive">
    <table className="table table-bordered table-striped">
      <thead className="table-dark">
        <tr>
          <th>ID</th>
          <th>Image</th>
          <th>Item Name</th>
          <th>Price</th>
          <th>Action</th>
        </tr>
      </thead>

      <tbody>
        {data.map((item) => (
          <tr key={item.id}>
            <td>{item.id}</td>

            <td>
              {item.image && (
                <img
                  src={`http://localhost:5000/uploads/${item.image}`}
                  alt={item.name}
                  className="img-fluid"
                  width="60"
                />
              )}
            </td>

            <td>{item.name}</td>
            <td>{item.price}</td>
            <td ><Link
  to={`/edit/${item.id}`}
  className="btn btn-warning btn-sm m-1"
>
  Edit
</Link>
<button type="button" className="btn btn-danger btn-sm m-1" onClick={() => handleDelete(item.id)}>Dalete</button>
</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  );
}

export default Table;