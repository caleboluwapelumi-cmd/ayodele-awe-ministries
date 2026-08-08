import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Next 16 allows only q=75 by default and 400s anything else, so every
    // quality any <Image> asks for has to be listed here.
    //  65  — the BLCN gallery thumbnails. 1800px sources drawn into a 270px
    //        box, where the extra bytes buy nothing; the lightbox that opens
    //        off them stays at the 75 default, which is where they are read.
    //  75  — the default, and what everything else uses.
    // 100  — the low-res BLCN church-order graphic, to avoid compounding its
    //        own softness.
    qualities: [65, 75, 100],
    /**
     * AVIF first, WebP as the fallback for anything that can't take it. AVIF
     * runs roughly 20–30% smaller than WebP at matching quality, which is worth
     * having on the hero artwork in particular.
     *
     * ⚠️ The trade is encode time on a cache MISS — AVIF is markedly slower to
     * encode than WebP. That is paid once per (image, width) pair and then
     * served from cache, which is why the long TTL below matters more now.
     */
    formats: ["image/avif", "image/webp"],
    /**
     * 31 days (Next's default is 4 hours).
     *
     * Every image the optimiser now handles is a build-time asset in
     * `public/images/` — there are no remote sources left, so nothing behind a
     * URL can change without a redeploy, and re-optimising six times a day only
     * bought repeated AVIF encodes. A deploy busts this anyway: the cache key
     * includes the build ID.
     */
    minimumCacheTTL: 2678400,
    /**
     * ⚠️ Nothing renders an Unsplash image any more — the seven decorative
     * placeholders were replaced by CSS gradients (see CLAUDE.md → Assets
     * Status). This entry is kept only so a future Unsplash image works without
     * a config change; it grants no access on its own.
     */
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
