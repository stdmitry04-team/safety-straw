import React from 'react';
import "../styles/blogposts.css";

export default function BlogPost({ imageSrc, title, date, className }) {
    return (
        <div className="blog-post-item">
            <img src={imageSrc} alt={title} className={`blog-post-image ${className}`} /> {/* Use className prop here */}
            <p className="blog-post-date">{date}</p>
            <h3 className="blog-post-title">{title}</h3>
        </div>
    );
}
