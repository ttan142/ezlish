import React from 'react';
import './Footer.css'
export default function Footer() {
  return (
    <>
      <footer>
        <div className="footer-container" class="bg-dark">
          <div className="wrap">
            <div className="footer">
              <h1 id="title" class="text-white">
                eLearning
              </h1>

              <div class="d-flex pt-2">
                <a class="btn btn-outline-light btn-social" href="">
                  <i class="fab fa-twitter"></i>
                </a>
                <a class="btn btn-outline-light btn-social" href="">
                  <i class="fab fa-facebook-f"></i>
                </a>
                <a class="btn btn-outline-light btn-social" href="">
                  <i class="fab fa-youtube"></i>
                </a>
                <a class="btn btn-outline-light btn-social" href="">
                  <i class="fab fa-linkedin-in"></i>
                </a>
              </div>
            </div>
            <div className="footer">
              <h1 id="title" class="text-white">
                Resource
              </h1>
              <a class="text-white">Opening Schedule</a>
              <a class="text-white">Tests</a>
              <a class="text-white">Community</a>
              <a class="text-white">Study</a>
              <a class="text-white">Live class</a>
            </div>
            <div className="footer">
              <h1 class="text-white mb-3">Contact</h1>
              <a class="mb-2 text-white">
                <i class="fa fa-map-marker-alt me-3"></i>123 Street, New York,
                USA
              </a>
              <a class="mb-2 text-white">
                <i class="fa fa-phone-alt me-3"></i>+012 345 67890
              </a>
              <a class="mb-2 text-white">
                <i class="fa fa-envelope me-3"></i>info@example.com
              </a>
            </div>
            <div className="footer">
              <h1 id="title" class="text-white">
                Support
              </h1>
              <a class="text-white">Guideline</a>
              <a class="text-white">Your Account</a>
              <a class="text-white">Customer Services</a>
              <a class="text-white">Help</a>
            </div>
            <div className="footer">
              <h1 id="title" class="text-white">
                Get to Know Us
              </h1>
              <a class="text-white">About us</a>
              <a class="text-white">Contact</a>
              <a class="text-white">Policy</a>
              <a class="text-white">Terms of use</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
