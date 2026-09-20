import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Award, Briefcase, School, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import { getStoredMentors, MentorItem } from "@/lib/admin-store";

export const Route = createFileRoute("/mentors")({
  head: () => ({
    meta: [
      { title: "Đội ngũ Mentor — UniVenture" },
      {
        name: "description",
        content:
          "Mentor Uyển Như (LSE, UCL), Mentor Bảo Linh (học bổng toàn phần MD VinUni) và Mentor Bảo Minh (quán quân GIC Startup Competition) — những người đi trước đồng hành cùng học sinh.",
      },
      { property: "og:title", content: "Đội ngũ Mentor — UniVenture" },
      {
        property: "og:description",
        content:
          "Học thuật xuất sắc, kinh nghiệm dẫn dắt dự án thực tế và hồ sơ trúng tuyển hàng đầu UK, US, Singapore.",
      },
    ],
  }),
  component: MentorsPage,
});

function MentorsPage() {
  const [mentorsList, setMentorsList] = useState<MentorItem[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeTab, setActiveTab] = useState<"academics" | "leadership" | "admits">("academics");

  useEffect(() => {
    setMentorsList(getStoredMentors());
  }, []);

  const goTo = (idx: number) => {
    setCurrentSlide(idx);
    setActiveTab("academics");
  };

  const prev = () => goTo(currentSlide === 0 ? mentorsList.length - 1 : currentSlide - 1);
  const next = () => goTo(currentSlide === mentorsList.length - 1 ? 0 : currentSlide + 1);

  const m = mentorsList[currentSlide] || mentorsList[0];
  if (!m) return null;

  return (
    <>
      <section className="bg-[#122554] text-white border-b-2 border-[#122554] relative overflow-hidden">
        {/* Decorative Stars & Sparkles */}
        <img src="/icons-effect-art/star small yellow.png" alt="" className="absolute top-6 right-6 md:top-12 md:right-12 w-6 h-6 md:w-10 md:h-10 animate-rock pointer-events-none z-10" />
        <img src="/icons-effect-art/Sparkle.svg" alt="" className="absolute top-12 left-8 md:top-20 md:left-24 w-5 h-5 md:w-8 md:h-8 animate-pulse pointer-events-none z-10 opacity-80" />
        <img src="/icons-effect-art/star small while.png" alt="" className="absolute bottom-6 left-6 md:bottom-12 md:left-12 w-4 h-4 md:w-6 md:h-6 animate-rock pointer-events-none z-10" />
        <div className="mx-auto max-w-6xl px-5 py-16 lg:py-24 relative z-10">
          <p className="eyebrow text-[#ffcd6b]">Meet the mentors</p>
          <h1 className="mt-5 max-w-3xl text-4xl leading-[1.1] font-bold sm:text-5xl lg:text-6xl">
            Người đã đi con đường em đang bước
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white">
            Dưới đây là một số mentor tiêu biểu tại UniVenture. Các anh chị không chỉ có hồ sơ học thuật xuất sắc, mà đã tự tay xây dự án,
            khởi tạo startup và dẫn dắt tổ chức. Đó là lý do họ hướng dẫn học sinh bằng <span className="highlight-yellow">kinh nghiệm thật</span>.
          </p>
        </div>
      </section>

      {/* Mentor Carousel */}
      <section className="bg-white relative overflow-hidden">
        {/* Decorative Blue Diamond - Top Right & Bottom Left (scaled 5x) */}
        <img src="/icons-effect-art/diamond-blue.png" alt="" className="absolute -top-4 -right-4 md:-top-8 md:-right-8 w-24 h-24 md:w-40 md:h-40 animate-rock pointer-events-none z-10 opacity-90" />
        <img src="/icons-effect-art/diamond-blue.png" alt="" className="absolute -bottom-6 -left-6 md:-bottom-10 md:-left-10 w-20 h-20 md:w-36 md:h-36 animate-rock pointer-events-none z-10 opacity-80" />
        <img src="/icons-effect-art/Sparkle.svg" alt="" className="absolute bottom-10 right-12 md:bottom-16 md:right-24 w-6 h-6 md:w-10 md:h-10 pointer-events-none z-10 opacity-70" />
        <div className="mx-auto max-w-6xl px-4 sm:px-5 py-8 sm:py-14 lg:py-20 relative z-10">
          <div className="mentor-carousel border-2 border-[#122554] overflow-hidden bg-white shadow-xl">

            <div className="grid grid-cols-1 lg:grid-cols-[350px_1fr] gap-0">
              {/* Left: Mentor Photo + Name */}
              <div className="flex flex-col items-center justify-center p-4 sm:p-6 lg:p-10 bg-[#ffffff] border-b-2 lg:border-b-0 lg:border-r-2 border-[#122554]">
                <div className="relative w-full max-w-[150px] sm:max-w-[200px] lg:max-w-[240px] mb-3 lg:mb-6 flex items-center justify-center">
                  <img
                    src={m.image}
                    alt={m.name}
                    className="w-full h-[140px] sm:h-[200px] lg:h-[280px] object-contain"
                  />
                </div>
                <h2 className="font-display text-lg sm:text-2xl lg:text-3xl font-bold text-[#122554] text-center mb-1">{m.name}</h2>
                <p className="text-[11px] sm:text-sm lg:text-base font-semibold text-[#122554] uppercase tracking-wider mb-1 text-center">{m.role}</p>
              </div>

              {/* Right: Tab Content */}
              <div className="flex flex-col">
                {/* Tab buttons - Navy & White sleek styling */}
                <div className="flex border-b-2 border-[#122554] bg-slate-50">
                  {([
                    { key: "academics" as const, label: "Học thuật", icon: Award },
                    { key: "leadership" as const, label: "Kinh nghiệm", icon: Briefcase },
                    { key: "admits" as const, label: "Trúng tuyển", icon: School },
                  ]).map((tab) => (
                    <button
                      key={tab.key}
                      onClick={() => setActiveTab(tab.key)}
                      className={`flex-1 flex flex-col sm:flex-row items-center justify-center p-2.5 sm:p-3.5 lg:p-4 border-r-2 border-[#122554] last:border-r-0 text-xs sm:text-xs lg:text-sm font-bold uppercase tracking-wider transition-colors cursor-pointer gap-1 sm:gap-2 ${activeTab === tab.key
                        ? "bg-[#122554] text-white"
                        : "bg-white text-[#122554] hover:bg-slate-100"
                        }`}
                    >
                      <tab.icon className="h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0" />
                      <span className="text-[11px] sm:text-xs lg:text-sm whitespace-nowrap">{tab.label}</span>
                    </button>
                  ))}
                </div>

                {/* Tab content */}
                <div className="p-3.5 sm:p-6 lg:p-10 flex-grow bg-white flex flex-col min-h-[170px] sm:min-h-[260px] lg:min-h-[350px]">
                  {activeTab === "academics" && (
                    <ul className="space-y-2.5 sm:space-y-4">
                      {m.academics.map((a, idx) => (
                        <li key={idx} className="text-xs sm:text-sm lg:text-base text-[#122554] border-l-3 sm:border-l-4 border-[#122554] pl-2.5 sm:pl-4 font-medium leading-relaxed">
                          {a}
                        </li>
                      ))}
                    </ul>
                  )}

                  {activeTab === "leadership" && (
                    <ul className="space-y-3 sm:space-y-4">
                      {m.leadership.map((l, idx) => (
                        <li key={idx} className="text-xs sm:text-sm lg:text-base text-[#122554] border-l-3 sm:border-l-4 border-[#122554] pl-3 sm:pl-4 font-medium leading-relaxed">
                          {l}
                        </li>
                      ))}
                    </ul>
                  )}

                  {activeTab === "admits" && (
                    <ul className="space-y-3 sm:space-y-4">
                      {m.admits.map((a, idx) => (
                        <li key={idx} className="text-xs sm:text-sm lg:text-base text-[#122554] border-l-3 sm:border-l-4 border-[#122554] pl-3 sm:pl-4 font-medium leading-relaxed">
                          {a}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>

            {/* Carousel Navigation */}
            <div className="flex items-center justify-between px-4 sm:px-8 py-3 sm:py-4 border-t-2 border-[#122554] bg-[#ffffff]">
              <button
                onClick={prev}
                className="flex items-center gap-2 text-[#122554] hover:bg-[#122554] hover:text-white p-2 border-2 border-[#122554] transition-all cursor-pointer"
                title="Mentor trước"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>

              <div className="flex gap-3 items-center">
                {mentorsList.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => goTo(idx)}
                    className={`h-3.5 w-3.5 border-2 border-[#122554] transition-all cursor-pointer ${currentSlide === idx ? "bg-[#122554] scale-110" : "bg-white hover:bg-slate-200"}`}
                    aria-label={`Mentor ${idx + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={next}
                className="flex items-center gap-2 text-[#122554] hover:bg-[#122554] hover:text-white p-2 border-2 border-[#122554] transition-all cursor-pointer"
                title="Mentor tiếp theo"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Representative Note */}
          <div className="mt-8 border-2 border-[#122554] bg-[#f8fafc] p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <img src="/icons-effect-art/Sparkle.svg" alt="" className="w-6 h-6 shrink-0 animate-pulse" />
              <p className="text-xs sm:text-sm text-[#122554] font-medium leading-relaxed">
                <strong className="font-bold">Lưu ý:</strong> Trên đây là một số gương mặt mentor tiêu biểu của UniVenture. Mạng lưới cố vấn của chúng tôi còn rất nhiều anh chị tài năng ở đa dạng ngành nghề sẵn sàng đồng hành cùng em trong các chặng đường kế tiếp.
              </p>
            </div>
            <Link
              to="/lien-he"
              className="btn-interactive btn-interactive-primary px-5 py-2.5 text-xs sm:text-sm shrink-0 whitespace-nowrap"
            >
              Ghép mentor phù hợp
            </Link>
          </div>
        </div>
      </section>

      <section className="text-[#122554] border-t-2 border-[#122554] relative overflow-hidden bg-white">
        {/* Background Art */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none flex items-center justify-center">
          <img src="/icons-effect-art/background 3.PNG" alt="" className="w-full h-full object-cover object-center" />
        </div>
        {/* Decorative Star */}
        <img src="/icons-effect-art/star small blue.svg" alt="" className="absolute top-4 right-4 md:top-8 md:right-8 w-5 h-5 md:w-8 md:h-8 animate-rock pointer-events-none z-10" />
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-center gap-6 px-5 py-16 lg:flex-row lg:items-center relative z-10 text-center lg:text-left">
          <div className="lg:pr-10">
            <h2 className="text-3xl font-bold sm:text-4xl text-[#122554]">
              Ghép mentor phù hợp với ngành học của em
            </h2>
          </div>
          <Link
            to="/lien-he"
            className="btn-interactive btn-interactive-primary px-8 py-4 text-base w-full lg:w-auto"
          >
            Đăng ký tư vấn
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>
    </>
  );
}
