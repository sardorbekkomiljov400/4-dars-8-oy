"use client";
import { CategoryType, ProductType } from "@/@types";
import Link from "next/link";
import debounce from "@/components/debounce";
import { useEffect, useState } from "react";

interface ProductsProps {
  products: ProductType[];
  categories: CategoryType[];
}

const Products = ({ products, categories }: ProductsProps) => {
  const [productList, setProductList] = useState<ProductType[]>(products);
  const [category, setCategory] = useState<string>("");
  const [search, setSearch] = useState<string>("");

  const searchValue = debounce(search, 700);

  // API base URL (lokal development va production uchun)
  const API_URL =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

  // Fetch products on search/category change
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(
          `${API_URL}/products?categoryId=${category}&name_like=${searchValue}`
        );
        const data = await res.json();
        setProductList(data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    if (searchValue || category) {
      fetchProducts();
    } else {
      setProductList(products);
    }
  }, [searchValue, category]);

  // DELETE product
  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    try {
      const res = await fetch(`${API_URL}/products/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setProductList(productList.filter((p) => p.id !== id));
        alert("Product deleted successfully!");
      } else {
        alert("Failed to delete product");
      }
    } catch (error) {
      console.error("Delete error:", error);
      alert("Failed to delete product");
    }
  };

  // UPDATE product
  const handleUpdate = async (product: ProductType) => {
    const newName = prompt("Enter new product name", product.name);
    const newPrice = prompt("Enter new price", String(product.price));

    if (!newName || !newPrice) return;

    const priceNumber = Number(newPrice);
    if (isNaN(priceNumber)) {
      alert("Price must be a number");
      return;
    }

    try {
      const res = await fetch(`${API_URL}/products/${product.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newName, price: priceNumber }),
      });

      if (res.ok) {
        setProductList(
          productList.map((p) =>
            p.id === product.id ? { ...p, name: newName, price: priceNumber } : p
          )
        );
        alert("Product updated successfully!");
      } else {
        alert("Failed to update product");
      }
    } catch (error) {
      console.error("Update error:", error);
      alert("Failed to update product");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-5">
      {/* Search + Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="🔍 Search product..."
          className="flex-1 border p-3 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
        />
        <select
          value={category || "0"}
          onChange={(e) =>
            setCategory(e.target.value === "0" ? "" : e.target.value)
          }
          className="w-55 border p-3 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
        >
          <option value="0">All Categories</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      {/* Products grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {productList.map((item) => (
          <div
            key={item.id}
            className="border rounded-2xl p-5 shadow-md hover:shadow-xl transition bg-white"
          >
            <div className="flex justify-between mb-3 text-gray-500 text-sm">
              <span>#{item.id}</span>
              <span>Category {item.categoryId}</span>
            </div>

            <h2 className="text-xl font-bold mb-2">{item.name}</h2>
            <p className="text-gray-600 mb-4">Premium Apple product</p>

            <div className="flex justify-between items-center mb-2">
              <span className="text-lg font-bold text-blue-600">${item.price}</span>
              <Link
                href={`/products/${item.id}`}
                className="px-4 py-2 bg-black text-white rounded-xl hover:bg-gray-800 transition"
              >
                More
              </Link>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => handleUpdate(item)}
                className="flex-1 px-3 py-2 bg-yellow-500 text-white rounded-xl hover:bg-yellow-600 transition"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(Number(item.id))}
                className="flex-1 px-3 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;