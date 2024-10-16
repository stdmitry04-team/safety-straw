import React from 'react';
import "../styles/blogposts.css"

const BlogPost = ({ title, imageSrc, date }) => {
  return (
    <div className="blog-post">
      <img src={imageSrc} alt={title} className="blog-post-image" />
      <h2 className="blog-post-date">{date}</h2>
      <h2 className="blog-post-title">{title}</h2>
    </div>
  );
};

export default BlogPost;
