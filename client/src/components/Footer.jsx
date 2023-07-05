import React, { useState } from 'react';
import { FaFacebookF, FaTwitter, FaGoogle, FaInstagram, FaLinkedin, FaGithub, FaGem, FaHome, FaEnvelope, FaPhone, FaPrint } from 'react-icons/fa';
import './Footer.css';
import {  Button, Row, Col } from 'react-bootstrap';
export default function App() {
  const [email, setEmail] = useState('');

  const handleSubscribe = () => {
    if (isValidEmail(email)) {
      alert(`Thank you for subscribing with email: ${email}`);
    } else {
      alert('Please enter a valid email address.');
    }
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
   const isValidEmail = (email) => {
    // Email validation using regular expression
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  return (
    <>
    <section className='newletter'>
        <div className='container flexSB'>
          <div className='left row'>
            <h1>Subscribe for our updates</h1>
            <span>Please enter your email address and receive the latest updates.</span>
            
          </div>
          
          <div className='right row'>
          <p>
          
            <input type='email' placeholder='Enter email address' value={email} onChange={handleEmailChange} />
            <Button id='signIn' type='py-3' variant='primary' onClick={handleSubscribe}>
                SUBCRIBE
              </Button>
            </p>
             
          </div>
        </div>
      </section>
    <footer className='footer'>
      {/* <div className='social-links'>
        <div className='me-5 d-none d-lg-block'>
          <span>Get connected with us on social networks:</span>
        </div>

        <div>
          <a href='' className='me-4 text-reset'>
            <FaFacebookF />
          </a>
          <a href='' className='me-4 text-reset'>
            <FaTwitter />
          </a>
          <a href='' className='me-4 text-reset'>
            <FaGoogle />
          </a>
          <a href='' className='me-4 text-reset'>
            <FaInstagram />
          </a>
          <a href='' className='me-4 text-reset'>
            <FaLinkedin />
          </a>
          <a href='' className='me-4 text-reset'>
            <FaGithub />
          </a>
        </div>
      </div> */}
      
      <div className='footer-content'>
        <div className='container'>
          <div className='row'>
            
            <div className='col-md-3 col-lg-4 col-xl-3 mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4' style={{ color: 'white' }}>
              <i class="fa fa-book me-3" ></i>{" "}
                Ezlish
              </h6>
              <p>
              Chart your path to English mastery: Test, Analyze, Learn, Practice, and Propel your language skills forward!
              </p>
            </div>

            {/* <div className='col-md-2 col-lg-2 col-xl-2 mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'style={{ color: 'white' }}>Products</h6>
              <p>
                <a href='#!' className='text-reset'>
                  Angular
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  React
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  Vue
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  Laravel
                </a>
              </p>
            </div>

            <div className='col-md-3 col-lg-2 col-xl-2 mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'style={{ color: 'white' }}>Useful links</h6>
              <p>
                <a href='#!' className='text-reset'>
                  Pricing
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  Settings
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  Orders
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  Help
                </a>
              </p>
            </div> */}

            <div className='col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'style={{ color: 'white' }}>Contact</h6>
              <p>
                <FaHome className='me-2' />
                Hai Ba Trung, Hanoi
              </p>
              <p>
                <FaEnvelope className='me-3' />
                info@ezlish.com
              </p>
              <p>
                <FaPhone className='me-3' /> + 01 234 567 88
              </p>
              {/* <p>
                <FaPrint className='me-3' /> + 01 234 567 89
              </p> */}
            </div>
          </div>
        </div>
      </div>
      <div>
  <svg
    className="waves"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    viewBox="0 24 150 28"
    preserveAspectRatio="none"
    shapeRendering="auto"
  >
    <defs>
      <path
        id="gentle-wave"
        d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
      />
    </defs>
    <g className="parallax">
      <use xlinkHref="#gentle-wave" x="48" y="0" fill="rgba(255,255,255,0.7)" />
      <use xlinkHref="#gentle-wave" x="48" y="3" fill="rgba(255,255,255,0.5)" />
      <use xlinkHref="#gentle-wave" x="48" y="5" fill="rgba(255,255,255,0.3)" />
      <use xlinkHref="#gentle-wave" x="48" y="7" fill="#fff" />
    </g>
  </svg>
</div>

      <div className='copyright'>
        © 2023. All rights reserved. <a href='https://ezlish.com/' className='text-reset fw-bold'>Ezlish.com</a>
      </div>
    </footer>
    </>
  );
}
