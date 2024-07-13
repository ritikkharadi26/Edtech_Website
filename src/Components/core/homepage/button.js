import React from 'react';
import { Link } from 'react-router-dom';

const Button = ({ children, active, linkto }) => {
    return (
        <Link to={linkto}>
            <div className={`text-center text-[16px] px-4 py-3 font-semibold text-pure-greys-5  rounded-md ${active ? "bg-yellow-100" : "bg-richblack-800"} hover:scale-95 transition-all duration-100`}>{children}</div>
        </Link>
    );
};

export default Button;
