import { cookies } from "next/headers";
import Link from "next/link";
import Image from "next/image";
import { Check, Smartphone, Mail, MapPin, Phone, ArrowRight, Star, Youtube, Instagram, Twitter, Facebook, MessageCircle, CheckCircle2, BookOpen, Zap, FileText, Layout, Award } from "lucide-react";
import { redirect } from "next/navigation";
import HomeHeader from "@/components/HomeHeader";
import ContactForm from "@/components/ContactForm";

export default async function Home() {
  const cookieStore = await cookies();
  const authToken = cookieStore.get("auth_token");
  const isLoggedIn = !!authToken;

  return (
    <div className="min-h-screen font-sans bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100">
      {/* 1. Navbar */}
      {/* 1. Navbar */}
      <HomeHeader isLoggedIn={isLoggedIn} />

      {/* 2. Hero Section */}
      <section className="pt-16 pb-12 text-center px-4">
        <h1 className="text-3xl md:text-5xl font-extrabold text-blue-600 dark:text-blue-400 mb-4">
          Step Into Vidyālaya Academy – Let’s Level Up Together
        </h1>

        <p className="text-zinc-600 dark:text-zinc-300 text-xl max-w-3xl mx-auto">
          Prepare Smart. Progress Fast. Get Promoted.
        </p>
      </section>

      {/* 3. Feature Tiles */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {[
            { title: "MCQs", desc: "Practice Questions", color: "from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20", icon: CheckCircle2, link: "/quiz" },
            { title: "Study Planner", desc: "Organize Learning", color: "from-purple-50 to-violet-50 dark:from-purple-900/20 dark:to-violet-900/20", icon: Layout, link: "/planner" },
            { title: "Web Guide", desc: "Comprehensive Resources", color: "from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20", icon: BookOpen, link: "/guide" },
            { title: "Flash Cards", desc: "Quick Revision", color: "from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-900/20", icon: Zap, link: "/flashcards" },
            { title: "PDF Notes", desc: "Downloadable Content", color: "from-red-50 to-rose-50 dark:from-red-900/20 dark:to-rose-900/20", icon: FileText, link: "/notes" }
          ].map((item, idx) => (
            <Link key={idx} href={item.link} className="group cursor-pointer hover:-translate-y-2 transition-all duration-300 block">
              <div className={`relative aspect-square rounded-2xl overflow-hidden shadow-md group-hover:shadow-xl transition-all border border-zinc-100 dark:border-zinc-800 mb-3 bg-gradient-to-br ${item.color} flex flex-col items-center justify-center p-4`}>
                <div className="mb-3 p-3 bg-white/60 dark:bg-black/20 rounded-full shadow-sm group-hover:scale-110 transition-transform duration-300">
                  <item.icon className="w-8 h-8 text-zinc-700 dark:text-zinc-200" />
                </div>
                <div className="text-center">
                  <h3 className="font-bold text-zinc-800 dark:text-zinc-100 text-lg mb-1">{item.title}</h3>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-800 dark:group-hover:text-zinc-200 transition-colors">{item.desc}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 4. Join Section */}
      <section className="bg-sky-50 dark:bg-sky-900/10 py-20 mb-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-extrabold text-zinc-800 dark:text-zinc-100 mb-4 leading-tight">
            Prepare for Inspector Posts Exam 2026 with Confidence
          </h2>
          <p className="text-zinc-500 dark:text-zinc-400 text-lg mb-8 max-w-3xl mx-auto">
            Practice-rich MCQs, structured Study Planner, comprehensive Web Guide, quick-revision Flash Cards, and printable PDF Notes — everything you need to level up your preparation.
          </p>
          <Link href="/pricing" className="inline-block px-8 py-4 bg-blue-500 hover:bg-blue-600 text-white rounded-full font-bold text-lg shadow-xl shadow-blue-500/30 transition-all hover:scale-105 active:scale-95">
            Join Now
          </Link>
          <div className="w-24 h-1 bg-blue-500 mx-auto mt-12 rounded-full"></div>
        </div>
      </section>

      {/* 5. Why Choose Us */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-zinc-800 dark:text-zinc-100 uppercase tracking-tight">
            Why Choose Vidyālaya Academy
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            {[
              "Reliable and Trusted Platform for Departmental Exam Preparation",
              "Expert-curated content designed by experienced Postal professionals",
              "Well-structured Study Planner to organize your daily learning",
              "Comprehensive Web Guide covering all important rules, acts, and procedures",
              "MCQs, Flash Cards, and Topic-wise Revision for smart practice",
              "Regular updates to study materials and PDF Notes",
              "Mock Tests for self-evaluation and progress tracking",
              "Study anytime, anywhere through the website or app"
            ].map((item, idx) => (
              <div key={idx} className="flex items-start gap-4">
                <div className="mt-1 shrink-0">
                  <Check className="w-6 h-6 text-zinc-800 dark:text-zinc-200 storke-[3]" />
                </div>
                <p className="text-lg text-zinc-600 dark:text-zinc-300 font-medium leading-relaxed">
                  {item}
                </p>
              </div>
            ))}
          </div>

          <div className="bg-purple-100 dark:bg-purple-900/30 rounded-3xl p-8 md:p-12 relative overflow-hidden flex flex-col items-center text-center">
            <div className="z-10">
              <h3 className="text-3xl font-extrabold text-purple-900 dark:text-purple-100 mb-2">DOWNLOAD</h3>
              <p className="text-xl font-semibold text-zinc-700 dark:text-zinc-300 mb-8">Study Planner App</p>

              {/* QR Code Placeholder */}
              <div className="bg-white p-4 rounded-xl shadow-lg mb-6 mx-auto w-48 h-48 flex items-center justify-center border-2 border-zinc-900">
                <Smartphone className="w-24 h-24 text-zinc-800" />
              </div>

              <p className="text-sm font-bold text-zinc-500 mb-4">www.studyplanner.in</p>

              <div className="bg-black text-white px-6 py-2 rounded-lg flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity mx-auto w-fit">
                <div className="w-6 h-6 relative">
                  {/* Play Store generic icon */}
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full"><path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.92 20.16,13.19L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" /></svg>
                </div>
                <div className="text-left">
                  <p className="text-[10px] uppercase font-medium">Get it on</p>
                  <p className="text-sm font-bold">Google Play</p>
                </div>
              </div>
            </div>
            {/* Decorative Hand/Phone */}
            <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-purple-200 dark:bg-purple-800 rounded-full blur-3xl opacity-50"></div>
          </div>
        </div>
      </section>

      {/* 6. Contact Us */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="text-center lg:text-left">
            <h2 className="text-5xl font-extrabold text-zinc-800 dark:text-zinc-100 mb-4">Contact-Us</h2>
            <p className="text-zinc-500 dark:text-zinc-400 text-lg mb-12">
              Send your queries and doubts to us. We will reply you soon.
            </p>

            {/* Illustration Placeholder */}
            <div className="relative w-full max-w-md mx-auto lg:mx-0 aspect-[4/3] bg-gradient-to-b from-yellow-50 to-white dark:from-yellow-900/10 dark:to-zinc-950 rounded-full/50 flex items-center justify-center">
              {/* Simple CSS Art Lamp */}
              <div className="absolute left-10 top-20 w-0 h-0 border-l-[30px] border-l-transparent border-r-[30px] border-r-transparent border-b-[50px] border-b-purple-600"></div>
              <div className="absolute left-[68px] top-[130px] w-1 h-32 bg-zinc-400"></div>
              {/* Cone of light */}
              <div className="absolute left-[-20px] top-[70px] w-[140px] h-[200px] bg-yellow-400/20 blur-xl rounded-full skew-x-12"></div>

              {/* Person */}
              <div className="relative z-10 flex flex-col items-center mt-20">
                <div className="w-20 h-20 bg-pink-500 rounded-full mb-2"></div>
                <div className="w-32 h-16 bg-blue-600 rounded-t-full"></div>
                <div className="w-48 h-32 bg-zinc-400 rounded-lg -mt-4 border-b-4 border-zinc-600 flex items-center justify-center">
                  <div className="w-8 h-8 rounded-full bg-white/50"></div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-zinc-900 p-8 rounded-2xl shadow-xl border border-zinc-100 dark:border-zinc-800">
            <ContactForm />
          </div>
        </div>
      </section>

      {/* 7. Footer */}
      <footer className="bg-blue-500 text-white pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 md:col-span-1">
              <h3 className="text-2xl font-bold mb-4">Get in touch</h3>
              <p className="text-blue-100 text-sm leading-relaxed mb-6">
                We love to hear from you. Our friendly team is always here to chat.
              </p>
              <div className="flex gap-4">
                <Link href="#" className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"><Facebook className="w-5 h-5" /></Link>
                <Link href="#" className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"><Instagram className="w-5 h-5" /></Link>
                <Link href="#" className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"><Twitter className="w-5 h-5" /></Link>
                <Link href="#" className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"><Youtube className="w-5 h-5" /></Link>
              </div>
            </div>

            <div className="md:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
              <div className="space-y-2">
                <div className="flex gap-3">
                  <Mail className="w-5 h-5 text-blue-200 shrink-0" />
                  <div>
                    <h4 className="font-bold mb-1">Chat to us</h4>
                    <p className="text-blue-100 mb-1">Our friendly team is here to help.</p>
                    <a href="mailto:info@studyplanner.in" className="font-bold hover:underline">info@studyplanner.in</a>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex gap-3">
                  <MapPin className="w-5 h-5 text-blue-200 shrink-0" />
                  <div>
                    <h4 className="font-bold mb-1">Office</h4>
                    <p className="text-blue-100">
                      Vidyālaya Academy<br />
                      Near Delhi GPO<br />
                      Delhi - 110 006
                    </p>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex gap-3">
                  <Phone className="w-5 h-5 text-blue-200 shrink-0" />
                  <div>
                    <h4 className="font-bold mb-1">Phone</h4>
                    <p className="text-blue-100 mb-1">Mon - Sat from 10am to 6pm</p>
                    <p className="font-bold">+91 8000661414</p>
                    <p className="font-bold">+91 8209243859</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-blue-400/50 pt-8 flex flex-col md:flex-row justify-center gap-6 text-sm font-medium text-blue-100">
            <Link href="#" className="hover:text-white transition-colors">About Us</Link>
            <Link href="#" className="hover:text-white transition-colors">Contact Us</Link>
            <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-white transition-colors">Term and Conditions</Link>
            <Link href="#" className="hover:text-white transition-colors">Cancellation and Refund</Link>
            <Link href="#" className="hover:text-white transition-colors">Shipping Policy</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
