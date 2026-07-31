import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Compass, Rocket, Microscope, Users, GraduationCap } from "lucide-react";
import heroImage from "@/assets/hero-students.jpg";

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

function Index() {
  return (
    <>
      {/* Hero */}
      <section className="bg-ink text-ink-foreground">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:py-24">
          <div>
            <p className="eyebrow text-accent">College Admissions Built on Action</p>
            <h1 className="mt-5 text-4xl leading-[1.08] font-bold sm:text-5xl lg:text-6xl">
              Hồ sơ mạnh không được tô vẽ.
              <br />
              Nó được <span className="text-accent">sống thật</span>.
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-ink-muted sm:text-lg">
              UniVenture là hệ sinh thái giáo dục đồng hành cùng học sinh trên hành trình bước vào
              đại học quốc tế bằng trải nghiệm thực tiễn: dự án, startup, nghiên cứu và tác động xã
              hội.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                to="/lien-he"
                className="inline-flex items-center gap-2 rounded-sm bg-accent px-6 py-3 text-sm font-medium text-accent-foreground transition-transform hover:-translate-y-0.5"
              >
                Đặt lịch tư vấn 1-1
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/chuong-trinh"
                className="text-sm font-medium text-ink-foreground underline decoration-accent decoration-2 underline-offset-4"
              >
                Xem các chương trình
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-3 -z-0 rounded-sm border border-accent/40" aria-hidden />
            <img
              src={heroImage}
              alt="Học sinh UniVenture cùng mentor trình bày dự án tại bàn làm việc"
              width={1600}
              height={1104}
              className="relative w-full rounded-sm object-cover shadow-2xl"
            />
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-b border-border bg-secondary">
        <dl className="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-5 py-10 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label}>
              <dt className="font-display text-3xl font-bold text-primary sm:text-4xl">{s.value}</dt>
              <dd className="mt-1 text-sm text-muted-foreground">{s.label}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Philosophy */}
      <section className="mx-auto max-w-6xl px-5 py-16 lg:py-24">
        <div className="max-w-3xl">
          <p className="eyebrow text-muted-foreground">Learn by doing</p>
          <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
            Thay vì chỉ hướng tới lá thư trúng tuyển
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
            Chúng tôi giúp học sinh khám phá bản thân, xây dựng dự án, khởi tạo startup, tham gia
            nghiên cứu và tạo ra tác động xã hội. Bởi giá trị của một bộ hồ sơ không nằm ở số lượng
            hoạt động ngoại khóa, mà nằm ở câu chuyện trưởng thành phía sau mỗi hành trình.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {pillars.map((p) => (
            <div
              key={p.title}
              className="rounded-sm border border-border bg-card p-7 transition-colors hover:border-primary/40"
            >
              <p.icon className="h-6 w-6 text-primary" />
              <h3 className="mt-4 text-lg font-semibold">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Accessibility band */}
      <section className="bg-primary text-primary-foreground">
        <div className="mx-auto grid max-w-6xl gap-8 px-5 py-16 lg:grid-cols-[0.9fr_1.1fr] lg:py-20">
          <div>
            <p className="eyebrow text-accent">Accessibility</p>
            <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
              Giáo dục chất lượng cho nhiều học sinh hơn
            </h2>
          </div>
          <div className="space-y-4 text-base leading-relaxed text-primary-foreground/85">
            <p>
              UniVenture cam kết mở rộng cơ hội tiếp cận giáo dục thông qua khóa học trực tuyến với
              chi phí hợp lý, chương trình học bổng và hoạt động cố vấn miễn phí.
            </p>
            <p>
              Mạng lưới gia sư xuất sắc của chúng tôi hỗ trợ học sinh các chương trình chuẩn quốc tế
              như A Level và IGCSE ở các môn Tiếng Anh, Toán và Khoa học — để hành trình apply được
              đứng trên một nền tảng học thuật vững chắc.
            </p>
            <Link
              to="/chuong-trinh"
              className="inline-flex items-center gap-2 pt-2 text-sm font-medium text-accent"
            >
              Tìm hiểu mảng gia sư & khóa học
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Mentors teaser */}
      <section className="mx-auto max-w-6xl px-5 py-16 lg:py-24">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-2xl">
            <p className="eyebrow text-muted-foreground">Our mentors</p>
            <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
              Người đi trước đã làm được điều em đang hướng tới
            </h2>
          </div>
          <Link
            to="/mentors"
            className="inline-flex items-center gap-2 text-sm font-medium text-primary"
          >
            Gặp đội ngũ mentor
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {[
            {
              name: "Mentor Uyển Như",
              focus: "Giáo dục & Chính sách xã hội · UK/US",
              highlight: "LSE, UCL, Manchester, Bristol · 7,2 tỷ VNĐ học bổng DePauw",
            },
            {
              name: "Mentor Bảo Linh",
              focus: "Y khoa & Khoa học sức khỏe",
              highlight: "Học bổng 100% MD tại VinUniversity · Co-Founder MedMate",
            },
            {
              name: "Mentor Bảo Minh",
              focus: "Kinh doanh & Khởi nghiệp",
              highlight: "Học bổng 90% VinUni · Quán quân GIC Startup Competition",
            },
          ].map((m) => (
            <div key={m.name} className="rounded-sm border border-border bg-card p-7">
              <GraduationCap className="h-6 w-6 text-accent-foreground" />
              <h3 className="mt-4 font-display text-lg font-bold text-primary">{m.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{m.focus}</p>
              <p className="mt-4 border-t border-border pt-4 text-sm leading-relaxed">
                {m.highlight}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-accent text-accent-foreground">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-5 py-14 lg:flex-row lg:items-center">
          <div>
            <h2 className="text-3xl font-bold sm:text-4xl">Bắt đầu hành trình của em</h2>
            <p className="mt-2 max-w-xl text-base text-accent-foreground/80">
              Một buổi tư vấn 1-1 để hiểu điểm mạnh, định hướng và lộ trình phù hợp nhất.
            </p>
          </div>
          <Link
            to="/lien-he"
            className="inline-flex items-center gap-2 rounded-sm bg-primary px-6 py-3 text-sm font-medium text-primary-foreground"
          >
            Đăng ký tư vấn
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
