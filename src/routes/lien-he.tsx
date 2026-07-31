import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, Instagram, MapPin, Send } from "lucide-react";

export const Route = createFileRoute("/lien-he")({
  head: () => ({
    meta: [
      { title: "Đặt lịch tư vấn 1-1 — UniVenture" },
      {
        name: "description",
        content:
          "Đăng ký buổi tư vấn định hướng cùng mentor UniVenture: hiểu điểm mạnh của con, lộ trình hồ sơ và chương trình phù hợp.",
      },
      { property: "og:title", content: "Đặt lịch tư vấn 1-1 — UniVenture" },
      {
        property: "og:description",
        content: "Để lại thông tin, đội ngũ UniVenture sẽ liên hệ trong vòng 24 giờ.",
      },
    ],
  }),
  component: ContactPage,
});

const interests = [
  "Gói ĐHQT Việt Nam",
  "Gói Mentor Du học",
  "Gói Mentor HĐNK",
  "Gia sư A Level / IGCSE",
];

function ContactPage() {
  const [interest, setInterest] = useState(interests[0]);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const body = [
      `Họ và tên: ${data.get("name")}`,
      `Vai trò: ${data.get("role")}`,
      `Email: ${data.get("email")}`,
      `Số điện thoại: ${data.get("phone")}`,
      `Lớp / khối: ${data.get("grade")}`,
      `Quan tâm: ${interest}`,
      "",
      `${data.get("message")}`,
    ].join("\n");

    window.location.href = `mailto:hello@univenture.vn?subject=${encodeURIComponent(
      `[Tư vấn] ${data.get("name")} — ${interest}`,
    )}&body=${encodeURIComponent(body)}`;
  }

  return (
    <>
      <section className="bg-ink text-ink-foreground">
        <div className="mx-auto max-w-6xl px-5 py-16 lg:py-20">
          <p className="eyebrow text-accent">Let's talk</p>
          <h1 className="mt-5 max-w-3xl text-4xl leading-[1.1] font-bold sm:text-5xl">
            Đặt lịch tư vấn 1-1
          </h1>
          <p className="mt-6 max-w-2xl leading-relaxed text-ink-muted">
            Hãy để lại thông tin. Đội ngũ UniVenture sẽ liên hệ trong vòng 24 giờ để sắp xếp buổi
            trao đổi cùng mentor phù hợp nhất với định hướng của con.
          </p>
        </div>
      </section>

      <div className="mx-auto grid max-w-6xl gap-12 px-5 py-16 lg:grid-cols-[1.15fr_0.85fr] lg:py-20">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Họ và tên" name="name" required />
            <Field label="Số điện thoại" name="phone" type="tel" required />
            <Field label="Email" name="email" type="email" required />
            <Field label="Lớp / khối của con" name="grade" placeholder="VD: Lớp 11" />
          </div>

          <div>
            <label className="text-sm font-medium" htmlFor="role">
              Bạn là
            </label>
            <select
              id="role"
              name="role"
              className="mt-2 w-full rounded-sm border border-input bg-card px-4 py-2.5 text-sm outline-none focus:border-primary"
            >
              <option>Phụ huynh</option>
              <option>Học sinh</option>
              <option>Khác</option>
            </select>
          </div>

          <fieldset>
            <legend className="text-sm font-medium">Quan tâm tới</legend>
            <div className="mt-3 flex flex-wrap gap-2.5">
              {interests.map((i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setInterest(i)}
                  className={`rounded-sm border px-4 py-2 text-sm transition-colors ${
                    interest === i
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-card hover:border-primary/40"
                  }`}
                >
                  {i}
                </button>
              ))}
            </div>
          </fieldset>

          <div>
            <label className="text-sm font-medium" htmlFor="message">
              Chia sẻ thêm về định hướng của con
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              placeholder="Ngành học mong muốn, quốc gia dự định ứng tuyển, hoạt động đã tham gia..."
              className="mt-2 w-full rounded-sm border border-input bg-card px-4 py-3 text-sm outline-none focus:border-primary"
            />
          </div>

          <button
            type="submit"
            className="inline-flex items-center gap-2 rounded-sm bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-ink"
          >
            Gửi thông tin
            <Send className="h-4 w-4" />
          </button>
        </form>

        <aside className="space-y-6">
          <div className="rounded-sm border border-border bg-secondary p-7">
            <p className="eyebrow text-muted-foreground">Liên hệ trực tiếp</p>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-accent-foreground" />
                <a href="mailto:hello@univenture.vn" className="hover:text-primary">
                  hello@univenture.vn
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Instagram className="h-4 w-4 text-accent-foreground" />
                <span>@univenture.vn</span>
              </li>
              <li className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-accent-foreground" />
                <span>Hà Nội, Việt Nam</span>
              </li>
            </ul>
          </div>

          <div className="rounded-sm border-l-2 border-accent bg-card p-7">
            <p className="font-display font-semibold text-primary">
              Buổi tư vấn đầu tiên gồm những gì?
            </p>
            <ul className="mt-4 space-y-2.5 text-sm leading-relaxed text-muted-foreground">
              <li>· Đánh giá hồ sơ và định hướng hiện tại của con</li>
              <li>· Phân tích điểm mạnh, khoảng trống và thời gian còn lại</li>
              <li>· Gợi ý lộ trình dự án / nghiên cứu phù hợp</li>
              <li>· Đề xuất chương trình đồng hành và mentor tương ứng</li>
            </ul>
          </div>
        </aside>
      </div>
    </>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="text-sm font-medium" htmlFor={name}>
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="mt-2 w-full rounded-sm border border-input bg-card px-4 py-2.5 text-sm outline-none focus:border-primary"
      />
    </div>
  );
}
