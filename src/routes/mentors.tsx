import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Award, Briefcase, School } from "lucide-react";

export const Route = createFileRoute("/mentors")({
  head: () => ({
    meta: [
      { title: "Đội ngũ Mentor — UniVenture" },
      {
        name: "description",
        content:
          "Mentor Uyển Như (LSE, UCL), Mentor Bảo Linh (học bổng 100% MD VinUni) và Mentor Bảo Minh (quán quân GIC Startup Competition) — những người đi trước đồng hành cùng học sinh.",
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

const mentors = [
  {
    name: "Mentor Uyển Như",
    role: "Giáo dục, Chính sách xã hội & Kinh tế · UK / US",
    academics: [
      "Top 1% International Linguistic Olympiad (IOL) Vietnam 2025",
      "Huy chương Đồng International Economics Olympiad (IEO)",
      "A Level: A*A*A*A*",
      "Hơn 20+ giải thưởng nghiên cứu và khởi nghiệp quốc gia, quốc tế",
    ],
    leadership: [
      "GreenerFuture Vietnam (Head Intern): dẫn dắt đội ngũ 11+ thực tập sinh, trực tiếp quản lý dự án hợp tác trị giá ~$760,000 với PUMA.",
      "World Economic Forum – Global Shapers (Junior Curator): một trong những thành viên trung học trẻ nhất toàn cầu, Top 100 Global Shapers Innovation Prize.",
      "DECA x Vinschool (Founder): thành lập chapter DECA đầu tiên tại trường, huấn luyện học sinh về kinh doanh và khởi nghiệp.",
    ],
    admits: [
      "Top UK: LSE, UCL, University of Manchester, University of Bristol (Giáo dục & Chính sách xã hội)",
      "DePauw University — 7,2 tỷ VNĐ",
      "Mount Holyoke College — 7 tỷ VNĐ",
      "Denison University — 6,7 tỷ VNĐ",
      "St. Olaf College — Học bổng Tổng thống, 6,3 tỷ VNĐ",
      "Union College — 5,7 tỷ VNĐ · Washington and Lee University",
    ],
  },
  {
    name: "Mentor Bảo Linh",
    role: "Y khoa & Khoa học sức khỏe",
    academics: [
      "Học bổng 100% Cử nhân Y khoa (MD) tại VinUniversity",
      "Huy chương Bạc International Medical & Biology Competition (IMBC)",
      "Top 15 toàn cầu Inter Medical School Physiology Quiz (IMSPQ)",
    ],
    leadership: [
      "MedMate (Co-Founder & Product Owner): đồng sáng lập startup HealthTech tại Việt Nam, ứng dụng AI/LLMs tối ưu hóa quy trình lâm sàng cho bác sĩ.",
      "National Medical Academic Competition – NMAC (Founder): tiên phong tổ chức cuộc thi y khoa toàn quốc đầu tiên kết hợp lý thuyết và lâm sàng, thu hút hơn 20 trường đại học.",
      "Student Academic Medical Organization – SAMO (Founder): xây dựng tổ chức hỗ trợ học thuật cho sinh viên Y khoa đầu tiên tại VinUniversity, phục vụ hơn 200 sinh viên.",
    ],
    admits: ["Học bổng 100% chương trình MD, VinUniversity"],
  },
  {
    name: "Mentor Bảo Minh",
    role: "Kinh doanh, Khởi nghiệp & STEM",
    academics: [
      "Học bổng 90% Cử nhân Quản trị kinh doanh tại VinUni",
      "Quán quân SOICT Student Creative Ideas Challenge 2025",
      "Quán quân GIC Startup Competition 2024",
      "Top 10 Startup Wheel International 2025 — cuộc thi khởi nghiệp lớn nhất Đông Nam Á",
    ],
    leadership: [
      "Electroverse (Co-Founder): tiên phong cung cấp giải pháp giáo dục STEM toàn diện, thiết lập quan hệ đối tác với hơn 30 trường học và đạt mốc doanh thu 1 tỷ VNĐ.",
      "Project X Vietnam (Deputy Head of External Relations): kết nối hơn 40 đối tác công nghệ, tập đoàn lớn và mang về hơn 50 cơ hội thực tập cho học sinh, sinh viên.",
    ],
    admits: ["Học bổng 90% Quản trị kinh doanh, VinUniversity"],
  },
];

function MentorsPage() {
  return (
    <>
      <section className="bg-ink text-ink-foreground">
        <div className="mx-auto max-w-6xl px-5 py-16 lg:py-24">
          <p className="eyebrow text-accent">Meet the mentors</p>
          <h1 className="mt-5 max-w-3xl text-4xl leading-[1.1] font-bold sm:text-5xl">
            Người đã đi con đường em đang bước
          </h1>
          <p className="mt-6 max-w-2xl leading-relaxed text-ink-muted">
            Mentor của UniVenture không chỉ có hồ sơ học thuật xuất sắc — họ đã tự tay xây dự án,
            khởi tạo startup và dẫn dắt tổ chức. Đó là lý do họ hướng dẫn học sinh bằng kinh nghiệm
            thật, không phải lý thuyết.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-6xl space-y-14 px-5 py-16 lg:py-24">
        {mentors.map((m) => (
          <article key={m.name} className="rounded-sm border border-border bg-card p-7 lg:p-10">
            <div className="border-b border-border pb-6">
              <h2 className="font-display text-2xl font-bold text-primary sm:text-3xl">{m.name}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{m.role}</p>
            </div>

            <div className="mt-8 grid gap-10 lg:grid-cols-3">
              <section>
                <div className="flex items-center gap-2">
                  <Award className="h-4 w-4 text-accent-foreground" />
                  <h3 className="eyebrow">Học thuật</h3>
                </div>
                <ul className="mt-4 space-y-2.5">
                  {m.academics.map((a) => (
                    <li key={a} className="flex gap-3 text-sm leading-relaxed">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                      {a}
                    </li>
                  ))}
                </ul>
              </section>

              <section>
                <div className="flex items-center gap-2">
                  <Briefcase className="h-4 w-4 text-accent-foreground" />
                  <h3 className="eyebrow">Kinh nghiệm dẫn dắt</h3>
                </div>
                <ul className="mt-4 space-y-3">
                  {m.leadership.map((l) => (
                    <li key={l} className="text-sm leading-relaxed text-muted-foreground">
                      {l}
                    </li>
                  ))}
                </ul>
              </section>

              <section>
                <div className="flex items-center gap-2">
                  <School className="h-4 w-4 text-accent-foreground" />
                  <h3 className="eyebrow">Trúng tuyển & học bổng</h3>
                </div>
                <ul className="mt-4 space-y-2.5">
                  {m.admits.map((a) => (
                    <li key={a} className="text-sm leading-relaxed">
                      {a}
                    </li>
                  ))}
                </ul>
              </section>
            </div>
          </article>
        ))}
      </div>

      <section className="bg-accent text-accent-foreground">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-5 py-14 lg:flex-row lg:items-center">
          <h2 className="text-2xl font-bold sm:text-3xl">
            Ghép mentor phù hợp với ngành học của em
          </h2>
          <Link
            to="/lien-he"
            className="inline-flex items-center gap-2 rounded-sm bg-primary px-6 py-3 text-sm font-medium text-primary-foreground"
          >
            Đặt lịch tư vấn
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
