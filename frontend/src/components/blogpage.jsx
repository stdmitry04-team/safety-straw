import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import BlogPost from "./blogpost";
import BlogPostArticle from "./blogpostarticle"
import blog_t_image from "../images/blog-indv-page-img-top.png";
import blog_m_image from "../images/blog-indv-page-img-middle.png";
import carrot_2 from "../assets/blogcarrot2.svg";
import carrot from "../assets/blogcarrot1.svg";
import blog_page_image from "../images/blogpagemainimg.png";
import blog_page_image_mobile from "../images/blogpage-main-img-mobile.png";
import blog_page_article from "../assets/blogpage-article.svg";
import blog_page_article_mobile from "../assets/blogpage-article-mobile.svg";
import blog_page_article_icon from "../assets/blog-article-icon.svg";
import blog_page_article_icon_arrow from "../assets/blog-article-icon-arrow.svg";
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
                    <img className="blog-page-image-mobile" src={blog_page_image_mobile} alt=""/>
                    <BlogPostArticle 
                        className="blog-page-article-comp" 
                        author="John Doe" 
                        date="5 October 2024" 
                        title="How Do Bars Use Safety Straw Products?" 
                        imageSrc={blog_page_article_icon}
                        imageSrc2={blog_page_article_icon_arrow}
                        text={<>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
                              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
                              exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure 
                              dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
                              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit 
                              anim id est laborum<br /><br />
                              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
                              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
                              exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure 
                              dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
                              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit 
                              anim id est laborum<br /><br />
                              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
                              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
                              exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure 
                              dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
                              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit 
                              anim id est laborum</>}
                    />
                    <img className="blog-page-article" src={blog_page_article} alt="" />
                    
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
                            <NavLink to='post/1' className="blogpage-navlink">
                                <BlogPost className="blog-t-image" imageSrc={blog_t_image} title={<>How Safety Straw Products Are Environmental Friendly </>} date='Aug 20, 2024' />
                            </NavLink>
                            <NavLink to='post/2' className="blogpage-navlink">
                                <BlogPost className="blog-m-image" imageSrc={blog_m_image} title={<>How the Safety Straws <br />Changed My Life</>} date='Jul 1, 2024' />
                            </NavLink>
                            <NavLink to='post/3' className="blogpage-navlink">
                                <BlogPost className="blog-m-image" imageSrc={blog_m_image} title={<>How the Safety Straws <br />Changed My Life</>} date='Jul 1, 2024' />
                            </NavLink>
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
