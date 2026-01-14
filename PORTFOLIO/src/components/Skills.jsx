import React from 'react';
import { FaCode, FaServer, FaDatabase, FaTools, FaLock, FaBrain } from 'react-icons/fa';
import RevealOnScroll from './RevealOnScroll';

const Skills = () => {
    const skillsData = [
        {
            category: "Frontend",
            icon: <FaCode />,
            items: ["React.js", "Next.js", "HTML", "CSS"]
        },
        {
            category: "Backend",
            icon: <FaServer />,
            items: ["Node.js", "Express.js", "RESTful APIs"]
        },
        {
            category: "Databases",
            icon: <FaDatabase />,
            items: ["MongoDB", "SQLite", "SQL"]
        },
        {
            category: "Programming",
            icon: <FaBrain />,
            items: ["Python", "JavaScript", "TypeScript", "C", "C++"]
        },
        {
            category: "Authentication & Security",
            icon: <FaLock />,
            items: ["JWT-based authentication"]
        },
        {
            category: "Tools",
            icon: <FaTools />,
            items: ["Git", "GitHub", "Linux"]
        },
        {
            category: "Concepts",
            icon: <FaBrain />,
            items: ["OOPS", "Data Structures & Algorithms", "Design Patterns"]
        }
    ];

    return (
        <section id="skills" className="section">
            <div className="container">
                <RevealOnScroll>
                    <h2 className="section-title">Core Expertise</h2>
                    <p className="hero-description" style={{ textAlign: "center", maxWidth: "700px", margin: "0 auto 3rem auto" }}>
                        I specialize in full stack development, primarily using the MERN stack, and I’m comfortable working across the entire development lifecycle—from ideation and design to deployment and optimization.
                    </p>
                </RevealOnScroll>

                <RevealOnScroll>
                    <div className="skills-grid">
                        {skillsData.map((skill, index) => (
                            <div key={index} className="skill-card glass-card">
                                <div className="skill-icon">{skill.icon}</div>
                                <h3 className="skill-category">{skill.category}</h3>
                                <div className="skill-tags">
                                    {skill.items.map((item, idx) => (
                                        <span key={idx} className="skill-tag">{item}</span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </RevealOnScroll>
            </div>
        </section>
    );
};

export default Skills;
