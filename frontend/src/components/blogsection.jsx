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
                <BlogPost imageSrc={blog_l_image} title="My First Blog Post" date='1 sep 2000' />
                <BlogPost imageSrc={blog_m_image} title="My First Blog Post" date='1 sep 2000' />
                <BlogPost imageSrc={blog_r_image} className = "blog_r_image" title="My First Blog Post" date='1 sep 2000' />
            </div>
            {/* <img className = "blog_l_image" src={l_image} alt="" />
            <img className = "blog_m_image" src={m_image} alt="" />
            <img className = "blog_r_image" src={r_image} alt="" /> */}
        </div>
    )
}
