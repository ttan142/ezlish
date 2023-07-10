import { Link, useLocation } from "react-router-dom";
import "./NavBar.css"
import avatar from '../img/avatar.png'
import React, { useState, useEffect } from "react";
import  {logout}  from '../actions/userAction';
import { useDispatch, useSelector } from 'react-redux';

const Navbar = ({user}) => {
  const [navbarBackground, setNavbarBackground] = useState();
  const [navlink, setNavlink] = useState();
  const location = useLocation();
  
  const userLogin = useSelector(state => state.userLogin);
  const { loading, error, userInfo } = userLogin;
  const handleImageError = (e) => {
    e.target.src = avatar;
  };
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };
  const handleCombinedClick = () => {
    scrollToTop();
    handleClick();
  };
  const scrollFunction = () => {
    if (
      document.body.scrollTop > 20 ||
      document.documentElement.scrollTop > 20
    ) {
      setNavbarBackground('#fff');
      setNavlink('#1eb2a6');
    } else {
      setNavbarBackground();
      setNavlink('#fff');
    }
  };

  useEffect(() => {
    const storedUserInfo = localStorage.getItem('userInfo');
    const userInfo = storedUserInfo ? JSON.parse(storedUserInfo) : null;

    if (location.pathname === '/' && !userInfo) {
      setNavbarBackground();
      setNavlink('#fff');
      window.onscroll = scrollFunction;
    } else {
      setNavlink('#1eb2a6');
      setNavbarBackground('#fff');
      window.onscroll = null;
    }

    return () => {
      window.onscroll = null;
    };
  }, [location]);

  useEffect(() => {
    localStorage.setItem('navbarBackground', navbarBackground);
  }, [navbarBackground]);

  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);


  const dispatch = useDispatch();


  const logoutHandler = () => {
 window.open("https://ezlish-server.onrender.com/auth/logout", "_self");
 dispatch(logout());
  };

  return (
    <>
    
      <nav className="nav-bar" style={{ background: navbarBackground }}>
        <div className="nav-container">
          <Link onClick={scrollToTop} to={userInfo && userInfo.isAdmin ? "/admin" : userInfo && userInfo.isStaff ? "/staff":"/"} className="nav-logo">
            <h2 class="m-0 " id="name"style={{ color: navlink }}>
              <i class="fa fa-book me-3" ></i>{" "}
              <span>EZLISH</span>
            </h2>
          </Link>

          <ul className={click ? "nav-menu active" : "nav-menu"}>
            
            {/* <li className="nav-item">
              <Link
                to="/courses"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                Course
              </Link>
            </li> */}
        
            
            {userInfo && (userInfo.isAdmin || userInfo.isStaff)  ? (
                <></>
              ) : (
                <>
                  <li className="nav-item">
                    <Link
                      to="/"
                      activeClassName="active"
                      className="nav-links"
                      style={{ color: navlink }}
                      onClick={handleCombinedClick}
                    >
                      Home
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link
                      to="/testlist"
                      activeClassName="active"
                      className="nav-links"
                      style={{ color: navlink }}
                      onClick={handleCombinedClick}
                    >
                      Tests
                    </Link>
                  </li>
                  <li className="nav-item">
              <Link
                to="/flashcard"
                activeClassName="active"
                      className="nav-links"
                      style={{ color: navlink }}
                      onClick={handleCombinedClick}
              >
                Flashcard
              </Link>
            </li>
                </>
              )}

            {/* <li className="nav-item">
              <Link
                to="/toeictips"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                TOEIC Tips
              </Link>
            </li> */}
            {user ? (
              
             <> <li className="nav-item dropdown">
                <Link style={{ color: navlink }}
                to={userInfo && userInfo.isAdmin ?  "/admin" : userInfo && userInfo.isStaff ? "/staff":"/profile"}
                activeClassName="active"
                className="nav-links"
                onClick={handleCombinedClick}
              >
                <img id="userPic" src={user.photo || avatar} onError={handleImageError}className="avatar" />
                <span style={{ color: navlink }}>{userInfo.name}   ${userInfo.balance}</span>
                
              </Link>
                  
                 <div className="dropdown-content">
                <Link 
                  to="/"
                  activeClassName="active"
                  className="nav-links"
                  onClick={logoutHandler}
                >
                
                  <span id="logout">Logout</span>          
                </Link>
                </div>
              </li>
              
              </>
              ) : (
              <li className="nav-item">
                <Link style={{ color: navlink }} to="login" className="nav-links" onClick={handleCombinedClick}>
                  Login
                </Link>
              </li>
              )
            }
            
          </ul>
          <div className="nav-icon" onClick={handleClick}>
            <i className={click ? "fa fa-times" : "fa fa-bars"}></i>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
