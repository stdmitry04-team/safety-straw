import "../styles/blogposts.css"
import blog_l_image from "../images/blogimageleft.png"
import blog_m_image from "../images/blogimagemiddle.png"
import blog_r_image from "../images/blogimageright.png"
import BlogPost from "./blogpost"
import background from "../assets/blogpost_bg.svg"

export default function BlogSection () {
    return (
        <div className = "blog-post">
            <img className = "blogpost-background" src={background} alt="" />
            <p className = "blog-posts-title"> BLOG POSTS</p>
            <div className="posts">
                <BlogPost imageSrc={blog_l_image} title={ <>How Safety Straw Products Are <br /> Environmental Friendly </>}  date='Aug 20, 2024' />
                <BlogPost imageSrc={blog_m_image} title={ <>How Do Bars Use Safety Straw <br />Products?</>} date='Aug 23, 2024' />
                <BlogPost className = "blog_r_image" imageSrc={blog_r_image}  title={ <>How the Safety Straw Straws <br />Changed My Life</>} date='Jul 1, 2024' />
            </div>

        </div>
    )
}
