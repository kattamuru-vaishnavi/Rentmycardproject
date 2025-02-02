import React, { useEffect } from 'react';
import Glide from '@glidejs/glide';
import './GlideSlider.css'; // Custom styles for the slider
import "../../assets/css/glide.core.min.css";
import "../../assets/css/glide.theme.css";

const GlideSlider = ({ title, sentence }) => {
  useEffect(() => {
    // Initialize Glide carousel slider
    const glide = new Glide(`.${title}`, {
      type: 'carousel', // Set the type to carousel
      perView: 1, // Show 1 item per view, adjust for more if needed
      gap: 10, // Space between slides
      focusAt: 'center', // Focus on the center slide
      animationDuration: 500, // Slide transition duration in ms
      breakpoints: {
        // Responsive behavior for different screen sizes
        1200: {
          perView: 3, // Show 3 slides for larger screens (e.g. desktop)
        },
        768: {
          perView: 2, // Show 2 slides for tablets
        },
        480: {
          perView: 1, // Show 1 slide for mobile
        },
      },
    });

    glide.mount(); // Mount the Glide instance

    return () => {
      glide.destroy(); // Clean up Glide on component unmount
    };
  }, [title]); // Runs whenever the 'title' prop changes

  return (
    <div>
      <div className="glide-container">
        <div className={`glide ${title}`}>
          <div className="glide__track" data-glide-el="track">
            <ul className="glide__slides">
              <li className="glide__slide">
                <div className="slide-content">
                  <p>Slide 1</p>
                </div>
              </li>
              <li className="glide__slide">
                <div className="slide-content">
                  <p>Slide 2</p>
                </div>
              </li>
              <li className="glide__slide">
                <div className="slide-content">
                  <p>Slide 3</p>
                </div>
              </li>
              {/* Add more slides if needed */}
            </ul>
          </div>

          {/* Custom Navigation Controls */}
          <div className="glide_arrows" data-glide-el="controls">
            <button className="glide_arrow glide_arrow--left" data-glide-dir="<">
              prev
            </button>
            <button className="glide_arrow glide_arrow--right" data-glide-dir=">">
              next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GlideSlider;
