import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import type { OptimizerState } from "./optimizer-store";
import type { PerformanceMetricStatus } from "./constants";
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export function generateMockMetrics(config: Partial<OptimizerState>): { name: string; value: string; target: string; status: PerformanceMetricStatus }[] {
  let hitRate = 89;
  let mrr = 0.78;
  let faithfulness = 95;
  let relevance = 92;
  let latency = 1.2;
  let cost = 0.02;
  // Adjust based on chunk size
  if (config.chunkSize && config.chunkSize < 300) {
    hitRate += 3;
    relevance += 2;
    latency += 0.1;
  } else if (config.chunkSize && config.chunkSize > 1000) {
    hitRate -= 4;
    faithfulness -= 3;
    latency -= 0.2;
  }
  // Adjust based on embedding model
  if (config.embeddingModel?.includes('openai')) {
    hitRate += 2;
    relevance += 3;
    cost += 0.005;
  }
  // Adjust based on reranking
  if (config.reranking) {
    relevance += 4;
    hitRate += 1;
    latency += 0.3;
  }
  // Adjust based on LLM
  if (config.llmModel?.includes('gpt-4')) {
    faithfulness += 5;
    relevance += 5;
    latency += 0.8;
    cost += 0.03;
  } else if (config.llmModel?.includes('gpt-3.5')) {
    latency -= 0.4;
    cost -= 0.015;
  }
  const formatStatus = (value: number, target: number, higherIsBetter = true): PerformanceMetricStatus => {
    const diff = value - target;
    if (higherIsBetter) {
      if (diff >= 0) return 'success';
      if (diff > -target * 0.1) return 'warning';
      return 'danger';
    } else {
      if (diff <= 0) return 'success';
      if (diff < target * 0.1) return 'warning';
      return 'danger';
    }
  };
  return [
    { name: "Hit Rate @3", value: `${Math.min(100, hitRate).toFixed(0)}%`, target: "90%", status: formatStatus(hitRate, 90) },
    { name: "Mean Reciprocal Rank (MRR)", value: mrr.toFixed(2), target: "0.80", status: formatStatus(mrr, 0.80) },
    { name: "Faithfulness", value: `${Math.min(100, faithfulness).toFixed(0)}%`, target: "92%", status: formatStatus(faithfulness, 92) },
    { name: "Relevance", value: `${Math.min(100, relevance).toFixed(0)}%`, target: "90%", status: formatStatus(relevance, 90) },
    { name: "Latency (p95)", value: `${Math.max(0.1, latency).toFixed(1)}s`, target: "1.0s", status: formatStatus(latency, 1.0, false) },
    { name: "Cost Efficiency", value: `$${Math.max(0.001, cost).toFixed(3)}/q`, target: "$0.025/q", status: formatStatus(cost, 0.025, false) },
  ];
}
export function generateChunks(text: string, chunkSize: number, overlapPercent: number): string[] {
  if (!text) return [];
  const overlap = Math.floor(chunkSize * (overlapPercent / 100));
  const step = chunkSize - overlap;
  const chunks: string[] = [];
  for (let i = 0; i < text.length; i += step) {
    chunks.push(text.substring(i, i + chunkSize));
  }
  return chunks;
}
export function downloadJson(data: object, filename: string) {
  const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
    JSON.stringify(data, null, 2)
  )}`;
  const link = document.createElement("a");
  link.href = jsonString;
  link.download = filename;
  link.click();
}