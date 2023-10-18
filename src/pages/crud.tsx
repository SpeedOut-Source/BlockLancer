import { useState, useEffect } from "react";
import { type Shop } from "./api/firebaseCRUD";
import { v4 as uuidv4 } from "uuid";

const apiUrl = "/api/firebaseCRUD";

const FirebaseCRUDComponent = () => {
  const [data, setData] = useState<Shop[] | null>();
  const [newData, setNewData] = useState("");
  const [updateData, setUpdateData] = useState({ id: "", name: "" });
  const [deleteData, setDeleteData] = useState("");

  const fetchData = async () => {
    try {
      const response = await fetch(apiUrl);
      if (response.ok) {
        const jsonData = (await response.json()) as Shop[];
        setData(jsonData);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const createData = async () => {
    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: uuidv4(), name: newData }),
      });

      if (response.ok) {
        await fetchData();
        setNewData("");
      }
    } catch (error) {
      console.error("Error creating data:", error);
    }
  };

  const updateDataItem = async () => {
    try {
      const response = await fetch(apiUrl, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateData),
      });

      if (response.ok) {
        await fetchData();
        setUpdateData({ id: "", name: "" });
      }
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  const deleteDataItem = async () => {
    try {
      const response = await fetch(apiUrl, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: deleteData }),
      });

      if (response.ok) {
        await fetchData();
        setDeleteData("");
      }
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  useEffect(() => {
    void fetchData();
  }, []);

  return (
    <div>
      <h2>Firebase CRUD Example</h2>
      <h3>Read Data:</h3>
      <ul>
        {data ? (
          data.map((item) => <li key={item.id}>{JSON.stringify(item)}</li>)
        ) : (
          <></>
        )}
      </ul>
      <h3>Create Data:</h3>
      <input
        type="text"
        placeholder="New Data"
        value={newData}
        onChange={(e) => setNewData(e.target.value)}
      />
      <button onClick={() => void createData()}>Create Data</button>

      <h3>Update Data:</h3>
      <input
        type="text"
        placeholder="ID to Update"
        value={updateData.id}
        onChange={(e) => setUpdateData({ ...updateData, id: e.target.value })}
        required
      />
      <input
        type="text"
        placeholder="Updated Data"
        value={updateData.name}
        onChange={(e) => setUpdateData({ ...updateData, name: e.target.value })}
        required
      />
      <button onClick={() => void updateDataItem()}>Update Data</button>

      <h3>Delete Data:</h3>
      <input
        type="text"
        placeholder="ID to Delete"
        value={deleteData}
        onChange={(e) => setDeleteData(e.target.value)}
        required
      />
      <button onClick={() => void deleteDataItem()}>Delete Data</button>
    </div>
  );
};

export default FirebaseCRUDComponent;
