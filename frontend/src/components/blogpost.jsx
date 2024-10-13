import "../styles/blogposts.css"
import background from "../assets/blogpost_bg.svg"
export default function blogpost () {
    return (
        <div className = "blog-post">
            <img className = "blogpost-background" src={background} alt="" />
            <p className = "blog-posts"> BLOG POSTS</p>
        </div>
    )
}