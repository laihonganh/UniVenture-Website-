import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect, useMemo } from "react";
import { Award, BookOpen, User, ChevronRight, Send, CheckCircle2, Phone, GraduationCap, Filter, X, Calendar, Clock, ExternalLink } from "lucide-react";
import { getStoredTutors, TutorItem, DEFAULT_TUTORS } from "@/lib/admin-store";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";

export const Route = createFileRoute("/gia-su")({
  head: () => ({
    meta: [
      { title: "Lịch Lớp Học & Đội ngũ Gia sư — UniVenture" },
      {
        name: "description",
        content:
          "Xem lịch học các môn IGCSE, A Level, Checkpoint và danh sách Gia sư xuất sắc tại UniVenture.",
      },
      { property: "og:title", content: "Lịch Lớp Học & Đội ngũ Gia sư — UniVenture" },
      {
        name: "og:description",
        content:
          "Lịch khai giảng các lớp Checkpoint, IGCSE, A Level và đội ngũ gia sư tài năng từ UniVenture.",
      },
    ],
  }),
  component: TutorsPage,
});

const subjectsList = [
  "IGCSE / Checkpoint Mathematics",
  "IGCSE / Checkpoint Science",
  "AS & A Level Mathematics",
  "AS & A Level Physics",
  "AS & A Level Chemistry",
  "AS & A Level Biology",
  "Computer Science / ICT",
  "Khoa học tự nhiên Vinschool",
  "Môn học khác (ghi chú trong lời nhắn)",
];

// Clean compact timetable data
const timetableData = [
  {
    category: "CHECKPOINT",
    items: [
      { subject: "Checkpoint Science 8", t2: "09:00 - 10:30", t3: "", t4: "", t5: "09:00 - 10:30", t6: "", t7: "" },
    ],
  },
  {
    category: "IGCSE",
    items: [
      { subject: "IGCSE Coordinated Science (0654)", t2: "", t3: "09:00 - 10:30", t4: "", t5: "", t6: "09:00 - 10:30", t7: "" },
      { subject: "IGCSE Biology (0610)", t2: "", t3: "", t4: "19:00 - 20:30", t5: "", t6: "", t7: "19:00 - 20:30" },
      { subject: "IGCSE Chemistry (0620)", t2: "14:00 - 15:30", t3: "", t4: "", t5: "14:00 - 15:30", t6: "", t7: "" },
      { subject: "IGCSE Mathematics (0580) - G9", t2: "", t3: "19:00 - 20:30", t4: "", t5: "", t6: "19:00 - 20:30", t7: "" },
      { subject: "IGCSE Mathematics (0580) - G10", t2: "19:00 - 20:30", t3: "", t4: "", t5: "19:00 - 20:30", t6: "", t7: "" },
    ],
  },
  {
    category: "AS & A LEVEL",
    items: [
      { subject: "AS Level Mathematics (9709)", t2: "", t3: "", t4: "14:00 - 15:30", t5: "", t6: "", t7: "14:00 - 15:30" },
      { subject: "A Level Mathematics (9709)", t2: "", t3: "14:00 - 15:30", t4: "", t5: "", t6: "14:00 - 15:30", t7: "" },
      { subject: "AS Level Physics (9702)", t2: "", t3: "", t4: "09:00 - 10:30", t5: "", t6: "", t7: "09:00 - 10:30" },
    ],
  },
];

