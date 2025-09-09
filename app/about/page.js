"use client";

import { useState, useEffect, useRef } from "react";
import * as THREE from "three";

export default function About() {
  const mountRef = useRef(null);
  const [currentSection, setCurrentSection] = useState(0);
  const [typedText, setTypedText] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  // Typing animation for hero section
  useEffect(() => {
    const text = "Full Stack Developer & Software Engineer";
    let index = 0;

    const typeInterval = setInterval(() => {
      if (index < text.length) {
        setTypedText(text.slice(0, index + 1));
        index++;
      } else {
        setIsTyping(false);
        clearInterval(typeInterval);
      }
    }, 100);

    return () => clearInterval(typeInterval);
  }, []);

  // 3D Background with Matrix-like effect
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

    // Create matrix-like falling particles
    const particles = [];
    const particleCount = 100;

    for (let i = 0; i < particleCount; i++) {
      const geometry = new THREE.PlaneGeometry(0.1, 0.1);
      const material = new THREE.MeshBasicMaterial({
        color: 0x00ff00,
        opacity: Math.random() * 0.5 + 0.1,
        transparent: true,
      });

      const particle = new THREE.Mesh(geometry, material);
      particle.position.set(
        (Math.random() - 0.5) * 50,
        Math.random() * 50,
        (Math.random() - 0.5) * 20
      );
      particle.velocity = Math.random() * 0.02 + 0.01;

      particles.push(particle);
      scene.add(particle);
    }

    // Add wireframe cubes
    const cubes = [];
    for (let i = 0; i < 8; i++) {
      const geometry = new THREE.BoxGeometry(1, 1, 1);
      const material = new THREE.MeshBasicMaterial({
        color: 0x00ff00,
        opacity: 0.1,
        transparent: true,
        wireframe: true,
      });

      const cube = new THREE.Mesh(geometry, material);
      cube.position.set(
        (Math.random() - 0.5) * 30,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 15
      );

      cubes.push(cube);
      scene.add(cube);
    }

    camera.position.z = 10;

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      // Animate falling particles
      particles.forEach((particle) => {
        particle.position.y -= particle.velocity;
        if (particle.position.y < -25) {
          particle.position.y = 25;
          particle.position.x = (Math.random() - 0.5) * 50;
        }
        particle.rotation.z += 0.01;
      });

      // Animate cubes
      cubes.forEach((cube, i) => {
        cube.rotation.x += 0.005 + i * 0.001;
        cube.rotation.y += 0.003 + i * 0.001;
        cube.position.y += Math.sin(Date.now() * 0.001 + i) * 0.002;
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

  const tools = [
    { name: "Python", category: "Backend", level: 95 },
    { name: "JavaScript", category: "Frontend", level: 92 },
    { name: "React", category: "Frontend", level: 90 },
    { name: "Next.js", category: "Frontend", level: 88 },
    { name: "Node.js", category: "Backend", level: 85 },
    { name: "MongoDB", category: "Database", level: 82 },
    { name: "MySQL", category: "Database", level: 80 },
    { name: "Prisma", category: "Database", level: 75 },
    { name: "TailwindCSS", category: "Styling", level: 88 },
    { name: "Bootstrap", category: "Styling", level: 85 },
    { name: "HTML5", category: "Frontend", level: 95 },
    { name: "CSS3", category: "Frontend", level: 90 },
    { name: "PHP", category: "Backend", level: 78 },
    { name: "C++", category: "Programming", level: 72 },
    { name: "Arduino", category: "Hardware", level: 70 },
    { name: "VS Code", category: "Tools", level: 95 },
    { name: "Figma", category: "Design", level: 80 },
    { name: "Netlify", category: "Deployment", level: 85 },
    
  ];

  const projects = [
    {
      title: "E-Commerce Platform",
      description:
        "Full-stack e-commerce solution with React, Node.js, and MongoDB",
      tech: ["React", "Node.js", "MongoDB", "Stripe"],
      status: "Production",

    },
    {
      title: "Real-time Chat",
      description:
        "WebSocket-based chat app with authentication and file sharing",
      tech: ["Next.js", "Socket.io", "PostgreSQL", "AWS"],
      status: "Production",

    },
    {
      title: "IoT Dashboard",
      description:
        "Arduino-based sensor monitoring system with real-time data visualization",
      tech: ["Arduino", "Python", "React", "InfluxDB"],
      status: "Development",

    },
    {
      title: "AI Task Manager",
      description:
        "Smart task management with AI-powered prioritization and scheduling",
      tech: ["Python", "OpenAI", "FastAPI", "React"],
      status: "Beta",

    },
    {
      title: "Blockchain Wallet",
      description: "Secure cryptocurrency wallet with multi-chain support",
      tech: ["Solidity", "Web3.js", "React", "Node.js"],
      status: "Production",

    },
    {
      title: "Social Media Analytics",
      description:
        "Advanced analytics dashboard for social media performance tracking",
      tech: ["Python", "Django", "D3.js", "PostgreSQL"],
      status: "Production",

    },
  ];

  const education = [
    {
      degree: "Chiangmai Technical College",
      institution: "a high vocational certificate",
      year: "present",
      gpa: "unknown",
      focus: "Information Technology",
    },
    {
      degree: "Chiangmai Technical College",
      institution: "a vocational certificate",
      year: "2025",
      gpa: "Completed",
      focus: "Information Technology",
    },
  ];

  const experience = [
    {
      position: "Full Stack Developer",
      company: "None",
      period: "2025 - Present",
      description:
        "I am a freelance. Accepting work on website making to the present. There are small to medium -sized projects.",
      achievements: [
        "Led 3 major product launches",
        "Reduced load time by 60%",
        "Implemented CI/CD pipeline",
      ],
    },
    {
      position: "Full Stack Developer",
      company: "Chiang Mai Software and Hardware Service Lo.,Ltd.",
      period: "2024",
      description:
        "I completed an internship at Chiang Mai Software and Hardware Service Co., Ltd. as a Full Stack Developer for two and a half months.",
      achievements: [
        "Built PHP Village Management System",
        "Implemented real-time features",
        "Optimized database queries",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* 3D Background */}
      <div ref={mountRef} className="fixed inset-0 pointer-events-none z-0" />

      

      <div className="relative z-10">
        {/* Hero Section */}
        
        <section className="min-h-screen flex items-center justify-center px-6">
          
          <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center mt-24 xl:mt-18">
            {/* Left Side - Profile Image */}
            <div className="text-center lg:text-left">
              <div className="relative inline-block mb-8">
                <div className="w-80 h-80 relative">
                  {/* Glowing Ring */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-green-400/20 via-blue-400/20 to-green-400/20 animate-spin-slow"></div>
                  <div className="absolute inset-2 rounded-full bg-gradient-to-r from-green-400/30 to-blue-400/30 animate-pulse"></div>

                  {/* Profile Image Container */}
                  <div className="absolute inset-4 rounded-full bg-black border-2 border-green-400/50 overflow-hidden">
                    <img
                      src="/me.png"
                      alt="Profile"
                      className="w-full h-full object-cover transition-all duration-500"
                    />
                  </div>

                  {/* Matrix Rain Effect */}
                  <div className="absolute inset-0 rounded-full overflow-hidden pointer-events-none">
                    {[...Array(20)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute w-0.5 bg-green-400/30 animate-matrix-fall"
                        style={{
                          left: `${(i * 5) % 100}%`,
                          height: "20px",
                          animationDelay: `${i * 0.2}s`,
                          animationDuration: `${2 + (i % 3)}s`,
                        }}
                      />
                    ))}
                  </div>

                  {/* Corner Brackets */}
                  <div className="absolute top-0 left-0 w-8 h-8 border-l-2 border-t-2 border-green-400"></div>
                  <div className="absolute top-0 right-0 w-8 h-8 border-r-2 border-t-2 border-green-400"></div>
                  <div className="absolute bottom-0 left-0 w-8 h-8 border-l-2 border-b-2 border-green-400"></div>
                  <div className="absolute bottom-0 right-0 w-8 h-8 border-r-2 border-b-2 border-green-400"></div>
                </div>

                {/* Status Indicator */}
                <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-black/80 backdrop-blur-sm border border-green-400/30 rounded-lg px-4 py-2">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <span className="text-green-400 text-sm font-mono">
                        ONLINE
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Info */}
            <div className="space-y-8">
              {/* Terminal-like header */}
              <div className="bg-black/50 backdrop-blur-sm border border-green-400/30 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-green-400 text-sm font-mono ml-4">
                    ~/about.sh
                  </span>
                </div>

                <div className="font-mono text-green-400 space-y-2">
                  <div>$ whoami</div>
                  <div className="text-white">Developer</div>
                  <div>$ cat profile.txt</div>
                  <div className="text-white">
                    Name: Jirapat Papai
                    <br />
                    Role: {typedText}
                    {isTyping && <span className="animate-pulse">|</span>}
                  </div>
                </div>
              </div>

              <div>
                <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-green-400 to-white bg-clip-text text-transparent">
                  Hello, World!
                </h1>
                <p className="text-xl text-gray-300 leading-relaxed mb-8">
                  I'm a passionate full-stack developer who loves turning
                  complex problems into elegant solutions. With expertise in
                  modern web technologies and a hacker mindset, I build
                  applications that make a difference.
                </p>

                <div className="flex flex-wrap gap-4">
                  <a
                    href="https://jirapatpapai.netlify.app"
                    target="_blank"
                    className="inline-block px-6 py-3 bg-green-400/10 border border-green-400/30 rounded-lg text-green-400 hover:bg-green-400/20 transition-all duration-300 font-mono"
                  >
                    ➤ view_projects()
                  </a>
                  <a
                    href="https://jirapatpapai.netlify.app"
                    target="_blank"
                    className="inline-block px-6 py-3 bg-white/10 border border-white/30 rounded-lg text-white hover:bg-white/20 transition-all duration-300 font-mono"
                  >
                    ➤ contact_me()
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="py-24 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                <span className="text-green-400 font-mono">{"<"}</span>
                About Me
                <span className="text-green-400 font-mono">{" />"}</span>
              </h2>
            </div>

            <div className="grid lg:grid-cols-2 gap-16">
              <div className="space-y-8">
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300">
                  <h3 className="text-2xl font-bold text-green-400 mb-4 font-mono">
                    {"// Background"}
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    I started my journey in computer science with a fascination
                    for how things work under the hood. From writing my first
                    "Hello World" to architecting enterprise-level applications,
                    I've always maintained a hacker's curiosity and passion for
                    continuous learning.
                  </p>
                </div>

                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300">
                  <h3 className="text-2xl font-bold text-green-400 mb-4 font-mono">
                    {"// Philosophy"}
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    I believe in writing clean, efficient code that not only
                    works but is also maintainable and scalable. My approach
                    combines technical excellence with user-centric design,
                    always keeping the end user in mind while pushing the
                    boundaries of what's possible.
                  </p>
                </div>
              </div>

              <div className="space-y-8">
                <div className="bg-gradient-to-br from-green-500/10 to-blue-500/5 backdrop-blur-sm border border-green-400/20 rounded-2xl p-8 hover:border-green-400/40 transition-all duration-300">
                  <h3 className="text-2xl font-bold text-green-400 mb-6 font-mono">
                    {"// Skills Overview"}
                  </h3>
                  <div className="space-y-4">
                    {[
                      "Frontend Development",
                      "Backend Architecture",
                      "Database Design",
                      "DevOps & Deployment",
                      "UI/UX Design",
                    ].map((skill, i) => (
                      <div key={skill} className="flex items-center space-x-4">
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        <span className="text-white">{skill}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-black/50 backdrop-blur-sm border border-green-400/30 rounded-2xl p-8">
                  <div className="font-mono text-green-400 space-y-2 text-sm">
                    <div>$ git log --oneline</div>
                    <div className="text-gray-400">
                      <div>a1b2c3d Added ML integration</div>
                      <div>e4f5g6h Optimized database queries</div>
                      <div>i7j8k9l Implemented real-time features</div>
                      <div>m1n2o3p Enhanced security measures</div>
                      <div>q4r5s6t Initial commit</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Education Section */}
        <section className="py-24 px-6 bg-gradient-to-b from-transparent to-green-500/5">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
              <span className="text-green-400 font-mono">{"<"}</span>
              Education
              <span className="text-green-400 font-mono">{" />"}</span>
            </h2>

            <div className="space-y-8">
              {education.map((edu, i) => (
                <div
                  key={i}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 hover:border-green-400/30 transition-all duration-300"
                >
                  <div className="grid md:grid-cols-3 gap-6 items-center">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">
                        {edu.degree}
                      </h3>
                      <p className="text-green-400 font-mono">
                        {edu.institution}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-400 mb-1">Period</p>
                      <p className="text-white font-semibold">{edu.year}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 mb-1">Focus</p>
                      <p className="text-white font-semibold">{edu.focus}</p>
                      <p className="text-green-400 text-sm mt-1">
                        GPA: {edu.gpa}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section className="py-24 px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
              <span className="text-green-400 font-mono">{"<"}</span>
              Experience
              <span className="text-green-400 font-mono">{" />"}</span>
            </h2>

            <div className="space-y-12">
              {experience.map((exp, i) => (
                <div key={i} className="relative">
                  {/* Timeline line */}
                  <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-green-400 via-blue-400 to-green-400"></div>

                  <div className="flex items-start space-x-8">
                    {/* Timeline dot */}
                    <div className="w-16 h-16 bg-black border-4 border-green-400 rounded-full flex items-center justify-center relative z-10">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    </div>

                    <div className="flex-1 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 hover:border-green-400/30 transition-all duration-300">
                      <div className="grid lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-2">
                          <h3 className="text-2xl font-bold text-white mb-2">
                            {exp.position}
                          </h3>
                          <p className="text-green-400 font-semibold mb-4">
                            {exp.company}
                          </p>
                          <p className="text-gray-300 leading-relaxed mb-6">
                            {exp.description}
                          </p>

                          <div className="space-y-2">
                            <h4 className="text-white font-semibold mb-3 font-mono">
                              {"// Key Achievements"}
                            </h4>
                            {exp.achievements.map((achievement, j) => (
                              <div
                                key={j}
                                className="flex items-center space-x-3"
                              >
                                <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
                                <span className="text-gray-300 text-sm">
                                  {achievement}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="flex flex-col justify-center">
                          <div className="bg-black/50 border border-green-400/30 rounded-lg p-4">
                            <p className="text-green-400 font-mono text-sm mb-2">
                              Period:
                            </p>
                            <p className="text-white font-semibold">
                              {exp.period}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Tools & Languages Section */}
        <section className="py-24 px-6 bg-gradient-to-b from-green-500/5 to-transparent">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
              <span className="text-green-400 font-mono">{"<"}</span>
              Tools & Languages
              <span className="text-green-400 font-mono">{" />"}</span>
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tools.map((tool, i) => (
                <div
                  key={tool.name}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 hover:border-green-400/30 transition-all duration-300 group"
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-white group-hover:text-green-400 transition-colors duration-300">
                      {tool.name}
                    </h3>
                    <span className="text-xs text-gray-400 bg-black/50 px-2 py-1 rounded font-mono">
                      {tool.category}
                    </span>
                  </div>

                  {/* Skill Bar */}
                  <div className="relative">
                    <div className="w-full h-2 bg-black/50 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-green-400 to-blue-400 rounded-full transition-all duration-1000 ease-out"
                        style={{ width: `${tool.level}%` }}
                      ></div>
                    </div>
                    <span className="absolute right-0 -top-6 text-xs text-green-400 font-mono">
                      {tool.level}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section className="py-24 px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
              <span className="text-green-400 font-mono">{"<"}</span>
              Projects
              <span className="text-green-400 font-mono">{" />"}</span>
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, i) => (
                <div key={i} className="group relative">
                  <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-green-400/30 transition-all duration-500 transform hover:scale-105">


                    {/* Status Badge */}
                    <div className="absolute top-4 right-4">
                      <span
                        className={`text-xs px-2 py-1 rounded-full font-mono ${
                          project.status === "Production"
                            ? "bg-green-400/20 text-green-400 border border-green-400/30"
                            : project.status === "Beta"
                            ? "bg-blue-400/20 text-blue-400 border border-blue-400/30"
                            : "bg-yellow-400/20 text-yellow-400 border border-yellow-400/30"
                        }`}
                      >
                        {project.status}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-green-400 transition-colors duration-300">
                      {project.title}
                    </h3>

                    <p className="text-gray-300 text-sm leading-relaxed mb-4">
                      {project.description}
                    </p>

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tech.map((tech, j) => (
                        <span
                          key={j}
                          className="text-xs bg-black/50 text-green-400 px-2 py-1 rounded font-mono border border-green-400/20"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <button className="w-full py-2 bg-green-400/10 border border-green-400/30 rounded-lg text-green-400 hover:bg-green-400/20 transition-all duration-300 font-mono text-sm">
                      ➤ view_details()
                    </button>
                  </div>

                  {/* Hover Glow */}
                  <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 via-blue-500/5 to-green-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none blur-xl"></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="py-24 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-gradient-to-r from-green-500/10 via-black/50 to-green-500/10 backdrop-blur-sm border border-green-400/30 rounded-3xl p-12">
              <div className="mb-8">
                <div className="inline-block bg-black/50 border border-green-400/30 rounded-lg p-4 mb-6">
                  <div className="font-mono text-green-400 space-y-1">
                    <div>$ connection_status</div>
                    <div className="text-white">Ready to connect</div>
                    <div>$ available_for_projects</div>
                    <div className="text-green-400">true</div>
                  </div>
                </div>
              </div>

              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Let's Build Something
                <br />
                <span className="bg-gradient-to-r from-green-400 via-blue-400 to-green-400 bg-clip-text text-transparent">
                  Amazing Together
                </span>
              </h2>

              <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
                Have an idea? Need a developer? Want to collaborate? I'm always
                excited to work on new challenges and innovative projects.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <a
                  href="https://jirapatpapai.netlify.app"
                  target="_blank"
                  className="inline-block px-8 py-4 bg-green-400/10 border-2 border-green-400/30 rounded-lg text-green-400 hover:bg-green-400/20 hover:border-green-400/50 transition-all duration-300 transform hover:scale-105 font-mono"
                >
                  ➤ initiate_contact()
                </a>
                <button className="px-8 py-4 bg-white/10 border border-white/20 rounded-lg text-white hover:bg-white/20 transition-all duration-300 font-mono">
                  ➤ download_resume()
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes matrix-fall {
          0% {
            transform: translateY(-20px);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(400px);
            opacity: 0;
          }
        }

        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes glow-pulse {
          0%,
          100% {
            box-shadow: 0 0 20px rgba(34, 197, 94, 0.3);
          }
          50% {
            box-shadow: 0 0 40px rgba(34, 197, 94, 0.6);
          }
        }

        .animate-matrix-fall {
          animation: matrix-fall linear infinite;
        }

        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }

        .animate-glow-pulse {
          animation: glow-pulse 2s ease-in-out infinite;
        }

        /* Scrollbar Styling */
        ::-webkit-scrollbar {
          width: 8px;
        }

        ::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.3);
        }

        ::-webkit-scrollbar-thumb {
          background: rgba(34, 197, 94, 0.3);
          border-radius: 4px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: rgba(34, 197, 94, 0.5);
        }

        /* Terminal cursor blink */
        @keyframes cursor-blink {
          0%,
          50% {
            opacity: 1;
          }
          51%,
          100% {
            opacity: 0;
          }
        }

        .cursor-blink {
          animation: cursor-blink 1s infinite;
        }

        /* Glitch effect for headers */
        .glitch {
          position: relative;
        }

        .glitch:before,
        .glitch:after {
          content: attr(data-text);
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }

        .glitch:before {
          animation: glitch-anim-1 0.3s infinite linear alternate-reverse;
          color: #00ff00;
          z-index: -1;
        }

        .glitch:after {
          animation: glitch-anim-2 0.3s infinite linear alternate-reverse;
          color: #ff0000;
          z-index: -2;
        }

        @keyframes glitch-anim-1 {
          0% {
            clip: rect(42px, 9999px, 44px, 0);
            transform: skew(0.5deg);
          }
          5% {
            clip: rect(12px, 9999px, 59px, 0);
            transform: skew(0.1deg);
          }
          10% {
            clip: rect(48px, 9999px, 29px, 0);
            transform: skew(0.8deg);
          }
          15% {
            clip: rect(42px, 9999px, 73px, 0);
            transform: skew(0.9deg);
          }
          20% {
            clip: rect(63px, 9999px, 27px, 0);
            transform: skew(0.4deg);
          }
          25% {
            clip: rect(34px, 9999px, 55px, 0);
            transform: skew(0.7deg);
          }
          30% {
            clip: rect(86px, 9999px, 73px, 0);
            transform: skew(0.8deg);
          }
          35% {
            clip: rect(20px, 9999px, 20px, 0);
            transform: skew(1deg);
          }
          40% {
            clip: rect(26px, 9999px, 60px, 0);
            transform: skew(0.6deg);
          }
          45% {
            clip: rect(59px, 9999px, 83px, 0);
            transform: skew(0.2deg);
          }
          50% {
            clip: rect(67px, 9999px, 61px, 0);
            transform: skew(0.3deg);
          }
          55% {
            clip: rect(10px, 9999px, 85px, 0);
            transform: skew(0.8deg);
          }
          60% {
            clip: rect(78px, 9999px, 27px, 0);
            transform: skew(0.4deg);
          }
          65% {
            clip: rect(65px, 9999px, 42px, 0);
            transform: skew(0.1deg);
          }
          70% {
            clip: rect(37px, 9999px, 75px, 0);
            transform: skew(0.5deg);
          }
          75% {
            clip: rect(8px, 9999px, 42px, 0);
            transform: skew(0.6deg);
          }
          80% {
            clip: rect(40px, 9999px, 79px, 0);
            transform: skew(0.2deg);
          }
          85% {
            clip: rect(2px, 9999px, 80px, 0);
            transform: skew(0.9deg);
          }
          90% {
            clip: rect(85px, 9999px, 15px, 0);
            transform: skew(0.7deg);
          }
          95% {
            clip: rect(19px, 9999px, 57px, 0);
            transform: skew(0.4deg);
          }
          100% {
            clip: rect(26px, 9999px, 25px, 0);
            transform: skew(0.3deg);
          }
        }

        @keyframes glitch-anim-2 {
          0% {
            clip: rect(65px, 9999px, 100px, 0);
            transform: skew(0.2deg);
          }
          5% {
            clip: rect(52px, 9999px, 74px, 0);
            transform: skew(0.9deg);
          }
          10% {
            clip: rect(79px, 9999px, 85px, 0);
            transform: skew(0.6deg);
          }
          15% {
            clip: rect(75px, 9999px, 5px, 0);
            transform: skew(0.3deg);
          }
          20% {
            clip: rect(67px, 9999px, 61px, 0);
            transform: skew(0.5deg);
          }
          25% {
            clip: rect(14px, 9999px, 79px, 0);
            transform: skew(0.1deg);
          }
          30% {
            clip: rect(1px, 9999px, 66px, 0);
            transform: skew(0.8deg);
          }
          35% {
            clip: rect(86px, 9999px, 30px, 0);
            transform: skew(0.2deg);
          }
          40% {
            clip: rect(23px, 9999px, 98px, 0);
            transform: skew(0.7deg);
          }
          45% {
            clip: rect(47px, 9999px, 65px, 0);
            transform: skew(0.4deg);
          }
          50% {
            clip: rect(82px, 9999px, 51px, 0);
            transform: skew(0.6deg);
          }
          55% {
            clip: rect(38px, 9999px, 38px, 0);
            transform: skew(0.9deg);
          }
          60% {
            clip: rect(98px, 9999px, 81px, 0);
            transform: skew(0.1deg);
          }
          65% {
            clip: rect(54px, 9999px, 73px, 0);
            transform: skew(0.5deg);
          }
          70% {
            clip: rect(39px, 9999px, 92px, 0);
            transform: skew(0.3deg);
          }
          75% {
            clip: rect(17px, 9999px, 49px, 0);
            transform: skew(0.8deg);
          }
          80% {
            clip: rect(56px, 9999px, 72px, 0);
            transform: skew(0.2deg);
          }
          85% {
            clip: rect(32px, 9999px, 95px, 0);
            transform: skew(0.7deg);
          }
          90% {
            clip: rect(91px, 9999px, 11px, 0);
            transform: skew(0.4deg);
          }
          95% {
            clip: rect(6px, 9999px, 84px, 0);
            transform: skew(0.6deg);
          }
          100% {
            clip: rect(72px, 9999px, 33px, 0);
            transform: skew(0.9deg);
          }
        }

        /* Fade in animation for sections */
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .fade-in-up {
          animation: fadeInUp 0.6s ease-out forwards;
        }

        /* Code block styling */
        .code-block {
          background: linear-gradient(
            135deg,
            rgba(0, 0, 0, 0.8) 0%,
            rgba(0, 50, 0, 0.2) 100%
          );
          border: 1px solid rgba(34, 197, 94, 0.3);
          box-shadow: 0 0 20px rgba(34, 197, 94, 0.1);
        }

        /* Neon glow effect */
        .neon-glow {
          text-shadow: 0 0 5px rgba(34, 197, 94, 0.5),
            0 0 10px rgba(34, 197, 94, 0.3), 0 0 15px rgba(34, 197, 94, 0.2),
            0 0 20px rgba(34, 197, 94, 0.1);
        }

        /* Circuit board pattern */
        .circuit-bg {
          background-image: linear-gradient(
              90deg,
              rgba(34, 197, 94, 0.1) 1px,
              transparent 1px
            ),
            linear-gradient(rgba(34, 197, 94, 0.1) 1px, transparent 1px);
          background-size: 20px 20px;
        }
      `}</style>
    </div>
  );
}
