import React from 'react';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import RevealOnScroll from './RevealOnScroll';

const Projects = () => {
    const projects = [
        {
            title: "Billing Software",
            description: "A desktop-based billing application developed using Python, Tkinter, and SQLite, designed to simplify product management and automate invoice generation. The system ensures fast data retrieval, accurate billing, and a smooth user experience—making it ideal for small-scale businesses.",
            tech: ["Python", "Tkinter", "SQLite"],
            link: "#", // Replace with actual link
            github: "#"
        },
        {
            title: "ScribeConnect",
            description: "A secure and responsive note-taking and document management platform built with React.js, Node.js, Express.js, and MongoDB. It features JWT authentication, personalized dashboards, and seamless cross-device usability—allowing users to write, edit, and manage content efficiently.",
            tech: ["React.js", "Node.js", "Express.js", "MongoDB", "JWT"],
            link: "#",
            github: "#"
        },
        {
            title: "MedVisor AI",
            description: "An AI-powered medical assistant that analyzes user symptoms and delivers structured health insights using Gemini APIs. The platform securely stores consultation history and provides a clean, intuitive interface to ensure ease of use and reliability.",
            tech: ["Gemini API", "AI/ML", "React.js", "Node.js"],
            link: "#",
            github: "#"
        }
    ];

    return (
        <section id="projects" className="section">
            <div className="container">
                <RevealOnScroll>
                    <h2 className="section-title">Projects That Define Me</h2>
                </RevealOnScroll>

                <div className="projects-grid">
                    {projects.map((project, index) => (
                        <RevealOnScroll key={index}>
                            <div className="project-card glass-card">
                                <div className="project-content">
                                    <h3 className="project-title">{project.title}</h3>
                                    <p className="project-desc">{project.description}</p>
                                    <div className="project-tech">
                                        {project.tech.map((t, i) => <span key={i} className="tech-tag">{t}</span>)}
                                    </div>
                                    <div className="project-links">
                                        <a href={project.github} className="icon-link"><FaGithub /> Code</a>
                                        <a href={project.link} className="icon-link"><FaExternalLinkAlt /> Live Demo</a>
                                    </div>
                                </div>
                            </div>
                        </RevealOnScroll>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;
