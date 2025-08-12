import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";

function Template2SuperEnhanced({ isPreview = false, userData = null, onDataChange = null }) {
  const [data, setData] = useState({});

  const defaultData = {
    name: "Alex Chen",
    title: "Creative Developer & Designer",
    email: "alex.chen@example.com",
    phone: "+1 (555) 987-6543",
    location: "New York, NY",
    linkedin: "https://linkedin.com/in/alexchen",
    github: "https://github.com/alexchen",
    website: "https://alexchen.dev",
    profileImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
    about: "I'm a creative developer who bridges the gap between design and technology. With a passion for clean code and beautiful interfaces, I create digital experiences that are both functional and visually stunning.",
    tagline: "Code. Design. Create.",
    motto: "Crafting digital experiences with precision and creativity",
    aboutTitle: "Who I Am",
    experienceTitle: "Journey",
    skillsTitle: "Expertise",
    projectsTitle: "Work",
    contactTitle: "Connect",
    experience: [
      {
        company: "Digital Studio",
        position: "Senior Creative Developer",
        duration: "2023 - Present",
        location: "New York, NY",
        description: "Leading creative development projects for high-profile clients, combining cutting-edge technology with innovative design solutions.",
        achievements: [
          "Increased client satisfaction by 40%",
          "Led team of 8 developers and designers",
          "Delivered 25+ successful projects"
        ]
      },
      {
        company: "Tech Startup",
        position: "Full Stack Developer",
        duration: "2021 - 2023",
        location: "Remote",
        description: "Built scalable web applications from concept to deployment, focusing on user experience and performance optimization.",
        achievements: [
          "Reduced load times by 65%",
          "Implemented modern CI/CD pipeline",
          "Mentored 3 junior developers"
        ]
      }
    ],
    skills: [
      { name: "React & Next.js", level: 95, category: "Frontend" },
      { name: "Node.js & Express", level: 90, category: "Backend" },
      { name: "UI/UX Design", level: 88, category: "Design" },
      { name: "TypeScript", level: 85, category: "Language" },
      { name: "GraphQL", level: 82, category: "API" },
      { name: "AWS & DevOps", level: 80, category: "Cloud" }
    ],
    projects: [
      {
        title: "Portfolio Platform",
        description: "A modern portfolio platform for creative professionals with advanced customization options",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&h=300&fit=crop",
        technologies: ["React", "Node.js", "MongoDB", "AWS"],
        liveUrl: "https://example.com",
        githubUrl: "https://github.com/example"
      },
      {
        title: "E-Learning App",
        description: "Interactive learning platform with real-time collaboration and progress tracking",
        image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=500&h=300&fit=crop",
        technologies: ["Vue.js", "Firebase", "WebRTC"],
        liveUrl: "https://example.com",
        githubUrl: "https://github.com/example"
      },
      {
        title: "Design System",
        description: "Comprehensive design system and component library for enterprise applications",
        image: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=500&h=300&fit=crop",
        technologies: ["React", "Storybook", "Figma"],
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
          outline: isPreview ? '1px dashed rgba(255,255,255,0.3)' : 'none',
          minHeight: isPreview ? '20px' : 'auto',
          cursor: isPreview ? 'text' : 'default',
          padding: isPreview ? '4px' : '0',
          borderRadius: isPreview ? '4px' : '0',
          transition: 'all 0.2s ease'
        }}
        placeholder={placeholder}
        onFocus={(e) => {
          if (isPreview) {
            e.target.style.outline = '1px solid #00ff88';
            e.target.style.backgroundColor = 'rgba(0,255,136,0.1)';
          }
        }}
        onBlur={(e) => {
          if (isPreview) {
            e.target.style.outline = '1px dashed rgba(255,255,255,0.3)';
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
    <div className="template2-dark-minimal">
      <style jsx>{`
        .template2-dark-minimal {
          font-family: 'JetBrains Mono', 'Fira Code', 'Monaco', monospace;
          background: #0a0a0a;
          color: #ffffff;
          line-height: 1.6;
          overflow-x: hidden;
        }
        
        /* Custom Scrollbar */
        .template2-dark-minimal::-webkit-scrollbar {
          width: 8px;
        }
        
        .template2-dark-minimal::-webkit-scrollbar-track {
          background: #1a1a1a;
        }
        
        .template2-dark-minimal::-webkit-scrollbar-thumb {
          background: #00ff88;
          border-radius: 4px;
        }
        
        .template2-dark-minimal::-webkit-scrollbar-thumb:hover {
          background: #00cc6a;
        }
        
        /* Hero Section */
        .hero-section {
          min-height: 100vh;
          background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%);
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
            radial-gradient(circle at 20% 20%, rgba(0,255,136,0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(0,255,136,0.05) 0%, transparent 50%);
          animation: pulse 4s ease-in-out infinite;
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.8; }
        }
        
        .hero-content {
          position: relative;
          z-index: 2;
        }
        
        .profile-container {
          position: relative;
          display: inline-block;
        }
        
        .profile-image {
          width: 200px;
          height: 200px;
          border-radius: 4px;
          border: 2px solid #00ff88;
          object-fit: cover;
          filter: grayscale(100%);
          transition: all 0.4s ease;
          position: relative;
        }
        
        .profile-image:hover {
          filter: grayscale(0%);
          transform: scale(1.05);
          box-shadow: 0 0 30px rgba(0,255,136,0.3);
        }
        
        .profile-container::after {
          content: '';
          position: absolute;
          top: -10px;
          left: -10px;
          right: -10px;
          bottom: -10px;
          border: 1px solid rgba(0,255,136,0.3);
          border-radius: 4px;
          animation: borderGlow 2s ease-in-out infinite;
        }
        
        @keyframes borderGlow {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.8; }
        }
        
        .hero-name {
          font-size: 4rem;
          font-weight: 300;
          margin-bottom: 0.5rem;
          color: #ffffff;
          letter-spacing: -2px;
        }
        
        .hero-title {
          font-size: 1.5rem;
          color: #00ff88;
          margin-bottom: 1rem;
          font-weight: 400;
          text-transform: uppercase;
          letter-spacing: 2px;
        }
        
        .hero-tagline {
          font-size: 2rem;
          color: #888888;
          margin-bottom: 1rem;
          font-weight: 200;
        }
        
        .hero-motto {
          font-size: 1.1rem;
          color: #cccccc;
          margin-bottom: 2rem;
          max-width: 500px;
        }
        
        .terminal-button {
          background: transparent;
          border: 1px solid #00ff88;
          color: #00ff88;
          padding: 12px 24px;
          font-family: inherit;
          font-size: 0.9rem;
          cursor: pointer;
          transition: all 0.3s ease;
          margin-right: 1rem;
          position: relative;
          overflow: hidden;
        }
        
        .terminal-button::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(0,255,136,0.2), transparent);
          transition: left 0.5s;
        }
        
        .terminal-button:hover::before {
          left: 100%;
        }
        
        .terminal-button:hover {
          background: rgba(0,255,136,0.1);
          color: #ffffff;
          transform: translateY(-2px);
        }
        
        /* Section Styles */
        .section {
          padding: 100px 0;
          position: relative;
        }
        
        .section-title {
          font-size: 3rem;
          font-weight: 200;
          margin-bottom: 4rem;
          color: #ffffff;
          position: relative;
          display: inline-block;
        }
        
        .section-title::after {
          content: '';
          position: absolute;
          bottom: -10px;
          left: 0;
          width: 50px;
          height: 2px;
          background: #00ff88;
        }
        
        .section-title::before {
          content: attr(data-number);
          position: absolute;
          top: -20px;
          left: 0;
          font-size: 1rem;
          color: #00ff88;
          font-weight: 400;
        }
        
        /* About Section */
        .about-section {
          background: #0f0f0f;
        }
        
        .about-content {
          font-size: 1.2rem;
          line-height: 1.8;
          color: #cccccc;
          max-width: 600px;
        }
        
        .about-stats {
          margin-top: 3rem;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          gap: 2rem;
        }
        
        .stat-item {
          text-align: center;
          padding: 1.5rem;
          border: 1px solid rgba(255,255,255,0.1);
          background: rgba(255,255,255,0.02);
          transition: all 0.3s ease;
        }
        
        .stat-item:hover {
          border-color: #00ff88;
          background: rgba(0,255,136,0.05);
        }
        
        .stat-number {
          font-size: 2rem;
          color: #00ff88;
          font-weight: 300;
          display: block;
        }
        
        .stat-label {
          color: #888888;
          font-size: 0.9rem;
          text-transform: uppercase;
          letter-spacing: 1px;
        }
        
        /* Skills Section */
        .skills-section {
          background: #0a0a0a;
        }
        
        .skills-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
        }
        
        .skill-category {
          border: 1px solid rgba(255,255,255,0.1);
          padding: 2rem;
          background: rgba(255,255,255,0.02);
          transition: all 0.3s ease;
        }
        
        .skill-category:hover {
          border-color: #00ff88;
          background: rgba(0,255,136,0.05);
        }
        
        .skill-category-title {
          color: #00ff88;
          font-size: 1.2rem;
          margin-bottom: 1.5rem;
          text-transform: uppercase;
          letter-spacing: 1px;
        }
        
        .skill-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
          padding: 0.5rem 0;
          border-bottom: 1px solid rgba(255,255,255,0.05);
        }
        
        .skill-name {
          color: #ffffff;
          font-size: 0.9rem;
        }
        
        .skill-level {
          color: #00ff88;
          font-size: 0.8rem;
          font-weight: 400;
        }
        
        /* Experience Section */
        .experience-section {
          background: #0f0f0f;
        }
        
        .experience-timeline {
          position: relative;
          padding-left: 2rem;
        }
        
        .experience-timeline::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 1px;
          background: rgba(0,255,136,0.3);
        }
        
        .experience-item {
          position: relative;
          margin-bottom: 3rem;
          padding-left: 2rem;
        }
        
        .experience-item::before {
          content: '';
          position: absolute;
          left: -6px;
          top: 0;
          width: 12px;
          height: 12px;
          background: #00ff88;
          border-radius: 50%;
        }
        
        .experience-header {
          margin-bottom: 1rem;
        }
        
        .experience-position {
          font-size: 1.3rem;
          color: #ffffff;
          margin-bottom: 0.5rem;
        }
        
        .experience-company {
          color: #00ff88;
          font-size: 1.1rem;
          margin-bottom: 0.5rem;
        }
        
        .experience-meta {
          color: #888888;
          font-size: 0.9rem;
          margin-bottom: 1rem;
        }
        
        .experience-description {
          color: #cccccc;
          line-height: 1.6;
          margin-bottom: 1rem;
        }
        
        .experience-achievements {
          list-style: none;
          padding: 0;
        }
        
        .experience-achievements li {
          color: #cccccc;
          margin-bottom: 0.5rem;
          position: relative;
          padding-left: 1.5rem;
        }
        
        .experience-achievements li::before {
          content: '▸';
          position: absolute;
          left: 0;
          color: #00ff88;
        }
        
        /* Projects Section */
        .projects-section {
          background: #0a0a0a;
        }
        
        .projects-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 2rem;
        }
        
        .project-card {
          border: 1px solid rgba(255,255,255,0.1);
          background: rgba(255,255,255,0.02);
          overflow: hidden;
          transition: all 0.4s ease;
          position: relative;
        }
        
        .project-card:hover {
          border-color: #00ff88;
          background: rgba(0,255,136,0.05);
          transform: translateY(-5px);
        }
        
        .project-image {
          width: 100%;
          height: 200px;
          object-fit: cover;
          filter: grayscale(100%);
          transition: all 0.4s ease;
        }
        
        .project-card:hover .project-image {
          filter: grayscale(0%);
        }
        
        .project-content {
          padding: 1.5rem;
        }
        
        .project-title {
          color: #ffffff;
          font-size: 1.2rem;
          margin-bottom: 1rem;
        }
        
        .project-description {
          color: #cccccc;
          font-size: 0.9rem;
          line-height: 1.6;
          margin-bottom: 1.5rem;
        }
        
        .project-tech {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-bottom: 1.5rem;
        }
        
        .tech-tag {
          background: rgba(0,255,136,0.1);
          color: #00ff88;
          padding: 0.3rem 0.8rem;
          font-size: 0.8rem;
          border: 1px solid rgba(0,255,136,0.3);
        }
        
        .project-links {
          display: flex;
          gap: 1rem;
        }
        
        .project-link {
          color: #00ff88;
          text-decoration: none;
          font-size: 0.9rem;
          border-bottom: 1px solid transparent;
          transition: all 0.3s ease;
        }
        
        .project-link:hover {
          color: #ffffff;
          border-bottom-color: #00ff88;
        }
        
        /* Contact Section */
        .contact-section {
          background: #0f0f0f;
          text-align: center;
        }
        
        .contact-content {
          max-width: 600px;
          margin: 0 auto;
        }
        
        .contact-info {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 2rem;
          margin: 3rem 0;
        }
        
        .contact-item {
          padding: 1.5rem;
          border: 1px solid rgba(255,255,255,0.1);
          background: rgba(255,255,255,0.02);
          transition: all 0.3s ease;
        }
        
        .contact-item:hover {
          border-color: #00ff88;
          background: rgba(0,255,136,0.05);
        }
        
        .contact-label {
          color: #888888;
          font-size: 0.8rem;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 0.5rem;
        }
        
        .contact-value {
          color: #ffffff;
          font-size: 1rem;
        }
        
        .social-links {
          display: flex;
          justify-content: center;
          gap: 2rem;
          margin-top: 3rem;
        }
        
        .social-link {
          color: #888888;
          font-size: 1.5rem;
          transition: all 0.3s ease;
          text-decoration: none;
        }
        
        .social-link:hover {
          color: #00ff88;
          transform: translateY(-3px);
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
            font-size: 2rem;
          }
          
          .profile-image {
            width: 150px;
            height: 150px;
          }
          
          .projects-grid {
            grid-template-columns: 1fr;
          }
          
          .skills-grid {
            grid-template-columns: 1fr;
          }
          
          .about-stats {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        
        @media (max-width: 576px) {
          .hero-name {
            font-size: 2rem;
          }
          
          .hero-tagline {
            font-size: 1.2rem;
          }
          
          .section {
            padding: 60px 0;
          }
          
          .about-stats {
            grid-template-columns: 1fr;
          }
          
          .contact-info {
            grid-template-columns: 1fr;
          }
        }
        
        /* Edit Mode Styles */
        .template2-dark-minimal [contenteditable="true"]:hover {
          background-color: rgba(0,255,136,0.1) !important;
        }
        
        .template2-dark-minimal [contenteditable="true"]:focus {
          background-color: rgba(0,255,136,0.15) !important;
          outline: 1px solid #00ff88 !important;
        }
      `}</style>

      {/* Hero Section */}
      <section className="hero-section">
        <Container>
          <Row className="align-items-center min-vh-100">
            <Col lg={8}>
              <div className="hero-content">
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
                  placeholder="Your Title"
                />
                <EditableText
                  value={data.tagline}
                  field="tagline"
                  className="hero-tagline"
                  tag="h2"
                  placeholder="Your Tagline"
                />
                <EditableText
                  value={data.motto}
                  field="motto"
                  className="hero-motto"
                  tag="p"
                  placeholder="Your motto or mission statement"
                />
                <div className="mt-4">
                  <button className="terminal-button">
                    ./view-work
                  </button>
                  <button className="terminal-button">
                    ./contact-me
                  </button>
                </div>
              </div>
            </Col>
            <Col lg={4} className="text-center">
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
          <EditableText
            value={data.aboutTitle}
            field="aboutTitle"
            className="section-title"
            tag="h2"
            placeholder="About"
            data-number="01."
          />
          <Row>
            <Col lg={8}>
              <EditableText
                value={data.about}
                field="about"
                className="about-content"
                tag="p"
                placeholder="Tell your story here..."
              />
            </Col>
          </Row>
          <div className="about-stats">
            <div className="stat-item">
              <span className="stat-number">50+</span>
              <span className="stat-label">Projects</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">5+</span>
              <span className="stat-label">Years</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">30+</span>
              <span className="stat-label">Clients</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">100%</span>
              <span className="stat-label">Satisfaction</span>
            </div>
          </div>
        </Container>
      </section>

      {/* Skills Section */}
      <section className="skills-section section">
        <Container>
          <EditableText
            value={data.skillsTitle}
            field="skillsTitle"
            className="section-title"
            tag="h2"
            placeholder="Skills"
            data-number="02."
          />
          <div className="skills-grid">
            {['Frontend', 'Backend', 'Design', 'Tools'].map((category, catIndex) => (
              <div key={catIndex} className="skill-category">
                <h3 className="skill-category-title">{category}</h3>
                {data.skills?.filter(skill => 
                  (category === 'Frontend' && ['React', 'TypeScript'].some(tech => skill.name.includes(tech))) ||
                  (category === 'Backend' && ['Node.js', 'GraphQL'].some(tech => skill.name.includes(tech))) ||
                  (category === 'Design' && skill.name.includes('Design')) ||
                  (category === 'Tools' && skill.name.includes('AWS'))
                ).map((skill, index) => (
                  <div key={index} className="skill-item">
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
                ))}
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Experience Section */}
      <section className="experience-section section">
        <Container>
          <EditableText
            value={data.experienceTitle}
            field="experienceTitle"
            className="section-title"
            tag="h2"
            placeholder="Experience"
            data-number="03."
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
                  <ul className="experience-achievements">
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
        </Container>
      </section>

      {/* Projects Section */}
      <section className="projects-section section">
        <Container>
          <EditableText
            value={data.projectsTitle}
            field="projectsTitle"
            className="section-title"
            tag="h2"
            placeholder="Projects"
            data-number="04."
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
                    <a href={project.liveUrl} className="project-link" target="_blank" rel="noopener noreferrer">
                      Live Demo →
                    </a>
                    <a href={project.githubUrl} className="project-link" target="_blank" rel="noopener noreferrer">
                      GitHub →
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Contact Section */}
      <section className="contact-section section">
        <Container>
          <EditableText
            value={data.contactTitle}
            field="contactTitle"
            className="section-title"
            tag="h2"
            placeholder="Contact"
            data-number="05."
          />
          <div className="contact-content">
            <p style={{ color: '#cccccc', fontSize: '1.2rem', marginBottom: '3rem' }}>
              Ready to collaborate? Let's build something amazing together.
            </p>
            <div className="contact-info">
              <div className="contact-item">
                <div className="contact-label">Email</div>
                <EditableText
                  value={data.email}
                  field="email"
                  className="contact-value"
                  placeholder="your.email@example.com"
                />
              </div>
              <div className="contact-item">
                <div className="contact-label">Phone</div>
                <EditableText
                  value={data.phone}
                  field="phone"
                  className="contact-value"
                  placeholder="+1 (555) 123-4567"
                />
              </div>
              <div className="contact-item">
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

export default Template2SuperEnhanced;