import BlogCarousel from "@/components/BlogCard";
import { blogs } from "@/components/constants/blog";
import Experience from "@/components/Experience";
import Main from "@/components/Main";
import Projects from "@/components/Projects";
import Heading from "@/components/ui/Heading";

const Home = () => {
  return (
    <div>
      <Main />
      <BlogCarousel blogs={blogs} />
      <Heading
        heading1="Explore my"
        heading2="best projects"
      />
      <Projects />
      <Experience/>
    </div>
  );
};

export default Home;