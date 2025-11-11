import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api, { setAuthToken } from "../services/api";

function Products() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name: "", price: "", description: "" });

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) setAuthToken(token);
    else navigate("/login");
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await api.get("/products");
      setProducts(res.data);
    } catch (err) {
      console.error(err);
      if (err.response?.status === 401) navigate("/login");
    }
  };

  const addProduct = async (e) => {
    e.preventDefault();
    try {
      await api.post("/products", form);
      setForm({ name: "", price: "", description: "" });
      fetchProducts();
    } catch {
      alert("Error adding product");
    }
  };

  const deleteProduct = async (id) => {
    try {
      await api.delete(`/products/${id}`);
      fetchProducts();
    } catch {
      alert("Error deleting product");
    }
  };

  const editProduct = (id) => {
    navigate(`/products/edit/${id}`);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setAuthToken(null);
    navigate("/login");
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        <div style={styles.header}>
          <h2 style={styles.title}>Your Products</h2>
          <button onClick={logout} style={styles.logoutBtn}>
            Logout
          </button>
        </div>

        <form onSubmit={addProduct} style={styles.form}>
          <input
            style={styles.input}
            placeholder="Product Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
          <input
            style={styles.input}
            placeholder="Price"
            type="number"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
            required
          />
          <input
            style={styles.input}
            placeholder="Description"
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
          />
          <button type="submit" style={styles.addBtn}>
            ➕ Add Product
          </button>
        </form>

        <ul style={styles.list}>
          {products.length === 0 && (
            <p style={{ color: "#666", textAlign: "center" }}>
              No products added yet.
            </p>
          )}
          {products.map((p) => (
            <li key={p._id} style={styles.listItem}>
              <div>
                <strong style={{ color: "#333" }}>{p.name}</strong>
                <p style={styles.desc}>
                  ₹{p.price} — {p.description || "No description"}
                </p>
              </div>
              <div>
                <button
                  onClick={() => editProduct(p._id)}
                  style={styles.editBtn}
                >
                  ✏️ Edit
                </button>
                <button
                  onClick={() => deleteProduct(p._id)}
                  style={styles.deleteBtn}
                >
                  ❌ Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "'Poppins', sans-serif",
    padding: "20px",
  },
  card: {
    background: "#fff",
    width: "100%",
    maxWidth: "700px",
    borderRadius: "12px",
    padding: "30px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  },
  title: {
    fontSize: "24px",
    color: "#333",
  },
  logoutBtn: {
    background: "#ff4b5c",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    padding: "8px 14px",
    cursor: "pointer",
    fontWeight: "500",
  },
  form: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr auto",
    gap: "10px",
    marginBottom: "20px",
  },
  input: {
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "15px",
  },
  addBtn: {
    background: "#667eea",
    color: "white",
    border: "none",
    borderRadius: "8px",
    padding: "10px",
    fontWeight: "500",
    cursor: "pointer",
    transition: "0.3s ease",
  },
  list: {
    listStyle: "none",
    padding: 0,
    marginTop: "10px",
  },
  listItem: {
    background: "#f9f9f9",
    borderRadius: "8px",
    padding: "12px 16px",
    marginBottom: "10px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    border: "1px solid #eee",
  },
  desc: {
    color: "#777",
    fontSize: "14px",
    marginTop: "4px",
  },
  editBtn: {
    background: "#4CAF50",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    padding: "6px 10px",
    cursor: "pointer",
    marginRight: "6px",
  },
  deleteBtn: {
    background: "#ff7675",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    padding: "6px 10px",
    cursor: "pointer",
  },
};

export default Products;
