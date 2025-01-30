import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import articles from './article-content.js';
import NotFoundPage from './NotFoundPage.js';
import CommentList from '../components/CommentsList.js';
import AddCommentForm from '../components/AddCommentForm.js';

const ArticlesPage = () =>{
    const { articleId } = useParams();
    const [articleInfo, setArticleInfo] = useState(
                                            {upvotes: 0, 
                                            comments: []}
                                        );
                                    
    useEffect(()=>{
        const loadArticleInfo = async () =>{
            const response = await axios.get(`/api/articles/${articleId}`);
            const newArticleInfo = response.data;
            setArticleInfo(newArticleInfo);
        }

        loadArticleInfo();
    },[articleId]);

    const article = articles.find(article => article.name === articleId);
    const addUpvote = async () =>{
        const response = await axios.put(`/api/articles/${articleId}/upvote`);
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
            <button className='' onClick={addUpvote}> upvote </button>
            <p className='upvotes-item'> This Article has {articleInfo.upvotes} upvote(s)</p>
        </div>
        {article.content.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
        ))}
        <AddCommentForm 
                articleName={articleId}
                onArticleUpdated={updatedArticle => setArticleInfo(updatedArticle)}
        />
        <CommentList comments={articleInfo.comments}></CommentList>
        </>
    );
}

export default ArticlesPage;