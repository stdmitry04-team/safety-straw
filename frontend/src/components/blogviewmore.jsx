import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Remove useParams as it's not needed in the list view
import "../styles/blogviewmore.css";
import BlogPost from "./blogpost";
import blog_l_image from "../images/blogimageleft.png";
import blog_m_image from "../images/blogimagemiddle.png";
import blog_r_image from "../images/blogimageright.png";
import blog_middown_image from "../images/strawtint.png";
import blog_rdown_image from "../images/bartint.png";
import blogpagebar from "../images/blogpagebar.png";
import Navbar from "./nav.jsx";
import WaitlistBar from "./WaitlistBar.jsx";
import Footer from "./footer.jsx";

export default function BlogViewMore() {
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 440);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleBlogClick = (index) => {
    navigate(`/blog/${index}`);
  };

  let idCounter = 1;
  const blogPosts = [
    { id: idCounter++, imageSrc: blog_l_image, title: "How Safety Straw Products Are Environmental Friendly", date: "Aug 20, 2024" },
    { id: idCounter++, imageSrc: blog_m_image, title: "How Do Bars Use Safety Straw Products?", date: "Aug 23, 2024" },
    { id: idCounter++, imageSrc: blog_r_image, title: "How the Safety Straw Straws Changed My Life", date: "Jul 1, 2024" },
    { id: idCounter++, imageSrc: blog_middown_image, title: "How Do Bars Use Safety Straw Products?", date: "Aug 23, 2024" },
    { id: idCounter++, imageSrc: blog_rdown_image, title: "How the Safety Straw Straws Changed My Life", date: "Jul 1, 2024" },
    { id: idCounter++, imageSrc: blog_rdown_image, title: "How the Safety Straw Straws Changed My Life", date: "Jul 1, 2024" },
  ];

  return (
    <div>
      <Navbar />
      <div className="blog-view-more">
        <p className="blog-view-header">BLOG POSTS</p>
        <div className="blog-view-more-posts">
          {blogPosts.map((post) => (
            <BlogPost
              key={post.id}
              imageSrc={post.imageSrc}
              title={post.title}
              date={post.date}
              onClick={() => handleBlogClick(post.id)}
            />
          ))}
        </div>
        {isMobile && (
          <div className="pagination-bar">
            <img src={blogpagebar} alt="Pagination" className="pagination-image" />
          </div>
        )}
      </div>
      <WaitlistBar />
      <Footer />
    </div>
  );
}