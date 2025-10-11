import Category from "./Category";
import Navbar from "./Navbar";
import ProductCards from "./ProductCards";
import Search from "./Search";
import Testimonials from "./Testimonials";

const Layout = () => {
    return (
        <div>
            <Search/>
            <Category/>
            <ProductCards/>
            <Testimonials/>
        </div>
    );
}

export default Layout;