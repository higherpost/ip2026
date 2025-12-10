import { cookies } from "next/headers";
import Link from "next/link";
import Image from "next/image";
import { Check, Smartphone, Mail, MapPin, Phone, Lock, Unlock, CheckCircle2, BookOpen, Zap, FileText, Layout, Newspaper, Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import HomeHeader from "@/components/HomeHeader";
import ContactForm from "@/components/ContactForm";
import { getUserByEmail } from "@/lib/db";

export default async function Home() {
  const cookieStore = await cookies();
  const authToken = cookieStore.get("auth_token");
  const userSession = cookieStore.get("user_session");

  let displayName = "Aspirant";
  let membershipLevel = "free";
  const isLoggedIn = !!authToken;

  if (isLoggedIn && userSession?.value) {
    try {
      const sessionData = JSON.parse(userSession.value);
      if (sessionData.email) {
        // Fetch fresh user data to get latest membership status
        const user = getUserByEmail(sessionData.email);
        if (user) {
          displayName = user.name;
          membershipLevel = user.membershipLevel || "free";
        } else {
          // Fallback to session data if DB fetch fails (rare)
          displayName = sessionData.name || "Aspirant";
        }
      }
    } catch (e) {
      console.error("Failed to parse user session", e);
    }
  }

  // Helper to check access
  const hasAccess = (requiredBadge: string) => {
    if (requiredBadge === "Free") return true;
    if (requiredBadge === "Silver" && (membershipLevel === "silver" || membershipLevel === "gold")) return true;
    if (requiredBadge === "Gold" && membershipLevel === "gold") return true;
    return false;
  };

  return (
    <div className="min-h-screen font-sans bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100">
      {/* 1. Navbar */}
      <HomeHeader isLoggedIn={isLoggedIn} />

      {/* 2. Hero Section */}
      <section className="pt-16 pb-12 text-center px-4">
        <h1 className="text-3xl md:text-5xl font-extrabold text-blue-600 dark:text-blue-400 mb-4 capitalize flex items-center justify-center gap-3 flex-wrap">
          <span>Welcome {displayName}</span>

          {/* Membership Badge */}
          {membershipLevel === 'gold' && (
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 text-amber-900 shadow-lg shadow-amber-500/30 animate-in zoom-in spin-in-3 cursor-default select-none border border-amber-200">
              <StarIcon className="w-4 h-4 fill-amber-700 text-amber-700" /> Gold Member
            </span>
          )}
          {membershipLevel === 'silver' && (
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm bg-gradient-to-r from-slate-200 via-zinc-300 to-slate-400 text-slate-900 shadow-lg shadow-zinc-500/20 animate-in zoom-in spin-in-3 cursor-default select-none border border-slate-300">
              <StarIcon className="w-4 h-4 fill-slate-700 text-slate-700" /> Silver Member
            </span>
          )}
        </h1>

        <p className="text-zinc-600 dark:text-zinc-300 text-xl max-w-3xl mx-auto">
          Prepare Smart. Progress Fast. Get Promoted.
        </p>
      </section>

      {/* 3. Feature Tiles */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
          {[
            { title: "MCQs", desc: "Practice Questions", color: "text-emerald-600", bg: "bg-emerald-50 dark:bg-emerald-900/20", border: "group-hover:border-emerald-500", shadow: "group-hover:shadow-emerald-500/20", icon: CheckCircle2, link: "/quiz", badge: "Silver" },
            { title: "Study Planner", desc: "Organize Learning", color: "text-violet-600", bg: "bg-violet-50 dark:bg-violet-900/20", border: "group-hover:border-violet-500", shadow: "group-hover:shadow-violet-500/20", icon: Layout, link: "/planner", badge: "Free" },
            { title: "Web Guide", desc: "Comprehensive Resources", color: "text-blue-600", bg: "bg-blue-50 dark:bg-blue-900/20", border: "group-hover:border-blue-500", shadow: "group-hover:shadow-blue-500/20", icon: BookOpen, link: "/guide", badge: "Free" },
            { title: "Flash Cards", desc: "Quick Revision", color: "text-amber-600", bg: "bg-amber-50 dark:bg-amber-900/20", border: "group-hover:border-amber-500", shadow: "group-hover:shadow-amber-500/20", icon: Zap, link: "/flashcards", badge: "Silver" },
            { title: "PDF Notes", desc: "Downloadable Content", color: "text-rose-600", bg: "bg-rose-50 dark:bg-rose-900/20", border: "group-hover:border-rose-500", shadow: "group-hover:shadow-rose-500/20", icon: FileText, link: "/notes", badge: "Gold" },
            { title: "Current Affairs", desc: "Daily News & Updates", color: "text-indigo-600", bg: "bg-indigo-50 dark:bg-indigo-900/20", border: "group-hover:border-indigo-500", shadow: "group-hover:shadow-indigo-500/20", icon: Newspaper, link: "/current-affairs", badge: "Free" },
            { title: "Postal Updates", desc: "Circulars & Orders", color: "text-pink-600", bg: "bg-pink-50 dark:bg-pink-900/20", border: "group-hover:border-pink-500", shadow: "group-hover:shadow-pink-500/20", icon: Mail, link: "/postal-updates", badge: "Free" }
          ].map((item, idx) => {
            const isUnlocked = hasAccess(item.badge);

            return (
              <Link
                key={idx}
                href={isUnlocked ? item.link : "/pricing"}
                className={`group relative block w-full aspect-[4/3] sm:aspect-square ${!isUnlocked ? 'cursor-not-allowed' : ''}`}
                onClick={(e) => { if (!isUnlocked) e.preventDefault(); /* Optionally open upgrade modal here */ }}
              >
                <div className={`relative h-full w-full rounded-2xl md:rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 border-b-4 ${item.border} transition-all duration-300 ease-out shadow-sm ${isUnlocked ? `hover:shadow-xl ${item.shadow} hover:-translate-y-1` : 'opacity-80 grayscale-[0.5]'} overflow-hidden group-hover:border-b-4`}>

                  {/* Badge & Lock Icon */}
                  <div className="absolute top-3 right-3 z-20 flex items-center gap-2">
                    {/* Lock Status */}
                    <div className={`p-1.5 rounded-full shadow-sm backdrop-blur-sm ${isUnlocked ? 'bg-green-100/80 text-green-700' : 'bg-zinc-100/80 text-zinc-500'}`}>
                      {isUnlocked ? <Unlock className="w-3 h-3" /> : <Lock className="w-3 h-3" />}
                    </div>

                    {item.badge && (
                      <span className={`px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full shadow-sm ${item.badge === 'Free' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300' :
                          item.badge === 'Silver' ? 'bg-gradient-to-r from-slate-200 to-zinc-300 text-slate-800 border border-slate-300' :
                            'bg-gradient-to-r from-amber-200 to-yellow-400 text-amber-900 dark:from-amber-700 dark:to-yellow-600 dark:text-amber-100 border border-amber-300'
                        }`}>
                        {item.badge}
                      </span>
                    )}
                  </div>

                  {/* Background decoration */}
                  <div className={`absolute top-0 right-0 w-16 h-16 md:w-24 md:h-24 ${item.bg} rounded-bl-[60px] md:rounded-bl-[100px] opacity-60 transition-transform duration-500 group-hover:scale-150`}></div>

                  {/* Content Overlay when Locked */}
                  {!isUnlocked && (
                    <div className="absolute inset-0 bg-white/10 dark:bg-black/10 backdrop-blur-[1px] z-10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="bg-zinc-900 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-xl">
                        Upgrade to Unlock
                      </span>
                    </div>
                  )}

                  <div className="relative h-full flex flex-col items-center justify-center p-3 md:p-6 text-center z-10 transition-transform duration-300">
                    <div className={`mb-2 md:mb-4 p-3 md:p-4 rounded-xl md:rounded-2xl ${item.bg} ${item.color} shadow-inner group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                      <item.icon className="w-6 h-6 md:w-8 md:h-8" strokeWidth={2} />
                    </div>

                    <h3 className="text-sm md:text-xl font-bold text-zinc-800 dark:text-zinc-100 mb-1 leading-tight group-hover:text-black dark:group-hover:text-white transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-[10px] md:text-xs font-semibold uppercase tracking-wide text-zinc-400 group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition-colors hidden sm:block">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
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
            Why Choose Dak Gyan
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
            <div className="relative w-full max-w-md mx-auto lg:mx-0 aspect-[4/3] flex items-center justify-center p-6">
              <div className="relative w-full h-full">
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-purple-500/20 rounded-3xl blur-3xl -z-10 animate-pulse"></div>
                <Image
                  src="/contact-illustration.png"
                  alt="Contact Us Illustration"
                  fill
                  className="object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-500"
                />
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
                      Dak Gyan<br />
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

function StarIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}
