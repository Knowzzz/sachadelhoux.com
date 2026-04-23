"use client";

import SectionView from "@/components/SectionView";
import { ROUTES } from "@/lib/content";

export default function PostsPage() {
  return <SectionView route="posts" heading={ROUTES.posts} />;
}
