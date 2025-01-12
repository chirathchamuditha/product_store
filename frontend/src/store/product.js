import { create } from "zustand"

export const useProductStore = create((set) => ({
	products: [],
	setProducts: (product) => set({ product }),
	createProduct: async (newProduct) => {
		if (!newProduct.name || !newProduct.image || !newProduct.price) {
			return { success: false, message: "Please fill in all fields." };
		}
		const res = await fetch("/api/product", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(newProduct),
		});

        if (!res.ok) {
			const errorMessage = await res.text(); // Get error message
			return { success: false, message: errorMessage || "Failed to create product." };
		}
		const data = await res.json();
        set((state) => ({ products: [...state.products, data.data] }));
		return { success: true, message: "Product created successfully" };
	},

	fetchProducts: async () => {
		const res = await fetch("/api/product");
		const data = await res.json();
		set({products: data.data})
	},

	deleteProduct: async (pid) => {
		const res = await fetch(`/api/product/${pid}` , {
			method: "DELETE",
		})
		const data = await res.json();
		if(!data.success) return { success: false, message: data.message};
		
		//update the ui immediately without refreshing
		set(state => ({ products: state.products.filter(product => product._id !== pid)}))
		return { success: true, message: data.message}
	},

	updateProduct: async (pid, updatedProduct) => {
		// Validate the input
		if (!updatedProduct.name || !updatedProduct.image || !updatedProduct.price) {
		  return { success: false, message: "Please fill in all fields." };
		}
	  
		// Send the update request to the server
		const res = await fetch(`/api/product/${pid}`, {
		  method: "PUT",
		  headers: {
			"Content-Type": "application/json",
		  },
		  body: JSON.stringify(updatedProduct),
		});
	  
		// Handle response from the server
		if (!res.ok) {
		  const errorMessage = await res.text(); // Get error message if available
		  return { success: false, message: errorMessage || "Failed to update product." };
		}
	  
		const data = await res.json();
	  
		
		set((state) => ({
		  products: state.products.map((product) =>
			product._id === pid ? { ...product, ...updatedProduct } : product
		  ),
		}));
	  
		return { success: true, message: "Product updated SuccessFully" };
	  },
	  

	

	

}))