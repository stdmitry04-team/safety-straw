import React from 'react';
import "../styles/blogpage.css";

export default function BlogPostArticle({ author, title, date, className }) {
    return (
        <div className={`blog-post-article-item ${className}`}>
            <p alt={title} className="blog-post-article-author">{author}</p>
            <div className="blog-post-article-content">
                <p className="blog-post-article-date">{date}</p>  
                <h3 className="blog-post-article-title">{title}</h3> 
            </div>
        </div>
    );
}
