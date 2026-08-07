"use client";

import DriftingParticles from "./DriftingParticles";

/**
 * The /birthday hero's confetti field.
 *
 * The implementation moved to `DriftingParticles` when the homepage hero needed
 * the same technique — a component named "confetti" reading as generic page
 * texture would have been the wrong name in both places. This preset keeps the
 * birthday page's output identical: same 16 dots, same positions, same
 * durations, same orange/blue palette.
 *
 * Every warning that used to live here (hard-coded positions for hydration, the
 * 94% left margin, the reduced-motion behaviour) now lives in
 * `DriftingParticles` and still applies.
 *
 * ⚠️ The `tone="birthday"` prop is gone — not because this page changed, but
 * because the rest of the site moved onto these colours. There is one tone now
 * and it is the default. See HeroAtmosphere.
 */
export default function BirthdayConfetti() {
  return <DriftingParticles density="full" />;
}
