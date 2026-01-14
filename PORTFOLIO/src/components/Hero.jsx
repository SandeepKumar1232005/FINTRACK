import React from 'react';
import { FaGithub, FaLinkedin, FaEnvelope, FaCode } from 'react-icons/fa';
import { motion } from 'framer-motion';
import sandeepImg from '../assets/sandeep.jpg';

const Hero = () => {
    return (
        <section id="home" className="hero-section">
            <div className="hero-bg-gradient"></div>

            <div className="container hero-container">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="hero-content"
                >
                    <p className="greeting">Hello, I'm</p>
                    <h1 className="hero-title">Sandeep Kumar J</h1>
                    <h2 className="hero-subtitle">
                        <span className="typing-text">Full Stack Developer</span>
                    </h2>
                    <p className="hero-description">
                        A passionate Computer Science Engineering student building scalable, user-centric web applications and AI solutions.
                    </p>

                    <div className="hero-buttons">
                        <a href="#projects" className="btn btn-primary">View My Work</a>
                        <a href="#contact" className="btn btn-secondary">Contact Me</a>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.8 }}
                        className="social-links"
                    >
                        <a href="https://github.com/SandeepKumar1232005" target="_blank" rel="noopener noreferrer" className="social-icon"><FaGithub /></a>
                        <a href="https://www.linkedin.com/in/sandeep-kumar-54908a2b7/" target="_blank" rel="noopener noreferrer" className="social-icon"><FaLinkedin /></a>
                        <a href="mailto:kit27.cse306@gmail.com" className="social-icon"><FaEnvelope /></a>
                    </motion.div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="hero-visual"
                >
                    <div className="img-wrapper">
                        <img src={sandeepImg} alt="Sandeep Kumar J" className="hero-img" />
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
