import { Card, Form, Alert, Button } from "react-bootstrap";
import { useState, useEffect } from 'react';
import { newUser, authenticateUser} from "@/lib/authenticate";
import { useRouter } from 'next/router';



export default function SignUp(props) {

	const [warning, setWarning] = useState("");
	const [user, setUser] = useState("");
	const [password, setPassword] = useState("");
	const [password2, setPassword2] = useState("");
	const [fullName, setFullName] = useState("");
	const router = useRouter();
  
  async function loginFunc (userName, password){
    try{
      await authenticateUser(userName, password); 
      router.push("/products");
    }catch(err){
      setWarning({message: err.message, type: "danger"});
    } 
  };
  
  
	async function handleSubmit(e) {
	  e.preventDefault();
  
	  try{
		await newUser(user, password, password2, fullName);
    loginFunc(user, password);
		
  
	  }catch(err){
	   setWarning({message: err.message, type: "danger"});
	  }
  
	}

	return(
		<>
		 <Card bg="light">
        <Card.Body>
          <h2>Sign-UP</h2>
          Enter your information below:
        </Card.Body>
      </Card>

      <br />
	  <Form onSubmit={handleSubmit}>
        <Form.Group >
          <Form.Label>UserName:</Form.Label>
          <Form.Control type="text" value={user} id="userName" name="userName" onChange={e => setUser(e.target.value)} />
        </Form.Group>
        <br />
		
        <Form.Group>
          <Form.Label>Password:</Form.Label>
          <Form.Control type="password" value={password} id="password" name="password" onChange={e => setPassword(e.target.value)} />
        </Form.Group  >
		<br />
		
        <Form.Group>
          <Form.Label>Confirm Password:</Form.Label>
          <Form.Control type="password2" value={password2} id="password2" name="password2" onChange={e => setPassword2(e.target.value)} />
        </Form.Group  >
		<br />
		
        <Form.Group>
          <Form.Label>Full Name:</Form.Label>
          <Form.Control type="fullName" value={fullName} id="fullName" name="fullName" onChange={e => setFullName(e.target.value)} />
        </Form.Group  >

        {warning && <>
          <br />
          <Alert variant={warning.type}>
            {warning.message}
          </Alert>
        </>}

        <br />
        <Button variant="primary" className="pull-right" type="submit">Submit</Button>
      </Form>
		</>
	)
}