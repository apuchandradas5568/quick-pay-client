import { Outlet, useLocation } from "react-router-dom";




const Main = () => {
    const location = useLocation();
    
    const noHeaderFooter = location.pathname.includes('login') || location.pathname.includes('signup');

    return (
        <div className="max-w-[1200px] mx-auto" >
            {/* { noHeaderFooter || <Navbar/>} */}
            <Outlet></Outlet>
            {/* { noHeaderFooter || <Footer/>} */}
        </div>
    );
};

export default Main;