// Specific subject hierarchy per level
const programFilterCategories = [
  {
    id: "ALL",
    label: "Tất cả cấp độ",
    subjects: [
      { id: "ALL", label: "Tất cả môn học" },
      { id: "mathematics", label: "Toán học (Checkpoint / IGCSE / A Level)" },
      { id: "physics", label: "Vật lý (AS & A Level 9702)" },
      { id: "chemistry", label: "Hóa học (IGCSE 0620 / A Level)" },
      { id: "biology", label: "Sinh học (IGCSE 0610 / A Level)" },
      { id: "science", label: "Khoa học tổng hợp (Science 8 / Coordinated)" },
      { id: "computer", label: "Computer Science / ICT" },
    ],
  },
  {
    id: "CHECKPOINT",
    label: "Checkpoint (Lớp 6 - 8)",
    subjects: [
      { id: "ALL", label: "Tất cả môn Checkpoint" },
      { id: "mathematics", label: "Checkpoint Mathematics" },
      { id: "science", label: "Checkpoint Science 8" },
      { id: "khoa học tự nhiên", label: "KHTN Vinschool" },
    ],
  },
  {
    id: "IGCSE",
    label: "IGCSE (Lớp 9 - 10)",
    subjects: [
      { id: "ALL", label: "Tất cả môn IGCSE" },
      { id: "mathematics", label: "IGCSE Math (0580) G9 & G10" },
      { id: "science", label: "IGCSE Coordinated Science (0654)" },
      { id: "chemistry", label: "IGCSE Chemistry (0620)" },
      { id: "biology", label: "IGCSE Biology (0610)" },
      { id: "computer", label: "IGCSE Computer Science" },
    ],
  },
  {
    id: "A LEVEL",
    label: "AS & A Level (Lớp 11 - 12)",
    subjects: [
      { id: "ALL", label: "Tất cả môn AS & A Level" },
      { id: "mathematics", label: "AS & A Level Math (9709)" },
      { id: "physics", label: "AS & A Level Physics (9702)" },
      { id: "chemistry", label: "AS & A Level Chemistry" },
      { id: "biology", label: "AS & A Level Biology" },
    ],
  },
];

const GOOGLE_SHEET_URL = "https://script.google.com/macros/s/AKfycbz4Y_X_jzw9xuOGZPQ0Yyw_6ZwphPsTRIfBENpmdvERALuOikUZ1lbVcZrf1fq0iyGVow/exec";

