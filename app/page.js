"use client";

import { useState, useEffect, useRef } from "react";
import * as THREE from "three";
import Link from "next/link";

export default function Home() {
  const mountRef = useRef(null);
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

    for (let i = 0; i < 12; i++) {
      const geometry =
        geometries[Math.floor(Math.random() * geometries.length)];
      const material = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        opacity: 0.1,
        transparent: true,
        wireframe: true,
      });

      const shape = new THREE.Mesh(geometry, material);
      shape.position.set(
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 15,
        (Math.random() - 0.5) * 10
      );
      shape.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );

      shapes.push(shape);
      scene.add(shape);
    }

    camera.position.z = 8;

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      shapes.forEach((shape, i) => {
        shape.rotation.x += 0.005 + i * 0.001;
        shape.rotation.y += 0.003 + i * 0.001;
        shape.position.y += Math.sin(Date.now() * 0.001 + i) * 0.002;
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
      title: "Web Applications",
      description: "Custom web apps built with cutting-edge technologies",
      features: ["React/Next.js", "Node.js Backend", "Real-time Features"],
    },
    {
      title: "Websites",
      description: "Modern, responsive websites that convert visitors",
      features: ["SEO Optimized", "Mobile First", "Lightning Fast"],
    },
    {
      title: "Mobile Apps",
      description: "Native and cross-platform mobile applications",
      features: ["iOS & Android", "React Native", "App Store Ready"],
    },
  ];

  const collaborators = [
    {
      name: "Google",
      logo: "https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg",
    },
    {
      name: "Microsoft",
      logo: "https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg",
    },
    {
      name: "Meta",
      logo: "https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg",
    },
    {
      name: "Apple",
      logo: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg",
    },
    {
      name: "Netflix",
      logo: "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg",
    },
    {
      name: "Amazon",
      logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
    },
    {
      name: "Tesla",
      logo: "https://upload.wikimedia.org/wikipedia/commons/e/e8/Tesla_logo.png",
    },
    {
      name: "Spotify",
      logo: "https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg",
    },
  ];

  const testimonials = [
    {
      text: "They delivered exactly what we envisioned. The attention to detail and technical expertise is outstanding.",
      author: "Sarah Chen",
      role: "CTO at TechFlow",
      avatar: "SC",
    },
    {
      text: "Working with them was seamless. They understood our requirements and delivered beyond expectations.",
      author: "Marcus Johnson",
      role: "Product Manager at InnovateCorp",
      avatar: "MJ",
    },
    {
      text: "The quality of work and professionalism is unmatched. Highly recommend for any development project.",
      author: "Emily Rodriguez",
      role: "Founder at StartupX",
      avatar: "ER",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* 3D Background */}
      <div
        ref={mountRef}
        className="fixed inset-0 pointer-events-none z-0"
        style={{ zIndex: 0 }}
      />

      {/* Hero Section */}
      <section className="relative z-10 min-h-screen flex items-center justify-center px-6 mt-24 xl:mt-18">
        <div className="max-w-6xl mx-auto text-center">
          {/* Available Now Badge */}
          <div className="inline-flex items-center px-4 py-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full mb-8 group hover:bg-white/10 transition-all duration-300">
            <div className="w-2 h-2 bg-green-400 rounded-full mr-3 animate-pulse"></div>
            <span className="text-sm text-gray-300 group-hover:text-white transition-colors duration-300">
              Available Now
            </span>
          </div>

          <div className="mb-8">
            <h2 className="text-6xl md:text-5xl font-bold mb-6 bg-gradient-to-b from-white via-gray-200 to-gray-500 bg-clip-text text-transparent">
              การเผยแพร่ซอฟต์แวร์บนระบบคลาวด์ 
              <br />
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Software Deployment on Cloud
              </span>
            </h2>
            <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Automated Software Deployment on Cloud with GitHub Actions
            </p>
            <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            (CI/CD)
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link
              href="/services"
              className="px-8 py-4 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
            >
              Start Your Project
            </Link>
            <a
              href="https://jirapatpapai.netlify.app"
              className="inline-block px-8 py-4 border border-white/20 text-white font-semibold rounded-lg hover:bg-white/5 transition-all duration-300 backdrop-blur-sm"
            >
              View Our Work
            </a>
          </div>

          {/* Floating Stats */}
          <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
            {[
              { number: "100+", label: "Projects Delivered" },
              { number: "50+", label: "Happy Clients" },
              { number: "99%", label: "Success Rate" },
            ].map((stat, i) => (
              <div key={i} className="text-center group">
                <div className="text-3xl font-bold text-white group-hover:text-blue-400 transition-colors duration-300">
                  {stat.number}
                </div>
                <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Advanced Solutions Section */}
      <section className="relative z-10 py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div className="space-y-12">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                  Enterprise-Grade
                  <br />
                  <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    Architecture
                  </span>
                </h2>
              </div>

              <div className="space-y-8">
                <div className="group">
                  <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-blue-400 transition-colors duration-300">
                    AI-Powered Development
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    Leverage cutting-edge AI models and machine learning to
                    build intelligent applications that adapt and scale with
                    your business needs.
                  </p>
                </div>

                <div className="group">
                  <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-purple-400 transition-colors duration-300">
                    Cloud-Native Solutions
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    Deploy scalable applications on modern cloud infrastructure
                    with microservices architecture and containerized
                    deployments.
                  </p>
                </div>

                <div className="group">
                  <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-pink-400 transition-colors duration-300">
                    Data Integration Engine
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    Seamlessly integrate your enterprise data to unlock insights
                    and drive strategic differentiation across your
                    organization.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Visual - Updated 3D Platform */}
            <div className="relative">
              <div className="relative bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-sm border border-white/10 rounded-3xl p-8 overflow-hidden">
                {/* Enhanced 3D Platform Visualization */}
                <div
                  className="relative h-96 flex items-end justify-center"
                  style={{ perspective: "1000px" }}
                >
                  {/* Platform Base */}
                  <div
                    className="absolute bottom-0 w-full h-20 bg-gradient-to-t from-gray-800 to-gray-700 rounded-lg shadow-2xl border border-white/20"
                    style={{ transform: "rotateX(15deg)" }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-lg"></div>
                    <div className="absolute bottom-3 left-6 text-xs text-gray-300 font-mono tracking-wider">
                      SCALE DATA ENGINE
                    </div>
                    <div className="absolute top-2 right-4 text-xs text-gray-400 font-mono">
                      v2.0
                    </div>
                  </div>

                  {/* Technology Stack Pillars */}
                  <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 flex gap-3 items-end">
                    {[
                      {
                        name: "MARKETING",
                        height: "h-24",
                        color: "from-blue-400 to-blue-600",
                        label: "MARKETING",
                      },
                      {
                        name: "FINANCIAL SERVICES",
                        height: "h-32",
                        color: "from-cyan-400 to-cyan-600",
                        label: "FINANCIAL SERVICES",
                      },
                      {
                        name: "INSURANCE",
                        height: "h-40",
                        color: "from-purple-400 to-purple-600",
                        label: "INSURANCE",
                      },
                      {
                        name: "RETAIL",
                        height: "h-48",
                        color: "from-pink-400 to-pink-600",
                        label: "RETAIL",
                      },
                      {
                        name: "E-COMMERCE",
                        height: "h-36",
                        color: "from-green-400 to-green-600",
                        label: "E-COMMERCE",
                      },
                      {
                        name: "LEGAL",
                        height: "h-44",
                        color: "from-yellow-400 to-yellow-600",
                        label: "LEGAL",
                      },
                    ].map((pillar, i) => (
                      <div key={i} className="relative group">
                        <div
                          className={`w-10 ${pillar.height} bg-gradient-to-t ${pillar.color} rounded-t-lg transition-all duration-500 hover:scale-110 hover:-translate-y-2 shadow-lg border border-white/20`}
                          style={{
                            transform: `rotateX(-15deg) rotateY(${
                              i * 2 - 6
                            }deg)`,
                            transformOrigin: "bottom center",
                            animationDelay: `${i * 0.2}s`,
                          }}
                        >
                          {/* Vertical Text Label */}
                          <div
                            className="absolute inset-0 flex items-center justify-center text-xs font-bold text-white/90 transform -rotate-90 origin-center"
                            style={{
                              writingMode: "vertical-rl",
                              textOrientation: "mixed",
                            }}
                          >
                            {pillar.label}
                          </div>
                          <div className="absolute inset-0 bg-gradient-to-t from-white/10 to-transparent rounded-t-lg"></div>
                        </div>

                        {/* Hover Tooltip */}
                        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/80 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                          {pillar.name}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Corner Labels */}
                  <div className="absolute top-4 left-4 text-xs text-gray-400 font-mono">
                    GENERATIVE AI
                  </div>
                  <div className="absolute top-4 right-4 text-xs text-gray-400 font-mono">
                    FOUNDATION MODELS
                  </div>

                  {/* Performance Indicator */}
                  <div className="absolute top-8 right-8 flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-xs text-gray-300">1.00</span>
                  </div>
                </div>

                {/* Enhanced Floating Particles */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  {[...Array(12)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-1 h-1 bg-white/30 rounded-full"
                      style={{
                        left: `${10 + i * 7}%`,
                        top: `${15 + (i % 4) * 20}%`,
                        animation: `float ${3 + i * 0.5}s ease-in-out infinite`,
                        animationDelay: `${i * 0.3}s`,
                      }}
                    />
                  ))}
                </div>

                {/* Enhanced Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-t from-blue-500/5 via-purple-500/5 to-pink-500/5 rounded-3xl"></div>
                <div className="absolute inset-0 bg-gradient-radial from-white/5 via-transparent to-transparent rounded-3xl"></div>
              </div>
            </div>
          </div>
        </div>

        {/* CSS Animation for floating particles */}
        <style jsx>{`
          @keyframes float {
            0%,
            100% {
              transform: translateY(0px) opacity(0.3);
            }
            50% {
              transform: translateY(-10px) opacity(1);
            }
          }
        `}</style>
      </section>
      <section className="relative z-10 py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold mb-4">
              Our{" "}
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Services
              </span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              From concept to deployment, we handle every aspect of your digital
              transformation
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, i) => (
              <div key={i} className="group relative">
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300 hover:border-white/20 hover:transform hover:scale-105">
                  <h3 className="text-2xl font-bold mb-4 text-white">
                    {service.title}
                  </h3>
                  <p className="text-gray-400 mb-6">{service.description}</p>
                  <ul className="space-y-2">
                    {service.features.map((feature, j) => (
                      <li
                        key={j}
                        className="text-sm text-gray-300 flex items-center"
                      >
                        <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-3"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Collaborators Section */}
      <section className="relative z-10 py-16 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-500 mb-12 text-lg">
            Trusted by industry leaders worldwide
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-40 hover:opacity-70 transition-opacity duration-500">
            {collaborators.map((company, i) => (
              <div key={i} className="group cursor-pointer p-4">
                <div className="h-8 flex items-center justify-center group-hover:scale-110 transition-all duration-300 filter grayscale hover:grayscale-0">
                  <img
                    src={company.logo}
                    alt={company.name}
                    className="h-8 w-auto"
                    style={{ filter: "brightness(0) invert(1)" }}
                    onError={(e) => {
                      // Fallback to text if image fails to load
                      e.target.style.display = "none";
                      e.target.parentElement.innerHTML = `<div class="text-white font-bold text-sm">${company.name.charAt(
                        0
                      )}</div>`;
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="relative z-10 py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold mb-4">
              What Clients{" "}
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Say
              </span>
            </h2>
          </div>

          <div className="relative">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-12 text-center">
              <div className="mb-8">
                <p className="text-xl md:text-2xl text-gray-300 leading-relaxed italic">
                  "{testimonials[currentTestimonial].text}"
                </p>
              </div>

              <div className="flex items-center justify-center space-x-4">
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

      {/* Infinite Horizontal Slider */}
      <section className="relative z-10 py-24 overflow-hidden">
        <div className="text-center mb-16 px-6">
          <h2 className="text-4xl md:text-6xl font-bold mb-4">
            Technologies We{" "}
            <span className="bg-gradient-to-r from-white to-gray-500 bg-clip-text text-transparent">
              Master
            </span>
          </h2>
        </div>

        {/* Infinite Scrolling Container */}
        <div className="relative">
          {/* Top Row - Moving Right */}
          <div className="flex items-center mb-8 animate-scroll-right">
            {[
              "React",
              "Next.js",
              "TypeScript",
              "Node.js",
              "Python",
              "PostgreSQL",
              "MongoDB",
              "AWS",
              "Docker",
              "Kubernetes",
              "GraphQL",
              "Redis",
              "TensorFlow",
              "OpenAI",
              "Stripe",
              "Firebase",
            ]
              .concat([
                "React",
                "Next.js",
                "TypeScript",
                "Node.js",
                "Python",
                "PostgreSQL",
                "MongoDB",
                "AWS",
                "Docker",
                "Kubernetes",
                "GraphQL",
                "Redis",
                "TensorFlow",
                "OpenAI",
                "Stripe",
                "Firebase",
              ])
              .map((tech, i) => (
                <div
                  key={i}
                  className="flex-none mx-4 px-8 py-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl hover:bg-white/10 hover:border-white/20 transition-all duration-300 group cursor-pointer"
                  style={{ minWidth: "200px" }}
                >
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white group-hover:text-white transition-colors duration-300 mb-2">
                      {tech}
                    </div>
                    <div className="w-full h-1 bg-gradient-to-r from-transparent via-white/30 to-transparent rounded-full group-hover:via-white/60 transition-all duration-300"></div>
                  </div>

                  {/* Shimmer Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-shimmer transition-opacity duration-300 rounded-2xl"></div>
                </div>
              ))}
          </div>

          {/* Middle Row - Moving Left */}
          <div className="flex items-center mb-8 animate-scroll-left">
            {[
              "Three.js",
              "WebGL",
              "D3.js",
              "Framer Motion",
              "GSAP",
              "Tailwind CSS",
              "Sass",
              "Figma",
              "Adobe XD",
              "Blender",
              "Unity",
              "Flutter",
              "Swift",
              "Kotlin",
              "Rust",
              "Go",
            ]
              .concat([
                "Three.js",
                "WebGL",
                "D3.js",
                "Framer Motion",
                "GSAP",
                "Tailwind CSS",
                "Sass",
                "Figma",
                "Adobe XD",
                "Blender",
                "Unity",
                "Flutter",
                "Swift",
                "Kotlin",
                "Rust",
                "Go",
              ])
              .map((tech, i) => (
                <div
                  key={i}
                  className="flex-none mx-4 px-8 py-6 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 rounded-2xl hover:from-white/20 hover:to-white/10 hover:border-white/30 transition-all duration-300 group cursor-pointer"
                  style={{ minWidth: "200px" }}
                >
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white group-hover:text-white transition-colors duration-300 mb-2">
                      {tech}
                    </div>
                    <div className="w-full h-1 bg-gradient-to-r from-transparent via-gray-400/50 to-transparent rounded-full group-hover:via-white/80 transition-all duration-300"></div>
                  </div>

                  {/* Prismatic Shimmer Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-500/20 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-shimmer transition-opacity duration-300 rounded-2xl"></div>
                </div>
              ))}
          </div>

          {/* Bottom Row - Moving Right */}
          <div className="flex items-center animate-scroll-right-slow">
            {[
              "Vercel",
              "Netlify",
              "Heroku",
              "DigitalOcean",
              "Azure",
              "GCP",
              "Cloudflare",
              "Supabase",
              "Prisma",
              "tRPC",
              "Zustand",
              "Recoil",
              "Jest",
              "Cypress",
              "Playwright",
              "Storybook",
            ]
              .concat([
                "Vercel",
                "Netlify",
                "Heroku",
                "DigitalOcean",
                "Azure",
                "GCP",
                "Cloudflare",
                "Supabase",
                "Prisma",
                "tRPC",
                "Zustand",
                "Recoil",
                "Jest",
                "Cypress",
                "Playwright",
                "Storybook",
              ])
              .map((tech, i) => (
                <div
                  key={i}
                  className="flex-none mx-4 px-8 py-6 bg-black border border-white/30 rounded-2xl hover:bg-white/5 hover:border-white/50 transition-all duration-300 group cursor-pointer shadow-lg hover:shadow-white/20"
                  style={{ minWidth: "200px" }}
                >
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white group-hover:text-white transition-colors duration-300 mb-2">
                      {tech}
                    </div>
                    <div className="w-full h-1 bg-gradient-to-r from-transparent via-white/60 to-transparent rounded-full group-hover:via-white/100 transition-all duration-300"></div>
                  </div>

                  {/* Diamond Shimmer Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-shimmer transition-opacity duration-300 rounded-2xl"></div>
                </div>
              ))}
          </div>

          {/* Gradient Overlays for Edge Fade Effect */}
          <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-black to-transparent pointer-events-none z-10"></div>
          <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-black to-transparent pointer-events-none z-10"></div>
        </div>

        {/* Floating Particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white/20 rounded-full animate-float-particle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${20 + Math.random() * 60}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${3 + Math.random() * 4}s`,
              }}
            />
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 backdrop-blur-sm border border-white/10 rounded-3xl p-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Start Your
              <br />
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Next Project?
              </span>
            </h2>
            <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
              Let's discuss your ideas and turn them into reality. Get in touch
              with our team today.
            </p>
            <Link href="/services" className="px-12 py-4 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl">
              Get Started Now
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
