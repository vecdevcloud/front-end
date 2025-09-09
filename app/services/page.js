"use client";

import { useState, useEffect, useRef } from "react";
import * as THREE from "three";

export default function Services() {
  const mountRef = useRef(null);
  const [selectedService, setSelectedService] = useState(null);
  const [activeTab, setActiveTab] = useState("web");
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

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
      new THREE.BoxGeometry(1, 1, 1),
      new THREE.SphereGeometry(0.7, 16, 16),
      new THREE.OctahedronGeometry(0.8),
      new THREE.TetrahedronGeometry(0.9),
    ];

    for (let i = 0; i < 15; i++) {
      const geometry =
        geometries[Math.floor(Math.random() * geometries.length)];
      const material = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        opacity: 0.08,
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
        shape.position.y += Math.sin(Date.now() * 0.001 + i) * 0.003;
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

  const services = [
    {
      id: "web-development",
      title: "Web Development",
      subtitle: "Modern web applications that scale",
      description:
        "Build powerful, responsive web applications using cutting-edge technologies like React, Next.js, and Node.js.",
      features: [
        "React & Next.js Development",
        "Progressive Web Apps (PWA)",
        "Real-time Applications",
        "API Development & Integration",
        "Database Design & Optimization",
        "Performance Optimization",
      ],
      technologies: [
        "React",
        "Next.js",
        "TypeScript",
        "Node.js",
        "PostgreSQL",
        "MongoDB",
      ],
      pricing: {
        basic: {
          name: "Starter",
          price: "$2,500",
          features: [
            "Landing Page",
            "Responsive Design",
            "Basic SEO",
            "Contact Forms",
          ],
        },
        premium: {
          name: "Professional",
          price: "$8,500",
          features: [
            "Full Web App",
            "Admin Panel",
            "Database Integration",
            "Payment Gateway",
            "Analytics",
          ],
        },
        enterprise: {
          name: "Enterprise",
          price: "Custom",
          features: [
            "Custom Development",
            "Scalable Architecture",
            "Third-party Integrations",
            "Ongoing Support",
          ],
        },
      },

      gradient: "from-blue-400 to-cyan-600",
      bgGradient: "from-blue-500/10 to-cyan-500/10",
    },
    {
      id: "mobile-development",
      title: "Mobile Development",
      subtitle: "Native & cross-platform apps",
      description:
        "Create stunning mobile applications for iOS and Android with native performance and seamless user experience.",
      features: [
        "React Native Development",
        "Native iOS & Android Apps",
        "Cross-platform Solutions",
        "App Store Optimization",
        "Push Notifications",
        "Offline Functionality",
      ],
      technologies: [
        "React Native",
        "Swift",
        "Kotlin",
        "Flutter",
        "Firebase",
        "Expo",
      ],
      pricing: {
        basic: {
          name: "MVP",
          price: "$5,000",
          features: [
            "Simple App",
            "2-3 Screens",
            "Basic Features",
            "App Store Submission",
          ],
        },
        premium: {
          name: "Full App",
          price: "$15,000",
          features: [
            "Complex App",
            "User Authentication",
            "Backend Integration",
            "Push Notifications",
            "Analytics",
          ],
        },
        enterprise: {
          name: "Enterprise",
          price: "Custom",
          features: [
            "Custom Development",
            "Advanced Features",
            "Multi-platform",
            "Maintenance & Support",
          ],
        },
      },

      gradient: "from-purple-400 to-pink-600",
      bgGradient: "from-purple-500/10 to-pink-500/10",
    },
    {
      id: "ui-ux-design",
      title: "UI/UX Design",
      subtitle: "Intuitive design that converts",
      description:
        "Design beautiful, user-friendly interfaces that provide exceptional user experiences and drive business results.",
      features: [
        "User Interface Design",
        "User Experience Research",
        "Prototyping & Wireframing",
        "Design Systems",
        "Usability Testing",
        "Brand Identity Design",
      ],
      technologies: [
        "Figma",
        "Adobe XD",
        "Sketch",
        "Framer",
        "Principle",
        "InVision",
      ],
      pricing: {
        basic: {
          name: "Design Only",
          price: "$1,500",
          features: [
            "UI Design",
            "Mobile Responsive",
            "Style Guide",
            "Assets Export",
          ],
        },
        premium: {
          name: "UX Research",
          price: "$4,500",
          features: [
            "User Research",
            "Wireframing",
            "Prototyping",
            "UI Design",
            "Testing",
          ],
        },
        enterprise: {
          name: "Complete Package",
          price: "Custom",
          features: [
            "Full UX Process",
            "Design System",
            "Brand Guidelines",
            "Ongoing Support",
          ],
        },
      },

      gradient: "from-emerald-400 to-teal-600",
      bgGradient: "from-emerald-500/10 to-teal-500/10",
    },
  ];

  const testimonials = [
    {
      text: "Their web development expertise transformed our business. The application they built is fast, scalable, and exactly what we needed.",
      author: "Michael Chen",
      role: "CTO at TechFlow",
      service: "Web Development",
      avatar: "MC",
    },
    {
      text: "The mobile app they developed exceeded our expectations. Great performance, beautiful design, and seamless user experience.",
      author: "Sarah Johnson",
      role: "Product Manager at InnovateCorp",
      service: "Mobile Development",
      avatar: "SJ",
    },
    {
      text: "Outstanding UI/UX design work. They understood our brand and created an interface that our users love.",
      author: "Emily Rodriguez",
      role: "Founder at StartupX",
      service: "UI/UX Design",
      avatar: "ER",
    },
  ];

  const processSteps = [
    {
      step: "01",
      title: "Discovery & Planning",
      description:
        "We analyze your requirements, define project scope, and create a detailed roadmap.",
    },
    {
      step: "02",
      title: "Design & Prototyping",
      description:
        "Create wireframes, mockups, and interactive prototypes for your approval.",
    },
    {
      step: "03",
      title: "Development & Testing",
      description:
        "Build your application using best practices with comprehensive testing throughout.",
    },
    {
      step: "04",
      title: "Launch & Support",
      description:
        "Deploy your project and provide ongoing maintenance and support.",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const ServiceModal = ({ service, onClose }) => {
    if (!service) return null;

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          onClick={onClose}
        />

        {/* Modal */}
        <div className="relative bg-black/90 backdrop-blur-md border border-white/20 rounded-3xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all duration-300"
          >
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center mb-4">
              <div>
                <h2 className="text-3xl font-bold text-white">
                  {service.title}
                </h2>
                <p className="text-gray-400 text-lg">{service.subtitle}</p>
              </div>
            </div>
            <p className="text-gray-300 text-lg leading-relaxed">
              {service.description}
            </p>
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold text-white mb-4">
                What's Included
              </h3>
              <div className="space-y-3">
                {service.features.map((feature, i) => (
                  <div key={i} className="flex items-center">
                    <div className="w-2 h-2 bg-white rounded-full mr-3"></div>
                    <span className="text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold text-white mb-4">
                Technologies
              </h3>
              <div className="flex flex-wrap gap-2">
                {service.technologies.map((tech, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-white/10 border border-white/20 rounded-full text-sm text-gray-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Pricing */}
          <div>
            <h3 className="text-xl font-bold text-white mb-6">
              Pricing Options
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              {Object.entries(service.pricing).map(([key, plan]) => (
                <div
                  key={key}
                  className={`p-6 rounded-2xl border transition-all duration-300 hover:scale-105 ${
                    key === "premium"
                      ? "bg-white/10 border-white/30 shadow-lg shadow-white/10"
                      : "bg-white/5 border-white/20 hover:bg-white/10"
                  }`}
                >
                  <div className="mb-4">
                    <h4 className="text-lg font-bold text-white">
                      {plan.name}
                    </h4>
                    <div className="text-2xl font-bold text-white mt-2">
                      {plan.price}
                    </div>
                  </div>
                  <ul className="space-y-2">
                    {plan.features.map((feature, i) => (
                      <li
                        key={i}
                        className="text-sm text-gray-300 flex items-center"
                      >
                        <div className="w-1 h-1 bg-gray-400 rounded-full mr-2"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <button className="w-full mt-6 px-4 py-2 bg-white text-black rounded-lg font-medium hover:bg-gray-200 transition-all duration-300">
                    Get Started
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* 3D Background */}
      <div ref={mountRef} className="fixed inset-0 pointer-events-none z-0" />

      {/* Hero Section with Interactive Graph */}
      <section className="relative z-10 min-h-screen flex items-center justify-center px-6">
        <div className="max-w-7xl mx-auto mt-24 xl:mt-18">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div>
                <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-b from-white via-gray-200 to-gray-500 bg-clip-text text-transparent">
                  Our
                  <br />
                  <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                    Services
                  </span>
                </h1>
                <p className="text-xl text-gray-400 leading-relaxed">
                  We specialize in creating digital experiences that drive
                  business growth. From web applications to mobile apps, we
                  deliver solutions that scale.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-6">
                {[
                  { number: "200+", label: "Projects Completed" },
                  { number: "98%", label: "Client Satisfaction" },
                  { number: "5+", label: "Years Experience" },
                ].map((stat, i) => (
                  <div key={i} className="text-center group">
                    <div className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors duration-300">
                      {stat.number}
                    </div>
                    <div className="text-sm text-gray-500 mt-1">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Graph Visualization */}
            <div className="relative">
              <div className="bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-sm border border-white/10 rounded-3xl p-8 overflow-hidden">
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                  <div>
                    <h3 className="text-xl font-bold text-white">
                      Service Portfolio
                    </h3>
                    <p className="text-sm text-gray-400">
                      Success metrics & capabilities
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-xs text-gray-300">Live Data</span>
                  </div>
                </div>

                {/* Interactive Bar Chart */}
                <div className="relative h-64 flex items-end justify-center space-x-4">
                  {[
                    {
                      name: "Web Dev",
                      value: 85,
                      color: "from-blue-400 to-blue-600",
                      projects: 120,
                    },
                    {
                      name: "Mobile",
                      value: 75,
                      color: "from-purple-400 to-purple-600",
                      projects: 65,
                    },
                    {
                      name: "UI/UX",
                      value: 90,
                      color: "from-emerald-400 to-emerald-600",
                      projects: 95,
                    },
                  ].map((service, i) => (
                    <div
                      key={i}
                      className="flex flex-col items-center group relative"
                    >
                      {/* Bar */}
                      <div className="relative">
                        <div
                          className={`w-16 bg-gradient-to-t ${service.color} rounded-t-lg transition-all duration-700 hover:scale-110 cursor-pointer shadow-lg`}
                          style={{
                            height: `${service.value * 2.5}px`,
                            animationDelay: `${i * 0.3}s`,
                          }}
                        >
                          {/* Shine effect */}
                          <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/20 to-white/10 rounded-t-lg"></div>

                          {/* Value label */}
                          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/80 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                            {service.projects} projects
                          </div>
                        </div>

                        {/* Animated particles */}
                        <div className="absolute inset-0 overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          {[...Array(3)].map((_, j) => (
                            <div
                              key={j}
                              className="absolute w-1 h-1 bg-white/60 rounded-full animate-bounce"
                              style={{
                                left: `${20 + j * 20}%`,
                                bottom: `${20 + j * 30}%`,
                                animationDelay: `${j * 0.2}s`,
                                animationDuration: "2s",
                              }}
                            />
                          ))}
                        </div>
                      </div>

                      {/* Label */}
                      <div className="text-center mt-4">
                        <div className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors duration-300">
                          {service.name}
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          {service.value}% Success
                        </div>
                      </div>

                      {/* Glow effect */}
                      <div
                        className={`absolute bottom-16 w-16 h-4 bg-gradient-to-t ${service.color} opacity-30 blur-lg rounded-full`}
                      ></div>
                    </div>
                  ))}
                </div>

                {/* Bottom Stats */}
                <div className="grid grid-cols-3 gap-4 mt-8 pt-6 border-t border-white/10">
                  {[
                    { label: "Avg. Timeline", value: "6-12 weeks" },
                    { label: "Client Rating", value: "4.9/5" },
                    { label: "Success Rate", value: "98%" },
                  ].map((stat, i) => (
                    <div key={i} className="text-center group">
                      <div className="text-sm font-bold text-white group-hover:text-purple-400 transition-colors duration-300">
                        {stat.value}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Floating Data Points */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  {[...Array(8)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-2 h-2 bg-white/20 rounded-full animate-pulse"
                      style={{
                        left: `${15 + i * 10}%`,
                        top: `${20 + (i % 3) * 25}%`,
                        animationDelay: `${i * 0.5}s`,
                        animationDuration: `${2 + i * 0.3}s`,
                      }}
                    />
                  ))}
                </div>

                {/* Corner indicators */}
                <div className="absolute top-4 right-4 text-xs text-gray-400 font-mono">
                  v2.1
                </div>
                <div className="absolute bottom-4 left-4 text-xs text-gray-400 font-mono">
                  REALTIME
                </div>

                {/* Background glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-emerald-500/5 rounded-3xl"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="relative z-10 py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold mb-4">
              What We{" "}
              <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                Build
              </span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Comprehensive digital solutions tailored to your business needs
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {services.map((service, i) => (
              <div
                key={i}
                className="group relative cursor-pointer"
                onClick={() => setSelectedService(service)}
              >
                <div
                  className={`bg-gradient-to-br ${service.bgGradient} backdrop-blur-sm border border-white/10 rounded-3xl p-8 hover:border-white/20 transition-all duration-500 hover:scale-105 relative overflow-hidden`}
                >
                  {/* Background Pattern */}
                  <div className="absolute inset-0 opacity-5">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent"></div>
                  </div>

                  {/* Content */}
                  <div className="relative">
                    <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-white transition-colors duration-300">
                      {service.title}
                    </h3>

                    <p className="text-gray-400 mb-6 leading-relaxed">
                      {service.subtitle}
                    </p>

                    <div className="space-y-2 mb-8">
                      {service.features.slice(0, 3).map((feature, j) => (
                        <div
                          key={j}
                          className="flex items-center text-sm text-gray-300"
                        >
                          <div className="w-1.5 h-1.5 bg-white rounded-full mr-3"></div>
                          {feature}
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-500">
                        From {service.pricing.basic.price}
                      </div>
                      <div className="flex items-center text-white group-hover:text-blue-400 transition-colors duration-300">
                        <span className="text-sm font-medium mr-2">
                          Learn More
                        </span>
                        <svg
                          className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Hover Effects */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="relative z-10 py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold mb-4">
              Our{" "}
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Process
              </span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              A proven methodology that ensures successful project delivery
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, i) => (
              <div key={i} className="group relative">
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 hover:border-white/20 transition-all duration-300">
                  <div className="text-3xl font-bold text-white/20 mb-4">
                    {step.step}
                  </div>

                  <h3 className="text-xl font-bold mb-4 text-white">
                    {step.title}
                  </h3>

                  <p className="text-gray-400 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Connection Line */}
                {i < processSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-white/20 to-transparent"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technologies Slider */}
      <section className="relative z-10 py-24 overflow-hidden">
        <div className="text-center mb-16 px-6">
          <h2 className="text-4xl md:text-6xl font-bold mb-4">
            Technologies We{" "}
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Master
            </span>
          </h2>
        </div>

        {/* Infinite Scrolling Container */}
        <div className="relative">
          <div className="flex items-center animate-scroll-right">
            {[
              "React",
              "Next.js",
              "Vue.js",
              "Angular",
              "TypeScript",
              "JavaScript",
              "Node.js",
              "Python",
              "Swift",
              "Kotlin",
              "Flutter",
              "React Native",
              "PostgreSQL",
              "MongoDB",
              "Firebase",
              "AWS",
              "Docker",
              "Kubernetes",
            ]
              .concat([
                "React",
                "Next.js",
                "Vue.js",
                "Angular",
                "TypeScript",
                "JavaScript",
                "Node.js",
                "Python",
                "Swift",
                "Kotlin",
                "Flutter",
                "React Native",
                "PostgreSQL",
                "MongoDB",
                "Firebase",
                "AWS",
                "Docker",
                "Kubernetes",
              ])
              .map((tech, i) => (
                <div
                  key={i}
                  className="flex-none mx-4 px-8 py-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl hover:bg-white/10 hover:border-white/20 transition-all duration-300 group cursor-pointer"
                  style={{ minWidth: "200px" }}
                >
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors duration-300 mb-2">
                      {tech}
                    </div>
                    <div className="w-full h-1 bg-gradient-to-r from-transparent via-white/30 to-transparent rounded-full group-hover:via-blue-400 transition-all duration-300"></div>
                  </div>
                </div>
              ))}
          </div>

          {/* Gradient Overlays */}
          <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-black to-transparent pointer-events-none z-10"></div>
          <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-black to-transparent pointer-events-none z-10"></div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="relative z-10 py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold mb-4">
              Client{" "}
              <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                Success
              </span>
            </h2>
          </div>

          <div className="relative">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-12 text-center">
              <div className="mb-8">
                <p className="text-xl md:text-2xl text-gray-300 leading-relaxed italic">
                  "{testimonials[currentTestimonial].text}"
                </p>
              </div>

              <div className="flex items-center justify-center space-x-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full flex items-center justify-center text-white font-bold">
                  {testimonials[currentTestimonial].avatar}
                </div>
                <div className="text-left">
                  <div className="font-semibold text-white">
                    {testimonials[currentTestimonial].author}
                  </div>
                  <div className="text-gray-400 text-sm">
                    {testimonials[currentTestimonial].role}
                  </div>
                </div>
              </div>

              <div className="text-sm text-blue-400">
                {testimonials[currentTestimonial].service}
              </div>
            </div>

            {/* Testimonial Dots */}
            <div className="flex justify-center mt-8 space-x-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  className={`w-2 h-2 rounded-full transition-all duration-300 cursor-pointer ${
                    i === currentTestimonial ? "bg-white w-8" : "bg-white/30"
                  }`}
                  onClick={() => setCurrentTestimonial(i)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 backdrop-blur-sm border border-white/10 rounded-3xl p-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Build Something
              <br />
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Amazing?
              </span>
            </h2>
            <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
              Let's discuss your project and turn your ideas into reality. Get a
              free consultation and project estimate today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-12 py-4 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl">
                Start Your Project
              </button>
              <button className="px-12 py-4 border border-white/20 text-white font-semibold rounded-lg hover:bg-white/5 transition-all duration-300 backdrop-blur-sm">
                View Portfolio
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Service Modal */}
      <ServiceModal
        service={selectedService}
        onClose={() => setSelectedService(null)}
      />

      {/* Custom CSS */}
      <style jsx>{`
        @keyframes scroll-right {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0%);
          }
        }

        .animate-scroll-right {
          animation: scroll-right 60s linear infinite;
        }
      `}</style>
    </div>
  );
}
