import "../styles/blogposts.css"
import l_image from "../images/blogimageleft.png"
import m_image from "../images/blogimagemiddle.png"
import r_image from "../images/blogimageright.png"


import background from "../assets/blogpost_bg.svg"
export default function blogpost () {
    return (
        <div className = "blog-post">
            <img className = "blogpost-background" src={background} alt="" />
            <p className = "blog-posts"> BLOG POSTS</p>
            <img className = "blog_l_image" src={l_image} alt="" />
            <img className = "blog_m_image" src={m_image} alt="" />
            <img className = "blog_r_image" src={r_image} alt="" />
        </div>
    )
}