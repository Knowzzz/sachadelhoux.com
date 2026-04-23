"use client";

import { useParams } from "next/navigation";
import ArticleView from "@/components/ArticleView";

export default function PostDetail() {
  const params = useParams<{ slug: string }>();
  return <ArticleView route="posts" slug={params.slug} />;
}
