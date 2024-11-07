import React, { useState } from 'react';
import BlogPost from "./blogpost";
import blog_l_image from "../images/blogimageleft.png";
import blog_r_image from "../images/blogimageright.png";
import carrot_2 from "../assets/blogcarrot2.svg";
import carrot from "../assets/blogcarrot1.svg";
import blog_page_image from "../images/blogpagemainimg.png";
import blog_page_article from "../assets/blogpage-article.svg";
import "../styles/blogpage.css";

export function BlogPage() {
    const [shifted, setShifted] = useState(false);

    const shiftLeft = () => {
        setShifted(prevShifted => !prevShifted); // Toggle the shifted state
    };
    

    return (
        <div>
            <body className="blog_page_body">
            <div className={`blog_page ${shifted ? 'shifted' : ''}`}>
                <div className="blog_page_left">
                    <img
                        className="blog_page_image"
                        src={blog_page_image}
                        alt=""
                    />
                    <img className="blog_page_article" src={blog_page_article} alt="" />
                </div>
                
                <div className="sidebar_posts">
                    <img className={`carrot ${shifted ? 'shifted' : ''}`} src={carrot} alt="" onClick={shiftLeft}  />
                    <div className = {`side_bar_imgs ${shifted ? 'shifted' : ''}`}>
                        <div className="right_title">
                            <img className={`carrot_2 ${shifted ? 'shifted' : ''}`} src={carrot_2} alt=""onClick={shiftLeft} />
                            <p className="carrot_label">Latest Blogs</p>
                        </div>
                        <BlogPost imageSrc={blog_l_image} title={<>How Safety Straw Products Are <br /> Environmental Friendly </>} date='Aug 20, 2024' />
                        <BlogPost imageSrc={blog_r_image} title={<>How the Safety Straw Straws <br />Changed My Life</>} date='Jul 1, 2024' />
                        <BlogPost imageSrc={blog_r_image} title={<>How the Safety Straw Straws <br />Changed My Life</>} date='Jul 1, 2024' />
                    </div>
                    
                </div>
                </div>
            </body>

        </div>
        
    );
}

export default BlogPage;
