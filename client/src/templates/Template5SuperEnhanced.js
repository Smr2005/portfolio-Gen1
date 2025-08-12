import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";

function Template5SuperEnhanced({ isPreview = false, userData = null, onDataChange = null }) {
  const [data, setData] = useState({});

  const defaultData = {
    name: "Riley Chen",
    title: "Frontend Engineer & UI Specialist",
    email: "riley.chen@example.com",
    phone: "+1 (555) 345-6789",
    location: "San Francisco, CA",
    linkedin: "https://linkedin.com/in/rileychen",
    github: "https://github.com/rileychen",
    website: "https://rileychen.dev",
    profileImage: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
    about: "I'm a frontend engineer passionate about creating beautiful, performant user interfaces. I specialize in modern web technologies and love bringing designs to life with smooth animations and intuitive interactions.",
    heroQuote: "Crafting Digital Experiences",
    heroSubtext: "Where code meets creativity",
    aboutTitle: "About Me",
    experienceTitle: "Experience",
    skillsTitle: "Skills",
    projectsTitle: "Projects",
    contactTitle: "Get In Touch",
    experience: [
      {
        company: "Meta",
        position: "Senior Frontend Engineer",
        duration: "2022 - Present",
        location: "Menlo Park, CA",
        description: "Building user interfaces for Meta's core products, focusing on performance optimization and accessibility. Leading frontend architecture decisions for features used by millions.",
        achievements: [
          "Improved page load times by 40%",
          "Led accessibility initiative",
          "Mentored 6 junior engineers"
        ]
      },
      {
        company: "Airbnb",
        position: "Frontend Engineer",
        duration: "2020 - 2022",
        location: "San Francisco, CA",
        description: "Developed and maintained booking flow components, implemented design system components, and optimized mobile web performance.",
        achievements: [
          "Increased conversion rate by 25%",
          "Built reusable component library",
          "Reduced bundle size by 30%"
        ]
      }
    ],
    skills: [
      { name: "React & Next.js", level: 95, category: "Frontend" },
      { name: "TypeScript", level: 92, category: "Language" },
      { name: "CSS & Animations", level: 90, category: "Styling" },
      { name: "Vue.js", level: 85, category: "Frontend" },
      { name: "Node.js", level: 80, category: "Backend" },
      { name: "GraphQL", level: 78, category: "API" }
    ],
    projects: [
      {
        title: "Design System",
        description: "Comprehensive design system with 50+ components, used across multiple products",
        image: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=500&h=300&fit=crop",
        technologies: ["React", "Storybook", "TypeScript"],
        liveUrl: "https://example.com",
        githubUrl: "https://github.com/example"
      },
      {
        title: "E-commerce Platform",
        description: "Modern shopping experience with advanced filtering and smooth animations",
        image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=500&h=300&fit=crop",
        technologies: ["Next.js", "Framer Motion", "Stripe"],
        liveUrl: "https://example.com",
        githubUrl: "https://github.com/example"
      },
      {
        title: "Dashboard Analytics",
        description: "Real-time analytics dashboard with interactive charts and data visualization",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&h=300&fit=crop",
        technologies: ["React", "D3.js", "WebSocket"],
        liveUrl: "https://example.com",
        githubUrl: "https://github.com/example"
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
          outline: isPreview ? '2px dashed rgba(139,92,246,0.4)' : 'none',
          minHeight: isPreview ? '20px' : 'auto',
          cursor: isPreview ? 'text' : 'default',
          padding: isPreview ? '4px' : '0',
          borderRadius: isPreview ? '4px' : '0',
          transition: 'all 0.2s ease'
        }}
        placeholder={placeholder}
        onFocus={(e) => {
          if (isPreview) {
            e.target.style.outline = '2px solid #8b5cf6';
            e.target.style.backgroundColor = 'rgba(139,92,246,0.1)';
          }
        }}
        onBlur={(e) => {
          if (isPreview) {
            e.target.style.outline = '2px dashed rgba(139,92,246,0.4)';
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
    <div className="template5-glass">
      <style jsx>{`
        .template5-glass {
          font-family: 'Inter', 'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
          background-attachment: fixed;
          color: #1a202c;
          line-height: 1.6;
          overflow-x: hidden;
          min-height: 100vh;
        }
        
        /* Glassmorphism Base Styles */
        .glass {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
        }
        
        .glass-strong {
          background: rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(25px);
          -webkit-backdrop-filter: blur(25px);
          border: 1px solid rgba(255, 255, 255, 0.25);
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
        }
        
        .glass-subtle {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(15px);
          -webkit-backdrop-filter: blur(15px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
        }
        
        /* Floating Elements */
        .floating-element {
          position: absolute;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          animation: float 6s ease-in-out infinite;
        }
        
        .floating-element:nth-child(1) {
          width: 100px;
          height: 100px;
          top: 10%;
          left: 10%;
          animation-delay: 0s;
        }
        
        .floating-element:nth-child(2) {
          width: 150px;
          height: 150px;
          top: 60%;
          right: 10%;
          animation-delay: 2s;
        }
        
        .floating-element:nth-child(3) {
          width: 80px;
          height: 80px;
          bottom: 20%;
          left: 20%;
          animation-delay: 4s;
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-20px) rotate(120deg); }
          66% { transform: translateY(10px) rotate(240deg); }
        }
        
        /* Hero Section */
        .hero-section {
          min-height: 100vh;
          display: flex;
          align-items: center;
          position: relative;
          overflow: hidden;
        }
        
        .hero-content {
          position: relative;
          z-index: 10;
        }
        
        .hero-glass {
          border-radius: 30px;
          padding: 4rem;
          transition: all 0.4s ease;
          position: relative;
          overflow: hidden;
        }
        
        .hero-glass::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
          transition: left 0.8s;
        }
        
        .hero-glass:hover::before {
          left: 100%;
        }
        
        .hero-glass:hover {
          transform: translateY(-10px);
          background: rgba(255, 255, 255, 0.2);
        }
        
        .hero-badge {
          display: inline-block;
          padding: 0.5rem 1.5rem;
          border-radius: 50px;
          font-size: 0.9rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 2rem;
          color: white;
        }
        
        .hero-name {
          font-size: 4rem;
          font-weight: 800;
          margin-bottom: 1rem;
          color: white;
          text-shadow: 2px 2px 4px rgba(0,0,0,0.1);
          line-height: 1.1;
        }
        
        .hero-title {
          font-size: 1.5rem;
          color: rgba(255,255,255,0.9);
          margin-bottom: 2rem;
          font-weight: 400;
        }
        
        .hero-quote {
          font-size: 2.2rem;
          font-weight: 600;
          color: white;
          margin-bottom: 1rem;
          font-style: italic;
        }
        
        .hero-subtext {
          font-size: 1.2rem;
          color: rgba(255,255,255,0.8);
          margin-bottom: 3rem;
        }
        
        .hero-buttons {
          display: flex;
          gap: 1.5rem;
          flex-wrap: wrap;
        }
        
        .glass-button {
          padding: 15px 30px;
          border-radius: 50px;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
          color: white;
          border: none;
          cursor: pointer;
        }
        
        .glass-button::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
          transition: left 0.5s;
        }
        
        .glass-button:hover::before {
          left: 100%;
        }
        
        .glass-button:hover {
          transform: translateY(-3px);
          background: rgba(255, 255, 255, 0.2);
          color: white;
        }
        
        .profile-glass {
          border-radius: 30px;
          padding: 2.5rem;
          text-align: center;
          transition: all 0.4s ease;
          color: white;
        }
        
        .profile-glass:hover {
          transform: translateY(-10px) rotate(2deg);
          background: rgba(255, 255, 255, 0.2);
        }
        
        .profile-image {
          width: 250px;
          height: 250px;
          border-radius: 25px;
          object-fit: cover;
          margin-bottom: 2rem;
          border: 3px solid rgba(255,255,255,0.3);
          transition: all 0.4s ease;
          box-shadow: 0 15px 35px rgba(0,0,0,0.2);
        }
        
        .profile-image:hover {
          transform: scale(1.05);
          border-color: rgba(255,255,255,0.5);
        }
        
        /* Section Styles */
        .section {
          padding: 120px 0;
          position: relative;
        }
        
        .section-header {
          text-align: center;
          margin-bottom: 5rem;
        }
        
        .section-title {
          font-size: 3.5rem;
          font-weight: 800;
          color: white;
          margin-bottom: 1.5rem;
          text-shadow: 2px 2px 4px rgba(0,0,0,0.1);
          position: relative;
          display: inline-block;
        }
        
        .section-title::after {
          content: '';
          position: absolute;
          bottom: -15px;
          left: 50%;
          transform: translateX(-50%);
          width: 80px;
          height: 4px;
          background: rgba(255,255,255,0.6);
          border-radius: 2px;
        }
        
        .section-subtitle {
          font-size: 1.3rem;
          color: rgba(255,255,255,0.8);
          max-width: 600px;
          margin: 0 auto;
        }
        
        /* About Section */
        .about-section {
          position: relative;
        }
        
        .about-glass {
          border-radius: 25px;
          padding: 3rem;
          transition: all 0.4s ease;
          color: white;
        }
        
        .about-glass:hover {
          transform: translateY(-8px);
          background: rgba(255, 255, 255, 0.2);
        }
        
        .about-text {
          font-size: 1.3rem;
          line-height: 1.8;
          margin-bottom: 3rem;
        }
        
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 2rem;
        }
        
        .stat-glass {
          border-radius: 20px;
          padding: 2rem;
          text-align: center;
          transition: all 0.4s ease;
          color: white;
        }
        
        .stat-glass:hover {
          transform: translateY(-8px) scale(1.05);
          background: rgba(255, 255, 255, 0.2);
        }
        
        .stat-number {
          font-size: 2.5rem;
          font-weight: 800;
          display: block;
          margin-bottom: 0.5rem;
          color: white;
        }
        
        .stat-label {
          font-size: 1rem;
          opacity: 0.9;
          text-transform: uppercase;
          letter-spacing: 1px;
        }
        
        /* Skills Section */
        .skills-section {
          position: relative;
        }
        
        .skills-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 2rem;
        }
        
        .skill-glass {
          border-radius: 20px;
          padding: 2.5rem;
          transition: all 0.4s ease;
          color: white;
          position: relative;
          overflow: hidden;
        }
        
        .skill-glass::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(90deg, rgba(255,255,255,0.6), rgba(255,255,255,0.2));
        }
        
        .skill-glass:hover {
          transform: translateY(-8px);
          background: rgba(255, 255, 255, 0.2);
        }
        
        .skill-category {
          font-size: 0.9rem;
          opacity: 0.8;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 2rem;
        }
        
        .skill-item {
          margin-bottom: 2rem;
        }
        
        .skill-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }
        
        .skill-name {
          font-weight: 700;
          font-size: 1.1rem;
        }
        
        .skill-percentage {
          font-weight: 600;
          opacity: 0.9;
        }
        
        .skill-bar {
          height: 8px;
          background: rgba(255,255,255,0.2);
          border-radius: 4px;
          overflow: hidden;
          position: relative;
        }
        
        .skill-progress {
          height: 100%;
          background: linear-gradient(90deg, rgba(255,255,255,0.8), rgba(255,255,255,0.6));
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
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.8), transparent);
          animation: shimmer 2s infinite;
        }
        
        @keyframes shimmer {
          0% { left: -100%; }
          100% { left: 100%; }
        }
        
        /* Experience Section */
        .experience-section {
          position: relative;
        }
        
        .experience-timeline {
          max-width: 900px;
          margin: 0 auto;
        }
        
        .experience-glass {
          border-radius: 25px;
          padding: 3rem;
          margin-bottom: 3rem;
          transition: all 0.4s ease;
          color: white;
          position: relative;
        }
        
        .experience-glass:hover {
          transform: translateY(-10px);
          background: rgba(255, 255, 255, 0.2);
        }
        
        .experience-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 2rem;
          flex-wrap: wrap;
          gap: 1rem;
        }
        
        .experience-main {
          flex: 1;
        }
        
        .experience-position {
          font-size: 1.6rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
        }
        
        .experience-company {
          font-size: 1.2rem;
          opacity: 0.9;
          margin-bottom: 0.5rem;
          font-weight: 600;
        }
        
        .experience-meta {
          text-align: right;
          opacity: 0.8;
          font-size: 0.95rem;
        }
        
        .experience-description {
          font-size: 1.1rem;
          line-height: 1.7;
          margin-bottom: 2rem;
          opacity: 0.95;
        }
        
        .achievements-list {
          list-style: none;
          padding: 0;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1rem;
        }
        
        .achievement-item {
          background: rgba(255,255,255,0.1);
          padding: 1rem 1.5rem;
          border-radius: 15px;
          border-left: 4px solid rgba(255,255,255,0.6);
          font-size: 0.95rem;
          transition: all 0.3s ease;
        }
        
        .achievement-item:hover {
          background: rgba(255,255,255,0.15);
          transform: translateX(5px);
        }
        
        /* Projects Section */
        .projects-section {
          position: relative;
        }
        
        .projects-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
          gap: 3rem;
        }
        
        .project-glass {
          border-radius: 25px;
          overflow: hidden;
          transition: all 0.4s ease;
          color: white;
          position: relative;
        }
        
        .project-glass:hover {
          transform: translateY(-15px);
          background: rgba(255, 255, 255, 0.2);
        }
        
        .project-image {
          width: 100%;
          height: 250px;
          object-fit: cover;
          transition: transform 0.4s ease;
        }
        
        .project-glass:hover .project-image {
          transform: scale(1.1);
        }
        
        .project-content {
          padding: 2.5rem;
        }
        
        .project-title {
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 1rem;
        }
        
        .project-description {
          font-size: 1rem;
          line-height: 1.6;
          margin-bottom: 2rem;
          opacity: 0.9;
        }
        
        .project-tech {
          display: flex;
          flex-wrap: wrap;
          gap: 0.8rem;
          margin-bottom: 2rem;
        }
        
        .tech-tag {
          background: rgba(255,255,255,0.2);
          color: white;
          padding: 0.4rem 1rem;
          border-radius: 20px;
          font-size: 0.85rem;
          font-weight: 500;
          border: 1px solid rgba(255,255,255,0.3);
          transition: all 0.3s ease;
        }
        
        .tech-tag:hover {
          background: rgba(255,255,255,0.3);
          transform: scale(1.05);
        }
        
        .project-links {
          display: flex;
          gap: 1rem;
        }
        
        .project-link {
          flex: 1;
          padding: 12px 20px;
          border-radius: 25px;
          font-weight: 600;
          text-align: center;
          text-decoration: none;
          transition: all 0.3s ease;
          color: white;
          border: 1px solid rgba(255,255,255,0.3);
        }
        
        .project-link:hover {
          background: rgba(255,255,255,0.2);
          transform: translateY(-2px);
          color: white;
        }
        
        /* Contact Section */
        .contact-section {
          position: relative;
        }
        
        .contact-glass {
          border-radius: 30px;
          padding: 4rem;
          text-align: center;
          transition: all 0.4s ease;
          color: white;
          max-width: 800px;
          margin: 0 auto;
        }
        
        .contact-glass:hover {
          transform: translateY(-10px);
          background: rgba(255, 255, 255, 0.2);
        }
        
        .contact-intro {
          font-size: 1.4rem;
          margin-bottom: 3rem;
          opacity: 0.9;
        }
        
        .contact-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 2rem;
          margin-bottom: 3rem;
        }
        
        .contact-item {
          padding: 2rem;
          border-radius: 20px;
          transition: all 0.3s ease;
        }
        
        .contact-item:hover {
          background: rgba(255,255,255,0.1);
          transform: translateY(-5px);
        }
        
        .contact-icon {
          font-size: 2rem;
          margin-bottom: 1rem;
          display: block;
          opacity: 0.9;
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
          margin-top: 3rem;
        }
        
        .social-link {
          width: 70px;
          height: 70px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 1.8rem;
          text-decoration: none;
          transition: all 0.4s ease;
          border: 1px solid rgba(255,255,255,0.3);
        }
        
        .social-link:hover {
          background: rgba(255,255,255,0.2);
          transform: scale(1.15) rotate(10deg);
          color: white;
        }
        
        /* Responsive Design */
        @media (max-width: 768px) {
          .hero-name {
            font-size: 2.8rem;
          }
          
          .hero-quote {
            font-size: 1.8rem;
          }
          
          .section-title {
            font-size: 2.5rem;
          }
          
          .profile-image {
            width: 200px;
            height: 200px;
          }
          
          .hero-glass,
          .profile-glass {
            padding: 2.5rem;
          }
          
          .projects-grid {
            grid-template-columns: 1fr;
          }
          
          .skills-grid {
            grid-template-columns: 1fr;
          }
          
          .experience-header {
            flex-direction: column;
            align-items: flex-start;
          }
          
          .experience-meta {
            text-align: left;
          }
        }
        
        @media (max-width: 576px) {
          .hero-name {
            font-size: 2.2rem;
          }
          
          .section {
            padding: 80px 0;
          }
          
          .hero-glass,
          .profile-glass,
          .about-glass,
          .contact-glass {
            padding: 2rem;
          }
          
          .experience-glass {
            padding: 2rem;
          }
          
          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          
          .achievements-list {
            grid-template-columns: 1fr;
          }
        }
        
        /* Edit Mode Styles */
        .template5-glass [contenteditable="true"]:hover {
          background-color: rgba(139,92,246,0.1) !important;
        }
        
        .template5-glass [contenteditable="true"]:focus {
          background-color: rgba(139,92,246,0.15) !important;
          outline: 2px solid #8b5cf6 !important;
        }
      `}</style>

      {/* Floating Elements */}
      <div className="floating-element"></div>
      <div className="floating-element"></div>
      <div className="floating-element"></div>

      {/* Hero Section */}
      <section className="hero-section">
        <Container>
          <Row className="align-items-center min-vh-100">
            <Col lg={7}>
              <div className="hero-content">
                <div className="hero-glass glass-strong">
                  <div className="hero-badge glass">Frontend Engineer</div>
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
                  <div className="hero-buttons">
                    <button className="glass-button glass">
                      View My Work
                    </button>
                    <button className="glass-button glass">
                      Download Resume
                    </button>
                  </div>
                </div>
              </div>
            </Col>
            <Col lg={5}>
              <div className="profile-glass glass">
                <img
                  src={data.profileImage}
                  alt="Profile"
                  className="profile-image"
                />
                <h3 style={{ marginBottom: '0.5rem', fontWeight: '700' }}>
                  <EditableText
                    value={data.name}
                    field="name"
                    placeholder="Your Name"
                  />
                </h3>
                <p style={{ opacity: '0.9', margin: '0' }}>
                  <EditableText
                    value={data.title}
                    field="title"
                    placeholder="Your Title"
                  />
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* About Section */}
      <section className="about-section section" id="about">
        <Container>
          <div className="section-header">
            <EditableText
              value={data.aboutTitle}
              field="aboutTitle"
              className="section-title"
              tag="h2"
              placeholder="About Me"
            />
            <p className="section-subtitle">
              Passionate about creating beautiful and functional user experiences
            </p>
          </div>
          <Row>
            <Col lg={8} className="mx-auto">
              <div className="about-glass glass">
                <div className="about-text">
                  <EditableText
                    value={data.about}
                    field="about"
                    tag="p"
                    placeholder="Tell your story here..."
                  />
                </div>
                <div className="stats-grid">
                  <div className="stat-glass glass-subtle">
                    <span className="stat-number">100+</span>
                    <span className="stat-label">Projects</span>
                  </div>
                  <div className="stat-glass glass-subtle">
                    <span className="stat-number">5+</span>
                    <span className="stat-label">Years</span>
                  </div>
                  <div className="stat-glass glass-subtle">
                    <span className="stat-number">50+</span>
                    <span className="stat-label">Clients</span>
                  </div>
                  <div className="stat-glass glass-subtle">
                    <span className="stat-number">20+</span>
                    <span className="stat-label">Awards</span>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Skills Section */}
      <section className="skills-section section" id="skills">
        <Container>
          <div className="section-header">
            <EditableText
              value={data.skillsTitle}
              field="skillsTitle"
              className="section-title"
              tag="h2"
              placeholder="Skills"
            />
            <p className="section-subtitle">
              Technologies and tools I use to bring ideas to life
            </p>
          </div>
          <div className="skills-grid">
            {['Frontend', 'Backend', 'Tools'].map((category, catIndex) => (
              <div key={catIndex} className="skill-glass glass">
                <div className="skill-category">{category} Skills</div>
                {data.skills?.filter(skill => 
                  (category === 'Frontend' && ['React', 'Vue', 'CSS'].some(tech => skill.name.includes(tech))) ||
                  (category === 'Backend' && ['Node.js', 'GraphQL'].some(tech => skill.name.includes(tech))) ||
                  (category === 'Tools' && skill.name.includes('TypeScript'))
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
        </Container>
      </section>

      {/* Experience Section */}
      <section className="experience-section section" id="experience">
        <Container>
          <div className="section-header">
            <EditableText
              value={data.experienceTitle}
              field="experienceTitle"
              className="section-title"
              tag="h2"
              placeholder="Experience"
            />
            <p className="section-subtitle">
              My professional journey and key achievements
            </p>
          </div>
          <div className="experience-timeline">
            {data.experience?.map((exp, index) => (
              <div key={index} className="experience-glass glass">
                <div className="experience-header">
                  <div className="experience-main">
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
                  </div>
                  <div className="experience-meta">
                    <EditableText
                      value={exp.duration}
                      field="experience"
                      index={index}
                      subField="duration"
                      placeholder="Duration"
                    />
                    <br />
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
                      <li key={achIndex} className="achievement-item">
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
        </Container>
      </section>

      {/* Projects Section */}
      <section className="projects-section section" id="projects">
        <Container>
          <div className="section-header">
            <EditableText
              value={data.projectsTitle}
              field="projectsTitle"
              className="section-title"
              tag="h2"
              placeholder="Projects"
            />
            <p className="section-subtitle">
              Featured projects that showcase my skills and creativity
            </p>
          </div>
          <div className="projects-grid">
            {data.projects?.map((project, index) => (
              <div key={index} className="project-glass glass">
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
                    <a href={project.liveUrl} className="project-link" target="_blank" rel="noopener noreferrer">
                      Live Demo
                    </a>
                    <a href={project.githubUrl} className="project-link" target="_blank" rel="noopener noreferrer">
                      View Code
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Contact Section */}
      <section className="contact-section section" id="contact">
        <Container>
          <div className="section-header">
            <EditableText
              value={data.contactTitle}
              field="contactTitle"
              className="section-title"
              tag="h2"
              placeholder="Get In Touch"
            />
            <p className="section-subtitle">
              Let's work together to create something amazing
            </p>
          </div>
          <div className="contact-glass glass-strong">
            <p className="contact-intro">
              Ready to start your next project? I'd love to hear from you.
            </p>
            <div className="contact-grid">
              <div className="contact-item glass-subtle">
                <span className="contact-icon">📧</span>
                <div className="contact-label">Email</div>
                <EditableText
                  value={data.email}
                  field="email"
                  className="contact-value"
                  placeholder="your.email@example.com"
                />
              </div>
              <div className="contact-item glass-subtle">
                <span className="contact-icon">📱</span>
                <div className="contact-label">Phone</div>
                <EditableText
                  value={data.phone}
                  field="phone"
                  className="contact-value"
                  placeholder="+1 (555) 123-4567"
                />
              </div>
              <div className="contact-item glass-subtle">
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
              <a href={data.linkedin} className="social-link glass-subtle" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a href={data.github} className="social-link glass-subtle" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-github"></i>
              </a>
              <a href={data.website} className="social-link glass-subtle" target="_blank" rel="noopener noreferrer">
                <i className="fas fa-globe"></i>
              </a>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}

export default Template5SuperEnhanced;