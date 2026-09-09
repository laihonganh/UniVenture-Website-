import { Link, useLocation } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import { Menu, ArrowRight, ChevronDown } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetHeader, SheetClose } from "@/components/ui/sheet";

const nav = [
  { to: "/", label: "Trang chủ" },
  { to: "/ve-chung-toi", label: "Về chúng tôi" },
  { to: "/chuong-trinh", label: "Chương trình" },
  {
    label: "Khám phá",
    children: [
      { to: "/mentors", label: "Mentors" },
      { to: "/gia-su", label: "Tìm gia sư" },
      { to: "/ket-qua", label: "Thành tích" },
      { to: "/thu-vien", label: "Thư viện" },
    ],
  },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(true);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown on route change
  useEffect(() => {
    setDropdownOpen(false);
    setOpen(false);
  }, [location.pathname]);

  const handleMouseEnter = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setDropdownOpen(false);
    }, 150);
  };

  const isDropdownActive = ["/mentors", "/gia-su", "/ket-qua", "/thu-vien"].includes(location.pathname);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b-2 border-[#122554] bg-white shadow-md"
          : "border-b-2 border-[#122554] bg-white shadow-sm"
      }`}
    >
      <div className="mx-auto flex items-center justify-between px-4 sm:px-6 h-16 md:h-[4.5rem] max-w-6xl">
        {/* Logo */}
        <Link to="/" className="flex items-center shrink-0" onClick={() => setOpen(false)}>
          <img
            src="/logo.svg"
            alt="UniVenture"
            className="h-12 sm:h-13 md:h-14 w-auto object-contain transition-all"
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center justify-center relative">
          <div className="nav-pill flex items-center gap-1.5 px-3 py-1.5 rounded-full flex-nowrap border-2 border-[#122554] bg-white">
            {nav.map((item) =>
              "children" in item ? (
                /* Dropdown */
                <div
                  key={item.label}
                  className="relative"
                  ref={dropdownRef}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <button
                    type="button"
                    onClick={() => setDropdownOpen((v) => !v)}
                    className={`relative z-10 px-4 py-2 text-sm font-medium transition-colors rounded-full whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
                      isDropdownActive || dropdownOpen
                        ? "bg-[#122554] text-white"
                        : "text-[#122554] hover:bg-[#122554] hover:text-white"
                    }`}
                  >
                    <span>{item.label}</span>
                    <ChevronDown
                      className={`h-4 w-4 transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`}
                    />
                  </button>

                  {dropdownOpen && (
                    <div className="absolute top-full left-0 pt-2 w-52 z-50 animate-in fade-in-50 zoom-in-95 duration-150">
                      <div className="bg-white border-2 border-[#122554] shadow-2xl rounded-none p-1">
                        {item.children.map((child) => (
                          <Link
                            key={child.to}
                            to={child.to}
                            onClick={() => setDropdownOpen(false)}
                            className={`block px-4 py-2.5 text-sm font-medium transition-colors rounded-none ${
                              location.pathname === child.to
                                ? "!bg-[#122554] !text-white font-semibold"
                                : "text-[#122554] bg-white hover:!bg-[#122554] hover:!text-white"
                            }`}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.to}
                  to={item.to}
                  activeOptions={{ exact: item.to === "/" }}
                  className="relative z-10 px-4 py-2 text-sm font-medium transition-colors rounded-full whitespace-nowrap text-[#122554] hover:bg-[#122554] hover:text-white"
                  activeProps={{ className: "!bg-[#122554] !text-white rounded-full" }}
                >
                  {item.label}
                </Link>
              )
            )}
          </div>
        </nav>

        {/* CTA */}
        <div className="hidden md:flex justify-end shrink-0">
          <Link
            to="/lien-he"
            className="btn-interactive btn-interactive-primary whitespace-nowrap text-sm"
          >
            Đặt lịch tư vấn
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Mobile Nav Button */}
        <div className="md:hidden flex items-center gap-3">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <button
                type="button"
                aria-label="Mở menu"
                className="p-2 text-[#122554] border-2 border-[#122554] hover:bg-[#122554] hover:text-white transition-colors focus:outline-none"
              >
                <Menu className="h-6 w-6" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="mobile-sheet-content w-[320px] p-6 flex flex-col justify-between">
              <div>
                <SheetHeader className="text-left pb-4 mb-4 border-b-2 border-[#122554]">
                  <div className="flex items-center justify-between">
                    <SheetTitle className="font-display text-lg font-bold tracking-tight text-primary">
                      <img src="/logo.svg" alt="UniVenture" className="h-10 w-auto" />
                    </SheetTitle>
                    <SheetClose className="text-[#122554] hover:text-primary text-xl font-bold p-1">✕</SheetClose>
                  </div>
                </SheetHeader>

                <nav className="flex flex-col gap-1">
                  {nav.map((item) =>
                    "children" in item ? (
                      <div key={item.label} className="border-b border-[#122554]/10 pb-2">
                        <button
                          type="button"
                          onClick={() => setMobileDropdownOpen((v) => !v)}
                          className="w-full flex items-center justify-between py-3 text-base text-[#122554] hover:text-[#ffcd6b] font-medium transition-colors"
                        >
                          <span>{item.label}</span>
                          <ChevronDown
                            className={`h-4 w-4 transition-transform duration-200 ${mobileDropdownOpen ? "rotate-180" : ""}`}
                          />
                        </button>
                        {mobileDropdownOpen && (
                          <div className="pl-4 flex flex-col gap-1 border-l-2 border-[#122554] ml-2 mb-2">
                            {item.children.map((child) => (
                              <Link
                                key={child.to}
                                to={child.to}
                                onClick={() => setOpen(false)}
                                className={`py-2 text-sm text-[#122554] transition-colors ${
                                  location.pathname === child.to
                                    ? "font-semibold text-primary underline"
                                    : "hover:text-[#ffcd6b]"
                                }`}
                              >
                                {child.label}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    ) : (
                      <Link
                        key={item.to}
                        to={item.to}
                        onClick={() => setOpen(false)}
                        className={`py-3 text-base text-[#122554] font-medium transition-colors border-b border-[#122554]/10 ${
                          location.pathname === item.to ? "font-semibold text-primary underline" : "hover:text-[#ffcd6b]"
                        }`}
                      >
                        {item.label}
                      </Link>
                    )
                  )}
                </nav>
              </div>

              <div className="pt-6">
                <Link
                  to="/lien-he"
                  onClick={() => setOpen(false)}
                  className="btn-interactive btn-interactive-primary w-full py-3.5 text-center text-sm"
                >
                  Đặt lịch tư vấn
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
