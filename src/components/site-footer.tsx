import { Link } from "@tanstack/react-router";
import { Mail, MapPin, Instagram } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="bg-ink text-ink-foreground">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div className="sm:col-span-2">
          <p className="font-display text-xl font-bold">UniVenture</p>
          <p className="mt-1 eyebrow text-accent">College Admissions Built on Action</p>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-ink-muted">
            Hệ sinh thái giáo dục đồng hành cùng học sinh Việt Nam trên hành trình vào đại học quốc
            tế bằng những trải nghiệm được sống thật.
          </p>
        </div>

        <div>
          <p className="eyebrow text-ink-muted">Khám phá</p>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li>
              <Link to="/ve-chung-toi" className="hover:text-accent">
                Về chúng tôi
              </Link>
            </li>
            <li>
              <Link to="/chuong-trinh" className="hover:text-accent">
                Chương trình
              </Link>
            </li>
            <li>
              <Link to="/mentors" className="hover:text-accent">
                Đội ngũ mentor
              </Link>
            </li>
            <li>
              <Link to="/ket-qua" className="hover:text-accent">
                Kết quả trúng tuyển
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="eyebrow text-ink-muted">Liên hệ</p>
          <ul className="mt-4 space-y-2.5 text-sm text-ink-muted">
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-accent" />
              <a href="mailto:hello@univenture.vn" className="hover:text-accent">
                hello@univenture.vn
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Instagram className="h-4 w-4 text-accent" />
              <span>@univenture.vn</span>
            </li>
            <li className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-accent" />
              <span>Hà Nội, Việt Nam</span>
            </li>
          </ul>
          <Link
            to="/lien-he"
            className="mt-5 inline-flex rounded-sm bg-accent px-4 py-2 text-sm font-medium text-accent-foreground"
          >
            Đặt lịch tư vấn
          </Link>
        </div>
      </div>
      <div className="border-t border-ink-muted/20">
        <p className="mx-auto max-w-6xl px-5 py-5 text-xs text-ink-muted">
          © {new Date().getFullYear()} UniVenture. Learn by doing.
        </p>
      </div>
    </footer>
  );
}
