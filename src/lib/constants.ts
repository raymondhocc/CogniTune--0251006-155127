export type PerformanceMetricStatus = 'success' | 'warning' | 'danger';
export const DOCUMENT_TYPES = [
  "PDF", "CSV", "PowerPoint", "PST Email", "Word", "Excel", "Text", "Markdown", "HTML"
];
export const DOMAINS = [
  "Insurance", "Financial", "Legal", "Customer Service", "Technical", "Medical", "General"
];
export const CHUNKING_METHODS = [
  { value: "recursive", label: "Recursive (LangChain)" },
  { value: "fixed", label: "Fixed Size" },
  { value: "markdown", label: "Markdown Header-based" },
  { value: "semantic", label: "Semantic Chunking" },
];
export const EMBEDDING_MODELS = [
  { value: "bge-small", label: "BAAI/bge-small-en", dimensions: 384 },
  { value: "bge-base", label: "BAAI/bge-base-en", dimensions: 768 },
  { value: "mpnet-base", label: "paraphrase-multilingual-mpnet-base-v2", dimensions: 768 },
  { value: "openai-small", label: "text-embedding-3-small (OpenAI)", dimensions: 1536 },
  { value: "cohere", label: "Cohere Embed", dimensions: 1024 },
];
export const RETRIEVAL_METHODS = [
  { value: "dense", label: "Dense Retrieval (Vector)" },
  { value: "sparse", label: "Sparse Retrieval (BM25)" },
  { value: "hybrid", label: "Hybrid Retrieval" },
  { value: "colbert", label: "ColBERT" },
];
export const RERANKER_MODELS = [
  { value: "bge-reranker", label: "BGE Reranker" },
  { value: "cohere-rerank", label: "Cohere Rerank" },
  { value: "t5-cross-encoder", label: "T5 Cross-Encoder" },
];
export const LLM_MODELS = [
  { value: "gpt-3.5-turbo", label: "GPT-3.5 Turbo" },
  { value: "gpt-4", label: "GPT-4" },
  { value: "claude-2", label: "Claude 2" },
  { value: "llama-2-70b", label: "Llama 2 70B" },
];
export const MOCK_ANALYSIS_DATA = {
  wordCount: 12543,
  charCount: 75258,
  sentenceCount: 621,
  fleschReadingEase: 45.8,
  smogIndex: 14.2,
  recommendations: [
    "High complexity suggests smaller chunk sizes (256-512 tokens).",
    "Consider semantic chunking for better contextual boundaries.",
    "High sentence variance may benefit from recursive chunking.",
  ],
};
export const MOCK_PERFORMANCE_METRICS: { name: string; value: string; target: string; status: PerformanceMetricStatus }[] = [
    { name: "Hit Rate @3", value: "89%", target: "90%", status: "warning" },
    { name: "Mean Reciprocal Rank (MRR)", value: "0.78", target: "0.80", status: "warning" },
    { name: "Faithfulness", value: "95%", target: "92%", status: "success" },
    { name: "Relevance", value: "92%", target: "90%", status: "success" },
    { name: "Latency (p95)", value: "1.2s", target: "1.0s", status: "danger" },
    { name: "Cost Efficiency", value: "$0.02/query", target: "$0.025/query", status: "success" },
];