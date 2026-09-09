import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check, Minus } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/chuong-trinh")({
  head: () => ({
    meta: [
      { title: "Chương trình mentor — UniVenture" },
      {
        name: "description",
        content:
          "Gói ĐHQT Việt Nam, gói Mentor Du học và gói Mentor Hoạt động ngoại khóa: chiến lược hồ sơ, luận chính, portfolio, mock interview và đồng hành dự án.",
      },
      { property: "og:title", content: "Chương trình mentor — UniVenture" },
      {
        property: "og:description",
        content:
          "Ba lộ trình đồng hành: ĐHQT Việt Nam, Du học quốc tế và Hoạt động ngoại khóa theo Project-Based Learning.",
      },
    ],
  }),
  component: ProgramsPage,
});

const core = [
  "Tư vấn định hướng chiến lược hồ sơ cá nhân hoá",
  "Mentor triển khai Luận chính",
  "Hướng dẫn fill hồ sơ & mô tả thành tích",
  "Thiết kế Portfolio & CV",
  "Mock Interview 1-1",
];

const programs = [
  {
    id: "domestic",
    tag: "Domestic",
    title: "Gói ĐHQT Việt Nam",
    desc: "Dành cho học sinh ứng tuyển các chương trình đại học quốc tế tại Việt Nam như VinUniversity, RMIT, BUV.",
    options: [
      {
        name: "Full Companion",
        note: "Đồng hành trọn vẹn toàn bộ hồ sơ từ chiến lược đến phỏng vấn.",
        items: core,
      },
      {
        name: "Các gói lẻ",
        note: "Chọn đúng hạng mục em cần hỗ trợ, linh hoạt theo tiến độ.",
        items: core,
      },
    ],
  },
  {
    id: "abroad",
    tag: "Study abroad",
    title: "Gói Mentor Du học",
    desc: "Ứng tuyển Mỹ, Anh, Châu Âu, Singapore — mentor được ghép theo quốc gia, ngành học và định hướng cụ thể của học sinh.",
    options: [
      {
        name: "Premium",
        note: "Trọn bộ Personal Statement, Supplemental Essays, Common App, CV & Portfolio, Mock Interview và nhiều vòng revision.",
        items: core,
      },
      {
        name: "Standard",
        note: "Tập trung vào bộ luận và hồ sơ ứng tuyển với số vòng revision tiêu chuẩn.",
        items: core.slice(0, 4),
      },
    ],
  },
  {
    id: "extracurricular",
    tag: "Extracurriculars",
    title: "Gói Mentor HĐNK",
    desc: "Đồng hành theo năm để học sinh xây dự án xã hội, khởi tạo startup, tham gia nghiên cứu và các kỳ thi quốc tế.",
    options: [
      {
        name: "Builder Track",
        note: "Xây dựng dự án xã hội hoặc sáng kiến cộng đồng: từ ý tưởng, khảo sát, triển khai đến đo lường tác động.",
        items: [
          "Định vị hồ sơ & chọn hướng dự án",
          "Cố vấn triển khai theo sprint hàng tháng",
          "Kết nối đối tác, cộng đồng và cố vấn chuyên môn",
          "Hồ sơ hoá thành tựu cho bộ apply",
        ],
      },
      {
        name: "Startup & Research Track",
        note: "Khởi tạo startup hoặc thực hiện nghiên cứu cùng giáo sư, chuyên gia; chuẩn bị cho các kỳ thi và cuộc thi quốc tế.",
        items: [
          "Mentor 1-1 cùng founder / nhà nghiên cứu",
          "Xây dựng sản phẩm, mô hình kinh doanh hoặc đề tài",
          "Luyện tập pitching & báo cáo học thuật",
          "Đồng hành các cuộc thi khởi nghiệp, olympiad quốc tế",
        ],
      },
    ],
  },
  {
    id: "tutor",
    tag: "1-1 Tutoring",
    title: "Gói Tutor",
    desc: "Lớp học 1-1 cùng gia sư xuất sắc của VinUniversity, được thiết kế riêng cho từng học sinh theo chương trình Cambridge IGCSE, AS & A Level và hệ Vinschool.",
    options: [
      {
        name: "Lịch học cố định",
        note: "Học theo lịch cố định hàng tuần, phù hợp cho học sinh cần hệ thống kiến thức dài hạn và ôn thi bài bản.",
        items: [
          "2-3 buổi/tuần (50 phút/buổi)",
          "Gia sư ghép theo môn & trình độ cụ thể",
          "Bài tập cá nhân hóa sau mỗi buổi học",
          "Báo cáo tiến độ học tập hàng tháng",
          "Hỗ trợ ôn thi mock exam & past paper",
        ],
      },
      {
        name: "Gói ôn thi cấp tốc",
        note: "Gói tập trung ngắn hạn cho học sinh cần chuẩn bị kỳ thi IGCSE / AS & A Level sắp tới.",
        items: [
          "4-5 buổi/tuần trong 4-8 tuần",
          "Tập trung vào past papers & exam technique",
          "Chiến lược phân bổ thời gian trong phòng thi",
          "Ôn tập chuyên sâu từng topic yếu",
          "Mock exam mô phỏng thực tế",
        ],
      },
    ],
  },
];

