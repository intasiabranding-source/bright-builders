import React, { useState, useRef, useEffect, useMemo } from 'react';
import { 
  Building2, 
  MapPin, 
  Phone, 
  Compass, 
  Hammer, 
  Layers, 
  Sparkles,
  Award,
  ChevronRight,
  CheckCircle,
  Home,
  User,
  Briefcase,
  FileText,
  Settings
} from 'lucide-react';
import { FadeIn } from './FadeIn';
import { AnimatedHeading } from './AnimatedHeading';
import { PremiumButton } from './PremiumButton';
import { ProcessTimeline } from './ProcessTimeline';
import { NavBar } from './NavBar';
import { ImageRevealSection } from './components/ImageReveal';
import { TextReveal } from './components/TextReveal';
import { Preloader } from './components/Preloader';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function App() {
  // Contact Form State
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  // Track loading status to reveal page items and enable scrolling
  const [isLoading, setIsLoading] = useState(true);

  // Refs for scroll sections
  const storyRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  // Scroll tracking bounded to layout span from about start to services end
  const { scrollYProgress } = useScroll({
    target: aboutRef,
    offset: ["start end", "end start"]
  });

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) return;
    setIsSubmitting(true);
    
    // Construct WhatsApp pre-filled text query
    const textMsg = `*BT BRIGHT BUILDERS - NEW INQUIRY*\n\nHello Jishnu,\n\nI would like to discuss a project. Here are my contact details:\n\n👤 *Client Name:* ${formState.name}\n✉️ *Email Address:* ${formState.email}\n\n💬 *Project Brief:*\n${formState.message}\n\n_Sent via BT Bright Builders Portfolio Website_`;
    const waUrl = `https://wa.me/917510836988?text=${encodeURIComponent(textMsg)}`;
    
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      window.open(waUrl, "_blank");
      setFormState({ name: '', email: '', message: '' });
      setTimeout(() => setIsSubmitted(false), 5000);
    }, 1000);
  };

  // Active Tab state for tubelight navbar
  const [activeTab, setActiveTab] = useState('home');

  const navLinks = useMemo(() => [
    { key: 'home', label: 'Home', ref: storyRef, icon: Home },
    { key: 'about', label: 'About', ref: aboutRef, icon: User },
    { key: 'services', label: 'Services', ref: servicesRef, icon: Settings },
    { key: 'projects', label: 'Projects', ref: projectsRef, icon: Briefcase },
    { key: 'contact', label: 'Contact', ref: contactRef, icon: FileText }
  ], []);

  const scrollInto = (ref: React.RefObject<HTMLDivElement | null>) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Scroll direction tracking for mobile navbar hiding
  const [showNav, setShowNav] = useState(true);
  
  useEffect(() => {
    let lastScrollYVal = window.scrollY;

    const handleScrollDirection = () => {
      const currentScrollY = window.scrollY;
      
      // Always show navbar on top of screen / in home section
      if (currentScrollY < window.innerHeight - 100) {
        setShowNav(true);
      } else {
        if (currentScrollY > lastScrollYVal) {
          // Scrolling down -> hide navbar
          setShowNav(false);
        } else {
          // Scrolling up -> show navbar
          setShowNav(true);
        }
      }
      lastScrollYVal = currentScrollY;
    };

    window.addEventListener("scroll", handleScrollDirection, { passive: true });
    return () => window.removeEventListener("scroll", handleScrollDirection);
  }, []);

  // ScrollSpy Intersection Observer logic to highlight active section on scroll
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -60% 0px', // Trigger when section occupies the active zone
      threshold: 0
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Find the nav link key that maps to this target element
          const matchingLink = navLinks.find(link => link.ref.current === entry.target);
          if (matchingLink) {
            setActiveTab(matchingLink.key);
          }
        }
      });
    };

    // Copy current references to local array inside effect to avoid reading directly in cleanup hook
    const targets = navLinks.map(link => link.ref.current);
    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Watch all section references
    targets.forEach(target => {
      if (target) {
        observer.observe(target);
      }
    });

    return () => {
      targets.forEach(target => {
        if (target) {
          observer.unobserve(target);
        }
      });
    };
  }, [navLinks]);

  return (
    <div className={`relative min-h-screen bg-[#FAF5F0] text-[#1A1A1A] font-sans selection:bg-[#8A78B4] selection:text-white transition-opacity duration-1000 ${
      isLoading ? 'overflow-hidden max-h-screen' : 'opacity-100'
    }`}>
      {/* Premium Fullscreen Preloader */}
      <Preloader onComplete={() => setIsLoading(false)} />
      
      {/* BACKGROUND VIDEO (Full viewport, absolutely positioned in back) */}
      <div className="absolute top-0 left-0 w-full h-screen overflow-hidden pointer-events-none z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-[0.95]"
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260403_050628_c4e32401-fab4-4a27-b7a8-6e9291cd5959.mp4"
        />
      </div>

      {/* Fullsite Scroll-triggered Line Follow Animation (Dynamic Gold Color) */}
      <div className="absolute left-1/2 -translate-x-1/2 top-[120vh] w-[1400px] h-[180vh] pointer-events-none z-[999] opacity-25 hidden lg:block overflow-visible">
        <svg
          width="1278"
          height="2319"
          viewBox="0 0 1278 2319"
          fill="none"
          overflow="visible"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          <motion.path
            d="M876.605 394.131C788.982 335.917 696.198 358.139 691.836 416.303C685.453 501.424 853.722 498.43 941.95 409.714C1016.1 335.156 1008.64 186.907 906.167 142.846C807.014 100.212 712.699 198.494 789.049 245.127C889.053 306.207 986.062 116.979 840.548 43.3233C743.932 -5.58141 678.027 57.1682 672.279 112.188C666.53 167.208 712.538 172.943 736.353 163.088C760.167 153.234 764.14 120.924 746.651 93.3868C717.461 47.4252 638.894 77.8642 601.018 116.979C568.164 150.908 557 201.079 576.467 246.924C593.342 286.664 630.24 310.55 671.68 302.614C756.114 286.446 729.747 206.546 681.86 186.442C630.54 164.898 492 209.318 495.026 287.644C496.837 334.494 518.402 366.466 582.455 367.287C680.013 368.538 771.538 299.456 898.634 292.434C1007.02 286.446 1192.67 309.384 1242.36 382.258C1266.99 418.39 1273.65 443.108 1247.75 474.477C1217.32 511.33 1149.4 511.259 1096.84 466.093C1044.29 420.928 1029.14 380.576 1033.97 324.172C1038.31 273.428 1069.55 228.986 1117.2 216.384C1152.2 207.128 1188.29 213.629 1194.45 245.127C1201.49 281.062 1132.22 280.104 1100.44 272.673C1065.32 264.464 1044.22 234.837 1032.77 201.413C1019.29 162.061 1029.71 131.126 1056.44 100.965C1086.19 67.4032 1143.96 54.5526 1175.78 86.1513C1207.02 117.17 1186.81 143.379 1156.22 166.691C1112.57 199.959 1052.57 186.238 999.784 155.164C957.312 130.164 899.171 63.7054 931.284 26.3214C952.068 2.12513 996.288 3.87363 1007.22 43.58C1018.15 83.2749 1003.56 122.644 975.969 163.376C948.377 204.107 907.272 255.122 913.558 321.045C919.727 385.734 990.968 497.068 1063.84 503.35C1111.46 507.456 1166.79 511.984 1175.68 464.527C1191.52 379.956 1101.26 334.985 1030.29 377.017C971.109 412.064 956.297 483.647 953.797 561.655C947.587 755.413 1197.56 941.828 936.039 1140.66C745.771 1285.32 321.926 950.737 134.536 1202.19C-6.68295 1391.68 -53.4837 1655.38 131.935 1760.5C478.381 1956.91 1124.19 1515 1201.28 1997.83C1273.66 2451.23 100.805 1864.7 303.794 2668.89"
            stroke="#D4AF37"
            strokeWidth="10"
            style={{
              pathLength: scrollYProgress,
              strokeDashoffset: useTransform(scrollYProgress, (value: number) => 1 - value),
            }}
          />
        </svg>
      </div>

      {/* Brand Logo header strip with transparent background */}
      <header className={`fixed top-0 left-0 w-full z-45 px-6 md:px-12 lg:px-16 py-6 pointer-events-none transition-all duration-1000 delay-300 ${
        isLoading ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
      }`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between pointer-events-auto">
          <button 
            onClick={() => {
              setActiveTab('home');
              scrollInto(storyRef);
            }}
            className="flex items-center gap-3 focus:outline-none hover:opacity-80 transition-opacity"
          >
            <img 
              src="/logo.png" 
              alt="BT Bright Builders Logo" 
              className={`h-10 w-auto object-contain transition-all duration-300 ${
                activeTab === 'home' || activeTab === 'projects' || activeTab === 'contact' 
                  ? 'brightness-0 invert' 
                  : 'brightness-0'
              }`}
            />
          </button>

          {/* Quick Contact CTA on desktop - Made highly visible with forced white overrides */}
          <div className="hidden md:block">
                  <PremiumButton onClick={() => window.open("https://wa.me/917510836988", "_blank")}>
                    Start a Chat
                  </PremiumButton>
          </div>
        </div>
      </header>

      {/* TUBELIGHT NAVBAR */}
      <NavBar 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        className={`transition-all duration-1000 delay-500 ${
          isLoading ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
        } ${showNav ? 'translate-y-0' : '-translate-y-28 md:translate-y-0'}`}
        items={navLinks.map(link => ({
          name: link.label,
          key: link.key,
          icon: link.icon,
          onClick: () => scrollInto(link.ref)
        }))}
      />

      {/* HERO / STORY SECTION */}
      <section ref={storyRef} className={`relative min-h-screen flex flex-col justify-end z-10 pt-24 pb-20 md:pb-12 transition-all duration-1000 delay-500 ${
        isLoading ? 'opacity-0 scale-[0.98]' : 'opacity-100 scale-100'
      }`}>
        <div className="px-6 md:px-12 lg:px-16 flex-1 flex flex-col justify-end">
          <div className="w-full">
            
            {/* Main Content */}
            <div className="max-w-3xl text-white-force">
              {/* Mobile Heading (exactly 4 lines: Shaping / tomorrow / with vision and / action) */}
              <div className="block md:hidden">
                <AnimatedHeading
                  text={"Shaping\ntomorrow\nwith vision and\naction."}
                  initialDelay={200}
                  charDelay={30}
                  className="text-[2.2rem] sm:text-4xl font-normal mb-4 leading-tight text-white-force"
                />
              </div>

              {/* Desktop Heading (original 2 lines) */}
              <div className="hidden md:block">
                <AnimatedHeading
                  text={"Shaping tomorrow\nwith vision and action."}
                  initialDelay={200}
                  charDelay={30}
                  className="md:text-5xl lg:text-6xl xl:text-7xl font-normal mb-4 leading-tight text-white-force"
                />
              </div>

              <FadeIn delay={800} duration={1000}>
                <p className="text-sm md:text-lg mb-6 max-w-lg leading-relaxed font-light text-white-force">
                  We back visionaries and craft ventures that define what comes next.
                </p>
              </FadeIn>

              <FadeIn delay={1200} duration={1000}>
                <div className="flex flex-wrap gap-4">
                  <PremiumButton onClick={() => window.open("https://wa.me/917510836988", "_blank")}>
                    Start a Chat
                  </PremiumButton>
                  <PremiumButton onClick={() => scrollInto(projectsRef)}>
                    Explore Now
                  </PremiumButton>
                </div>
              </FadeIn>
            </div>

          </div>
        </div>
      </section>

      {/* ABOUT PAGE */}
      <section ref={aboutRef} className="relative z-10 px-6 md:px-12 lg:px-16 py-20 md:py-28 max-w-7xl mx-auto border-t border-[#8A78B4]/10 bg-[#FAF5F0]">
        <FadeIn delay={100} duration={800}>
          <div className="border-b border-[#8A78B4]/10 pb-6 mb-12 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <span className="text-xs uppercase tracking-widest text-[#8A78B4] font-semibold font-sans block mb-2">// ESTABLISHED 2023</span>
              <h2 className="text-5xl md:text-6xl font-bold tracking-tight text-[#0A0A0A] font-display">
                BT Bright Builders
              </h2>
            </div>
            <div className="text-left md:text-right space-y-1 font-sans text-xs uppercase tracking-widest text-gray-500 font-bold">
              <p>Founder: Jishnu B T</p>
              <p>Head Office: Nilambur, Kerala</p>
            </div>
          </div>
        </FadeIn>

        {/* Philosophy & Overview Row */}
        <div className="grid lg:grid-cols-12 gap-12 items-start mb-16">
          <div className="lg:col-span-7 space-y-6">
            <FadeIn delay={200} duration={800}>
              <TextReveal
                text="Our Philosophy"
                className="text-3xl font-bold text-[#0A0A0A] font-display mb-4"
              />
              <blockquote className="border-l-4 border-[#8A78B4] pl-6 text-2xl italic text-[#1A1A1A] my-6 bg-[#8A78B4]/5 py-4 pr-4 rounded-r-lg font-display">
                "Your Home is Your Choice."
              </blockquote>
              <p className="text-[#4A4A4A] leading-relaxed font-light text-sm md:text-base">
                BT Bright Builders is a modern architecture and design firm dedicated to creating beautiful, functional, and sustainable spaces. Since our establishment in 2023, we have been committed to delivering high-quality architectural solutions tailored to the unique vision, lifestyle, and budget of every client.
              </p>
            </FadeIn>
          </div>

          {/* Quick Stats sidebar cards */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-4">
            <FadeIn delay={300} duration={800}>
              <div className="p-6 rounded-xl border border-[#8A78B4]/15 bg-white shadow-sm hover:border-[#8A78B4]/30 hover:shadow-md transition-all duration-300">
                <span className="text-4xl font-bold text-[#8A78B4] font-display">2023</span>
                <p className="text-xs uppercase tracking-wider text-gray-500 font-semibold font-sans mt-2">Established</p>
              </div>
            </FadeIn>
            <FadeIn delay={400} duration={800}>
              <div className="p-6 rounded-xl border border-[#8A78B4]/15 bg-white shadow-sm hover:border-[#8A78B4]/30 hover:shadow-md transition-all duration-300">
                <span className="text-4xl font-bold text-[#8A78B4] font-display">100%</span>
                <p className="text-xs uppercase tracking-wider text-gray-500 font-semibold font-sans mt-2">Personalized</p>
              </div>
            </FadeIn>
            <FadeIn delay={500} duration={800}>
              <div className="p-6 rounded-xl border border-[#8A78B4]/15 bg-white shadow-sm hover:border-[#8A78B4]/30 hover:shadow-md transition-all duration-300">
                <span className="text-4xl font-bold text-[#8A78B4] font-display">15+</span>
                <p className="text-xs uppercase tracking-wider text-gray-500 font-semibold font-sans mt-2">Structures Done</p>
              </div>
            </FadeIn>
            <FadeIn delay={600} duration={800}>
              <div className="p-6 rounded-xl border border-[#8A78B4]/15 bg-white shadow-sm hover:border-[#8A78B4]/30 hover:shadow-md transition-all duration-300">
                <span className="text-4xl font-bold text-[#8A78B4] font-display">50+</span>
                <p className="text-xs uppercase tracking-wider text-gray-500 font-semibold font-sans mt-2">Consultations</p>
              </div>
            </FadeIn>
          </div>
        </div>

        {/* Vision & Mission Cards Row with flowing connector layouts */}
        <div className="relative mb-16">
          {/* Subtle flowing SVG connector path */}
          <div className="absolute top-1/2 left-1/4 right-1/4 h-0.5 border-t-2 border-dashed border-[#8A78B4]/20 -translate-y-1/2 z-0 hidden md:block" />

          <div className="grid md:grid-cols-2 gap-8 relative z-10">
            <FadeIn delay={200} duration={800}>
              <div className="p-8 rounded-xl border border-[#8A78B4]/15 bg-white shadow-sm hover:border-[#8A78B4]/30 hover:-translate-y-1 hover:shadow-lg transition-all duration-500 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-24 h-24 bg-[#8A78B4]/5 rounded-bl-full flex items-center justify-center text-[#8A78B4]/40 font-display text-4xl font-bold group-hover:bg-[#8A78B4]/10 transition-colors">V</div>
                <h4 className="text-xl font-bold uppercase text-[#8A78B4] mb-3 font-sans">// Vision</h4>
                <p className="text-[#4A4A4A] text-sm md:text-base leading-relaxed font-light">
                  To become one of the most trusted architectural and design firms in Kerala and across India by delivering innovative, sustainable, and customer-focused design solutions.
                </p>
                <div className="absolute bottom-0 left-0 w-0 h-1 bg-[#8A78B4] group-hover:w-full transition-all duration-[600ms] ease-out" />
              </div>
            </FadeIn>

            <FadeIn delay={300} duration={800}>
              <div className="p-8 rounded-xl border border-[#8A78B4]/15 bg-white shadow-sm hover:border-[#8A78B4]/30 hover:-translate-y-1 hover:shadow-lg transition-all duration-500 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-24 h-24 bg-[#8A78B4]/5 rounded-bl-full flex items-center justify-center text-[#8A78B4]/40 font-display text-4xl font-bold group-hover:bg-[#8A78B4]/10 transition-colors">M</div>
                <h4 className="text-xl font-bold uppercase text-[#8A78B4] mb-3 font-sans">// Mission</h4>
                <p className="text-[#4A4A4A] text-sm md:text-base leading-relaxed font-light">
                  To provide complete architectural and design solutions from concept to completion, combining creativity, technical expertise, and modern technology.
                </p>
                <div className="absolute bottom-0 left-0 w-0 h-1 bg-[#8A78B4] group-hover:w-full transition-all duration-[600ms] ease-out" />
              </div>
            </FadeIn>
          </div>
        </div>

        {/* Core Values & Design Process split layout */}
        <div className="grid lg:grid-cols-12 gap-12 pt-8 border-t border-[#8A78B4]/10">
          
          {/* Left Side: Design Process Timeline */}
          <div className="lg:col-span-7">
            <FadeIn delay={200} duration={800}>
              <h3 className="text-3xl font-bold text-[#0A0A0A] font-display mb-8">Our Design Process</h3>
              <ProcessTimeline 
                steps={[
                  { step: "Step 1", title: "Client Consultation", desc: "Understanding your vision, requirements, budget, and expectations." },
                  { step: "Step 2", title: "Site Analysis", desc: "Studying the location, surroundings, orientation, and site conditions." },
                  { step: "Step 3", title: "Concept Development", desc: "Creating initial design concepts and planning layouts." },
                  { step: "Step 4", title: "3D Visualization", desc: "Presenting realistic architectural visualizations before construction." },
                  { step: "Step 5", title: "Design Finalization", desc: "Refining every detail based on client feedback." },
                  { step: "Step 6", title: "Construction Support", desc: "Providing continuous guidance until project completion." }
                ]}
              />
            </FadeIn>
          </div>

          {/* Right Side: Core Values */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
            <FadeIn delay={300} duration={800}>
              <div className="liquid-glass border border-[#8A78B4]/20 rounded-xl p-8 space-y-6">
                <h3 className="text-2xl font-bold tracking-tight border-b border-[#8A78B4]/10 pb-3 text-[#0A0A0A] font-display">Core Values</h3>
                <ul className="space-y-4">
                  {[
                    "Client-first approach",
                    "Creative and innovative thinking",
                    "Quality without compromise",
                    "Transparency throughout the project",
                    "Timely project delivery",
                    "Sustainable and functional designs",
                    "Long-term client relationships"
                  ].map((val, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm text-[#4A4A4A] font-sans">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#8A78B4] mt-2 flex-shrink-0" />
                      <span className="font-medium text-[#1A1A1A]">{val}</span>
                    </li>
                  ))}
                </ul>
                <div className="pt-4 border-t border-[#8A78B4]/10 text-center">
                  <p className="text-xs text-[#8A78B4] uppercase tracking-widest font-semibold font-sans">Brand Promise</p>
                  <p className="text-sm font-medium text-[#0A0A0A] mt-2 italic font-display">
                    "Plan your choice, we will be with you—anywhere, anytime."
                  </p>
                </div>
              </div>
            </FadeIn>
          </div>

        </div>
      </section>

      {/* SERVICES SECTION */}
      <section ref={servicesRef} className="relative z-10 px-6 md:px-12 lg:px-16 py-20 md:py-28 max-w-7xl mx-auto border-t border-[#8A78B4]/10 overflow-hidden">
        
        <FadeIn delay={100} duration={800}>
          <div className="text-center max-w-2xl mx-auto mb-16 relative z-10">
            <span className="text-xs uppercase tracking-widest text-[#8A78B4] font-semibold">Excellence in Design</span>
            <h2 className="text-4xl md:text-5xl font-light tracking-tight mt-2 text-[#0A0A0A]">Our Services</h2>
            <p className="text-[#4A4A4A] mt-3 text-sm md:text-base font-light">
              Complete design and consult solutions from concept visualization to physical execution.
            </p>
          </div>
        </FadeIn>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
          {[
            {
              icon: <Compass className="w-8 h-8 text-[#8A78B4]" />,
              title: "1. Architectural Design",
              desc: "We design aesthetically pleasing, structurally sound, and highly functional buildings reflecting the client's personality.",
              list: ["House & Villa Design", "Apartment & Site Planning", "Commercial & Corporate Design", "Contemporary & Traditional Kerala Architecture"]
            },
            {
              icon: <Layers className="w-8 h-8 text-[#8A78B4]" />,
              title: "2. 3D Visualization & Planning",
              desc: "Before construction begins, visualize every detail with realistic volumetric renders and site walkthroughs.",
              list: ["Exterior & Interior 3D Views", "3D Walkthrough Concepts", "Detailed Floor & Site Planning", "Master Elevation Designs"]
            },
            {
              icon: <Sparkles className="w-8 h-8 text-[#8A78B4]" />,
              title: "3. Interior Design",
              desc: "Elegance, comfort, and modern modular layouts tailored perfectly for your personal or commercial environments.",
              list: ["Modular Kitchens", "Living Rooms & Bed Chambers", "Office & Corporate Interiors", "Restaurant & Retail Lounge Spaces"]
            },
            {
              icon: <Award className="w-8 h-8 text-[#8A78B4]" />,
              title: "4. Landscape Design",
              desc: "Beautiful, relaxing outdoor green systems mapped out to blend natively with structural architecture.",
              list: ["Terrace & Courtyard Planning", "Water Features & Pool Decks", "Garden Design & Seating Areas", "Grand Entrance Landscapes"]
            },
            {
              icon: <Building2 className="w-8 h-8 text-[#8A78B4]" />,
              title: "5. Architectural Consultation",
              desc: "Professional validation of soil, surroundings, materials and budget optimizations to build securely.",
              list: ["Site & Orientation Analysis", "Material Recommendations", "Detailed Budget Estimation", "Structural Guidance"]
            },
            {
              icon: <Hammer className="w-8 h-8 text-[#8A78B4]" />,
              title: "6. Renovation & Remodeling",
              desc: "Reinvigorate ancestral sites or outdated commercial stores with structural modern optimization.",
              list: ["Home Renovation", "Exterior Remodeling", "Space Optimization", "Modernization Adjustments"]
            }
          ].map((srv, idx) => (
            <FadeIn key={idx} delay={150 * (idx % 3)} duration={800} className="flex">
              <div className="premium-service-card p-8 flex flex-col justify-between w-full group">
                <div className="relative z-10">
                  <div className="mb-6 p-3 bg-[#8A78B4]/5 rounded-lg inline-block group-hover:scale-105 transition-transform duration-300">
                    {srv.icon}
                  </div>
                  <h3 className="text-xl font-medium text-[#0A0A0A] mb-3">{srv.title}</h3>
                  <p className="text-[#4A4A4A] text-sm leading-relaxed mb-6 font-light">{srv.desc}</p>
                </div>
                <ul className="space-y-2 border-t border-[#8A78B4]/10 pt-4 relative z-10">
                  {srv.list.map((li, lIdx) => (
                    <li key={lIdx} className="text-xs text-[#4A4A4A] flex items-center gap-2 font-light">
                      <ChevronRight size={12} className="text-[#8A78B4]" />
                      {li}
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* PROJECTS SECTION */}
      <section ref={projectsRef} className="relative z-10 w-full border-t border-[#8A78B4]/10 bg-black">
        <ImageRevealSection />
      </section>

      {/* FOUNDER SECTION */}
      <section className="relative z-10 px-6 md:px-12 lg:px-16 py-20 md:py-28 max-w-7xl mx-auto border-t border-[#8A78B4]/10 bg-[#FAF5F0]">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Portrait */}
          <div className="lg:col-span-5">
            <FadeIn delay={100} duration={800}>
              <div className="relative aspect-[3/4] max-w-sm mx-auto rounded-2xl overflow-hidden border border-[#8A78B4]/20 shadow-xl group">
                <img 
                  src="/founder.jpg" 
                  alt="Jishnu B T - Founder of BT Bright Builders" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
              </div>
            </FadeIn>
          </div>

          {/* Right Column: Narrative */}
          <div className="lg:col-span-7 space-y-6">
            <FadeIn delay={200} duration={800}>
              <div className="border-b border-[#8A78B4]/20 pb-4 mb-6">
                <span className="text-xs uppercase tracking-widest text-[#8A78B4] font-semibold font-sans block mb-2">// THE VISIONARY</span>
                <h2 className="text-5xl md:text-6xl font-bold tracking-tight text-[#0A0A0A] font-display">
                  Jishnu B T
                </h2>
                <div className="flex items-center gap-3 mt-3">
                  <span className="text-xs bg-[#8A78B4]/10 text-[#8A78B4] font-bold px-3 py-1 rounded-full uppercase tracking-wider font-sans">
                    Founder
                  </span>
                  <span className="text-xs text-gray-500 font-semibold tracking-wider font-sans">
                    Established 2023
                  </span>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={300} duration={800}>
              <p className="text-xl md:text-2xl text-[#1A1A1A] font-light leading-relaxed italic border-l-2 border-[#8A78B4] pl-6 py-2 bg-[#8A78B4]/5 rounded-r-lg max-w-2xl font-display">
                "Architecture is the art of translating dreams into structured realities. Since establishing BT Bright Builders in 2023, our mission has been to craft functional, sustainable spaces that reflect your personality because your home is your choice."
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section ref={contactRef} className="relative z-10 w-full border-t border-[#8A78B4]/10 bg-black text-white py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 grid lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Content Column */}
          <div className="lg:col-span-5 space-y-12 text-white-force">
            <FadeIn delay={100} duration={800}>
              <div className="text-white-force">
                <span className="text-xs uppercase tracking-widest text-[#8A78B4] font-semibold">// GET IN TOUCH</span>
                <h2 className="text-5xl md:text-6xl font-bold tracking-tight mt-4 mb-6 leading-none text-white! text-white-force">
                  Let’s Build<br />
                  <span className="text-white/60">Something</span><br />
                  Extraordinary.
                </h2>
                <p className="text-gray-400 text-sm md:text-base leading-relaxed font-light max-w-sm">
                  Have a project in mind or want to explore how our design expertise can elevate your architecture? We’d love to hear from you.
                </p>
              </div>
            </FadeIn>

            {/* Information Cards with dark circular icons */}
            <FadeIn delay={200} duration={800} className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 text-[#8A78B4]">
                  <Compass size={20} />
                </div>
                <div>
                  <h4 className="text-xs font-semibold uppercase text-gray-500 tracking-wider">EMAIL</h4>
                  <p className="text-sm font-medium text-white!">
                    <a href="mailto:btbrightbuilders@gmail.com" className="hover:underline text-white!">btbrightbuilders@gmail.com</a>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 text-[#8A78B4]">
                  <Phone size={20} />
                </div>
                <div>
                  <h4 className="text-xs font-semibold uppercase text-gray-500 tracking-wider">PHONE</h4>
                  <p className="text-sm font-medium text-white! hover:underline">
                    <a href="https://wa.me/917510836988" target="_blank" rel="noreferrer" className="text-white!">+91 75108 36988</a>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 text-[#8A78B4]">
                  <MapPin size={20} />
                </div>
                <div>
                  <h4 className="text-xs font-semibold uppercase text-gray-500 tracking-wider">LOCATION</h4>
                  <p className="text-sm font-medium text-white!">
                    Nilambur, Kerala,<br />India
                  </p>
                </div>
              </div>
            </FadeIn>

            {/* Social Channels in row */}
            <FadeIn delay={300} duration={800} className="space-y-4 pt-4 border-t border-white/10">
              <h4 className="text-xs uppercase tracking-widest text-gray-500 font-semibold">Let's connect on social media</h4>
              <div className="flex gap-4">
                <a 
                  href="https://www.instagram.com/bt_bright_builders" 
                  target="_blank" 
                  rel="noreferrer"
                  className="p-3 bg-white/5 hover:bg-[#8A78B4] hover:text-white rounded-lg border border-white/10 text-white transition-all hover:scale-105"
                  aria-label="Instagram Link"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </a>
                <a 
                  href="https://www.facebook.com/share/17TVJFQo1X/" 
                  target="_blank" 
                  rel="noreferrer"
                  className="p-3 bg-white/5 hover:bg-[#8A78B4] hover:text-white rounded-lg border border-white/10 text-white transition-all hover:scale-105"
                  aria-label="Facebook Link"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                  </svg>
                </a>
              </div>
            </FadeIn>
          </div>

          {/* Right Form Column */}
          <div className="lg:col-span-7">
            <FadeIn delay={200} duration={800}>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-8 md:p-10 shadow-xl text-white-force">
                <h3 className="text-2xl font-bold tracking-tight text-white mb-2">Send a Message</h3>
                <p className="text-gray-400 text-sm mb-8">We'll get back to you within 24 hours.</p>
                
                {isSubmitted ? (
                  <div className="text-center py-12 space-y-4">
                    <CheckCircle className="w-16 h-16 text-green-400 mx-auto animate-bounce" />
                    <h4 className="text-xl font-semibold text-white">Message Sent Successfully!</h4>
                    <p className="text-gray-400 text-sm max-w-sm mx-auto">
                      Thank you for reaching out to BT Bright Builders. Jishnu B T and our consultation team will coordinate back with you shortly.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleContactSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="bg-white/5 border border-white/10 rounded-lg p-4 focus-within:border-white transition-colors">
                        <label className="block text-xs uppercase tracking-wider text-gray-500 mb-1 font-semibold">Full Name</label>
                        <input
                          type="text"
                          required
                          value={formState.name}
                          onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                          className="w-full bg-transparent text-white focus:outline-none text-sm placeholder-gray-600"
                          placeholder="Your name"
                        />
                      </div>

                      <div className="bg-white/5 border border-white/10 rounded-lg p-4 focus-within:border-white transition-colors">
                        <label className="block text-xs uppercase tracking-wider text-gray-500 mb-1 font-semibold">Email Address</label>
                        <input
                          type="email"
                          required
                          value={formState.email}
                          onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                          className="w-full bg-transparent text-white focus:outline-none text-sm placeholder-gray-600"
                          placeholder="you@example.com"
                        />
                      </div>
                    </div>

                    <div className="bg-white/5 border border-white/10 rounded-lg p-4 focus-within:border-white transition-colors">
                      <label className="block text-xs uppercase tracking-wider text-gray-500 mb-1 font-semibold">Company (Optional)</label>
                      <input
                        type="text"
                        className="w-full bg-transparent text-white focus:outline-none text-sm placeholder-gray-600"
                        placeholder="Your company"
                      />
                    </div>

                    <div className="bg-white/5 border border-white/10 rounded-lg p-4 focus-within:border-white transition-colors">
                      <label className="block text-xs uppercase tracking-wider text-gray-500 mb-1 font-semibold">Project Type</label>
                      <select className="w-full bg-transparent text-white focus:outline-none text-sm cursor-pointer outline-none border-none py-1">
                        <option value="residential" className="bg-black text-white">Residential Design</option>
                        <option value="commercial" className="bg-black text-white">Commercial Layout</option>
                        <option value="landscape" className="bg-black text-white">Landscape Systems</option>
                        <option value="consultation" className="bg-black text-white">Architectural Consultation</option>
                      </select>
                    </div>

                    <div className="bg-white/5 border border-white/10 rounded-lg p-4 focus-within:border-white transition-colors">
                      <label className="block text-xs uppercase tracking-wider text-gray-500 mb-1 font-semibold">Message</label>
                      <textarea
                        rows={4}
                        required
                        value={formState.message}
                        onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                        className="w-full bg-transparent text-white focus:outline-none text-sm placeholder-gray-600 resize-none"
                        placeholder="Tell us about your project..."
                      />
                    </div>

                    <div className="flex justify-center pt-2">
                      <PremiumButton
                        type="submit"
                        className="w-full"
                        showArrow={!isSubmitting}
                      >
                        {isSubmitting ? "Sending..." : "Send Message"}
                      </PremiumButton>
                    </div>
                  </form>
                )}
              </div>
            </FadeIn>
          </div>

        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative z-10 w-full border-t border-[#8A78B4]/15 bg-black pt-16 pb-24 text-gray-300 font-sans">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
          {/* Main Footer Content Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-12 gap-8 md:gap-12 pb-12 border-b border-white/10">
            
            {/* Column 1: Logo & Moto Details */}
            <div className="md:col-span-2 lg:col-span-5 space-y-4">
              <div className="flex items-center gap-3">
                <img 
                  src="/logo.png" 
                  alt="BT Bright Builders Logo" 
                  className="h-10 w-auto object-contain brightness-0 invert"
                />
                <span className="text-xl font-bold tracking-wider text-white font-display">BT Bright Builders</span>
              </div>
              <p className="text-sm text-gray-300 font-light leading-relaxed max-w-sm">
                Luxury structural design, landscape architecture, and premium consultations. Based in Kerala, delivering elegance across India.
              </p>
              <div className="pt-2">
                <span className="text-xs uppercase tracking-widest text-[#8A78B4] font-bold">Motto</span>
                <p className="text-sm font-medium text-white mt-1 font-display">"Your Home is Your Choice."</p>
              </div>
            </div>

            {/* Column 2: Quick Links */}
            <div className="lg:col-span-2 space-y-4">
              <h4 className="text-xs uppercase tracking-widest text-[#8A78B4] font-bold">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <button onClick={() => scrollInto(storyRef)} className="text-sm text-gray-300 hover:text-white transition-colors font-medium cursor-pointer">Home</button>
                </li>
                <li>
                  <button onClick={() => scrollInto(aboutRef)} className="text-sm text-gray-300 hover:text-white transition-colors font-medium cursor-pointer">About Studio</button>
                </li>
                <li>
                  <button onClick={() => scrollInto(servicesRef)} className="text-sm text-gray-300 hover:text-white transition-colors font-medium cursor-pointer">Services</button>
                </li>
                <li>
                  <button onClick={() => scrollInto(projectsRef)} className="text-sm text-gray-300 hover:text-white transition-colors font-medium cursor-pointer">Works Portfolio</button>
                </li>
                <li>
                  <button onClick={() => scrollInto(contactRef)} className="text-sm text-gray-300 hover:text-white transition-colors font-medium cursor-pointer">Contact Us</button>
                </li>
              </ul>
            </div>

            {/* Column 3: Contact Info */}
            <div className="lg:col-span-3 space-y-4">
              <h4 className="text-xs uppercase tracking-widest text-[#8A78B4] font-bold">Head Office</h4>
              <p className="text-sm text-gray-300 font-light leading-relaxed">
                Nilambur, Malappuram District,<br />
                Kerala, India - 679329
              </p>
              <div className="space-y-1">
                <p className="text-sm text-gray-300 hover:text-white hover:underline transition-colors">
                  <a href="mailto:btbrightbuilders@gmail.com">btbrightbuilders@gmail.com</a>
                </p>
                <p className="text-sm text-gray-300 hover:text-white hover:underline transition-colors">
                  <a href="https://wa.me/917510836988" target="_blank" rel="noreferrer">+91 75108 36988</a>
                </p>
              </div>
            </div>

            {/* Column 4: Brand Promise */}
            <div className="lg:col-span-2 space-y-4">
              <h4 className="text-xs uppercase tracking-widest text-[#8A78B4] font-bold">Brand Promise</h4>
              <p className="text-sm text-gray-300 font-light leading-relaxed italic">
                "Plan your choice, we will be with you—anywhere, anytime."
              </p>
              <div className="flex gap-3">
                <a 
                  href="https://www.instagram.com/bt_bright_builders" 
                  target="_blank" 
                  rel="noreferrer"
                  className="p-2 bg-white/5 hover:bg-[#8A78B4] hover:text-white rounded-lg border border-white/10 text-white transition-all hover:scale-105"
                  aria-label="Instagram Link"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </a>
                <a 
                  href="https://www.facebook.com/share/17TVJFQo1X/" 
                  target="_blank" 
                  rel="noreferrer"
                  className="p-2 bg-white/5 hover:bg-[#8A78B4] hover:text-white rounded-lg border border-white/10 text-white transition-all hover:scale-105"
                  aria-label="Facebook Link"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                  </svg>
                </a>
              </div>
            </div>

          </div>

          {/* Bottom Copyright Strip */}
          <div className="flex flex-col md:flex-row items-center justify-between pt-8 gap-4 text-xs text-gray-300 font-light">
            <p>© {new Date().getFullYear()} BT Bright Builders. All Rights Reserved. Coordinated by Jishnu B T.</p>
            <div className="flex gap-6">
              <span className="hover:text-white cursor-pointer transition-colors">Privacy Policy</span>
              <span className="hover:text-white cursor-pointer transition-colors">Terms & Conditions</span>
              <span className="hover:text-white cursor-pointer transition-colors">Site Map</span>
            </div>
          </div>

        </div>
      </footer>
    </div>
  );
}
