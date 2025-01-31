import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import articles from './article-content.js';
import NotFoundPage from './NotFoundPage.js';
import CommentList from '../components/CommentsList.js';
import AddCommentForm from '../components/AddCommentForm.js';
import useUser from '../hooks/useUser.js';

const ArticlesPage = () =>{
    const { articleId } = useParams();
    const [articleInfo, setArticleInfo] = useState(
                                            {
                                            upvotes: 0, 
                                            comments: [],
                                            canUpvote: false
                                            }
                                        );
    const { canUpvote } = articleInfo;
    const { user, isLoading } = useUser();
    
    useEffect(()=>{
        const loadArticleInfo = async () =>{
            const token = user && await user.getIdToken();
            const headers = token ? {authtoken: token} : {};
            const response = await axios.get(`/api/articles/${articleId}`,{  headers });
            const newArticleInfo = response.data;
            setArticleInfo(newArticleInfo);
        }
        if(isLoading){
            loadArticleInfo();
        }
    },[isLoading, user]);

    const article = articles.find(article => article.name === articleId);
    const addUpvote = async () =>{
        const token = user && await user.getIdToken();
        const headers = token ? {authtoken: token} : {};
        const response = await axios.put(`/api/articles/${articleId}/upvote`, null, { headers });
        const updatedArticle = response.data;
        setArticleInfo(updatedArticle);
    }
    
    if (!article) {
        return <NotFoundPage />
    }
    return (
        <>
        <h1>{article.title}</h1>
        <div className='upvotes-section'>
            { user ? 
                <button className='' onClick={addUpvote}> { canUpvote ? 'upvote' : 'already upvoted' } </button>
                : <button>log in to upvote</button>
            }
            <p className='upvotes-item'> This Article has {articleInfo.upvotes} upvote(s)</p>
        </div>
        {article.content.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
        ))}
        { user ? 
            <AddCommentForm 
                articleName={articleId}
                onArticleUpdated={updatedArticle => setArticleInfo(updatedArticle)}/>
            : <button>log in to add a comment</button> 
        }
        <CommentList comments={articleInfo.comments}></CommentList>
        </>
    );
}

export default ArticlesPage;