import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

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
    vi: "Học bằng hành động",
    body: "Trải nghiệm thực tế luôn là người thầy tốt nhất. Mọi chương trình tại UniVenture đều được thiết kế theo triết lý Project-Based Learning, nơi học sinh học bằng cách tạo ra sản phẩm, dự án và giá trị thật.",
  },
  {
    no: "02",
    en: "Growth Beyond Admissions",
    vi: "Đại học là cột mốc, không phải đích đến",
    body: "Một lá thư trúng tuyển chỉ kéo dài một ngày. Nhưng tư duy, bản lĩnh và năng lực mà học sinh tích lũy trong quá trình chuẩn bị sẽ theo các em suốt cả cuộc đời.",
  },
  {
    no: "03",
    en: "Authenticity",
    vi: "Mỗi học sinh đều có một câu chuyện riêng",
    body: "UniVenture không tạo ra những bộ hồ sơ giống nhau. Chúng tôi giúp học sinh tìm ra điều khiến mình khác biệt và kể câu chuyện ấy bằng những trải nghiệm chân thực nhất.",
  },
  {
    no: "04",
    en: "Responsibility",
    vi: "Thành công luôn đi cùng trách nhiệm",
    body: "Chúng tôi mong muốn mỗi học sinh không chỉ theo đuổi thành tích cá nhân mà còn tạo ra những giá trị tích cực cho cộng đồng thông qua các dự án và sáng kiến của mình.",
  },
  {
    no: "05",
    en: "Accessibility",
    vi: "Cơ hội cần được trao cho nhiều người hơn",
    body: "Thông qua các khóa học trực tuyến, chương trình học bổng và mạng lưới cố vấn, UniVenture rút ngắn khoảng cách tiếp cận giáo dục quốc tế giữa các học sinh trên khắp Việt Nam.",
  },
];

const opportunities = [
  "Khám phá bản thân và định vị thương hiệu cá nhân.",
  "Xây dựng các dự án xã hội hoặc startup giải quyết vấn đề thực tiễn.",
  "Thực hiện nghiên cứu cùng giáo sư, nhà nghiên cứu và chuyên gia.",
  "Phát triển năng lực lãnh đạo, tư duy phản biện và kỹ năng giải quyết vấn đề.",
  "Chuẩn bị hồ sơ đại học quốc tế với chiều sâu thay vì chạy theo thành tích.",
];

function AboutPage() {
  return (
    <>
      <section className="bg-ink text-ink-foreground">
        <div className="mx-auto max-w-6xl px-5 py-16 lg:py-24">
          <p className="eyebrow text-accent">About us</p>
          <h1 className="mt-5 max-w-3xl text-4xl leading-[1.1] font-bold sm:text-5xl">
            Về UniVenture
          </h1>
          <p className="mt-6 max-w-3xl text-base leading-relaxed text-ink-muted sm:text-lg">
            UniVenture là một hệ sinh thái giáo dục hướng tới việc đồng hành cùng học sinh trên hành
            trình bước vào đại học quốc tế bằng trải nghiệm thực tiễn. Chúng tôi tin rằng một bộ hồ
            sơ mạnh không được tạo nên bởi những thành tích được "xây dựng", được "tô vẽ", mà bởi
            những trải nghiệm được sống thật.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-12 px-5 py-16 lg:grid-cols-[0.8fr_1.2fr] lg:py-24">
        <div>
          <p className="eyebrow text-muted-foreground">Our mission</p>
          <h2 className="mt-4 text-3xl font-bold sm:text-4xl">Sứ mệnh</h2>
        </div>
        <div>
          <p className="text-lg leading-relaxed">
            Tại UniVenture, chúng tôi không chỉ giúp học sinh được nhận vào một trường đại học.
            Chúng tôi đồng hành để các em trưởng thành thông qua chính hành trình chuẩn bị hồ sơ.
          </p>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            Mỗi dự án được xây dựng, mỗi nghiên cứu được thực hiện, mỗi startup được khởi tạo, mỗi
            bài luận được viết hay mỗi thất bại được trải qua đều trở thành những viên gạch hình
            thành tư duy, bản lĩnh và năng lực của người học.
          </p>

          <div className="mt-8 rounded-sm border-l-2 border-accent bg-secondary p-7">
            <p className="font-display font-semibold text-primary">
              Thông qua mô hình Project-Based Learning, UniVenture trao cho học sinh cơ hội:
            </p>
            <ul className="mt-4 space-y-3">
              {opportunities.map((o) => (
                <li key={o} className="flex gap-3 text-sm leading-relaxed">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  {o}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-secondary">
        <div className="mx-auto max-w-6xl px-5 py-16 lg:py-24">
          <p className="eyebrow text-muted-foreground">Core values</p>
          <h2 className="mt-4 text-3xl font-bold sm:text-4xl">Giá trị cốt lõi</h2>

          <div className="mt-12 space-y-px overflow-hidden rounded-sm border border-border bg-border">
            {values.map((v) => (
              <div
                key={v.no}
                className="grid gap-4 bg-card p-7 sm:grid-cols-[auto_1fr_1.4fr] sm:items-start sm:gap-8"
              >
                <span className="font-display text-2xl font-bold text-accent">{v.no}</span>
                <div>
                  <h3 className="font-display text-lg font-bold text-primary">{v.en}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{v.vi}</p>
                </div>
                <p className="text-sm leading-relaxed">{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto flex max-w-6xl flex-col items-start gap-5 px-5 py-16">
        <h2 className="text-2xl font-bold sm:text-3xl">
          Muốn biết chương trình nào phù hợp với con?
        </h2>
        <Link
          to="/lien-he"
          className="inline-flex items-center gap-2 rounded-sm bg-primary px-6 py-3 text-sm font-medium text-primary-foreground"
        >
          Đặt lịch tư vấn
          <ArrowRight className="h-4 w-4" />
        </Link>
      </section>
    </>
  );
}
