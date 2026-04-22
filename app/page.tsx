"use client";

import SectionView from "@/components/SectionView";
import { HOME_ROUTE, HOME_TITLE } from "@/lib/content";

export default function HomePage() {
  return <SectionView route={HOME_ROUTE} heading={HOME_TITLE} />;
}
