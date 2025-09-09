"use client";

import { useState } from "react";
import Image from "next/image";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail("");
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  const footerLinks = {
    product: [
      { name: "Web Applications", href: "#" },
      { name: "Websites", href: "#" },
      { name: "Mobile Apps", href: "#" },
      { name: "API Development", href: "#" },
      { name: "Cloud Solutions", href: "#" },
    ],
    company: [
      { name: "About Us", href: "#" },
      { name: "Our Team", href: "#" },
      { name: "Careers", href: "#" },
      { name: "Press Kit", href: "#" },
      { name: "Contact", href: "#" },
    ],
    resources: [
      { name: "Documentation", href: "#" },
      { name: "Blog", href: "#" },
      { name: "Case Studies", href: "#" },
      { name: "Help Center", href: "#" },
      { name: "Community", href: "#" },
    ],
    legal: [
      { name: "Privacy Policy", href: "#" },
      { name: "Terms of Service", href: "#" },
      { name: "Cookie Policy", href: "#" },
      { name: "GDPR", href: "#" },
    ],
  };

  const socialLinks = [
    {
      name: "Facebook",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/facebook/facebook-original.svg",
      href: "https://www.facebook.com/jirapxt.papxi",
    },
    {
      name: "Instagram",
      logo: "https://upload.wikimedia.org/wikipedia/commons/9/95/Instagram_logo_2022.svg",
      href: "https://www.facebook.com/jirapxt.papxihttps://www.instagram.com/pleasexanny_0i",
    },
    {
      name: "GitHub",
      logo: "https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/github-white-icon.png",
      href: "https://github.com/tydevilish",
    },
    {
      name: "Discord",
      logo: "https://upload.wikimedia.org/wikipedia/fr/4/4f/Discord_Logo_sans_texte.svg",
      href: "discordapp.com/users/867790140478586880",
    },
  ];

  return (
    <footer className="relative bg-black text-white overflow-hidden">
      {/* Animated Background Grid */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "50px 50px",
            animation: "grid-move 20s linear infinite",
          }}
        ></div>
      </div>

      {/* Top Section */}
      <div className="relative z-10 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left - Newsletter */}
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Stay ahead of the
                <br />
                <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  curve
                </span>
              </h2>
              <p className="text-gray-400 text-lg mb-8 max-w-lg">
                Get the latest insights on web development, AI, and digital
                transformation delivered straight to your inbox.
              </p>

              <div onSubmit={handleSubscribe} className="flex gap-4 max-w-md">
                <div className="flex-1 relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-white/40 focus:bg-white/10 transition-all duration-300"
                    required
                  />
                  {isSubscribed && (
                    <div className="absolute inset-0 flex items-center justify-center bg-green-500/20 rounded-lg border border-green-400/50">
                      <span className="text-green-400 font-medium">
                        ✓ Subscribed!
                      </span>
                    </div>
                  )}
                </div>
                <button
                  type="submit"
                  className="px-6 py-3 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition-all duration-300 transform hover:scale-105"
                  disabled={isSubscribed}
                >
                  Subscribe
                </button>
              </div>
            </div>

            {/* Right - Stats */}
            <div className="grid grid-cols-2 gap-8">
              {[
                { number: "99.9%", label: "Uptime", sublabel: "Guaranteed" },
                {
                  number: "<100ms",
                  label: "Response Time",
                  sublabel: "Average",
                },
                {
                  number: "24/7",
                  label: "Support",
                  sublabel: "Always Available",
                },
                {
                  number: "∞",
                  label: "Scalability",
                  sublabel: "Unlimited Growth",
                },
              ].map((stat, i) => (
                <div key={i} className="group text-center lg:text-left">
                  <div className="text-3xl font-bold text-white group-hover:text-blue-400 transition-colors duration-300 mb-2">
                    {stat.number}
                  </div>
                  <div className="text-white text-sm font-medium mb-1">
                    {stat.label}
                  </div>
                  <div className="text-gray-500 text-xs">{stat.sublabel}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid lg:grid-cols-6 gap-12">
            {/* Logo & Description */}
            <div className="lg:col-span-2 space-y-6">
              <div className="flex items-center group cursor-pointer">
                <div className="relative">
                  <Image
                    src="/logo.png"
                    alt="Logo"
                    width={100}
                    height={100}
                    className="transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 drop-shadow-lg group-hover:drop-shadow-2xl"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-lg"></div>
                </div>
              </div>

              <p className="text-gray-400 leading-relaxed max-w-sm">
                Building the future of digital experiences with cutting-edge
                technology and innovative solutions that drive business growth.
              </p>

              {/* Social Links */}
              <div className="flex space-x-4">
                {socialLinks.map((social, i) => (
                  <a
                    key={i}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg flex items-center justify-center hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:scale-110 overflow-hidden"
                    title={social.name}
                  >
                    <img
                      src={social.logo}
                      alt={`${social.name} logo`}
                      width={20}
                      height={20}
                      className="object-contain filter brightness-75 hover:brightness-100 transition-all duration-300"
                    />
                  </a>
                ))}
              </div>
            </div>

            {/* Links Columns */}
            <div className="lg:col-span-4 grid md:grid-cols-4 gap-8">
              <div>
                <h3 className="text-white font-semibold mb-6 relative">
                  Product
                  <div className="absolute -bottom-2 left-0 w-8 h-px bg-gradient-to-r from-blue-400 to-transparent"></div>
                </h3>
                <ul className="space-y-4">
                  {footerLinks.product.map((link, i) => (
                    <li key={i}>
                      <a
                        href={link.href}
                        className="text-gray-400 hover:text-white transition-colors duration-300 text-sm group flex items-center"
                      >
                        <span className="w-0 group-hover:w-2 h-px bg-blue-400 mr-0 group-hover:mr-2 transition-all duration-300"></span>
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-white font-semibold mb-6 relative">
                  Company
                  <div className="absolute -bottom-2 left-0 w-8 h-px bg-gradient-to-r from-purple-400 to-transparent"></div>
                </h3>
                <ul className="space-y-4">
                  {footerLinks.company.map((link, i) => (
                    <li key={i}>
                      <a
                        href={link.href}
                        className="text-gray-400 hover:text-white transition-colors duration-300 text-sm group flex items-center"
                      >
                        <span className="w-0 group-hover:w-2 h-px bg-purple-400 mr-0 group-hover:mr-2 transition-all duration-300"></span>
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-white font-semibold mb-6 relative">
                  Resources
                  <div className="absolute -bottom-2 left-0 w-8 h-px bg-gradient-to-r from-pink-400 to-transparent"></div>
                </h3>
                <ul className="space-y-4">
                  {footerLinks.resources.map((link, i) => (
                    <li key={i}>
                      <a
                        href={link.href}
                        className="text-gray-400 hover:text-white transition-colors duration-300 text-sm group flex items-center"
                      >
                        <span className="w-0 group-hover:w-2 h-px bg-pink-400 mr-0 group-hover:mr-2 transition-all duration-300"></span>
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-white font-semibold mb-6 relative">
                  Legal
                  <div className="absolute -bottom-2 left-0 w-8 h-px bg-gradient-to-r from-green-400 to-transparent"></div>
                </h3>
                <ul className="space-y-4">
                  {footerLinks.legal.map((link, i) => (
                    <li key={i}>
                      <a
                        href={link.href}
                        className="text-gray-400 hover:text-white transition-colors duration-300 text-sm group flex items-center"
                      >
                        <span className="w-0 group-hover:w-2 h-px bg-green-400 mr-0 group-hover:mr-2 transition-all duration-300"></span>
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="relative z-10 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">
              © 2024 Nowhere Software. All rights reserved.
            </div>

            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-2 text-gray-400 text-sm">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span>All systems operational</span>
              </div>

              <div className="text-gray-500 text-xs">
                Built with ❤️ using Next.js
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full animate-pulse"
            style={{
              left: `${10 + i * 20}%`,
              top: `${20 + i * 15}%`,
              animationDelay: `${i * 1.5}s`,
              animationDuration: "4s",
            }}
          />
        ))}
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes grid-move {
          0% {
            transform: translate(0, 0);
          }
          100% {
            transform: translate(50px, 50px);
          }
        }
      `}</style>
    </footer>
  );
}
