import BlogPost from "./blogpost"
import blog_l_image from "../images/blogimageleft.png"
import blog_r_image from "../images/blogimageright.png"
import carrot_2 from "../assets/blogcarrot2.svg"
import "../styles/blogpage.css";

export function BlogPage() {
    return (
        <div className = "blog-page">
            <div className="side-bar-posts">
                <div className = "right-title">
                    <img className = "carrot_2" src={carrot_2} alt="" />
                    <p className = "carrot-label"> Latest Blogs</p>  
                </div>     
                <BlogPost imageSrc={blog_l_image} title={ <>How Safety Straw Products Are <br /> Environmental Friendly </>}  date='Aug 20, 2024' />
                <BlogPost imageSrc={blog_r_image} title={ <>How the Safety Straw Straws <br />Changed My Life</>} date='Jul 1, 2024' />
                <BlogPost imageSrc={blog_r_image} title={ <>How the Safety Straw Straws <br />Changed My Life</>} date='Jul 1, 2024' />
            </div>
        </div>
    )
}