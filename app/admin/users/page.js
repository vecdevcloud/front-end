"use client";

import { useState, useEffect, useRef } from "react";
import * as THREE from "three";
import { useRouter } from "next/navigation";

export default function Users() {
  const mountRef = useRef(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState(null);
  const [editingUser, setEditingUser] = useState(null);
  const [editData, setEditData] = useState({});
  const [updateLoading, setUpdateLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("username");
  const [sortOrder, setSortOrder] = useState("asc");
  const router = useRouter();

  // 3D Background Setup
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }

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
    ];

    for (let i = 0; i < 10; i++) {
      const geometry =
        geometries[Math.floor(Math.random() * geometries.length)];
      const material = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        opacity: 0.03,
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
        shape.rotation.x += 0.003 + i * 0.0005;
        shape.rotation.y += 0.002 + i * 0.0005;
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

  // Fetch users
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        "https://backend-nextjs-virid.vercel.app/api/users"
      );
      if (response.ok) {
        const data = await response.json();
        setUsers(data);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (userId) => {
    if (!confirm("Are you sure you want to delete this user?")) return;

    try {
      setDeleteLoading(userId);
      const response = await fetch(
        `https://backend-nextjs-virid.vercel.app/api/users/${userId}`,
        { method: "DELETE" }
      );

      if (response.ok) {
        setUsers(users.filter((user) => user.id !== userId));
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    } finally {
      setDeleteLoading(null);
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user.id);
    setEditData({
      id: user.id,
      username: user.username,
      firstname: user.firstname,
      fullname: user.fullname,
      lastname: user.lastname,
      address: user.address,
      sex: user.sex,
      birthday: user.birthday,
    });
  };

  const handleUpdate = async () => {
    try {
      setUpdateLoading(true);
      const response = await fetch(
        "https://backend-nextjs-virid.vercel.app/api/users",
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(editData),
        }
      );

      if (response.ok) {
        const updatedUser = await response.json();
        setUsers(
          users.map((user) =>
            user.id === editData.id ? { ...user, ...editData } : user
          )
        );
        setEditingUser(null);
        setEditData({});
      }
    } catch (error) {
      console.error("Error updating user:", error);
    } finally {
      setUpdateLoading(false);
    }
  };

  const filteredUsers = users
    .filter(
      (user) =>
        user.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.fullname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.lastname?.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      const aValue = a[sortBy]?.toString().toLowerCase() || "";
      const bValue = b[sortBy]?.toString().toLowerCase() || "";
      if (sortOrder === "asc") {
        return aValue.localeCompare(bValue);
      }
      return bValue.localeCompare(aValue);
    });

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* 3D Background */}
      <div ref={mountRef} className="fixed inset-0 pointer-events-none z-0" />

      <div className="relative z-10 min-h-screen px-6 py-12">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16 mt-16">
            <div className="inline-flex items-center px-4 py-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full mb-8 group hover:bg-white/10 transition-all duration-300">
              <div className="w-2 h-2 bg-blue-400 rounded-full mr-3 animate-pulse"></div>
              <span className="text-sm text-gray-300 group-hover:text-white transition-colors duration-300">
                User Management System
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-b from-white via-gray-200 to-gray-500 bg-clip-text text-transparent">
              User{" "}
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Management
              </span>
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Manage and monitor all registered users in your system
            </p>
          </div>

          {/* Controls */}
          <div className="mb-8">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
              <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
                {/* Search */}
                <div className="relative flex-1 max-w-md">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg
                      className="w-5 h-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </div>
                  <input
                    type="text"
                    placeholder="Search users..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-black/50 border border-white/20 rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-white/20 focus:border-white/40 transition-all duration-300"
                  />
                </div>

                {/* Sort Controls */}
                <div className="flex gap-3">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-4 py-3 bg-black/50 border border-white/20 rounded-xl text-white focus:ring-2 focus:ring-white/20 focus:border-white/40 transition-all duration-300"
                  >
                    <option value="username">Username</option>
                    <option value="fullname">First Name</option>
                    <option value="lastname">Last Name</option>
                    <option value="created_at">Created Date</option>
                  </select>

                  <button
                    onClick={() =>
                      setSortOrder(sortOrder === "asc" ? "desc" : "asc")
                    }
                    className="px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white hover:bg-white/20 transition-all duration-300"
                  >
                    {sortOrder === "asc" ? "↑" : "↓"}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 group hover:bg-white/15 transition-all duration-300">
              <div className="text-3xl font-bold text-white group-hover:text-blue-400 transition-colors duration-300">
                {users.length}
              </div>
              <div className="text-gray-400 mt-1">Total Users</div>
            </div>
            <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 group hover:bg-blue-500/20 transition-all duration-300">
              <div className="text-3xl font-bold text-white group-hover:text-blue-400 transition-colors duration-300">
                {filteredUsers.length}
              </div>
              <div className="text-gray-400 mt-1">Filtered Results</div>
            </div>
            <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 group hover:bg-purple-500/20 transition-all duration-300">
              <div className="text-3xl font-bold text-white group-hover:text-purple-400 transition-colors duration-300">
                {users.filter((u) => u.sex === "ชาย").length}
              </div>
              <div className="text-gray-400 mt-1">Male Users</div>
            </div>
          </div>

          {/* Users Grid */}
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="relative">
                <div className="w-16 h-16 border-4 border-white/10 border-t-white rounded-full animate-spin"></div>
                <div
                  className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-blue-400 rounded-full animate-spin"
                  style={{ animationDelay: "0.15s" }}
                ></div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredUsers.map((user, index) => (
                <div
                  key={user.id}
                  className="group relative"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-white/20 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-white/10">
                    {/* User Avatar */}
                    <div className="flex items-center mb-6">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white font-bold text-xl mr-4">
                        {user.fullname?.charAt(0)}
                        {user.lastname?.charAt(0)}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors duration-300">
                          @{user.username}
                        </h3>
                        <p className="text-gray-400 text-sm">
                          {user.firstname} {user.fullname} {user.lastname}
                        </p>
                      </div>
                    </div>

                    {/* User Details */}
                    <div className="space-y-3 mb-6">
                      <div className="flex items-center text-sm">
                        <div className="w-2 h-2 bg-gray-400 rounded-full mr-3"></div>
                        <span className="text-gray-400">Gender:</span>
                        <span className="text-white ml-2">
                          {user.sex === "ชาย" ? "Male" : "Female"}
                        </span>
                      </div>

                      <div className="flex items-center text-sm">
                        <div className="w-2 h-2 bg-gray-400 rounded-full mr-3"></div>
                        <span className="text-gray-400">Birthday:</span>
                        <span className="text-white ml-2">
                          {user.birthday
                            ? new Date(user.birthday).toLocaleDateString()
                            : "N/A"}
                        </span>
                      </div>

                      <div className="flex items-start text-sm">
                        <div className="w-2 h-2 bg-gray-400 rounded-full mr-3 mt-1"></div>
                        <span className="text-gray-400">Address:</span>
                        <span className="text-white ml-2 line-clamp-2">
                          {user.address || "N/A"}
                        </span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(user)}
                        className="flex-1 px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white hover:bg-white/20 hover:border-white/40 transition-all duration-300 text-sm font-medium"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(user.id)}
                        disabled={deleteLoading === user.id}
                        className="px-4 py-2 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 hover:bg-red-500/20 hover:border-red-500/40 transition-all duration-300 text-sm font-medium disabled:opacity-50"
                      >
                        {deleteLoading === user.id ? (
                          <div className="w-4 h-4 border-2 border-red-400/30 border-t-red-400 rounded-full animate-spin"></div>
                        ) : (
                          "Delete"
                        )}
                      </button>
                    </div>

                    {/* Hover Effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {filteredUsers.length === 0 && !loading && (
            <div className="text-center py-20">
              <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-12 h-12 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">
                No Users Found
              </h3>
              <p className="text-gray-400">
                Try adjusting your search criteria
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Edit Modal */}
      {editingUser && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6">
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-3xl font-bold text-white mb-8">Edit User</h2>

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Username
                  </label>
                  <input
                    type="text"
                    value={editData.username || ""}
                    onChange={(e) =>
                      setEditData({ ...editData, username: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-black/50 border border-white/20 rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-white/20 focus:border-white/40 transition-all duration-300"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Title
                  </label>
                  <select
                    value={editData.firstname || ""}
                    onChange={(e) =>
                      setEditData({ ...editData, firstname: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-black/50 border border-white/20 rounded-xl text-white focus:ring-2 focus:ring-white/20 focus:border-white/40 transition-all duration-300"
                  >
                    <option value="นาย">Mr.</option>
                    <option value="นางสาว">Ms.</option>
                    <option value="นาง">Mrs.</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    value={editData.fullname || ""}
                    onChange={(e) =>
                      setEditData({ ...editData, fullname: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-black/50 border border-white/20 rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-white/20 focus:border-white/40 transition-all duration-300"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    value={editData.lastname || ""}
                    onChange={(e) =>
                      setEditData({ ...editData, lastname: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-black/50 border border-white/20 rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-white/20 focus:border-white/40 transition-all duration-300"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Address
                </label>
                <textarea
                  value={editData.address || ""}
                  onChange={(e) =>
                    setEditData({ ...editData, address: e.target.value })
                  }
                  rows={3}
                  className="w-full px-4 py-3 bg-black/50 border border-white/20 rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-white/20 focus:border-white/40 transition-all duration-300 resize-none"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-4">
                    Gender
                  </label>
                  <div className="flex gap-6">
                    {["ชาย", "หญิง"].map((gender) => (
                      <label
                        key={gender}
                        className="flex items-center cursor-pointer group"
                      >
                        <input
                          type="radio"
                          name="editSex"
                          value={gender}
                          checked={editData.sex === gender}
                          onChange={(e) =>
                            setEditData({ ...editData, sex: e.target.value })
                          }
                          className="sr-only"
                        />
                        <div
                          className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center transition-all duration-300 ${
                            editData.sex === gender
                              ? "border-white bg-white"
                              : "border-white/40 group-hover:border-white/60"
                          }`}
                        >
                          {editData.sex === gender && (
                            <div className="w-2 h-2 rounded-full bg-black"></div>
                          )}
                        </div>
                        <span
                          className={`transition-colors duration-300 ${
                            editData.sex === gender
                              ? "text-white"
                              : "text-gray-400 group-hover:text-gray-300"
                          }`}
                        >
                          {gender === "ชาย" ? "Male" : "Female"}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Birthday
                  </label>
                  <input
                    type="date"
                    value={editData.birthday || ""}
                    onChange={(e) =>
                      setEditData({ ...editData, birthday: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-black/50 border border-white/20 rounded-xl text-white focus:ring-2 focus:ring-white/20 focus:border-white/40 transition-all duration-300"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-4 mt-8">
              <button
                onClick={() => {
                  setEditingUser(null);
                  setEditData({});
                }}
                className="px-6 py-3 bg-white/10 border border-white/20 rounded-xl text-white hover:bg-white/20 transition-all duration-300"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                disabled={updateLoading}
                className="px-6 py-3 bg-white text-black rounded-xl font-medium hover:bg-gray-200 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {updateLoading ? (
                  <div className="flex items-center">
                    <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin mr-2"></div>
                    Updating...
                  </div>
                ) : (
                  "Update User"
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
            opacity: 0.3;
          }
          50% {
            transform: translateY(-10px);
            opacity: 1;
          }
        }

        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        @media (prefers-reduced-motion: no-preference) {
          .animate-fade-in {
            animation: fadeIn 0.6s ease-out forwards;
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
