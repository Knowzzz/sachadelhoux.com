"use client";

import { useParams } from "next/navigation";
import ArticleView from "@/components/ArticleView";

export default function TechDetail() {
  const params = useParams<{ slug: string }>();
  return <ArticleView route="tech" slug={params.slug} />;
}
