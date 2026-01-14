import React from 'react';
import RevealOnScroll from './RevealOnScroll';

const About = () => {
    return (
        <section id="about" className="section">
            <div className="container">
                <RevealOnScroll>
                    <h2 className="section-title">About Me</h2>
                </RevealOnScroll>

                <div className="about-wrapper">
                    <RevealOnScroll>
                        <div className="about-content glass-card">
                            <h3 className="about-subtitle">Who I Am</h3>
                            <p className="about-text">
                                Hello! I’m <strong>Sandeep Kumar J</strong>, a Computer Science Engineering undergraduate and an enthusiastic Full Stack Developer who loves building meaningful digital products from scratch. I enjoy turning complex problems into simple, elegant, and scalable solutions using modern technologies.
                            </p>
                            <p className="about-text">
                                My journey in tech started with a strong foundation in computer engineering, and over time, I’ve expanded my skill set across web development, backend systems, databases, and AI-powered applications. I believe great software is not just about writing code—it’s about creating experiences that are reliable, intuitive, and impactful.
                            </p>
                        </div>
                    </RevealOnScroll>

                    <RevealOnScroll>
                        <div className="what-i-do glass-card">
                            <h3 className="about-subtitle">My Development Philosophy</h3>
                            <p className="about-text" style={{ marginBottom: '1rem' }}>I focus on:</p>
                            <ul className="do-list">
                                <li>⚡ Writing clean, maintainable, and scalable code</li>
                                <li>⚡ Designing user-first interfaces</li>
                                <li>⚡ Building secure and efficient backend systems</li>
                                <li>⚡ Continuously learning and adapting to new technologies</li>
                            </ul>
                            <p className="about-text" style={{ marginTop: '1rem', fontStyle: 'italic', fontSize: '0.95rem' }}>
                                "Every project I build teaches me something new—whether it’s improving performance, enhancing security, or refining user experience."
                            </p>
                        </div>
                    </RevealOnScroll>

                    <div style={{ gridColumn: "span 2", marginTop: "2rem" }}>
                        <RevealOnScroll>
                            <div className="glass-card">
                                <h3 className="about-subtitle" style={{ textAlign: "center" }}>Career Goal</h3>
                                <p className="about-text" style={{ textAlign: "center", maxWidth: "800px", margin: "0 auto" }}>
                                    I aspire to become a skilled software engineer who builds impactful products at scale, contributes to meaningful projects, and continuously evolves with the tech industry. I’m always open to learning, collaborating, and taking on challenging opportunities.
                                </p>
                            </div>
                        </RevealOnScroll>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
