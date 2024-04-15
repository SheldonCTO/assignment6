import Image from 'next/image';
import { useEffect, useState } from "react";


export default function Home() {
  const [categories, setCategories] = useState({});


  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => {
        const productCategories = {};

        data.forEach((product) => {
          const { category, image } = product;

          if (!productCategories[category]) {
            productCategories[category] = image;
          }
        });

        setCategories(productCategories);
      })
      .catch((error) => {
        console.log("Error when fetching products: ", error);
      });
  }, []);

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h2>Our Products</h2>
        <p>
          The API used in this website consists of 4 main product categories:
        </p>
        
      
        <br />
        <div style={{ maxWidth:"auto"}}>
          

            <div style={{ width:"auto", display:'flex'}}>
              {Object.entries(categories).map(([category, image]) => (
                <div
                  key={category}
                  style={{ margin: "20px" }}
                  
                >
                  <strong>{category.toLocaleUpperCase()}</strong>
                  <br />
                 <Image src={image} alt={category}width={200} height={200} objectFit="cover"/>
                   
                 
                </div>
              ))}


            </div>
        
         
        </div>
      </div>
    </>
  );
}
