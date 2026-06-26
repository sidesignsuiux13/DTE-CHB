import { useEffect, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { useRole } from "@/lib/role-context";
import type { Role } from "@/lib/mock-data";
import {
  Activity,
  ArrowRight,
  CalendarDays,
  ChevronDown,
  ClipboardList,
  Download,
  Eye,
  FileText,
  Flag,
  Globe2,
  GraduationCap,
  HelpCircle,
  Image,
  Mail,
  MapPin,
  Menu,
  Phone,
  Play,
  Search,
  ShieldCheck,
  Users,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Department of Technical Education · Government of Maharashtra" },
      { name: "description", content: "Official portal for Department of Technical Education, Government of Maharashtra." },
    ],
  }),
  component: LandingPage,
});

const navItems = ["Home", "About Us", "Institutes", "Schemes", "Admissions", "Faculty", "Media Center", "Notices", "Dashboard"];

const updates = [
  "CHB Lecturer Management Portal 2026 | Institute principals to complete faculty requirement submission before 31 July 2026",
  "Revised technical education academic calendar and admission activity schedule published for AY 2026-27",
  "DTE Maharashtra invites online applications for polytechnic and engineering faculty onboarding workflows",
];

const heroSlides = [
  {
    eyebrow: "Building Technical Futures",
    title: <>Where Students<br />Learn<br /><span className="text-orange-500">With Technology</span></>,
    description: "Computer labs, digital classrooms and institute systems that strengthen technical education across Maharashtra.",
    primary: "Explore Institutes",
    secondary: "Open DTE Portal",
    image: "/hero/dte-event-1.png",
  },
  {
    eyebrow: "CHB Faculty Lifecycle",
    title: <>Where Skills<br />Meet<br /><span className="text-orange-500">Maharashtra's Growth</span></>,
    description: "A unified digital platform for technical institutes, CHB faculty onboarding, attendance, approvals, admissions and academic governance.",
    primary: "View Faculty Flow",
    secondary: "Login to Dashboard",
    image: "/hero/dte-event-2.png",
  },
  {
    eyebrow: "Industry Ready Learning",
    title: <>Modern Labs<br />For<br /><span className="text-orange-500">Future Engineers</span></>,
    description: "Supporting polytechnics and engineering institutes with transparent governance, faculty workflows and student-focused services.",
    primary: "Discover Programs",
    secondary: "Browse Notices",
    image: "/hero/dte-campus-1.png",
  },
];

const leaders = [
  { name: "Shri. Devendra Fadnavis", title: "Hon. Chief Minister", image: "/leaders/devendra-fadnavis.png" },
  { name: "Shri. Eknath Shinde", title: "Hon. Deputy Chief Minister", image: "/leaders/eknath-shinde.png" },
  { name: "Smt. Sunetra Ajit Pawar", title: "Hon. Minister", image: "/leaders/sunetra-pawar.png" },
  { name: "Shri. Chandrakantdada Patil", title: "Hon. Higher & Technical Education Minister", image: "/leaders/chandrakantdada-patil.png" },
  { name: "Shri. Indranil Naik", title: "Hon'ble Minister of State, Higher and Technical Education", image: "/leaders/indranil-naik.png" },
  { name: "Shri B Venugopal Reddy, IAS", title: "Hon. Addl. Chief Secretary, Higher & Technical Education", image: "/leaders/b-venugopal-reddy.png" },
];

