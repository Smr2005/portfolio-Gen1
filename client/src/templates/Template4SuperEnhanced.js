import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";

function Template4SuperEnhanced({ isPreview = false, userData = null, onDataChange = null }) {
  const [data, setData] = useState({});

  const defaultData = {
    name: "Jordan Kim",
    title: "Product Designer & UX Strategist",
    email: "jordan.kim@example.com",
    phone: "+1 (555) 234-5678",
    location: "Seattle, WA",
    linkedin: "https://linkedin.com/in/jordankim",
    github: "https://github.com/jordankim",
    website: "https://jordankim.design",
    profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
    about: "I'm a product designer passionate about creating intuitive digital experiences that solve real problems. With a background in psychology and design, I focus on user-centered design that drives business results.",
    tagline: "Design with Purpose",
    mission: "Creating digital experiences that matter",
    aboutTitle: "About",
    experienceTitle: "Experience",
    skillsTitle: "Skills",
    projectsTitle: "Work",
    contactTitle: "Contact",
    experience: [
      {
        company: "Tech Unicorn",
        position: "Senior Product Designer",
        duration: "2023 - Present",
        location: "Seattle, WA",
        description: "Leading design for core product features used by 2M+ users. Collaborating with cross-functional teams to deliver user-centered solutions.",
        achievements: [
          "Increased user engagement by 45%",
          "Led design system implementation",
          "Reduced support tickets by 30%"
        ]
      },
      {
        company: "Design Agency",
        position: "UX Designer",
        duration: "2021 - 2023",
        location: "Remote",
        description: "Designed digital products for startups and established companies, focusing on user research and data-driven design decisions.",
        achievements: [
          "Delivered 20+ successful projects",
          "Improved conversion rates by 60%",
          "Built design processes from scratch"
        ]
      }
    ],
    skills: [
      { name: "User Research", level: 95, category: "Research" },
      { name: "Prototyping", level: 92, category: "Design" },
      { name: "Figma", level: 98, category: "Tools" },
      { name: "Design Systems", level: 90, category: "Systems" },
      { name: "Usability Testing", level: 88, category: "Research" },
      { name: "Information Architecture", level: 85, category: "Strategy" }
    ],
    projects: [
      {
        title: "Mobile Banking App",
        description: "Complete redesign of mobile banking experience focusing on accessibility and ease of use",
        image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=300&fit=crop",
        technologies: ["UI Design", "User Research", "Prototyping"],
        liveUrl: "https://example.com",
        githubUrl: "https://dribbble.com/example",
        size: "large"
      },
      {
        title: "E-commerce Dashboard",
        description: "Analytics dashboard for online retailers with real-time data visualization",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop",
        technologies: ["Dashboard Design", "Data Viz", "UX"],
        liveUrl: "https://example.com",
        githubUrl: "https://dribbble.com/example",
        size: "medium"
      },
      {
        title: "Fitness App",
        description: "Workout tracking app with social features",
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=200&fit=crop",
        technologies: ["Mobile Design", "Social Features"],
        liveUrl: "https://example.com",
        githubUrl: "https://dribbble.com/example",
        size: "small"
      },
      {
        title: "SaaS Platform",
        description: "B2B software platform with complex workflows simplified through thoughtful UX",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=280&fit=crop",
        technologies: ["Enterprise UX", "Workflow Design"],
        liveUrl: "https://example.com",
        githubUrl: "https://dribbble.com/example",
        size: "large"
      },
      {
        title: "Travel App",
        description: "Trip planning app with AI recommendations",
        image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&h=220&fit=crop",
        technologies: ["Mobile UX", "AI Integration"],
        liveUrl: "https://example.com",
        githubUrl: "https://dribbble.com/example",
        size: "medium"
      },
      {
        title: "Design System",
        description: "Comprehensive design system for fintech startup",
        image: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=400&h=180&fit=crop",
        technologies: ["Design Systems", "Component Library"],
        liveUrl: "https://example.com",
        githubUrl: "https://dribbble.com/example",
        size: "small"
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
          outline: isPreview ? '2px dashed rgba(99,102,241,0.4)' : 'none',
          minHeight: isPreview ? '20px' : 'auto',
          cursor: isPreview ? 'text' : 'default',
          padding: isPreview ? '4px' : '0',
          borderRadius: isPreview ? '4px' : '0',
          transition: 'all 0.2s ease'
        }}
        placeholder={placeholder}
        onFocus={(e) => {
          if (isPreview) {
            e.target.style.outline = '2px solid #6366f1';
            e.target.style.backgroundColor = 'rgba(99,102,241,0.1)';
          }
        }}
        onBlur={(e) => {
          if (isPreview) {
            e.target.style.outline = '2px dashed rgba(99,102,241,0.4)';
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
    <div className="template4-cards">
      <style jsx>{`
        .template4-cards {
          font-family: 'Inter', 'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif;
          background: #f8fafc;
          color: #1e293b;
          line-height: 1.6;
          overflow-x: hidden;
        }
        
        /* Hero Section */
        .hero-section {
          min-height: 100vh;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          display: flex;
          align-items: center;
          position: relative;
          overflow: hidden;
        }
        
        .hero-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: 
            radial-gradient(circle at 25% 25%, rgba(255,255,255,0.1) 0%, transparent 50%),
            radial-gradient(circle at 75% 75%, rgba(255,255,255,0.05) 0%, transparent 50%);
          animation: float 8s ease-in-out infinite;
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        .hero-content {
          position: relative;
          z-index: 2;
          color: white;
        }
        
        .hero-card {
          background: rgba(255,255,255,0.1);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255,255,255,0.2);
          border-radius: 24px;
          padding: 3rem;
          box-shadow: 0 25px 50px rgba(0,0,0,0.2);
          transition: all 0.4s ease;
        }
        
        .hero-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 35px 70px rgba(0,0,0,0.3);
        }
        
        .hero-badge {
          background: rgba(255,255,255,0.2);
          border: 1px solid rgba(255,255,255,0.3);
          padding: 0.5rem 1.2rem;
          border-radius: 50px;
          font-size: 0.85rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 1px;
          display: inline-block;
          margin-bottom: 1.5rem;
        }
        
        .hero-name {
          font-size: 3.5rem;
          font-weight: 700;
          margin-bottom: 1rem;
          line-height: 1.1;
        }
        
        .hero-title {
          font-size: 1.3rem;
          opacity: 0.9;
          margin-bottom: 1.5rem;
          font-weight: 400;
        }
        
        .hero-tagline {
          font-size: 2rem;
          font-weight: 600;
          margin-bottom: 1rem;
          color: rgba(255,255,255,0.95);
        }
        
        .hero-mission {
          font-size: 1.1rem;
          opacity: 0.8;
          margin-bottom: 2rem;
        }
        
        .hero-buttons {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
        }
        
        .hero-button {
          background: rgba(255,255,255,0.2);
          border: 1px solid rgba(255,255,255,0.3);
          color: white;
          padding: 12px 24px;
          border-radius: 12px;
          font-weight: 600;
          transition: all 0.3s ease;
          text-decoration: none;
          display: inline-block;
        }
        
        .hero-button:hover {
          background: rgba(255,255,255,0.3);
          transform: translateY(-2px);
          color: white;
        }
        
        .profile-card {
          background: rgba(255,255,255,0.1);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255,255,255,0.2);
          border-radius: 24px;
          padding: 2rem;
          text-align: center;
          transition: all 0.4s ease;
        }
        
        .profile-card:hover {
          transform: translateY(-10px) rotate(2deg);
        }
        
        .profile-image {
          width: 200px;
          height: 200px;
          border-radius: 20px;
          object-fit: cover;
          margin-bottom: 1.5rem;
          border: 4px solid rgba(255,255,255,0.3);
          transition: all 0.4s ease;
        }
        
        .profile-image:hover {
          transform: scale(1.05);
          border-color: rgba(255,255,255,0.5);
        }
        
        /* Section Styles */
        .section {
          padding: 100px 0;
          position: relative;
        }
        
        .section-header {
          text-align: center;
          margin-bottom: 5rem;
        }
        
        .section-title {
          font-size: 3rem;
          font-weight: 700;
          color: #1e293b;
          margin-bottom: 1rem;
          position: relative;
          display: inline-block;
        }
        
        .section-title::after {
          content: '';
          position: absolute;
          bottom: -10px;
          left: 50%;
          transform: translateX(-50%);
          width: 60px;
          height: 4px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 2px;
        }
        
        .section-subtitle {
          font-size: 1.2rem;
          color: #64748b;
          max-width: 600px;
          margin: 0 auto;
        }
        
        /* About Section */
        .about-section {
          background: white;
        }
        
        .about-cards {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
        }
        
        .about-card {
          background: white;
          border-radius: 20px;
          padding: 2.5rem;
          box-shadow: 0 10px 30px rgba(0,0,0,0.08);
          border: 1px solid #e2e8f0;
          transition: all 0.4s ease;
          position: relative;
          overflow: hidden;
        }
        
        .about-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }
        
        .about-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.12);
        }
        
        .about-icon {
          width: 60px;
          height: 60px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 1.5rem;
          margin-bottom: 1.5rem;
        }
        
        .about-card-title {
          font-size: 1.3rem;
          font-weight: 700;
          color: #1e293b;
          margin-bottom: 1rem;
        }
        
        .about-card-text {
          color: #64748b;
          line-height: 1.7;
        }
        
        /* Skills Section */
        .skills-section {
          background: #f8fafc;
        }
        
        .skills-masonry {
          columns: 3;
          column-gap: 2rem;
          column-fill: balance;
        }
        
        .skill-card {
          background: white;
          border-radius: 16px;
          padding: 1.5rem;
          margin-bottom: 2rem;
          box-shadow: 0 8px 25px rgba(0,0,0,0.06);
          border: 1px solid #e2e8f0;
          break-inside: avoid;
          transition: all 0.3s ease;
          position: relative;
        }
        
        .skill-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 35px rgba(0,0,0,0.1);
        }
        
        .skill-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }
        
        .skill-name {
          font-weight: 700;
          color: #1e293b;
          font-size: 1.1rem;
        }
        
        .skill-level {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 0.3rem 0.8rem;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 600;
        }
        
        .skill-category {
          color: #64748b;
          font-size: 0.9rem;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 0.5rem;
        }
        
        .skill-bar {
          height: 6px;
          background: #e2e8f0;
          border-radius: 3px;
          overflow: hidden;
        }
        
        .skill-progress {
          height: 100%;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 3px;
          transition: width 2s ease-in-out;
        }
        
        /* Experience Section */
        .experience-section {
          background: white;
        }
        
        .experience-timeline {
          position: relative;
          max-width: 800px;
          margin: 0 auto;
        }
        
        .experience-item {
          background: white;
          border-radius: 20px;
          padding: 2.5rem;
          margin-bottom: 2rem;
          box-shadow: 0 10px 30px rgba(0,0,0,0.08);
          border: 1px solid #e2e8f0;
          transition: all 0.4s ease;
          position: relative;
        }
        
        .experience-item::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 20px 20px 0 0;
        }
        
        .experience-item:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.12);
        }
        
        .experience-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 1.5rem;
          flex-wrap: wrap;
          gap: 1rem;
        }
        
        .experience-main {
          flex: 1;
        }
        
        .experience-position {
          font-size: 1.4rem;
          font-weight: 700;
          color: #1e293b;
          margin-bottom: 0.5rem;
        }
        
        .experience-company {
          font-size: 1.1rem;
          color: #6366f1;
          font-weight: 600;
          margin-bottom: 0.5rem;
        }
        
        .experience-meta {
          text-align: right;
          color: #64748b;
          font-size: 0.9rem;
        }
        
        .experience-description {
          color: #64748b;
          line-height: 1.7;
          margin-bottom: 1.5rem;
        }
        
        .achievements-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1rem;
        }
        
        .achievement-item {
          background: #f8fafc;
          padding: 1rem;
          border-radius: 12px;
          border-left: 4px solid #6366f1;
          font-size: 0.9rem;
          color: #475569;
        }
        
        /* Projects Section - Masonry Layout */
        .projects-section {
          background: #f8fafc;
        }
        
        .projects-masonry {
          columns: 3;
          column-gap: 2rem;
          column-fill: balance;
        }
        
        .project-card {
          background: white;
          border-radius: 20px;
          overflow: hidden;
          margin-bottom: 2rem;
          box-shadow: 0 10px 30px rgba(0,0,0,0.08);
          border: 1px solid #e2e8f0;
          break-inside: avoid;
          transition: all 0.4s ease;
          position: relative;
        }
        
        .project-card.large {
          margin-bottom: 3rem;
        }
        
        .project-card.medium {
          margin-bottom: 2.5rem;
        }
        
        .project-card.small {
          margin-bottom: 2rem;
        }
        
        .project-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 25px 50px rgba(0,0,0,0.15);
        }
        
        .project-image {
          width: 100%;
          height: auto;
          object-fit: cover;
          transition: transform 0.4s ease;
        }
        
        .project-card.large .project-image {
          height: 300px;
        }
        
        .project-card.medium .project-image {
          height: 250px;
        }
        
        .project-card.small .project-image {
          height: 200px;
        }
        
        .project-card:hover .project-image {
          transform: scale(1.05);
        }
        
        .project-content {
          padding: 2rem;
        }
        
        .project-title {
          font-size: 1.3rem;
          font-weight: 700;
          color: #1e293b;
          margin-bottom: 1rem;
        }
        
        .project-description {
          color: #64748b;
          line-height: 1.6;
          margin-bottom: 1.5rem;
          font-size: 0.95rem;
        }
        
        .project-tech {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-bottom: 1.5rem;
        }
        
        .tech-tag {
          background: #f1f5f9;
          color: #475569;
          padding: 0.3rem 0.8rem;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 500;
          border: 1px solid #e2e8f0;
        }
        
        .project-links {
          display: flex;
          gap: 1rem;
        }
        
        .project-link {
          flex: 1;
          padding: 0.8rem 1.2rem;
          border-radius: 10px;
          font-weight: 600;
          font-size: 0.9rem;
          text-align: center;
          text-decoration: none;
          transition: all 0.3s ease;
        }
        
        .project-link.primary {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
        }
        
        .project-link.primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(102,126,234,0.3);
          color: white;
        }
        
        .project-link.secondary {
          background: transparent;
          color: #6366f1;
          border: 1px solid #6366f1;
        }
        
        .project-link.secondary:hover {
          background: #6366f1;
          color: white;
          transform: translateY(-2px);
        }
        
        /* Contact Section */
        .contact-section {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
        }
        
        .contact-section .section-title {
          color: white;
        }
        
        .contact-section .section-subtitle {
          color: rgba(255,255,255,0.8);
        }
        
        .contact-cards {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 2rem;
        }
        
        .contact-card {
          background: rgba(255,255,255,0.1);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255,255,255,0.2);
          border-radius: 20px;
          padding: 2.5rem;
          text-align: center;
          transition: all 0.4s ease;
        }
        
        .contact-card:hover {
          transform: translateY(-10px);
          background: rgba(255,255,255,0.15);
        }
        
        .contact-icon {
          width: 70px;
          height: 70px;
          background: rgba(255,255,255,0.2);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 1.5rem;
          font-size: 1.8rem;
          transition: all 0.3s ease;
        }
        
        .contact-card:hover .contact-icon {
          background: rgba(255,255,255,0.3);
          transform: scale(1.1);
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
        
        .social-section {
          margin-top: 4rem;
          text-align: center;
        }
        
        .social-links {
          display: flex;
          justify-content: center;
          gap: 1.5rem;
          margin-top: 2rem;
        }
        
        .social-link {
          width: 60px;
          height: 60px;
          background: rgba(255,255,255,0.1);
          border: 1px solid rgba(255,255,255,0.2);
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
          background: rgba(255,255,255,0.2);
          transform: scale(1.1);
          color: white;
        }
        
        /* Responsive Design */
        @media (max-width: 768px) {
          .hero-name {
            font-size: 2.5rem;
          }
          
          .hero-tagline {
            font-size: 1.5rem;
          }
          
          .section-title {
            font-size: 2.2rem;
          }
          
          .projects-masonry,
          .skills-masonry {
            columns: 2;
          }
          
          .profile-image {
            width: 150px;
            height: 150px;
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
            font-size: 2rem;
          }
          
          .section {
            padding: 60px 0;
          }
          
          .projects-masonry,
          .skills-masonry {
            columns: 1;
          }
          
          .hero-card,
          .profile-card {
            padding: 2rem;
          }
          
          .about-card,
          .experience-item {
            padding: 2rem;
          }
          
          .achievements-grid {
            grid-template-columns: 1fr;
          }
        }
        
        /* Edit Mode Styles */
        .template4-cards [contenteditable="true"]:hover {
          background-color: rgba(99,102,241,0.1) !important;
        }
        
        .template4-cards [contenteditable="true"]:focus {
          background-color: rgba(99,102,241,0.15) !important;
          outline: 2px solid #6366f1 !important;
        }
      `}</style>

      {/* Hero Section */}
      <section className="hero-section">
        <Container>
          <Row className="align-items-center min-vh-100">
            <Col lg={7}>
              <div className="hero-content">
                <div className="hero-card">
                  <div className="hero-badge">Product Designer</div>
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
                    value={data.tagline}
                    field="tagline"
                    className="hero-tagline"
                    tag="h2"
                    placeholder="Your Tagline"
                  />
                  <EditableText
                    value={data.mission}
                    field="mission"
                    className="hero-mission"
                    tag="p"
                    placeholder="Your mission statement"
                  />
                  <div className="hero-buttons">
                    <a href="#projects" className="hero-button">View Work</a>
                    <a href="#contact" className="hero-button">Get In Touch</a>
                  </div>
                </div>
              </div>
            </Col>
            <Col lg={5}>
              <div className="profile-card">
                <img
                  src={data.profileImage}
                  alt="Profile"
                  className="profile-image"
                />
                <h4 style={{ marginBottom: '0.5rem', fontWeight: '600' }}>
                  <EditableText
                    value={data.name}
                    field="name"
                    placeholder="Your Name"
                  />
                </h4>
                <p style={{ opacity: '0.8', margin: '0' }}>
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
              placeholder="About"
            />
            <p className="section-subtitle">
              Get to know me and what drives my passion for design
            </p>
          </div>
          <div className="about-cards">
            <div className="about-card">
              <div className="about-icon">
                <i className="fas fa-lightbulb"></i>
              </div>
              <h3 className="about-card-title">My Story</h3>
              <div className="about-card-text">
                <EditableText
                  value={data.about}
                  field="about"
                  tag="p"
                  placeholder="Tell your story here..."
                />
              </div>
            </div>
            <div className="about-card">
              <div className="about-icon">
                <i className="fas fa-target"></i>
              </div>
              <h3 className="about-card-title">My Approach</h3>
              <p className="about-card-text">
                I believe in user-centered design that solves real problems. Every project starts with understanding the user's needs and business goals.
              </p>
            </div>
            <div className="about-card">
              <div className="about-icon">
                <i className="fas fa-rocket"></i>
              </div>
              <h3 className="about-card-title">My Goal</h3>
              <p className="about-card-text">
                To create digital experiences that are not only beautiful but also functional, accessible, and meaningful to the people who use them.
              </p>
            </div>
          </div>
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
              Tools and expertise I use to bring ideas to life
            </p>
          </div>
          <div className="skills-masonry">
            {data.skills?.map((skill, index) => (
              <div key={index} className="skill-card">
                <div className="skill-category">{skill.category}</div>
                <div className="skill-header">
                  <EditableText
                    value={skill.name}
                    field="skills"
                    index={index}
                    subField="name"
                    className="skill-name"
                    placeholder="Skill name"
                  />
                  <span className="skill-level">{skill.level}%</span>
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
              <div key={index} className="experience-item">
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
                  <div className="achievements-grid">
                    {exp.achievements.map((achievement, achIndex) => (
                      <div key={achIndex} className="achievement-item">
                        <EditableText
                          value={achievement}
                          field="experience"
                          index={index}
                          subField={`achievements.${achIndex}`}
                          placeholder="Achievement..."
                        />
                      </div>
                    ))}
                  </div>
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
              placeholder="Work"
            />
            <p className="section-subtitle">
              Selected projects that showcase my design process and results
            </p>
          </div>
          <div className="projects-masonry">
            {data.projects?.map((project, index) => (
              <div key={index} className={`project-card ${project.size}`}>
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
                    <a href={project.liveUrl} className="project-link primary" target="_blank" rel="noopener noreferrer">
                      View Live
                    </a>
                    <a href={project.githubUrl} className="project-link secondary" target="_blank" rel="noopener noreferrer">
                      Case Study
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
              placeholder="Contact"
            />
            <p className="section-subtitle">
              Let's work together to create something amazing
            </p>
          </div>
          <div className="contact-cards">
            <div className="contact-card">
              <div className="contact-icon">
                <i className="fas fa-envelope"></i>
              </div>
              <div className="contact-label">Email</div>
              <EditableText
                value={data.email}
                field="email"
                className="contact-value"
                placeholder="your.email@example.com"
              />
            </div>
            <div className="contact-card">
              <div className="contact-icon">
                <i className="fas fa-phone"></i>
              </div>
              <div className="contact-label">Phone</div>
              <EditableText
                value={data.phone}
                field="phone"
                className="contact-value"
                placeholder="+1 (555) 123-4567"
              />
            </div>
            <div className="contact-card">
              <div className="contact-icon">
                <i className="fas fa-map-marker-alt"></i>
              </div>
              <div className="contact-label">Location</div>
              <EditableText
                value={data.location}
                field="location"
                className="contact-value"
                placeholder="Your Location"
              />
            </div>
          </div>
          <div className="social-section">
            <h4 style={{ marginBottom: '1rem', fontWeight: '600' }}>Connect With Me</h4>
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

export default Template4SuperEnhanced;