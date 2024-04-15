import { useAtom } from 'jotai';
import { cartListAtom } from '@/store';
import { Container, Navbar, Nav } from "react-bootstrap";
import Link from 'next/link';
import { useRouter } from "next/router";
import { readToken, removeToken } from "@/lib/authenticate";

export default function Layout(props) {

  const [cartList, setCartList] = useAtom(cartListAtom);
  const router = useRouter();
  let token = readToken();
  

  function logout() {
    removeToken();
    setCartList([]);
    router.push("/");
  }

  return (
    <>
    <Navbar bg="light" expand="lg" style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000 }}>
      <Container>
      
        <Link href="/" passHref legacyBehavior><Navbar.Brand >WEB Product Online Shopping</Navbar.Brand></Link>&nbsp;&nbsp;{token && <>- Welcome: {token.userName}</>}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {!token &&<Link href="/" passHref legacyBehavior ><Nav.Link>&nbsp;&nbsp;&nbsp;Home</Nav.Link></Link>}  
            {token && <Link href="/products" passHref legacyBehavior><Nav.Link>&nbsp;&nbsp;&nbsp;Products</Nav.Link></Link>}
          </Nav>
          <Nav className="ml-auto">
          {token && <Link href="/cart" passHref legacyBehavior><Nav.Link>Shopping Cart <span>({cartList.length})</span></Nav.Link></Link>}
            {!token && <Link href="/login" passHref legacyBehavior><Nav.Link>Login</Nav.Link></Link>}
            {token && <Nav.Link onClick={logout}>Logout</Nav.Link>}
            
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    <br></br>
    <br></br>
    <br></br>
      {props.children}
    </>
  )
}
