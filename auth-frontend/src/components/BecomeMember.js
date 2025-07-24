import React, { useState } from 'react';
import './BecomeMember.css';
import { FaHeart, FaCheck, FaUser, FaEnvelope, FaPhone, FaLock, FaCalendarAlt, FaWeight, FaQuoteLeft } from 'react-icons/fa';

const BecomeMember = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    bloodType: '',
    location: '',
    termsAccepted: false
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    // Here you would typically send data to your backend
    console.log('Form submitted:', formData);
  };

  const benefits = [
    {
      icon: <FaHeart className="benefit-icon" />,
      title: "Save Lives",
      description: "Directly contribute to saving up to 3 lives with each donation"
    },
    {
      icon: <FaCheck className="benefit-icon" />,
      title: "Health Checkups",
      description: "Free regular health screenings and blood tests"
    },
    {
      icon: <FaUser className="benefit-icon" />,
      title: "Priority Service",
      description: "Expedited service when you need blood in emergencies"
    }
  ];

  const testimonials = [
    {
      quote: "Joining as a donor gave me a sense of purpose knowing I'm helping others in need.",
      author: "Rahul Sharma, Regular Donor"
    },
    {
      quote: "The health benefits I've received from regular donations are an unexpected bonus!",
      author: "Priya Patel, Member since 2020"
    }
  ];

  const faqs = [
    {
      question: "How often can I donate blood?",
      answer: "You can donate whole blood every 56 days (approximately every 2 months)."
    },
    {
      question: "Is there an age requirement?",
      answer: "Donors must be between 18-65 years old with proper identification."
    }
  ];

  return (
    <div className="become-member-container">
      {/* Hero Section */}
      <section className="member-hero">
        <div className="hero-content">
          <h1>Become a Member</h1>
          <p className="hero-description">
            Join our life-saving community of blood donors and help ensure no patient goes without 
            blood when they need it most. Your donation can save up to three lives.
          </p>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="benefits-section">
        <h2>Why Become a Member?</h2>
        <div className="benefits-grid">
          {benefits.map((benefit, index) => (
            <div key={index} className="benefit-card">
              <div className="benefit-icon-container">
                {benefit.icon}
              </div>
              <h3>{benefit.title}</h3>
              <p>{benefit.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Registration Form */}
      <section className="registration-section">
        <div className="form-container">
          <h2>Membership Registration</h2>
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="member-form">
              <div className="form-group">
                <label>Full Name</label>
                <div className="input-with-icon">
                  <FaUser className="input-icon" />
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Email</label>
                <div className="input-with-icon">
                  <FaEnvelope className="input-icon" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Phone Number</label>
                <div className="input-with-icon">
                  <FaPhone className="input-icon" />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Blood Type</label>
                <select
                  name="bloodType"
                  value={formData.bloodType}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Blood Type</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                </select>
              </div>

              <div className="form-group">
                <label>Location/City</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="terms-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    name="termsAccepted"
                    checked={formData.termsAccepted}
                    onChange={handleChange}
                    required
                  />
                  I agree to the Terms & Conditions and Privacy Policy
                </label>
              </div>

              <button type="submit" className="join-button">
                Join Now
              </button>
            </form>
          ) : (
            <div className="success-message">
              <FaHeart className="success-icon" />
              <h3>Thank You for Joining!</h3>
              <p>Welcome to our community of life-savers. We'll contact you soon with more details.</p>
              <button className="back-button" onClick={() => setIsSubmitted(false)}>
                Back to Form
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <h2>What Our Members Say</h2>
        <div className="testimonials-grid">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="testimonial-card">
              <FaQuoteLeft className="quote-icon" />
              <p className="testimonial-text">"{testimonial.quote}"</p>
              <p className="testimonial-author">— {testimonial.author}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-section">
        <h2>Frequently Asked Questions</h2>
        <div className="faq-list">
          {faqs.map((faq, index) => (
            <div key={index} className="faq-item">
              <h3 className="faq-question">{faq.question}</h3>
              <p className="faq-answer">{faq.answer}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default BecomeMember;