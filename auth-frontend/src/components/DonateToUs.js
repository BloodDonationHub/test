import React from 'react';
import { FaHandHoldingHeart, FaQrcode, FaBitcoin, FaMobileAlt, FaUniversity } from 'react-icons/fa';
import "./DonateToUs.css";

const DonateToUs = () => {
    return (
        <div className="donate-page">
            {/* Hero Section */}
            <section className="donate-hero">
                <div className="hero-overlay"></div>
                <div className="hero-content">
                    <h1 className="hero-title">Fuel Our Mission to Save Lives</h1>
                    <p className="hero-subtitle">Every contribution helps us provide critical blood services to those in need</p>
                    <div className="hero-buttons">
                        <a href="#bank-transfer" className="btn btn-primary btn-lg">Bank Transfer</a>
                        <a href="#digital-wallets" className="btn btn-success btn-lg">Digital Payment</a>
                    </div>
                </div>
            </section>

            {/* Impact Stats */}
            <section className="impact-stats">
                <div className="container">
                    <div className="stat-cards">
                        <div className="stat-card">
                            <div className="stat-number">5,000+</div>
                            <div className="stat-label">Lives Saved</div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-number">200+</div>
                            <div className="stat-label">Blood Drives</div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-number">50+</div>
                            <div className="stat-label">Communities Served</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Donation Methods */}
            <section className="donation-methods container">
                {/* Bank Transfer */}
                <div id="bank-transfer" className="method-card">
                    <div className="method-header">
                        <FaUniversity className="method-icon" />
                        <h2>Bank Transfer</h2>
                    </div>
                    <div className="method-body">
                        <div className="bank-info">
                            <div className="info-row">
                                <span className="info-label">Account Name:</span>
                                <span className="info-value">Nepal Red Cross Society</span>
                            </div>
                            <div className="info-row">
                                <span className="info-label">Bank:</span>
                                <span className="info-value">Global IME Bank Ltd</span>
                            </div>
                            <div className="info-row">
                                <span className="info-label">Branch:</span>
                                <span className="info-value">New Baneswor, Kathmandu</span>
                            </div>
                            <div className="info-row">
                                <span className="info-label">Account Number:</span>
                                <span className="info-value">32101010000547</span>
                            </div>
                            <div className="info-row">
                                <span className="info-label">SWIFT Code:</span>
                                <span className="info-value">GLBBNPKA</span>
                            </div>
                        </div>
                        <div className="contact-info">
                            <p>For assistance, call: <strong>01-4671608 / 01-4270650</strong></p>
                        </div>
                    </div>
                </div>

                {/* Digital Wallets */}
                <div id="digital-wallets" className="method-card">
                    <div className="method-header">
                        <FaMobileAlt className="method-icon" />
                        <h2>Digital Wallets</h2>
                    </div>
                    <div className="method-body">
                        <div className="qr-grid">
                            <div className="qr-item">
                                <div className="qr-code">
                                    <FaQrcode className="qr-icon" />
                                </div>
                                <div className="qr-details">
                                    <h3>eSewa</h3>
                                    <p>ID: 9800000000</p>
                                </div>
                            </div>
                            <div className="qr-item">
                                <div className="qr-code">
                                    <FaQrcode className="qr-icon" />
                                </div>
                                <div className="qr-details">
                                    <h3>Khalti</h3>
                                    <p>ID: 9800000001</p>
                                </div>
                            </div>
                            <div className="qr-item">
                                <div className="qr-code">
                                    <FaQrcode className="qr-icon" />
                                </div>
                                <div className="qr-details">
                                    <h3>IME Pay</h3>
                                    <p>ID: 9800000002</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Cryptocurrency */}
                <div className="method-card">
                    <div className="method-header">
                        <FaBitcoin className="method-icon" />
                        <h2>Crypto Donations</h2>
                    </div>
                    <div className="method-body">
                        <div className="crypto-info">
                            <p>We accept cryptocurrency donations to support our mission:</p>
                            <div className="wallet-address">
                                <strong>BTC:</strong> 1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa
                            </div>
                            <div className="wallet-address">
                                <strong>ETH:</strong> 0x71C7656EC7ab88b098defB751B7401B5f6d8976F
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="testimonials">
                <div className="container">
                    <h2 className="section-title">Donor Stories</h2>
                    <div className="testimonial-cards">
                        <div className="testimonial-card">
                            <div className="testimonial-text">
                                "I donate regularly because I've seen firsthand how blood donations save lives when my brother needed emergency surgery."
                            </div>
                            <div className="testimonial-author">- Rajesh K., Monthly Donor</div>
                        </div>
                        <div className="testimonial-card">
                            <div className="testimonial-text">
                                "Our company organizes quarterly blood drives. It's rewarding to know we're making a difference in our community."
                            </div>
                            <div className="testimonial-author">- Sunita M., Corporate Partner</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="cta-section">
                <div className="container">
                    <FaHandHoldingHeart className="cta-icon" />
                    <h2>Your Support Makes All The Difference</h2>
                    <p>Join thousands of donors helping us save lives every day</p>
                    <div className="cta-buttons">
                        <a href="#bank-transfer" className="btn btn-primary btn-lg">Donate Now</a>
                        <a href="/contact" className="btn btn-outline-light btn-lg">Contact Us</a>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default DonateToUs;