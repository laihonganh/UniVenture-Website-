import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, Compass, Rocket, Microscope, Users, ChevronLeft, ChevronRight, FileText } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "UniVenture — College Admissions Built on Action" },
      {
        name: "description",
        content:
          "UniVenture đồng hành cùng học sinh Việt Nam vào đại học quốc tế bằng dự án, startup và nghiên cứu thực tiễn — không phải thành tích tô vẽ.",
      },
      { property: "og:title", content: "UniVenture — College Admissions Built on Action" },
      {
        property: "og:description",
        content:
          "Hồ sơ mạnh đến từ trải nghiệm được sống thật. Mentor 1-1, Project-Based Learning, hơn 40 tỷ đồng học bổng.",
      },
    ],
  }),
  component: Index,
});

const pillars = [
  {
    icon: Compass,
    title: "Khám phá bản thân",
    body: "Định vị thương hiệu cá nhân và tìm ra điều khiến em khác biệt trước khi viết dòng luận đầu tiên.",
  },
  {
    icon: Rocket,
    title: "Dự án & startup",
    body: "Xây dựng dự án xã hội hoặc startup giải quyết một vấn đề thực tiễn, có sản phẩm và tác động đo được.",
  },
  {
    icon: Microscope,
    title: "Nghiên cứu học thuật",
    body: "Thực hiện nghiên cứu cùng giáo sư, nhà nghiên cứu và chuyên gia trong lĩnh vực em theo đuổi.",
  },
  {
    icon: Users,
    title: "Mentor 1-1",
    body: "Đồng hành sát sao từ chiến lược hồ sơ, luận chính, portfolio đến mock interview.",
  },
];

const stats = [
  { value: "40 tỷ+", label: "học bổng khối Việt Nam" },
  { value: "15", label: "suất Russell Group (UK)" },
  { value: "30+", label: "suất học bổng đại học Mỹ" },
  { value: "5+", label: "suất học bổng Singapore" },
];

const mentorTeaser = [
  {
    name: "Mentor Uyển Như",
    image: "/images/mentors/mentor-uyen-nhu-new.png",
    highlight: "Top 1% IOL Vietnam 2025. Trúng tuyển LSE, UCL (UK) & học bổng 7,2 tỷ VNĐ Mỹ.",
  },
  {
    name: "Mentor Bảo Linh",
    image: "/images/mentors/mentor-bao-linh-new.png",
    highlight: "Học bổng toàn phần Cử nhân Y khoa (MD) tại VinUniversity. Đồng sáng lập startup MedMate.",
  },
  {
    name: "Mentor Bảo Minh",
    image: "/images/mentors/mentor-bao-minh-new.png",
    highlight: "Quán quân The Global Innovation Challenge (GIC). Trúng tuyển NUS (Singapore) học bổng toàn phần.",
  },
];

