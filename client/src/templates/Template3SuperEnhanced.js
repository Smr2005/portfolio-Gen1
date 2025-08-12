import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";

function Template3SuperEnhanced({ isPreview = false, userData = null, onDataChange = null }) {
  const [data, setData] = useState({});

  const defaultData = {
    name: "Maya Rodriguez",
    title: "Creative Director & Visual Storyteller",
    email: "maya.rodriguez@example.com",
    phone: "+1 (555) 456-7890",
    location: "Los Angeles, CA",
    linkedin: "https://linkedin.com/in/mayarodriguez",
    github: "https://github.com/mayarodriguez",
    website: "https://mayarodriguez.com",
    profileImage: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
    about: "I'm a creative director who believes in the power of visual storytelling. With over 8 years of experience in branding, digital design, and creative strategy, I help brands find their unique voice and connect with their audience through compelling visual narratives.",
    heroQuote: "Design is not just what it looks like and feels like. Design is how it works.",
    heroSubtext: "Creating meaningful experiences through innovative design",
    aboutTitle: "My Story",
    experienceTitle: "Career Journey",
    skillsTitle: "Creative Arsenal",
    projectsTitle: "Featured Work",
    contactTitle: "Let's Create Together",
    experience: [
      {
        company: "Creative Agency Co.",
        position: "Creative Director",
        duration: "2022 - Present",
        location: "Los Angeles, CA",
        description: "Leading creative vision for Fortune 500 clients, managing a team of 12 designers and developers, overseeing brand strategy and digital campaigns.",
        achievements: [
          "Increased client retention by 85%",
          "Won 3 industry design awards",
          "Led rebranding for 15+ major clients"
        ]
      },
      {
        company: "Design Studio",
        position: "Senior Art Director",
        duration: "2019 - 2022",
        location: "San Francisco, CA",
        description: "Conceptualized and executed creative campaigns for tech startups and established brands, focusing on digital-first design solutions.",
        achievements: [
          "Launched 50+ successful campaigns",
          "Mentored 8 junior designers",
          "Increased team productivity by 40%"
        ]
      }
    ],
    skills: [
      { name: "Brand Strategy", level: 95, category: "Strategy" },
      { name: "Visual Design", level: 98, category: "Design" },
      { name: "Adobe Creative Suite", level: 95, category: "Tools" },
      { name: "UI/UX Design", level: 90, category: "Digital" },
      { name: "Typography", level: 92, category: "Design" },
      { name: "Creative Direction", level: 88, category: "Leadership" }
    ],
    projects: [
      {
        title: "Brand Revolution",
        description: "Complete rebrand for a sustainable fashion startup, including logo, packaging, and digital presence",
        image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=500&h=300&fit=crop",
        technologies: ["Branding", "Packaging", "Digital Design"],
        liveUrl: "https://example.com",
        githubUrl: "https://behance.net/example"
      },
      {
        title: "Digital Campaign",
        description: "Multi-platform digital campaign for a tech conference, reaching 2M+ impressions",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&h=300&fit=crop",
        technologies: ["Digital Marketing", "Motion Graphics", "Social Media"],
        liveUrl: "https://example.com",
        githubUrl: "https://behance.net/example"
      },
      {
        title: "App Interface",
        description: "Mobile app design for a fitness startup with focus on user engagement and retention",
        image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=500&h=300&fit=crop",
        technologies: ["UI Design", "Prototyping", "User Research"],
        liveUrl: "https://example.com",
        githubUrl: "https://behance.net/example"
      }
    ]
  };

  useEffect(() => {
    setData(userData || defaultData);
  }, [userData]);

  const handleEdit = (field, value, index = null, subField = null) => {
    if (!isPreview) return;
    
    let newData = { ...data };
    
    if (index !== null && subField) {
      if (subField.includes('.')) {
        const [mainField, subIndex] = subField.split('.');
        newData[field][index][mainField][parseInt(subIndex)] = value;
      } else {
        newData[field][index][subField] = value;
      }
    } else if (index !== null) {
      newData[field][index] = value;
    } else {
      newData[field] = value;
    }
    
    setData(newData);
    if (onDataChange) onDataChange(newData);
  };

  const EditableText = ({ value, field, className = "", tag = "span", index = null, subField = null, placeholder = "Click to edit..." }) => {
    const Tag = tag;
    return (
      <Tag
        className={className}
        contentEditable={isPreview}
        suppressContentEditableWarning={true}
        onBlur={(e) => handleEdit(field, e.target.textContent, index, subField)}
        style={{ 
          outline: isPreview ? '2px dashed rgba(255,107,107,0.4)' : 'none',
          minHeight: isPreview ? '20px' : 'auto',
          cursor: isPreview ? 'text' : 'default',
          padding: isPreview ? '4px' : '0',
          borderRadius: isPreview ? '4px' : '0',
          transition: 'all 0.2s ease'
        }}
        placeholder={placeholder}
        onFocus={(e) => {
          if (isPreview) {
            e.target.style.outline = '2px solid #ff6b6b';
            e.target.style.backgroundColor = 'rgba(255,107,107,0.1)';
          }
        }}
        onBlur={(e) => {
          if (isPreview) {
            e.target.style.outline = '2px dashed rgba(255,107,107,0.4)';
            e.target.style.backgroundColor = 'transparent';
          }
          handleEdit(field, e.target.textContent, index, subField);
        }}
      >
        {value || placeholder}
      </Tag>
    );
  };

  return (
    <div className="template3-magazine">
      <style jsx>{`
        .template3-magazine {
          font-family: 'Poppins', 'Arial', sans-serif;
          background: #ffffff;
          color: #333;
          overflow-x: hidden;
          line-height: 1.6;
        }
        
        /* Hero Section - Magazine Style */
        .hero-section {
          min-height: 100vh;
          background: linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4, #feca57);
          background-size: 400% 400%;
          animation: gradientShift 15s ease infinite;
          position: relative;
          overflow: hidden;
          display: flex;
          align-items: center;
        }
        
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        .hero-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: 
            url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="dots" width="20" height="20" patternUnits="userSpaceOnUse"><circle cx="10" cy="10" r="2" fill="rgba(255,255,255,0.3)"/></pattern></defs><rect width="100" height="100" fill="url(%23dots)"/></svg>');
          opacity: 0.6;
        }
        
        .hero-content {
          position: relative;
          z-index: 2;
          color: white;
        }
        
        .hero-badge {
          background: rgba(255,255,255,0.2);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255,255,255,0.3);
          padding: 0.5rem 1.5rem;
          border-radius: 50px;
          font-size: 0.9rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 1px;
          display: inline-block;
          margin-bottom: 2rem;
        }
        
        .hero-name {
          font-size: 5rem;
          font-weight: 900;
          line-height: 0.9;
          margin-bottom: 1rem;
          text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
          transform: rotate(-2deg);
        }
        
        .hero-title {
          font-size: 1.8rem;
          font-weight: 300;
          margin-bottom: 2rem;
          opacity: 0.95;
          transform: rotate(1deg);
        }
        
        .hero-quote {
          font-size: 2.5rem;
          font-weight: 700;
          font-style: italic;
          margin-bottom: 1rem;
          text-shadow: 1px 1px 2px rgba(0,0,0,0.2);
          transform: rotate(-1deg);
        }
        
        .hero-subtext {
          font-size: 1.2rem;
          opacity: 0.9;
          margin-bottom: 3rem;
        }
        
        .profile-container {
          position: relative;
          transform: rotate(5deg);
        }
        
        .profile-image {
          width: 300px;
          height: 400px;
          object-fit: cover;
          border-radius: 20px;
          border: 8px solid rgba(255,255,255,0.3);
          box-shadow: 
            0 25px 50px rgba(0,0,0,0.3),
            0 0 0 1px rgba(255,255,255,0.2);
          transition: all 0.4s ease;
        }
        
        .profile-image:hover {
          transform: scale(1.05) rotate(-2deg);
        }
        
        .profile-container::after {
          content: '✨';
          position: absolute;
          top: -20px;
          right: -20px;
          font-size: 3rem;
          animation: bounce 2s infinite;
        }
        
        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-10px); }
          60% { transform: translateY(-5px); }
        }
        
        .cta-buttons {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
        }
        
        .magazine-button {
          background: rgba(255,255,255,0.2);
          backdrop-filter: blur(10px);
          border: 2px solid rgba(255,255,255,0.3);
          color: white;
          padding: 15px 30px;
          border-radius: 50px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1px;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }
        
        .magazine-button::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
          transition: left 0.5s;
        }
        
        .magazine-button:hover::before {
          left: 100%;
        }
        
        .magazine-button:hover {
          background: rgba(255,255,255,0.3);
          transform: translateY(-3px);
          box-shadow: 0 10px 25px rgba(0,0,0,0.2);
        }
        
        /* Section Styles */
        .section {
          padding: 120px 0;
          position: relative;
        }
        
        .section-title {
          font-size: 4rem;
          font-weight: 900;
          margin-bottom: 4rem;
          position: relative;
          display: inline-block;
        }
        
        .section-title.red {
          color: #ff6b6b;
          transform: rotate(-2deg);
        }
        
        .section-title.blue {
          color: #45b7d1;
          transform: rotate(1deg);
        }
        
        .section-title.green {
          color: #4ecdc4;
          transform: rotate(-1deg);
        }
        
        .section-title.yellow {
          color: #feca57;
          transform: rotate(2deg);
        }
        
        .section-title::after {
          content: '';
          position: absolute;
          bottom: -10px;
          left: 0;
          width: 100%;
          height: 8px;
          background: currentColor;
          opacity: 0.3;
          transform: skew(-12deg);
        }
        
        /* About Section */
        .about-section {
          background: linear-gradient(135deg, #ff6b6b 0%, #4ecdc4 100%);
          color: white;
          position: relative;
        }
        
        .about-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: 
            url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><polygon points="0,0 100,0 80,100 0,100" fill="rgba(255,255,255,0.1)"/></svg>');
          opacity: 0.5;
        }
        
        .about-content {
          position: relative;
          z-index: 2;
        }
        
        .about-text {
          font-size: 1.4rem;
          line-height: 1.8;
          font-weight: 300;
          background: rgba(255,255,255,0.1);
          backdrop-filter: blur(10px);
          padding: 3rem;
          border-radius: 20px;
          border: 1px solid rgba(255,255,255,0.2);
          transform: rotate(-1deg);
        }
        
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 2rem;
          margin-top: 4rem;
        }
        
        .stat-card {
          background: rgba(255,255,255,0.15);
          backdrop-filter: blur(15px);
          padding: 2rem;
          border-radius: 20px;
          text-align: center;
          border: 1px solid rgba(255,255,255,0.2);
          transition: all 0.3s ease;
          transform: rotate(1deg);
        }
        
        .stat-card:nth-child(even) {
          transform: rotate(-1deg);
        }
        
        .stat-card:hover {
          transform: rotate(0deg) scale(1.05);
          background: rgba(255,255,255,0.2);
        }
        
        .stat-number {
          font-size: 3rem;
          font-weight: 900;
          display: block;
          margin-bottom: 0.5rem;
        }
        
        .stat-label {
          font-size: 1.1rem;
          opacity: 0.9;
          text-transform: uppercase;
          letter-spacing: 1px;
        }
        
        /* Skills Section */
        .skills-section {
          background: #f8f9fa;
          position: relative;
        }
        
        .skills-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: 
            url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="20" cy="20" r="15" fill="rgba(255,107,107,0.1)"/><circle cx="80" cy="60" r="20" fill="rgba(78,205,196,0.1)"/><circle cx="50" cy="80" r="10" fill="rgba(69,183,209,0.1)"/></svg>');
        }
        
        .skills-content {
          position: relative;
          z-index: 2;
        }
        
        .skills-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 3rem;
        }
        
        .skill-category {
          background: white;
          padding: 2.5rem;
          border-radius: 25px;
          box-shadow: 0 15px 35px rgba(0,0,0,0.1);
          transition: all 0.4s ease;
          position: relative;
          overflow: hidden;
        }
        
        .skill-category::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 5px;
          background: linear-gradient(90deg, #ff6b6b, #4ecdc4, #45b7d1);
        }
        
        .skill-category:hover {
          transform: translateY(-10px) rotate(1deg);
          box-shadow: 0 25px 50px rgba(0,0,0,0.15);
        }
        
        .skill-category:nth-child(even):hover {
          transform: translateY(-10px) rotate(-1deg);
        }
        
        .skill-category-title {
          font-size: 1.5rem;
          font-weight: 800;
          margin-bottom: 2rem;
          color: #333;
          text-transform: uppercase;
          letter-spacing: 1px;
        }
        
        .skill-item {
          margin-bottom: 1.5rem;
        }
        
        .skill-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.8rem;
        }
        
        .skill-name {
          font-weight: 600;
          color: #333;
        }
        
        .skill-percentage {
          font-weight: 700;
          color: #ff6b6b;
        }
        
        .skill-bar {
          height: 8px;
          background: #e9ecef;
          border-radius: 4px;
          overflow: hidden;
          position: relative;
        }
        
        .skill-progress {
          height: 100%;
          background: linear-gradient(90deg, #ff6b6b, #4ecdc4);
          border-radius: 4px;
          transition: width 2s ease-in-out;
          position: relative;
        }
        
        .skill-progress::after {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent);
          animation: shimmer 2s infinite;
        }
        
        @keyframes shimmer {
          0% { left: -100%; }
          100% { left: 100%; }
        }
        
        /* Experience Section */
        .experience-section {
          background: linear-gradient(135deg, #45b7d1 0%, #96ceb4 100%);
          color: white;
          position: relative;
        }
        
        .experience-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: 
            url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><polygon points="20,0 100,0 100,80 0,100 0,20" fill="rgba(255,255,255,0.1)"/></svg>');
        }
        
        .experience-content {
          position: relative;
          z-index: 2;
        }
        
        .experience-timeline {
          position: relative;
        }
        
        .experience-item {
          background: rgba(255,255,255,0.15);
          backdrop-filter: blur(15px);
          border: 1px solid rgba(255,255,255,0.2);
          border-radius: 25px;
          padding: 3rem;
          margin-bottom: 3rem;
          transition: all 0.4s ease;
          transform: rotate(-1deg);
        }
        
        .experience-item:nth-child(even) {
          transform: rotate(1deg);
          margin-left: auto;
          margin-right: 0;
          max-width: 80%;
        }
        
        .experience-item:nth-child(odd) {
          margin-left: 0;
          margin-right: auto;
          max-width: 80%;
        }
        
        .experience-item:hover {
          transform: rotate(0deg) scale(1.02);
          background: rgba(255,255,255,0.2);
        }
        
        .experience-header {
          margin-bottom: 1.5rem;
        }
        
        .experience-position {
          font-size: 1.8rem;
          font-weight: 800;
          margin-bottom: 0.5rem;
        }
        
        .experience-company {
          font-size: 1.3rem;
          opacity: 0.9;
          margin-bottom: 0.5rem;
        }
        
        .experience-meta {
          font-size: 1rem;
          opacity: 0.8;
        }
        
        .experience-description {
          font-size: 1.1rem;
          line-height: 1.7;
          margin-bottom: 1.5rem;
        }
        
        .achievements-list {
          list-style: none;
          padding: 0;
        }
        
        .achievements-list li {
          position: relative;
          padding-left: 2rem;
          margin-bottom: 0.8rem;
          opacity: 0.95;
        }
        
        .achievements-list li::before {
          content: '🎯';
          position: absolute;
          left: 0;
          font-size: 1.2rem;
        }
        
        /* Projects Section */
        .projects-section {
          background: #ffffff;
          position: relative;
        }
        
        .projects-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: 
            url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect x="10" y="10" width="30" height="30" fill="rgba(255,107,107,0.05)" transform="rotate(45 25 25)"/><rect x="60" y="40" width="25" height="25" fill="rgba(78,205,196,0.05)" transform="rotate(-30 72.5 52.5)"/></svg>');
        }
        
        .projects-content {
          position: relative;
          z-index: 2;
        }
        
        .projects-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
          gap: 3rem;
        }
        
        .project-card {
          background: white;
          border-radius: 25px;
          overflow: hidden;
          box-shadow: 0 15px 35px rgba(0,0,0,0.1);
          transition: all 0.4s ease;
          position: relative;
        }
        
        .project-card:hover {
          transform: translateY(-15px) rotate(2deg);
          box-shadow: 0 25px 50px rgba(0,0,0,0.2);
        }
        
        .project-card:nth-child(even):hover {
          transform: translateY(-15px) rotate(-2deg);
        }
        
        .project-image {
          width: 100%;
          height: 250px;
          object-fit: cover;
          transition: transform 0.4s ease;
        }
        
        .project-card:hover .project-image {
          transform: scale(1.1);
        }
        
        .project-content {
          padding: 2.5rem;
        }
        
        .project-title {
          font-size: 1.6rem;
          font-weight: 800;
          margin-bottom: 1rem;
          color: #333;
        }
        
        .project-description {
          color: #666;
          line-height: 1.7;
          margin-bottom: 2rem;
        }
        
        .project-tech {
          display: flex;
          flex-wrap: wrap;
          gap: 0.8rem;
          margin-bottom: 2rem;
        }
        
        .tech-tag {
          background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
          color: white;
          padding: 0.5rem 1rem;
          border-radius: 20px;
          font-size: 0.85rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        
        .project-links {
          display: flex;
          gap: 1rem;
        }
        
        .project-button {
          flex: 1;
          padding: 12px 24px;
          border: 2px solid #ff6b6b;
          background: transparent;
          color: #ff6b6b;
          border-radius: 25px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1px;
          transition: all 0.3s ease;
          text-decoration: none;
          text-align: center;
          display: block;
        }
        
        .project-button:hover {
          background: #ff6b6b;
          color: white;
          transform: translateY(-2px);
        }
        
        .project-button.secondary {
          border-color: #4ecdc4;
          color: #4ecdc4;
        }
        
        .project-button.secondary:hover {
          background: #4ecdc4;
          color: white;
        }
        
        /* Contact Section */
        .contact-section {
          background: linear-gradient(135deg, #feca57 0%, #ff6b6b 100%);
          color: white;
          position: relative;
        }
        
        .contact-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: 
            url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="80" cy="20" r="15" fill="rgba(255,255,255,0.1)"/><circle cx="20" cy="70" r="20" fill="rgba(255,255,255,0.05)"/></svg>');
        }
        
        .contact-content {
          position: relative;
          z-index: 2;
          text-align: center;
        }
        
        .contact-intro {
          font-size: 1.5rem;
          margin-bottom: 4rem;
          font-weight: 300;
        }
        
        .contact-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 2rem;
          margin-bottom: 4rem;
        }
        
        .contact-item {
          background: rgba(255,255,255,0.15);
          backdrop-filter: blur(15px);
          border: 1px solid rgba(255,255,255,0.2);
          padding: 2rem;
          border-radius: 20px;
          transition: all 0.3s ease;
          transform: rotate(1deg);
        }
        
        .contact-item:nth-child(even) {
          transform: rotate(-1deg);
        }
        
        .contact-item:hover {
          transform: rotate(0deg) scale(1.05);
          background: rgba(255,255,255,0.2);
        }
        
        .contact-icon {
          font-size: 2.5rem;
          margin-bottom: 1rem;
          display: block;
        }
        
        .contact-label {
          font-size: 0.9rem;
          opacity: 0.8;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 0.5rem;
        }
        
        .contact-value {
          font-size: 1.1rem;
          font-weight: 600;
        }
        
        .social-links {
          display: flex;
          justify-content: center;
          gap: 2rem;
        }
        
        .social-link {
          width: 60px;
          height: 60px;
          background: rgba(255,255,255,0.2);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255,255,255,0.3);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 1.5rem;
          text-decoration: none;
          transition: all 0.3s ease;
        }
        
        .social-link:hover {
          background: rgba(255,255,255,0.3);
          transform: scale(1.1) rotate(10deg);
          color: white;
        }
        
        /* Responsive Design */
        @media (max-width: 768px) {
          .hero-name {
            font-size: 3rem;
          }
          
          .hero-quote {
            font-size: 1.8rem;
          }
          
          .section-title {
            font-size: 2.5rem;
          }
          
          .profile-image {
            width: 250px;
            height: 300px;
          }
          
          .projects-grid {
            grid-template-columns: 1fr;
          }
          
          .skills-grid {
            grid-template-columns: 1fr;
          }
          
          .experience-item:nth-child(even),
          .experience-item:nth-child(odd) {
            max-width: 100%;
            margin-left: 0;
            margin-right: 0;
          }
        }
        
        @media (max-width: 576px) {
          .hero-name {
            font-size: 2.5rem;
          }
          
          .hero-quote {
            font-size: 1.5rem;
          }
          
          .section {
            padding: 80px 0;
          }
          
          .profile-image {
            width: 200px;
            height: 250px;
          }
          
          .about-text {
            padding: 2rem;
          }
          
          .skill-category,
          .experience-item {
            padding: 2rem;
          }
        }
        
        /* Edit Mode Styles */
        .template3-magazine [contenteditable="true"]:hover {
          background-color: rgba(255,107,107,0.1) !important;
        }
        
        .template3-magazine [contenteditable="true"]:focus {
          background-color: rgba(255,107,107,0.15) !important;
          outline: 2px solid #ff6b6b !important;
        }
      `}</style>

      {/* Hero Section */}
      <section className="hero-section">
        <Container>
          <Row className="align-items-center min-vh-100">
            <Col lg={7}>
              <div className="hero-content">
                <div className="hero-badge">Creative Professional</div>
                <EditableText
                  value={data.name}
                  field="name"
                  className="hero-name"
                  tag="h1"
                  placeholder="Your Name"
                />
                <EditableText
                  value={data.title}
                  field="title"
                  className="hero-title"
                  tag="p"
                  placeholder="Your Professional Title"
                />
                <EditableText
                  value={data.heroQuote}
                  field="heroQuote"
                  className="hero-quote"
                  tag="h2"
                  placeholder="Your inspiring quote"
                />
                <EditableText
                  value={data.heroSubtext}
                  field="heroSubtext"
                  className="hero-subtext"
                  tag="p"
                  placeholder="Your mission statement"
                />
                <div className="cta-buttons">
                  <button className="magazine-button">
                    View My Work
                  </button>
                  <button className="magazine-button">
                    Get In Touch
                  </button>
                </div>
              </div>
            </Col>
            <Col lg={5} className="text-center">
              <div className="profile-container">
                <img
                  src={data.profileImage}
                  alt="Profile"
                  className="profile-image"
                />
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* About Section */}
      <section className="about-section section">
        <Container>
          <div className="about-content">
            <EditableText
              value={data.aboutTitle}
              field="aboutTitle"
              className="section-title red"
              tag="h2"
              placeholder="About Me"
            />
            <Row>
              <Col lg={8}>
                <div className="about-text">
                  <EditableText
                    value={data.about}
                    field="about"
                    tag="p"
                    placeholder="Tell your creative story here..."
                  />
                </div>
              </Col>
            </Row>
            <div className="stats-grid">
              <div className="stat-card">
                <span className="stat-number">150+</span>
                <span className="stat-label">Projects</span>
              </div>
              <div className="stat-card">
                <span className="stat-number">8+</span>
                <span className="stat-label">Years</span>
              </div>
              <div className="stat-card">
                <span className="stat-number">50+</span>
                <span className="stat-label">Clients</span>
              </div>
              <div className="stat-card">
                <span className="stat-number">15</span>
                <span className="stat-label">Awards</span>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Skills Section */}
      <section className="skills-section section">
        <Container>
          <div className="skills-content">
            <EditableText
              value={data.skillsTitle}
              field="skillsTitle"
              className="section-title blue"
              tag="h2"
              placeholder="Skills"
            />
            <div className="skills-grid">
              {['Creative', 'Technical', 'Leadership'].map((category, catIndex) => (
                <div key={catIndex} className="skill-category">
                  <h3 className="skill-category-title">{category}</h3>
                  {data.skills?.filter(skill => 
                    (category === 'Creative' && ['Brand', 'Visual', 'Typography'].some(term => skill.name.includes(term))) ||
                    (category === 'Technical' && ['Adobe', 'UI/UX'].some(term => skill.name.includes(term))) ||
                    (category === 'Leadership' && skill.name.includes('Direction'))
                  ).map((skill, index) => (
                    <div key={index} className="skill-item">
                      <div className="skill-header">
                        <EditableText
                          value={skill.name}
                          field="skills"
                          index={data.skills.indexOf(skill)}
                          subField="name"
                          className="skill-name"
                          placeholder="Skill name"
                        />
                        <span className="skill-percentage">{skill.level}%</span>
                      </div>
                      <div className="skill-bar">
                        <div
                          className="skill-progress"
                          style={{ width: `${skill.level}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Experience Section */}
      <section className="experience-section section">
        <Container>
          <div className="experience-content">
            <EditableText
              value={data.experienceTitle}
              field="experienceTitle"
              className="section-title green"
              tag="h2"
              placeholder="Experience"
            />
            <div className="experience-timeline">
              {data.experience?.map((exp, index) => (
                <div key={index} className="experience-item">
                  <div className="experience-header">
                    <EditableText
                      value={exp.position}
                      field="experience"
                      index={index}
                      subField="position"
                      className="experience-position"
                      tag="h3"
                      placeholder="Position"
                    />
                    <EditableText
                      value={exp.company}
                      field="experience"
                      index={index}
                      subField="company"
                      className="experience-company"
                      tag="h4"
                      placeholder="Company"
                    />
                    <div className="experience-meta">
                      <EditableText
                        value={exp.duration}
                        field="experience"
                        index={index}
                        subField="duration"
                        placeholder="Duration"
                      />
                      {' • '}
                      <EditableText
                        value={exp.location}
                        field="experience"
                        index={index}
                        subField="location"
                        placeholder="Location"
                      />
                    </div>
                  </div>
                  <EditableText
                    value={exp.description}
                    field="experience"
                    index={index}
                    subField="description"
                    className="experience-description"
                    tag="p"
                    placeholder="Job description..."
                  />
                  {exp.achievements && (
                    <ul className="achievements-list">
                      {exp.achievements.map((achievement, achIndex) => (
                        <li key={achIndex}>
                          <EditableText
                            value={achievement}
                            field="experience"
                            index={index}
                            subField={`achievements.${achIndex}`}
                            placeholder="Achievement..."
                          />
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Projects Section */}
      <section className="projects-section section">
        <Container>
          <div className="projects-content">
            <EditableText
              value={data.projectsTitle}
              field="projectsTitle"
              className="section-title yellow"
              tag="h2"
              placeholder="Projects"
            />
            <div className="projects-grid">
              {data.projects?.map((project, index) => (
                <div key={index} className="project-card">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="project-image"
                  />
                  <div className="project-content">
                    <EditableText
                      value={project.title}
                      field="projects"
                      index={index}
                      subField="title"
                      className="project-title"
                      tag="h3"
                      placeholder="Project Title"
                    />
                    <EditableText
                      value={project.description}
                      field="projects"
                      index={index}
                      subField="description"
                      className="project-description"
                      tag="p"
                      placeholder="Project description..."
                    />
                    <div className="project-tech">
                      {project.technologies?.map((tech, techIndex) => (
                        <span key={techIndex} className="tech-tag">
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="project-links">
                      <a href={project.liveUrl} className="project-button" target="_blank" rel="noopener noreferrer">
                        View Live
                      </a>
                      <a href={project.githubUrl} className="project-button secondary" target="_blank" rel="noopener noreferrer">
                        Portfolio
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Contact Section */}
      <section className="contact-section section">
        <Container>
          <div className="contact-content">
            <EditableText
              value={data.contactTitle}
              field="contactTitle"
              className="section-title"
              tag="h2"
              placeholder="Contact"
              style={{ color: 'white' }}
            />
            <p className="contact-intro">
              Ready to create something amazing together? Let's talk!
            </p>
            <div className="contact-grid">
              <div className="contact-item">
                <span className="contact-icon">📧</span>
                <div className="contact-label">Email</div>
                <EditableText
                  value={data.email}
                  field="email"
                  className="contact-value"
                  placeholder="your.email@example.com"
                />
              </div>
              <div className="contact-item">
                <span className="contact-icon">📱</span>
                <div className="contact-label">Phone</div>
                <EditableText
                  value={data.phone}
                  field="phone"
                  className="contact-value"
                  placeholder="+1 (555) 123-4567"
                />
              </div>
              <div className="contact-item">
                <span className="contact-icon">📍</span>
                <div className="contact-label">Location</div>
                <EditableText
                  value={data.location}
                  field="location"
                  className="contact-value"
                  placeholder="Your Location"
                />
              </div>
            </div>
            <div className="social-links">
              <a href={data.linkedin} className="social-link" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a href={data.github} className="social-link" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-github"></i>
              </a>
              <a href={data.website} className="social-link" target="_blank" rel="noopener noreferrer">
                <i className="fas fa-globe"></i>
              </a>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}

export default Template3SuperEnhanced;