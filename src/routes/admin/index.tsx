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
  Lock,
  Mail,
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
  AlertTriangle,
  History,
  Shield,
  SlidersHorizontal,
  UserPlus,
  UserCheck,
  UserX,
  X,
  Layers,
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
  AdminUser,
  AuditLogItem,
  FilterCategory,
  UNIFIED_ADMIN_PASSWORD,
  getAdminUsers,
  addAdminUser,
  removeAdminUser,
  getCurrentAdmin,
  setCurrentAdmin,
  clearCurrentAdmin,
  validateAdminLogin,
  getAuditLogs,
  logAdminAction,
  getStoredFilterCategories,
  saveStoredFilterCategories,
  registerCategoryAndSubject,
  removeSubjectFromCategory,
  deleteCategoryById,
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
  const [currentAdminEmail, setCurrentAdminEmail] = useState("");

  // Login inputs
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  // Tabs
  const [activeTab, setActiveTab] = useState<
    "tutors" | "mentors" | "library" | "categories" | "admins" | "audit"
  >("tutors");

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

  // Filter categories state
  const [filterCategories, setFilterCategories] = useState<FilterCategory[]>([]);
  const [newCategoryName, setNewCategoryName] = useState("");
  // Per-category subject addition inputs: { [catId]: inputText }
  const [addSubjectInputs, setAddSubjectInputs] = useState<Record<string, string>>({});
  const [expandedCatId, setExpandedCatId] = useState<string | null>(null);

  // Admin users state
  const [adminUsers, setAdminUsers] = useState<AdminUser[]>([]);
  const [newAdminEmailInput, setNewAdminEmailInput] = useState("");

  // Audit logs state
  const [auditLogs, setAuditLogs] = useState<AuditLogItem[]>([]);

  // Toast state
  const [toastMessage, setToastMessage] = useState("");

  // Warning Modal for Reset to Defaults
  const [resetModal, setResetModal] = useState<{
    isOpen: boolean;
    type: "tutors" | "mentors" | "library";
    title: string;
    description: string;
  } | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3500);
  };

  const refreshAllData = () => {
    setTutors(getStoredTutors());
    setMentors(getStoredMentors());
    setPosts(getStoredPosts());
    setFilterCategories(getStoredFilterCategories());
    setAdminUsers(getAdminUsers());
    setAuditLogs(getAuditLogs());
  };

  useEffect(() => {
    // Check if session is authenticated
    const auth = sessionStorage.getItem("univenture_admin_auth");
    if (auth === "true") {
      setAuthenticated(true);
      const email = getCurrentAdmin();
      setCurrentAdminEmail(email);
    }
    refreshAllData();
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");

    const result = validateAdminLogin(loginEmail, loginPassword);
    if (result.success) {
      setCurrentAdmin(loginEmail);
      setCurrentAdminEmail(loginEmail.trim().toLowerCase());
      setAuthenticated(true);
      logAdminAction(loginEmail, "ĐĂNG NHẬP", "ADMIN", "Đăng nhập thành công vào bảng quản trị");
      refreshAllData();
      showToast(`Chào mừng Admin ${loginEmail}!`);
    } else {
      setLoginError(result.message || "Email hoặc mật khẩu không chính xác!");
    }
  };

  const handleLogout = () => {
    logAdminAction(currentAdminEmail, "ĐĂNG XUẤT", "ADMIN", "Đăng xuất khỏi hệ thống");
    clearCurrentAdmin();
    setAuthenticated(false);
    setCurrentAdminEmail("");
    setLoginEmail("");
    setLoginPassword("");
  };

  // --- Tutor Handlers ---
  const handleSaveTutor = (tutor: TutorItem) => {
    const timestamp = new Date().toLocaleString("vi-VN");
    const updatedTutor: TutorItem = {
      ...tutor,
      lastModifiedBy: currentAdminEmail || "Admin",
      lastModifiedAt: timestamp,
    };

    let updated: TutorItem[];
    if (isAddingTutor) {
      const newTutor = { ...updatedTutor, id: Date.now() };
      updated = [...tutors, newTutor];
      logAdminAction(
        currentAdminEmail,
        "TẠO MỚI",
        "TUTOR",
        `Thêm mới gia sư "${newTutor.name}" (${newTutor.classes.length} môn)`
      );
    } else {
      updated = tutors.map((t) => (t.id === tutor.id ? updatedTutor : t));
      logAdminAction(
        currentAdminEmail,
        "CẬP NHẬT",
        "TUTOR",
        `Cập nhật hồ sơ gia sư "${tutor.name}"`
      );
    }
    setTutors(updated);
    saveStoredTutors(updated);
    setEditingTutor(null);
    setIsAddingTutor(false);
    setAuditLogs(getAuditLogs());
    showToast("Đã lưu hồ sơ gia sư thành công!");
  };

  const handleDeleteTutor = (id: number, name: string) => {
    if (confirm(`Bạn có chắc chắn muốn xóa hồ sơ gia sư "${name}"?`)) {
      const updated = tutors.filter((t) => t.id !== id);
      setTutors(updated);
      saveStoredTutors(updated);
      logAdminAction(currentAdminEmail, "XÓA", "TUTOR", `Xóa hồ sơ gia sư "${name}" (ID: ${id})`);
      setAuditLogs(getAuditLogs());
      showToast("Đã xóa gia sư!");
    }
  };

  // Trigger custom warning modal for Reset
  const triggerResetWarning = (type: "tutors" | "mentors" | "library") => {
    const descriptions = {
      tutors: "Toàn bộ danh sách gia sư và các môn học đã chỉnh sửa sẽ bị xóa và quay về danh sách gia sư mặc định ban đầu.",
      mentors: "Toàn bộ danh sách mentor và các thông tin đã cập nhật sẽ bị xóa và quay về danh sách mentor mặc định ban đầu.",
      library: "Toàn bộ bài viết thư viện đã soạn thảo hoặc cập nhật sẽ bị xóa và quay về 7 bài viết mẫu ban đầu.",
    };
    const titles = {
      tutors: "Khôi phục danh sách Gia sư",
      mentors: "Khôi phục danh sách Mentor",
      library: "Khôi phục Thư viện bài viết",
    };
    setResetModal({
      isOpen: true,
      type,
      title: titles[type],
      description: descriptions[type],
    });
  };

  const confirmResetAction = () => {
    if (!resetModal) return;

    if (resetModal.type === "tutors") {
      setTutors(DEFAULT_TUTORS);
      saveStoredTutors(DEFAULT_TUTORS);
      logAdminAction(
        currentAdminEmail,
        "KHÔI PHỤC MẶC ĐỊNH",
        "TUTOR",
        "Khôi phục danh sách gia sư về dữ liệu mặc định ban đầu"
      );
      showToast("Đã khôi phục dữ liệu gia sư mặc định!");
    } else if (resetModal.type === "mentors") {
      setMentors(DEFAULT_MENTORS);
      saveStoredMentors(DEFAULT_MENTORS);
      logAdminAction(
        currentAdminEmail,
        "KHÔI PHỤC MẶC ĐỊNH",
        "MENTOR",
        "Khôi phục danh sách mentor về dữ liệu mặc định ban đầu"
      );
      showToast("Đã khôi phục dữ liệu mentor mặc định!");
    } else if (resetModal.type === "library") {
      setPosts(DEFAULT_POSTS);
      saveStoredPosts(DEFAULT_POSTS);
      logAdminAction(
        currentAdminEmail,
        "KHÔI PHỤC MẶC ĐỊNH",
        "LIBRARY",
        "Khôi phục danh sách bài viết thư viện về mặc định"
      );
      showToast("Đã khôi phục dữ liệu thư viện mặc định!");
    }

    setAuditLogs(getAuditLogs());
    setResetModal(null);
  };

  // --- Mentor Handlers ---
  const handleSaveMentor = (mentor: MentorItem) => {
    const timestamp = new Date().toLocaleString("vi-VN");
    const updatedMentor: MentorItem = {
      ...mentor,
      lastModifiedBy: currentAdminEmail || "Admin",
      lastModifiedAt: timestamp,
    };

    let updated: MentorItem[];
    if (isAddingMentor) {
      const newMentor = { ...updatedMentor, id: Date.now() };
      updated = [...mentors, newMentor];
      logAdminAction(
        currentAdminEmail,
        "TẠO MỚI",
        "MENTOR",
        `Thêm mới mentor "${newMentor.name}" (${newMentor.role})`
      );
    } else {
      updated = mentors.map((m) => (m.id === mentor.id ? updatedMentor : m));
      logAdminAction(
        currentAdminEmail,
        "CẬP NHẬT",
        "MENTOR",
        `Cập nhật hồ sơ mentor "${mentor.name}"`
      );
    }
    setMentors(updated);
    saveStoredMentors(updated);
    setEditingMentor(null);
    setIsAddingMentor(false);
    setAuditLogs(getAuditLogs());
    showToast("Đã lưu hồ sơ mentor thành công!");
  };

  const handleDeleteMentor = (id: number, name: string) => {
    if (confirm(`Bạn có chắc chắn muốn xóa hồ sơ mentor "${name}"?`)) {
      const updated = mentors.filter((m) => m.id !== id);
      setMentors(updated);
      saveStoredMentors(updated);
      logAdminAction(currentAdminEmail, "XÓA", "MENTOR", `Xóa hồ sơ mentor "${name}" (ID: ${id})`);
      setAuditLogs(getAuditLogs());
      showToast("Đã xóa mentor!");
    }
  };

  // --- Library Handlers ---
  const handleSavePost = (post: ResourcePost) => {
    const timestamp = new Date().toLocaleString("vi-VN");
    const updatedPost: ResourcePost = {
      ...post,
      lastModifiedBy: currentAdminEmail || "Admin",
      lastModifiedAt: timestamp,
    };

    let updated: ResourcePost[];
    if (isAddingPost) {
      const newPost = { ...updatedPost, id: Date.now() };
      updated = [...posts, newPost];
      logAdminAction(
        currentAdminEmail,
        "TẠO MỚI",
        "LIBRARY",
        `Thêm mới bài viết "${newPost.title}" (Phần ${newPost.partId})`
      );
    } else {
      updated = posts.map((p) => (p.id === post.id ? updatedPost : p));
      logAdminAction(
        currentAdminEmail,
        "CẬP NHẬT",
        "LIBRARY",
        `Cập nhật bài viết "${post.title}"`
      );
    }
    setPosts(updated);
    saveStoredPosts(updated);
    setEditingPost(null);
    setIsAddingPost(false);
    setAuditLogs(getAuditLogs());
    showToast("Đã lưu bài viết thư viện thành công!");
  };

  const handleDeletePost = (id: number, title: string) => {
    if (confirm(`Bạn có chắc chắn muốn xóa bài viết "${title}" khỏi thư viện?`)) {
      const updated = posts.filter((p) => p.id !== id);
      setPosts(updated);
      saveStoredPosts(updated);
      logAdminAction(currentAdminEmail, "XÓA", "LIBRARY", `Xóa bài viết "${title}" (ID: ${id})`);
      setAuditLogs(getAuditLogs());
      showToast("Đã xóa bài viết!");
    }
  };

  // --- Admin User Handlers ---
  const handleAddAdmin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAdminEmailInput) return;
    const res = addAdminUser(newAdminEmailInput, currentAdminEmail);
    if (res.success) {
      setAdminUsers(getAdminUsers());
      setAuditLogs(getAuditLogs());
      setNewAdminEmailInput("");
      showToast(res.message);
    } else {
      alert(res.message);
    }
  };

  const handleRemoveAdmin = (email: string) => {
    if (confirm(`Bạn có chắc chắn muốn thu hồi quyền quản trị của ${email}?`)) {
      const res = removeAdminUser(email, currentAdminEmail);
      if (res.success) {
        setAdminUsers(getAdminUsers());
        setAuditLogs(getAuditLogs());
        showToast(res.message);
      } else {
        alert(res.message);
      }
    }
  };

  // --- Category Handlers ---
  const handleCreateCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCategoryName.trim()) return;
    const trimmed = newCategoryName.trim();
    // Create the category with a placeholder subject that can be removed later
    const cats = getStoredFilterCategories();
    const exists = cats.some((c) => c.label.toLowerCase() === trimmed.toLowerCase());
    if (exists) { showToast(`Cấp độ "${trimmed}" đã tồn tại!`); return; }
    registerCategoryAndSubject(trimmed, "_placeholder_", currentAdminEmail);
    // Remove the placeholder subject immediately
    const updatedCats = getStoredFilterCategories().map((c) => {
      if (c.label.toLowerCase() !== trimmed.toLowerCase()) return c;
      return { ...c, subjects: c.subjects.filter((s) => s.label !== "_placeholder_") };
    });
    saveStoredFilterCategories(updatedCats);
    setFilterCategories(updatedCats);
    setAuditLogs(getAuditLogs());
    setNewCategoryName("");
    setExpandedCatId(updatedCats.find((c) => c.label.toLowerCase() === trimmed.toLowerCase())?.id ?? null);
    showToast(`Đã tạo cấp độ/chương trình "${trimmed}"! Hãy thêm môn học vào cấp độ này.`);
  };

  const handleAddSubjectToCategory = (catId: string) => {
    const input = (addSubjectInputs[catId] || "").trim();
    if (!input) { showToast("Vui lòng nhập tên môn học!"); return; }
    const cat = filterCategories.find((c) => c.id === catId);
    if (!cat) return;
    const alreadyExists = cat.subjects.some((s) => s.label.toLowerCase() === input.toLowerCase());
    if (alreadyExists) { showToast(`Môn "${input}" đã có trong "${cat.label}"!`); return; }
    registerCategoryAndSubject(cat.label, input, currentAdminEmail);
    setFilterCategories(getStoredFilterCategories());
    setAuditLogs(getAuditLogs());
    setAddSubjectInputs((prev) => ({ ...prev, [catId]: "" }));
    showToast(`Đã thêm môn "${input}" vào cấp độ "${cat.label}"!`);
  };

  const handleRemoveSubject = (catId: string, subjId: string, subjLabel: string) => {
    const cat = filterCategories.find((c) => c.id === catId);
    if (!cat) return;
    removeSubjectFromCategory(catId, subjId, currentAdminEmail);
    setFilterCategories(getStoredFilterCategories());
    setAuditLogs(getAuditLogs());
    showToast(`Đã xóa môn "${subjLabel}" khỏi "${cat.label}"`);
  };

  const handleDeleteCategory = (catId: string) => {
    const cat = filterCategories.find((c) => c.id === catId);
    if (!cat) return;
    if (filterCategories.length <= 1) { showToast("Phải giữ ít nhất 1 cấp độ!"); return; }
    if (!confirm(`Xóa cấp độ "${cat.label}" và tất cả ${cat.subjects.length} môn học? Hành động này không thể hoàn tác.`)) return;
    deleteCategoryById(catId, currentAdminEmail);
    setFilterCategories(getStoredFilterCategories());
    setAuditLogs(getAuditLogs());
    showToast(`Đã xóa cấp độ "${cat.label}"`);
  };


  // --- Login Screen ---
  if (!authenticated) {
    return (
      <div className="min-h-screen bg-[#122554] flex items-center justify-center p-4 relative overflow-hidden">
        <div className="bg-white border-2 border-[#122554] shadow-2xl p-8 max-w-md w-full">
          <div className="text-center mb-6">
            <img src="/logo.svg" alt="UniVenture" className="h-10 mx-auto mb-4" />
            <h1 className="font-display font-bold text-2xl text-[#122554]">
              Đăng nhập Quản Trị
            </h1>
            <p className="text-sm text-gray-600 mt-1">
              Đăng nhập bằng email và mật khẩu quản trị nội bộ
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            {loginError && (
              <div className="p-3 bg-red-50 border-l-4 border-red-500 text-red-700 text-xs flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 shrink-0" />
                <span>{loginError}</span>
              </div>
            )}

            <div>
              <label className="block text-xs uppercase tracking-wider text-[#122554] font-bold mb-1.5">
                Email Admin
              </label>
              <div className="relative">
                <input
                  type="email"
                  autoFocus
                  required
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  placeholder="admin@univentureadmissions.com"
                  className="w-full border-2 border-[#122554] px-4 py-2.5 text-sm focus:border-[#ffcd6b] outline-none"
                />
                <Mail className="h-4 w-4 text-gray-400 absolute right-3.5 top-3.5" />
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-[#122554] font-bold mb-1.5">
                Mật khẩu quản trị
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="Nhập mật khẩu quản trị"
                  className="w-full border-2 border-[#122554] px-4 py-2.5 text-sm focus:border-[#ffcd6b] outline-none"
                />
                <Lock className="h-4 w-4 text-gray-400 absolute right-3.5 top-3.5" />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-[#122554] text-white font-semibold text-sm hover:bg-[#ffcd6b] transition-colors cursor-pointer"
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

      {/* Warning Confirmation Modal for Reset to Defaults */}
      {resetModal && resetModal.isOpen && (
        <div className="fixed inset-0 z-[110] bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white border-2 border-[#122554] shadow-2xl max-w-lg w-full p-6 md:p-8">
            <div className="flex items-center gap-3 text-[#ffcd6b] mb-4">
              <div className="p-3 bg-orange-100 rounded-full">
                <AlertTriangle className="h-7 w-7 text-[#ffcd6b]" />
              </div>
              <div>
                <h3 className="text-lg font-display font-bold text-[#122554]">
                  Cảnh báo khôi phục mặc định!
                </h3>
                <p className="text-xs text-gray-500">{resetModal.title}</p>
              </div>
            </div>

            <div className="p-4 bg-orange-50 border-l-4 border-[#ffcd6b] mb-5 text-xs sm:text-sm text-gray-800 leading-relaxed space-y-2">
              <p className="font-semibold text-red-700">
                ⚠️ Hành động này sẽ xóa toàn bộ các thay đổi và không thể hoàn tác!
              </p>
              <p>{resetModal.description}</p>
              <p className="text-xs text-gray-600 pt-1 border-t border-orange-200">
                Thao tác được thực hiện bởi: <strong>{currentAdminEmail}</strong>
              </p>
            </div>

            <div className="flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setResetModal(null)}
                className="px-5 py-2.5 border-2 border-gray-300 text-gray-700 hover:bg-gray-100 font-semibold text-xs uppercase tracking-wider cursor-pointer"
              >
                Hủy bỏ
              </button>
              <button
                type="button"
                onClick={confirmResetAction}
                className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-wider cursor-pointer shadow-md transition-colors"
              >
                Tôi hiểu rủi ro, Khôi phục ngay
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Top Header */}
      <header className="bg-[#122554] text-white border-b-2 border-[#122554] px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <img src="/logo.svg" alt="UniVenture" className="h-8 w-auto bg-white p-1" />
          <div>
            <h1 className="font-display font-bold text-lg leading-none">Bảng Quản Trị Hệ Thống</h1>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-[11px] text-[#ffcd6b] font-bold">● Đang đăng nhập:</span>
              <span className="text-[11px] text-white/90 bg-white/15 px-2 py-0.5 font-mono">
                {currentAdminEmail}
              </span>
            </div>
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
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => {
                setActiveTab("tutors");
                setEditingTutor(null);
                setIsAddingTutor(false);
              }}
              className={`flex items-center gap-2 px-4 py-2 font-semibold text-xs md:text-sm transition-all border-2 cursor-pointer ${
                activeTab === "tutors"
                  ? "bg-[#122554] text-white border-[#122554]"
                  : "bg-white text-[#122554] border-[#122554] hover:bg-slate-100"
              }`}
            >
              <Users className="h-4 w-4" />
              Gia sư ({tutors.length})
            </button>

            <button
              onClick={() => {
                setActiveTab("mentors");
                setEditingMentor(null);
                setIsAddingMentor(false);
              }}
              className={`flex items-center gap-2 px-4 py-2 font-semibold text-xs md:text-sm transition-all border-2 cursor-pointer ${
                activeTab === "mentors"
                  ? "bg-[#122554] text-white border-[#122554]"
                  : "bg-white text-[#122554] border-[#122554] hover:bg-slate-100"
              }`}
            >
              <Award className="h-4 w-4" />
              Mentors ({mentors.length})
            </button>

            <button
              onClick={() => {
                setActiveTab("library");
                setEditingPost(null);
                setIsAddingPost(false);
              }}
              className={`flex items-center gap-2 px-4 py-2 font-semibold text-xs md:text-sm transition-all border-2 cursor-pointer ${
                activeTab === "library"
                  ? "bg-[#122554] text-white border-[#122554]"
                  : "bg-white text-[#122554] border-[#122554] hover:bg-slate-100"
              }`}
            >
              <BookOpen className="h-4 w-4" />
              Thư viện ({posts.length})
            </button>

            <button
              onClick={() => {
                setActiveTab("categories");
                setFilterCategories(getStoredFilterCategories());
              }}
              className={`flex items-center gap-2 px-4 py-2 font-semibold text-xs md:text-sm transition-all border-2 cursor-pointer ${
                activeTab === "categories"
                  ? "bg-[#122554] text-white border-[#122554]"
                  : "bg-white text-[#122554] border-[#122554] hover:bg-slate-100"
              }`}
            >
              <SlidersHorizontal className="h-4 w-4" />
              Bộ lọc &amp; Môn học
            </button>

            <button
              onClick={() => {
                setActiveTab("admins");
                setAdminUsers(getAdminUsers());
              }}
              className={`flex items-center gap-2 px-4 py-2 font-semibold text-xs md:text-sm transition-all border-2 cursor-pointer ${
                activeTab === "admins"
                  ? "bg-[#122554] text-white border-[#122554]"
                  : "bg-white text-[#122554] border-[#122554] hover:bg-slate-100"
              }`}
            >
              <Shield className="h-4 w-4" />
              Tài khoản Admin ({adminUsers.length})
            </button>

            <button
              onClick={() => {
                setActiveTab("audit");
                setAuditLogs(getAuditLogs());
              }}
              className={`flex items-center gap-2 px-4 py-2 font-semibold text-xs md:text-sm transition-all border-2 cursor-pointer ${
                activeTab === "audit"
                  ? "bg-[#122554] text-white border-[#122554]"
                  : "bg-white text-[#122554] border-[#122554] hover:bg-slate-100"
              }`}
            >
              <History className="h-4 w-4" />
              Nhật ký thay đổi
            </button>
          </div>

          <div>
            {activeTab === "tutors" && !editingTutor && !isAddingTutor && (
              <div className="flex gap-2">
                <button
                  onClick={() => triggerResetWarning("tutors")}
                  className="flex items-center gap-1.5 px-3 py-2 text-xs border border-gray-300 bg-white text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer"
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
                  className="flex items-center gap-2 px-4 py-2 bg-[#122554] text-white font-bold text-sm hover:bg-[#ffcd6b] transition-colors border-2 border-[#122554] cursor-pointer"
                >
                  <Plus className="h-4 w-4 text-[#ffcd6b]" /> Thêm Gia sư mới
                </button>
              </div>
            )}

            {activeTab === "mentors" && !editingMentor && !isAddingMentor && (
              <div className="flex gap-2">
                <button
                  onClick={() => triggerResetWarning("mentors")}
                  className="flex items-center gap-1.5 px-3 py-2 text-xs border border-gray-300 bg-white text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer"
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
                  className="flex items-center gap-2 px-4 py-2 bg-[#122554] text-white font-bold text-sm hover:bg-[#ffcd6b] transition-colors border-2 border-[#122554] cursor-pointer"
                >
                  <Plus className="h-4 w-4 text-[#ffcd6b]" /> Thêm Mentor mới
                </button>
              </div>
            )}

            {activeTab === "library" && !editingPost && !isAddingPost && (
              <div className="flex gap-2">
                <button
                  onClick={() => triggerResetWarning("library")}
                  className="flex items-center gap-1.5 px-3 py-2 text-xs border border-gray-300 bg-white text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer"
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
                  className="flex items-center gap-2 px-4 py-2 bg-[#122554] text-white font-bold text-sm hover:bg-[#ffcd6b] transition-colors border-2 border-[#122554] cursor-pointer"
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
                currentAdmin={currentAdminEmail}
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
                            {tutor.classes.length} Môn giảng dạy
                          </span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-1 mb-3">
                        {tutor.classes.map((c, i) => (
                          <span
                            key={i}
                            className="text-[10px] bg-slate-100 text-[#122554] border border-[#122554]/20 px-1.5 py-0.5 font-medium"
                          >
                            {c}
                          </span>
                        ))}
                      </div>

                      <p className="text-xs text-gray-600 line-clamp-2 mb-3">{tutor.about}</p>

                      {tutor.lastModifiedBy && (
                        <p className="text-[11px] text-gray-500 italic border-t border-gray-100 pt-2">
                          Sửa bởi: <span className="font-semibold text-[#122554]">{tutor.lastModifiedBy}</span>{" "}
                          ({tutor.lastModifiedAt})
                        </p>
                      )}
                    </div>

                    <div className="flex gap-2 border-t border-gray-200 pt-3 mt-3">
                      <button
                        onClick={() => {
                          setIsAddingTutor(false);
                          setEditingTutor(tutor);
                        }}
                        className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-[#122554] text-white text-xs font-semibold hover:bg-[#ffcd6b] transition-colors cursor-pointer"
                      >
                        <Edit className="h-3.5 w-3.5" /> Chỉnh sửa
                      </button>
                      <button
                        onClick={() => handleDeleteTutor(tutor.id, tutor.name)}
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

                      {mentor.lastModifiedBy && (
                        <p className="text-[11px] text-gray-500 italic border-t border-gray-100 pt-2">
                          Sửa bởi: <span className="font-semibold text-[#122554]">{mentor.lastModifiedBy}</span>{" "}
                          ({mentor.lastModifiedAt})
                        </p>
                      )}
                    </div>

                    <div className="flex gap-2 border-t border-gray-200 pt-3 mt-2">
                      <button
                        onClick={() => {
                          setIsAddingMentor(false);
                          setEditingMentor(mentor);
                        }}
                        className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-[#122554] text-white text-xs font-semibold hover:bg-[#ffcd6b] transition-colors cursor-pointer"
                      >
                        <Edit className="h-3.5 w-3.5" /> Chỉnh sửa
                      </button>
                      <button
                        onClick={() => handleDeleteMentor(mentor.id, mentor.name)}
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
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-bold uppercase tracking-wider bg-[#122554] text-white px-2 py-0.5">
                          Phần {post.partId}
                        </span>
                        <span className="text-xs text-gray-500">{post.content.length} ký tự</span>
                        {post.lastModifiedBy && (
                          <span className="text-xs text-gray-500 italic ml-2">
                            • Sửa bởi: <strong className="text-[#122554]">{post.lastModifiedBy}</strong>{" "}
                            ({post.lastModifiedAt})
                          </span>
                        )}
                      </div>
                      <h3 className="font-display font-bold text-lg text-[#122554] mb-1">
                        {post.title}
                      </h3>
                      <p className="text-xs text-gray-600 line-clamp-2">{post.desc}</p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => {
                          setIsAddingPost(false);
                          setEditingPost(post);
                        }}
                        className="flex items-center gap-1.5 px-4 py-2 bg-[#122554] text-white text-xs font-semibold hover:bg-[#ffcd6b] transition-colors cursor-pointer"
                      >
                        <Edit className="h-3.5 w-3.5" /> Chỉnh sửa
                      </button>
                      <button
                        onClick={() => handleDeletePost(post.id, post.title)}
                        className="p-2 border border-red-500 text-red-600 hover:bg-red-50 text-xs transition-colors cursor-pointer"
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

        {/* --- CATEGORIES & SUBJECTS TAB --- */}
        {activeTab === "categories" && (
          <div className="space-y-6">
            <div className="bg-white border-2 border-[#122554] p-6 shadow-sm">
              <h2 className="text-lg font-display font-bold text-[#122554] mb-2 flex items-center gap-2">
                <SlidersHorizontal className="h-5 w-5 text-[#ffcd6b]" />
                Quản lý Cấp độ &amp; Bộ lọc Môn học
              </h2>
              <p className="text-xs sm:text-sm text-gray-600 mb-6">
                Khi thêm môn học hoặc cấp độ mới tại đây hoặc trong hồ sơ Gia sư, bộ lọc trên trang Gia sư (<code>/gia-su</code>) sẽ tự động đồng bộ ngay lập tức!
              </p>

              {/* Add New Category Form */}
              <form onSubmit={handleCreateCategory} className="flex flex-col sm:flex-row gap-3 mb-8 pb-6 border-b border-gray-200">
                <input
                  type="text"
                  required
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  placeholder="Nhập tên Cấp độ / Chương trình mới (VD: IB Diploma, AP, Hệ Vinschool...)"
                  className="flex-1 border-2 border-[#122554] px-4 py-2.5 text-sm focus:border-[#ffcd6b] outline-none"
                />
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#122554] text-white font-bold text-xs uppercase tracking-wider hover:bg-[#ffcd6b] transition-colors cursor-pointer flex items-center justify-center gap-2"
                >
                  <Plus className="h-4 w-4" /> Thêm Cấp độ
                </button>
              </form>

              {/* Display existing categories and their subjects */}
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filterCategories.map((cat) => (
                  <div key={cat.id} className="border-2 border-[#122554] p-5 bg-slate-50 flex flex-col justify-between shadow-sm">
                    <div>
                      <div className="flex items-center justify-between mb-3 border-b border-[#122554]/20 pb-2">
                        <h3 className="font-display font-bold text-base text-[#122554]">
                          {cat.label}
                        </h3>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] bg-[#122554] text-white px-2 py-0.5 font-bold font-mono">
                            ID: {cat.id}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleDeleteCategory(cat.id)}
                            className="text-red-500 hover:text-red-700 p-1 hover:bg-red-50 rounded cursor-pointer transition-colors"
                            title="Xóa Cấp độ này"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>

                      <div className="flex items-center justify-between mb-2">
                        <p className="text-xs font-semibold text-gray-600">
                          Danh sách môn học ({cat.subjects.length}):
                        </p>
                        <button
                          type="button"
                          onClick={() => setExpandedCatId(expandedCatId === cat.id ? null : cat.id)}
                          className="text-[11px] font-bold text-[#122554] hover:text-[#ffcd6b] flex items-center gap-1 cursor-pointer"
                        >
                          <Plus className="h-3.5 w-3.5" /> Thêm môn
                        </button>
                      </div>

                      {/* Inline form to add subject to this category */}
                      {expandedCatId === cat.id && (
                        <div className="mb-3 p-2 bg-white border border-[#ffcd6b] flex gap-2 animate-in fade-in">
                          <input
                            type="text"
                            value={addSubjectInputs[cat.id] || ""}
                            onChange={(e) =>
                              setAddSubjectInputs((prev) => ({ ...prev, [cat.id]: e.target.value }))
                            }
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                e.preventDefault();
                                handleAddSubjectToCategory(cat.id);
                              }
                            }}
                            placeholder="Tên môn học mới..."
                            className="flex-1 px-2 py-1 text-xs border border-gray-300 outline-none focus:border-[#122554]"
                          />
                          <button
                            type="button"
                            onClick={() => handleAddSubjectToCategory(cat.id)}
                            className="px-3 py-1 bg-[#122554] text-white text-xs font-bold hover:bg-[#ffcd6b] transition-colors cursor-pointer shrink-0"
                          >
                            Lưu
                          </button>
                        </div>
                      )}

                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {cat.subjects.map((s) => (
                          <span
                            key={s.id}
                            className="text-xs bg-white border border-[#122554]/30 text-[#122554] px-2 py-1 font-medium flex items-center gap-1 group"
                          >
                            {s.label}
                            <button
                              type="button"
                              onClick={() => handleRemoveSubject(cat.id, s.id, s.label)}
                              className="text-gray-400 hover:text-red-600 font-bold text-xs ml-0.5 cursor-pointer leading-none"
                              title={`Xóa môn ${s.label}`}
                            >
                              ✕
                            </button>
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-3 border-t border-gray-200 flex items-center justify-between text-[11px] text-gray-500">
                      <span>✓ Tự động kết nối với bộ lọc</span>
                      <span className="italic">{cat.subjects.length} môn</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* --- ADMIN ACCOUNTS TAB --- */}
        {activeTab === "admins" && (
          <div className="space-y-6">
            <div className="bg-white border-2 border-[#122554] p-6 shadow-sm">
              <h2 className="text-lg font-display font-bold text-[#122554] mb-2 flex items-center gap-2">
                <Shield className="h-5 w-5 text-[#ffcd6b]" />
                Phân Quyền &amp; Quản Lý Tài Khoản Admin
              </h2>
              <p className="text-xs sm:text-sm text-gray-600 mb-6">
                Mỗi người được cấp quyền bằng Email riêng. Mọi tài khoản thống nhất sử dụng mật khẩu:{" "}
                <strong className="text-[#122554] font-mono">{UNIFIED_ADMIN_PASSWORD}</strong>. Mỗi thay đổi trên hệ thống sẽ tự động lưu lại email admin đã thực hiện.
              </p>

              {/* Add Admin Form */}
              <form onSubmit={handleAddAdmin} className="flex flex-col sm:flex-row gap-3 mb-8 pb-6 border-b border-gray-200">
                <div className="relative flex-1">
                  <Mail className="h-4 w-4 text-gray-400 absolute left-3.5 top-3.5" />
                  <input
                    type="email"
                    required
                    value={newAdminEmailInput}
                    onChange={(e) => setNewAdminEmailInput(e.target.value)}
                    placeholder="Nhập email nhân sự cần cấp quyền (VD: hoang@univenture.vn)"
                    className="w-full border-2 border-[#122554] pl-10 pr-4 py-2.5 text-sm focus:border-[#ffcd6b] outline-none"
                  />
                </div>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#122554] text-white font-bold text-xs uppercase tracking-wider hover:bg-[#ffcd6b] transition-colors cursor-pointer flex items-center justify-center gap-2"
                >
                  <UserPlus className="h-4 w-4" /> Cấp quyền Admin
                </button>
              </form>

              {/* Admin list table */}
              <div className="overflow-x-auto border-2 border-[#122554]">
                <table className="w-full text-left border-collapse text-xs sm:text-sm">
                  <thead>
                    <tr className="bg-[#122554] text-white uppercase tracking-wider text-[11px]">
                      <th className="p-3.5 border-r border-white/20">Email Quản Trị</th>
                      <th className="p-3.5 border-r border-white/20">Ngày cấp quyền</th>
                      <th className="p-3.5 border-r border-white/20">Cấp bởi</th>
                      <th className="p-3.5 text-center">Thao tác</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {adminUsers.map((user) => {
                      const isSelf = user.email.toLowerCase() === currentAdminEmail.toLowerCase();
                      return (
                        <tr key={user.email} className={isSelf ? "bg-orange-50/60" : "hover:bg-gray-50"}>
                          <td className="p-3.5 font-medium text-[#122554] flex items-center gap-2">
                            <Mail className="h-4 w-4 text-gray-400" />
                            <span>{user.email}</span>
                            {isSelf && (
                              <span className="text-[10px] bg-[#ffcd6b] text-white font-bold px-2 py-0.5 rounded-xs">
                                Bạn
                              </span>
                            )}
                          </td>
                          <td className="p-3.5 text-gray-600 font-mono text-xs">
                            {new Date(user.addedAt).toLocaleDateString("vi-VN")}
                          </td>
                          <td className="p-3.5 text-gray-600 text-xs">{user.addedBy || "Hệ thống"}</td>
                          <td className="p-3.5 text-center">
                            {isSelf ? (
                              <span className="text-xs text-gray-400 italic">Đang đăng nhập</span>
                            ) : (
                              <button
                                onClick={() => handleRemoveAdmin(user.email)}
                                className="px-3 py-1 text-xs border border-red-500 text-red-600 hover:bg-red-50 font-semibold transition-colors cursor-pointer"
                              >
                                Thu hồi quyền
                              </button>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* --- AUDIT LOGS TAB --- */}
        {activeTab === "audit" && (
          <div className="space-y-6">
            <div className="bg-white border-2 border-[#122554] p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-lg font-display font-bold text-[#122554] flex items-center gap-2">
                    <History className="h-5 w-5 text-[#ffcd6b]" />
                    Nhật Ký Hoạt Động (Audit Trail)
                  </h2>
                  <p className="text-xs sm:text-sm text-gray-600 mt-0.5">
                    Lưu vết toàn bộ thao tác: admin nào đã thêm, sửa, xóa hoặc khôi phục dữ liệu để dễ dàng kiểm soát.
                  </p>
                </div>
                <button
                  onClick={() => setAuditLogs(getAuditLogs())}
                  className="px-3 py-1.5 border border-[#122554] text-[#122554] text-xs font-semibold hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  Làm mới
                </button>
              </div>

              {auditLogs.length === 0 ? (
                <div className="text-center py-12 text-gray-500 border border-dashed border-gray-300 text-sm">
                  Chưa có lịch sử hoạt động nào được ghi nhận.
                </div>
              ) : (
                <div className="overflow-x-auto border-2 border-[#122554]">
                  <table className="w-full text-left border-collapse text-xs sm:text-sm">
                    <thead>
                      <tr className="bg-[#122554] text-white uppercase tracking-wider text-[11px]">
                        <th className="p-3 border-r border-white/20 whitespace-nowrap">Thời gian</th>
                        <th className="p-3 border-r border-white/20 whitespace-nowrap">Admin thực hiện</th>
                        <th className="p-3 border-r border-white/20 whitespace-nowrap">Hành động</th>
                        <th className="p-3 border-r border-white/20 whitespace-nowrap">Đối tượng</th>
                        <th className="p-3">Chi tiết</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {auditLogs.map((log) => (
                        <tr key={log.id} className="hover:bg-slate-50">
                          <td className="p-3 text-gray-500 font-mono text-xs whitespace-nowrap">
                            {new Date(log.timestamp).toLocaleString("vi-VN")}
                          </td>
                          <td className="p-3 font-semibold text-[#122554] whitespace-nowrap">
                            {log.adminEmail}
                          </td>
                          <td className="p-3 whitespace-nowrap">
                            <span
                              className={`text-[10px] font-bold uppercase px-2 py-0.5 ${
                                log.action.includes("TẠO") || log.action.includes("CẤP")
                                  ? "bg-green-100 text-green-800"
                                  : log.action.includes("XÓA") || log.action.includes("THU HỒI")
                                    ? "bg-red-100 text-red-800"
                                    : log.action.includes("KHÔI PHỤC")
                                      ? "bg-orange-100 text-orange-800"
                                      : "bg-blue-100 text-blue-800"
                              }`}
                            >
                              {log.action}
                            </span>
                          </td>
                          <td className="p-3 text-gray-700 font-medium whitespace-nowrap">{log.target}</td>
                          <td className="p-3 text-gray-600">{log.details}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// --- Tutor Form Modal / Sub-component with Dynamic Category & Subject Selector ---
function TutorEditForm({
  tutor,
  isNew,
  currentAdmin,
  onSave,
  onCancel,
}: {
  tutor: TutorItem;
  isNew: boolean;
  currentAdmin: string;
  onSave: (t: TutorItem) => void;
  onCancel: () => void;
}) {
  const [formData, setFormData] = useState<TutorItem>({ ...tutor });
  const [classesList, setClassesList] = useState<string[]>(tutor.classes || []);
  const [academicsText, setAcademicsText] = useState(tutor.academics.join("\n"));
  const [imagePreview, setImagePreview] = useState<string>(tutor.image || "");

  // Dynamic Category & Subject Selector states
  const [categories, setCategories] = useState<FilterCategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [customCategoryInput, setCustomCategoryInput] = useState<string>("");
  const [selectedSubject, setSelectedSubject] = useState<string>("");
  const [customSubjectInput, setCustomSubjectInput] = useState<string>("");

  useEffect(() => {
    const cats = getStoredFilterCategories();
    setCategories(cats);
    if (cats.length > 0) {
      setSelectedCategory(cats[0].label);
      if (cats[0].subjects.length > 0) {
        setSelectedSubject(cats[0].subjects[0].label);
      }
    }
  }, []);

  // When category changes, update default subject
  const handleCategoryChange = (catLabel: string) => {
    setSelectedCategory(catLabel);
    if (catLabel !== "NEW") {
      const found = categories.find((c) => c.label === catLabel);
      if (found && found.subjects.length > 0) {
        setSelectedSubject(found.subjects[0].label);
      } else {
        setSelectedSubject("NEW");
      }
    } else {
      setSelectedSubject("NEW");
    }
  };

  const handleAddClass = () => {
    const finalCategory =
      selectedCategory === "NEW" ? customCategoryInput.trim() : selectedCategory;
    const finalSubject =
      selectedSubject === "NEW" ? customSubjectInput.trim() : selectedSubject;

    if (!finalCategory) {
      alert("Vui lòng chọn hoặc nhập Cấp độ / Chương trình!");
      return;
    }
    if (!finalSubject) {
      alert("Vui lòng chọn hoặc nhập Môn học!");
      return;
    }

    // Register into category system to update filter dynamically
    const reg = registerCategoryAndSubject(finalCategory, finalSubject, currentAdmin);
    setCategories(getStoredFilterCategories());

    // Generate class tag for tutor
    const classTag = `${finalCategory} - ${finalSubject}`;
    if (!classesList.includes(classTag)) {
      setClassesList([...classesList, classTag]);
    }

    // Reset custom inputs
    setCustomCategoryInput("");
    setCustomSubjectInput("");
  };

  const handleRemoveClass = (index: number) => {
    setClassesList(classesList.filter((_, i) => i !== index));
  };

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...formData,
      classes: classesList,
      academics: academicsText.split("\n").map((s) => s.trim()).filter(Boolean),
    });
  };

  const activeCatObj = categories.find((c) => c.label === selectedCategory);

  return (
    <div className="bg-white border-2 border-[#122554] p-8 shadow-xl">
      <div className="flex items-center justify-between pb-4 mb-6 border-b-2 border-[#122554]">
        <div>
          <h2 className="font-display font-bold text-xl text-[#122554]">
            {isNew ? "Thêm Gia Sư Mới" : `Chỉnh Sửa Hồ Sơ Gia Sư: ${formData.name}`}
          </h2>
          <p className="text-xs text-gray-500 mt-0.5">
            Chọn cấp độ &amp; môn học bên dưới để tự động đồng bộ vào bộ lọc trên trang Gia sư.
          </p>
        </div>
        <button onClick={onCancel} className="text-gray-500 hover:text-black font-bold">
          ✕ Hủy
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
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
              <label className="inline-block cursor-pointer px-4 py-2 bg-[#122554] text-white text-xs font-semibold hover:bg-[#ffcd6b] transition-colors">
                Tải ảnh lên từ máy
                <input
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
                placeholder="/images/tutors/tutor-1-tran-van-nghia.png hoặc https://..."
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

        {/* --- DYNAMIC CATEGORY & SUBJECT SELECTOR SECTION --- */}
        <div className="border-2 border-[#122554] p-5 bg-slate-50 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs uppercase tracking-wider text-[#122554] font-bold flex items-center gap-2">
              <SlidersHorizontal className="h-4 w-4 text-[#ffcd6b]" />
              Bộ Chọn Cấp Độ / Chương Trình &amp; Môn Học Cho Tutor
            </h3>
            <span className="text-[11px] text-gray-500">Tự động bổ sung vào Bộ lọc Website</span>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 bg-white p-4 border border-gray-200">
            {/* Step 1: Program/Category Selection */}
            <div>
              <label className="block text-xs font-bold text-[#122554] mb-1">
                (1) Cấp độ / Chương trình
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => handleCategoryChange(e.target.value)}
                className="w-full border-2 border-[#122554] px-3 py-2 text-xs focus:border-[#ffcd6b] outline-none bg-white font-medium"
              >
                {categories.map((c) => (
                  <option key={c.id} value={c.label}>
                    {c.label}
                  </option>
                ))}
                <option value="NEW">+ Thêm Cấp độ / Chương trình mới...</option>
              </select>

              {selectedCategory === "NEW" && (
                <input
                  type="text"
                  value={customCategoryInput}
                  onChange={(e) => setCustomCategoryInput(e.target.value)}
                  placeholder="Nhập tên cấp độ mới (VD: IB Diploma, AP, Vinschool...)"
                  className="mt-2 w-full border-2 border-[#ffcd6b] px-3 py-1.5 text-xs focus:border-[#122554] outline-none animate-in fade-in"
                />
              )}
            </div>

            {/* Step 2: Subject Selection */}
            <div>
              <label className="block text-xs font-bold text-[#122554] mb-1">
                (2) Môn học
              </label>
              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="w-full border-2 border-[#122554] px-3 py-2 text-xs focus:border-[#ffcd6b] outline-none bg-white font-medium"
              >
                {activeCatObj?.subjects.map((s) => (
                  <option key={s.id} value={s.label}>
                    {s.label}
                  </option>
                ))}
                <option value="NEW">+ Thêm Môn học mới...</option>
              </select>

              {selectedSubject === "NEW" && (
                <input
                  type="text"
                  value={customSubjectInput}
                  onChange={(e) => setCustomSubjectInput(e.target.value)}
                  placeholder="Nhập tên môn mới (VD: Kinh tế học, Khoa học Máy tính...)"
                  className="mt-2 w-full border-2 border-[#ffcd6b] px-3 py-1.5 text-xs focus:border-[#122554] outline-none animate-in fade-in"
                />
              )}
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleAddClass}
              className="px-4 py-2 bg-[#ffcd6b] hover:bg-[#122554] text-white font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer flex items-center gap-1.5 shadow-sm"
            >
              <Plus className="h-4 w-4" /> Thêm môn học này cho Gia sư
            </button>
          </div>

          {/* Display assigned classes as removable chips */}
          <div>
            <label className="block text-xs font-bold text-gray-600 mb-1.5">
              Danh sách môn giảng dạy hiện tại ({classesList.length}):
            </label>
            {classesList.length === 0 ? (
              <p className="text-xs text-gray-400 italic">Chưa có môn nào được chọn cho gia sư này.</p>
            ) : (
              <div className="flex flex-wrap gap-2">
                {classesList.map((cls, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1.5 bg-white border-2 border-[#122554] text-[#122554] px-3 py-1 text-xs font-semibold shadow-xs"
                  >
                    <span>{cls}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveClass(idx)}
                      className="text-red-500 hover:text-red-700 font-bold ml-1 cursor-pointer"
                      title="Xóa môn này"
                    >
                      ✕
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>
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
            className="px-6 py-2.5 border border-gray-300 text-gray-700 hover:bg-gray-100 text-sm font-medium cursor-pointer"
          >
            Hủy bỏ
          </button>
          <button
            type="submit"
            className="flex items-center gap-2 px-6 py-2.5 bg-[#122554] text-white hover:bg-[#ffcd6b] text-sm font-semibold cursor-pointer transition-colors"
          >
            <Save className="h-4 w-4" /> Lưu thông tin Gia sư
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
              <label className="inline-block cursor-pointer px-4 py-2 bg-[#122554] text-white text-xs font-semibold hover:bg-[#ffcd6b] transition-colors">
                Tải ảnh lên từ máy
                <input
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
                placeholder="/images/mentors/mentor-uyen-nhu-new.png hoặc https://..."
                className="w-full border border-gray-300 px-3 py-1.5 text-xs focus:border-[#122554] outline-none"
              />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-xs uppercase tracking-wider text-[#122554] font-bold mb-1">
            Thành tích học thuật (Mỗi mục 1 dòng)
          </label>
          <textarea
            rows={4}
            value={academicsText}
            onChange={(e) => setAcademicsText(e.target.value)}
            placeholder={"Top 1% International Linguistic Olympiad...\nHuy chương Đồng IEO..."}
            className="w-full border-2 border-gray-300 px-4 py-2.5 text-sm font-mono focus:border-[#122554] outline-none"
          />
        </div>

        <div>
          <label className="block text-xs uppercase tracking-wider text-[#122554] font-bold mb-1">
            Kinh nghiệm Lãnh đạo &amp; Dự án (Mỗi mục 1 dòng)
          </label>
          <textarea
            rows={4}
            value={leadershipText}
            onChange={(e) => setLeadershipText(e.target.value)}
            placeholder={"GreenerFuture Vietnam (Head Intern)...\nDECA x Vinschool (Founder)..."}
            className="w-full border-2 border-gray-300 px-4 py-2.5 text-sm font-mono focus:border-[#122554] outline-none"
          />
        </div>

        <div>
          <label className="block text-xs uppercase tracking-wider text-[#122554] font-bold mb-1">
            Kết quả trúng tuyển &amp; Học bổng (Mỗi trường 1 dòng)
          </label>
          <textarea
            rows={3}
            value={admitsText}
            onChange={(e) => setAdmitsText(e.target.value)}
            placeholder={"Top UK: LSE, UCL, University of Manchester...\nHọc bổng 7,2 tỷ..."}
            className="w-full border-2 border-gray-300 px-4 py-2.5 text-sm font-mono focus:border-[#122554] outline-none"
          />
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2.5 border border-gray-300 text-gray-700 hover:bg-gray-100 text-sm font-medium cursor-pointer"
          >
            Hủy bỏ
          </button>
          <button
            type="submit"
            className="flex items-center gap-2 px-6 py-2.5 bg-[#122554] text-white hover:bg-[#ffcd6b] text-sm font-semibold cursor-pointer transition-colors"
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
              <option value={1}>Phần 1: Tư duy &amp; Định hướng</option>
              <option value={2}>Phần 2: Chọn ngành &amp; Bản đồ</option>
              <option value={3}>Phần 3: Bản đồ du học &amp; Chọn trường</option>
              <option value={4}>Phần 4: Tài chính &amp; Học bổng</option>
              <option value={5}>Phần 5: Xây dựng hồ sơ từ cấp 3</option>
              <option value={6}>Phần 6: Viết luận &amp; Nộp hồ sơ</option>
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
            className="px-6 py-2.5 border border-gray-300 text-gray-700 hover:bg-gray-100 text-sm font-medium cursor-pointer"
          >
            Hủy bỏ
          </button>
          <button
            type="submit"
            className="flex items-center gap-2 px-6 py-2.5 bg-[#122554] text-white hover:bg-[#ffcd6b] text-sm font-semibold cursor-pointer transition-colors"
          >
            <Save className="h-4 w-4" /> Lưu bài viết
          </button>
        </div>
      </form>
    </div>
  );
}
