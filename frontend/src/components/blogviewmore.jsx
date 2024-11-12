// import React, { useEffect, useState } from 'react';
// import "../styles/blogviewmore.css";
// import BlogPost from "./blogpost";
// import blog_l_image from "../images/blogimageleft.png";
// import blog_m_image from "../images/blogimagemiddle.png";
// import blog_r_image from "../images/blogimageright.png";
// import blog_middown_image from "../images/strawtint.png"; 
// import blog_rdown_image from "../images/bartint.png"; 
// import blogpagebar from "../images/viewmoremobile.png"; 
// import Navbar from "./nav.jsx";
// import WaitlistBar from "./WaitlistBar.jsx";
// import Footer from "./footer.jsx";

// export default function BlogViewMore() {
//     const [isMobile, setIsMobile] = useState(false);

//     useEffect(() => {
//         const handleResize = () => setIsMobile(window.innerWidth <= 440);
//         handleResize();
//         window.addEventListener("resize", handleResize);
//         return () => window.removeEventListener("resize", handleResize);
//     }, []);

//     return (
//         <div>
//             <Navbar /> 
//             <div className="blog-view-more">    
//             <p className="blog-view-header">BLOG POSTS</p>
//             <div className="blog-view-more-posts">
//                 {isMobile ? (
//                     <>
//                         <BlogPost imageSrc={blog_l_image} title="How Safety Straw Products Are Environmental Friendly" date="Aug 20, 2024" />
//                         <BlogPost imageSrc={blog_m_image} title="How Do Bars Use Safety Straw Products?" date="Aug 23, 2024" />
//                         <BlogPost imageSrc={blog_l_image} title="How Safety Straw Products Are Environmental Friendly" date="Aug 20, 2024" />
//                         <BlogPost imageSrc={blog_m_image} title="How Do Bars Use Safety Straw Products?" date="Aug 23, 2024" />
//                     </>
//                 ) : (
//                     <>
//                         <BlogPost imageSrc={blog_l_image} title="How Safety Straw Products Are Environmental Friendly" date="Aug 20, 2024" />
//                         <BlogPost imageSrc={blog_m_image} title="How Do Bars Use Safety Straw Products?" date="Aug 23, 2024" />
//                         <BlogPost imageSrc={blog_r_image} title="How the Safety Straw Straws Changed My Life" date="Jul 1, 2024" />
//                         <BlogPost imageSrc={blog_r_image} title="How Safety Straw Products Are Environmental Friendly" date="Aug 20, 2024" />
//                         <BlogPost imageSrc={blog_middown_image} title="How Do Bars Use Safety Straw Products?" date="Aug 23, 2024" />
//                         <BlogPost imageSrc={blog_rdown_image} title="How the Safety Straw Straws Changed My Life" date="Jul 1, 2024" />
//                     </>
//                 )}
//             </div>
//             {isMobile && (
//                 <div className="pagination-bar">
//                     <img src={blogpagebar} alt="Pagination" className="pagination-image" />
//                 </div>
//             )}
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
import blogpagebar from "../images/viewmoremobile.png";  // Import the pagination arrow image
import Navbar from "./nav.jsx";
import WaitlistBar from "./WaitlistBar.jsx";
import Footer from "./footer.jsx";

export default function BlogViewMore() {
    const [isMobile, setIsMobile] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = 5; // Total number of pages

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 440);
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const changePage = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div>
            <Navbar />
            <div className="blog-view-more">
                <p className="blog-view-header">BLOG POSTS</p>
                <div className="blog-view-more-posts">
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
                        <button onClick={() => changePage(1)} className={`pagination-item ${currentPage === 1 ? 'active' : ''}`}>1</button>
                        <span>...</span>
                        <button onClick={() => changePage(5)} className={`pagination-item ${currentPage === 5 ? 'active' : ''}`}>5</button>
                        <img src={blogpagebar} alt="Next Page" className="pagination-next" onClick={() => changePage(currentPage + 1)} style={{ visibility: currentPage === 5 ? 'hidden' : 'visible' }} />
                    </div>
                )}
            </div>
        </div>
    );
}