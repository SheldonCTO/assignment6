import { useAtom } from "jotai";
import { cartListAtom } from "@/store";
import Image from "next/image";

export default function ProductBox(props) {
  // You can destructure the product object for easier access to its properties
  const { product } = props;
  const [cartList, setCartList] = useAtom(cartListAtom);

  function addToCart(product) {
    setCartList((prevCartList) => [...prevCartList, product]);
  }
  if (!product) return null; // If there's no product, don't render anything

  return (
    <div>
      <Image
        src={product.image}
        alt={product.title}
        width={200} // Specify width
        height={200} // Specify height
        objectFit="cover"
      />
      <p>
        <strong>Title:</strong> {product.title}
      </p>
      <p>
        <strong>Price:</strong> ${product.price}
      </p>
      <p>
        <strong>Description:</strong> {product.description}
      </p>
      <p>
        <strong>Category:</strong> {product.category}
      </p>
      <button onClick={(e) => addToCart(product)}>Add to Cart</button>
    </div>
  );
}
