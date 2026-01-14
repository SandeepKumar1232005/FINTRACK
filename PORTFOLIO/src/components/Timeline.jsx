import React from 'react';
import { FaTrophy, FaCertificate, FaChalkboardTeacher, FaMedal, FaLaptopCode, FaHandshake } from 'react-icons/fa';
import RevealOnScroll from './RevealOnScroll';

const Timeline = () => {
    return (
        <section id="achievements" className="section">
            <div className="container">
                <RevealOnScroll>
                    <h2 className="section-title">Competitive Programming & Learning</h2>
                    <p className="hero-description" style={{ textAlign: "center", maxWidth: "700px", margin: "0 auto 3rem auto" }}>
                        I actively sharpen my problem-solving skills on platforms like LeetCode, CodeChef, and Codeforces, where I focus on algorithms, logical thinking, and code optimization. Competitive programming has strengthened my ability to think analytically and approach problems with confidence.
                    </p>
                </RevealOnScroll>

                <div className="skills-grid">
                    <RevealOnScroll>
                        <div className="skill-card glass-card">
                            <div className="skill-icon"><FaAwardIcon /></div>
                            <h3 className="skill-category">Lifelong Learner</h3>
                            <p className="about-text" style={{ textAlign: 'center', fontSize: '0.95rem' }}>
                                I’ve also completed multiple certifications in Cybersecurity, Linux, and Python, reinforcing my technical depth and passion for continuous improvement.
                            </p>
                        </div>
                    </RevealOnScroll>
                </div>

                <RevealOnScroll>
                    <h2 className="section-title" style={{ marginTop: "5rem" }}>Beyond Development</h2>
                </RevealOnScroll>

                <div className="skills-grid">
                    <RevealOnScroll>
                        <div className="skill-card glass-card">
                            <div className="skill-icon"><FaHandshake /></div>
                            <h3 className="skill-category">Mentorship</h3>
                            <p className="about-text" style={{ textAlign: 'center', fontSize: '0.95rem' }}>
                                Apart from coding, I enjoy mentoring juniors, conducting peer-learning sessions, and assisting with mock interviews. Teaching others has helped me strengthen my own fundamentals and communication skills.
                            </p>
                        </div>
                    </RevealOnScroll>

                    <RevealOnScroll>
                        <div className="skill-card glass-card">
                            <div className="skill-icon"><FaMedal /></div>
                            <h3 className="skill-category">Recognition</h3>
                            <p className="about-text" style={{ textAlign: 'center', fontSize: '0.95rem' }}>
                                I’ve also participated in technical competitions, earning recognition in paper presentations and debugging contests, which further fueled my enthusiasm for innovation and collaboration.
                            </p>
                        </div>
                    </RevealOnScroll>

                </div>
            </div>
        </section>
    );
};

const FaAwardIcon = () => <FaCertificate />;

export default Timeline;
