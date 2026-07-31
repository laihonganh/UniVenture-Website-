import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check, Minus } from "lucide-react";

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
  return (
    <>
      <section className="bg-ink text-ink-foreground">
        <div className="mx-auto max-w-6xl px-5 py-16 lg:py-24">
          <p className="eyebrow text-accent">Our programs</p>
          <h1 className="mt-5 max-w-3xl text-4xl leading-[1.1] font-bold sm:text-5xl">
            Ba lộ trình đồng hành
          </h1>
          <p className="mt-6 max-w-2xl leading-relaxed text-ink-muted">
            Mỗi lộ trình đều bắt đầu từ một buổi tư vấn định hướng để hiểu điểm mạnh, mục tiêu và
            thời gian còn lại của học sinh — trước khi chọn gói phù hợp.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-6xl space-y-16 px-5 py-16 lg:py-24">
        {programs.map((p) => (
          <section key={p.title}>
            <p className="eyebrow text-accent-foreground/70">{p.tag}</p>
            <h2 className="mt-3 text-3xl font-bold">{p.title}</h2>
            <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">{p.desc}</p>

            <div className="mt-8 grid gap-6 md:grid-cols-2">
              {p.options.map((o) => (
                <div key={o.name} className="flex flex-col rounded-sm border border-border bg-card p-7">
                  <h3 className="font-display text-xl font-bold text-primary">{o.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{o.note}</p>
                  <ul className="mt-5 space-y-2.5 border-t border-border pt-5">
                    {o.items.map((i) => (
                      <li key={i} className="flex gap-3 text-sm">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent-foreground" />
                        {i}
                      </li>
                    ))}
                  </ul>
                  <Link
                    to="/lien-he"
                    className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-primary"
                  >
                    Nhận tư vấn gói này
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>

      <section className="border-t border-border bg-secondary">
        <div className="mx-auto max-w-6xl px-5 py-16 lg:py-20">
          <p className="eyebrow text-muted-foreground">Compare</p>
          <h2 className="mt-4 text-3xl font-bold">Gói Mentor Du học — các hạng mục</h2>
          <div className="mt-8 overflow-x-auto rounded-sm border border-border bg-card">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead>
                <tr className="bg-primary text-primary-foreground">
                  <th className="px-5 py-4 font-display font-semibold">Hạng mục</th>
                  {matrix.columns.map((c) => (
                    <th key={c} className="px-4 py-4 text-center font-display font-medium">
                      {c}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {matrix.rows.map((r) => (
                  <tr key={r.name} className="border-t border-border">
                    <th className="px-5 py-4 font-medium">{r.name}</th>
                    {r.cells.map((cell, idx) => (
                      <td key={matrix.columns[idx]} className="px-4 py-4 text-center">
                        {cell ? (
                          <Check className="mx-auto h-4 w-4 text-accent-foreground" />
                        ) : (
                          <Minus className="mx-auto h-4 w-4 text-muted-foreground/50" />
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            Học phí được xây dựng theo quốc gia ứng tuyển, số lượng trường và mức độ đồng hành. Liên
            hệ để nhận báo giá chi tiết cho từng lộ trình.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16">
        <div className="rounded-sm bg-primary p-8 text-primary-foreground lg:p-12">
          <p className="eyebrow text-accent">Tutoring & online courses</p>
          <h2 className="mt-4 text-2xl font-bold sm:text-3xl">Nền tảng học thuật vững chắc</h2>
          <p className="mt-4 max-w-3xl leading-relaxed text-primary-foreground/85">
            Mạng lưới gia sư xuất sắc của UniVenture hỗ trợ học sinh theo học các chương trình chuẩn
            quốc tế như A Level và IGCSE ở các môn Tiếng Anh, Toán và Khoa học. Bên cạnh đó là các
            khóa học trực tuyến chi phí hợp lý, chương trình học bổng và hoạt động cố vấn miễn phí.
          </p>
          <Link
            to="/lien-he"
            className="mt-6 inline-flex items-center gap-2 rounded-sm bg-accent px-5 py-2.5 text-sm font-medium text-accent-foreground"
          >
            Hỏi về lớp gia sư
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