function TutorsPage() {
  const [tutors, setTutors] = useState<TutorItem[]>(DEFAULT_TUTORS);
  const [selectedProgram, setSelectedProgram] = useState<string>("ALL");
  const [selectedSubjectFilter, setSelectedSubjectFilter] = useState<string>("ALL");

  // Modal for detailed tutor profile
  const [selectedTutorDetail, setSelectedTutorDetail] = useState<TutorItem | null>(null);
  const [detailTab, setDetailTab] = useState<"about" | "classes" | "academics">("academics");

  useEffect(() => {
    setTutors(getStoredTutors());
  }, []);

  // Form state
  const [parentName, setParentName] = useState("");
  const [grade, setGrade] = useState("");
  const [selectedFormSubject, setSelectedFormSubject] = useState(subjectsList[0]);
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [note, setNote] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [selectedTutorForForm, setSelectedTutorForForm] = useState<string>("");

  // Get current active subject list based on selected program
  const currentProgramCategory = useMemo(() => {
    return programFilterCategories.find((c) => c.id === selectedProgram) || programFilterCategories[0];
  }, [selectedProgram]);

  // When program changes, reset subject filter to ALL
  const handleSelectProgram = (programId: string) => {
    setSelectedProgram(programId);
    setSelectedSubjectFilter("ALL");
  };

  // Filter tutors based on selected program & subject
  const filteredTutors = useMemo(() => {
    return tutors.filter((t) => {
      const matchProgram =
        selectedProgram === "ALL" ||
        t.classes.some((c) => c.toUpperCase().includes(selectedProgram));

      const matchSubject =
        selectedSubjectFilter === "ALL" ||
        t.classes.some((c) => c.toLowerCase().includes(selectedSubjectFilter.toLowerCase()));

      return matchProgram && matchSubject;
    });
  }, [tutors, selectedProgram, selectedSubjectFilter]);

  const handleRegisterSubject = (subjName: string, tutorName?: string) => {
    if (tutorName) setSelectedTutorForForm(tutorName);
    const matchedSubj = subjectsList.find((s) => s.toLowerCase().includes(subjName.toLowerCase())) || subjName;
    setSelectedFormSubject(matchedSubj);
    const el = document.getElementById("dang-ky-hoc-thu");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const openTutorDetails = (tutor: TutorItem) => {
    setSelectedTutorDetail(tutor);
    setDetailTab("academics");
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const formData = new FormData();
    formData.append("parentName", parentName || "");
    formData.append("studentGrade", grade || "");
    formData.append("subject", selectedFormSubject || "");
    formData.append("phone", phone || "");
    formData.append("email", email || "");
    formData.append("message", note || "");
    formData.append("tutorName", selectedTutorForForm || "");

    try {
      await fetch(GOOGLE_SHEET_URL, {
        method: "POST",
        mode: "no-cors",
        body: formData,
      });
    } catch {
      // no-cors silently succeeds
    }
    setSubmitted(true);
    setSubmitting(false);
  };

  return (
    <>
      {/* Hero Banner */}
      <section className="bg-[#122554] text-white border-b-2 border-[#122554] relative overflow-hidden">
        <img
          src="/icons-effect-art/star small yellow.png"
          alt=""
          className="absolute top-6 right-6 md:top-12 md:right-12 w-6 h-6 md:w-10 md:h-10 animate-rock pointer-events-none z-10"
        />
        <img
          src="/icons-effect-art/star small while.png"
          alt=""
          className="absolute bottom-6 left-6 md:bottom-12 md:left-12 w-4 h-4 md:w-6 md:h-6 animate-rock pointer-events-none z-10"
        />
        <div className="mx-auto max-w-6xl px-5 py-12 md:py-16 relative z-10 text-center md:text-left">
          <p className="eyebrow text-[#ffcd6b]">Gia sư Quốc tế 1-1</p>
          <h1 className="mt-3 max-w-3xl text-3xl font-bold sm:text-4xl lg:text-5xl [text-wrap:balance]">
            Lịch Các Môn Học & Đội Ngũ Gia Sư
          </h1>
          <p className="mt-4 max-w-2xl text-base md:text-lg leading-relaxed text-white/90 [text-wrap:balance]">
            Tra cứu thời khóa biểu các lớp <span className="font-bold text-white underline decoration-[#ffcd6b] decoration-2">Checkpoint, IGCSE & A Level</span>, chọn môn học và tìm gia sư phù hợp nhất với mục tiêu của con.
          </p>
          <div className="mt-6 flex flex-wrap gap-3.5 justify-center md:justify-start">
            <a href="#lich-hoc" className="btn-interactive btn-interactive-accent text-sm">
              Xem lịch học các lớp
            </a>
            <a href="#danh-sach-tutor" className="btn-interactive btn-interactive-ghost text-sm">
              Lọc gia sư theo môn
            </a>
          </div>
        </div>
      </section>

      {/* SECTION 1: Clean, Compact Timetable */}
      <section id="lich-hoc" className="bg-white py-10 md:py-14 border-b-2 border-[#122554]">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          {/* Minimalist, Clean Header Strip */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-5 border-b-2 border-[#122554] pb-4">
            <div>
              <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-[#122554]/5 border border-[#122554]/20 text-xs font-bold text-[#122554] uppercase tracking-wider mb-2">
                <Calendar className="h-3.5 w-3.5 text-[#122554]" />
                Tuyển sinh Lớp 7 - 12 • Khai giảng 20/7/2026
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#122554] font-display">
                Lịch Học Các Môn Chuẩn Quốc Tế
              </h2>
            </div>
            <p className="text-xs text-gray-600 font-medium sm:text-right">
              Địa điểm: <span className="font-semibold text-[#122554]">S1.07 Vinhomes Ocean Park</span> & Học Online
            </p>
          </div>

          {/* Table Container */}
          <div className="overflow-x-auto border-2 border-[#122554] bg-white shadow-sm">
            <table className="w-full text-left border-collapse min-w-[700px]" style={{ fontFamily: "'PoppinsVN', 'Poppins', sans-serif" }}>
              <thead>
                <tr className="bg-[#122554] text-white text-xs uppercase font-bold tracking-wider">
                  <th className="py-2.5 px-3 border-r border-white/20 text-center w-[120px]">Cấp độ</th>
                  <th className="py-2.5 px-3 border-r border-white/20">Môn học</th>
                  <th className="py-2.5 px-2.5 border-r border-white/20 text-center">Thứ 2</th>
                  <th className="py-2.5 px-2.5 border-r border-white/20 text-center">Thứ 3</th>
                  <th className="py-2.5 px-2.5 border-r border-white/20 text-center">Thứ 4</th>
                  <th className="py-2.5 px-2.5 border-r border-white/20 text-center">Thứ 5</th>
                  <th className="py-2.5 px-2.5 border-r border-white/20 text-center">Thứ 6</th>
                  <th className="py-2.5 px-2.5 text-center">Thứ 7</th>
                </tr>
              </thead>
              <tbody className="text-xs text-[#122554] divide-y border-t border-[#122554]">
                {timetableData.map((group) =>
                  group.items.map((row, idx) => (
                    <tr key={row.subject} className="hover:bg-blue-50/40 transition-colors">
                      {idx === 0 && (
                        <td
                          rowSpan={group.items.length}
                          className="py-2 px-3 border-r border-[#122554] font-black text-center bg-slate-50 text-[11px] uppercase align-middle text-[#122554]"
                        >
                          {group.category}
                        </td>
                      )}
                      <td className="py-2.5 px-3 border-r border-slate-200 font-semibold">
                        <button
                          onClick={() => handleRegisterSubject(row.subject)}
                          className="text-[#122554] hover:text-blue-700 hover:underline text-left cursor-pointer flex items-center justify-between w-full group/btn"
                        >
                          <span>{row.subject}</span>
                          <span className="text-[10px] text-gray-400 group-hover/btn:text-blue-600 font-normal ml-2">Đăng ký →</span>
                        </button>
                      </td>
                      <td className="py-2.5 px-2 border-r border-slate-200 text-center font-sans text-xs text-[#122554]">{row.t2 || "-"}</td>
                      <td className="py-2.5 px-2 border-r border-slate-200 text-center font-sans text-xs text-[#122554]">{row.t3 || "-"}</td>
                      <td className="py-2.5 px-2 border-r border-slate-200 text-center font-sans text-xs text-[#122554]">{row.t4 || "-"}</td>
                      <td className="py-2.5 px-2 border-r border-slate-200 text-center font-sans text-xs text-[#122554]">{row.t5 || "-"}</td>
                      <td className="py-2.5 px-2 border-r border-slate-200 text-center font-sans text-xs text-[#122554]">{row.t6 || "-"}</td>
                      <td className="py-2.5 px-2 text-center font-sans text-xs text-[#122554]">{row.t7 || "-"}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Compact Info Footer */}
          <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-gray-600 border-t border-slate-200 pt-3 mt-1 gap-2">
            <p>Hotline tuyển sinh: <a href="tel:0819113388" className="font-bold text-[#122554] hover:underline">0819 113 388</a> (Ms. Quỳnh Như)</p>
            <p>Lớp học tối đa 4-6 học sinh hoặc gia sư kèm riêng 1-1.</p>
          </div>
        </div>
      </section>

      {/* SECTION 2: Hierarchical Filters & Mentor Profiles */}
      <section id="danh-sach-tutor" className="bg-[#f8fafc] py-12 md:py-16 border-b-2 border-[#122554]">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mb-8">
            <p className="eyebrow text-[#122554]">Hồ Sơ Giảng Dạy</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#122554] mt-1 font-display">
              Tìm Gia Sư Theo Cấp Độ & Từng Môn Học
            </h2>
            <p className="mt-1 text-sm text-gray-600">
              Chọn cấp độ và môn học cụ thể để xem gia sư phù hợp cùng đầy đủ thành tích chuyên môn.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6 items-start">
            {/* Mobile Filter: Compact Horizontal Chips (< 75px height, so mentors are immediately visible!) */}
            <div className="lg:hidden bg-white border-2 border-[#122554] p-3 shadow-sm mb-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-1.5">
                  <Filter className="h-3.5 w-3.5 text-[#122554]" />
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#122554]">Bộ lọc theo môn</span>
                </div>
                {(selectedProgram !== "ALL" || selectedSubjectFilter !== "ALL") && (
                  <button
                    onClick={() => {
                      setSelectedProgram("ALL");
                      setSelectedSubjectFilter("ALL");
                    }}
                    className="text-[10px] text-pink-700 bg-pink-50 px-2 py-0.5 rounded font-bold hover:bg-pink-100 flex items-center gap-1 cursor-pointer"
                  >
                    Xóa lọc <X className="h-2.5 w-2.5" />
                  </button>
                )}
              </div>

              {/* Row 1: Level chips */}
              <div className="flex gap-1.5 overflow-x-auto no-scrollbar pb-1.5 scroll-smooth">
                {programFilterCategories.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => handleSelectProgram(p.id)}
                    className={`whitespace-nowrap px-2.5 py-1 text-[11px] font-semibold rounded-full border transition-all cursor-pointer ${
                      selectedProgram === p.id
                        ? "bg-[#122554] text-white border-[#122554] font-bold shadow-xs"
                        : "bg-white text-[#122554] border-slate-300 hover:border-[#122554]"
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>

              {/* Row 2: Subject chips */}
              <div className="flex gap-1.5 overflow-x-auto no-scrollbar pt-1.5 scroll-smooth border-t border-slate-100">
                {currentProgramCategory.subjects.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setSelectedSubjectFilter(s.id)}
                    className={`whitespace-nowrap px-2.5 py-1 text-[11px] font-semibold rounded-full border transition-all cursor-pointer ${
                      selectedSubjectFilter === s.id
                        ? "bg-[#122554] text-white border-[#122554] font-bold shadow-xs"
                        : "bg-white text-[#122554] border-slate-300 hover:border-[#122554]"
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Desktop Filter Sidebar: Hidden on Mobile */}
            <div className="hidden lg:block bg-white border-2 border-[#122554] p-5 shadow-sm sticky top-20">
              <div className="flex items-center justify-between pb-3 border-b-2 border-[#122554] mb-4">
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4 text-[#122554]" />
                  <h3 className="font-bold text-base text-[#122554] font-display">Bộ lọc môn học</h3>
                </div>
                {(selectedProgram !== "ALL" || selectedSubjectFilter !== "ALL") && (
                  <button
                    onClick={() => {
                      setSelectedProgram("ALL");
                      setSelectedSubjectFilter("ALL");
                    }}
                    className="text-[11px] text-pink-700 bg-pink-50 px-2 py-0.5 rounded font-bold hover:bg-pink-100 transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    Xóa lọc <X className="h-3 w-3" />
                  </button>
                )}
              </div>

              {/* Level / Program Selection */}
              <div className="mb-5">
                <label className="block text-[11px] uppercase tracking-wider font-bold text-gray-500 mb-2">
                  1. CẤP ĐỘ / CHƯƠNG TRÌNH
                </label>
                <div className="space-y-1">
                  {programFilterCategories.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => handleSelectProgram(p.id)}
                      className={`w-full text-left px-3 py-2 text-xs font-semibold border transition-all cursor-pointer ${
                        selectedProgram === p.id
                          ? "bg-[#122554] text-white border-[#122554] shadow-sm font-bold"
                          : "bg-white text-[#122554] border-slate-200 hover:border-[#122554] hover:bg-slate-50"
                      }`}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Specific Subject Selection within Level */}
              <div>
                <label className="block text-[11px] uppercase tracking-wider font-bold text-gray-500 mb-2">
                  2. MÔN HỌC ({currentProgramCategory.label})
                </label>
                <div className="space-y-1">
                  {currentProgramCategory.subjects.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => setSelectedSubjectFilter(s.id)}
                      className={`w-full text-left px-3 py-2 text-xs font-semibold border transition-all cursor-pointer ${
                        selectedSubjectFilter === s.id
                          ? "bg-[#122554] text-white border-[#122554] shadow-sm font-bold"
                          : "bg-white text-[#122554] border-slate-200 hover:border-[#122554] hover:bg-slate-50"
                      }`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Tutor List */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <p className="text-xs uppercase tracking-wider font-bold text-[#122554]">
                  Hiển thị <span className="font-bold underline text-[#122554]">{filteredTutors.length}</span> Gia sư phù hợp
                </p>
              </div>

              {filteredTutors.length === 0 ? (
                <div className="bg-white border-2 border-[#122554] p-10 text-center text-gray-600">
                  <p className="text-sm font-semibold">Chưa có gia sư nào phù hợp với bộ lọc hiện tại.</p>
                  <button
                    onClick={() => {
                      setSelectedProgram("ALL");
                      setSelectedSubjectFilter("ALL");
                    }}
                    className="mt-3 px-4 py-1.5 bg-[#122554] text-white text-xs uppercase tracking-wider font-bold hover:bg-black transition-colors"
                  >
                    Xem tất cả gia sư
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {filteredTutors.map((tutor) => (
                    <div
                      key={tutor.id}
                      className="bg-white border-2 border-[#122554] p-5 flex flex-col justify-between hover:shadow-lg transition-all"
                    >
                      <div>
                        {/* Header: Photo & Role */}
                        <div className="flex items-start gap-4 mb-3.5">
                          <div className="w-20 h-24 bg-slate-50 border-2 border-[#122554] overflow-hidden shrink-0 flex items-center justify-center">
                            <img
                              src={tutor.image}
                              alt={tutor.name}
                              className="w-full h-full object-contain"
                            />
                          </div>
                          <div>
                            <h4 className="font-display font-bold text-lg text-[#122554]">
                              Tutor {tutor.name}
                            </h4>
                            <p className="text-xs font-semibold text-gray-600 mt-0.5 uppercase tracking-wider">
                              {tutor.role}
                            </p>
                            <div className="mt-2 flex flex-wrap gap-1">
                              {tutor.classes.slice(0, 2).map((c, i) => (
                                <span
                                  key={i}
                                  className="px-1.5 py-0.5 bg-[#122554]/5 border border-[#122554]/20 text-[10px] font-semibold text-[#122554]"
                                >
                                  {c}
                                </span>
                              ))}
                              {tutor.classes.length > 2 && (
                                <span className="text-[10px] text-gray-500 font-semibold self-center">
                                  +{tutor.classes.length - 2} lớp
                                </span>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Highlight Achievement Preview */}
                        <div className="mb-4">
                          <p className="text-[11px] uppercase tracking-wider text-gray-500 font-bold mb-1">
                            Thành tích nổi bật:
                          </p>
                          <p className="text-xs text-gray-800 line-clamp-2 leading-relaxed border-l-2 border-[#ffcd6b] pl-2">
                            {tutor.academics[0] || tutor.about}
                          </p>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-2 pt-2 border-t border-slate-100">
                        <button
                          onClick={() => openTutorDetails(tutor)}
                          className="flex-1 py-2 px-3 text-center text-xs font-semibold text-[#122554] bg-slate-100 hover:bg-[#122554] hover:text-white border border-[#122554] transition-colors cursor-pointer"
                        >
                          Xem chi tiết thành tích
                        </button>
                        <button
                          onClick={() => handleRegisterSubject(tutor.classes[0] || "Toán", tutor.name)}
                          className="flex-1 py-2 px-3 text-center text-xs font-semibold text-white bg-[#122554] hover:bg-black transition-colors cursor-pointer"
                        >
                          Đăng ký học 1-1
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Modal Dialog for Full Detailed Tutor Profile (Restored all detailed tabs) */}
      <Dialog open={!!selectedTutorDetail} onOpenChange={(open) => !open && setSelectedTutorDetail(null)}>
        <DialogContent className="max-w-2xl p-0 overflow-hidden border-2 border-[#122554] bg-white">
          {selectedTutorDetail && (
            <div>
              {/* Modal Header */}
              <div className="bg-[#122554] text-white p-5 flex items-center gap-4">
                <div className="w-16 h-20 bg-white border border-white shrink-0 overflow-hidden flex items-center justify-center">
                  <img
                    src={selectedTutorDetail.image}
                    alt={selectedTutorDetail.name}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <h3 className="font-display font-bold text-xl text-white">
                    Tutor {selectedTutorDetail.name}
                  </h3>
                  <p className="text-xs text-white/80 uppercase tracking-wider font-semibold mt-0.5">
                    {selectedTutorDetail.role}
                  </p>
                </div>
              </div>

              {/* Tabs Header */}
              <div className="flex border-b-2 border-[#122554] bg-slate-100">
                {[
                  { key: "academics" as const, label: "Thành tích & Học thuật", icon: Award },
                  { key: "classes" as const, label: "Lớp giảng dạy", icon: BookOpen },
                  { key: "about" as const, label: "Phương pháp sư phạm", icon: User },
                ].map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setDetailTab(tab.key)}
                    className={`flex-1 py-3 px-3 text-xs uppercase tracking-wider font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer border-r border-[#122554] last:border-r-0 ${
                      detailTab === tab.key
                        ? "bg-white text-[#122554] border-b-2 border-b-transparent font-black"
                        : "text-gray-600 hover:text-[#122554] hover:bg-slate-200"
                    }`}
                  >
                    <tab.icon className="h-4 w-4 shrink-0" />
                    <span>{tab.label}</span>
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <div className="p-6 max-h-[380px] overflow-y-auto">
                {detailTab === "academics" && (
                  <div className="space-y-3">
                    <h4 className="text-xs uppercase tracking-widest text-[#122554] font-bold mb-3">
                      Toàn bộ thành tích & kinh nghiệm chuyên môn
                    </h4>
                    <ul className="space-y-2.5">
                      {selectedTutorDetail.academics.map((item, idx) => (
                        <li
                          key={idx}
                          className="text-sm leading-relaxed text-gray-800 border-l-4 border-[#ffcd6b] pl-3 py-0.5"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {detailTab === "classes" && (
                  <div>
                    <h4 className="text-xs uppercase tracking-widest text-[#122554] font-bold mb-3">
                      Các lớp phụ trách giảng dạy tại UniVenture
                    </h4>
                    <ul className="grid sm:grid-cols-2 gap-2.5">
                      {selectedTutorDetail.classes.map((c, idx) => (
                        <li
                          key={idx}
                          className="flex items-center gap-2 p-2.5 border border-[#122554]/30 bg-blue-50/30 text-xs font-semibold text-[#122554]"
                        >
                          <GraduationCap className="h-4 w-4 text-[#122554] shrink-0" />
                          <span>{c}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {detailTab === "about" && (
                  <div>
                    <h4 className="text-xs uppercase tracking-widest text-[#122554] font-bold mb-3">
                      Triết lý & Phương pháp đồng hành
                    </h4>
                    <p className="text-sm leading-relaxed text-gray-800 border-l-4 border-[#ffcd6b] pl-3">
                      {selectedTutorDetail.about}
                    </p>
                  </div>
                )}
              </div>

              {/* Modal Footer CTA */}
              <div className="p-4 bg-slate-50 border-t-2 border-[#122554] flex justify-end gap-3">
                <DialogClose className="px-4 py-2 text-xs font-bold text-gray-600 hover:text-black border border-slate-300 bg-white cursor-pointer">
                  Đóng
                </DialogClose>
                <button
                  onClick={() => {
                    const t = selectedTutorDetail;
                    setSelectedTutorDetail(null);
                    handleRegisterSubject(t.classes[0] || "Toán", t.name);
                  }}
                  className="px-5 py-2 text-xs font-bold text-white bg-[#122554] hover:bg-black transition-colors cursor-pointer"
                >
                  Đăng ký học cùng Tutor {selectedTutorDetail.name}
                </button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Trial Class Registration Form */}
      <section id="dang-ky-hoc-thu" className="bg-[#122554] text-white border-t-2 border-[#122554] py-12 md:py-16">
        <div className="mx-auto max-w-4xl px-5">
          <div className="text-center mb-8">
            <p className="eyebrow text-[#ffcd6b] mb-1">Đăng ký học thử</p>
            <h2 className="text-2xl sm:text-3xl font-bold font-display [text-wrap:balance]">
              Đăng Ký Buổi Học Thử 1-1 Cùng Gia Sư
            </h2>
            <p className="mt-2 text-white/75 text-sm max-w-lg mx-auto [text-wrap:balance]">
              Để lại thông tin để UniVenture sắp xếp buổi đánh giá năng lực và học thử cá nhân hoá phù hợp nhất với con.
            </p>
          </div>

          <div className="bg-white text-[#122554] border-2 border-white p-6 md:p-10 shadow-2xl">
            {submitted ? (
              <div className="text-center py-8">
                <CheckCircle2 className="h-14 w-14 text-[#122554] mx-auto mb-3" />
                <h3 className="text-xl font-bold font-display text-[#122554] mb-2">
                  Đăng ký thành công!
                </h3>
                <p className="text-gray-600 max-w-md mx-auto mb-5 text-sm">
                  Đội ngũ học thuật UniVenture sẽ liên hệ phụ huynh trong vòng 24 giờ để trao đổi cụ thể về lịch học và tài liệu chuẩn bị.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2.5 bg-[#122554] text-white font-semibold text-xs uppercase tracking-wider hover:bg-black transition-colors cursor-pointer"
                >
                  Đăng ký thêm buổi khác
                </button>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-[11px] uppercase tracking-widest text-[#122554] font-bold mb-1.5">
                      Họ và tên Phụ huynh <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={parentName}
                      onChange={(e) => setParentName(e.target.value)}
                      placeholder="Nguyễn Văn A"
                      className="w-full border-2 border-[#122554] bg-white px-3.5 py-2.5 text-sm focus:border-[#ffcd6b] outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-widest text-[#122554] font-bold mb-1.5">
                      Lớp / Khối của con <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={grade}
                      onChange={(e) => setGrade(e.target.value)}
                      placeholder="VD: Lớp 10 / Year 11 IGCSE"
                      className="w-full border-2 border-[#122554] bg-white px-3.5 py-2.5 text-sm focus:border-[#ffcd6b] outline-none"
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-[11px] uppercase tracking-widest text-[#122554] font-bold mb-1.5">
                      Số điện thoại liên hệ <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="0912 345 678"
                      className="w-full border-2 border-[#122554] bg-white px-3.5 py-2.5 text-sm focus:border-[#ffcd6b] outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-widest text-[#122554] font-bold mb-1.5">
                      Email liên hệ <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="phuhuynh@gmail.com"
                      className="w-full border-2 border-[#122554] bg-white px-3.5 py-2.5 text-sm focus:border-[#ffcd6b] outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-widest text-[#122554] font-bold mb-1.5">
                    Môn cần học / hỗ trợ <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={selectedFormSubject}
                    onChange={(e) => setSelectedFormSubject(e.target.value)}
                    className="w-full border-2 border-[#122554] bg-white px-3.5 py-2.5 text-sm focus:border-[#ffcd6b] outline-none font-medium text-[#122554]"
                  >
                    {subjectsList.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-widest text-[#122554] font-bold mb-1.5">
                    Mục tiêu / Ghi chú thêm về học lực của con
                  </label>
                  <textarea
                    rows={2}
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="Mục tiêu điểm số, phần kiến thức con đang yếu hoặc gia sư mong muốn..."
                    className="w-full border-2 border-[#122554] bg-white px-3.5 py-2 text-sm focus:border-[#ffcd6b] outline-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="btn-interactive btn-interactive-primary w-full py-3.5 text-center justify-center text-sm disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer mt-2"
                >
                  {submitting ? "Đang gửi..." : "Gửi thông tin đăng ký học thử"}
                  {!submitting && <Send className="h-4 w-4" />}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
