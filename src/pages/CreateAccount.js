import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const CreateAccountPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confPass, setConfiPass] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();
    
        const createAccount = async () => {
            try {
               if( password !== confPass){
                    setError(' Password and confirm password do not match');
                    return;
               }
               
               await createUserWithEmailAndPassword(getAuth(), email, password);
               navigate('/articles');

            } catch (error) {
                setError(error.message);
            }
            
        }
    
        return(
            <>
            <h1>  Create Account</h1>
            {error && <p className="error">{error}</p>}
            <input 
                placeholder="Your Email address"
                type="text" 
                value={email}
                onChange={ e=> setEmail(e.target.value)}
                ></input>
            <input 
                placeholder="Your Password"
                type="password" 
                value={password}
                onChange={ e => setPassword(e.target.value)}/>
            <input 
                placeholder="Confirm Password"
                type="password" 
                value={confPass}
                onChange={ e => setConfiPass(e.target.value)}/>
            <button onClick={createAccount}>create Account</button>
            <div className='upvotes-section'>
                <Link to="/login"> Already have an Account? Log in here!</Link>
            </div>
            </>
        );
}

export default CreateAccountPage;