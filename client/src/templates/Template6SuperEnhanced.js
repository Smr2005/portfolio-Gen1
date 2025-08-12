import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";

function Template6SuperEnhanced({ isPreview = false, userData = null, onDataChange = null }) {
  const [data, setData] = useState({});

  const defaultData = {
    name: "Michael Thompson",
    title: "Senior Business Consultant & Strategy Advisor",
    email: "michael.thompson@example.com",
    phone: "+1 (555) 456-7890",
    location: "New York, NY",
    linkedin: "https://linkedin.com/in/michaelthompson",
    github: "https://github.com/michaelthompson",
    website: "https://michaelthompson.consulting",
    profileImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
    about: "I am a seasoned business consultant with over 12 years of experience helping Fortune 500 companies optimize their operations, drive digital transformation, and achieve sustainable growth. My expertise spans strategic planning, process improvement, and organizational development.",
    tagline: "Strategic Excellence",
    mission: "Driving business transformation through strategic innovation",
    aboutTitle: "Professional Profile",
    experienceTitle: "Professional Experience",
    skillsTitle: "Core Competencies",
    projectsTitle: "Key Projects",
    contactTitle: "Professional Contact",
    experience: [
      {
        company: "McKinsey & Company",
        position: "Senior Business Consultant",
        duration: "2020 - Present",
        location: "New York, NY",
        description: "Leading strategic consulting engagements for Fortune 500 clients across various industries. Specializing in digital transformation, operational excellence, and organizational restructuring initiatives.",
        achievements: [
          "Generated $50M+ in client value through strategic initiatives",
          "Led 15+ successful digital transformation projects",
          "Managed teams of 20+ consultants and analysts"
        ]
      },
      {
        company: "Deloitte Consulting",
        position: "Business Consultant",
        duration: "2017 - 2020",
        location: "Chicago, IL",
        description: "Provided strategic advisory services to mid-market and enterprise clients, focusing on process optimization, technology implementation, and change management.",
        achievements: [
          "Improved operational efficiency by 35% on average",
          "Successfully managed $10M+ project budgets",
          "Developed proprietary frameworks adopted company-wide"
        ]
      }
    ],
    skills: [
      { name: "Strategic Planning", level: 95, category: "Strategy" },
      { name: "Business Analysis", level: 92, category: "Analysis" },
      { name: "Project Management", level: 90, category: "Management" },
      { name: "Digital Transformation", level: 88, category: "Technology" },
      { name: "Change Management", level: 85, category: "Leadership" },
      { name: "Financial Modeling", level: 82, category: "Finance" }
    ],
    projects: [
      {
        title: "Digital Transformation Initiative",
        description: "Led comprehensive digital transformation for a $2B manufacturing company, resulting in 40% efficiency improvement",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&h=300&fit=crop",
        technologies: ["Strategy", "Digital Transformation", "Change Management"],
        liveUrl: "https://example.com",
        githubUrl: "https://example.com/case-study"
      },
      {
        title: "Operational Excellence Program",
        description: "Designed and implemented operational excellence framework for global retail chain with 500+ locations",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&h=300&fit=crop",
        technologies: ["Process Optimization", "Lean Six Sigma", "Analytics"],
        liveUrl: "https://example.com",
        githubUrl: "https://example.com/case-study"
      },
      {
        title: "M&A Integration Strategy",
        description: "Orchestrated post-merger integration for $500M acquisition, ensuring seamless transition and synergy realization",
        image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=500&h=300&fit=crop",
        technologies: ["M&A Strategy", "Integration Planning", "Stakeholder Management"],
        liveUrl: "https://example.com",
        githubUrl: "https://example.com/case-study"
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
          outline: isPreview ? '2px dashed rgba(59,130,246,0.4)' : 'none',
          minHeight: isPreview ? '20px' : 'auto',
          cursor: isPreview ? 'text' : 'default',
          padding: isPreview ? '4px' : '0',
          borderRadius: isPreview ? '4px' : '0',
          transition: 'all 0.2s ease'
        }}
        placeholder={placeholder}
        onFocus={(e) => {
          if (isPreview) {
            e.target.style.outline = '2px solid #3b82f6';
            e.target.style.backgroundColor = 'rgba(59,130,246,0.1)';
          }
        }}
        onBlur={(e) => {
          if (isPreview) {
            e.target.style.outline = '2px dashed rgba(59,130,246,0.4)';
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
    <div className="template6-corporate">
      <style jsx>{`
        .template6-corporate {
          font-family: 'Georgia', 'Times New Roman', serif;
          background: #ffffff;
          color: #1a202c;
          line-height: 1.7;
          overflow-x: hidden;
        }
        
        /* Hero Section */
        .hero-section {
          background: linear-gradient(135deg, #1e3a8a 0%, #1e40af 50%, #2563eb 100%);
          color: white;
          padding: 120px 0;
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
            linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.05) 50%, transparent 70%),
            radial-gradient(circle at 20% 20%, rgba(255,255,255,0.1) 0%, transparent 50%);
          animation: subtle-move 20s ease-in-out infinite;
        }
        
        @keyframes subtle-move {
          0%, 100% { transform: translateX(0px); }
          50% { transform: translateX(20px); }
        }
        
        .hero-content {
          position: relative;
          z-index: 2;
        }
        
        .hero-badge {
          background: rgba(255,255,255,0.15);
          border: 1px solid rgba(255,255,255,0.2);
          padding: 0.6rem 1.8rem;
          border-radius: 6px;
          font-size: 0.9rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          display: inline-block;
          margin-bottom: 2rem;
        }
        
        .hero-name {
          font-size: 3.8rem;
          font-weight: 400;
          margin-bottom: 1.5rem;
          line-height: 1.2;
          letter-spacing: -1px;
        }
        
        .hero-title {
          font-size: 1.4rem;
          opacity: 0.95;
          margin-bottom: 2rem;
          font-weight: 300;
          line-height: 1.5;
        }
        
        .hero-tagline {
          font-size: 2rem;
          font-weight: 300;
          margin-bottom: 1rem;
          font-style: italic;
          opacity: 0.9;
        }
        
        .hero-mission {
          font-size: 1.1rem;
          opacity: 0.85;
          margin-bottom: 3rem;
          max-width: 500px;
        }
        
        .hero-buttons {
          display: flex;
          gap: 1.5rem;
          flex-wrap: wrap;
        }
        
        .corporate-button {
          background: rgba(255,255,255,0.1);
          border: 2px solid rgba(255,255,255,0.3);
          color: white;
          padding: 14px 32px;
          font-size: 0.95rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 1px;
          transition: all 0.3s ease;
          text-decoration: none;
          display: inline-block;
          position: relative;
          overflow: hidden;
        }
        
        .corporate-button::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: rgba(255,255,255,0.1);
          transition: left 0.4s ease;
        }
        
        .corporate-button:hover::before {
          left: 0;
        }
        
        .corporate-button:hover {
          background: rgba(255,255,255,0.2);
          border-color: rgba(255,255,255,0.5);
          transform: translateY(-2px);
          color: white;
        }
        
        .profile-section {
          background: rgba(255,255,255,0.1);
          border: 1px solid rgba(255,255,255,0.2);
          border-radius: 8px;
          padding: 3rem;
          text-align: center;
          transition: all 0.3s ease;
        }
        
        .profile-section:hover {
          background: rgba(255,255,255,0.15);
          transform: translateY(-5px);
        }
        
        .profile-image {
          width: 220px;
          height: 220px;
          border-radius: 8px;
          object-fit: cover;
          margin-bottom: 2rem;
          border: 4px solid rgba(255,255,255,0.3);
          transition: all 0.3s ease;
        }
        
        .profile-image:hover {
          border-color: rgba(255,255,255,0.5);
          transform: scale(1.02);
        }
        
        .profile-name {
          font-size: 1.5rem;
          font-weight: 400;
          margin-bottom: 0.5rem;
        }
        
        .profile-title {
          opacity: 0.9;
          font-size: 1rem;
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
          font-size: 2.8rem;
          font-weight: 300;
          color: #1e3a8a;
          margin-bottom: 1.5rem;
          position: relative;
          display: inline-block;
          letter-spacing: -0.5px;
        }
        
        .section-title::after {
          content: '';
          position: absolute;
          bottom: -12px;
          left: 50%;
          transform: translateX(-50%);
          width: 60px;
          height: 2px;
          background: #3b82f6;
        }
        
        .section-subtitle {
          font-size: 1.1rem;
          color: #64748b;
          max-width: 600px;
          margin: 0 auto;
          font-style: italic;
        }
        
        /* About Section */
        .about-section {
          background: #f8fafc;
        }
        
        .about-card {
          background: white;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          padding: 3rem;
          box-shadow: 0 4px 20px rgba(0,0,0,0.08);
          transition: all 0.3s ease;
          position: relative;
        }
        
        .about-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg, #1e3a8a, #3b82f6);
        }
        
        .about-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 12px 40px rgba(0,0,0,0.12);
        }
        
        .about-text {
          font-size: 1.2rem;
          line-height: 1.8;
          color: #374151;
          margin-bottom: 3rem;
        }
        
        .credentials-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 2rem;
        }
        
        .credential-item {
          text-align: center;
          padding: 2rem;
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 6px;
          transition: all 0.3s ease;
        }
        
        .credential-item:hover {
          background: #f1f5f9;
          transform: translateY(-3px);
        }
        
        .credential-number {
          font-size: 2.2rem;
          font-weight: 300;
          color: #1e3a8a;
          display: block;
          margin-bottom: 0.5rem;
        }
        
        .credential-label {
          color: #64748b;
          font-size: 0.95rem;
          text-transform: uppercase;
          letter-spacing: 1px;
          font-weight: 500;
        }
        
        /* Skills Section */
        .skills-section {
          background: white;
        }
        
        .skills-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 3rem;
        }
        
        .skill-category {
          background: white;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          padding: 2.5rem;
          box-shadow: 0 4px 20px rgba(0,0,0,0.06);
          transition: all 0.3s ease;
          position: relative;
        }
        
        .skill-category::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(90deg, #1e3a8a, #3b82f6);
        }
        
        .skill-category:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 30px rgba(0,0,0,0.1);
        }
        
        .skill-category-title {
          font-size: 1.3rem;
          font-weight: 400;
          color: #1e3a8a;
          margin-bottom: 2rem;
          text-transform: uppercase;
          letter-spacing: 1px;
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
          font-weight: 500;
          color: #374151;
          font-size: 1rem;
        }
        
        .skill-level {
          color: #1e3a8a;
          font-weight: 600;
          font-size: 0.9rem;
        }
        
        .skill-bar {
          height: 6px;
          background: #e2e8f0;
          border-radius: 3px;
          overflow: hidden;
        }
        
        .skill-progress {
          height: 100%;
          background: linear-gradient(90deg, #1e3a8a, #3b82f6);
          border-radius: 3px;
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
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
          animation: shimmer 2s infinite;
        }
        
        @keyframes shimmer {
          0% { left: -100%; }
          100% { left: 100%; }
        }
        
        /* Experience Section */
        .experience-section {
          background: #f8fafc;
        }
        
        .experience-timeline {
          max-width: 900px;
          margin: 0 auto;
          position: relative;
        }
        
        .experience-timeline::before {
          content: '';
          position: absolute;
          left: 30px;
          top: 0;
          bottom: 0;
          width: 2px;
          background: #e2e8f0;
        }
        
        .experience-item {
          background: white;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          padding: 3rem;
          margin-bottom: 3rem;
          margin-left: 80px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.06);
          transition: all 0.3s ease;
          position: relative;
        }
        
        .experience-item::before {
          content: '';
          position: absolute;
          left: -51px;
          top: 30px;
          width: 12px;
          height: 12px;
          background: #3b82f6;
          border-radius: 50%;
          border: 3px solid white;
          box-shadow: 0 0 0 3px #e2e8f0;
        }
        
        .experience-item:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 30px rgba(0,0,0,0.1);
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
          font-size: 1.4rem;
          font-weight: 400;
          color: #1e3a8a;
          margin-bottom: 0.5rem;
        }
        
        .experience-company {
          font-size: 1.1rem;
          color: #374151;
          font-weight: 500;
          margin-bottom: 0.5rem;
        }
        
        .experience-meta {
          text-align: right;
          color: #64748b;
          font-size: 0.95rem;
          font-style: italic;
        }
        
        .experience-description {
          color: #4b5563;
          line-height: 1.7;
          margin-bottom: 2rem;
          font-size: 1rem;
        }
        
        .achievements-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 1.5rem;
        }
        
        .achievement-item {
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-left: 4px solid #3b82f6;
          padding: 1.2rem;
          border-radius: 4px;
          font-size: 0.95rem;
          color: #4b5563;
          transition: all 0.3s ease;
        }
        
        .achievement-item:hover {
          background: #f1f5f9;
          transform: translateX(3px);
        }
        
        /* Projects Section */
        .projects-section {
          background: white;
        }
        
        .projects-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
          gap: 3rem;
        }
        
        .project-card {
          background: white;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 4px 20px rgba(0,0,0,0.06);
          transition: all 0.3s ease;
          position: relative;
        }
        
        .project-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg, #1e3a8a, #3b82f6);
        }
        
        .project-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 12px 40px rgba(0,0,0,0.12);
        }
        
        .project-image {
          width: 100%;
          height: 250px;
          object-fit: cover;
          transition: transform 0.3s ease;
        }
        
        .project-card:hover .project-image {
          transform: scale(1.05);
        }
        
        .project-content {
          padding: 2.5rem;
        }
        
        .project-title {
          font-size: 1.4rem;
          font-weight: 400;
          color: #1e3a8a;
          margin-bottom: 1rem;
        }
        
        .project-description {
          color: #4b5563;
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
          background: #f1f5f9;
          color: #1e3a8a;
          padding: 0.4rem 1rem;
          border-radius: 4px;
          font-size: 0.85rem;
          font-weight: 500;
          border: 1px solid #e2e8f0;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        
        .project-links {
          display: flex;
          gap: 1rem;
        }
        
        .project-link {
          flex: 1;
          padding: 12px 20px;
          border: 2px solid #3b82f6;
          color: #3b82f6;
          text-align: center;
          text-decoration: none;
          font-weight: 600;
          font-size: 0.9rem;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          transition: all 0.3s ease;
        }
        
        .project-link:hover {
          background: #3b82f6;
          color: white;
          transform: translateY(-2px);
        }
        
        .project-link.secondary {
          border-color: #64748b;
          color: #64748b;
        }
        
        .project-link.secondary:hover {
          background: #64748b;
          color: white;
        }
        
        /* Contact Section */
        .contact-section {
          background: linear-gradient(135deg, #1e3a8a 0%, #1e40af 50%, #2563eb 100%);
          color: white;
        }
        
        .contact-section .section-title {
          color: white;
        }
        
        .contact-section .section-subtitle {
          color: rgba(255,255,255,0.8);
        }
        
        .contact-card {
          background: rgba(255,255,255,0.1);
          border: 1px solid rgba(255,255,255,0.2);
          border-radius: 8px;
          padding: 4rem;
          text-align: center;
          transition: all 0.3s ease;
          max-width: 800px;
          margin: 0 auto;
        }
        
        .contact-card:hover {
          background: rgba(255,255,255,0.15);
          transform: translateY(-5px);
        }
        
        .contact-intro {
          font-size: 1.3rem;
          margin-bottom: 3rem;
          opacity: 0.9;
          font-style: italic;
        }
        
        .contact-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 2rem;
          margin-bottom: 3rem;
        }
        
        .contact-item {
          padding: 2rem;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 6px;
          transition: all 0.3s ease;
        }
        
        .contact-item:hover {
          background: rgba(255,255,255,0.1);
          transform: translateY(-3px);
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
          font-weight: 500;
        }
        
        .social-section {
          margin-top: 4rem;
          padding-top: 3rem;
          border-top: 1px solid rgba(255,255,255,0.2);
        }
        
        .social-links {
          display: flex;
          justify-content: center;
          gap: 2rem;
          margin-top: 2rem;
        }
        
        .social-link {
          width: 60px;
          height: 60px;
          background: rgba(255,255,255,0.1);
          border: 1px solid rgba(255,255,255,0.2);
          border-radius: 6px;
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
          transform: translateY(-3px);
          color: white;
        }
        
        /* Responsive Design */
        @media (max-width: 768px) {
          .hero-name {
            font-size: 2.8rem;
          }
          
          .hero-tagline {
            font-size: 1.6rem;
          }
          
          .section-title {
            font-size: 2.2rem;
          }
          
          .profile-image {
            width: 180px;
            height: 180px;
          }
          
          .experience-timeline::before {
            display: none;
          }
          
          .experience-item {
            margin-left: 0;
          }
          
          .experience-item::before {
            display: none;
          }
          
          .experience-header {
            flex-direction: column;
            align-items: flex-start;
          }
          
          .experience-meta {
            text-align: left;
          }
          
          .projects-grid {
            grid-template-columns: 1fr;
          }
          
          .skills-grid {
            grid-template-columns: 1fr;
          }
        }
        
        @media (max-width: 576px) {
          .hero-name {
            font-size: 2.2rem;
          }
          
          .section {
            padding: 60px 0;
          }
          
          .hero-section {
            padding: 80px 0;
          }
          
          .profile-section,
          .about-card,
          .contact-card {
            padding: 2rem;
          }
          
          .experience-item,
          .skill-category {
            padding: 2rem;
          }
          
          .achievements-grid {
            grid-template-columns: 1fr;
          }
          
          .credentials-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        
        /* Edit Mode Styles */
        .template6-corporate [contenteditable="true"]:hover {
          background-color: rgba(59,130,246,0.1) !important;
        }
        
        .template6-corporate [contenteditable="true"]:focus {
          background-color: rgba(59,130,246,0.15) !important;
          outline: 2px solid #3b82f6 !important;
        }
      `}</style>

      {/* Hero Section */}
      <section className="hero-section">
        <Container>
          <Row className="align-items-center">
            <Col lg={7}>
              <div className="hero-content">
                <div className="hero-badge">Business Consultant</div>
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
                  placeholder="Your Professional Tagline"
                />
                <EditableText
                  value={data.mission}
                  field="mission"
                  className="hero-mission"
                  tag="p"
                  placeholder="Your mission statement"
                />
                <div className="hero-buttons">
                  <a href="#projects" className="corporate-button">
                    View Portfolio
                  </a>
                  <a href="#contact" className="corporate-button">
                    Schedule Consultation
                  </a>
                </div>
              </div>
            </Col>
            <Col lg={5}>
              <div className="profile-section">
                <img
                  src={data.profileImage}
                  alt="Profile"
                  className="profile-image"
                />
                <h3 className="profile-name">
                  <EditableText
                    value={data.name}
                    field="name"
                    placeholder="Your Name"
                  />
                </h3>
                <p className="profile-title">
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
              placeholder="Professional Profile"
            />
            <p className="section-subtitle">
              Delivering strategic excellence through proven methodologies and innovative solutions
            </p>
          </div>
          <Row>
            <Col lg={10} className="mx-auto">
              <div className="about-card">
                <div className="about-text">
                  <EditableText
                    value={data.about}
                    field="about"
                    tag="p"
                    placeholder="Share your professional background and expertise..."
                  />
                </div>
                <div className="credentials-grid">
                  <div className="credential-item">
                    <span className="credential-number">12+</span>
                    <span className="credential-label">Years Experience</span>
                  </div>
                  <div className="credential-item">
                    <span className="credential-number">100+</span>
                    <span className="credential-label">Projects Delivered</span>
                  </div>
                  <div className="credential-item">
                    <span className="credential-number">$500M+</span>
                    <span className="credential-label">Value Generated</span>
                  </div>
                  <div className="credential-item">
                    <span className="credential-number">50+</span>
                    <span className="credential-label">Enterprise Clients</span>
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
              placeholder="Core Competencies"
            />
            <p className="section-subtitle">
              Strategic capabilities that drive organizational transformation and sustainable growth
            </p>
          </div>
          <div className="skills-grid">
            {['Strategic', 'Analytical', 'Leadership'].map((category, catIndex) => (
              <div key={catIndex} className="skill-category">
                <h3 className="skill-category-title">{category} Excellence</h3>
                {data.skills?.filter(skill => 
                  (category === 'Strategic' && ['Strategic', 'Digital'].some(term => skill.name.includes(term))) ||
                  (category === 'Analytical' && ['Business', 'Financial'].some(term => skill.name.includes(term))) ||
                  (category === 'Leadership' && ['Project', 'Change'].some(term => skill.name.includes(term)))
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
              placeholder="Professional Experience"
            />
            <p className="section-subtitle">
              A track record of delivering exceptional results for leading organizations
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
                  placeholder="Role description and responsibilities..."
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
                          placeholder="Key achievement..."
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
              placeholder="Key Projects"
            />
            <p className="section-subtitle">
              Strategic initiatives that have transformed organizations and delivered measurable impact
            </p>
          </div>
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
                    placeholder="Project description and impact..."
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
                      View Details
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
              placeholder="Professional Contact"
            />
            <p className="section-subtitle">
              Ready to discuss your next strategic initiative? Let's connect.
            </p>
          </div>
          <div className="contact-card">
            <p className="contact-intro">
              I partner with forward-thinking organizations to drive transformation and achieve sustainable growth.
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
                <span className="contact-icon">📞</span>
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
            <div className="social-section">
              <h4 style={{ marginBottom: '1rem', fontWeight: '400' }}>Professional Network</h4>
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
          </div>
        </Container>
      </section>
    </div>
  );
}

export default Template6SuperEnhanced;