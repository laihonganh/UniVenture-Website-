import { Link } from "@tanstack/react-router";
import { Mail, Phone, MapPin, ArrowRight, FileText } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="bg-[#122554] text-white py-12 md:py-16 border-t-2 border-[#122554]">
      <div className="mx-auto w-full max-w-7xl px-5 flex flex-col gap-10">

        {/* Middle Navigation Columns */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest mb-4 border-b-2 border-[#ffcd6b] pb-2 text-[#ffcd6b]">
              Về chúng tôi
            </h4>
            <ul className="space-y-3 text-sm text-white/90 font-medium">
              <li>
                <Link to="/ve-chung-toi" className="hover:text-[#ffcd6b] transition-colors">
                  Sứ mệnh
                </Link>
              </li>
              <li>
                <Link to="/ve-chung-toi" className="hover:text-[#ffcd6b] transition-colors">
                  Giá trị cốt lõi
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest mb-4 border-b-2 border-[#ffcd6b] pb-2 text-[#ffcd6b]">
              Chương trình
            </h4>
            <ul className="space-y-3 text-sm text-white/90 font-medium">
              <li>
                <Link to="/chuong-trinh" className="hover:text-[#ffcd6b] transition-colors">
                  Gói ĐHQT Việt Nam
                </Link>
              </li>
              <li>
                <Link to="/chuong-trinh" className="hover:text-[#ffcd6b] transition-colors">
                  Gói Mentor Du học
                </Link>
              </li>
              <li>
                <Link to="/chuong-trinh" className="hover:text-[#ffcd6b] transition-colors">
                  Gói Mentor HĐNK
                </Link>
              </li>
              <li>
                <Link to="/gia-su" className="hover:text-[#ffcd6b] transition-colors">
                  Gia sư 1-1 Quốc tế
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest mb-4 border-b-2 border-[#ffcd6b] pb-2 text-[#ffcd6b]">
              Khám phá
            </h4>
            <ul className="space-y-3 text-sm text-white/90 font-medium">
              <li>
                <Link to="/mentors" className="hover:text-[#ffcd6b] transition-colors">
                  Mentors
                </Link>
              </li>
              <li>
                <Link to="/gia-su" className="hover:text-[#ffcd6b] transition-colors">
                  Tìm gia sư
                </Link>
              </li>
              <li>
                <Link to="/ket-qua" className="hover:text-[#ffcd6b] transition-colors">
                  Thành tích
                </Link>
              </li>
              <li>
                <Link to="/thu-vien" className="hover:text-[#ffcd6b] transition-colors">
                  Thư viện
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest mb-4 border-b-2 border-[#ffcd6b] pb-2 text-[#ffcd6b]">
              Liên hệ
            </h4>
            <ul className="space-y-3 text-sm text-white font-medium">
              <li className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 text-[#ffcd6b] shrink-0" />
                <a href="tel:0819113388" className="hover:text-[#ffcd6b] font-semibold transition-colors">
                  081-911-3388
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 text-[#ffcd6b] shrink-0" />
                <a
                  href="mailto:univenture.contact@gmail.com"
                  className="hover:text-[#ffcd6b] font-semibold transition-colors break-all"
                >
                  univenture.contact@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-2.5 leading-snug">
                <MapPin className="h-4 w-4 text-[#ffcd6b] shrink-0 mt-0.5" />
                <span className="text-white/90">S2.07 Vinhomes Ocean Park, huyện Gia Lâm, TP.Hà Nội</span>
              </li>
              <li className="pt-1 flex flex-col gap-2">
                <Link
                  to="/lien-he"
                  className="inline-flex items-center justify-center gap-2 text-xs uppercase tracking-wider font-bold bg-[#ffcd6b] text-[#122554] px-4 py-2 hover:bg-white transition-colors"
                >
                  Đặt lịch tư vấn <ArrowRight className="h-3.5 w-3.5" />
                </Link>
                <a
                  href="/UniVenture-Booklet-2026.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 text-xs uppercase tracking-wider font-bold border border-[#ffcd6b] text-[#ffcd6b] px-4 py-2 hover:bg-[#ffcd6b] hover:text-[#122554] transition-colors"
                >
                  <FileText className="h-3.5 w-3.5" /> Booklet 2026 (PDF)
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Footnote Logo (compact, max 1/4 viewport) */}
        <div className="w-full flex justify-center items-center py-4 md:py-6 border-t border-white/20">
          <img
            src="/footnote.png"
            alt="UniVenture"
            className="w-auto max-w-full max-h-[18vh] md:max-h-[22vh] object-contain select-none opacity-90 hover:opacity-100 transition-opacity"
          />
        </div>

      </div>
    </footer>
  );
}