const matrix = {
  columns: [
    "Personal Statement",
    "Supplemental Essay",
    "Điền Common App",
    "CV & Portfolio",
    "Mock Interview",
    "Revision Round",
  ],
  rows: [
    { name: "Premium", cells: [true, true, true, true, true, true] },
    { name: "Standard", cells: [true, true, true, false, true, true] },
    { name: "Chỉ Personal Statement", cells: [true, false, false, false, false, true] },
    { name: "Chỉ Supplemental", cells: [false, true, false, false, false, true] },
  ],
};

function ProgramsPage() {
  const [activeTab, setActiveTab] = useState<string>("domestic");
  const activeProgram = programs.find((p) => p.id === activeTab) || programs[0];

  return (
    <>
      <section className="bg-[#122554] text-white border-b-2 border-[#122554] relative overflow-hidden">
        {/* Decorative Stars */}
        <img src="/icons-effect-art/star small yellow.png" alt="" className="absolute top-6 right-6 md:top-12 md:right-12 w-6 h-6 md:w-10 md:h-10 animate-rock pointer-events-none z-10" />
        <img src="/icons-effect-art/star small while.png" alt="" className="absolute bottom-6 left-6 md:bottom-12 md:left-12 w-4 h-4 md:w-6 md:h-6 animate-rock pointer-events-none z-10" />
        <div className="mx-auto max-w-6xl px-4 sm:px-5 py-10 sm:py-16 lg:py-20 relative z-10">
          <p className="eyebrow text-[#ffcd6b]">Our programs</p>
          <h1 className="mt-3 max-w-3xl text-3xl font-bold sm:text-4xl lg:text-5xl [text-wrap:balance]">
            Lộ trình đồng hành
          </h1>
          <p className="mt-3 max-w-2xl text-sm sm:text-base lg:text-lg leading-relaxed text-white [text-wrap:balance]">
            Mỗi lộ trình đều bắt đầu từ một buổi tư vấn định hướng để hiểu điểm mạnh, mục tiêu và
            thời gian còn lại của học sinh — trước khi chọn gói phù hợp.
          </p>
        </div>
      </section>

      {/* Path Selector Tabs */}
      {/* Path Selector Tabs */}
      <div className="border-b border-[#122554] bg-white sticky top-[56px] md:top-[72px] z-40 shadow-sm">
        <div className="mx-auto max-w-6xl px-3 sm:px-5">
          {/* Mobile 2x2 Selector: 100% visible, zero horizontal swiping */}
          <div className="grid grid-cols-2 gap-1.5 py-2 sm:hidden">
            {programs.map((p) => (
              <button
                key={p.id}
                onClick={() => setActiveTab(p.id)}
                className={`py-2 px-2.5 text-xs font-bold transition-all text-center rounded border cursor-pointer ${
                  activeTab === p.id
                    ? "border-[#122554] bg-[#122554] text-white shadow-sm"
                    : "border-[#122554]/20 bg-slate-50 text-[#122554] hover:bg-slate-100"
                }`}
              >
                {p.title}
              </button>
            ))}
          </div>

          {/* Desktop Tab Row */}
          <div className="hidden sm:flex gap-1 sm:gap-2 overflow-x-auto no-scrollbar scroll-smooth py-0">
            {programs.map((p) => (
              <button
                key={p.id}
                onClick={() => setActiveTab(p.id)}
                className={`py-4 px-5 text-sm font-bold transition-all relative focus:outline-none whitespace-nowrap cursor-pointer ${
                  activeTab === p.id
                    ? "text-[#122554] font-bold"
                    : "text-[#122554]/60 hover:text-[#122554]"
                }`}
              >
                {p.title}
                {activeTab === p.id && (
                  <div className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#122554]" />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="relative overflow-hidden">
        {/* Background Art */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none flex items-center justify-center">
          <img src="/icons-effect-art/background2new.PNG" alt="" className="w-full h-full object-cover object-center" />
        </div>
        {/* Decorative Blue Star */}
        <img src="/icons-effect-art/star small blue.svg" alt="" className="absolute top-4 right-4 md:top-8 md:right-8 w-5 h-5 md:w-8 md:h-8 animate-rock pointer-events-none z-10" />

        <div className="mx-auto max-w-6xl px-4 sm:px-5 py-6 sm:py-8 lg:py-12 relative z-10">
          {activeProgram && (
            <div key={activeProgram.id} className="transition-all duration-300 animate-in fade-in slide-in-from-bottom-3">
              <p className="eyebrow text-[#122554] font-bold">{activeProgram.tag}</p>
              <h2 className="mt-2 text-2xl sm:text-3xl font-bold text-[#122554]">{activeProgram.title}</h2>
              <p className="mt-2 max-w-2xl text-sm sm:text-base leading-relaxed text-[#000000]">{activeProgram.desc}</p>

              {activeProgram.id === "tutor" ? (
                /* Gói Tutor: chỉ mô tả + CTA */
                <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <Link
                    to="/gia-su"
                    className="btn-interactive btn-interactive-primary px-7 py-3.5 text-base font-semibold"
                  >
                    Xem đội ngũ Gia sư
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                  <Link
                    to="/lien-he"
                    className="flex items-center justify-center gap-2 px-7 py-3.5 text-base font-semibold border-2 border-[#122554] text-[#122554] hover:bg-[#122554] hover:text-white transition-all duration-200"
                  >
                    Đặt lịch tư vấn
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                </div>
              ) : (
                <div className="mt-6 sm:mt-8 grid gap-4 sm:gap-6 md:grid-cols-2">
                  {activeProgram.options.map((o) => (
                    <div key={o.name} className="flex flex-col rounded-lg border border-[#122554]/15 bg-white p-4 sm:p-5 hover:border-[#ffcd6b] hover:shadow-md transition-all">
                      <h3 className="font-display text-lg sm:text-xl font-bold text-[#122554]">{o.name}</h3>
                      <p className="mt-1.5 sm:mt-2 text-xs sm:text-sm leading-relaxed text-[#000000] min-h-[36px]">{o.note}</p>
                      <ul className="mt-4 sm:mt-5 space-y-2 border-t border-[#122554]/20 pt-4 flex-grow">
                        {o.items.map((i) => (
                          <li key={i} className="flex gap-2.5 text-xs sm:text-sm text-[#000000] font-medium">
                            <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#122554]" />
                            <span>{i}</span>
                          </li>
                        ))}
                      </ul>
                      <Link
                        to="/lien-he"
                        className="mt-5 btn-interactive btn-interactive-primary px-4 py-2.5 text-sm font-semibold w-full text-center border border-[#122554]"
                      >
                        Nhận tư vấn gói này
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <section className="border-t border-[#122554] bg-white relative overflow-hidden">
        {/* Decorative Blue Star */}
        <img src="/icons-effect-art/star small blue.svg" alt="" className="absolute bottom-6 right-6 md:bottom-10 md:right-10 w-5 h-5 md:w-8 md:h-8 animate-rock pointer-events-none z-10" />
        <div className="mx-auto max-w-6xl px-4 sm:px-5 py-8 sm:py-10 lg:py-14">
          <p className="eyebrow text-[#122554]">Compare</p>
          <h2 className="mt-2 sm:mt-4 text-2xl sm:text-3xl font-bold text-[#122554]">Gói Mentor Du học — các hạng mục</h2>

          {/* Desktop Table View */}
          <div className="hidden md:block mt-8 overflow-x-auto rounded-[4px] border border-[#122554] bg-white">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="bg-[#122554] text-white">
                  <th className="px-5 py-4 font-display font-bold border-b border-[#122554]">Hạng mục</th>
                  {matrix.columns.map((c) => (
                    <th key={c} className="px-4 py-4 text-center font-display font-bold border-b border-[#122554]">
                      {c}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {matrix.rows.map((r) => (
                  <tr key={r.name} className="border-t border-[#122554] hover:bg-[#122554]/5 transition-colors">
                    <th className="px-5 py-4 font-bold text-[#122554]">{r.name}</th>
                    {r.cells.map((cell, idx) => (
                      <td key={matrix.columns[idx]} className="px-4 py-4 text-center">
                        {cell ? (
                          <Check className="mx-auto h-4 w-4 text-[#122554] font-bold" />
                        ) : (
                          <Minus className="mx-auto h-4 w-4 text-[#122554]/30" />
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Vertical Cards (zero horizontal scroll!) */}
          <div className="mt-6 space-y-3 md:hidden">
            {matrix.rows.map((r) => {
              const includedCount = r.cells.filter(Boolean).length;
              return (
                <div
                  key={r.name}
                  className="border-2 border-[#122554] p-3.5 bg-white shadow-sm"
                >
                  <div className="flex items-center justify-between border-b border-[#122554]/20 pb-2 mb-2.5">
                    <h3 className="font-display font-bold text-sm text-[#122554]">{r.name}</h3>
                    <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-[#122554] text-white">
                      {includedCount}/6 hạng mục
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-1.5">
                    {matrix.columns.map((col, idx) => {
                      const included = r.cells[idx];
                      return (
                        <div
                          key={col}
                          className={`flex items-center gap-1.5 text-[11.5px] p-1.5 rounded ${
                            included
                              ? "bg-[#122554]/5 text-[#122554] font-medium"
                              : "bg-gray-50 text-gray-400 line-through"
                          }`}
                        >
                          {included ? (
                            <Check className="h-3.5 w-3.5 text-[#122554] shrink-0 font-bold" />
                          ) : (
                            <Minus className="h-3.5 w-3.5 text-gray-300 shrink-0" />
                          )}
                          <span className="truncate">{col}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          <p className="mt-4 text-xs sm:text-sm text-[#000000] font-medium leading-relaxed">
            Học phí được xây dựng theo quốc gia ứng tuyển, số lượng trường và mức độ đồng hành. Liên
            hệ để nhận báo giá chi tiết cho từng lộ trình.
          </p>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="border-t-2 border-[#122554] bg-[#122554] py-14 lg:py-20 relative overflow-hidden">
        <img src="/icons-effect-art/star small yellow.png" alt="" className="absolute top-8 left-8 w-8 h-8 animate-rock pointer-events-none opacity-60" />
        <img src="/icons-effect-art/star small while.png" alt="" className="absolute bottom-8 right-8 w-6 h-6 animate-rock pointer-events-none opacity-60" />
        <div className="mx-auto max-w-4xl px-5 text-center relative z-10">
          <p className="eyebrow text-[#ffcd6b] mb-4">Bắt đầu ngay hôm nay</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Sẵn sàng bứt phá?
          </h2>
          <p className="text-white/80 text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
            Dù bạn đang tìm mentor đồng hành hồ sơ hay gia sư 1-1 cho các kỳ thi Cambridge — UniVenture luôn sẵn sàng.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              to="/lien-he"
              className="btn-interactive btn-interactive-accent px-7 py-3.5 text-base font-semibold"
            >
              Đặt lịch tư vấn
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              to="/gia-su"
              className="flex items-center gap-2 px-7 py-3.5 text-base font-semibold border-2 border-white text-white hover:bg-white hover:text-[#122554] transition-all duration-200"
            >
              Tìm gia sư 1-1
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
