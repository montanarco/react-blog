import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    
    const navigate = useNavigate();

    const LogIn = async () => {
        try {
            await signInWithEmailAndPassword(getAuth(), email, password);
            navigate('/articles');
        } catch (error) {
            setError(error.message);
        }
        
    }

    return(
        <>
        <h1>  Log In</h1>
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
        <button onClick={LogIn}>Log In</button>
        <div className='upvotes-section'>
            <Link to="/create-account"> Don't have an account? create one here</Link>
        </div>
        </>
    );
}

export default LoginPage;