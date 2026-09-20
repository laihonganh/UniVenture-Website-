import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/ve-chung-toi")({
  head: () => ({
    meta: [
      { title: "Về UniVenture — Sứ mệnh & Giá trị cốt lõi" },
      {
        name: "description",
        content:
          "UniVenture đồng hành để học sinh trưởng thành qua chính hành trình chuẩn bị hồ sơ: Action First, Growth Beyond Admissions, Authenticity, Responsibility, Accessibility.",
      },
      { property: "og:title", content: "Về UniVenture — Sứ mệnh & Giá trị cốt lõi" },
      {
        property: "og:description",
        content:
          "Mỗi dự án, mỗi nghiên cứu, mỗi bài luận và mỗi thất bại đều là viên gạch hình thành tư duy và bản lĩnh của người học.",
      },
    ],
  }),
  component: AboutPage,
});

const values = [
  {
    no: "01",
    en: "Action First",
    body: "Trải nghiệm thực tế luôn là người thầy tốt nhất. Mọi chương trình tại UniVenture đều được thiết kế theo triết lý Project-Based Learning, nơi học sinh học bằng cách tạo ra sản phẩm, dự án và giá trị thật.",
  },
  {
    no: "02",
    en: "Growth Beyond Admissions",
    body: "Một lá thư trúng tuyển chỉ kéo dài một ngày. Nhưng tư duy, bản lĩnh và năng lực mà học sinh tích lũy trong quá trình chuẩn bị sẽ theo các em suốt cả cuộc đời.",
  },
  {
    no: "03",
    en: "Authenticity",
    body: "UniVenture không tạo ra những bộ hồ sơ giống nhau. Chúng tôi giúp học sinh tìm ra điều khiến mình khác biệt và kể câu chuyện ấy bằng những trải nghiệm chân thực nhất.",
  },
  {
    no: "04",
    en: "Responsibility",
    body: "Chúng tôi mong muốn mỗi học sinh không chỉ theo đuổi thành tích cá nhân mà còn tạo ra những giá trị tích cực cho cộng đồng thông qua các dự án và sáng kiến của mình.",
  },
  {
    no: "05",
    en: "Accessibility",
    body: "Thông qua các khóa học trực tuyến, chương trình học bổng và mạng lưới cố vấn, UniVenture rút ngắn khoảng cách tiếp cận giáo dục quốc tế giữa các học sinh trên khắp Việt Nam.",
  },
];

const opportunities = [
  "Khám phá bản thân và định vị thương hiệu cá nhân",
  "Xây dựng dự án xã hội hoặc startup giải quyết vấn đề thực tiễn",
  "Thực hiện nghiên cứu cùng giáo sư, chuyên gia",
  "Phát triển năng lực lãnh đạo, tư duy phản biện",
  "Chuẩn bị hồ sơ đại học quốc tế với chiều sâu, không chạy theo thành tích",
];

