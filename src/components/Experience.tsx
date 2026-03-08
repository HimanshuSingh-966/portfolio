export default function Experience() {
  const experiences = [
    {
      company: "Excelerate",
      role: "Data Analyst Associate Intern (Team Lead)",
      period: "Jul 2025 - Aug 2025",
      description: "Spearheaded an international analytics team of 6 members. Engineered an automated validation system processing 10,000+ daily records, and delivered interactive executive dashboards accelerating decisions by 40%."
    },
    {
      company: "AICTE Edunet Foundation",
      role: "Data Analyst Intern",
      period: "Sep 2025 - Oct 2025",
      description: "Performed comprehensive data analytics enhanced with Large Language Models (LLMs). Leveraged LLMs to automate data exploration and build conversational interfaces for complex datasets in various domains."
    },
    {
      company: "Edunet Foundation (IBM SkillsBuild)",
      role: "AI & Cloud Analytics Intern",
      period: "Jul 2025 - Aug 2025",
      description: "Ranked top 15% among 2000+ participants. Deployed 5 production-ready ML models on IBM Cloud achieving 92% average accuracy and built automation prototypes using Watsonx.ai Studio."
    },
    {
      company: "Centre of Excellence in AI",
      role: "President",
      period: "Sep 2025 - Present",
      description: "Currently leading the University AI community, driving data-driven initiatives, and mentoring peers in data science and machine learning."
    }
  ];

  return (
    <section className="relative z-20 min-h-screen bg-[#121212]/60 backdrop-blur-sm py-32 px-8 md:px-24 border-t border-white/5">
      <div className="mx-auto max-w-5xl">
        <h3 className="mb-20 text-4xl font-medium tracking-tight text-white md:text-6xl">
          Experience
        </h3>
        
        <div className="space-y-12">
          {experiences.map((exp, i) => (
            <div 
              key={i} 
              className="group relative flex flex-col md:flex-row justify-between gap-8 rounded-3xl bg-white/[0.02] p-8 md:p-12 backdrop-blur-md border border-white/10 transition-all duration-500 hover:bg-white/[0.05]"
            >
              <div className="md:w-1/3">
                <span className="inline-block rounded-full bg-white/10 px-4 py-1 text-sm font-medium text-gray-300 mb-4 tracking-wide">
                  {exp.period}
                </span>
                <h4 className="text-2xl md:text-3xl font-semibold text-white tracking-tight">{exp.company}</h4>
                <p className="mt-2 text-xl text-gray-400 font-light">{exp.role}</p>
              </div>
              
              <div className="md:w-2/3 flex items-center">
                <p className="text-lg md:text-xl leading-relaxed text-gray-300 font-light">
                  {exp.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
