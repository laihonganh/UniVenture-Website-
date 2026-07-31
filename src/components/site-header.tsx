import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const nav = [
  { to: "/", label: "Trang chủ" },
  { to: "/ve-chung-toi", label: "Về chúng tôi" },
  { to: "/chuong-trinh", label: "Chương trình" },
  { to: "/mentors", label: "Mentors" },
  { to: "/ket-qua", label: "Kết quả" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <Link to="/" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
          <span className="grid h-8 w-8 place-items-center rounded-sm bg-primary font-display text-sm font-bold text-primary-foreground">
            U
          </span>
          <span className="font-display text-lg font-bold tracking-tight text-primary">
            Uni<span className="text-accent-foreground/90">Venture</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={{ exact: item.to === "/" }}
              className="text-sm text-muted-foreground transition-colors hover:text-primary"
              activeProps={{ className: "text-primary font-medium" }}
            >
              {item.label}
            </Link>
          ))}
          <Link
            to="/lien-he"
            className="rounded-sm bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-ink"
          >
            Đặt lịch tư vấn
          </Link>
        </nav>

        <button
          type="button"
          aria-label="Mở menu"
          className="md:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border bg-background md:hidden">
          <nav className="mx-auto flex max-w-6xl flex-col px-5 py-3">
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="py-2.5 text-sm text-foreground"
              >
                {item.label}
              </Link>
            ))}
            <Link
              to="/lien-he"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-sm bg-primary px-4 py-2.5 text-center text-sm font-medium text-primary-foreground"
            >
              Đặt lịch tư vấn
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
