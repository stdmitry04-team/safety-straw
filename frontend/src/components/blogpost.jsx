import React from 'react';
import { useNavigate } from 'react-router-dom';
import "../styles/blogposts.css";

export default function BlogPost({ imageSrc, title, date, className, id }) {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/blog/${id}`);
    };

    return (
        <div className={`blog-post-item ${className}`} onClick={handleClick}>
            <img src={imageSrc} alt={title} className="blog-post-image" />
            <div className="blog-post-content">
                <p className="blog-post-date">{date}</p>
                <h3 className="blog-post-title">{title}</h3>
            </div>
        </div>
    );
}
