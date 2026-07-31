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
    schools: ["VinUniversity"],
    note: "Học bổng các chương trình đại học quốc tế tại Việt Nam, gồm học bổng 100% chương trình Y khoa (MD) và 90% Quản trị kinh doanh.",
  },
  {
    region: "Vương quốc Anh & Châu Âu",
    headline: "15 suất Russell Group",
    schools: [
      "The London School of Economics and Political Science",
      "UCL",
      "Imperial College London",
      "The University of Manchester",
      "University of Bristol",
      "University of Birmingham",
      "University of Amsterdam",
      "Utrecht University",
    ],
    note: "Bao gồm các suất trúng tuyển tại Hà Lan cùng Holland Scholarship.",
  },
  {
    region: "Mỹ",
    headline: "Hơn 30 suất học bổng",
    schools: [
      "NYU",
      "Washington and Lee University",
      "DePauw University",
      "Union College",
      "St. Olaf College",
      "Mount Holyoke College",
      "Denison University",
    ],
    note: "Nhiều gói học bổng và hỗ trợ tài chính trị giá từ 5,7 đến 7,2 tỷ VNĐ mỗi suất.",
  },
  {
    region: "Singapore",
    headline: "Hơn 5 suất học bổng",
    schools: ["National University of Singapore", "Singapore Management University"],
    note: "Các suất học bổng tại những đại học hàng đầu Châu Á.",
  },
];

function ResultsPage() {
  return (
    <>
      <section className="bg-ink text-ink-foreground">
        <div className="mx-auto max-w-6xl px-5 py-16 lg:py-24">
          <p className="eyebrow text-accent">Track record</p>
          <h1 className="mt-5 max-w-3xl text-4xl leading-[1.1] font-bold sm:text-5xl">
            Thành tích của đội ngũ mentor
          </h1>
          <p className="mt-6 max-w-2xl leading-relaxed text-ink-muted">
            Những con số dưới đây là kết quả thật mà đội ngũ mentor UniVenture đã chinh phục — nền
            tảng kinh nghiệm mà các em sẽ được kế thừa trong suốt hành trình đồng hành.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-6xl space-y-px px-5 py-16 lg:py-24">
        {regions.map((r) => (
          <section
            key={r.region}
            className="grid gap-6 border-t border-border py-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12"
          >
            <div>
              <h2 className="font-display text-2xl font-bold text-primary">{r.region}</h2>
              <p className="mt-3 inline-block underline-accent font-display text-xl font-semibold">
                {r.headline}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{r.note}</p>
            </div>
            <ul className="flex flex-wrap content-start gap-2.5">
              {r.schools.map((s) => (
                <li
                  key={s}
                  className="rounded-sm border border-border bg-card px-4 py-2.5 text-sm"
                >
                  {s}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      <section className="bg-primary text-primary-foreground">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-5 py-14 lg:flex-row lg:items-center">
          <div>
            <h2 className="text-2xl font-bold sm:text-3xl">Kết quả tiếp theo có thể là của em</h2>
            <p className="mt-2 text-primary-foreground/80">
              Bắt đầu bằng một buổi tư vấn định hướng miễn phí.
            </p>
          </div>
          <Link
            to="/lien-he"
            className="inline-flex items-center gap-2 rounded-sm bg-accent px-6 py-3 text-sm font-medium text-accent-foreground"
          >
            Đặt lịch tư vấn
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
