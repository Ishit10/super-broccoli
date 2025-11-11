import React, { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate, useParams } from "react-router-dom";

export default function AddEditProduct({ editMode }) {
  const navigate = useNavigate();
  const params = useParams();

  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editMode && params.id) {
      (async () => {
        try {
          const res = await api.get("/products");
          const found = res.data.find((p) => p._id === params.id);
          if (found) {
            setName(found.name);
            setDesc(found.description);
            setPrice(found.price);
          } else {
            alert("Product not found");
            navigate("/products");
          }
        } catch {
          alert("Error loading product");
        }
      })();
    }
  }, [editMode, params.id]);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      if (editMode) {
        await api.put(`/products/${params.id}`, { name, description: desc, price });
      } else {
        await api.post("/products", { name, description: desc, price });
      }
      navigate("/products");
    } catch (err) {
      setErr(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        <h2 style={styles.title}>{editMode ? "Edit Product" : "Add Product"}</h2>
        <p style={styles.subtitle}>
          {editMode ? "Update the details below" : "Fill in the details to add a new product"}
        </p>

        {err && <div style={styles.error}>{err}</div>}

        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            style={styles.input}
            placeholder="Product Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <textarea
            style={{ ...styles.input, height: "100px", resize: "none" }}
            placeholder="Description"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            required
          />
          <input
            style={styles.input}
            type="number"
            placeholder="Price (₹)"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
          <button type="submit" style={styles.button} disabled={loading}>
            {loading ? "Saving..." : editMode ? "Save Changes" : "Add Product"}
          </button>
          <button
            type="button"
            style={styles.secondaryButton}
            onClick={() => navigate("/products")}
          >
            ← Back to Products
          </button>
        </form>
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
    background: "rgba(255, 255, 255, 0.95)",
    padding: "40px",
    borderRadius: "16px",
    boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
    width: "100%",
    maxWidth: "500px",
  },
  title: {
    fontSize: "24px",
    fontWeight: "600",
    color: "#333",
    marginBottom: "5px",
    textAlign: "center",
  },
  subtitle: {
    color: "#666",
    textAlign: "center",
    marginBottom: "25px",
  },
  error: {
    background: "#ffefef",
    color: "#d9534f",
    padding: "10px",
    borderRadius: "8px",
    marginBottom: "15px",
    textAlign: "center",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  input: {
    padding: "12px",
    borderRadius: "10px",
    border: "1px solid #ccc",
    fontSize: "15px",
    outline: "none",
    transition: "0.3s ease",
  },
  button: {
    background: "#667eea",
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    padding: "12px",
    fontSize: "16px",
    fontWeight: "500",
    cursor: "pointer",
    transition: "0.3s ease",
  },
  secondaryButton: {
    background: "#eee",
    color: "#333",
    border: "none",
    borderRadius: "10px",
    padding: "10px",
    fontSize: "15px",
    cursor: "pointer",
    transition: "0.3s ease",
  },
};
