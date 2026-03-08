import ScrollyCanvas from "@/components/ScrollyCanvas";
import Overlay from "@/components/Overlay";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";

export default function Home() {
  return (
    <main className="relative min-h-screen text-white bg-transparent">
      <ScrollyCanvas />
      <Overlay />
      <Experience />
      <Projects />
    </main>
  );
}
