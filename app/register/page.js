"use client";

import { useState, useEffect, useRef } from "react";
import * as THREE from "three";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Register() {
  const mountRef = useRef(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    username: "",
    firstname: "",
    fullname: "",
    lastname: "",
    address: "",
    sex: "",
    birthday: "",
    password: "",
    confirmPassword: "",
  });

  const router = useRouter();
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
      new THREE.BoxGeometry(0.5, 0.5, 0.5),
      new THREE.SphereGeometry(0.3, 16, 16),
      new THREE.OctahedronGeometry(0.4),
      new THREE.TetrahedronGeometry(0.4),
    ];

    for (let i = 0; i < 8; i++) {
      const geometry =
        geometries[Math.floor(Math.random() * geometries.length)];
      const material = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        opacity: 0.05,
        transparent: true,
        wireframe: true,
      });

      const shape = new THREE.Mesh(geometry, material);
      shape.position.set(
        (Math.random() - 0.5) * 15,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 8
      );
      shape.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );

      shapes.push(shape);
      scene.add(shape);
    }

    camera.position.z = 6;

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      shapes.forEach((shape, i) => {
        shape.rotation.x += 0.002 + i * 0.0005;
        shape.rotation.y += 0.001 + i * 0.0005;
        shape.position.y += Math.sin(Date.now() * 0.001 + i) * 0.001;
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

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      router.push("/admin/users");
    }
  }, []);

  const steps = [
    { id: 1, title: "Personal Info", description: "Basic information" },
    {
      id: 2,
      title: "Address & Details",
      description: "Location and personal details",
    },
    { id: 3, title: "Security", description: "Password setup" },
  ];

  const validateStep = (step) => {
    const newErrors = {};

    if (step === 1) {
      if (!formData.username.trim())
        newErrors.username = "Username is required";
      if (!formData.firstname.trim()) newErrors.firstname = "Title is required";
      if (!formData.fullname.trim())
        newErrors.fullname = "First name is required";
      if (!formData.lastname.trim())
        newErrors.lastname = "Last name is required";
    }

    if (step === 2) {
      if (!formData.address.trim()) newErrors.address = "Address is required";
      if (!formData.sex) newErrors.sex = "Gender is required";
      if (!formData.birthday) newErrors.birthday = "Birthday is required";
    }

    if (step === 3) {
      if (!formData.password) newErrors.password = "Password is required";
      else if (formData.password.length < 6)
        newErrors.password = "Password must be at least 6 characters";

      if (!formData.confirmPassword)
        newErrors.confirmPassword = "Confirm password is required";
      else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, 3));
    }
  };

  const handlePrevious = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    if (!validateStep(3)) return;

    setLoading(true);
    try {
      const response = await fetch(
        "https://backend-nextjs-virid.vercel.app/api/users",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: formData.username,
            firstname: formData.firstname,
            fullname: formData.fullname,
            lastname: formData.lastname,
            address: formData.address,
            sex: formData.sex,
            birthday: formData.birthday,
            password: formData.password,
          }),
        }
      );

      if (response.ok) {
        setSuccess(true);
        // หน่วงเวลา 3 วิก่อน redirect ไป login
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      } else {
        const errorData = await response.json();
        setErrors({ submit: errorData.message || "Registration failed" });
      }
    } catch (error) {
      setErrors({ submit: "Network error. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div ref={mountRef} className="fixed inset-0 pointer-events-none z-0" />
        <div className="relative z-10 text-center">
          <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full flex items-center justify-center">
            <svg
              className="w-10 h-10 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h2 className="text-4xl font-bold mb-4">Registration Successful!</h2>
          <p className="text-gray-400 text-lg">
            Your account has been created successfully.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* 3D Background */}
      <div ref={mountRef} className="fixed inset-0 pointer-events-none z-0" />

      <div className="relative z-10 min-h-screen flex items-center justify-center px-6 py-12">
        <div className="max-w-2xl mx-auto w-full mt-18 lg:mt-14">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Create Your{" "}
              <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                Account
              </span>
            </h1>
            <p className="text-gray-400 text-lg">
              Join us and start your journey
            </p>
          </div>

          {/* Enhanced Progress Steps */}
          <div className="mb-16">
            {/* Progress Bar Background */}
            <div className="relative mb-12">
              <div className="absolute inset-0 bg-gradient-to-r from-white/5 via-white/10 to-white/5 rounded-full h-2 blur-sm"></div>
              <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-full p-6">
                <div className="flex items-center justify-between relative">
                  {/* Progress Line */}
                  <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-white/10 transform -translate-y-1/2 rounded-full">
                    <div
                      className="h-full bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 rounded-full transition-all duration-700 ease-out relative"
                      style={{
                        width: `${
                          ((currentStep - 1) / (steps.length - 1)) * 100
                        }%`,
                      }}
                    >
                      {/* Shimmer Effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer rounded-full"></div>
                    </div>
                  </div>

                  {steps.map((step, index) => (
                    <div
                      key={step.id}
                      className="relative flex flex-col items-center group"
                    >
                      {/* Step Circle */}
                      <div
                        className={`relative w-16 h-16 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-500 transform group-hover:scale-110 ${
                          currentStep >= step.id
                            ? "bg-gradient-to-br from-white to-gray-200 text-black shadow-lg shadow-white/20"
                            : currentStep === step.id
                            ? "bg-gradient-to-br from-blue-500 to-purple-500 text-white shadow-lg shadow-blue-500/30 animate-pulse"
                            : "bg-black border-2 border-white/20 text-gray-400 hover:border-white/40"
                        }`}
                      >
                        {currentStep > step.id ? (
                          <div className="relative">
                            <svg
                              className="w-7 h-7"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={3}
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                            {/* Success Glow */}
                            <div className="absolute inset-0 bg-gradient-to-br from-green-400/20 to-emerald-500/20 rounded-full animate-ping"></div>
                          </div>
                        ) : (
                          <span className="relative z-10">{step.id}</span>
                        )}

                        {/* Active Step Glow */}
                        {currentStep === step.id && (
                          <div className="absolute inset-0 bg-gradient-to-br from-blue-400/30 to-purple-500/30 rounded-full animate-ping"></div>
                        )}
                      </div>

                      {/* Step Info */}
                      <div className="absolute top-20 text-center min-w-max">
                        <h4
                          className={`text-sm font-semibold mb-1 transition-all duration-300 ${
                            currentStep >= step.id
                              ? "text-white"
                              : "text-gray-500"
                          }`}
                        >
                          {step.title}
                        </h4>
                        <p
                          className={`text-xs transition-all duration-300 ${
                            currentStep >= step.id
                              ? "text-gray-300"
                              : "text-gray-600"
                          }`}
                        >
                          {step.description}
                        </p>
                      </div>

                      {/* Floating Particles for Active Step */}
                      {currentStep === step.id && (
                        <>
                          {[...Array(6)].map((_, i) => (
                            <div
                              key={i}
                              className="absolute w-1 h-1 bg-white/60 rounded-full animate-float-around"
                              style={{
                                left: `${20 + i * 8}px`,
                                top: `${10 + (i % 3) * 8}px`,
                                animationDelay: `${i * 0.3}s`,
                                animationDuration: `${2 + i * 0.2}s`,
                              }}
                            />
                          ))}
                        </>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Outer Glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/10 to-pink-500/5 rounded-full blur-xl"></div>
            </div>
          </div>

          {/* Custom CSS for new animations */}
          <style jsx>{`
            @keyframes shimmer {
              0% {
                transform: translateX(-100%);
              }
              100% {
                transform: translateX(200%);
              }
            }

            @keyframes float-around {
              0%,
              100% {
                transform: translateY(0px) translateX(0px) opacity(0.3);
                scale: 1;
              }
              25% {
                transform: translateY(-8px) translateX(4px) opacity(1);
                scale: 1.2;
              }
              50% {
                transform: translateY(0px) translateX(8px) opacity(0.6);
                scale: 0.8;
              }
              75% {
                transform: translateY(-6px) translateX(-2px) opacity(1);
                scale: 1.1;
              }
            }

            .animate-shimmer {
              animation: shimmer 2s ease-out infinite;
            }

            .animate-float-around {
              animation: float-around linear infinite;
            }

            .bg-gradient-radial {
              background: radial-gradient(circle, var(--tw-gradient-stops));
            }
          `}</style>

          {/* Form Container */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition-all duration-300">
            {/* Step 1: Personal Info */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Username
                  </label>
                  <input
                    type="text"
                    value={formData.username}
                    onChange={(e) =>
                      handleInputChange("username", e.target.value)
                    }
                    className={`w-full px-4 py-3 bg-black/50 border rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-white/20 focus:border-white/40 transition-all duration-300 ${
                      errors.username
                        ? "border-red-500 ring-2 ring-red-500/20"
                        : "border-white/20"
                    }`}
                    placeholder="Enter your username"
                  />
                  {errors.username && (
                    <p className="mt-1 text-sm text-red-400">
                      {errors.username}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Title
                  </label>
                  <select
                    value={formData.firstname}
                    onChange={(e) =>
                      handleInputChange("firstname", e.target.value)
                    }
                    className={`w-full px-4 py-3 bg-black/50 border rounded-xl text-white focus:ring-2 focus:ring-white/20 focus:border-white/40 transition-all duration-300 ${
                      errors.firstname
                        ? "border-red-500 ring-2 ring-red-500/20"
                        : "border-white/20"
                    }`}
                  >
                    <option value="">Select title</option>
                    <option value="นาย">Mr.</option>
                    <option value="นางสาว">Ms.</option>
                    <option value="นาง">Mrs.</option>
                  </select>
                  {errors.firstname && (
                    <p className="mt-1 text-sm text-red-400">
                      {errors.firstname}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      value={formData.fullname}
                      onChange={(e) =>
                        handleInputChange("fullname", e.target.value)
                      }
                      className={`w-full px-4 py-3 bg-black/50 border rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-white/20 focus:border-white/40 transition-all duration-300 ${
                        errors.fullname
                          ? "border-red-500 ring-2 ring-red-500/20"
                          : "border-white/20"
                      }`}
                      placeholder="First name"
                    />
                    {errors.fullname && (
                      <p className="mt-1 text-sm text-red-400">
                        {errors.fullname}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      value={formData.lastname}
                      onChange={(e) =>
                        handleInputChange("lastname", e.target.value)
                      }
                      className={`w-full px-4 py-3 bg-black/50 border rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-white/20 focus:border-white/40 transition-all duration-300 ${
                        errors.lastname
                          ? "border-red-500 ring-2 ring-red-500/20"
                          : "border-white/20"
                      }`}
                      placeholder="Last name"
                    />
                    {errors.lastname && (
                      <p className="mt-1 text-sm text-red-400">
                        {errors.lastname}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Address & Details */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Address
                  </label>
                  <textarea
                    value={formData.address}
                    onChange={(e) =>
                      handleInputChange("address", e.target.value)
                    }
                    rows={4}
                    className={`w-full px-4 py-3 bg-black/50 border rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-white/20 focus:border-white/40 transition-all duration-300 resize-none ${
                      errors.address
                        ? "border-red-500 ring-2 ring-red-500/20"
                        : "border-white/20"
                    }`}
                    placeholder="Enter your address"
                  />
                  {errors.address && (
                    <p className="mt-1 text-sm text-red-400">
                      {errors.address}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-4">
                    Gender
                  </label>
                  <div className="flex space-x-6">
                    {["ชาย", "หญิง"].map((gender) => (
                      <label
                        key={gender}
                        className="flex items-center cursor-pointer group"
                      >
                        <input
                          type="radio"
                          name="sex"
                          value={gender}
                          checked={formData.sex === gender}
                          onChange={(e) =>
                            handleInputChange("sex", e.target.value)
                          }
                          className="sr-only"
                        />
                        <div
                          className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center transition-all duration-300 ${
                            formData.sex === gender
                              ? "border-white bg-white"
                              : "border-white/40 group-hover:border-white/60"
                          }`}
                        >
                          {formData.sex === gender && (
                            <div className="w-2 h-2 rounded-full bg-black"></div>
                          )}
                        </div>
                        <span
                          className={`transition-colors duration-300 ${
                            formData.sex === gender
                              ? "text-white"
                              : "text-gray-400 group-hover:text-gray-300"
                          }`}
                        >
                          {gender === "ชาย" ? "Male" : "Female"}
                        </span>
                      </label>
                    ))}
                  </div>
                  {errors.sex && (
                    <p className="mt-2 text-sm text-red-400">{errors.sex}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Birthday
                  </label>
                  <input
                    type="date"
                    value={formData.birthday}
                    onChange={(e) =>
                      handleInputChange("birthday", e.target.value)
                    }
                    className={`w-full px-4 py-3 bg-black/50 border rounded-xl text-white focus:ring-2 focus:ring-white/20 focus:border-white/40 transition-all duration-300 ${
                      errors.birthday
                        ? "border-red-500 ring-2 ring-red-500/20"
                        : "border-white/20"
                    }`}
                  />
                  {errors.birthday && (
                    <p className="mt-1 text-sm text-red-400">
                      {errors.birthday}
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Step 3: Security */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    value={formData.password}
                    onChange={(e) =>
                      handleInputChange("password", e.target.value)
                    }
                    className={`w-full px-4 py-3 bg-black/50 border rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-white/20 focus:border-white/40 transition-all duration-300 ${
                      errors.password
                        ? "border-red-500 ring-2 ring-red-500/20"
                        : "border-white/20"
                    }`}
                    placeholder="Enter your password"
                  />
                  {errors.password && (
                    <p className="mt-1 text-sm text-red-400">
                      {errors.password}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(e) =>
                      handleInputChange("confirmPassword", e.target.value)
                    }
                    className={`w-full px-4 py-3 bg-black/50 border rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-white/20 focus:border-white/40 transition-all duration-300 ${
                      errors.confirmPassword
                        ? "border-red-500 ring-2 ring-red-500/20"
                        : "border-white/20"
                    }`}
                    placeholder="Confirm your password"
                  />
                  {errors.confirmPassword && (
                    <p className="mt-1 text-sm text-red-400">
                      {errors.confirmPassword}
                    </p>
                  )}
                </div>

                {errors.submit && (
                  <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
                    <p className="text-red-400 text-sm">{errors.submit}</p>
                  </div>
                )}
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8 pt-6 border-t border-white/10">
              <button
                onClick={handlePrevious}
                disabled={currentStep === 1}
                className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                  currentStep === 1
                    ? "bg-white/5 text-gray-500 cursor-not-allowed"
                    : "bg-white/10 text-white hover:bg-white/20 border border-white/20 hover:border-white/40"
                }`}
              >
                Previous
              </button>

              {currentStep < 3 ? (
                <button
                  onClick={handleNext}
                  className="px-8 py-3 bg-white text-black rounded-xl font-medium hover:bg-gray-200 transition-all duration-300 transform hover:scale-105"
                >
                  Next Step
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="px-8 py-3 bg-white text-black rounded-xl font-medium hover:bg-gray-200 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <div className="flex items-center">
                      <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin mr-2"></div>
                      Creating...
                    </div>
                  ) : (
                    "Register"
                  )}
                </button>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="text-center mt-8">
            <p className="text-gray-500">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-white hover:text-gray-300 cursor-pointer underline transition-colors duration-300"
              >
                login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
