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
            <body className="blog-page-body">
            <div className={`blog-page ${shifted ? 'shifted' : ''}`}>
                <div className="blog-page-left">
                    <img className="blog-page-image" src={blog_page_image} alt=""/>
                    <img className="blog-page-article" src={blog_page_article} alt="" />
                    <img className="blog-page-image-mobile" src={blog_page_image_mobile} alt=""/>
                    <img className="blog-page-article-mobile" src={blog_page_article_mobile} alt="" />
                </div>
                
                <div className={`blog-page-side-bar-posts`}>
                    <img className={`blog-page-carrot-1 ${shifted ? 'shifted' : ''}`} src={carrot} alt="" onClick={shiftLeft} />
                    <div className={`blog-page-side-bar-imgs ${shifted ? 'shifted' : ''}`}>
                        <div className="blog-page-carrot-title">
                            <img className={`blog-page-carrot-2 ${shifted ? 'shifted' : ''}`} src={carrot_2} alt="" onClick={shiftLeft}/>
                            <p className="blog-page-carrot-label">Latest Blogs</p>
                        </div>
                        <div className="blog-indv-images">
                            <BlogPost className="blog-t-image" imageSrc={blog_t_image} title={<>How Safety Straw Products Are Environmental Friendly </>} date='Aug 20, 2024' />
                            <BlogPost className="blog-m-image" imageSrc={blog_m_image} title={<>How the Safety Straws <br />Changed My Life</>} date='Jul 1, 2024' />
                            <BlogPost className="blog-m-image" imageSrc={blog_m_image} title={<>How the Safety Straws <br />Changed My Life</>} date='Jul 1, 2024' />
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
