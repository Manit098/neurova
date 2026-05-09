import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-6">
      <div className="max-w-md text-center">
        <div className="font-mono text-[10px] uppercase tracking-[0.4em] text-neural">
          ◍ Error · 404
        </div>
        <h1 className="mt-6 font-display text-[clamp(4rem,12vw,8rem)] font-extralight leading-none tracking-[-0.05em] text-foreground">
          404
        </h1>
        <p className="mt-4 font-mono text-sm text-muted-foreground">
          Transmission not found. Signal lost.
        </p>
        <div className="mt-8">
          <Link
            to="/"
            className="inline-flex items-center gap-3 rounded-full border border-neural/40 bg-neural/5 px-6 py-3 font-mono text-[10px] uppercase tracking-[0.3em] text-foreground backdrop-blur transition hover:border-neural hover:bg-neural/10"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-neural-glow" />
            Return to origin
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Neurova — Cognitive Interface Lab" },
      {
        name: "description",
        content:
          "Neurova is building the first cognitive layer between thought and machine — a wearable interface for the post-screen era.",
      },
      { name: "author", content: "Neurova Cognitive Lab" },
      { name: "theme-color", content: "#0a0f18" },
      { property: "og:title", content: "Neurova — Cognitive Interface Lab" },
      {
        property: "og:description",
        content: "The interface is no longer the screen. Neurova Synapse — wearable cognitive interface.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Neurova — Cognitive Interface Lab" },
      {
        name: "twitter:description",
        content: "The interface is no longer the screen.",
      },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@200;300;400;500&family=JetBrains+Mono:wght@300;400&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return <Outlet />;
}