function Index() {
  const vantaRef = useRef<HTMLDivElement>(null);
  const vantaEffect = useRef<any>(null);
  const [currentMentorSlide, setCurrentMentorSlide] = useState(0);

  useEffect(() => {
    let attempts = 0;
    const maxAttempts = 50;

    const initVanta = () => {
      const w = window as any;
      if (w.VANTA && w.VANTA.FOG && vantaRef.current && !vantaEffect.current) {
        vantaEffect.current = w.VANTA.FOG({
          el: vantaRef.current,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.0,
          minWidth: 200.0,
          highlightColor: 0x122554,
          midtoneColor: 0x122554,
          lowlightColor: 0xffffff,
          baseColor: 0x122554,
          blurFactor: 0.56,
          speed: 2.6,
          zoom: 1.5,
        });
      } else if (attempts < maxAttempts) {
        attempts++;
        setTimeout(initVanta, 100);
      }
    };

    initVanta();

    return () => {
      if (vantaEffect.current) {
        vantaEffect.current.destroy();
        vantaEffect.current = null;
      }
    };
  }, []);

  const nextMentor = () => setCurrentMentorSlide((s) => (s + 1) % mentorTeaser.length);
  const prevMentor = () => setCurrentMentorSlide((s) => (s - 1 + mentorTeaser.length) % mentorTeaser.length);

  return (
    <>
      {/* Hero — Vanta.js Fog */}
      <section className="vanta-hero">
        <div ref={vantaRef} className="vanta-hero-bg" />
        <div className="vanta-hero-content">
          <h1 className="vanta-hero-title text-white">
            Hồ sơ mạnh không được tô vẽ.
            <br />
            Nó được <span className="font-bold text-white underline decoration-4 decoration-white/50">sống thật</span>.
          </h1>
          <div className="vanta-hero-lead mt-5 md:mt-7 text-center">
            {/* Desktop: Exactly 3 balanced lines */}
            <div className="hidden md:block">
              <span className="block">UniVenture là hệ sinh thái giáo dục đồng hành cùng học sinh</span>
              <span className="block">
                trên hành trình bước vào đại học quốc tế bằng{" "}
                <span className="font-bold text-white">trải nghiệm thực tiễn:</span>
              </span>
              <span className="block">dự án, startup, nghiên cứu và tác động xã hội.</span>
            </div>
            {/* Mobile: 4 balanced, equal-length lines */}
            <div className="md:hidden text-balance max-w-[340px] mx-auto text-[14px] leading-relaxed">
              <span className="block">UniVenture là hệ sinh thái giáo dục đồng hành</span>
              <span className="block">cùng học sinh trên hành trình bước vào</span>
              <span className="block">
                đại học quốc tế bằng <span className="font-bold text-white">trải nghiệm thực tiễn:</span>
              </span>
              <span className="block">dự án, startup, nghiên cứu và tác động xã hội.</span>
            </div>
          </div>
          <div className="vanta-hero-cta mt-10">
            <Link
              to="/lien-he"
              className="btn-interactive btn-interactive-accent"
            >
              Đặt lịch tư vấn 1-1
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/gia-su"
              className="btn-interactive btn-interactive-ghost"
            >
              Tìm gia sư 1-1
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-b-2 border-[#122554] relative overflow-hidden" style={{ background: "#ffffff" }}>
        {/* Decorative Blue Diamond - Top Right & Bottom Left (scaled 5x) */}
        <img src="/icons-effect-art/diamond-blue.png" alt="" className="absolute -top-6 -right-6 md:-top-10 md:-right-10 w-24 h-24 md:w-40 md:h-40 animate-rock pointer-events-none opacity-90" />
        <img src="/icons-effect-art/diamond-blue.png" alt="" className="absolute -bottom-6 -left-6 md:-bottom-10 md:-left-10 w-20 h-20 md:w-32 md:h-32 animate-rock pointer-events-none opacity-70" />
        <dl className="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-5 py-12 lg:grid-cols-4 relative z-10">
          {stats.map((s) => (
            <div key={s.label} className="border-l-4 border-[#ffcd6b] pl-5">
              <dt className="font-display text-4xl font-bold text-[#122554] sm:text-5xl">{s.value}</dt>
              <dd className="mt-2 text-sm text-[#000000] uppercase tracking-wider">{s.label}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Philosophy */}
      <section className="bg-white relative overflow-hidden">
        {/* Background Art - 100% opacity, fill screen, center-below */}
        <div className="absolute inset-0 w-full h-full pointer-events-none flex items-end justify-center mix-blend-multiply overflow-hidden">
          <img
            src="/icons-effect-art/background 4 new.png"
            alt=""
            className="w-full h-full object-cover object-bottom"
          />
        </div>
        <div className="mx-auto max-w-6xl px-4 sm:px-5 py-14 sm:py-16 lg:py-24 relative z-10">
          <div className="max-w-4xl">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#122554]">
              Thay vì chỉ hướng tới lá thư trúng tuyển
            </h2>
            <p className="mt-3 sm:mt-5 text-sm sm:text-base lg:text-lg leading-relaxed text-[#000000]">
              Chúng tôi giúp học sinh khám phá bản thân, xây dựng dự án, khởi tạo startup, tham gia
              nghiên cứu và tạo ra tác động xã hội. Bởi giá trị của một bộ hồ sơ không nằm ở số lượng
              hoạt động ngoại khóa, mà nằm ở <span className="highlight-navy text-white">câu chuyện trưởng thành</span> phía sau mỗi hành trình.
            </p>
          </div>

          <div className="mt-8 sm:mt-12 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {pillars.map((p) => (
              <div
                key={p.title}
                className="rounded-none border-2 border-[#122554] bg-[#ffffff] p-5 sm:p-7 hover:bg-[#122554] hover:text-white transition-all duration-200 group cursor-pointer shadow-sm hover:shadow-xl flex flex-col justify-between min-h-[150px] sm:min-h-[170px]"
              >
                <div>
                  <p.icon className="h-7 w-7 sm:h-8 sm:w-8 text-[#122554] group-hover:text-white transition-colors" />
                  <h3 className="mt-3 sm:mt-4 text-base sm:text-lg font-display font-bold text-[#122554] group-hover:text-white transition-colors">{p.title}</h3>
                  <p className="mt-2 text-[13.5px] sm:text-sm leading-relaxed text-[#000000] group-hover:text-white/90 transition-colors">{p.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Pillars */}
      <section className="bg-[#122554] text-white border-b-2 border-[#122554] relative overflow-hidden">
        {/* Decorative Yellow Stars & Sparkle */}
        <img src="/icons-effect-art/star-big-yellow.png" alt="" className="absolute top-6 right-6 md:top-10 md:right-10 w-8 h-8 md:w-14 md:h-14 animate-rock pointer-events-none opacity-90" />
        <img src="/icons-effect-art/Sparkle.svg" alt="" className="absolute bottom-6 left-8 md:bottom-12 md:left-20 w-5 h-5 md:w-8 md:h-8 animate-pulse pointer-events-none opacity-80" />

        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 lg:grid-cols-[0.8fr_1.2fr] lg:py-24 relative z-10">
          <div>
            <p className="eyebrow text-[#ffcd6b]">Accessibility</p>
            <h2 className="mt-4 text-3xl font-bold sm:text-4xl text-white [text-wrap:balance]">
              Giáo dục chất lượng cho nhiều học sinh hơn
            </h2>
          </div>
          <div className="space-y-5 text-lg leading-relaxed text-white">
            <p className="[text-wrap:balance]">
              UniVenture cam kết mở rộng cơ hội tiếp cận giáo dục thông qua <span className="font-bold text-white">khóa học trực tuyến</span> với
              chi phí hợp lý, chương trình học bổng và hoạt động cố vấn miễn phí.
            </p>
            <p className="[text-wrap:balance]">
              Mạng lưới gia sư xuất sắc của chúng tôi hỗ trợ học sinh các chương trình chuẩn quốc tế
              như A Level và IGCSE ở các môn Tiếng Anh, Toán và Khoa học — để hành trình apply được
              đứng trên một <span className="font-bold text-white">nền tảng học thuật vững chắc</span>.
            </p>
            <Link
              to="/gia-su"
              className="inline-flex items-center gap-2 pt-2 text-base text-[#ffcd6b] hover:underline font-semibold"
            >
              Gặp đội ngũ gia sư & Đăng ký học thử
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Mentors teaser */}
      <section className="bg-white relative overflow-hidden">
        {/* Decorative Blue Diamond - Top Right & Bottom Left (scaled 5x) */}
        <img src="/icons-effect-art/diamond-blue.png" alt="" className="absolute -top-6 -right-6 md:-top-10 md:-right-10 w-24 h-24 md:w-40 md:h-40 animate-rock pointer-events-none opacity-90 z-10" />
        <img src="/icons-effect-art/diamond-blue.png" alt="" className="absolute -bottom-6 -left-6 md:-bottom-10 md:-left-10 w-20 h-20 md:w-36 md:h-36 animate-rock pointer-events-none opacity-80 z-10" />
        <div className="mx-auto max-w-6xl px-5 py-16 lg:py-24">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-10">
            <div>
              <p className="eyebrow text-[#122554]">Đội ngũ mentor tiêu biểu</p>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#122554] mt-1">
                Người đi trước đã làm được điều em đang hướng tới
              </h2>
              <p className="text-sm text-gray-600 mt-2 max-w-xl">
                Dưới đây là một số gương mặt mentor tiêu biểu. Mạng lưới cố vấn của UniVenture còn rất nhiều anh chị tài năng ở đa dạng ngành nghề sẵn sàng dẫn dắt em trong các chặng đường kế tiếp.
              </p>
            </div>
            <Link
              to="/mentors"
              className="btn-interactive btn-interactive-primary px-6 py-3 text-base shrink-0 hidden md:inline-flex"
            >
              Gặp đội ngũ mentor
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Desktop Grid */}
          <div className="hidden md:grid gap-8 grid-cols-3">
            {mentorTeaser.map((m) => (
              <div key={m.name} className="flex flex-col items-center text-center p-8 border-2 border-[#122554] bg-[#ffffff] hover:border-[#ffcd6b] transition-all group rounded-none">
                <div className="relative w-full max-w-[200px] h-[220px] mb-6 flex items-center justify-center">
                  <img
                    src={m.image}
                    alt={m.name}
                    className="w-full h-full object-contain group-hover:-translate-y-2 transition-transform"
                    loading="lazy"
                  />
                </div>
                <h3 className="font-display text-xl font-bold text-[#122554] mb-3">{m.name}</h3>
                <p className="text-sm text-[#000000]">{m.highlight}</p>
              </div>
            ))}
          </div>

          {/* Mobile Carousel */}
          <div className="md:hidden">
            <div className="flex flex-col items-center text-center p-4 border-2 border-[#122554] bg-[#ffffff] relative">
              {mentorTeaser[currentMentorSlide] && (
                <>
                  <div className="relative w-full max-w-[130px] h-[140px] mb-2 mx-auto flex items-center justify-center">
                    <img
                      src={mentorTeaser[currentMentorSlide].image}
                      alt={mentorTeaser[currentMentorSlide].name}
                      className="w-full h-full object-contain"
                      loading="lazy"
                    />
                  </div>
                  <h3 className="font-display text-base font-bold text-[#122554] mb-1">{mentorTeaser[currentMentorSlide].name}</h3>
                  <p className="text-xs text-[#000000] mb-3 min-h-[44px] leading-relaxed">{mentorTeaser[currentMentorSlide].highlight}</p>
                </>
              )}

              <div className="flex justify-between items-center w-full mt-2 border-t border-[#122554] pt-2">
                <button onClick={prevMentor} className="p-1.5 border-2 border-[#122554] bg-white text-[#122554] cursor-pointer hover:bg-[#ffcd6b] hover:text-[#122554] transition-colors"><ChevronLeft className="h-4 w-4" /></button>
                <div className="flex gap-1.5">
                  {mentorTeaser.map((_, i) => (
                    <div key={i} className={`h-2 w-2 rounded-full ${i === currentMentorSlide ? 'bg-[#122554]' : 'border border-[#122554]'}`} />
                  ))}
                </div>
                <button onClick={nextMentor} className="p-1.5 border-2 border-[#122554] bg-white text-[#122554] cursor-pointer hover:bg-[#ffcd6b] hover:text-[#122554] transition-colors"><ChevronRight className="h-4 w-4" /></button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Activity Carousel */}
      <section className="border-t-2 border-[#122554] overflow-hidden bg-[#ffffff]">
        <div className="mx-auto max-w-6xl px-5 py-10">
          <h2 className="text-3xl font-bold text-[#122554]">Hình ảnh hoạt động thực tế</h2>
        </div>
        <div className="relative w-full overflow-hidden select-none pb-12">
          <div className="flex gap-4 animate-marquee py-2">
            {[
              "/images/activities/activity1.jpg",
              "/images/activities/activity2.jpg",
              "/images/activities/activity3.jpg",
              "/images/activities/activity4.jpg",
              "/images/activities/activity5.jpg",
              "/images/activities/activity6.jpg",
              "/images/activities/activity1.jpg",
              "/images/activities/activity2.jpg",
              "/images/activities/activity3.jpg",
              "/images/activities/activity4.jpg",
              "/images/activities/activity5.jpg",
              "/images/activities/activity6.jpg",
            ].map((src, index) => (
              <div
                key={index}
                className="relative h-48 w-72 md:h-64 md:w-96 shrink-0 rounded-none border-2 border-[#122554] overflow-hidden bg-white shadow-none"
              >
                <img
                  src={src}
                  alt={`Hoạt động học sinh UniVenture ${index + 1}`}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="text-[#122554] border-t-2 border-[#122554] relative overflow-hidden">
        {/* Background Art */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none flex items-center justify-center">
          <img src="/icons-effect-art/background 3.PNG" alt="" className="w-full h-full object-cover object-center" />
        </div>
        {/* Decorative Star */}
        <img src="/icons-effect-art/star small blue.svg" alt="" className="absolute top-4 right-4 md:top-8 md:right-8 w-5 h-5 md:w-8 md:h-8 animate-rock pointer-events-none z-10" />
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-center gap-6 px-5 py-16 lg:flex-row lg:items-center relative z-10 text-center lg:text-left">
          <div className="lg:pr-10">
            <h2 className="text-3xl font-bold sm:text-4xl text-[#122554]">Bắt đầu hành trình của em</h2>
            <p className="mt-3 max-w-xl text-lg text-[#122554] mx-auto lg:mx-0">
              Một buổi tư vấn 1-1 để hiểu điểm mạnh, định hướng và lộ trình phù hợp nhất.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
            <Link
              to="/lien-he"
              className="btn-interactive btn-interactive-primary px-7 py-3.5 text-base whitespace-nowrap"
            >
              Đăng ký tư vấn
              <ArrowRight className="h-5 w-5" />
            </Link>
            <a
              href="/UniVenture-Booklet-2026.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-interactive btn-interactive-accent px-7 py-3.5 text-base font-bold whitespace-nowrap"
            >
              Tải Booklet 2026
              <FileText className="h-5 w-5" />
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
