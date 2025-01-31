import axios from "axios";
import { useState } from "react";
import useUser from "../hooks/useUser";

const AddCommentForm = ({ articleName, onArticleUpdated }) =>{
    const [name, setName] = useState('');
    const [text, setText] = useState('');
    const { user } = useUser();

    const addComment = async () => {
        const token = user && await user.getIdToken();
        const headers = token ? {authtoken: token} : {};
        const response = await axios.post(`/api/articles/${articleName}/comments`, 
            {
                postedBy: name,
                text: text
            },
            { headers }
        );
        const updatedArticle = response.data;
        onArticleUpdated(updatedArticle);
        setName('');
        setText('');
    }

    return(
        <div id="add-comment-form">
            <h3> Add a Comment </h3>
           { user && <p> You are posting as {user.email}</p> }
            <textarea rows="4" cols="50"
                value={text}
                onChange={e=> setText(e.target.value)}
            />

            <button onClick={addComment}>Add Comment</button> 
        </div>
    )
}

export default AddCommentForm;