// import React, { useEffect, useState } from 'react'
// import './List.css'
// import axios from "axios"
// import {toast} from "react-toastify"

// const List = ({url}) => {

//   const [list,setList] = useState([]);

//   const fetchList = async () => {
//     const response = await axios.get(`${url}/api/food/list`);
//     console.log(response.data);

//     if(response.data.success) {
//       setList(response.data.data);
//     }
//     else{
//       toast.error("Error")
//     }
//   }

// const removeFood = async (foodId) => {
//   const response = await axios.post(`${url}/api/food/remove`,{id:foodId})
//   await fetchList();
//   if(response.data.success){
//     toast.success(response.data.message)
//   }
//   else{
//     toast.error("Error");
//   }
// }

//   useEffect (() => {
//     fetchList();
//   },[])

//   return (
//     <div className="list add flex-col">
//       <p>All Product List</p>
//       <div className="list-table">
//         <div className="list-table-format title">
//             <b>Image</b>
//             <b>Name</b>
//             <b>Category</b>
//             <b>Price</b>
//             <b>Action</b>
//         </div>
//         {list.map((item,index) => {
//           return (
//             <div key={index} className='list-table-format'>
//                 <img src={`${url}/images/`+item.image} alt="" />
//                 <p>{item.name}</p>
//                 <p>{item.category}</p>
//                 <p>${item.price}</p>
//                 <p onClick={()=>removeFood(item._id)}>X</p>
//             </div>
//           )
//         })}
//       </div>
//     </div>
//   )
// }

// export default List
import React, { useEffect, useState } from "react";
import "./List.css";
import axios from "axios";
import { toast } from "react-toastify";

const List = ({ url }) => {
  const [list, setList] = useState([]);
  const [editingItem, setEditingItem] = useState(null); // Item to edit
  const [updatedData, setUpdatedData] = useState({}); // Holds updated values for editing

  // Fetch the list of items
  const fetchList = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`);
      if (response.data.success) {
        setList(response.data.data);
      } else {
        toast.error("Failed to fetch the product list.");
      }
    } catch (error) {
      toast.error("Error fetching product list.");
    }
  };

  // Remove a food item
  const removeFood = async (foodId) => {
    try {
      const response = await axios.post(`${url}/api/food/remove`, {
        id: foodId,
      });
      if (response.data.success) {
        toast.success(response.data.message);
        fetchList();
      } else {
        toast.error("Failed to remove the product.");
      }
    } catch (error) {
      toast.error("Error removing product.");
    }
  };

  // Open the edit modal and populate it with the selected item's data
  const handleEditClick = (item) => {
    setEditingItem(item);
    setUpdatedData({
      name: item.name,
      category: item.category,
      price: item.price,
    });
  };

  // Handle changes in the edit modal
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedData((prev) => ({ ...prev, [name]: value }));
  };

  // Submit the edited item
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`${url}/api/food/edit`, {
        id: editingItem._id,
        ...updatedData,
      });
      if (response.data.success) {
        toast.success("Item updated successfully!");
        fetchList();
        setEditingItem(null); // Close modal
      } else {
        toast.error("Failed to update the item.");
      }
    } catch (error) {
      toast.error("Error updating item.");
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="list">
      <p>All Product List</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Actions</b>
        </div>
        {list.map((item, index) => (
          <div key={index} className="list-table-format">
            <img src={`${url}/images/` + item.image} alt={item.name} />
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>${item.price}</p>
            <div>
              <button onClick={() => handleEditClick(item)}>Edit</button>
              <button
                className="remove-btn"
                onClick={() => removeFood(item._id)}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      {editingItem && (
        <div className="edit-modal">
          <div className="edit-modal-content">
            <h3>Edit Product</h3>
            <form onSubmit={handleEditSubmit}>
              <label>
                Name:
                <input
                  type="text"
                  name="name"
                  value={updatedData.name}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                Category:
                <select
                  name="category"
                  value={updatedData.category}
                  onChange={handleChange}
                  required
                >
                  <option value="Stationaries">Stationaries</option>
                  <option value="Beauty_Products">Beauty Products</option>
                  <option value="Baby_Products">Baby Products</option>
                  <option value="Vegetables">Vegetables</option>
                  <option value="Fruits">Fruits</option>
                  <option value="Baking_Products">Baking Products</option>
                  <option value="Cereals_and_Pulses">Cereals and Pulses</option>
                </select>
              </label>
              <label>
                Price:
                <input
                  type="number"
                  name="price"
                  value={updatedData.price}
                  onChange={handleChange}
                  required
                />
              </label>
              <div className="custom-edit-modal-actions">
                <button type="submit" className="custom-save-button">
                  Save Changes
                </button>
                <button
                  type="button"
                  className="custom-cancel-button"
                  onClick={() => setEditingItem(null)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default List;
