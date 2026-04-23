"use client";

import { useParams } from "next/navigation";
import ArticleView from "@/components/ArticleView";

export default function XlyLogDetail() {
  const params = useParams<{ slug: string }>();
  return <ArticleView route="xly-log" slug={params.slug} />;
}
