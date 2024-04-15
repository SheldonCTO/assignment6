
import { atom } from "jotai";

// Define an atom to store the selected ID
// export const selectedIdAtom = atom(null);

// async function fetchProductData(selectedId) {
//   try {
//     const response = await fetch(`https://fakestoreapi.com/products/${selectedId}`);
//     if (!response.ok) {
//       throw new Error(`Failed to fetch product with ID ${selectedId}`);
//     }
//     const productData = await response.json();
//     return productData;
//   } catch (error) {
//     console.error("Error fetching product data:", error);
//     return null;
//   }
// }

export const cartListAtom = atom([]);
// export const cartListAtom = atom(async (get) => {
//   const selectedId = get(selectedIdAtom);
//   if (selectedId !== null) {
//     const productData = await fetchProductData(selectedId);
//     return productData ? [productData] : [];
//   } else {
//     return [];
//   }
// });