function AboutPage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeValue = values[activeIndex];

  return (
    <>
      <section className="bg-[#122554] text-white border-b-2 border-[#122554] relative overflow-hidden">
        {/* Decorative Stars */}
        <img src="/icons-effect-art/star small while.png" alt="" className="absolute top-6 right-6 md:top-10 md:right-10 w-5 h-5 md:w-8 md:h-8 animate-rock pointer-events-none z-10" />
        <img src="/icons-effect-art/star small yellow.png" alt="" className="absolute bottom-6 left-6 md:bottom-16 md:left-10 w-4 h-4 md:w-6 md:h-6 animate-rock pointer-events-none z-10" />

        <div className="mx-auto max-w-6xl px-5 py-16 lg:py-24 relative z-10">
          <p className="eyebrow text-[#ffcd6b]">About us</p>
          <h1 className="mt-5 max-w-3xl text-4xl leading-[1.1] font-bold sm:text-5xl lg:text-6xl">
            Về UniVenture
          </h1>
          <p className="mt-8 max-w-3xl text-lg leading-relaxed text-white">
            UniVenture là một hệ sinh thái giáo dục hướng tới việc đồng hành cùng học sinh trên hành
            trình bước vào đại học quốc tế bằng <span className="highlight-yellow">trải nghiệm thực tiễn</span>. Chúng tôi tin rằng một bộ hồ
            sơ mạnh không được tạo nên bởi những thành tích được "xây dựng", được "tô vẽ", mà bởi
            những trải nghiệm được <span className="font-bold text-[#ffcd6b] underline decoration-[#ffcd6b]/60 decoration-2">sống thật</span>.
          </p>
        </div>
      </section>

      <section className="bg-white relative overflow-hidden">
        {/* Decorative Blue Star */}
        <img src="/icons-effect-art/star small blue.svg" alt="" className="absolute top-6 right-6 md:top-10 md:right-10 w-5 h-5 md:w-8 md:h-8 animate-rock pointer-events-none z-10" />
        <div className="mx-auto max-w-6xl px-5 py-16 lg:py-24">
          <div className="text-center mb-16">
            <p className="eyebrow text-[#122554]">Our mission</p>
            <h2 className="mt-4 text-3xl font-bold sm:text-4xl text-[#122554] max-w-2xl mx-auto">
              Không chỉ là trúng tuyển, mà là <span className="highlight-yellow">sự trưởng thành</span>
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-[#000000] max-w-3xl mx-auto">
              Tại UniVenture, chúng tôi không chỉ giúp học sinh được nhận vào một trường đại học.
              Mỗi dự án được xây dựng, mỗi nghiên cứu được thực hiện hay mỗi thất bại đều trở thành những viên gạch hình
              thành tư duy, bản lĩnh và năng lực của người học.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-2 lg:gap-10 items-start">
            <div className="bg-[#122554] p-8 border-2 border-[#122554] h-full flex flex-col justify-center">
              <h3 className="font-display text-2xl font-bold text-white mb-4">
                Mô hình Project-Based Learning
              </h3>
              <p className="text-white text-lg mb-8">
                Thay vì ghi nhớ lý thuyết, UniVenture trao cho học sinh cơ hội học bằng cách <span className="text-[#ffcd6b]">hành động thực tế</span>.
              </p>
              <div className="mt-auto inline-flex">
                <Link to="/chuong-trinh" className="btn-interactive btn-interactive-accent px-6 py-3">
                  Khám phá chương trình
                </Link>
              </div>
            </div>

            <div className="grid gap-3">
              {opportunities.map((o) => (
                <div key={o} className="flex gap-4 p-4 border-l-4 border-[#ffcd6b] bg-white items-center">
                  <span className="text-[#122554] text-base leading-snug">
                    {o}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Interactive Split Screen Section */}
      <section className="border-t-2 border-b-2 border-[#122554] bg-white relative overflow-hidden">
        {/* Background Art */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none mix-blend-multiply opacity-100 flex items-center justify-center">
          <img src="/icons-effect-art/background 4 new.png" alt="" className="w-full h-full object-cover object-center" />
        </div>
        <div className="mx-auto max-w-6xl px-4 sm:px-5 py-8 sm:py-14 lg:py-20 relative z-10">
          <p className="eyebrow text-[#122554]">Core values</p>
          <h2 className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-bold text-[#122554] mb-5 sm:mb-8">Giá trị cốt lõi</h2>

          <div className="grid gap-4 sm:gap-8 lg:grid-cols-[1fr_1.5fr] items-start">
            {/* Selector list: 2x2 grid on mobile, vertical on desktop */}
            <div className="grid grid-cols-2 gap-2 lg:flex lg:flex-col lg:gap-3">
              {values.map((v, idx) => (
                <button
                  key={v.no}
                  onClick={() => setActiveIndex(idx)}
                  className={`w-full text-left p-2.5 sm:p-4 border-2 transition-all duration-200 cursor-pointer ${
                    activeIndex === idx
                      ? "border-[#122554] bg-[#122554] text-white"
                      : "border-[#122554] bg-white text-[#122554] hover:bg-[#ffcd6b]"
                  }`}
                >
                  <div className="flex items-center gap-2 sm:gap-4">
                    <span className={`font-display text-sm sm:text-base lg:text-lg font-bold ${activeIndex === idx ? "text-[#ffcd6b]" : "text-[#122554]"}`}>
                      {v.no}
                    </span>
                    <h3 className="font-display text-xs sm:text-sm lg:text-base font-bold uppercase tracking-wider line-clamp-1">{v.en}</h3>
                  </div>
                </button>
              ))}
            </div>

            {/* Display Card */}
            <div className="border-2 border-[#122554] bg-white p-4 sm:p-8 lg:p-10 min-h-[180px] sm:min-h-[260px] flex flex-col justify-center">
              {activeValue && (
              <div key={activeValue.no} className="transition-all duration-300 animate-in fade-in slide-in-from-right-4">
                <span className="font-display text-3xl sm:text-5xl lg:text-6xl font-bold text-[#ffcd6b] leading-none mb-2 sm:mb-3 block">
                  {activeValue.no}
                </span>
                <h3 className="font-display text-base sm:text-xl lg:text-2xl font-bold text-[#122554] uppercase tracking-wide mb-3 sm:mb-4">
                  {activeValue.en}
                </h3>
                <p className="text-xs sm:text-sm lg:text-base leading-relaxed text-[#000000] border-t-2 border-[#122554] pt-3 sm:pt-4">
                  {activeValue.body}
                </p>
              </div>
            )}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto flex max-w-6xl flex-col items-center text-center gap-6 px-5 py-16 lg:py-24">
          <h2 className="text-3xl font-bold sm:text-4xl text-[#122554]">
            Muốn biết chương trình nào phù hợp với con?
          </h2>
          <Link
            to="/lien-he"
            className="btn-interactive btn-interactive-primary px-8 py-4 text-base mt-4"
          >
            Đặt lịch tư vấn
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>
    </>
  );
}
