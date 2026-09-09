import { createFileRoute } from "@tanstack/react-router";
import { Phone, Mail, MapPin } from "lucide-react";

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
        name: "og:description",
        content: "Để lại thông tin, đội ngũ UniVenture sẽ liên hệ trong vòng 24 giờ.",
      },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <>
      {/* Hero Header */}
      <section className="bg-[#122554] text-white border-b-2 border-[#122554] relative overflow-hidden">
        {/* Decorative Stars */}
        <img
          src="/icons-effect-art/star small yellow.png"
          alt=""
          className="absolute top-6 right-6 md:top-12 md:right-12 w-6 h-6 md:w-10 md:h-10 animate-rock pointer-events-none z-10"
        />
        <img
          src="/icons-effect-art/star small while.png"
          alt=""
          className="absolute bottom-6 left-6 md:bottom-12 md:left-12 w-4 h-4 md:w-6 md:h-6 animate-rock pointer-events-none z-10"
        />
        <div className="mx-auto max-w-6xl px-5 py-14 lg:py-20 relative z-10">
          <p className="eyebrow text-[#ffcd6b]">Let's talk</p>
          <h1 className="mt-4 max-w-3xl text-4xl leading-[1.1] font-bold sm:text-5xl">
            Đặt lịch tư vấn 1-1
          </h1>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div>
              <p className="leading-relaxed text-white/90 text-base md:text-lg">
                Hãy để lại thông tin trong biểu mẫu bên dưới. Đội ngũ UniVenture sẽ liên hệ trong vòng{" "}
                <span className="highlight-yellow font-semibold">24 giờ</span> để sắp xếp buổi trao đổi định hướng cùng mentor phù hợp nhất với con.
              </p>
            </div>

            <div className="border-2 border-[#ffcd6b] p-5 bg-[#122554]">
              <div className="font-display text-[#ffcd6b] text-base font-bold uppercase tracking-wider mb-3">
                Kênh liên hệ trực tiếp
              </div>
              <ul className="space-y-2.5 text-sm leading-relaxed text-white">
                <li className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-[#ffcd6b] shrink-0" />
                  <a href="tel:0819113388" className="hover:text-[#ffcd6b] font-semibold transition-colors">
                    081-911-3388
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-[#ffcd6b] shrink-0" />
                  <a href="mailto:univenture.contact@gmail.com" className="hover:text-[#ffcd6b] font-semibold transition-colors">
                    univenture.contact@gmail.com
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin className="h-4 w-4 text-[#ffcd6b] shrink-0 mt-0.5" />
                  <span>S2.07 Vinhomes Ocean Park, huyện Gia Lâm, TP.Hà Nội</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Embedded Google Form */}
      <section className="bg-white py-12 lg:py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <div className="border-2 border-[#122554] bg-white shadow-xl overflow-hidden">
            <div className="bg-[#122554] text-white px-6 py-3 border-b-2 border-[#122554] flex items-center justify-between">
              <span className="text-xs uppercase tracking-widest text-[#ffcd6b] font-bold">
                Phiếu thông tin tư vấn
              </span>
              <span className="text-xs text-white/70">UniVenture Admissions</span>
            </div>

            <div className="w-full relative overflow-hidden bg-white">
              <iframe
                src="https://docs.google.com/forms/d/e/1FAIpQLSfTaafIE0mLeA5M1Rx2in-GyVdV6xQdD1506w53KyeCTQ5YYg/viewform?embedded=true"
                className="w-full min-h-[1600px] sm:min-h-[1800px] border-0"
                title="Phiếu đăng ký tư vấn 1-1 UniVenture"
              >
                Đang tải biểu mẫu…
              </iframe>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
