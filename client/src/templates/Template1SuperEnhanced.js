import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button, Navbar, Nav, ProgressBar, Badge, Modal } from "react-bootstrap";

function Template1SuperEnhanced({ isPreview = false, userData = null, onDataChange = null }) {
  const [showResumeModal, setShowResumeModal] = useState(false);
  const [activeSection, setActiveSection] = useState('about');
  const [data, setData] = useState({});

  const defaultData = {
    name: "John Doe",
    title: "Senior Full Stack Developer",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    linkedin: "https://linkedin.com/in/johndoe",
    github: "https://github.com/johndoe",
    website: "https://johndoe.dev",
    profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
    about: "Passionate full-stack developer with 5+ years of experience in creating scalable web applications using modern technologies. Specialized in React, Node.js, and cloud architecture with a proven track record of delivering high-performance solutions.",
    heroTitle: "Building Digital Excellence",
    heroSubtitle: "Crafting innovative solutions that drive business growth",
    aboutTitle: "About Me",
    experienceTitle: "Professional Experience",
    skillsTitle: "Technical Skills",
    projectsTitle: "Featured Projects",
    contactTitle: "Let's Connect",
    experience: [
      {
        company: "Tech Solutions Inc.",
        position: "Senior Full Stack Developer",
        duration: "Jan 2022 - Present",
        location: "San Francisco, CA",
        description: "Lead development of enterprise applications serving 100K+ users. Architected microservices infrastructure reducing response time by 40%. Mentored team of 5 junior developers.",
        achievements: [
          "Reduced application load time by 60%",
          "Implemented CI/CD pipeline saving 20 hours/week",
          "Led migration to cloud infrastructure"
        ]
      },
      {
        company: "StartupXYZ",
        position: "Full Stack Developer",
        duration: "Jun 2020 - Dec 2021",
        location: "Remote",
        description: "Built MVP from scratch using React and Node.js. Implemented real-time features and payment integration.",
        achievements: [
          "Built entire platform from concept to production",
          "Integrated Stripe payment system",
          "Achieved 99.9% uptime"
        ]
      }
    ],
    skills: [
      { name: "JavaScript/TypeScript", level: 95, category: "Frontend" },
      { name: "React/Next.js", level: 90, category: "Frontend" },
      { name: "Node.js/Express", level: 88, category: "Backend" },
      { name: "Python/Django", level: 85, category: "Backend" },
      { name: "AWS/Cloud", level: 82, category: "DevOps" },
      { name: "Docker/Kubernetes", level: 80, category: "DevOps" }
    ],
    projects: [
      {
        title: "E-Commerce Platform",
        description: "Full-stack e-commerce solution with real-time inventory management",
        image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=500&h=300&fit=crop",
        technologies: ["React", "Node.js", "MongoDB", "Stripe"],
        liveUrl: "https://example.com",
        githubUrl: "https://github.com/example"
      },
      {
        title: "Task Management App",
        description: "Collaborative project management tool with real-time updates",
        image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=500&h=300&fit=crop",
        technologies: ["Vue.js", "Firebase", "Tailwind CSS"],
        liveUrl: "https://example.com",
        githubUrl: "https://github.com/example"
      },
      {
        title: "Analytics Dashboard",
        description: "Real-time data visualization dashboard for business metrics",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&h=300&fit=crop",
        technologies: ["React", "D3.js", "Python", "PostgreSQL"],
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
          outline: isPreview ? '2px dashed rgba(102,126,234,0.4)' : 'none',
          minHeight: isPreview ? '20px' : 'auto',
          cursor: isPreview ? 'text' : 'default',
          padding: isPreview ? '4px' : '0',
          borderRadius: isPreview ? '4px' : '0',
          transition: 'all 0.2s ease'
        }}
        placeholder={placeholder}
        onFocus={(e) => {
          if (isPreview) {
            e.target.style.outline = '2px solid #667eea';
            e.target.style.backgroundColor = 'rgba(102,126,234,0.05)';
          }
        }}
        onBlur={(e) => {
          if (isPreview) {
            e.target.style.outline = '2px dashed rgba(102,126,234,0.4)';
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
    <div className="template1-super-enhanced">
      <style jsx>{`
        .template1-super-enhanced {
          font-family: 'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          line-height: 1.6;
          color: #333;
          overflow-x: hidden;
        }
        
        .hero-section {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 120px 0;
          position: relative;
          overflow: hidden;
          min-height: 100vh;
          display: flex;
          align-items: center;
        }
        
        .hero-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: 
            radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, rgba(120, 119, 198, 0.2) 0%, transparent 50%);
          animation: float 6s ease-in-out infinite;
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(1deg); }
        }
        
        .hero-content {
          position: relative;
          z-index: 2;
        }
        
        .profile-image {
          width: 250px;
          height: 250px;
          border-radius: 50%;
          border: 6px solid rgba(255,255,255,0.2);
          box-shadow: 
            0 25px 50px rgba(0,0,0,0.3),
            0 0 0 1px rgba(255,255,255,0.1);
          transition: all 0.4s ease;
          object-fit: cover;
        }
        
        .profile-image:hover {
          transform: scale(1.05) rotate(2deg);
          box-shadow: 
            0 35px 70px rgba(0,0,0,0.4),
            0 0 0 1px rgba(255,255,255,0.2);
        }
        
        .hero-title {
          font-size: 4rem;
          font-weight: 800;
          margin-bottom: 1.5rem;
          text-shadow: 2px 2px 8px rgba(0,0,0,0.3);
          background: linear-gradient(45deg, #fff, #f8f9ff);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: glow 2s ease-in-out infinite alternate;
        }
        
        @keyframes glow {
          from { text-shadow: 2px 2px 8px rgba(0,0,0,0.3); }
          to { text-shadow: 2px 2px 20px rgba(255,255,255,0.5); }
        }
        
        .hero-subtitle {
          font-size: 1.4rem;
          opacity: 0.95;
          margin-bottom: 2.5rem;
          font-weight: 300;
        }
        
        .hero-name {
          font-size: 3.5rem;
          font-weight: 700;
          margin-bottom: 1rem;
          text-shadow: 2px 2px 4px rgba(0,0,0,0.2);
        }
        
        .hero-job-title {
          font-size: 1.5rem;
          opacity: 0.9;
          margin-bottom: 2rem;
          font-weight: 400;
        }
        
        .cta-buttons {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
          justify-content: center;
          justify-content: lg-start;
        }
        
        .cta-button {
          padding: 15px 30px;
          border-radius: 50px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 1px;
          transition: all 0.3s ease;
          border: 2px solid transparent;
          position: relative;
          overflow: hidden;
        }
        
        .cta-button::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
          transition: left 0.5s;
        }
        
        .cta-button:hover::before {
          left: 100%;
        }
        
        .cta-button:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 25px rgba(0,0,0,0.2);
        }
        
        .section-title {
          font-size: 3rem;
          font-weight: 700;
          margin-bottom: 4rem;
          text-align: center;
          position: relative;
          color: #2c3e50;
        }
        
        .section-title::after {
          content: '';
          position: absolute;
          bottom: -15px;
          left: 50%;
          transform: translateX(-50%);
          width: 80px;
          height: 5px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 3px;
        }
        
        .section-title::before {
          content: '';
          position: absolute;
          bottom: -10px;
          left: 50%;
          transform: translateX(-50%);
          width: 120px;
          height: 2px;
          background: rgba(102,126,234,0.3);
          border-radius: 1px;
        }
        
        .about-section {
          padding: 100px 0;
          background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
        }
        
        .about-content {
          font-size: 1.2rem;
          line-height: 1.8;
          color: #555;
          text-align: center;
          max-width: 800px;
          margin: 0 auto;
          position: relative;
          padding: 2rem;
          background: white;
          border-radius: 20px;
          box-shadow: 0 15px 35px rgba(0,0,0,0.1);
        }
        
        .skills-section {
          padding: 100px 0;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
        }
        
        .skills-section .section-title {
          color: white;
        }
        
        .skills-section .section-title::after {
          background: white;
        }
        
        .skill-item {
          margin-bottom: 2.5rem;
          background: rgba(255,255,255,0.1);
          padding: 1.5rem;
          border-radius: 15px;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255,255,255,0.2);
          transition: all 0.3s ease;
        }
        
        .skill-item:hover {
          transform: translateY(-5px);
          background: rgba(255,255,255,0.15);
        }
        
        .skill-name {
          font-weight: 700;
          margin-bottom: 1rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 1.1rem;
        }
        
        .skill-level {
          font-size: 1rem;
          opacity: 0.9;
        }
        
        .skill-progress {
          height: 12px;
          border-radius: 6px;
          background: rgba(255,255,255,0.2);
          overflow: hidden;
          position: relative;
        }
        
        .skill-progress-bar {
          height: 100%;
          background: linear-gradient(90deg, #fff, #f0f0f0);
          border-radius: 6px;
          transition: width 2s ease-in-out;
          position: relative;
          overflow: hidden;
        }
        
        .skill-progress-bar::after {
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
        
        .experience-section {
          padding: 100px 0;
          background: #f8f9fa;
        }
        
        .experience-card {
          border: none;
          border-radius: 20px;
          box-shadow: 0 15px 35px rgba(0,0,0,0.08);
          transition: all 0.4s ease;
          margin-bottom: 3rem;
          overflow: hidden;
          background: white;
        }
        
        .experience-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 25px 50px rgba(0,0,0,0.15);
        }
        
        .experience-header {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 2rem;
          position: relative;
        }
        
        .experience-header::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg, #764ba2, #667eea, #764ba2);
        }
        
        .experience-position {
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
        }
        
        .experience-company {
          font-size: 1.2rem;
          opacity: 0.9;
          font-weight: 500;
        }
        
        .experience-meta {
          font-size: 0.95rem;
          opacity: 0.8;
        }
        
        .experience-body {
          padding: 2rem;
        }
        
        .experience-description {
          font-size: 1.1rem;
          line-height: 1.7;
          color: #555;
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
          color: #666;
        }
        
        .achievements-list li::before {
          content: '✓';
          position: absolute;
          left: 0;
          color: #667eea;
          font-weight: bold;
          font-size: 1.2rem;
        }
        
        .projects-section {
          padding: 100px 0;
          background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
        }
        
        .project-card {
          border: none;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 15px 35px rgba(0,0,0,0.1);
          transition: all 0.4s ease;
          height: 100%;
          background: white;
        }
        
        .project-card:hover {
          transform: translateY(-10px) scale(1.02);
          box-shadow: 0 25px 50px rgba(0,0,0,0.2);
        }
        
        .project-image {
          height: 250px;
          object-fit: cover;
          width: 100%;
          transition: transform 0.4s ease;
        }
        
        .project-card:hover .project-image {
          transform: scale(1.1);
        }
        
        .project-body {
          padding: 2rem;
        }
        
        .project-title {
          font-size: 1.4rem;
          font-weight: 700;
          margin-bottom: 1rem;
          color: #2c3e50;
        }
        
        .project-description {
          color: #666;
          line-height: 1.6;
          margin-bottom: 1.5rem;
        }
        
        .tech-badges {
          margin-bottom: 1.5rem;
        }
        
        .tech-badge {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 0.4rem 1rem;
          border-radius: 25px;
          font-size: 0.85rem;
          margin: 0.2rem;
          display: inline-block;
          font-weight: 500;
          transition: transform 0.2s ease;
        }
        
        .tech-badge:hover {
          transform: scale(1.05);
        }
        
        .project-buttons {
          display: flex;
          gap: 1rem;
        }
        
        .project-button {
          flex: 1;
          padding: 0.8rem 1.5rem;
          border-radius: 25px;
          font-weight: 600;
          transition: all 0.3s ease;
          text-decoration: none;
          text-align: center;
        }
        
        .project-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        }
        
        .contact-section {
          padding: 100px 0;
          background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
          color: white;
        }
        
        .contact-section .section-title {
          color: white;
        }
        
        .contact-section .section-title::after {
          background: white;
        }
        
        .contact-card {
          border: none;
          border-radius: 25px;
          background: rgba(255,255,255,0.1);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255,255,255,0.2);
          padding: 3rem;
          text-align: center;
          transition: all 0.4s ease;
        }
        
        .contact-card:hover {
          transform: translateY(-10px);
          background: rgba(255,255,255,0.15);
        }
        
        .contact-info-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 2rem;
          margin-bottom: 3rem;
        }
        
        .contact-info-item {
          text-align: center;
        }
        
        .contact-icon {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 1rem;
          font-size: 1.5rem;
          transition: transform 0.3s ease;
        }
        
        .contact-icon:hover {
          transform: scale(1.1) rotate(5deg);
        }
        
        .social-links {
          display: flex;
          justify-content: center;
          gap: 1rem;
          margin-top: 2rem;
        }
        
        .social-link {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          text-decoration: none;
          font-size: 1.5rem;
          transition: all 0.3s ease;
        }
        
        .social-link:hover {
          transform: scale(1.15) rotate(10deg);
          color: white;
          box-shadow: 0 10px 25px rgba(0,0,0,0.3);
        }
        
        /* Responsive Design */
        @media (max-width: 768px) {
          .hero-title {
            font-size: 2.5rem;
          }
          
          .hero-name {
            font-size: 2.5rem;
          }
          
          .hero-subtitle, .hero-job-title {
            font-size: 1.1rem;
          }
          
          .profile-image {
            width: 180px;
            height: 180px;
          }
          
          .section-title {
            font-size: 2.2rem;
          }
          
          .cta-buttons {
            justify-content: center;
          }
          
          .project-buttons {
            flex-direction: column;
          }
          
          .contact-info-grid {
            grid-template-columns: 1fr;
          }
        }
        
        @media (max-width: 576px) {
          .hero-section {
            padding: 80px 0;
          }
          
          .hero-title {
            font-size: 2rem;
          }
          
          .hero-name {
            font-size: 2rem;
          }
          
          .profile-image {
            width: 150px;
            height: 150px;
          }
          
          .section-title {
            font-size: 1.8rem;
          }
          
          .about-content {
            padding: 1.5rem;
            font-size: 1.1rem;
          }
          
          .experience-header, .experience-body {
            padding: 1.5rem;
          }
          
          .project-body {
            padding: 1.5rem;
          }
          
          .contact-card {
            padding: 2rem;
          }
        }
        
        /* Edit Mode Styles */
        .template1-super-enhanced [contenteditable="true"]:hover {
          background-color: rgba(102,126,234,0.1) !important;
        }
        
        .template1-super-enhanced [contenteditable="true"]:focus {
          background-color: rgba(102,126,234,0.15) !important;
          outline: 2px solid #667eea !important;
        }
      `}</style>

      {/* Hero Section */}
      <section className="hero-section">
        <Container>
          <Row className="align-items-center min-vh-100">
            <Col lg={6} className="text-center text-lg-start">
              <div className="hero-content">
                <EditableText
                  value={data.heroTitle}
                  field="heroTitle"
                  className="hero-title"
                  tag="h1"
                  placeholder="Your Hero Title"
                />
                <EditableText
                  value={data.heroSubtitle}
                  field="heroSubtitle"
                  className="hero-subtitle"
                  tag="p"
                  placeholder="Your inspiring subtitle"
                />
                <EditableText
                  value={data.name}
                  field="name"
                  className="hero-name"
                  tag="h2"
                  placeholder="Your Name"
                />
                <EditableText
                  value={data.title}
                  field="title"
                  className="hero-job-title"
                  tag="p"
                  placeholder="Your Professional Title"
                />
                <div className="cta-buttons">
                  <Button className="cta-button" variant="light" size="lg">
                    Download Resume
                  </Button>
                  <Button className="cta-button" variant="outline-light" size="lg">
                    View Projects
                  </Button>
                </div>
              </div>
            </Col>
            <Col lg={6} className="text-center mt-5 mt-lg-0">
              <img
                src={data.profileImage}
                alt="Profile"
                className="profile-image"
              />
            </Col>
          </Row>
        </Container>
      </section>

      {/* About Section */}
      <section className="about-section">
        <Container>
          <EditableText
            value={data.aboutTitle}
            field="aboutTitle"
            className="section-title"
            tag="h2"
            placeholder="About Me"
          />
          <div className="about-content">
            <EditableText
              value={data.about}
              field="about"
              tag="p"
              placeholder="Write your compelling story here. Share your passion, experience, and what drives you as a professional..."
            />
          </div>
        </Container>
      </section>

      {/* Skills Section */}
      <section className="skills-section">
        <Container>
          <EditableText
            value={data.skillsTitle}
            field="skillsTitle"
            className="section-title"
            tag="h2"
            placeholder="Technical Skills"
          />
          <Row>
            {data.skills?.map((skill, index) => (
              <Col md={6} key={index}>
                <div className="skill-item">
                  <div className="skill-name">
                    <EditableText
                      value={skill.name}
                      field="skills"
                      index={index}
                      subField="name"
                      placeholder="Skill name"
                    />
                    <span className="skill-level">{skill.level}%</span>
                  </div>
                  <div className="skill-progress">
                    <div
                      className="skill-progress-bar"
                      style={{ width: `${skill.level}%` }}
                    ></div>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Experience Section */}
      <section className="experience-section">
        <Container>
          <EditableText
            value={data.experienceTitle}
            field="experienceTitle"
            className="section-title"
            tag="h2"
            placeholder="Professional Experience"
          />
          {data.experience?.map((exp, index) => (
            <Card key={index} className="experience-card">
              <div className="experience-header">
                <Row>
                  <Col md={8}>
                    <EditableText
                      value={exp.position}
                      field="experience"
                      index={index}
                      subField="position"
                      className="experience-position"
                      tag="h3"
                      placeholder="Job Position"
                    />
                    <EditableText
                      value={exp.company}
                      field="experience"
                      index={index}
                      subField="company"
                      className="experience-company"
                      tag="h4"
                      placeholder="Company Name"
                    />
                  </Col>
                  <Col md={4} className="text-md-end">
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
                  </Col>
                </Row>
              </div>
              <div className="experience-body">
                <EditableText
                  value={exp.description}
                  field="experience"
                  index={index}
                  subField="description"
                  className="experience-description"
                  tag="p"
                  placeholder="Describe your role and responsibilities..."
                />
                {exp.achievements && (
                  <div>
                    <h6 className="mb-3">Key Achievements:</h6>
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
                  </div>
                )}
              </div>
            </Card>
          ))}
        </Container>
      </section>

      {/* Projects Section */}
      <section className="projects-section">
        <Container>
          <EditableText
            value={data.projectsTitle}
            field="projectsTitle"
            className="section-title"
            tag="h2"
            placeholder="Featured Projects"
          />
          <Row>
            {data.projects?.map((project, index) => (
              <Col lg={4} md={6} key={index} className="mb-4">
                <Card className="project-card">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="project-image"
                  />
                  <div className="project-body">
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
                    <div className="tech-badges">
                      {project.technologies?.map((tech, techIndex) => (
                        <span key={techIndex} className="tech-badge">
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="project-buttons">
                      <Button variant="primary" className="project-button">
                        Live Demo
                      </Button>
                      <Button variant="outline-primary" className="project-button">
                        GitHub
                      </Button>
                    </div>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Contact Section */}
      <section className="contact-section">
        <Container>
          <EditableText
            value={data.contactTitle}
            field="contactTitle"
            className="section-title"
            tag="h2"
            placeholder="Let's Connect"
          />
          <Row>
            <Col lg={8} className="mx-auto">
              <Card className="contact-card">
                <h4 className="mb-4">Ready to work together?</h4>
                <div className="contact-info-grid">
                  <div className="contact-info-item">
                    <div className="contact-icon">
                      <i className="fas fa-envelope"></i>
                    </div>
                    <EditableText
                      value={data.email}
                      field="email"
                      tag="p"
                      placeholder="your.email@example.com"
                    />
                  </div>
                  <div className="contact-info-item">
                    <div className="contact-icon">
                      <i className="fas fa-phone"></i>
                    </div>
                    <EditableText
                      value={data.phone}
                      field="phone"
                      tag="p"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                  <div className="contact-info-item">
                    <div className="contact-icon">
                      <i className="fas fa-map-marker-alt"></i>
                    </div>
                    <EditableText
                      value={data.location}
                      field="location"
                      tag="p"
                      placeholder="Your Location"
                    />
                  </div>
                </div>
                <div className="social-links">
                  <a href={data.linkedin} target="_blank" rel="noopener noreferrer" className="social-link">
                    <i className="fab fa-linkedin-in"></i>
                  </a>
                  <a href={data.github} target="_blank" rel="noopener noreferrer" className="social-link">
                    <i className="fab fa-github"></i>
                  </a>
                  <a href={data.website} target="_blank" rel="noopener noreferrer" className="social-link">
                    <i className="fas fa-globe"></i>
                  </a>
                </div>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
}

export default Template1SuperEnhanced;