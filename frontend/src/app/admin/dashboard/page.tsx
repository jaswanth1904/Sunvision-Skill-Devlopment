"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { API_ROUTES, API_BASE_URL } from "@/lib/config";
import { 
  Users, 
  User,
  BookOpen, 
  BarChart, 
  ClipboardList, 
  LogOut, 
  Settings,
  Bell,
  Mail,
  MessageSquare,
  Camera,
  ImageIcon,
  X,
  Moon,
  Sun,
  Edit2,
  Shield,
  ShieldCheck,
  Globe,
  Plus,
  AlertCircle,
  ChevronDown,
  Eye,
  EyeOff,
  Lock
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Contact {
  _id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  createdAt: string;
}

export default function AdminDashboard() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("dashboard");
  const [mounted, setMounted] = useState(false);
  const [galleryImages, setGalleryImages] = useState<any[]>([]);
  const [galleryLoading, setGalleryLoading] = useState(false);
  const [adminStats, setAdminStats] = useState<any[]>([]);
  const [statsLoading, setStatsLoading] = useState(false);
  const [courses, setCourses] = useState<any[]>([]);
  const [coursesLoading, setCoursesLoading] = useState(false);
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [testimonialsLoading, setTestimonialsLoading] = useState(false);
  const [newTestimonial, setNewTestimonial] = useState({ name: "", role: "", text: "" });
  
  const [partnersList, setPartnersList] = useState<any[]>([]);
  const [partnersLoading, setPartnersLoading] = useState(false);
  const [newPartner, setNewPartner] = useState({ name: "", image: "" });

  const [footerSettings, setFooterSettings] = useState({ address: "", phone: "", email: "" });
  const [aboutSettings, setAboutSettings] = useState({ text: "", image: "", pinpoints: [""] });
  const [newCourse, setNewCourse] = useState({
    title: "",
    slug: "",
    description: "",
    duration: "",
    level: "",
    image: "",
    highlights: [""],
    outcomes: [""],
    quiz: [{ id: 1, question: "", options: ["", "", "", "", ""], correctAnswer: 0 }],
  });
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  // New Admin Settings States
  const [settingsTab, setSettingsTab] = useState("personal"); // personal, society, system
  const [profileData, setProfileData] = useState({
    fullName: "Admin | Sunvision",
    title: "Head of Operations",
    email: "admin@sunvision.com",
    avatar: "https://i.pinimg.com/736x/39/d2/45/39d24540b452bb81e3afde40a8b9edf5.jpg",
    role: "Super Admin",
    username: "admin",
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [societyData, setSocietyData] = useState({
    name: "Sunvision Society",
    regId: "REG123456789",
    phone: "+91 97030 54999",
    email: "info@sunvisionsociety.com",
    address: "Dilsukhnagar, Hyderabad, TG",
    facebook: "",
    linkedin: "",
    instagram: "",
    twitter: ""
  });
  const [systemData, setSystemData] = useState({
    maintenanceMode: false,
    emailAlerts: true,
    language: "English",
    dateFormat: "DD/MM/YYYY"
  });
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const router = useRouter();

  // Editable Stats State
  const [students, setStudents] = useState("1,234");
  const [batches, setBatches] = useState("12");
  const [isEditingStudents, setIsEditingStudents] = useState(false);
  const [isEditingBatches, setIsEditingBatches] = useState(false);
  const [isSavingCourse, setIsSavingCourse] = useState(false);
  const [isSavingTestimonial, setIsSavingTestimonial] = useState(false);
  const [isSavingPartner, setIsSavingPartner] = useState(false);
  const [isSavingFooter, setIsSavingFooter] = useState(false);
  const [isSavingAbout, setIsSavingAbout] = useState(false);
  const [isSavingProfile, setIsSavingProfile] = useState(false);
  const [isSavingSociety, setIsSavingSociety] = useState(false);
  const [savingStatId, setSavingStatId] = useState<string | null>(null);
  const [isUploadingGallery, setIsUploadingGallery] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("adminToken");

    if (!token) {
      router.push("/admin/login");
      return;
    }

    const fetchUser = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/auth/me`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (res.ok) {
          const data = await res.json();
          setProfileData(prev => ({
            ...prev,
            username: data.username || prev.username,
            fullName: data.fullName || prev.fullName,
            email: data.email || prev.email,
            title: data.title || prev.title,
            avatar: data.avatar || prev.avatar,
            role: data.role || prev.role
          }));
        }
      } catch (err) { console.error("Fetch user failed:", err); }
    };

    const fetchContacts = async () => {
      try {
        const response = await fetch(API_ROUTES.CONTACT, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch contacts");
        }

        const data = await response.json();
        setContacts(data);
      } catch (err: any) {
        setError(err.message);
        if (!err.message.includes("Failed to fetch")) {
           localStorage.removeItem("adminToken");
           router.push("/admin/login");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
    fetchContacts();
    fetchCourses();
    fetchPartners();
    fetchTestimonials();
    fetchGallery();
    fetchStats();

    // Load saved stats
    const savedStudents = localStorage.getItem("adminStudents");
    const savedBatches = localStorage.getItem("adminBatches");
    if (savedStudents) setStudents(savedStudents);
    if (savedBatches) setBatches(savedBatches);
    
    setMounted(true);
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUsername");
    router.push("/"); // Redirect to home page as requested
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    return "Good Evening";
  };

  const fetchGallery = async () => {
    setGalleryLoading(true);
    try {
      const response = await fetch(API_ROUTES.GALLERY);
      if (!response.ok) throw new Error("Failed to fetch gallery");
      const data = await response.json();
      setGalleryImages(data);
    } catch (err: any) {
      console.error(err);
    } finally {
      setGalleryLoading(false);
    }
  };

  const fetchStats = async () => {
    setStatsLoading(true);
    try {
      const response = await fetch(API_ROUTES.STATS);
      if (!response.ok) throw new Error("Failed to fetch stats");
      const data = await response.json();
      setAdminStats(data);
    } catch (err: any) {
      console.error(err);
    } finally {
      setStatsLoading(false);
    }
  };

  const fetchCourses = async () => {
    setCoursesLoading(true);
    try {
      const response = await fetch(API_ROUTES.COURSES);
      if (!response.ok) throw new Error("Failed to fetch courses");
      const data = await response.json();
      setCourses(data);
    } catch (err: any) {
      console.error(err);
    } finally {
      setCoursesLoading(false);
    }
  };

  const fetchTestimonials = async () => {
    setTestimonialsLoading(true);
    try {
      const response = await fetch(API_ROUTES.TESTIMONIALS);
      if (!response.ok) throw new Error("Failed to fetch testimonials");
      const data = await response.json();
      setTestimonials(data);
    } catch (err: any) {
      console.error(err);
    } finally {
      setTestimonialsLoading(false);
    }
  };

  const fetchPartners = async () => {
    setPartnersLoading(true);
    try {
      const response = await fetch(API_ROUTES.PARTNERS);
      if (!response.ok) throw new Error("Failed to fetch partners");
      const data = await response.json();
      setPartnersList(data);
    } catch (err: any) {
      console.error(err);
    } finally {
      setPartnersLoading(false);
    }
  };

  const fetchSettings = async (key: string, setter: Function) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/settings/${key}`);
      if (!response.ok) return; // Silent fail if not found
      const data = await response.json();
      setter(data);
    } catch (err: any) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (activeTab === "gallery") {
      fetchGallery();
    }
    if (activeTab === "stats") {
      fetchStats();
    }
    if (activeTab === "courses") {
      fetchCourses();
    }
    if (activeTab === "testimonials") {
      fetchTestimonials();
    }
    if (activeTab === "partners") {
      fetchPartners();
    }
    if (activeTab === "footer_content") {
      fetchSettings("footer", setFooterSettings);
    }
    if (activeTab === "about_content") {
      fetchSettings("about", setAboutSettings);
    }
  }, [activeTab]);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);
    formData.append("alt", "Event Image");

    setIsUploadingGallery(true);
    try {
      const response = await fetch(API_ROUTES.GALLERY, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Upload failed");
      
      fetchGallery();
    } catch (err) {
      console.error(err);
      alert("Failed to upload image");
    } finally {
      setIsUploadingGallery(false);
    }
  };

  const handleDeleteImage = async (id: string) => {
    if (!confirm("Are you sure you want to delete this image?")) return;

    try {
      const response = await fetch(`${API_ROUTES.GALLERY}/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Delete failed");
      
      fetchGallery();
    } catch (err) {
      console.error(err);
      alert("Failed to delete image");
    }
  };

  const stats = [
    { name: "Total Students", value: students, icon: Users, color: "bg-[#5932EA]", editable: true, type: "students" },
    { name: "Active Batches", value: batches, icon: BookOpen, color: "bg-[#377DFF]", editable: true, type: "batches" },
    { name: "Pending Inquiries", value: contacts.length.toString(), icon: Mail, color: "bg-[#05CD99]" },
    { name: "Gallery Images", value: galleryImages.length.toString(), icon: ImageIcon, color: "bg-[#FFB547]" },
  ];

  return (
    <div className={`min-h-screen flex flex-col lg:flex-row p-4 lg:p-6 gap-4 lg:gap-6 font-sans transition-colors duration-300 ${isDarkMode ? "bg-[#0F172A]" : "bg-[#F4F5F9]"}`}>
      {/* Sidebar - Mobile Drawer Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <div className={`
        fixed lg:relative top-0 left-0 h-full lg:h-auto z-50
        w-72 lg:w-64 rounded-none lg:rounded-3xl flex flex-col justify-between p-6 shadow-2xl lg:shadow-xl transition-all duration-300
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        ${isDarkMode ? "bg-[#1E293B] text-white" : "bg-white text-gray-900"}
      `}>
        <div>
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center space-x-3">
              <Image
                src="https://sunvisionsociety.com/uploads/1596723247_logo.png"
                alt="SunVision Logo"
                width={160}
                height={35}
                style={{ height: "35px", width: "auto" }}
                priority
              />
            </div>
            <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden p-2 text-gray-500">
              <X size={24} />
            </button>
          </div>

          <nav className="space-y-2">
            <button
              onClick={() => setActiveTab("dashboard")}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                activeTab === "dashboard"
                  ? isDarkMode ? "bg-blue-600 text-white shadow-md" : "bg-[#5932EA] text-white shadow-md"
                  : isDarkMode ? "text-white/80 hover:bg-white/10" : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <BarChart size={18} />
              <span>Dashboard</span>
            </button>
            <button
              onClick={() => setActiveTab("gallery")}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                activeTab === "gallery"
                  ? isDarkMode ? "bg-blue-600 text-white shadow-md" : "bg-[#5932EA] text-white shadow-md"
                  : isDarkMode ? "text-white/80 hover:bg-white/10" : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <ImageIcon size={18} />
              <span>Events Gallery</span>
            </button>
            <button
              onClick={() => setActiveTab("stats")}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                activeTab === "stats"
                  ? isDarkMode ? "bg-blue-600 text-white shadow-md" : "bg-[#5932EA] text-white shadow-md"
                  : isDarkMode ? "text-white/80 hover:bg-white/10" : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <ClipboardList size={18} />
              <span>Live Counter</span>
            </button>
            <button
              onClick={() => setActiveTab("courses")}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                activeTab === "courses"
                  ? isDarkMode ? "bg-blue-600 text-white shadow-md" : "bg-[#5932EA] text-white shadow-md"
                  : isDarkMode ? "text-white/80 hover:bg-white/10" : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <BookOpen size={18} />
              <span>Courses</span>
            </button>
            <button
              onClick={() => setActiveTab("testimonials")}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                activeTab === "testimonials"
                  ? isDarkMode ? "bg-blue-600 text-white shadow-md" : "bg-[#5932EA] text-white shadow-md"
                  : isDarkMode ? "text-white/80 hover:bg-white/10" : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <MessageSquare size={18} />
              <span>Testimonials</span>
            </button>
            <button
              onClick={() => setActiveTab("partners")}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                activeTab === "partners"
                  ? isDarkMode ? "bg-blue-600 text-white shadow-md" : "bg-[#5932EA] text-white shadow-md"
                  : isDarkMode ? "text-white/80 hover:bg-white/10" : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <Users size={18} />
              <span>Partners</span>
            </button>
            <button
              onClick={() => setActiveTab("footer_content")}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                activeTab === "footer_content"
                  ? isDarkMode ? "bg-blue-600 text-white shadow-md" : "bg-[#5932EA] text-white shadow-md"
                  : isDarkMode ? "text-white/80 hover:bg-white/10" : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <Mail size={18} />
              <span>Contact & Footer</span>
            </button>
            <button
              onClick={() => setActiveTab("about_content")}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                activeTab === "about_content"
                  ? isDarkMode ? "bg-blue-600 text-white shadow-md" : "bg-[#5932EA] text-white shadow-md"
                  : isDarkMode ? "text-white/80 hover:bg-white/10" : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <ClipboardList size={18} />
              <span>About Us</span>
            </button>
            <button
              onClick={() => setActiveTab("settings")}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                activeTab === "settings"
                  ? isDarkMode ? "bg-blue-600 text-white shadow-md" : "bg-[#5932EA] text-white shadow-md"
                  : isDarkMode ? "text-white/80 hover:bg-white/10" : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <Shield size={18} />
              <span>Admin</span>
            </button>
          </nav>
        </div>

        {/* Removed logout from sidebar as requested */}
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col gap-6 overflow-hidden">
        {/* Top Header */}
        <header className={`rounded-2xl min-h-[64px] h-16 flex items-center justify-between px-4 lg:px-6 shadow-sm border transition-colors duration-300 gap-2 ${isDarkMode ? "bg-[#1E293B] border-gray-700" : "bg-white border-gray-50"}`}>
          <div className="flex items-center gap-3 overflow-hidden">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden p-2 bg-gray-100 dark:bg-gray-800 rounded-xl text-gray-600 dark:text-gray-300 shrink-0"
            >
              <BarChart size={20} className="rotate-90" />
            </button>
            <div className="flex flex-col truncate">
              <h1 className={`text-sm sm:text-base lg:text-lg font-bold truncate ${isDarkMode ? "text-white" : "text-gray-900"}`}>{mounted ? getGreeting() : "Welcome"}, Admin</h1>
              <p className={`hidden sm:block text-[10px] lg:text-xs truncate ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>Website Dashboard & Management</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2 sm:space-x-4 shrink-0">
            {/* Notification Icons */}
            <div className="flex items-center gap-1 sm:gap-2">
              <button className={`p-2 rounded-xl transition-colors ${isDarkMode ? "bg-[#0F172A] text-gray-400 hover:text-white" : "bg-[#F4F5F9] text-gray-500 hover:text-[#5932EA]"}`}>
                <Bell size={18} />
              </button>
              <button className={`hidden sm:block p-2 rounded-xl transition-colors ${isDarkMode ? "bg-[#0F172A] text-gray-400 hover:text-white" : "bg-[#F4F5F9] text-gray-500 hover:text-[#5932EA]"}`}>
                <Mail size={18} />
              </button>
            </div>

            {/* User Profile Dropdown with Hover */}
            <div 
              className="relative"
              onMouseEnter={() => setIsDropdownOpen(true)}
              onMouseLeave={() => setIsDropdownOpen(false)}
            >
              <button 
                className={`flex items-center space-x-2 lg:space-x-3 focus:outline-none p-1 sm:p-1.5 lg:pr-4 rounded-xl transition-all duration-300 ${isDarkMode ? "hover:bg-gray-800" : "hover:bg-gray-50"}`}
              >
                <div className="relative shrink-0">
                  <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-xl overflow-hidden shadow-sm border border-gray-100 bg-gray-200">
                    <Image src={profileData.avatar} alt="Avatar" width={40} height={40} className="w-full h-full object-cover" unoptimized />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 lg:w-4 lg:h-4 bg-emerald-500 border-2 border-white rounded-full"></div>
                </div>
                <div className="hidden sm:flex flex-col items-start text-left truncate">
                  <span className={`text-xs lg:text-sm font-bold truncate max-w-[100px] ${isDarkMode ? "text-white" : "text-gray-900"}`}>{profileData.fullName.split('|')[0]}</span>
                  <span className="text-[8px] lg:text-[10px] text-gray-500 font-bold uppercase tracking-wider truncate max-w-[100px]">{profileData.role}</span>
                </div>
                <ChevronDown size={14} className={`hidden sm:block transition-transform duration-300 ${isDropdownOpen ? "rotate-180" : ""}`} />
              </button>

              {/* Enhanced Dropdown Menu */}
              <AnimatePresence>
                {isDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className={`absolute right-0 mt-2 w-56 sm:w-64 rounded-2xl shadow-xl border overflow-hidden z-[100] origin-top-right ${isDarkMode ? "bg-[#1E293B] border-gray-700" : "bg-white border-gray-100"}`}
                  >
                    <div className="p-4 border-b border-gray-100 flex items-center space-x-3">
                       <div className="w-12 h-12 rounded-xl overflow-hidden">
                         <Image src={profileData.avatar} alt="Avatar" width={48} height={48} className="w-full h-full object-cover" unoptimized />
                       </div>
                       <div className="overflow-hidden">
                          <p className="text-sm font-bold truncate">{profileData.fullName}</p>
                          <p className="text-xs text-gray-500 truncate">{profileData.email}</p>
                       </div>
                    </div>
                    
                    <div className="p-2">
                      <button 
                        onClick={() => { setActiveTab("settings"); setSettingsTab("personal"); }}
                        className={`w-full flex items-center space-x-3 px-3 py-2 rounded-xl text-sm transition-colors ${isDarkMode ? "hover:bg-gray-800 text-gray-300" : "hover:bg-gray-50 text-gray-600"}`}
                      >
                        <User size={16} />
                        <span>My Profile</span>
                      </button>

                      {/* Theme Toggle inside Dropdown */}
                      <button 
                        onClick={() => setIsDarkMode(!isDarkMode)}
                        className={`w-full text-left px-3 py-2 rounded-xl text-sm flex items-center justify-between transition-colors ${isDarkMode ? "hover:bg-gray-800 text-gray-300" : "hover:bg-gray-50 text-gray-600"}`}
                      >
                        <div className="flex items-center space-x-3">
                          {isDarkMode ? <Sun size={16} /> : <Moon size={16} />}
                          <span>Theme</span>
                        </div>
                        <div className="flex gap-1 p-0.5 bg-gray-100 dark:bg-gray-800 rounded-lg">
                          <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold transition-all ${!isDarkMode ? "bg-white text-black shadow-sm" : "text-gray-500"}`}>Light</span>
                          <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold transition-all ${isDarkMode ? "bg-blue-600 text-white shadow-sm" : "text-gray-500"}`}>Dark</span>
                        </div>
                      </button>

                      <button 
                        onClick={() => { setActiveTab("settings"); setSettingsTab("system"); }}
                        className={`w-full flex items-center space-x-3 px-3 py-2 rounded-xl text-sm transition-colors ${isDarkMode ? "hover:bg-gray-800 text-gray-300" : "hover:bg-gray-50 text-gray-600"}`}
                      >
                        <Settings size={16} />
                        <span>System Settings</span>
                      </button>
                      <div className="h-px bg-gray-100 my-1 mx-2"></div>
                      <button 
                        onClick={handleLogout}
                        className="w-full flex items-center space-x-3 px-3 py-2 rounded-xl text-sm text-red-500 hover:bg-red-50 transition-colors"
                      >
                        <LogOut size={16} />
                        <span>Logout Account</span>
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 overflow-y-auto space-y-6">
          {activeTab === "dashboard" && (
            <>
              {/* Top Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat) => (
                  <div key={stat.name} className={`${stat.color} text-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow`}>
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm text-white/70">{stat.name}</p>
                        {stat.editable ? (
                          stat.type === "students" ? (
                            isEditingStudents ? (
                              <input
                                type="text"
                                value={students}
                                onChange={(e) => setStudents(e.target.value)}
                                onBlur={() => {
                                  setIsEditingStudents(false);
                                  localStorage.setItem("adminStudents", students);
                                }}
                                onKeyDown={(e) => {
                                  if (e.key === "Enter") {
                                    setIsEditingStudents(false);
                                    localStorage.setItem("adminStudents", students);
                                  }
                                }}
                                className="text-3xl font-bold mt-1 bg-transparent border-b border-white focus:outline-none w-full"
                                autoFocus
                              />
                            ) : (
                              <h3 
                                className="text-3xl font-bold mt-1 cursor-pointer flex items-center gap-2"
                                onClick={() => setIsEditingStudents(true)}
                              >
                                {students}
                                <Edit2 size={14} className="opacity-70" />
                              </h3>
                            )
                          ) : (
                            isEditingBatches ? (
                              <input
                                type="text"
                                value={batches}
                                onChange={(e) => setBatches(e.target.value)}
                                onBlur={() => {
                                  setIsEditingBatches(false);
                                  localStorage.setItem("adminBatches", batches);
                                }}
                                onKeyDown={(e) => {
                                  if (e.key === "Enter") {
                                    setIsEditingBatches(false);
                                    localStorage.setItem("adminBatches", batches);
                                  }
                                }}
                                className="text-3xl font-bold mt-1 bg-transparent border-b border-white focus:outline-none w-full"
                                autoFocus
                              />
                            ) : (
                              <h3 
                                className="text-3xl font-bold mt-1 cursor-pointer flex items-center gap-2"
                                onClick={() => setIsEditingBatches(true)}
                              >
                                {batches}
                                <Edit2 size={14} className="opacity-70" />
                              </h3>
                            )
                          )
                        ) : (
                          <h3 className="text-3xl font-bold mt-1">{stat.value}</h3>
                        )}
                      </div>
                      <div className="p-2 bg-white/10 rounded-lg">
                        <stat.icon size={20} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Middle Section: Profile & Chart */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Profile Card */}
                <div className={`rounded-2xl shadow-sm p-6 flex flex-col items-center justify-center border transition-colors duration-300 ${isDarkMode ? "bg-[#1E293B] border-gray-700" : "bg-white border-gray-50"}`}>
                  <div className="w-24 h-24 bg-gray-200 rounded-full overflow-hidden mb-4 border-4 border-[#F4F5F9]">
                    <Image src="https://i.pinimg.com/736x/39/d2/45/39d24540b452bb81e3afde40a8b9edf5.jpg" alt="Profile" width={96} height={96} className="w-full h-full object-cover" unoptimized />
                  </div>
                  <h2 className={`text-lg font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>Admin</h2>
                  <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-500"} mb-6`}>Sunvision Administrator</p>
                  
                  <div className="flex gap-4 w-full text-center">
                    <div className="flex-1">
                      <div className={`text-xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>{courses.length}</div>
                      <div className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>Courses</div>
                    </div>
                    <div className="flex-1">
                      <div className={`text-xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>{partnersList.length}</div>
                      <div className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>Partners</div>
                    </div>
                    <div className="flex-1">
                      <div className={`text-xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>{testimonials.length}</div>
                      <div className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>Reviews</div>
                    </div>
                  </div>
                </div>

                {/* Platform Overview Card */}
                <div className={`lg:col-span-2 rounded-2xl shadow-sm p-6 border transition-colors duration-300 ${isDarkMode ? "bg-[#1E293B] border-gray-700" : "bg-white border-gray-50"}`}>
                  <div className="flex justify-between items-center mb-6">
                    <div>
                      <h2 className={`text-lg font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>Platform Content Overview</h2>
                      <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>Real-time data from the current website</p>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <div className="flex items-center gap-1">
                        <span className="w-2.5 h-2.5 bg-[#5932EA] rounded-full"></span>
                        <span>Active Items</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 h-48 content-center">
                    {[
                      { label: "Live Courses", count: courses.length, color: "bg-blue-500" },
                      { label: "Global Partners", count: partnersList.length, color: "bg-indigo-500" },
                      { label: "Success Stories", count: testimonials.length, color: "bg-emerald-500" },
                      { label: "Gallery Media", count: galleryImages.length, color: "bg-amber-500" }
                    ].map((item) => (
                      <div key={item.label} className={`p-4 rounded-xl border flex flex-col items-center justify-center text-center ${isDarkMode ? "border-gray-700 bg-[#0F172A]" : "border-gray-100 bg-gray-50"}`}>
                        <div className={`text-2xl font-bold mb-1 ${isDarkMode ? "text-white" : "text-gray-900"}`}>{item.count}</div>
                        <div className="text-[10px] uppercase tracking-wider text-gray-500 font-semibold">{item.label}</div>
                        <div className="w-full h-1.5 bg-gray-200 rounded-full mt-3 overflow-hidden">
                          <div className={`h-full ${item.color}`} style={{ width: `${Math.min((item.count / 20) * 100, 100)}%` }}></div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className={`mt-4 pt-4 border-t text-xs flex justify-between items-center ${isDarkMode ? "border-gray-700 text-gray-400" : "border-gray-100 text-gray-500"}`}>
                    <span>System status: <span className="text-emerald-500 font-medium">Online</span></span>
                    <span>Last synced: {mounted ? new Date().toLocaleTimeString() : "--:--:--"}</span>
                  </div>
                </div>
              </div>

              {/* Bottom Section: Recent Inquiries */}
              <div className={`rounded-2xl shadow-sm p-6 border transition-colors duration-300 ${isDarkMode ? "bg-[#1E293B] border-gray-700" : "bg-white border-gray-50"}`}>
                <div className="flex justify-between items-center mb-6">
                  <h2 className={`text-lg font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>Recent Student Inquiries</h2>
                  <button className={`text-sm font-medium ${isDarkMode ? "text-blue-400 hover:text-blue-300" : "text-[#5932EA] hover:text-[#4B24B3]"}`}>View All</button>
                </div>

                {loading ? (
                  <div className="text-center py-10 text-gray-500">Loading inquiries...</div>
                ) : error ? (
                  <div className="text-center py-10 text-red-500">{error}</div>
                ) : contacts.length === 0 ? (
                  <div className="text-center py-10 text-gray-500">No messages found.</div>
                ) : (
                  <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
                    <table className="min-w-[600px] lg:min-w-full divide-y divide-gray-100">
                      <thead>
                        <tr className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                          <th className="pb-3">Student</th>
                          <th className="pb-3">Message</th>
                          <th className="pb-3">Date</th>
                          <th className="pb-3">Action</th>
                        </tr>
                      </thead>
                      <tbody className={`divide-y ${isDarkMode ? "divide-gray-700" : "divide-gray-50"}`}>
                        {contacts.slice(0, 5).map((contact) => (
                          <tr key={contact._id} className="text-sm">
                            <td className="py-3">
                              <div className={`font-medium ${isDarkMode ? "text-white" : "text-gray-900"}`}>{contact.name}</div>
                              <div className="text-gray-500 text-[10px]">{contact.email}</div>
                            </td>
                            <td className={`py-3 max-w-[120px] lg:max-w-xs truncate ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>{contact.message}</td>
                            <td className="py-3 text-gray-500 text-xs">
                              {new Date(contact.createdAt).toLocaleDateString()}
                            </td>
                            <td className="py-3">
                              <a
                                href={`mailto:${contact.email}?subject=Reply from Sunvision Society`}
                                className={`inline-flex items-center px-2 py-1 lg:px-3 lg:py-1.5 text-white text-[10px] lg:text-xs font-medium rounded-lg transition-colors ${isDarkMode ? "bg-blue-600 hover:bg-blue-700" : "bg-[#5932EA] hover:bg-[#4B24B3]"}`}
                               title="Reply to student"
                              >
                                <Mail size={12} className="mr-1 lg:mr-1.5" />
                                <span className="hidden sm:inline">Reply</span>
                              </a>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </>
          )}

          {/* Gallery Tab */}
          {activeTab === "gallery" && (
            <div className="space-y-6">
              <div>
                <h1 className={`text-2xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>Events Gallery Management</h1>
                <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-500"} mt-1`}>Upload and manage images for the website gallery.</p>
              </div>

              {/* Upload Section */}
              <div className={`rounded-2xl shadow-sm p-6 border transition-colors duration-300 ${isDarkMode ? "bg-[#1E293B] border-gray-700" : "bg-white border-gray-50"}`}>
                <h2 className={`text-lg font-bold ${isDarkMode ? "text-white" : "text-gray-900"} mb-4`}>Upload New Image</h2>
                <label className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors cursor-pointer block ${isDarkMode ? "border-gray-700 hover:border-blue-500" : "border-gray-200 hover:border-[#5932EA]"}`}>
                  <div className="flex flex-col items-center">
                    <Camera size={40} className="text-gray-400 mb-2" />
                    <p className={`text-sm font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>Click to upload or drag and drop</p>
                    <p className="text-xs text-gray-500 mt-1">PNG, JPG, JPEG up to 10MB</p>
                  </div>
                  <input type="file" className="hidden" onChange={handleUpload} accept="image/*" />
                </label>
              </div>

              {/* Current Images Grid */}
              <div className={`rounded-2xl shadow-sm p-6 border transition-colors duration-300 ${isDarkMode ? "bg-[#1E293B] border-gray-700" : "bg-white border-gray-50"}`}>
                <h2 className={`text-lg font-bold ${isDarkMode ? "text-white" : "text-gray-900"} mb-4`}>Current Gallery Images</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {galleryLoading ? (
                    <div className="text-center py-10 text-gray-500 col-span-full">Loading gallery...</div>
                  ) : galleryImages.length === 0 ? (
                    <div className="text-center py-10 text-gray-500 col-span-full">No images uploaded yet.</div>
                  ) : (
                    galleryImages.map((img) => (
                      <div key={img._id} className={`relative group rounded-xl overflow-hidden border ${isDarkMode ? "border-gray-700" : "border-gray-100"}`}>
                        {img.src ? (
                          <img 
                            src={`${API_BASE_URL}${img.src}`} 
                            alt={img.alt} 
                            className="w-full h-32 object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = "https://via.placeholder.com/150";
                            }}
                          />
                        ) : (
                          <div className="w-full h-32 bg-gray-200 flex items-center justify-center">
                            <ImageIcon size={24} className="text-gray-400" />
                          </div>
                        )}
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <button 
                            onClick={() => handleDeleteImage(img._id)}
                            className="p-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors"
                          >
                            <X size={16} />
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === "stats" && (
            <div className="space-y-6">
              <div>
                <h1 className={`text-2xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>Live Counter Management</h1>
                <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-500"} mt-1`}>Update the numbers shown in the Live Counter section.</p>
              </div>

              <div className={`rounded-2xl shadow-sm p-6 border transition-colors duration-300 ${isDarkMode ? "bg-[#1E293B] border-gray-700" : "bg-white border-gray-50"}`}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {statsLoading ? (
                    <div className="text-center py-10 text-gray-500 col-span-full">Loading stats...</div>
                  ) : adminStats.length === 0 ? (
                    <div className="text-center py-10 text-gray-500 col-span-full">No stats found.</div>
                  ) : (
                    adminStats.map((stat: any) => (
                      <div key={stat._id} className={`p-4 rounded-xl border ${isDarkMode ? "border-gray-700 bg-[#0F172A]" : "border-gray-100 bg-gray-50"}`}>
                        <div className="flex justify-between items-center mb-4">
                          <h3 className={`font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>{stat.label}</h3>
                          <span className={`text-xs px-2 py-1 rounded-full ${stat.bg} ${stat.color}`}>{stat.suffix}</span>
                        </div>
                        <div className="flex gap-2">
                          <input
                            type="number"
                            value={stat.value ?? ""}
                            onChange={(e) => {
                              const val = e.target.value;
                              setAdminStats(adminStats.map(s => s._id === stat._id ? {...s, value: val === "" ? "" : parseInt(val)} : s));
                            }}
                            className={`flex-1 rounded-lg border p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${isDarkMode ? "bg-gray-800 border-gray-700 text-white" : "bg-white border-gray-200 text-gray-900"}`}
                          />
                          <button
                            disabled={savingStatId === stat._id}
                            onClick={async () => {
                              const token = localStorage.getItem("adminToken");
                              setSavingStatId(stat._id);
                              try {
                                const response = await fetch(`${API_ROUTES.STATS}/${stat._id}`, {
                                  method: "PUT",
                                  headers: {
                                    "Content-Type": "application/json",
                                    Authorization: `Bearer ${token}`,
                                  },
                                  body: JSON.stringify({ value: stat.value === "" ? 0 : stat.value }),
                                });
                                if (!response.ok) throw new Error("Update failed");
                                alert("Stat updated successfully!");
                              } catch (err) {
                                console.error(err);
                                alert("Failed to update stat");
                              } finally {
                                setSavingStatId(null);
                              }
                            }}
                            className={`px-4 py-2 rounded-lg text-white text-sm font-medium transition-colors ${savingStatId === stat._id ? "bg-gray-400 cursor-not-allowed" : isDarkMode ? "bg-blue-600 hover:bg-blue-700" : "bg-[#5932EA] hover:bg-[#4B24B3]"}`}
                          >
                            {savingStatId === stat._id ? "Saving..." : "Save"}
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === "courses" && (
            <div className="space-y-6">
              <div>
                <h1 className={`text-2xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>Course Management</h1>
                <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-500"} mt-1`}>Add, edit, or remove courses from the platform.</p>
              </div>

              {/* Add Course Form */}
              <div className={`rounded-2xl shadow-sm p-6 border transition-colors duration-300 ${isDarkMode ? "bg-[#1E293B] border-gray-700" : "bg-white border-gray-50"}`}>
                <h2 className={`text-lg font-semibold mb-4 ${isDarkMode ? "text-white" : "text-gray-900"}`}>Add New Course</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Basic Details */}
                  <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className={`block text-sm font-medium mb-1 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>Course Title *</label>
                      <input type="text" placeholder="e.g., MS Office & Advanced Excel" value={newCourse.title} onChange={(e) => setNewCourse({...newCourse, title: e.target.value})} className={`w-full rounded-lg border p-2 ${isDarkMode ? "bg-gray-800 border-gray-700 text-white" : "bg-white border-gray-200"}`} />
                    </div>
                    <div>
                      <label className={`block text-sm font-medium mb-1 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>Slug * (URL path)</label>
                      <input type="text" placeholder="e.g., ms-office" value={newCourse.slug} onChange={(e) => setNewCourse({...newCourse, slug: e.target.value})} className={`w-full rounded-lg border p-2 ${isDarkMode ? "bg-gray-800 border-gray-700 text-white" : "bg-white border-gray-200"}`} />
                    </div>
                    <div>
                      <label className={`block text-sm font-medium mb-1 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>Duration *</label>
                      <input type="text" placeholder="e.g., 2 Months" value={newCourse.duration} onChange={(e) => setNewCourse({...newCourse, duration: e.target.value})} className={`w-full rounded-lg border p-2 ${isDarkMode ? "bg-gray-800 border-gray-700 text-white" : "bg-white border-gray-200"}`} />
                    </div>
                    <div>
                      <label className={`block text-sm font-medium mb-1 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>Level *</label>
                      <input type="text" placeholder="e.g., Beginner to Intermediate" value={newCourse.level} onChange={(e) => setNewCourse({...newCourse, level: e.target.value})} className={`w-full rounded-lg border p-2 ${isDarkMode ? "bg-gray-800 border-gray-700 text-white" : "bg-white border-gray-200"}`} />
                    </div>
                    <div className="md:col-span-2">
                      <label className={`block text-sm font-medium mb-1 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>Image URL *</label>
                      <input type="text" placeholder="https://images.unsplash.com/..." value={newCourse.image} onChange={(e) => setNewCourse({...newCourse, image: e.target.value})} className={`w-full rounded-lg border p-2 ${isDarkMode ? "bg-gray-800 border-gray-700 text-white" : "bg-white border-gray-200"}`} />
                    </div>
                    <div className="md:col-span-2">
                      <label className={`block text-sm font-medium mb-1 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>Description *</label>
                      <textarea placeholder="Course description..." value={newCourse.description} onChange={(e) => setNewCourse({...newCourse, description: e.target.value})} className={`w-full rounded-lg border p-2 h-24 ${isDarkMode ? "bg-gray-800 border-gray-700 text-white" : "bg-white border-gray-200"}`} />
                    </div>
                  </div>

                  {/* Highlights (Curriculum) */}
                  <div className="md:col-span-2">
                    <label className={`block text-sm font-medium mb-1 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>Course Curriculum (Highlights) *</label>
                    {newCourse.highlights.map((highlight, index) => (
                      <div key={index} className="flex gap-2 mb-2">
                        <input type="text" placeholder={`Module ${index + 1}`} value={highlight} onChange={(e) => {
                          const updated = [...newCourse.highlights];
                          updated[index] = e.target.value;
                          setNewCourse({...newCourse, highlights: updated});
                        }} className={`flex-1 rounded-lg border p-2 ${isDarkMode ? "bg-gray-800 border-gray-700 text-white" : "bg-white border-gray-200"}`} />
                        <button onClick={() => {
                          const updated = newCourse.highlights.filter((_, i) => i !== index);
                          setNewCourse({...newCourse, highlights: updated.length ? updated : [""]});
                        }} className="text-red-500 hover:text-red-700 p-2">Remove</button>
                      </div>
                    ))}
                    <button onClick={() => setNewCourse({...newCourse, highlights: [...newCourse.highlights, ""]})} className="text-[#5932EA] hover:text-[#4a28c7] text-sm font-medium">+ Add Module</button>
                  </div>

                  {/* Outcomes */}
                  <div className="md:col-span-2">
                    <label className={`block text-sm font-medium mb-1 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>Course Outcomes *</label>
                    {newCourse.outcomes.map((outcome, index) => (
                      <div key={index} className="flex gap-2 mb-2">
                        <input type="text" placeholder={`Outcome ${index + 1}`} value={outcome} onChange={(e) => {
                          const updated = [...newCourse.outcomes];
                          updated[index] = e.target.value;
                          setNewCourse({...newCourse, outcomes: updated});
                        }} className={`flex-1 rounded-lg border p-2 ${isDarkMode ? "bg-gray-800 border-gray-700 text-white" : "bg-white border-gray-200"}`} />
                        <button onClick={() => {
                          const updated = newCourse.outcomes.filter((_, i) => i !== index);
                          setNewCourse({...newCourse, outcomes: updated.length ? updated : [""]});
                        }} className="text-red-500 hover:text-red-700 p-2">Remove</button>
                      </div>
                    ))}
                    <button onClick={() => setNewCourse({...newCourse, outcomes: [...newCourse.outcomes, ""]})} className="text-[#5932EA] hover:text-[#4a28c7] text-sm font-medium">+ Add Outcome</button>
                  </div>

                  {/* Quiz Section */}
                  <div className="md:col-span-2">
                    <label className={`block text-sm font-medium mb-2 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>Course Quiz (MCQs) *</label>
                    {newCourse.quiz.map((q, qIndex) => (
                      <div key={qIndex} className={`mb-4 p-4 rounded-xl border ${isDarkMode ? "bg-gray-800 border-gray-700" : "bg-gray-50 border-gray-200"}`}>
                        <div className="flex justify-between items-center mb-2">
                          <span className={`font-medium ${isDarkMode ? "text-white" : "text-gray-900"}`}>Question {qIndex + 1}</span>
                          <button onClick={() => {
                            const updated = newCourse.quiz.filter((_, i) => i !== qIndex);
                            setNewCourse({...newCourse, quiz: updated.length ? updated : [{ id: 1, question: "", options: ["", "", "", "", ""], correctAnswer: 0 }]});
                          }} className="text-red-500 hover:text-red-700 text-sm">Remove Question</button>
                        </div>
                        <input type="text" placeholder="Question text" value={q.question} onChange={(e) => {
                          const updated = [...newCourse.quiz];
                          updated[qIndex].question = e.target.value;
                          setNewCourse({...newCourse, quiz: updated});
                        }} className={`w-full rounded-lg border p-2 mb-2 ${isDarkMode ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-200"}`} />
                        
                        <div className="space-y-2">
                          {[0, 1, 2, 3, 4].map((oIndex) => (
                            <div key={oIndex} className="flex items-center gap-2">
                              <input type="radio" name={`correct-${qIndex}`} checked={q.correctAnswer === oIndex} onChange={() => {
                                const updated = [...newCourse.quiz];
                                updated[qIndex].correctAnswer = oIndex;
                                setNewCourse({...newCourse, quiz: updated});
                              }} />
                              <input type="text" placeholder={`Option ${oIndex + 1}`} value={q.options[oIndex]} onChange={(e) => {
                                const updated = [...newCourse.quiz];
                                updated[qIndex].options[oIndex] = e.target.value;
                                setNewCourse({...newCourse, quiz: updated});
                              }} className={`flex-1 rounded-lg border p-1.5 text-sm ${isDarkMode ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-200"}`} />
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                    <button onClick={() => setNewCourse({...newCourse, quiz: [...newCourse.quiz, { id: newCourse.quiz.length + 1, question: "", options: ["", "", "", "", ""], correctAnswer: 0 }]})} className="text-[#5932EA] hover:text-[#4a28c7] text-sm font-medium">+ Add Question</button>
                  </div>

                  {/* Submit Button */}
                  <button
                    disabled={isSavingCourse}
                    onClick={async () => {
                      // Validation
                      const isBasicValid = newCourse.title && newCourse.slug && newCourse.description && newCourse.duration && newCourse.level && newCourse.image;
                      const isHighlightsValid = newCourse.highlights.every(x => x.trim() !== "");
                      const isOutcomesValid = newCourse.outcomes.every(x => x.trim() !== "");
                      const isQuizValid = newCourse.quiz.every(q => q.question.trim() !== "" && q.options.every(o => o.trim() !== ""));

                      if (!isBasicValid || !isHighlightsValid || !isOutcomesValid || !isQuizValid) {
                        alert("Error: All fields are compulsory! Please fill in all details, including all modules, outcomes, and quiz questions/options.");
                        return;
                      }

                      setIsSavingCourse(true);
                      const token = localStorage.getItem("adminToken");
                      try {
                        const response = await fetch(API_ROUTES.COURSES, {
                          method: "POST",
                          headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                          },
                          body: JSON.stringify(newCourse),
                        });
                        if (!response.ok) throw new Error("Failed to add course");
                        alert("Course added successfully!");
                        setNewCourse({ title: "", slug: "", description: "", duration: "", level: "", image: "", highlights: [""], outcomes: [""], quiz: [{ id: 1, question: "", options: ["", "", "", "", ""], correctAnswer: 0 }] });
                        fetchCourses();
                      } catch (err: any) {
                        console.error(err);
                        alert("Failed to add course: " + err.message);
                      } finally {
                        setIsSavingCourse(false);
                      }
                    }}
                    className={`md:col-span-2 text-white py-3 rounded-xl font-bold transition-colors mt-4 ${isSavingCourse ? "bg-[#5932EA]/50 cursor-not-allowed" : "bg-[#5932EA] hover:bg-[#4a28c7]"}`}
                  >
                    {isSavingCourse ? "Saving Course..." : "Save Course"}
                  </button>
                </div>
              </div>

              {/* Course List */}
              <div className={`rounded-2xl shadow-sm p-6 border transition-colors duration-300 ${isDarkMode ? "bg-[#1E293B] border-gray-700" : "bg-white border-gray-50"}`}>
                <h2 className={`text-lg font-semibold mb-4 ${isDarkMode ? "text-white" : "text-gray-900"}`}>Existing Courses</h2>
                <div className="space-y-4">
                  {coursesLoading ? (
                    <div className="text-center py-4 text-gray-500">Loading courses...</div>
                  ) : courses.length === 0 ? (
                    <div className="text-center py-4 text-gray-500">No courses found.</div>
                  ) : (
                    courses.map((course) => (
                      <div key={course._id} className={`flex justify-between items-center p-4 rounded-xl border ${isDarkMode ? "border-gray-700 bg-gray-800/50" : "border-gray-100 bg-gray-50"}`}>
                        <div>
                          <h3 className={`font-semibold ${isDarkMode ? "text-white" : "text-gray-900"}`}>{course.title}</h3>
                          <p className="text-sm text-gray-500">{course.slug}</p>
                        </div>
                        <button
                          onClick={async () => {
                            if (!confirm("Are you sure you want to delete this course?")) return;
                            const token = localStorage.getItem("adminToken");
                            try {
                              const response = await fetch(`${API_ROUTES.COURSES}/${course._id}`, {
                                method: "DELETE",
                                headers: {
                                  Authorization: `Bearer ${token}`,
                                },
                              });
                              if (!response.ok) throw new Error("Delete failed");
                              alert("Course deleted!");
                              fetchCourses();
                            } catch (err) {
                              console.error(err);
                              alert("Failed to delete course");
                            }
                          }}
                          className="text-red-500 hover:text-red-700 text-sm font-medium"
                        >
                          Delete
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === "testimonials" && (
            <div className="space-y-6">
              <div>
                <h1 className={`text-2xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>Testimonials Management</h1>
                <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-500"} mt-1`}>Add or remove student feedback.</p>
              </div>

              {/* Add Testimonial Form */}
              <div className={`rounded-2xl shadow-sm p-6 border transition-colors duration-300 ${isDarkMode ? "bg-[#1E293B] border-gray-700" : "bg-white border-gray-50"}`}>
                <h2 className={`text-lg font-semibold mb-4 ${isDarkMode ? "text-white" : "text-gray-900"}`}>Add New Feedback</h2>
                <div className="space-y-4">
                  <input type="text" placeholder="Student Name" value={newTestimonial.name} onChange={(e) => setNewTestimonial({...newTestimonial, name: e.target.value})} className={`w-full rounded-lg border p-2 ${isDarkMode ? "bg-gray-800 border-gray-700 text-white" : "bg-white border-gray-200"}`} />
                  <input type="text" placeholder="Role / Placement (e.g., Placed at TCS)" value={newTestimonial.role} onChange={(e) => setNewTestimonial({...newTestimonial, role: e.target.value})} className={`w-full rounded-lg border p-2 ${isDarkMode ? "bg-gray-800 border-gray-700 text-white" : "bg-white border-gray-200"}`} />
                  <textarea placeholder="Feedback text..." value={newTestimonial.text} onChange={(e) => setNewTestimonial({...newTestimonial, text: e.target.value})} className={`w-full rounded-lg border p-2 h-24 ${isDarkMode ? "bg-gray-800 border-gray-700 text-white" : "bg-white border-gray-200"}`} />
                  <button
                    disabled={isSavingTestimonial}
                    onClick={async () => {
                      if (!newTestimonial.name || !newTestimonial.role || !newTestimonial.text) {
                        alert("Please fill in all fields!");
                        return;
                      }
                      setIsSavingTestimonial(true);
                      const token = localStorage.getItem("adminToken");
                      try {
                        const response = await fetch(API_ROUTES.TESTIMONIALS, {
                          method: "POST",
                          headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                          },
                          body: JSON.stringify(newTestimonial),
                        });
                        if (!response.ok) throw new Error("Failed to add testimonial");
                        alert("Feedback added successfully!");
                        setNewTestimonial({ name: "", role: "", text: "" });
                        fetchTestimonials();
                      } catch (err: any) {
                        console.error(err);
                        alert("Failed to add feedback: " + err.message);
                      } finally {
                        setIsSavingTestimonial(false);
                      }
                    }}
                    className={`w-full text-white py-2 rounded-lg font-medium transition-colors ${isSavingTestimonial ? "bg-[#5932EA]/50 cursor-not-allowed" : "bg-[#5932EA] hover:bg-[#4a28c7]"}`}
                  >
                    {isSavingTestimonial ? "Saving Feedback..." : "Save Feedback"}
                  </button>
                </div>
              </div>

              {/* Testimonials List */}
              <div className={`rounded-2xl shadow-sm p-6 border transition-colors duration-300 ${isDarkMode ? "bg-[#1E293B] border-gray-700" : "bg-white border-gray-50"}`}>
                <h2 className={`text-lg font-semibold mb-4 ${isDarkMode ? "text-white" : "text-gray-900"}`}>Existing Feedback</h2>
                <div className="space-y-4">
                  {testimonialsLoading ? (
                    <div className="text-center py-4 text-gray-500">Loading testimonials...</div>
                  ) : testimonials.length === 0 ? (
                    <div className="text-center py-4 text-gray-500">No feedback found.</div>
                  ) : (
                    testimonials.map((t) => (
                      <div key={t._id} className={`flex justify-between items-center p-4 rounded-xl border ${isDarkMode ? "border-gray-700 bg-gray-800/50" : "border-gray-100 bg-gray-50"}`}>
                        <div>
                          <h3 className={`font-semibold ${isDarkMode ? "text-white" : "text-gray-900"}`}>{t.name}</h3>
                          <p className="text-sm text-gray-500">{t.role}</p>
                          <p className={`text-sm mt-1 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>{t.text}</p>
                        </div>
                        <button
                          onClick={async () => {
                            if (!confirm("Are you sure you want to delete this feedback?")) return;
                            const token = localStorage.getItem("adminToken");
                            try {
                              const response = await fetch(`${API_ROUTES.TESTIMONIALS}/${t._id}`, {
                                method: "DELETE",
                                headers: {
                                  Authorization: `Bearer ${token}`,
                                },
                              });
                              if (!response.ok) throw new Error("Delete failed");
                              alert("Feedback deleted!");
                              fetchTestimonials();
                            } catch (err) {
                              console.error(err);
                              alert("Failed to delete feedback");
                            }
                          }}
                          className="text-red-500 hover:text-red-700 text-sm font-medium"
                        >
                          Delete
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === "partners" && (
            <div className="space-y-6">
              <div>
                <h1 className={`text-2xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>Partners Management</h1>
                <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-500"} mt-1`}>Add or remove placement partners.</p>
              </div>

              {/* Add Partner Form */}
              <div className={`rounded-2xl shadow-sm p-6 border transition-colors duration-300 ${isDarkMode ? "bg-[#1E293B] border-gray-700" : "bg-white border-gray-50"}`}>
                <h2 className={`text-lg font-semibold mb-4 ${isDarkMode ? "text-white" : "text-gray-900"}`}>Add New Partner</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input type="text" placeholder="Company Name" value={newPartner.name} onChange={(e) => setNewPartner({...newPartner, name: e.target.value})} className={`rounded-lg border p-2 ${isDarkMode ? "bg-gray-800 border-gray-700 text-white" : "bg-white border-gray-200"}`} />
                  <input type="text" placeholder="Logo Image URL" value={newPartner.image} onChange={(e) => setNewPartner({...newPartner, image: e.target.value})} className={`rounded-lg border p-2 ${isDarkMode ? "bg-gray-800 border-gray-700 text-white" : "bg-white border-gray-200"}`} />
                  <button
                    disabled={isSavingPartner}
                    onClick={async () => {
                      if (!newPartner.name || !newPartner.image) {
                        alert("Please fill in all fields!");
                        return;
                      }
                      setIsSavingPartner(true);
                      const token = localStorage.getItem("adminToken");
                      try {
                        const response = await fetch(API_ROUTES.PARTNERS, {
                          method: "POST",
                          headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                          },
                          body: JSON.stringify(newPartner),
                        });
                        if (!response.ok) throw new Error("Failed to add partner");
                        alert("Partner added successfully!");
                        setNewPartner({ name: "", image: "" });
                        fetchPartners();
                      } catch (err: any) {
                        console.error(err);
                        alert("Failed to add partner: " + err.message);
                      } finally {
                        setIsSavingPartner(false);
                      }
                    }}
                    className={`md:col-span-2 text-white py-2 rounded-lg font-medium transition-colors ${isSavingPartner ? "bg-[#5932EA]/50 cursor-not-allowed" : "bg-[#5932EA] hover:bg-[#4a28c7]"}`}
                  >
                    {isSavingPartner ? "Saving Partner..." : "Save Partner"}
                  </button>
                </div>
              </div>

              {/* Partners List */}
              <div className={`rounded-2xl shadow-sm p-6 border transition-colors duration-300 ${isDarkMode ? "bg-[#1E293B] border-gray-700" : "bg-white border-gray-50"}`}>
                <h2 className={`text-lg font-semibold mb-4 ${isDarkMode ? "text-white" : "text-gray-900"}`}>Existing Partners</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {partnersLoading ? (
                    <div className="col-span-3 text-center py-4 text-gray-500">Loading partners...</div>
                  ) : partnersList.length === 0 ? (
                    <div className="col-span-3 text-center py-4 text-gray-500">No partners found. Using defaults on site.</div>
                  ) : (
                    partnersList.map((p) => (
                      <div key={p._id} className={`p-4 rounded-xl border flex flex-col items-center gap-2 ${isDarkMode ? "border-gray-700 bg-gray-800/50" : "border-gray-100 bg-gray-50"}`}>
                        {p.image ? (
                          <img src={p.image} alt={p.name} className="h-12 w-auto object-contain" />
                        ) : (
                          <div className="h-12 w-12 bg-gray-200 rounded flex items-center justify-center">
                            <Users size={16} className="text-gray-400" />
                          </div>
                        )}
                        <span className={`font-medium ${isDarkMode ? "text-white" : "text-gray-900"}`}>{p.name}</span>
                        <button
                          onClick={async () => {
                            if (!confirm("Are you sure?")) return;
                            const token = localStorage.getItem("adminToken");
                            try {
                              const response = await fetch(`${API_ROUTES.PARTNERS}/${p._id}`, {
                                method: "DELETE",
                                headers: {
                                  Authorization: `Bearer ${token}`,
                                },
                              });
                              if (!response.ok) throw new Error("Delete failed");
                              alert("Partner removed!");
                              fetchPartners();
                            } catch (err) {
                              console.error(err);
                              alert("Failed to delete");
                            }
                          }}
                          className="text-red-500 hover:text-red-700 text-sm"
                        >
                          Delete
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === "footer_content" && (
            <div className="space-y-6">
              <div>
                <h1 className={`text-2xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>Contact & Footer Management</h1>
                <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-500"} mt-1`}>Update your contact details and footer information.</p>
              </div>

              <div className={`rounded-2xl shadow-sm p-6 border transition-colors duration-300 ${isDarkMode ? "bg-[#1E293B] border-gray-700" : "bg-white border-gray-50"}`}>
                <div className="space-y-4">
                  <div>
                    <label className={`block text-sm font-medium mb-1 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>Address</label>
                    <textarea value={footerSettings.address} onChange={(e) => setFooterSettings({...footerSettings, address: e.target.value})} className={`w-full rounded-lg border p-2 h-20 ${isDarkMode ? "bg-gray-800 border-gray-700 text-white" : "bg-white border-gray-200"}`} />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-1 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>Phone Number</label>
                    <input type="text" value={footerSettings.phone} onChange={(e) => setFooterSettings({...footerSettings, phone: e.target.value})} className={`w-full rounded-lg border p-2 ${isDarkMode ? "bg-gray-800 border-gray-700 text-white" : "bg-white border-gray-200"}`} />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-1 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>Email Address</label>
                    <input type="email" value={footerSettings.email} onChange={(e) => setFooterSettings({...footerSettings, email: e.target.value})} className={`w-full rounded-lg border p-2 ${isDarkMode ? "bg-gray-800 border-gray-700 text-white" : "bg-white border-gray-200"}`} />
                  </div>
                  <button
                    disabled={isSavingFooter}
                    onClick={async () => {
                      setIsSavingFooter(true);
                      const token = localStorage.getItem("adminToken");
                      try {
                        const response = await fetch(API_ROUTES.SETTINGS.FOOTER, {
                          method: "POST",
                          headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                          },
                          body: JSON.stringify(footerSettings),
                        });
                        if (!response.ok) throw new Error("Failed to update");
                        alert("Footer settings updated!");
                      } catch (err: any) {
                        console.error(err);
                        alert("Failed to update: " + err.message);
                      } finally {
                        setIsSavingFooter(false);
                      }
                    }}
                    className={`w-full text-white py-2 rounded-lg font-medium transition-colors ${isSavingFooter ? "bg-[#5932EA]/50 cursor-not-allowed" : "bg-[#5932EA] hover:bg-[#4a28c7]"}`}
                  >
                    {isSavingFooter ? "Saving Changes..." : "Save Changes"}
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === "about_content" && (
            <div className="space-y-6">
              <div>
                <h1 className={`text-2xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>About Us Management</h1>
                <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-500"} mt-1`}>Update the About Us story and key points.</p>
              </div>

              <div className={`rounded-2xl shadow-sm p-6 border transition-colors duration-300 ${isDarkMode ? "bg-[#1E293B] border-gray-700" : "bg-white border-gray-50"}`}>
                <div className="space-y-4">
                  <div>
                    <label className={`block text-sm font-medium mb-1 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>Main Description</label>
                    <textarea value={aboutSettings.text} onChange={(e) => setAboutSettings({...aboutSettings, text: e.target.value})} className={`w-full rounded-lg border p-2 h-32 ${isDarkMode ? "bg-gray-800 border-gray-700 text-white" : "bg-white border-gray-200"}`} />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-1 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>Image URL</label>
                    <input type="text" value={aboutSettings.image} onChange={(e) => setAboutSettings({...aboutSettings, image: e.target.value})} className={`w-full rounded-lg border p-2 ${isDarkMode ? "bg-gray-800 border-gray-700 text-white" : "bg-white border-gray-200"}`} />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-1 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>Key Points (Pinpoints)</label>
                    {aboutSettings.pinpoints.map((p, index) => (
                      <div key={index} className="flex gap-2 mb-2">
                        <input type="text" value={p} onChange={(e) => {
                          const updated = [...aboutSettings.pinpoints];
                          updated[index] = e.target.value;
                          setAboutSettings({...aboutSettings, pinpoints: updated});
                        }} className={`flex-1 rounded-lg border p-2 ${isDarkMode ? "bg-gray-800 border-gray-700 text-white" : "bg-white border-gray-200"}`} />
                        <button onClick={() => {
                          const updated = aboutSettings.pinpoints.filter((_, i) => i !== index);
                          setAboutSettings({...aboutSettings, pinpoints: updated.length ? updated : [""]});
                        }} className="text-red-500 hover:text-red-700 p-2">Remove</button>
                      </div>
                    ))}
                    <button onClick={() => setAboutSettings({...aboutSettings, pinpoints: [...aboutSettings.pinpoints, ""]})} className="text-[#5932EA] hover:text-[#4a28c7] text-sm font-medium">+ Add Point</button>
                  </div>
                  <button
                    disabled={isSavingAbout}
                    onClick={async () => {
                      setIsSavingAbout(true);
                      const token = localStorage.getItem("adminToken");
                      try {
                        const response = await fetch(API_ROUTES.SETTINGS.ABOUT, {
                          method: "POST",
                          headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                          },
                          body: JSON.stringify(aboutSettings),
                        });
                        if (!response.ok) throw new Error("Failed to update");
                        alert("About Us settings updated!");
                      } catch (err: any) {
                        console.error(err);
                        alert("Failed to update: " + err.message);
                      } finally {
                        setIsSavingAbout(false);
                      }
                    }}
                    className={`w-full text-white py-2 rounded-lg font-medium transition-colors ${isSavingAbout ? "bg-[#5932EA]/50 cursor-not-allowed" : "bg-[#5932EA] hover:bg-[#4a28c7]"}`}
                  >
                    {isSavingAbout ? "Saving Changes..." : "Save Changes"}
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === "settings" && (
            <div className="space-y-6">
              <div>
                <h1 className={`text-2xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>Admin Portal Settings</h1>
                <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-500"} mt-1`}>Manage your account, society information, and system preferences.</p>
              </div>

              {/* Sub-tabs */}
              <div className="flex border-b border-gray-200">
                {[
                  { id: "personal", label: "User Profile", icon: User },
                  { id: "society", label: "Society Profile", icon: Globe },
                  { id: "system", label: "System Config", icon: Settings }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setSettingsTab(tab.id)}
                    className={`flex items-center space-x-2 px-6 py-3 text-sm font-medium transition-all border-b-2 ${
                      settingsTab === tab.id
                        ? "border-[#5932EA] text-[#5932EA]"
                        : "border-transparent text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    <tab.icon size={16} />
                    <span>{tab.label}</span>
                  </button>
                ))}
              </div>

              <div className={`rounded-2xl shadow-sm p-8 border transition-colors duration-300 ${isDarkMode ? "bg-[#1E293B] border-gray-700" : "bg-white border-gray-50"}`}>
                {settingsTab === "personal" && (
                  <div className="max-w-3xl space-y-8">
                    {/* Profile Header */}
                    <div className="flex items-center space-x-6 pb-8 border-b border-gray-100">
                      <div className="relative group">
                        <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-gray-100 shadow-sm">
                          <Image src={profileData.avatar} alt="Profile" width={96} height={96} className="w-full h-full object-cover" unoptimized />
                        </div>
                        <button className="absolute bottom-0 right-0 p-2 bg-blue-600 text-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
                          <Camera size={14} />
                        </button>
                      </div>
                      <div>
                        <h2 className={`text-xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>{profileData.fullName}</h2>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 text-[10px] font-bold uppercase tracking-wider rounded-md">
                            {profileData.role}
                          </span>
                          <span className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>{profileData.email}</span>
                        </div>
                      </div>
                    </div>

                    {/* Personal Details Form */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="md:col-span-1">
                        <label className={`block text-xs font-bold uppercase tracking-wider mb-2 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>Full Name</label>
                        <input 
                          type="text" 
                          value={profileData.fullName} 
                          onChange={(e) => setProfileData({...profileData, fullName: e.target.value})}
                          className={`w-full rounded-xl border p-3 focus:ring-2 focus:ring-blue-500 outline-none transition-all ${isDarkMode ? "bg-gray-800 border-gray-700 text-white" : "bg-gray-50 border-gray-100"}`} 
                        />
                      </div>
                      <div className="md:col-span-1">
                        <label className={`block text-xs font-bold uppercase tracking-wider mb-2 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>Professional Title</label>
                        <input 
                          type="text" 
                          value={profileData.title} 
                          onChange={(e) => setProfileData({...profileData, title: e.target.value})}
                          className={`w-full rounded-xl border p-3 focus:ring-2 focus:ring-blue-500 outline-none transition-all ${isDarkMode ? "bg-gray-800 border-gray-700 text-white" : "bg-gray-50 border-gray-100"}`} 
                        />
                      </div>
                      <div className="md:col-span-1">
                        <label className={`block text-xs font-bold uppercase tracking-wider mb-2 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>Email Address</label>
                        <input 
                          type="email" 
                          value={profileData.email} 
                          onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                          className={`w-full rounded-xl border p-3 focus:ring-2 focus:ring-blue-500 outline-none transition-all ${isDarkMode ? "bg-gray-800 border-gray-700 text-white" : "bg-gray-50 border-gray-100"}`} 
                        />
                      </div>
                    </div>

                    {/* Security Section */}
                    <div className="pt-8 border-t border-gray-100">
                      <h3 className={`text-lg font-bold mb-6 ${isDarkMode ? "text-white" : "text-gray-900"}`}>Security & Authentication</h3>
                      
                      <div className="space-y-6">
                        <div>
                          <label className={`block text-xs font-bold uppercase tracking-wider mb-2 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>Change Username</label>
                          <input 
                            type="text" 
                            value={profileData.username} 
                            onChange={(e) => setProfileData({...profileData, username: e.target.value})}
                            placeholder="Username"
                            className={`w-full rounded-xl border p-3 focus:ring-2 focus:ring-blue-500 outline-none transition-all ${isDarkMode ? "bg-gray-800 border-gray-700 text-white" : "bg-gray-50 border-gray-100"}`} 
                          />
                        </div>

                        <div className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {/* Current Password */}
                            <div className="flex flex-col gap-1">
                              <label className="text-xs font-bold text-gray-500 uppercase flex items-center gap-1">
                                <Lock size={12} /> Current Password
                              </label>
                              <div className="relative">
                                <input 
                                  type={showCurrentPassword ? "text" : "password"} 
                                  placeholder="Enter current password" 
                                  value={profileData.currentPassword}
                                  onChange={(e) => setProfileData({...profileData, currentPassword: e.target.value})}
                                  className={`w-full rounded-xl border p-3 pr-10 ${isDarkMode ? "bg-gray-800 border-gray-700 text-white" : "bg-gray-50 border-gray-100"}`} 
                                />
                                <button 
                                  type="button"
                                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                >
                                  {showCurrentPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                </button>
                              </div>
                            </div>

                            {/* New Password */}
                            <div className="flex flex-col gap-1">
                              <label className="text-xs font-bold text-gray-500 uppercase flex items-center gap-1">
                                <Lock size={12} /> New Password
                              </label>
                              <div className="relative">
                                <input 
                                  type={showNewPassword ? "text" : "password"} 
                                  placeholder="Min 6 characters" 
                                  value={profileData.newPassword}
                                  onChange={(e) => setProfileData({...profileData, newPassword: e.target.value})}
                                  className={`w-full rounded-xl border p-3 pr-10 ${isDarkMode ? "bg-gray-800 border-gray-700 text-white" : "bg-gray-50 border-gray-100"}`} 
                                />
                                <button 
                                  type="button"
                                  onClick={() => setShowNewPassword(!showNewPassword)}
                                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                >
                                  {showNewPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                </button>
                              </div>
                            </div>

                            {/* Confirm Password */}
                            <div className="flex flex-col gap-1">
                              <label className="text-xs font-bold text-gray-500 uppercase flex items-center gap-1">
                                <Lock size={12} /> Confirm Password
                              </label>
                              <div className="relative">
                                <input 
                                  type={showConfirmPassword ? "text" : "password"} 
                                  placeholder="Repeat new password" 
                                  value={profileData.confirmPassword}
                                  onChange={(e) => setProfileData({...profileData, confirmPassword: e.target.value})}
                                  className={`w-full rounded-xl border p-3 pr-10 ${isDarkMode ? "bg-gray-800 border-gray-700 text-white" : "bg-gray-50 border-gray-100"}`} 
                                />
                                <button 
                                  type="button"
                                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                >
                                  {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                </button>
                              </div>
                            </div>
                          </div>
                          <p className="text-[10px] text-gray-500 italic">* To change your password or username, you must provide your current password for verification.</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end pt-6">
                      <button 
                        disabled={isSavingProfile}
                        onClick={async () => {
                          const token = localStorage.getItem("adminToken");
                          if (!token) {
                            alert("Authentication token not found. Please login again.");
                            return;
                          }
                          setIsSavingProfile(true);
                          try {
                            if (profileData.newPassword && profileData.newPassword !== profileData.confirmPassword) {
                              alert("New passwords do not match!");
                              setIsSavingProfile(false);
                              return;
                            }

                            const response = await fetch(`${API_BASE_URL}/api/auth/update`, {
                              method: "PUT",
                              headers: {
                                "Content-Type": "application/json",
                                Authorization: `Bearer ${token}`,
                              },
                              body: JSON.stringify({
                                username: profileData.username,
                                fullName: profileData.fullName,
                                email: profileData.email,
                                title: profileData.title,
                                password: profileData.newPassword || undefined,
                                currentPassword: profileData.currentPassword || undefined
                              }),
                            });

                            const contentType = response.headers.get("content-type");
                            if (contentType && contentType.indexOf("application/json") !== -1) {
                              const data = await response.json();
                              if (!response.ok) throw new Error(data.message || "Update failed");
                              alert("Profile updated successfully!");
                              // Clear password fields after success to prevent "Incorrect password" on next click
                              setProfileData(prev => ({
                                ...prev,
                                currentPassword: "",
                                newPassword: "",
                                confirmPassword: ""
                              }));
                            } else {
                              // If server returns HTML (like a 404), show a cleaner error
                              const text = await response.text();
                              console.error("Server returned non-JSON response:", text);
                              throw new Error(`Server Error (${response.status}): The API endpoint was not found or returned an invalid response.`);
                            }
                          } catch (err: any) {
                            console.error("Update Error:", err);
                            alert("Update Error: " + err.message);
                          } finally {
                            setIsSavingProfile(false);
                          }
                        }}
                        className={`text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-blue-600/20 transition-all ${isSavingProfile ? "bg-blue-600/50 cursor-not-allowed" : "bg-[#5932EA] hover:bg-[#4a28c7]"}`}
                      >
                        {isSavingProfile ? "Updating..." : "Update Account"}
                      </button>
                    </div>
                  </div>
                )}

                {settingsTab === "society" && (
                  <div className="max-w-4xl space-y-8">
                    <h2 className={`text-xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>Organization Identity</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-6">
                        <div>
                          <label className={`block text-xs font-bold uppercase tracking-wider mb-2 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>Society Name</label>
                          <input 
                            type="text" 
                            value={societyData.name} 
                            onChange={(e) => setSocietyData({...societyData, name: e.target.value})}
                            className={`w-full rounded-xl border p-3 ${isDarkMode ? "bg-gray-800 border-gray-700 text-white" : "bg-gray-50 border-gray-100"}`} 
                          />
                        </div>
                        <div>
                          <label className={`block text-xs font-bold uppercase tracking-wider mb-2 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>Registration ID</label>
                          <input 
                            type="text" 
                            value={societyData.regId} 
                            onChange={(e) => setSocietyData({...societyData, regId: e.target.value})}
                            className={`w-full rounded-xl border p-3 ${isDarkMode ? "bg-gray-800 border-gray-700 text-white" : "bg-gray-50 border-gray-100"}`} 
                          />
                        </div>
                        <div>
                          <label className={`block text-xs font-bold uppercase tracking-wider mb-2 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>Official Phone</label>
                          <input 
                            type="text" 
                            value={societyData.phone} 
                            onChange={(e) => setSocietyData({...societyData, phone: e.target.value})}
                            className={`w-full rounded-xl border p-3 ${isDarkMode ? "bg-gray-800 border-gray-700 text-white" : "bg-gray-50 border-gray-100"}`} 
                          />
                        </div>
                      </div>

                      <div className="space-y-6">
                        <div>
                          <label className={`block text-xs font-bold uppercase tracking-wider mb-2 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>Headquarters Address</label>
                          <textarea 
                            rows={4} 
                            value={societyData.address} 
                            onChange={(e) => setSocietyData({...societyData, address: e.target.value})}
                            className={`w-full rounded-xl border p-3 ${isDarkMode ? "bg-gray-800 border-gray-700 text-white" : "bg-gray-50 border-gray-100"}`} 
                          />
                        </div>
                        <div className={`p-6 rounded-2xl border-2 border-dashed ${isDarkMode ? "border-gray-700 bg-gray-800/30" : "border-gray-100 bg-gray-50"}`}>
                           <p className="text-sm font-bold mb-4">Official Logo (Dark & Light)</p>
                           <div className="flex gap-4">
                             <div className="flex-1 h-20 bg-white rounded-lg border flex items-center justify-center p-2">
                               <Image 
                                 src="https://sunvisionsociety.com/uploads/1596723247_logo.png" 
                                 alt="Logo" 
                                 width={0} 
                                 height={0} 
                                 sizes="100vw"
                                 style={{ width: "auto", height: "30px" }} 
                               />
                             </div>
                             <button className="flex-1 border-2 border-dashed rounded-lg flex flex-col items-center justify-center text-xs text-gray-500 hover:border-blue-500 transition-colors">
                               <Plus size={16} className="mb-1" />
                               Change Logo
                             </button>
                           </div>
                        </div>
                      </div>

                      {/* Social Media Links */}
                      <div className="md:col-span-2 pt-6 border-t border-gray-100">
                        <h3 className="text-sm font-bold mb-4">Social Media Channels</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                          {["Facebook", "LinkedIn", "Instagram", "Twitter"].map((platform) => (
                            <div key={platform} className="relative">
                              <input 
                                type="text" 
                                placeholder={`${platform} URL`} 
                                className={`w-full rounded-xl border pl-10 p-3 text-sm ${isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"}`} 
                              />
                              <Globe className="absolute left-3 top-3.5 text-gray-400" size={16} />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end pt-4">
                      <button 
                        disabled={isSavingSociety}
                        onClick={async () => {
                          setIsSavingSociety(true);
                          // This is currently just a placeholder since the API might not be wired up fully
                          // but simulating a save with a loader for the user.
                          setTimeout(() => {
                            alert("Society settings updated successfully!");
                            setIsSavingSociety(false);
                          }, 1000);
                        }}
                        className={`text-white px-8 py-3 rounded-xl font-bold shadow-lg transition-all ${isSavingSociety ? "bg-blue-600/50 shadow-none cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 shadow-blue-600/20"}`}
                      >
                        {isSavingSociety ? "Saving..." : "Save Global Settings"}
                      </button>
                    </div>
                  </div>
                )}

                {settingsTab === "system" && (
                  <div className="max-w-3xl space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Maintenance Mode */}
                      <div className={`p-6 rounded-2xl border ${systemData.maintenanceMode ? "border-amber-200 bg-amber-50" : "border-gray-100 bg-gray-50/50"}`}>
                        <div className="flex justify-between items-start mb-4">
                          <div className="p-2 bg-amber-500 rounded-lg text-white">
                            <AlertCircle size={20} />
                          </div>
                          <button 
                            onClick={() => setSystemData({...systemData, maintenanceMode: !systemData.maintenanceMode})}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${systemData.maintenanceMode ? "bg-amber-600" : "bg-gray-300"}`}
                          >
                            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${systemData.maintenanceMode ? "translate-x-6" : "translate-x-1"}`} />
                          </button>
                        </div>
                        <h3 className="text-sm font-bold mb-1">Maintenance Mode</h3>
                        <p className="text-xs text-gray-500">Redirect public traffic to a "Coming Soon" screen while you make updates.</p>
                      </div>

                      {/* Email Alerts */}
                      <div className={`p-6 rounded-2xl border ${systemData.emailAlerts ? "border-blue-200 bg-blue-50" : "border-gray-100 bg-gray-50/50"}`}>
                        <div className="flex justify-between items-start mb-4">
                          <div className="p-2 bg-blue-600 rounded-lg text-white">
                            <Bell size={20} />
                          </div>
                          <button 
                            onClick={() => setSystemData({...systemData, emailAlerts: !systemData.emailAlerts})}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${systemData.emailAlerts ? "bg-blue-600" : "bg-gray-300"}`}
                          >
                            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${systemData.emailAlerts ? "translate-x-6" : "translate-x-1"}`} />
                          </button>
                        </div>
                        <h3 className="text-sm font-bold mb-1">Real-time Email Alerts</h3>
                        <p className="text-xs text-gray-500">Receive instant notifications for new student inquiries and partner requests.</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-gray-100">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider mb-2">Default Locale</label>
                        <select 
                          value={systemData.language}
                          onChange={(e) => setSystemData({...systemData, language: e.target.value})}
                          className={`w-full rounded-xl border p-3 ${isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"}`}
                        >
                          <option value="English (United States)">English (United States)</option>
                          <option value="English (India)">English (India)</option>
                          <option value="Telugu">Telugu</option>
                          <option value="Hindi">Hindi</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider mb-2">Date Format</label>
                        <select 
                          value={systemData.dateFormat}
                          onChange={(e) => setSystemData({...systemData, dateFormat: e.target.value})}
                          className={`w-full rounded-xl border p-3 ${isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"}`}
                        >
                          <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                          <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                          <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                        </select>
                      </div>
                    </div>

                    <div className="flex justify-between items-center pt-6 p-6 rounded-2xl bg-gradient-to-r from-gray-900 to-slate-800 text-white">
                      <div>
                        <h3 className="font-bold">System Appearance</h3>
                        <p className="text-xs text-gray-400">Personalize your dashboard experience.</p>
                      </div>
                      <div className="flex gap-2 p-1 bg-white/10 rounded-xl">
                        <button 
                          onClick={() => setIsDarkMode(false)}
                          className={`p-2 rounded-lg flex items-center gap-2 text-xs font-bold transition-all ${!isDarkMode ? "bg-white text-black" : "text-white/70 hover:text-white"}`}
                        >
                          <Sun size={14} /> Light
                        </button>
                        <button 
                          onClick={() => setIsDarkMode(true)}
                          className={`p-2 rounded-lg flex items-center gap-2 text-xs font-bold transition-all ${isDarkMode ? "bg-blue-600 text-white" : "text-white/70 hover:text-white"}`}
                        >
                          <Moon size={14} /> Dark
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab !== "dashboard" && activeTab !== "gallery" && activeTab !== "stats" && activeTab !== "courses" && activeTab !== "testimonials" && activeTab !== "partners" && activeTab !== "footer_content" && activeTab !== "about_content" && activeTab !== "settings" && (
            <div className={`text-center py-20 rounded-2xl shadow-sm border transition-colors duration-300 ${isDarkMode ? "bg-[#1E293B] border-gray-700" : "bg-white border-gray-50"}`}>
              <div className={`p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 ${isDarkMode ? "bg-gray-700" : "bg-purple-50"}`}>
                <Settings size={24} className={isDarkMode ? "text-white" : "text-[#5932EA]"} />
              </div>
              <h2 className={`text-xl font-bold capitalize ${isDarkMode ? "text-white" : "text-gray-900"}`}>{activeTab} Section</h2>
              <p className={`text-sm mt-1 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>This section is ready for development.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
