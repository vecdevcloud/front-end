"use client";

import { useState, useEffect, useRef } from "react";
import * as THREE from "three";

export default function Contact() {
  const mountRef = useRef(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    projectType: "",
    budget: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // 3D Background Setup
  useEffect(() => {
    if (!mountRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    mountRef.current.appendChild(renderer.domElement);

    // Create floating geometric shapes
    const shapes = [];
    const geometries = [
      new THREE.BoxGeometry(0.8, 0.8, 0.8),
      new THREE.SphereGeometry(0.5, 16, 16),
      new THREE.OctahedronGeometry(0.6),
      new THREE.TetrahedronGeometry(0.7),
      new THREE.ConeGeometry(0.4, 1, 8),
    ];

    for (let i = 0; i < 15; i++) {
      const geometry =
        geometries[Math.floor(Math.random() * geometries.length)];
      const material = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        opacity: 0.06 + Math.random() * 0.04,
        transparent: true,
        wireframe: true,
      });

      const shape = new THREE.Mesh(geometry, material);
      shape.position.set(
        (Math.random() - 0.5) * 25,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 15
      );
      shape.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );

      shapes.push(shape);
      scene.add(shape);
    }

    camera.position.z = 10;

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      shapes.forEach((shape, i) => {
        shape.rotation.x += 0.003 + i * 0.0008;
        shape.rotation.y += 0.002 + i * 0.0008;
        shape.rotation.z += 0.001 + i * 0.0005;
        shape.position.y += Math.sin(Date.now() * 0.001 + i) * 0.002;
        shape.position.x += Math.cos(Date.now() * 0.0008 + i) * 0.001;
      });

      renderer.render(scene, camera);
    };
    animate();

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
    };
  }, []);

  const contactMethods = [
    {

      title: "Email",
      value: "meawpain12@gmail.com",
      description: "Drop us a line anytime",
      href: "mailto:meawpain12@gmail.com",
    },
    {

      title: "Phone",
      value: "+66 92 678 7438",
      description: "Mon-Fri 9am-6pm EST",
      href: "tel:+66926787438",
    },
    {

      title: "Live Chat",
      value: "Available 24/7",
      description: "Get instant support",
      href: "#",
    },
    {

      title: "Office",
      value: "Chaing Mai, TH",
      description: "Visit us in person",
      href: "#",
    },
  ];

  const projectTypes = [
    "Web Application",
    "Mobile App",
    "E-commerce Platform",
    "Enterprise Software",
    "AI/ML Integration",
    "Blockchain Solution",
    "Other",
  ];

  const budgetRanges = [
    "Less than $10K",
    "$10K - $25K",
    "$25K - $50K",
    "$50K - $100K",
    "$100K+",
    "Let's discuss",
  ];

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (!formData.projectType) newErrors.projectType = "Please select a project type";
    if (!formData.message.trim()) newErrors.message = "Message is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setSuccess(true);
    setLoading(false);
    
    // Reset form after success
    setTimeout(() => {
      setSuccess(false);
      setFormData({
        name: "",
        email: "",
        company: "",
        projectType: "",
        budget: "",
        message: "",
      });
    }, 3000);
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* 3D Background */}
      <div
        ref={mountRef}
        className="fixed inset-0 pointer-events-none z-0"
        style={{ zIndex: 0 }}
      />

      {/* Hero Section */}
      <section className="relative z-10 pt-32 pb-16 px-6">
        <div className="max-w-7xl mx-auto text-center">
          {/* Floating Badge */}
          <div className="inline-flex items-center px-6 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full mb-8 group hover:bg-white/10 transition-all duration-300">
            <div className="w-2 h-2 bg-green-400 rounded-full mr-3 animate-pulse"></div>
            <span className="text-sm text-gray-300 group-hover:text-white transition-colors duration-300">
              Let's Build Something Amazing
            </span>
          </div>

          <div className="mb-12">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-b from-white via-gray-200 to-gray-500 bg-clip-text text-transparent">
              Get In{" "}
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Touch
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 max-w-4xl mx-auto leading-relaxed">
              Ready to transform your ideas into reality? Let's start a conversation about your next project.
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto mb-16">
            {[
              { number: "24h", label: "Response Time" },
              { number: "100+", label: "Projects Delivered" },
              { number: "98%", label: "Client Satisfaction" },
            ].map((stat, i) => (
              <div key={i} className="text-center group">
                <div className="text-2xl md:text-3xl font-bold text-white group-hover:text-blue-400 transition-colors duration-300">
                  {stat.number}
                </div>
                <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="relative z-10 py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {contactMethods.map((method, i) => (
              <a
                key={i}
                href={method.href}
                className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-white/20 transition-all duration-300 transform hover:scale-105"
              >
                <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors duration-300">
                  {method.title}
                </h3>
                <p className="text-white/90 font-medium mb-1">{method.value}</p>
                <p className="text-gray-400 text-sm">{method.description}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="relative z-10 py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Left Column - Contact Form */}
            <div>
              <div className="mb-8">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Tell Us About Your{" "}
                  <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    Project
                  </span>
                </h2>
                <p className="text-gray-400 text-lg">
                  Fill out the form below and we'll get back to you within 24 hours.
                </p>
              </div>

              {success ? (
                <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-3xl p-12 text-center">
                  <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">Message Sent!</h3>
                  <p className="text-gray-300">
                    Thank you for reaching out. We'll get back to you soon.
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition-all duration-300">
                    {/* Name & Email */}
                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) => handleInputChange("name", e.target.value)}
                          className={`w-full px-4 py-3 bg-black/50 border rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-white/20 focus:border-white/40 transition-all duration-300 ${
                            errors.name ? "border-red-500 ring-2 ring-red-500/20" : "border-white/20"
                          }`}
                          placeholder="John Doe"
                        />
                        {errors.name && (
                          <p className="mt-1 text-sm text-red-400">{errors.name}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          className={`w-full px-4 py-3 bg-black/50 border rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-white/20 focus:border-white/40 transition-all duration-300 ${
                            errors.email ? "border-red-500 ring-2 ring-red-500/20" : "border-white/20"
                          }`}
                          placeholder="john@company.com"
                        />
                        {errors.email && (
                          <p className="mt-1 text-sm text-red-400">{errors.email}</p>
                        )}
                      </div>
                    </div>

                    {/* Company */}
                    <div className="mb-6">
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Company
                      </label>
                      <input
                        type="text"
                        value={formData.company}
                        onChange={(e) => handleInputChange("company", e.target.value)}
                        className="w-full px-4 py-3 bg-black/50 border border-white/20 rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-white/20 focus:border-white/40 transition-all duration-300"
                        placeholder="Your Company"
                      />
                    </div>

                    {/* Project Type & Budget */}
                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Project Type *
                        </label>
                        <select
                          value={formData.projectType}
                          onChange={(e) => handleInputChange("projectType", e.target.value)}
                          className={`w-full px-4 py-3 bg-black/50 border rounded-xl text-white focus:ring-2 focus:ring-white/20 focus:border-white/40 transition-all duration-300 ${
                            errors.projectType ? "border-red-500 ring-2 ring-red-500/20" : "border-white/20"
                          }`}
                        >
                          <option value="">Select project type</option>
                          {projectTypes.map((type) => (
                            <option key={type} value={type}>
                              {type}
                            </option>
                          ))}
                        </select>
                        {errors.projectType && (
                          <p className="mt-1 text-sm text-red-400">{errors.projectType}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Budget Range
                        </label>
                        <select
                          value={formData.budget}
                          onChange={(e) => handleInputChange("budget", e.target.value)}
                          className="w-full px-4 py-3 bg-black/50 border border-white/20 rounded-xl text-white focus:ring-2 focus:ring-white/20 focus:border-white/40 transition-all duration-300"
                        >
                          <option value="">Select budget range</option>
                          {budgetRanges.map((range) => (
                            <option key={range} value={range}>
                              {range}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Message */}
                    <div className="mb-6">
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Project Details *
                      </label>
                      <textarea
                        value={formData.message}
                        onChange={(e) => handleInputChange("message", e.target.value)}
                        rows={6}
                        className={`w-full px-4 py-3 bg-black/50 border rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-white/20 focus:border-white/40 transition-all duration-300 resize-none ${
                          errors.message ? "border-red-500 ring-2 ring-red-500/20" : "border-white/20"
                        }`}
                        placeholder="Tell us about your project goals, requirements, timeline, and any specific features you need..."
                      />
                      {errors.message && (
                        <p className="mt-1 text-sm text-red-400">{errors.message}</p>
                      )}
                    </div>

                    {/* Submit Button */}
                    <button
                      onClick={handleSubmit}
                      disabled={loading}
                      className="w-full px-8 py-4 bg-white text-black font-semibold rounded-xl hover:bg-gray-200 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                    >
                      {loading ? (
                        <div className="flex items-center justify-center">
                          <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin mr-2"></div>
                          Sending Message...
                        </div>
                      ) : (
                        "Send Message"
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Right Column - Additional Info */}
            <div className="space-y-8">
              {/* Why Choose Us */}
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition-all duration-300">
                <h3 className="text-2xl font-bold mb-6 text-white">
                  Why Work With{" "}
                  <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    Us?
                  </span>
                </h3>
                <div className="space-y-4">
                  {[
                    {
                      title: "Expert Team",
                      description: "Experienced developers and designers with proven track records",
                    },
                    {
                      title: "Agile Process",
                      description: "Flexible development approach with regular updates and feedback",
                    },
                    {
                      title: "Quality Assurance",
                      description: "Rigorous testing and quality control for bug-free delivery",
                    },
                    {
                      title: "Ongoing Support",
                      description: "Continued maintenance and support after project completion",
                    },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start space-x-4 group">
                      <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 group-hover:bg-white transition-colors duration-300"></div>
                      <div>
                        <h4 className="font-semibold text-white mb-1 group-hover:text-blue-400 transition-colors duration-300">
                          {item.title}
                        </h4>
                        <p className="text-gray-400 text-sm">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* FAQ Section */}
              <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 rounded-3xl p-8">
                <h3 className="text-2xl font-bold mb-6 text-white">
                  Frequently Asked{" "}
                  <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                    Questions
                  </span>
                </h3>
                <div className="space-y-4">
                  {[
                    {
                      q: "How long does a typical project take?",
                      a: "Project timelines vary based on complexity, typically 4-16 weeks.",
                    },
                    {
                      q: "Do you provide ongoing maintenance?",
                      a: "Yes, we offer comprehensive maintenance and support packages.",
                    },
                    {
                      q: "Can you work with existing teams?",
                      a: "Absolutely! We integrate seamlessly with your existing workflows.",
                    },
                  ].map((faq, i) => (
                    <details key={i} className="group">
                      <summary className="cursor-pointer text-white font-medium py-2 hover:text-blue-400 transition-colors duration-300">
                        {faq.q}
                      </summary>
                      <p className="text-gray-400 text-sm mt-2 pl-4">{faq.a}</p>
                    </details>
                  ))}
                </div>
              </div>

              {/* Social Proof */}
              <div className="text-center">
                <p className="text-gray-500 mb-4">Trusted by startups to enterprises</p>
                <div className="flex justify-center items-center space-x-8 opacity-40">
                  {["GOOGLE", "META", "APPLE", "TESLA"].map((company, i) => (
                    <div key={i} className="text-white font-bold text-sm tracking-wider">
                      {company}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="relative z-10 py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 backdrop-blur-sm border border-white/10 rounded-3xl p-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Start Building?
            </h2>
            <p className="text-gray-400 text-lg mb-6">
              Join hundreds of satisfied clients who have transformed their ideas into successful products.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-3 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition-all duration-300 transform hover:scale-105">
                Schedule a Call
              </button>
              <button className="px-8 py-3 border border-white/20 text-white font-semibold rounded-lg hover:bg-white/5 transition-all duration-300">
                View Portfolio
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Custom CSS */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        details > summary::-webkit-details-marker {
          display: none;
        }
        
        details > summary::before {
          content: '+';
          font-weight: bold;
          margin-right: 0.5rem;
          transition: transform 0.3s ease;
        }
        
        details[open] > summary::before {
          transform: rotate(45deg);
        }
      `}</style>
    </div>
  );
}