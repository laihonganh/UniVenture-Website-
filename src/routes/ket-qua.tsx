import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/ket-qua")({
  head: () => ({
    meta: [
      { title: "Kết quả trúng tuyển & học bổng — UniVenture" },
      {
        name: "description",
        content:
          "Hơn 40 tỷ đồng học bổng khối Việt Nam, 15 suất Russell Group tại Anh, hơn 30 suất học bổng đại học Mỹ và hơn 5 suất tại Singapore.",
      },
      { property: "og:title", content: "Kết quả trúng tuyển & học bổng — UniVenture" },
      {
        property: "og:description",
        content:
          "Thành tích của đội ngũ mentor UniVenture tại Việt Nam, Anh & Châu Âu, Mỹ và Singapore.",
      },
    ],
  }),
  component: ResultsPage,
});

const regions = [
  {
    region: "Khối Việt Nam",
    headline: "Hơn 40 tỷ đồng học bổng",
    note: "Học bổng các chương trình đại học quốc tế tại Việt Nam, gồm học bổng 100% chương trình Y khoa (MD) và 90% Quản trị kinh doanh.",
    schools: [
      { name: "VinUniversity", logo: "/images/logos/vinuni.png" },
    ],
  },
  {
    region: "Vương quốc Anh & Châu Âu",
    headline: "15 suất Russell Group",
    note: "Bao gồm các suất trúng tuyển tại Hà Lan cùng Holland Scholarship.",
    schools: [
      { name: "LSE", logo: "/images/logos/lse.png" },
      { name: "UCL", logo: "/images/logos/ucl.png" },
      { name: "Imperial College London", logo: "/images/logos/imperial.png" },
      { name: "University of Manchester", logo: "/images/logos/manchester.png" },
      { name: "University of Bristol", logo: "/images/logos/bristol.png" },
      { name: "University of Birmingham", logo: "/images/logos/birmingham.png" },
      { name: "University of Amsterdam", logo: "/images/logos/amsterdam.png" },
      { name: "Utrecht University", logo: "/images/logos/utrecht.png" },
    ],
  },
  {
    region: "Mỹ",
    headline: "Hơn 30 suất học bổng",
    note: "Nhiều gói học bổng và hỗ trợ tài chính trị giá từ 5,7 đến 7,2 tỷ VNĐ mỗi suất.",
    schools: [
      { name: "NYU", logo: "/images/logos/nyu.png" },
      { name: "Babson College", logo: "/images/logos/Babson College.PNG" },
      { name: "Grinnell College", logo: "/images/logos/Grinnell College.png" },
      { name: "Bucknell University", logo: "/images/logos/Bucknell University.PNG" },
      { name: "Kenyon College", logo: "/images/logos/Kenyon College.png" },
      { name: "Denison University", logo: "/images/logos/Denison University.png" },
      { name: "Washington and Lee", logo: "/images/logos/washingtonlee.png" },
      { name: "Drexel University", logo: "/images/logos/Drexel University.png" },
      { name: "Stevens Institute of Technology", logo: "/images/logos/Stevens Institute of Technology.PNG" },
      { name: "UConn", logo: "/images/logos/UConn.png" },
      { name: "Rochester Institute of Technology", logo: "/images/logos/rochester institute of technology.PNG" },
      { name: "DePauw University", logo: "/images/logos/depauw.png" },
      { name: "Union College", logo: "/images/logos/union.png" },
      { name: "St. Olaf College", logo: "/images/logos/stolaf.png" },
      { name: "Mount Holyoke College", logo: "/images/logos/mtholyoke.png" },
    ],
  },
  {
    region: "Singapore",
    headline: "Hơn 5 suất học bổng",
    note: "Các suất học bổng tại những đại học hàng đầu Châu Á.",
    schools: [
      { name: "NUS", logo: "/images/logos/nus.png" },
      { name: "SMU", logo: "/images/logos/smu.png" },
    ],
  },
];

