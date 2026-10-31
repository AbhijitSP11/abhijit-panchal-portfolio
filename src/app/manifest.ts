import type { MetadataRoute } from "next";
import { siteDescription } from "@/lib/seo";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Abhijit. | SP",
    short_name: "Abhijit.",
    description: siteDescription,
    start_url: "/",
    display: "standalone",
    background_color: "#f1f0eb",
    theme_color: "#f1f0eb",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
