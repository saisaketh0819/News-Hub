import React from 'react'
import { Link } from "react-router-dom";

const NavBar = () => {
    const [theme, setTheme] = React.useState("light");

    const toggleTheme = () => { 
        if (theme === "light") {
            setTheme("dark");
            document.body.classList.add("bg-dark");
            document.body.classList.add("text-white");
        } else {
            setTheme("light");
            document.body.classList.remove("bg-dark");
            document.body.classList.remove("text-white");
        }   
    };

    return (
        <div>
            <nav className={`navbar fixed-top navbar-expand-lg border-bottom ${theme === "light" ? "navbar-light bg-light" : "navbar-dark bg-dark"} border-bottom border-3`}>
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">News Hub</Link>
                    <div className="collapse navbar-collapse justify-content-center" id="navbarSupportedContent">
                        <ul className="navbar-nav  mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link" aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item"><Link className="nav-link" to="/business">Business</Link></li>
                            <li className="nav-item"><Link className="nav-link" to="/entertainment">Entertainment</Link></li>
                            <li className="nav-item"><Link className="nav-link" to="/general">General</Link></li>
                            <li className="nav-item"><Link className="nav-link" to="/health">Health</Link></li>
                            <li className="nav-item"><Link className="nav-link" to="/science">Science</Link></li>
                            <li className="nav-item"><Link className="nav-link" to="/sports">Sports</Link></li>
                            <li className="nav-item"><Link className="nav-link" to="/technology">Technology</Link></li>
                        </ul>
                    </div>
                    <button className={`btn ms-auto fs-3 ${theme === "light" ? "text-dark" : "text-light"}`} onClick={toggleTheme}>{theme === "light" ? (<i className="bi bi-moon-fill"></i>) : (<i className="bi bi-sun-fill"></i>)}
                    </button>
                </div>
            </nav>
        </div>
    )

}

export default NavBar