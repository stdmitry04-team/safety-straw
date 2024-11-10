import React from 'react';
import "../styles/blogpage.css";

export default function BlogPostArticle({ imageSrc, imageSrc2, author, title, date, text, className }) {
    return (
        <div className={`blog-post-article-item ${className}`}>
            <div className="blog-post-article-top-line">
                <p className="blog-post-article-author">{author}</p>
                <p className="blog-post-article-date">{date}</p>
            </div>  
            <div className ="blog-post-article-header">
                <div className="blog-post-article-icon">
                    <img src={imageSrc} alt="Author icon" className="blog-post-article-icon" />
                    <img src={imageSrc2} alt="Arrow icon" className="blog-post-article-icon-arrow" />
                </div>
                <h3 className="blog-post-article-title">{title}</h3>   
            </div>
            
               
            
            
            <div className="blog-post-article-content">
                <p className="blog-post-article-text">{text}</p>
            </div>
        </div>
    );
}