const news = [
  { tag: "Announcement", date: "May 12, 2026", title: "Online applications open for CHB lecturer vacancies across government polytechnics", image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=420&q=80" },
  { tag: "News", date: "May 18, 2026", title: "CAP admission facilitation centres activated across all regional offices", image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=420&q=80" },
  { tag: "Update", date: "May 23, 2026", title: "New AICTE-aligned laboratories inaugurated in Chhatrapati Sambhajinagar region", image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=420&q=80" },
];

const gallery = [
  { title: "Robotics Laboratory", place: "Government Polytechnic, Pune", image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=480&q=80" },
  { title: "Engineering Workshop", place: "Nagpur Region", image: "https://images.unsplash.com/photo-1581093588401-fbb62a02f120?auto=format&fit=crop&w=480&q=80" },
  { title: "Computer Engineering Lab", place: "Mumbai Region", image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=480&q=80" },
  { title: "Faculty Induction Program", place: "Pune", image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=480&q=80" },
  { title: "Student Innovation Expo", place: "Aurangabad", image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=480&q=80" },
];

const services = [
  { icon: ClipboardList, title: "Faculty Requirements", desc: "Raise and approve CHB lecturer requirements" },
  { icon: Users, title: "Candidate Onboarding", desc: "Applications, interviews and appointment offers" },
  { icon: ShieldCheck, title: "Attendance Approval", desc: "Verify lecturer workload and class attendance" },
  { icon: FileText, title: "Bill Approval", desc: "Generate, approve and track CHB bills" },
  { icon: GraduationCap, title: "Admissions", desc: "CAP, scholarships and student facilitation" },
  { icon: HelpCircle, title: "Grievances", desc: "File and track institute-level grievances" },
];

const downloads = [
  "GRs",
  "Admission Rules",
  "AICTE Norms",
  "Citizen Charter",
  "RTI",
  "Right to Public Service Act",
  "Important Links",
  "Academic Calendar",
];

function LandingPage() {
  const navigate = useNavigate();
  const { setRole } = useRole();

  const signIn = (role: Role) => {
    setRole(role);
    navigate({ to: "/app/dashboard" });
  };

  return (
    <div className="min-h-dvh bg-white text-slate-900">
      <UtilityBar />
      <Header onLogin={() => signIn("principal")} onRegister={() => signIn("candidate")} />
      <Hero />
      <Ticker />
      <DirectorDesk />
      <main>
        <Leadership />
        <NewsSection />
        <Gallery />
        <Services onOpenPortal={() => signIn("lecturer")} />
        <Downloads />
        <PartnerLogos />
      </main>
      <Footer />
    </div>
  );
}

function UtilityBar() {
  return (
    <div className="border-b border-slate-200 bg-slate-50 text-[11px] text-slate-600">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-1.5">
        <span>महाराष्ट्र शासन | Government of Maharashtra</span>
        <div className="hidden items-center gap-4 md:flex">
          <span className="rounded-full bg-[#242083] px-2 py-0.5 text-white">EN</span>
          <span>हिंदी</span>
          <span>मराठी</span>
          <span className="inline-flex items-center gap-1"><Search className="h-3 w-3" /> Search</span>
          <span>Sitemap</span>
          <span>A-</span>
          <span>A+</span>
          <Eye className="h-3.5 w-3.5" />
        </div>
      </div>
    </div>
  );
}

function Header({ onLogin, onRegister }: { onLogin: () => void; onRegister: () => void }) {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-5">
        <div className="flex items-center gap-5">
          <div className="flex h-16 w-16 items-center justify-center border-r border-slate-200 pr-5">
            <img src="/brand/dte-logo.gif" alt="Department of Technical Education logo" className="h-14 w-14 object-contain" />
          </div>
          <div className="text-center sm:text-left">
            <p className="text-sm font-bold text-[#272484]">तांत्रिक शिक्षण विभाग</p>
            <h1 className="text-lg font-extrabold leading-tight tracking-tight text-slate-950 sm:text-xl">
              Department of Technical Education
            </h1>
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
              Government of Maharashtra
            </p>
          </div>
        </div>
        <div className="hidden items-center gap-4 md:flex">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-100 text-orange-500">
            <Flag className="h-6 w-6" />
          </div>
          <div className="flex h-12 items-center gap-2 rounded-full border border-slate-200 px-4 text-xs font-semibold text-slate-600">
            <Globe2 className="h-4 w-4 text-emerald-600" />
            Digital India
          </div>
        </div>
      </div>
      <nav className="border-t border-slate-100">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4">
          <div className="hidden items-center gap-1 lg:flex">
            {navItems.map((item, index) => (
              <button
                key={item}
                className={`flex items-center gap-1 border-b-2 px-3 py-3 text-xs font-semibold transition-colors ${
                  index === 0
                    ? "border-[#242083] text-[#242083]"
                    : "border-transparent text-slate-600 hover:border-orange-500 hover:text-slate-950"
                }`}
              >
                {item}
                {["About Us", "Institutes", "Schemes", "Admissions", "Faculty", "Notices"].includes(item) && (
                  <ChevronDown className="h-3 w-3" />
                )}
              </button>
            ))}
          </div>
          <button className="py-3 lg:hidden"><Menu className="h-5 w-5" /></button>
          <div className="flex items-center gap-2 py-2">
            <Button variant="outline" size="sm" className="h-8 border-[#242083] text-[#242083]" onClick={onLogin}>Login</Button>
            <Button size="sm" className="h-8 bg-[#242083] text-white hover:bg-[#1b186a]" onClick={onRegister}>Register</Button>
          </div>
        </div>
      </nav>
    </header>
  );
}

function Hero() {
  const [active, setActive] = useState(0);
  const slide = heroSlides[active];

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % heroSlides.length);
    }, 6500);
    return () => window.clearInterval(timer);
  }, []);

  const goTo = (index: number) => setActive((index + heroSlides.length) % heroSlides.length);

  return (
    <section className="relative min-h-[440px] overflow-hidden">
      {heroSlides.map((item, index) => (
        <div
          key={item.image}
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-700 ${index === active ? "opacity-100" : "opacity-0"}`}
          style={{ backgroundImage: `url('${item.image}')` }}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-r from-[#10184f]/95 via-[#121a51]/70 to-orange-500/25" />
      <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/35 to-transparent" />
      <button
        aria-label="Previous slide"
        className="absolute left-5 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur transition hover:bg-white/30"
        onClick={() => goTo(active - 1)}
      >
        ‹
      </button>
      <button
        aria-label="Next slide"
        className="absolute right-5 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur transition hover:bg-white/30"
        onClick={() => goTo(active + 1)}
      >
        ›
      </button>
      <div className="relative mx-auto flex min-h-[440px] max-w-6xl items-center px-4 py-20">
        <div className="max-w-2xl">
          <p className="text-[11px] font-extrabold uppercase tracking-[0.35em] text-orange-500">{slide.eyebrow}</p>
          <h2 className="mt-4 text-5xl font-extrabold leading-[0.98] tracking-tight text-white sm:text-6xl">
            {slide.title}
          </h2>
          <p className="mt-5 max-w-lg text-sm leading-6 text-white/85">
            {slide.description}
          </p>
          <div className="mt-7 flex gap-3">
            <Button className="bg-orange-500 text-white hover:bg-orange-600">{slide.primary}</Button>
            <Button variant="outline" className="border-white/50 bg-white/10 text-white hover:bg-white/20">{slide.secondary}</Button>
          </div>
          <div className="mt-8 flex gap-2">
            {heroSlides.map((item, index) => (
              <button
                key={item.eyebrow}
                aria-label={`Go to slide ${index + 1}`}
                className={`h-1.5 rounded-full transition-all ${index === active ? "w-10 bg-orange-500" : "w-4 bg-white/50 hover:bg-white/80"}`}
                onClick={() => goTo(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Ticker() {
  return (
    <div className="flex overflow-hidden bg-black text-[11px] text-white">
      <div className="flex shrink-0 items-center bg-orange-500 px-3 py-2 font-extrabold uppercase tracking-wider">Latest News</div>
      <div className="flex min-w-0 flex-1 items-center gap-10 overflow-hidden px-4 py-2">
        {updates.map((item) => (
          <span key={item} className="shrink-0 before:mr-2 before:text-orange-500 before:content-['•']">{item}</span>
        ))}
      </div>
    </div>
  );
}

function DirectorDesk() {
  return (
    <section className="bg-white py-12">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 lg:grid-cols-[260px_1fr] lg:items-center">
        <div className="text-center lg:text-left">
          <img
            src="/leaders/vinod-mohitkar.png"
            alt="Dr. Vinod Mohitkar"
            className="mx-auto h-36 w-36 rounded-full object-cover ring-4 ring-slate-100 lg:mx-0"
          />
          <p className="mt-4 text-lg font-extrabold text-slate-950">Dr. Vinod Mohitkar</p>
          <p className="mt-1 text-sm font-semibold text-[#242083]">Director, DTE</p>
        </div>
        <div className="border-l-4 border-orange-500 pl-5">
          <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-orange-500">Director&apos;s Desk</p>
          <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-slate-950">Message from Director&apos;s Desk</h2>
          <div className="mt-4 space-y-4 text-sm leading-7 text-slate-600">
            <p>
              In today&apos;s global and digital world, education, especially technical education, plays a vital role. Directorate of Technical Education offers various technical programmes and courses at Diploma, Graduate, Post-Graduate and Research level for building careers in various socio-economic sectors.
            </p>
            <p>
              The Directorate of Technical Education, Maharashtra State has been established to formulate policies, rules and guidelines in accordance with State and Central Government directives and execute them accordingly. Under the umbrella of the Directorate, there are around 1600 technical institutions spread across Maharashtra. There are six regional Technical Education Offices: Amravati, Aurangabad, Mumbai, Nagpur, Nashik and Pune.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function SectionHeading({ title, action }: { title: string; action?: string }) {
  return (
    <div className="mb-8 flex items-center justify-between">
      <h2 className="border-l-4 border-orange-500 pl-3 text-2xl font-extrabold tracking-tight text-slate-950">{title}</h2>
      {action && <a className="text-xs font-bold text-[#242083]" href="#">{action} →</a>}
    </div>
  );
}

function Leadership() {
  return (
    <section className="bg-slate-50 py-12">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeading title="Leadership" />
        <div className="grid gap-8 sm:grid-cols-3 lg:grid-cols-5">
          {leaders.map((leader) => (
            <div key={leader.name} className="text-center">
              <img src={leader.image} alt="" className="mx-auto h-24 w-24 rounded-full object-cover ring-4 ring-white" />
              <p className="mt-3 text-sm font-extrabold text-slate-950">{leader.name}</p>
              <p className="mt-1 text-xs text-slate-500">{leader.title}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function NewsSection() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-14">
      <SectionHeading title="News & Announcements" action="View All News" />
      <div className="grid gap-5 lg:grid-cols-[1.1fr_1fr]">
        <article className="relative min-h-[310px] overflow-hidden rounded-xl">
          <img src="/news/dte-digital-workflows.png" alt="" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
          <div className="absolute bottom-0 p-6 text-white">
            <span className="rounded bg-orange-500 px-2 py-1 text-[10px] font-extrabold uppercase">Featured</span>
            <h3 className="mt-3 max-w-md text-2xl font-extrabold leading-tight">DTE Maharashtra launches unified digital workflows for technical institutes</h3>
            <p className="mt-2 text-xs text-white/75">June 4, 2026 · Mumbai</p>
          </div>
        </article>
        <div className="space-y-4">
          {news.map((item) => (
            <article key={item.title} className="flex gap-4 rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
              <img src={item.image} alt="" className="h-20 w-28 rounded-lg object-cover" />
              <div>
                <p className="text-[10px] font-bold text-slate-400"><span className="text-[#242083]">{item.tag}</span> · {item.date}</p>
                <h3 className="mt-1 text-sm font-extrabold leading-snug">{item.title}</h3>
                <a href="#" className="mt-2 inline-flex text-[11px] font-bold text-[#242083]">Read More →</a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Gallery() {
  return (
    <section className="mx-auto max-w-6xl px-4 pb-14">
      <SectionHeading title="Photo & Video Gallery" action="View All Gallery" />
      <div className="mb-5 flex gap-5 text-xs font-bold">
        <span className="border-b-2 border-[#242083] pb-1 text-[#242083]">Photos</span>
        <span className="pb-1 text-slate-500">Videos</span>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {gallery.map((item) => (
          <article key={item.title}>
            <img src={item.image} alt="" className="h-36 w-full rounded-lg object-cover" />
            <h3 className="mt-3 text-sm font-extrabold leading-snug">{item.title}</h3>
            <p className="mt-1 text-xs text-orange-500">{item.place}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function Services({ onOpenPortal }: { onOpenPortal: () => void }) {
  return (
    <section className="bg-slate-50 py-14">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeading title="Our Services" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
          {services.map((service) => (
            <button key={service.title} onClick={onOpenPortal} className="rounded-lg border border-slate-200 bg-white p-5 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-md">
              <service.icon className="mx-auto h-7 w-7 text-[#242083]" />
              <h3 className="mt-4 text-sm font-extrabold">{service.title}</h3>
              <p className="mt-2 min-h-10 text-[11px] leading-5 text-slate-500">{service.desc}</p>
              <span className="mt-3 inline-flex text-[11px] font-bold text-[#242083]">Know More →</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

function Downloads() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-14">
      <SectionHeading title="Downloads & Information" />
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-8">
        {downloads.map((item, index) => (
          <a key={item} href="#" className="rounded-lg border border-slate-200 bg-white p-5 text-center shadow-sm hover:shadow-md">
            <div className={`mx-auto flex h-12 w-12 items-center justify-center rounded-xl ${
              ["bg-orange-100 text-orange-500", "bg-teal-100 text-teal-600", "bg-rose-100 text-rose-500", "bg-indigo-100 text-indigo-500", "bg-purple-100 text-purple-500", "bg-emerald-100 text-emerald-600", "bg-yellow-100 text-yellow-600", "bg-pink-100 text-pink-500"][index]
            }`}>
              <Download className="h-5 w-5" />
            </div>
            <h3 className="mt-4 min-h-9 text-xs font-extrabold">{item}</h3>
            <span className="mt-3 inline-flex text-[11px] font-bold text-[#242083]">View All →</span>
          </a>
        ))}
      </div>
    </section>
  );
}

function PartnerLogos() {
  const logos = ["Digital India", "india.gov.in", "data.gov.in", "Maharashtra", "MyGov"];
  return (
    <div className="border-y border-slate-100 bg-white py-8">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-10 px-4">
        {logos.map((logo) => (
          <span key={logo} className="text-sm font-extrabold text-slate-400">{logo}</span>
        ))}
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer className="bg-[#17105f] text-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 md:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
        <div>
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white p-1">
              <img src="/brand/dte-logo.gif" alt="Department of Technical Education logo" className="h-full w-full object-contain" />
            </div>
            <div>
              <p className="font-extrabold">Government of Maharashtra</p>
              <p className="text-xs text-white/65">Department of Technical Education</p>
            </div>
          </div>
          <p className="mt-5 max-w-xs text-sm leading-6 text-white/65">
            Empowering Maharashtra through accessible, industry-aligned technical education and transparent institute governance.
          </p>
          <div className="mt-5 flex gap-3">
            {[Activity, Image, Play, Globe2, Mail].map((Icon, index) => (
              <span key={index} className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 text-white/70">
                <Icon className="h-4 w-4" />
              </span>
            ))}
          </div>
        </div>
        <FooterList title="Quick Links" items={["Home", "Schemes", "Institutes", "Admissions", "Faculty", "CHB Portal", "Media", "Contact Us"]} />
        <FooterList title="Information" items={["Downloads", "RTI", "Citizen Charter", "Tenders", "FAQs", "Contact Us"]} />
        <div>
          <h3 className="border-l-3 border-orange-500 pl-3 text-sm font-extrabold">Contact Us</h3>
          <div className="mt-5 space-y-4 text-sm text-white/70">
            <p className="flex gap-3"><MapPin className="h-4 w-4 shrink-0 text-orange-400" /> Directorate of Technical Education, 3 Mahapalika Marg, Mumbai - 400001</p>
            <p className="flex gap-3"><Phone className="h-4 w-4 shrink-0 text-orange-400" /> +91 20 2553 3333</p>
            <p className="flex gap-3"><Mail className="h-4 w-4 shrink-0 text-orange-400" /> info@dtemaharashtra.gov.in</p>
            <p className="flex gap-3"><CalendarDays className="h-4 w-4 shrink-0 text-orange-400" /> Mon - Fri, 10:00 AM - 6:00 PM</p>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-5 text-[11px] text-white/55">
          <span>All rights reserved © 2026</span>
          <span>Last Updated: June 26 2026</span>
          <span className="rounded-full bg-orange-500 px-3 py-1 text-white">489,140 Visitors</span>
          <span>Terms and Conditions · Privacy Policy · Disclaimer</span>
          <span>↑ Back to Top</span>
        </div>
      </div>
    </footer>
  );
}

function FooterList({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h3 className="border-l-3 border-orange-500 pl-3 text-sm font-extrabold">{title}</h3>
      <ul className="mt-5 space-y-3 text-sm text-white/65">
        {items.map((item) => <li key={item}>· {item}</li>)}
      </ul>
    </div>
  );
}
