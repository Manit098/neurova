import { CustomCursor } from "@/components/neurova/CustomCursor";
import { SmoothScroll } from "@/components/neurova/SmoothScroll";
import { Nav } from "@/components/neurova/Nav";
import { Hero } from "@/components/neurova/Hero";
import { Marquee } from "@/components/neurova/Marquee";
import { Problem } from "@/components/neurova/Problem";
import { Memory } from "@/components/neurova/Memory";
import { Latency } from "@/components/neurova/Latency";
import { Emotion } from "@/components/neurova/Emotion";
import { Synapse } from "@/components/neurova/Synapse";
import { Final } from "@/components/neurova/Final";

function App() {
  return (
    <main className="relative bg-background text-foreground">
      <SmoothScroll />
      <CustomCursor />
      <Nav />
      <Hero />
      <Marquee />
      <Problem />
      <Memory />
      <Latency />
      <Emotion />
      <Synapse />
      <Final />
    </main>
  );
}

export default App;
