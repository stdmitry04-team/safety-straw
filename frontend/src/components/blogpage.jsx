import React, { useState } from 'react';
import BlogPost from "./blogpost";
import blog_t_image from "../images/blog-indv-page-img-top.png";
import blog_m_image from "../images/blog-indv-page-img-middle.png";
import carrot_2 from "../assets/blogcarrot2.svg";
import carrot from "../assets/blogcarrot1.svg";
import blog_page_image from "../images/blogpagemainimg.png";
import blog_page_image_mobile from "../images/blogpage-main-img-mobile.png";
import blog_page_article from "../assets/blogpage-article.svg";
import blog_page_article_mobile from "../assets/blogpage-article-mobile.svg";
import Navbar from "./nav.jsx";
import WaitlistBar from "./WaitlistBar.jsx";
import Footer from "./footer.jsx";
import "../styles/blogpage.css";

export function BlogPage() {
    const [shifted, setShifted] = useState(false);

    const shiftLeft = () => {
        setShifted(prevShifted => !prevShifted); // Toggle the shifted state
    };
    

    return (
        <div>
            <Navbar /> 
            <body className="blog_page_body">
            <div className={`blog_page ${shifted ? 'shifted' : ''}`}>
                <div className="blog_page_left">
                    <img className="blog_page_image" src={blog_page_image} alt=""/>
                    <img className="blog_page_article" src={blog_page_article} alt="" />
                    <img className="blog_page_image_mobile" src={blog_page_image_mobile} alt=""/>
                    <img className="blog_page_article_mobile" src={blog_page_article_mobile} alt="" />
                </div>
                
                <div className={`sidebar_posts`}>
                    <img className={`carrot ${shifted ? 'shifted' : ''}`} src={carrot} alt="" onClick={shiftLeft} />
                    <div className={`side_bar_imgs ${shifted ? 'shifted' : ''}`}>
                        <div className="right_title">
                            <img className={`carrot_2 ${shifted ? 'shifted' : ''}`} src={carrot_2} alt="" onClick={shiftLeft}/>
                            <p className="carrot_label">Latest Blogs</p>
                        </div>
                        <div className="blog-indv-images">
                            <BlogPost className="blog_t_image" imageSrc={blog_t_image} title={<>How Safety Straw Products Are Environmental Friendly </>} date='Aug 20, 2024' />
                            <BlogPost className="blog_m_image" imageSrc={blog_m_image} title={<>How the Safety Straws <br />Changed My Life</>} date='Jul 1, 2024' />
                            <BlogPost className="blog_m_image" imageSrc={blog_m_image} title={<>How the Safety Straws <br />Changed My Life</>} date='Jul 1, 2024' />
                        </div>
                    </div>
                </div>

            </div>
            </body>
            <WaitlistBar />
            <Footer />

        </div>
        
    );
}

export default BlogPage;
