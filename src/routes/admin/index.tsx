import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  Users,
  BookOpen,
  Award,
  Plus,
  Edit,
  Trash2,
  LogOut,
  Save,
  RotateCcw,
  CheckCircle2,
  KeyRound,
  GraduationCap,
  FileText,
  Bold,
  Italic,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Table,
  Link2,
  Minus,
  Eye,
  Code2,
  Sparkles,
  HelpCircle,
} from "lucide-react";
import {
  TutorItem,
  MentorItem,
  ResourcePost,
  DEFAULT_TUTORS,
  DEFAULT_MENTORS,
  DEFAULT_POSTS,
  getStoredTutors,
  saveStoredTutors,
  getStoredMentors,
  saveStoredMentors,
  getStoredPosts,
  saveStoredPosts,
} from "@/lib/admin-store";

export const Route = createFileRoute("/admin/")({
  head: () => ({
    meta: [{ title: "Bảng Quản Trị — UniVenture Admin" }],
  }),
  component: AdminDashboardPage,
});

function AdminDashboardPage() {
  const navigate = useNavigate();
  const [authenticated, setAuthenticated] = useState(false);
  const [pinInput, setPinInput] = useState("");
  const [pinError, setPinError] = useState("");
  const [activeTab, setActiveTab] = useState<"tutors" | "mentors" | "library">("tutors");

  // Tutor state
  const [tutors, setTutors] = useState<TutorItem[]>([]);
  const [editingTutor, setEditingTutor] = useState<TutorItem | null>(null);
  const [isAddingTutor, setIsAddingTutor] = useState(false);

  // Mentor state
  const [mentors, setMentors] = useState<MentorItem[]>([]);
  const [editingMentor, setEditingMentor] = useState<MentorItem | null>(null);
  const [isAddingMentor, setIsAddingMentor] = useState(false);

  // Library state
  const [posts, setPosts] = useState<ResourcePost[]>([]);
  const [editingPost, setEditingPost] = useState<ResourcePost | null>(null);
  const [isAddingPost, setIsAddingPost] = useState(false);

  const [toastMessage, setToastMessage] = useState("");

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3000);
  };

  useEffect(() => {
    // Check if session is authenticated
    const auth = sessionStorage.getItem("univenture_admin_auth");
    if (auth === "true") {
      setAuthenticated(true);
    }
    setTutors(getStoredTutors());
    setMentors(getStoredMentors());
    setPosts(getStoredPosts());
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput === "123456" || pinInput === "admin" || pinInput === "univenture") {
      sessionStorage.setItem("univenture_admin_auth", "true");
      setAuthenticated(true);
      setPinError("");
    } else {
      setPinError("Mã PIN không đúng. Vui lòng thử lại.");
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("univenture_admin_auth");
    setAuthenticated(false);
    setPinInput("");
  };

  // --- Tutor Handlers ---
  const handleSaveTutor = (tutor: TutorItem) => {
    let updated: TutorItem[];
    if (isAddingTutor) {
      const newTutor = { ...tutor, id: Date.now() };
      updated = [...tutors, newTutor];
    } else {
      updated = tutors.map((t) => (t.id === tutor.id ? tutor : t));
    }
    setTutors(updated);
    saveStoredTutors(updated);
    setEditingTutor(null);
    setIsAddingTutor(false);
    showToast("Đã lưu hồ sơ gia sư thành công!");
  };

  const handleDeleteTutor = (id: number) => {
    if (confirm("Bạn có chắc chắn muốn xóa hồ sơ gia sư này?")) {
      const updated = tutors.filter((t) => t.id !== id);
      setTutors(updated);
      saveStoredTutors(updated);
      showToast("Đã xóa gia sư!");
    }
  };

  const handleResetTutors = () => {
    if (confirm("Khôi phục danh sách gia sư về mặc định?")) {
      setTutors(DEFAULT_TUTORS);
      saveStoredTutors(DEFAULT_TUTORS);
      showToast("Đã khôi phục dữ liệu gia sư mặc định!");
    }
  };

  // --- Mentor Handlers ---
  const handleSaveMentor = (mentor: MentorItem) => {
    let updated: MentorItem[];
    if (isAddingMentor) {
      const newMentor = { ...mentor, id: Date.now() };
      updated = [...mentors, newMentor];
    } else {
      updated = mentors.map((m) => (m.id === mentor.id ? mentor : m));
    }
    setMentors(updated);
    saveStoredMentors(updated);
    setEditingMentor(null);
    setIsAddingMentor(false);
    showToast("Đã lưu hồ sơ mentor thành công!");
  };

  const handleDeleteMentor = (id: number) => {
    if (confirm("Bạn có chắc chắn muốn xóa hồ sơ mentor này?")) {
      const updated = mentors.filter((m) => m.id !== id);
      setMentors(updated);
      saveStoredMentors(updated);
      showToast("Đã xóa mentor!");
    }
  };

  const handleResetMentors = () => {
    if (confirm("Khôi phục danh sách mentor về mặc định?")) {
      setMentors(DEFAULT_MENTORS);
      saveStoredMentors(DEFAULT_MENTORS);
      showToast("Đã khôi phục dữ liệu mentor mặc định!");
    }
  };

  // --- Library Handlers ---
  const handleSavePost = (post: ResourcePost) => {
    let updated: ResourcePost[];
    if (isAddingPost) {
      const newPost = { ...post, id: Date.now() };
      updated = [...posts, newPost];
    } else {
      updated = posts.map((p) => (p.id === post.id ? post : p));
    }
    setPosts(updated);
    saveStoredPosts(updated);
    setEditingPost(null);
    setIsAddingPost(false);
    showToast("Đã lưu bài viết thư viện thành công!");
  };

  const handleDeletePost = (id: number) => {
    if (confirm("Bạn có chắc chắn muốn xóa bài viết này khỏi thư viện?")) {
      const updated = posts.filter((p) => p.id !== id);
      setPosts(updated);
      saveStoredPosts(updated);
      showToast("Đã xóa bài viết!");
    }
  };

  const handleResetPosts = () => {
    if (confirm("Khôi phục danh sách bài viết thư viện về mặc định?")) {
      setPosts(DEFAULT_POSTS);
      saveStoredPosts(DEFAULT_POSTS);
      showToast("Đã khôi phục dữ liệu thư viện mặc định!");
    }
  };

  // --- PIN Login Screen ---
  if (!authenticated) {
    return (
      <div className="min-h-screen bg-[#122554] flex items-center justify-center p-4">
        <div className="bg-white border-2 border-[#122554] shadow-2xl p-8 max-w-md w-full">
          <div className="text-center mb-6">
            <img src="/logo.svg" alt="UniVenture" className="h-10 mx-auto mb-4" />
            <h1 className="font-display font-bold text-2xl text-[#122554]">
              Đăng nhập Quản Trị
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Nhập mã PIN để truy cập bảng điều khiển Admin
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs uppercase tracking-wider text-[#122554] font-bold mb-2">
                Mã PIN quản trị
              </label>
              <div className="relative">
                <input
                  type="password"
                  autoFocus
                  required
                  value={pinInput}
                  onChange={(e) => setPinInput(e.target.value)}
                  placeholder="Nhập mã PIN quản trị"
                  className="w-full border-2 border-[#122554] px-4 py-3 text-sm focus:border-[#122554] outline-none"
                />
                <KeyRound className="h-5 w-5 text-gray-400 absolute right-3 top-3.5" />
              </div>
              {pinError && <p className="text-xs text-red-600 mt-2 font-medium">Mã PIN không đúng. Vui lòng thử lại.</p>}
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-[#122554] text-white font-semibold text-sm hover:bg-black transition-colors cursor-pointer"
            >
              Mở Bảng Quản Trị
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-[100] bg-[#122554] text-white px-5 py-3 border-2 border-[#122554] shadow-2xl flex items-center gap-2 animate-in slide-in-from-top-2">
          <CheckCircle2 className="h-5 w-5 text-[#ffcd6b]" />
          <span className="text-sm font-medium">{toastMessage}</span>
        </div>
      )}

      {/* Top Header */}
      <header className="bg-[#122554] text-white border-b-2 border-[#122554] px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <img src="/logo.svg" alt="UniVenture" className="h-8 w-auto bg-white p-1" />
          <div>
            <h1 className="font-display font-bold text-lg leading-none">Bảng Quản Trị Hệ Thống</h1>
            <p className="text-xs text-[#ffcd6b] mt-0.5">UniVenture Admin Portal</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="/"
            target="_blank"
            className="text-xs text-white/80 hover:text-white border border-white/30 px-3 py-1.5 hover:bg-white/10 transition-colors"
          >
            Xem Website ↗
          </a>
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 text-xs bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 font-medium transition-colors cursor-pointer"
          >
            <LogOut className="h-3.5 w-3.5" />
            Đăng xuất
          </button>
        </div>
      </header>

      {/* Main Container */}
      <div className="flex-1 max-w-7xl w-full mx-auto p-6 md:p-8">
        {/* Navigation Tabs */}
        <div className="flex flex-col md:flex-row md:items-center justify-between border-b-2 border-[#122554] pb-4 mb-8 gap-4">
          <div className="flex flex-wrap gap-2 md:gap-3">
            <button
              onClick={() => {
                setActiveTab("tutors");
                setEditingTutor(null);
                setIsAddingTutor(false);
              }}
              className={`flex items-center gap-2 px-5 py-2.5 font-semibold text-sm transition-all border-2 cursor-pointer ${
                activeTab === "tutors"
                  ? "bg-[#122554] text-white border-[#122554]"
                  : "bg-white text-[#122554] border-[#122554] hover:bg-slate-100"
              }`}
            >
              <Users className="h-4 w-4" />
              Hồ sơ Gia sư ({tutors.length})
            </button>

            <button
              onClick={() => {
                setActiveTab("mentors");
                setEditingMentor(null);
                setIsAddingMentor(false);
              }}
              className={`flex items-center gap-2 px-5 py-2.5 font-semibold text-sm transition-all border-2 cursor-pointer ${
                activeTab === "mentors"
                  ? "bg-[#122554] text-white border-[#122554]"
                  : "bg-white text-[#122554] border-[#122554] hover:bg-slate-100"
              }`}
            >
              <Award className="h-4 w-4" />
              Đội ngũ Mentor ({mentors.length})
            </button>

            <button
              onClick={() => {
                setActiveTab("library");
                setEditingPost(null);
                setIsAddingPost(false);
              }}
              className={`flex items-center gap-2 px-5 py-2.5 font-semibold text-sm transition-all border-2 cursor-pointer ${
                activeTab === "library"
                  ? "bg-[#122554] text-white border-[#122554]"
                  : "bg-white text-[#122554] border-[#122554] hover:bg-slate-100"
              }`}
            >
              <BookOpen className="h-4 w-4" />
              Thư viện Bài viết ({posts.length})
            </button>
          </div>

          <div>
            {activeTab === "tutors" && !editingTutor && !isAddingTutor && (
              <div className="flex gap-2">
                <button
                  onClick={handleResetTutors}
                  className="flex items-center gap-1.5 px-3 py-2 text-xs border border-gray-300 bg-white text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  <RotateCcw className="h-3.5 w-3.5" /> Khôi phục mặc định
                </button>
                <button
                  onClick={() => {
                    setIsAddingTutor(true);
                    setEditingTutor({
                      id: 0,
                      name: "",
                      role: "Cử nhân - Đại học VinUni",
                      image: "/images/tutors/tutor-1-tran-van-nghia.png",
                      about: "",
                      classes: [],
                      academics: [],
                    });
                  }}
                  className="flex items-center gap-2 px-4 py-2 bg-[#122554] text-white font-bold text-sm hover:bg-black transition-colors border-2 border-[#122554] cursor-pointer"
                >
                  <Plus className="h-4 w-4 text-[#ffcd6b]" /> Thêm Gia sư mới
                </button>
              </div>
            )}

            {activeTab === "mentors" && !editingMentor && !isAddingMentor && (
              <div className="flex gap-2">
                <button
                  onClick={handleResetMentors}
                  className="flex items-center gap-1.5 px-3 py-2 text-xs border border-gray-300 bg-white text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  <RotateCcw className="h-3.5 w-3.5" /> Khôi phục mặc định
                </button>
                <button
                  onClick={() => {
                    setIsAddingMentor(true);
                    setEditingMentor({
                      id: 0,
                      name: "",
                      role: "",
                      image: "/images/mentors/mentor-uyen-nhu-new.png",
                      academics: [],
                      leadership: [],
                      admits: [],
                    });
                  }}
                  className="flex items-center gap-2 px-4 py-2 bg-[#122554] text-white font-bold text-sm hover:bg-black transition-colors border-2 border-[#122554] cursor-pointer"
                >
                  <Plus className="h-4 w-4 text-[#ffcd6b]" /> Thêm Mentor mới
                </button>
              </div>
            )}

            {activeTab === "library" && !editingPost && !isAddingPost && (
              <div className="flex gap-2">
                <button
                  onClick={handleResetPosts}
                  className="flex items-center gap-1.5 px-3 py-2 text-xs border border-gray-300 bg-white text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  <RotateCcw className="h-3.5 w-3.5" /> Khôi phục mặc định
                </button>
                <button
                  onClick={() => {
                    setIsAddingPost(true);
                    setEditingPost({
                      id: 0,
                      partId: 1,
                      title: "",
                      desc: "",
                      content: "",
                    });
                  }}
                  className="flex items-center gap-2 px-4 py-2 bg-[#122554] text-white font-bold text-sm hover:bg-black transition-colors border-2 border-[#122554] cursor-pointer"
                >
                  <Plus className="h-4 w-4 text-[#ffcd6b]" /> Thêm bài viết mới
                </button>
              </div>
            )}
          </div>
        </div>

        {/* --- TUTORS TAB --- */}
        {activeTab === "tutors" && (
          <div>
            {editingTutor ? (
              <TutorEditForm
                tutor={editingTutor}
                isNew={isAddingTutor}
                onSave={handleSaveTutor}
                onCancel={() => {
                  setEditingTutor(null);
                  setIsAddingTutor(false);
                }}
              />
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {tutors.map((tutor) => (
                  <div
                    key={tutor.id}
                    className="border-2 border-[#122554] bg-white p-5 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div>
                      <div className="flex items-start gap-4 mb-4">
                        <img
                          src={tutor.image}
                          alt={tutor.name}
                          className="w-16 h-20 object-contain border border-[#122554]/20 p-1 bg-white shrink-0"
                        />
                        <div>
                          <h3 className="font-display font-bold text-lg text-[#122554] leading-tight">
                            {tutor.name}
                          </h3>
                          <p className="text-xs text-gray-600 mt-1 line-clamp-2">{tutor.role}</p>
                          <span className="inline-block mt-2 text-[10px] uppercase tracking-wider font-bold bg-[#122554] text-white px-2 py-0.5">
                            {tutor.classes.length} Lớp dạy
                          </span>
                        </div>
                      </div>

                      <p className="text-xs text-gray-600 line-clamp-3 mb-4">{tutor.about}</p>
                    </div>

                    <div className="flex gap-2 border-t border-gray-200 pt-3 mt-2">
                      <button
                        onClick={() => {
                          setIsAddingTutor(false);
                          setEditingTutor(tutor);
                        }}
                        className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-[#122554] text-white text-xs font-semibold hover:bg-black transition-colors cursor-pointer"
                      >
                        <Edit className="h-3.5 w-3.5" /> Chỉnh sửa
                      </button>
                      <button
                        onClick={() => handleDeleteTutor(tutor.id)}
                        className="px-3 py-2 border border-red-500 text-red-600 hover:bg-red-50 text-xs transition-colors cursor-pointer"
                        title="Xóa gia sư"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* --- MENTORS TAB --- */}
        {activeTab === "mentors" && (
          <div>
            {editingMentor ? (
              <MentorEditForm
                mentor={editingMentor}
                isNew={isAddingMentor}
                onSave={handleSaveMentor}
                onCancel={() => {
                  setEditingMentor(null);
                  setIsAddingMentor(false);
                }}
              />
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {mentors.map((mentor) => (
                  <div
                    key={mentor.id}
                    className="border-2 border-[#122554] bg-white p-5 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div>
                      <div className="flex items-start gap-4 mb-4">
                        <img
                          src={mentor.image}
                          alt={mentor.name}
                          className="w-20 h-24 object-contain border border-[#122554]/20 p-1 bg-white shrink-0"
                        />
                        <div>
                          <h3 className="font-display font-bold text-lg text-[#122554] leading-tight">
                            {mentor.name}
                          </h3>
                          <p className="text-xs text-gray-600 mt-1 line-clamp-2">{mentor.role}</p>
                          <div className="flex flex-wrap gap-1 mt-2">
                            <span className="text-[10px] font-bold bg-[#122554] text-white px-2 py-0.5">
                              {mentor.academics.length} Học thuật
                            </span>
                            <span className="text-[10px] font-bold bg-slate-200 text-[#122554] px-2 py-0.5">
                              {mentor.leadership.length} Kinh nghiệm
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="text-xs text-gray-600 space-y-1 mb-4">
                        <p className="font-semibold text-[#122554]">Trúng tuyển tiêu biểu:</p>
                        <ul className="list-disc list-inside space-y-0.5 line-clamp-3 pl-1">
                          {mentor.admits.map((a, i) => (
                            <li key={i}>{a}</li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="flex gap-2 border-t border-gray-200 pt-3 mt-2">
                      <button
                        onClick={() => {
                          setIsAddingMentor(false);
                          setEditingMentor(mentor);
                        }}
                        className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-[#122554] text-white text-xs font-semibold hover:bg-black transition-colors cursor-pointer"
                      >
                        <Edit className="h-3.5 w-3.5" /> Chỉnh sửa
                      </button>
                      <button
                        onClick={() => handleDeleteMentor(mentor.id)}
                        className="px-3 py-2 border border-red-500 text-red-600 hover:bg-red-50 text-xs transition-colors cursor-pointer"
                        title="Xóa mentor"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* --- LIBRARY TAB --- */}
        {activeTab === "library" && (
          <div>
            {editingPost ? (
              <PostEditForm
                post={editingPost}
                isNew={isAddingPost}
                onSave={handleSavePost}
                onCancel={() => {
                  setEditingPost(null);
                  setIsAddingPost(false);
                }}
              />
            ) : (
              <div className="space-y-4">
                {posts.map((post) => (
                  <div
                    key={post.id}
                    className="border-2 border-[#122554] bg-white p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-sm"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-bold bg-[#122554] text-white px-2.5 py-0.5">
                          Phần {post.partId}
                        </span>
                        <h3 className="font-display font-bold text-base text-[#122554]">
                          {post.title}
                        </h3>
                      </div>
                      <p className="text-xs text-gray-600 mt-1">{post.desc}</p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => {
                          setIsAddingPost(false);
                          setEditingPost(post);
                        }}
                        className="flex items-center gap-1.5 px-4 py-2 bg-[#122554] text-white text-xs font-semibold hover:bg-black transition-colors cursor-pointer"
                      >
                        <Edit className="h-3.5 w-3.5" /> Chỉnh sửa bài viết
                      </button>
                      <button
                        onClick={() => handleDeletePost(post.id)}
                        className="p-2 border border-red-500 text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                        title="Xóa bài viết"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// --- Tutor Form Modal / Sub-component ---
function TutorEditForm({
  tutor,
  isNew,
  onSave,
  onCancel,
}: {
  tutor: TutorItem;
  isNew: boolean;
  onSave: (t: TutorItem) => void;
  onCancel: () => void;
}) {
  const [formData, setFormData] = useState<TutorItem>({ ...tutor });
  const [classesText, setClassesText] = useState(tutor.classes.join("\n"));
  const [academicsText, setAcademicsText] = useState(tutor.academics.join("\n"));
  const [imagePreview, setImagePreview] = useState<string>(tutor.image || "");
  const [isDragging, setIsDragging] = useState(false);

  const handleImageFile = (file: File) => {
    if (!file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const result = ev.target?.result as string;
      setImagePreview(result);
      setFormData((prev) => ({ ...prev, image: result }));
    };
    reader.readAsDataURL(file);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleImageFile(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleImageFile(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...formData,
      classes: classesText.split("\n").map((s) => s.trim()).filter(Boolean),
      academics: academicsText.split("\n").map((s) => s.trim()).filter(Boolean),
    });
  };

  return (
    <div className="bg-white border-2 border-[#122554] p-8 shadow-xl">
      <div className="flex items-center justify-between pb-4 mb-6 border-b-2 border-[#122554]">
        <h2 className="font-display font-bold text-xl text-[#122554]">
          {isNew ? "Thêm Gia Sư Mới" : `Chỉnh Sửa Hồ Sơ Gia Sư: ${formData.name}`}
        </h2>
        <button onClick={onCancel} className="text-gray-500 hover:text-black font-bold">
          ✕ Hủy
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className="block text-xs uppercase tracking-wider text-[#122554] font-bold mb-1">
              Họ và tên Tutor <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="VD: Trần Văn Nghĩa"
              className="w-full border-2 border-gray-300 px-4 py-2.5 text-sm focus:border-[#122554] outline-none"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-[#122554] font-bold mb-1">
              Học vấn / Trường <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              placeholder="VD: Cử nhân Kỹ thuật Cơ khí - Đại học VinUni"
              className="w-full border-2 border-gray-300 px-4 py-2.5 text-sm focus:border-[#122554] outline-none"
            />
          </div>
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-xs uppercase tracking-wider text-[#122554] font-bold mb-2">
            Ảnh đại diện Tutor
          </label>
          <div className="flex gap-4 items-start">
            <div className="shrink-0 w-24 h-28 border-2 border-dashed border-[#122554]/40 bg-gray-50 flex items-center justify-center overflow-hidden">
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-full object-cover"
                  onError={() => setImagePreview("")}
                />
              ) : (
                <span className="text-xs text-gray-400 text-center px-2">Chưa có ảnh</span>
              )}
            </div>

            <div className="flex-1 space-y-2">
              <label
                htmlFor="tutor-image-upload"
                onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
                className={`flex flex-col items-center justify-center w-full h-20 border-2 border-dashed cursor-pointer transition-colors ${
                  isDragging
                    ? "border-[#122554] bg-[#122554]/10"
                    : "border-[#122554]/40 bg-gray-50 hover:bg-[#122554]/5 hover:border-[#122554]"
                }`}
              >
                <span className="text-sm font-semibold text-[#122554]">📁 Nhấn để chọn ảnh</span>
                <span className="text-xs text-gray-400 mt-0.5">hoặc kéo thả vào đây · JPG, PNG, WEBP</span>
                <input
                  id="tutor-image-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileInput}
                />
              </label>

              <div className="flex items-center gap-2">
                <div className="flex-1 h-px bg-gray-200" />
                <span className="text-xs text-gray-400 shrink-0">hoặc nhập URL ảnh</span>
                <div className="flex-1 h-px bg-gray-200" />
              </div>
              <input
                type="text"
                value={imagePreview.startsWith("data:") ? "" : imagePreview}
                onChange={(e) => {
                  setImagePreview(e.target.value);
                  setFormData({ ...formData, image: e.target.value });
                }}
                placeholder="/images/tutors/tutor-1.png hoặc https://..."
                className="w-full border border-gray-300 px-3 py-1.5 text-xs focus:border-[#122554] outline-none"
              />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-xs uppercase tracking-wider text-[#122554] font-bold mb-1">
            Về Tutor / Triết lý giảng dạy
          </label>
          <textarea
            rows={3}
            value={formData.about}
            onChange={(e) => setFormData({ ...formData, about: e.target.value })}
            placeholder="Tóm tắt về định hướng, phong cách giảng dạy..."
            className="w-full border-2 border-gray-300 px-4 py-2.5 text-sm focus:border-[#122554] outline-none"
          />
        </div>

        <div>
          <label className="block text-xs uppercase tracking-wider text-[#122554] font-bold mb-1">
            Các lớp giảng dạy (Mỗi môn 1 dòng)
          </label>
          <textarea
            rows={4}
            value={classesText}
            onChange={(e) => setClassesText(e.target.value)}
            placeholder={"IGCSE Maths\nAS & A Level Maths\nAS & A Level Physics"}
            className="w-full border-2 border-gray-300 px-4 py-2.5 text-sm font-mono focus:border-[#122554] outline-none"
          />
        </div>

        <div>
          <label className="block text-xs uppercase tracking-wider text-[#122554] font-bold mb-1">
            Kinh nghiệm học thuật &amp; Thành tích (Mỗi thành tích 1 dòng)
          </label>
          <textarea
            rows={5}
            value={academicsText}
            onChange={(e) => setAcademicsText(e.target.value)}
            placeholder={"Giải Ba Học sinh giỏi môn Vật lý cấp Quốc gia\nHọc bổng Odon Vallet..."}
            className="w-full border-2 border-gray-300 px-4 py-2.5 text-sm font-mono focus:border-[#122554] outline-none"
          />
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2.5 border border-gray-300 text-gray-700 hover:bg-gray-100 text-sm font-medium"
          >
            Hủy bỏ
          </button>
          <button
            type="submit"
            className="flex items-center gap-2 px-6 py-2.5 bg-[#122554] text-white hover:bg-black text-sm font-semibold cursor-pointer"
          >
            <Save className="h-4 w-4" /> Lưu thông tin
          </button>
        </div>
      </form>
    </div>
  );
}

// --- Mentor Form Modal / Sub-component ---
function MentorEditForm({
  mentor,
  isNew,
  onSave,
  onCancel,
}: {
  mentor: MentorItem;
  isNew: boolean;
  onSave: (m: MentorItem) => void;
  onCancel: () => void;
}) {
  const [formData, setFormData] = useState<MentorItem>({ ...mentor });
  const [academicsText, setAcademicsText] = useState(mentor.academics.join("\n"));
  const [leadershipText, setLeadershipText] = useState(mentor.leadership.join("\n"));
  const [admitsText, setAdmitsText] = useState(mentor.admits.join("\n"));
  const [imagePreview, setImagePreview] = useState<string>(mentor.image || "");
  const [isDragging, setIsDragging] = useState(false);

  const handleImageFile = (file: File) => {
    if (!file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const result = ev.target?.result as string;
      setImagePreview(result);
      setFormData((prev) => ({ ...prev, image: result }));
    };
    reader.readAsDataURL(file);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleImageFile(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleImageFile(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...formData,
      academics: academicsText.split("\n").map((s) => s.trim()).filter(Boolean),
      leadership: leadershipText.split("\n").map((s) => s.trim()).filter(Boolean),
      admits: admitsText.split("\n").map((s) => s.trim()).filter(Boolean),
    });
  };

  return (
    <div className="bg-white border-2 border-[#122554] p-8 shadow-xl">
      <div className="flex items-center justify-between pb-4 mb-6 border-b-2 border-[#122554]">
        <h2 className="font-display font-bold text-xl text-[#122554]">
          {isNew ? "Thêm Mentor Mới" : `Chỉnh Sửa Hồ Sơ Mentor: ${formData.name}`}
        </h2>
        <button onClick={onCancel} className="text-gray-500 hover:text-black font-bold">
          ✕ Hủy
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className="block text-xs uppercase tracking-wider text-[#122554] font-bold mb-1">
              Họ và tên Mentor <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="VD: Mentor Uyển Như"
              className="w-full border-2 border-gray-300 px-4 py-2.5 text-sm focus:border-[#122554] outline-none"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-[#122554] font-bold mb-1">
              Lĩnh vực chuyên môn / Quốc gia <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              placeholder="VD: Giáo dục, Chính sách xã hội & Kinh tế · UK / US"
              className="w-full border-2 border-gray-300 px-4 py-2.5 text-sm focus:border-[#122554] outline-none"
            />
          </div>
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-xs uppercase tracking-wider text-[#122554] font-bold mb-2">
            Chân dung / Ảnh đại diện Mentor
          </label>
          <div className="flex gap-4 items-start">
            <div className="shrink-0 w-24 h-32 border-2 border-dashed border-[#122554]/40 bg-gray-50 flex items-center justify-center overflow-hidden">
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-full object-contain"
                  onError={() => setImagePreview("")}
                />
              ) : (
                <span className="text-xs text-gray-400 text-center px-2">Chưa có ảnh</span>
              )}
            </div>

            <div className="flex-1 space-y-2">
              <label
                htmlFor="mentor-image-upload"
                onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
                className={`flex flex-col items-center justify-center w-full h-20 border-2 border-dashed cursor-pointer transition-colors ${
                  isDragging
                    ? "border-[#122554] bg-[#122554]/10"
                    : "border-[#122554]/40 bg-gray-50 hover:bg-[#122554]/5 hover:border-[#122554]"
                }`}
              >
                <span className="text-sm font-semibold text-[#122554]">📁 Nhấn để chọn ảnh</span>
                <span className="text-xs text-gray-400 mt-0.5">hoặc kéo thả vào đây · JPG, PNG, WEBP</span>
                <input
                  id="mentor-image-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileInput}
                />
              </label>

              <div className="flex items-center gap-2">
                <div className="flex-1 h-px bg-gray-200" />
                <span className="text-xs text-gray-400 shrink-0">hoặc nhập URL ảnh</span>
                <div className="flex-1 h-px bg-gray-200" />
              </div>
              <input
                type="text"
                value={imagePreview.startsWith("data:") ? "" : imagePreview}
                onChange={(e) => {
                  setImagePreview(e.target.value);
                  setFormData({ ...formData, image: e.target.value });
                }}
                placeholder="/images/mentors/mentor-1.png hoặc https://..."
                className="w-full border border-gray-300 px-3 py-1.5 text-xs focus:border-[#122554] outline-none"
              />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-xs uppercase tracking-wider text-[#122554] font-bold mb-1">
            Tab 1: Thành tích học thuật (Mỗi ý 1 dòng)
          </label>
          <textarea
            rows={4}
            value={academicsText}
            onChange={(e) => setAcademicsText(e.target.value)}
            placeholder={"Top 1% International Linguistic Olympiad (IOL) Vietnam 2025\nA Level: A*A*A*A*..."}
            className="w-full border-2 border-gray-300 px-4 py-2.5 text-sm font-mono focus:border-[#122554] outline-none"
          />
        </div>

        <div>
          <label className="block text-xs uppercase tracking-wider text-[#122554] font-bold mb-1">
            Tab 2: Kinh nghiệm & Dự án thực tế (Mỗi ý 1 dòng)
          </label>
          <textarea
            rows={4}
            value={leadershipText}
            onChange={(e) => setLeadershipText(e.target.value)}
            placeholder={"World Economic Forum – Global Shapers (Junior Curator)..."}
            className="w-full border-2 border-gray-300 px-4 py-2.5 text-sm font-mono focus:border-[#122554] outline-none"
          />
        </div>

        <div>
          <label className="block text-xs uppercase tracking-wider text-[#122554] font-bold mb-1">
            Tab 3: Kết quả Trúng tuyển & Học bổng (Mỗi trường/học bổng 1 dòng)
          </label>
          <textarea
            rows={4}
            value={admitsText}
            onChange={(e) => setAdmitsText(e.target.value)}
            placeholder={"Top UK: LSE, UCL, University of Manchester...\nMount Holyoke College — 7 tỷ VNĐ"}
            className="w-full border-2 border-gray-300 px-4 py-2.5 text-sm font-mono focus:border-[#122554] outline-none"
          />
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2.5 border border-gray-300 text-gray-700 hover:bg-gray-100 text-sm font-medium"
          >
            Hủy bỏ
          </button>
          <button
            type="submit"
            className="flex items-center gap-2 px-6 py-2.5 bg-[#122554] text-white hover:bg-black text-sm font-semibold cursor-pointer"
          >
            <Save className="h-4 w-4" /> Lưu thông tin Mentor
          </button>
        </div>
      </form>
    </div>
  );
}

// --- Rich Post Form Sub-component with Live Markdown Editor ---
function PostEditForm({
  post,
  isNew,
  onSave,
  onCancel,
}: {
  post: ResourcePost;
  isNew: boolean;
  onSave: (p: ResourcePost) => void;
  onCancel: () => void;
}) {
  const [formData, setFormData] = useState<ResourcePost>({ ...post });
  const [editorTab, setEditorTab] = useState<"edit" | "preview">("edit");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  // Insert markdown snippet helper
  const insertSnippet = (before: string, after: string = "", defaultText: string = "") => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const currentText = formData.content;

    const selectedText = currentText.substring(start, end) || defaultText;
    const replacement = `${before}${selectedText}${after}`;

    const newContent =
      currentText.substring(0, start) + replacement + currentText.substring(end);

    setFormData({ ...formData, content: newContent });

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(
        start + before.length,
        start + before.length + selectedText.length
      );
    }, 50);
  };

  const insertTable = () => {
    const tableTemplate = `\n\n| Hạng mục | Chi tiết / Mô tả | Ghi chú |\n|---|---|---|\n| Ý thứ nhất | Nội dung chi tiết 1 | Thông tin bổ sung |\n| Ý thứ hai | Nội dung chi tiết 2 | Thông tin bổ sung |\n\n`;
    insertSnippet("", "", tableTemplate);
  };

  return (
    <div className="bg-white border-2 border-[#122554] p-6 md:p-8 shadow-xl">
      <div className="flex items-center justify-between pb-4 mb-6 border-b-2 border-[#122554]">
        <div>
          <h2 className="font-display font-bold text-xl text-[#122554]">
            {isNew ? "Thêm Bài Viết Mới" : `Chỉnh Sửa Bài Viết: ${formData.title}`}
          </h2>
          <p className="text-xs text-gray-500 mt-0.5">
            Sử dụng bộ công cụ bên dưới để định dạng bài viết cực đẹp mắt mà không cần nhớ cú pháp Markdown.
          </p>
        </div>
        <button onClick={onCancel} className="text-gray-500 hover:text-black font-bold">
          ✕ Hủy
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid gap-5 sm:grid-cols-3">
          <div className="sm:col-span-2">
            <label className="block text-xs uppercase tracking-wider text-[#122554] font-bold mb-1">
              Tiêu đề bài viết <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="VD: Bài 1. 4 Yếu tố quyết định bạn đã sẵn sàng đi du học chưa?"
              className="w-full border-2 border-gray-300 px-4 py-2.5 text-sm focus:border-[#122554] outline-none"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-[#122554] font-bold mb-1">
              Thuộc Phần <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.partId}
              onChange={(e) => setFormData({ ...formData, partId: Number(e.target.value) })}
              className="w-full border-2 border-gray-300 px-4 py-2.5 text-sm focus:border-[#122554] outline-none bg-white font-medium"
            >
              <option value={1}>Phần 1: Tư duy & Định hướng</option>
              <option value={2}>Phần 2: Chọn ngành & Bản đồ</option>
              <option value={3}>Phần 3: Bản đồ du học & Chọn trường</option>
              <option value={4}>Phần 4: Tài chính & Học bổng</option>
              <option value={5}>Phần 5: Xây dựng hồ sơ từ cấp 3</option>
              <option value={6}>Phần 6: Viết luận & Nộp hồ sơ</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs uppercase tracking-wider text-[#122554] font-bold mb-1">
            Tóm tắt ngắn (Description)
          </label>
          <input
            type="text"
            value={formData.desc}
            onChange={(e) => setFormData({ ...formData, desc: e.target.value })}
            placeholder="Tóm lược nội dung chính trong 1-2 câu..."
            className="w-full border-2 border-gray-300 px-4 py-2.5 text-sm focus:border-[#122554] outline-none"
          />
        </div>

        {/* --- RICH MARKDOWN EDITOR SECTION --- */}
        <div className="border-2 border-[#122554]">
          {/* Editor Header / Tab Switcher & Toolbar */}
          <div className="bg-slate-100 border-b-2 border-[#122554] p-3 flex flex-wrap items-center justify-between gap-3">
            {/* View Mode Toggle */}
            <div className="flex bg-white border border-[#122554] p-0.5">
              <button
                type="button"
                onClick={() => setEditorTab("edit")}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold transition-colors cursor-pointer ${
                  editorTab === "edit" ? "bg-[#122554] text-white" : "text-[#122554] hover:bg-slate-100"
                }`}
              >
                <Code2 className="h-3.5 w-3.5" /> Soạn thảo
              </button>
              <button
                type="button"
                onClick={() => setEditorTab("preview")}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold transition-colors cursor-pointer ${
                  editorTab === "preview" ? "bg-[#122554] text-white" : "text-[#122554] hover:bg-slate-100"
                }`}
              >
                <Eye className="h-3.5 w-3.5" /> Xem trước (Live Preview)
              </button>
            </div>

            {/* Quick Formatting Toolbar (Only in edit mode) */}
            {editorTab === "edit" && (
              <div className="flex flex-wrap items-center gap-1 bg-white border border-gray-300 p-1">
                <button
                  type="button"
                  onClick={() => insertSnippet("**", "**", "chữ in đậm")}
                  className="p-1.5 hover:bg-slate-100 text-gray-700 transition-colors cursor-pointer"
                  title="In đậm (Bold)"
                >
                  <Bold className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => insertSnippet("*", "*", "chữ in nghiêng")}
                  className="p-1.5 hover:bg-slate-100 text-gray-700 transition-colors cursor-pointer"
                  title="In nghiêng (Italic)"
                >
                  <Italic className="h-4 w-4" />
                </button>

                <div className="w-px h-4 bg-gray-300 mx-1" />

                <button
                  type="button"
                  onClick={() => insertSnippet("\n\n## ", "\n", "Tiêu đề phần lớn")}
                  className="p-1.5 hover:bg-slate-100 text-gray-700 transition-colors cursor-pointer"
                  title="Tiêu đề H2"
                >
                  <Heading2 className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => insertSnippet("\n\n### ", "\n", "Tiêu đề phụ")}
                  className="p-1.5 hover:bg-slate-100 text-gray-700 transition-colors cursor-pointer"
                  title="Tiêu đề H3"
                >
                  <Heading3 className="h-4 w-4" />
                </button>

                <div className="w-px h-4 bg-gray-300 mx-1" />

                <button
                  type="button"
                  onClick={() => insertSnippet("\n- ", "\n- Ý thứ hai\n- Ý thứ ba", "Ý thứ nhất")}
                  className="p-1.5 hover:bg-slate-100 text-gray-700 transition-colors cursor-pointer"
                  title="Danh sách gạch đầu dòng"
                >
                  <List className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => insertSnippet("\n1. ", "\n2. Mục hai\n3. Mục ba", "Mục một")}
                  className="p-1.5 hover:bg-slate-100 text-gray-700 transition-colors cursor-pointer"
                  title="Danh sách số"
                >
                  <ListOrdered className="h-4 w-4" />
                </button>

                <div className="w-px h-4 bg-gray-300 mx-1" />

                <button
                  type="button"
                  onClick={() => insertSnippet("\n> ", "\n", "Trích dẫn hoặc ghi chú chú ý")}
                  className="p-1.5 hover:bg-slate-100 text-gray-700 transition-colors cursor-pointer"
                  title="Khối trích dẫn (Quote)"
                >
                  <Quote className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={insertTable}
                  className="flex items-center gap-1 px-2 py-1 bg-slate-100 hover:bg-[#122554] hover:text-white text-xs font-bold transition-colors cursor-pointer"
                  title="Tạo bảng dữ liệu"
                >
                  <Table className="h-3.5 w-3.5" /> Chèn Bảng
                </button>
                <button
                  type="button"
                  onClick={() => insertSnippet("\n\n---\n\n")}
                  className="p-1.5 hover:bg-slate-100 text-gray-700 transition-colors cursor-pointer"
                  title="Đường kẻ phân cách"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => insertSnippet("[", "](https://example.com)", "Tên đường dẫn")}
                  className="p-1.5 hover:bg-slate-100 text-gray-700 transition-colors cursor-pointer"
                  title="Chèn Link web"
                >
                  <Link2 className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>

          {/* Editor Body */}
          {editorTab === "edit" ? (
            <div className="p-4 bg-white space-y-2">
              <textarea
                ref={textareaRef}
                rows={12}
                required
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                placeholder="Nhập toàn bộ nội dung bài viết vào đây... Sử dụng các nút bấm trên thanh công cụ để chèn định dạng dễ dàng!"
                className="w-full border border-gray-300 p-4 text-sm font-mono leading-relaxed focus:border-[#122554] outline-none"
              />

              {/* Helper Bar */}
              <div className="flex items-center justify-between text-xs text-gray-500 bg-slate-50 p-2.5 border border-gray-200">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-[#122554]" />
                  <span>Mẹo: Xuống dòng 2 lần để tách đoạn mới. Nhấn nút <b>"Chèn Bảng"</b> để tạo bảng ngay lập tức.</span>
                </div>
                <span className="font-mono text-gray-400">{formData.content.length} ký tự</span>
              </div>
            </div>
          ) : (
            /* Live Preview Mode */
            <div className="p-6 bg-slate-50 min-h-[350px] max-h-[500px] overflow-y-auto">
              <div className="bg-white border-2 border-[#122554] p-6 shadow-sm">
                <span className="text-[10px] font-bold bg-[#122554] text-white px-2 py-0.5 mb-2 inline-block">
                  XEM TRƯỚC HIỂN THỊ TRÊN WEB
                </span>
                <h2 className="font-display font-bold text-xl text-[#122554] mb-2">{formData.title || "Tiêu đề bài viết"}</h2>
                <p className="text-xs text-gray-500 mb-4 border-b border-gray-200 pb-3">{formData.desc || "Mô tả ngắn của bài viết"}</p>

                <div className="prose prose-sm prose-slate max-w-none prose-p:leading-relaxed prose-a:text-[#122554] prose-a:font-semibold prose-table:w-full prose-table:border-collapse prose-th:border prose-th:border-[#122554]/30 prose-th:bg-[#122554] prose-th:text-white prose-th:text-xs prose-th:px-3 prose-th:py-2 prose-td:border prose-td:border-[#122554]/20 prose-td:px-3 prose-td:py-2 prose-td:text-sm prose-headings:text-[#122554] prose-headings:font-bold prose-li:my-0.5">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {formData.content || "*Chưa có nội dung. Chuyển sang thẻ 'Soạn thảo' để nhập bài viết.*"}
                  </ReactMarkdown>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2.5 border border-gray-300 text-gray-700 hover:bg-gray-100 text-sm font-medium"
          >
            Hủy bỏ
          </button>
          <button
            type="submit"
            className="flex items-center gap-2 px-6 py-2.5 bg-[#122554] text-white hover:bg-black text-sm font-semibold cursor-pointer"
          >
            <Save className="h-4 w-4" /> Lưu bài viết
          </button>
        </div>
      </form>
    </div>
  );
}

