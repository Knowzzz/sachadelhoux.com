"use client";

import SectionView from "@/components/SectionView";
import { ROUTES } from "@/lib/content";

export default function TechPage() {
  return <SectionView route="tech" heading={ROUTES.tech} />;
}
