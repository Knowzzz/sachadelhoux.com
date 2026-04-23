"use client";

import { useParams } from "next/navigation";
import ArticleView from "@/components/ArticleView";

export default function ThinkingDetail() {
  const params = useParams<{ slug: string }>();
  return <ArticleView route="thinking" slug={params.slug} />;
}
