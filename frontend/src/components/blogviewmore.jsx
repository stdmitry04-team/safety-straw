// import React from 'react';
// import "../styles/blogviewmore.css"
// import BlogPost from "./blogpost";
// import blog_l_image from "../images/blogimageleft.png";
// import blog_m_image from "../images/blogimagemiddle.png";
// import blog_r_image from "../images/blogimageright.png";
// import blog_middown_image from "../images/strawtint.png"; 
// import blog_rdown_image from "../images/bartint.png"; 

// export default function BlogViewMore() {
//     return (
//         <div className="blog-view-more">    
//             <p className="blog-view-header">BLOG POSTS</p>
//             <div className="posts">
//                 <BlogPost imageSrc={blog_l_image} title={ <>How Safety Straw Products Are <br /> Environmental Friendly </>}  date='Aug 20, 2024' />
//                 <BlogPost imageSrc={blog_m_image} title={ <>How Do Bars Use Safety Straw <br />Products?</>} date='Aug 23, 2024' />
//                 <BlogPost imageSrc={blog_r_image} title={ <>How the Safety Straw Straws <br />Changed My Life</>} date='Jul 1, 2024' />

//                 <BlogPost imageSrc={blog_r_image} title={ <>How Safety Straw Products Are <br /> Environmental Friendly </>}  date='Aug 20, 2024' />
//                 <BlogPost imageSrc={blog_middown_image} title={ <>How Do Bars Use Safety Straw <br />Products?</>} date='Aug 23, 2024' />
//                 <BlogPost imageSrc={blog_rdown_image} title={ <>How the Safety Straw Straws <br />Changed My Life</>} date='Jul 1, 2024' />
//             </div>
//         </div>
//     );
// }

import React, { useEffect, useState } from 'react';
import "../styles/blogviewmore.css";
import BlogPost from "./blogpost";
import blog_l_image from "../images/blogimageleft.png";
import blog_m_image from "../images/blogimagemiddle.png";
import blog_r_image from "../images/blogimageright.png";
import blog_middown_image from "../images/strawtint.png"; 
import blog_rdown_image from "../images/bartint.png"; 
import blogpagebar from "../images/blogpagebar.png"; // Import the pagination bar image

export default function BlogViewMore() {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 390);
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <div className="blog-view-more">    
            <p className="blog-view-header">BLOG POSTS</p>
            <div className="posts">
                {isMobile ? (
                    <>
                        <BlogPost imageSrc={blog_l_image} title="How Safety Straw Products Are Environmental Friendly" date="Aug 20, 2024" />
                        <BlogPost imageSrc={blog_m_image} title="How Do Bars Use Safety Straw Products?" date="Aug 23, 2024" />
                        <BlogPost imageSrc={blog_l_image} title="How Safety Straw Products Are Environmental Friendly" date="Aug 20, 2024" />
                        <BlogPost imageSrc={blog_m_image} title="How Do Bars Use Safety Straw Products?" date="Aug 23, 2024" />
                    </>
                ) : (
                    <>
                        <BlogPost imageSrc={blog_l_image} title="How Safety Straw Products Are Environmental Friendly" date="Aug 20, 2024" />
                        <BlogPost imageSrc={blog_m_image} title="How Do Bars Use Safety Straw Products?" date="Aug 23, 2024" />
                        <BlogPost imageSrc={blog_r_image} title="How the Safety Straw Straws Changed My Life" date="Jul 1, 2024" />
                        <BlogPost imageSrc={blog_r_image} title="How Safety Straw Products Are Environmental Friendly" date="Aug 20, 2024" />
                        <BlogPost imageSrc={blog_middown_image} title="How Do Bars Use Safety Straw Products?" date="Aug 23, 2024" />
                        <BlogPost imageSrc={blog_rdown_image} title="How the Safety Straw Straws Changed My Life" date="Jul 1, 2024" />
                    </>
                )}
            </div>
            {isMobile && (
                <div className="pagination-bar">
                    <img src={blogpagebar} alt="Pagination" className="pagination-image" />
                </div>
            )}
        </div>
    );
}