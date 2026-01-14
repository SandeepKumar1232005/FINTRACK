import React from 'react';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import { SiLeetcode, SiCodechef, SiCodeforces } from 'react-icons/si';
import RevealOnScroll from './RevealOnScroll';

const Footer = () => {
    return (
        <footer id="contact" className="footer">
            <div className="container footer-content">
                <RevealOnScroll>
                    <div style={{ textAlign: 'center' }}>
                        <div className="footer-intro">
                            <h3 className="footer-name">Sandeep Kumar J</h3>
                            <p style={{ color: '#aaa', fontSize: '1.1rem' }}>Building digital experiences that matter.</p>
                        </div>

                        <div className="footer-socials">
                            <a href="https://github.com/SandeepKumar1232005" target="_blank" rel="noopener noreferrer"><FaGithub /></a>
                            <a href="https://www.linkedin.com/in/sandeep-kumar-54908a2b7/" target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
                            <a href="https://leetcode.com/u/kitcse306/" target="_blank" rel="noopener noreferrer"><SiLeetcode /></a>
                            <a href="https://www.codechef.com/users/sandeep1232005" target="_blank" rel="noopener noreferrer"><SiCodechef /></a>
                            <a href="https://codeforces.com/profile/sandeepkumar2005" target="_blank" rel="noopener noreferrer"><SiCodeforces /></a>
                            <a href="mailto:kit27.cse306@gmail.com"><FaEnvelope /></a>
                        </div>

                        <div className="footer-copyright">
                            <p style={{ fontStyle: 'italic', marginBottom: '1rem' }}>“Code with purpose. Build with passion. Learn without limits.”</p>
                            <p>© {new Date().getFullYear()} Sandeep Kumar J. All rights reserved.</p>
                        </div>
                    </div>
                </RevealOnScroll>
            </div>
        </footer>
    );
};

export default Footer;