function ResultsPage() {
  return (
    <>
      <section className="bg-[#122554] text-white border-b-2 border-[#122554] relative overflow-hidden">
        {/* Decorative Stars */}
        <img src="/icons-effect-art/star small yellow.png" alt="" className="absolute top-6 right-6 md:top-12 md:right-12 w-6 h-6 md:w-10 md:h-10 animate-rock pointer-events-none z-10" />
        <img src="/icons-effect-art/star small while.png" alt="" className="absolute bottom-6 left-6 md:bottom-12 md:left-12 w-4 h-4 md:w-6 md:h-6 animate-rock pointer-events-none z-10" />
        <div className="mx-auto max-w-6xl px-4 sm:px-5 py-10 sm:py-16 lg:py-20 relative z-10">
          <p className="eyebrow text-[#ffcd6b]">Track record</p>
          <h1 className="mt-3 max-w-3xl text-2xl sm:text-4xl lg:text-5xl leading-tight font-bold [text-wrap:balance]">
            Thành tích của đội ngũ mentor
          </h1>
          <p className="mt-3 sm:mt-5 max-w-2xl text-sm sm:text-base lg:text-lg leading-relaxed text-white/90 [text-wrap:balance]">
            Những con số dưới đây là kết quả thật mà đội ngũ mentor UniVenture đã chinh phục — nền
            tảng kinh nghiệm mà các em sẽ được kế thừa trong suốt hành trình đồng hành.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 sm:px-5 py-8 sm:py-12 lg:py-16 bg-white relative overflow-hidden">
        {/* Decorative Blue Star */}
        <img src="/icons-effect-art/star small blue.svg" alt="" className="absolute top-6 right-6 md:top-10 md:right-10 w-5 h-5 md:w-8 md:h-8 animate-rock pointer-events-none z-10" />
        {regions.map((r) => (
          <section
            key={r.region}
            className="grid gap-4 sm:gap-6 border-t-2 border-[#122554] py-6 sm:py-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-10 first:border-t-0 first:pt-0"
          >
            <div>
              <h2 className="font-display text-lg sm:text-xl font-bold text-[#122554]">{r.region}</h2>
              <p className="mt-1 sm:mt-2 inline-block underline-accent font-display text-base sm:text-lg font-bold text-[#122554]">
                {r.headline}
              </p>
              <p className="mt-2 text-xs sm:text-sm leading-relaxed text-[#000000] [text-wrap:balance]">{r.note}</p>
            </div>
            
            {/* Clean Logo Grid — Borderless, uniform size, responsive for mobile & desktop */}
            <div className="grid gap-2 sm:gap-3 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {r.schools.map((s) => (
                <div
                  key={s.name}
                  className="flex items-center justify-center p-2.5 sm:p-3 rounded-lg bg-slate-50/80 hover:bg-slate-100 h-16 sm:h-20 transition-all border-0 shadow-none"
                  title={s.name}
                >
                  <img
                    src={s.logo}
                    alt={`Logo ${s.name}`}
                    className="max-h-10 sm:max-h-12 max-w-[85%] object-contain"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>

      <section className="text-[#122554] border-t-2 border-[#122554] relative overflow-hidden bg-white">
        {/* Background Art */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none flex items-center justify-center">
          <img src="/icons-effect-art/background 3.PNG" alt="" className="w-full h-full object-cover object-center" />
        </div>
        {/* Decorative Star */}
        <img src="/icons-effect-art/star small blue.svg" alt="" className="absolute top-4 right-4 md:top-8 md:right-8 w-5 h-5 md:w-8 md:h-8 animate-rock pointer-events-none z-10" />
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-center gap-4 sm:gap-6 px-4 sm:px-5 py-10 sm:py-14 lg:flex-row lg:items-center relative z-10 text-center lg:text-left">
          <div className="lg:pr-10">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#122554] [text-wrap:balance]">Kết quả tiếp theo có thể là của em</h2>
          </div>
          <Link
            to="/lien-he"
            className="btn-interactive btn-interactive-primary px-8 py-3.5 text-base w-full sm:w-auto"
          >
            Đăng ký tư vấn
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>
    </>
  );
}
