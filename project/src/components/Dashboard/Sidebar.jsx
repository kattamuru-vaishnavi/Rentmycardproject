import React from 'react';
import './Sidebar.css'; // Make sure to add the styles in a separate CSS file

const Sidebar = () => {
  return (
    <div className="sidebar">
      <ul className="sidebar-list">
        <li className="sidebar-item">
          <a href="#profile">Profile</a>
        </li>
        <li className="sidebar-item">
          <a href="#learn-more">Learn More</a>
        </li>
        <li className="sidebar-item">
          <a href="#faqs">FAQs</a>
        </li>
        <li className="sidebar-item">
          <a href="#help">Help</a>
        </li>
        <li className="sidebar-item">
          <a href="#reviews">Reviews</a>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
