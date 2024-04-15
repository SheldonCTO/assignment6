import { useEffect, useState } from 'react';
import Modal from '../components/modal';
import ProductBox from '../components/productBox';
import { readToken } from "@/lib/authenticate";
import Image from 'next/image';

export default function Products() {
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [showLoginSuccessModal, setShowLoginSuccessModal] = useState(false);
    const [loginModalDisplayed, setLoginModalDisplayed] = useState(false);

    useEffect(() => {
        // Fetch products from the API
        fetch('https://fakestoreapi.com/products')
            .then((res) => res.json())
            .then(setProducts)
            .catch((error) => console.error('Error fetching products:', error));
    }, []);

    // Function to handle clicking on a product row
    const handleRowClick = (product) => {
        setSelectedProduct(product);
    };

    // Function to close the modal
    const handleCloseModal = () => {
        setSelectedProduct(null);
    };

    useEffect(() => {
        const token = readToken();
        const isLoginModalDisplayed = sessionStorage.getItem('loginModalDisplayed');
        if (token && !isLoginModalDisplayed) {
            setShowLoginSuccessModal(true);
            sessionStorage.setItem('loginModalDisplayed', true);
            setLoginModalDisplayed(true); // Set loginModalDisplayed to true once the login success modal is displayed
        }
    }, []);

    const handleLoginClose = () => {
        setShowLoginSuccessModal(false);
    };

    return (
        <div className="container">
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col" style={{width:"200px"}}>Title</th>
                        <th scope="col"style={{width:"70px"}}>Price</th>
                        <th scope="col">Image</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product.id} onClick={() => handleRowClick(product)}>
                            <td style={{width:"200px"}}>{product.title}</td>
                            <td style={{width:"70px"}}>${product.price}</td>
                            <td style={{width:"105px"}}>
                                {/* <img src={product.image} alt={product.title} style={{ width: '100px', height: 'auto' }} /> */}
                            <Image
                  src={product.image}
                  alt={product.title}
                  width={100} // Required width
                  height={100} // Required height, adjust as necessary to maintain aspect ratio
                  objectFit="contain" // This makes the image scale nicely within the dimensions
                />
                </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {selectedProduct && (
                <Modal onClose={handleCloseModal}>
                    <ProductBox product={selectedProduct} />
                </Modal>
            )}
            {showLoginSuccessModal && (
                <Modal id="Login-Success" show={showLoginSuccessModal} onClose={handleLoginClose}>
                    <div>Login Success!</div>
                </Modal>
            )}
        </div>
    );
}
