import { createFileRoute } from "@tanstack/react-router";
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

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "NEUROVA — The interface is no longer the screen." },
      {
        name: "description",
        content:
          "NEUROVA is building the first cognitive layer between thought and machine. A wearable interface for the post-screen era.",
      },
      { property: "og:title", content: "NEUROVA — Cognitive Interface Lab" },
      {
        property: "og:description",
        content: "The first cognitive layer between thought and machine.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
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
