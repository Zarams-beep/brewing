// app/blog/page.tsx
import DidYouKnow from "@/component/Blog/BlogDidYouknow";
import BlogHero from "@/component/Blog/BlogHero";
import Blog from "@/component/Blog/BlogPage";
import Footer from '@/component/Footer/Footer';
import "../../styles/Blogpage.css";
export const metadata = {
  title: "Coffee Blog Information",
  description: "This is Blog Page",
};

export default function BlogPage() {
  return (
    <div className="">
      <BlogHero/>
       <div className="parellex-scrolling">
        <div className="blogPage-sub">
      <Blog />
      <DidYouKnow/>
        </div>
        <Footer/>
       </div>
    </div>
  );
}
