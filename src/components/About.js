import React, { useEffect } from 'react';
import '../About.css'; // Import the CSS for styling

function About() {
  useEffect(() => {
    document.title = "Shelflyst - About";
  }, []); // Empty dependency array means this effect runs only once after the initial render

  return (
    <section className="vh-100 bg-light d-flex align-items-center justify-content-center mt-5 ">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8 col-xl-6">
            <div className="card shadow-sm rounded p-4">
              <div className="card-body">
                <h1 className="text-center mb-4">Welcome to Shelflyst</h1>
                {/* Add the image here */}
                <div className="text-center mb-4">
                  <img
                    src={`${process.env.PUBLIC_URL}/images/img1.png`} 
                    alt="Overview" 
                    style={{ 
                      maxWidth: '100%', 
                      height: '350px',
                      maxHeight: '350px',
                      objectFit: 'contain'
                    }} 
                    className="img-fluid rounded"
                  />
                </div>
                <p className="lead text-center mb-4">
                  Shelflyst is a platform designed to help users personalize their book collections. With Shelflyst, you can easily search for books, add them to your collection, and manage your shelf in a seamless and intuitive way.
                </p>
                <p className="text-center mt-4">
                  Developed by <strong>Syed Mohammed Ibrahim Ali</strong>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
