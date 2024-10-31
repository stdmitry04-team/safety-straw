import BlogPost from "./blogpost"
import blog_l_image from "../images/blogimageleft.png"
import blog_r_image from "../images/blogimageright.png"
import carrot_2 from "../assets/blogcarrot2.svg"
import blog_page_image from "../assets/blogpagemainimg.svg"
import blog_page_article from "../assets/blogpage-article.svg"
import "../styles/blogpage.css";

export function BlogPage() {
    return (
        <div className = "blog_page">
            <div className = "blog_page_left">
                <img className = "blog_page_image" src={blog_page_image} alt="" />
                <img className = "blog_page_article" src={blog_page_article} alt="" />
                
                
            </div>
            <div className="sidebar_posts">
                <div className = "right_title">
                    <img className = "carrot_2" src={carrot_2} alt="" />
                    <p className = "carrot_label"> Latest Blogs</p>  
                </div>     
                <BlogPost imageSrc={blog_l_image} title={ <>How Safety Straw Products Are <br /> Environmental Friendly </>}  date='Aug 20, 2024' />
                <BlogPost imageSrc={blog_r_image} title={ <>How the Safety Straw Straws <br />Changed My Life</>} date='Jul 1, 2024' />
                <BlogPost imageSrc={blog_r_image} title={ <>How the Safety Straw Straws <br />Changed My Life</>} date='Jul 1, 2024' />
            </div>
        </div>
    )
}