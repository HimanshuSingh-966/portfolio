import { ArrowUpRight } from "lucide-react";

export default function Projects() {
  const cases = [
    { title: "git-auto-pro", desc: "Python Automation Tool lowering overhead by 60%", link: "https://github.com/HimanshuSingh-966/git-auto-pro" },
    { title: "WardWatchSystem", desc: "Full-Stack TypeScript Healthcare tracking platform", link: "https://github.com/HimanshuSingh-966/WardWatchSystem" },
    { title: "Datalix-AI", desc: "TypeScript ML Platform analyzing complex datasets", link: "https://github.com/HimanshuSingh-966/Datalix-AI" },
    { title: "InternBeacon", desc: "Automated internship scraper monitoring AICTE/Internshala", link: "https://github.com/HimanshuSingh-966/InternBeacon" },
    { title: "PayLog-AI", desc: "Intelligent AI-powered tracking for personal finance", link: "https://github.com/HimanshuSingh-966/PayLog-AI" },
    { title: "ISL Recognition", desc: "YOLOv8 Deep Learning Model decoding Indian Sign Language", link: "#" }
  ];

  return (
    <section id="work" className="relative z-20 min-h-screen bg-[#121212]/60 backdrop-blur-sm py-32 px-8 md:px-24">
      <div className="mx-auto max-w-7xl">
        <h3 className="mb-20 text-4xl font-medium tracking-tight text-white md:text-6xl">
          Selected Work
        </h3>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-12">
          {cases.map((project, i) => (
            <div 
              key={i} 
              className="group relative flex cursor-pointer flex-col justify-between overflow-hidden rounded-3xl bg-white/[0.03] p-8 md:p-10 backdrop-blur-xl border border-white/10 transition-all duration-500 hover:bg-white/[0.08] hover:border-white/20 hover:-translate-y-2"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 mix-blend-overlay pointer-events-none" />
              
              <div className="relative z-10 flex h-64 md:h-80 items-center justify-center rounded-2xl bg-black/40 mb-10 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <span className="relative z-20 text-white/30 text-xl font-medium tracking-[0.2em] uppercase group-hover:scale-110 transition-transform duration-700">
                  {project.title}
                </span>
              </div>
              
              <div className="relative z-10 flex text-left items-end justify-between">
                <div>
                  <h4 className="text-3xl font-semibold text-white tracking-tight">{project.title}</h4>
                  <p className="mt-3 text-lg text-gray-400 font-light">{project.desc}</p>
                </div>
                <a href={project.link} target="_blank" rel="noopener noreferrer" className="rounded-full bg-white/10 p-4 text-white transition-all duration-300 group-hover:scale-110 group-hover:bg-white shrink-0 group-hover:text-black">
                  <ArrowUpRight size={28} strokeWidth={2.5} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
