import { create } from 'zustand';
import {
  CHUNKING_METHODS,
  DOMAINS,
  DOCUMENT_TYPES,
  EMBEDDING_MODELS,
  RETRIEVAL_METHODS,
  RERANKER_MODELS,
  LLM_MODELS,
  MOCK_ANALYSIS_DATA,
  MOCK_PERFORMANCE_METRICS,
} from './constants';
export interface OptimizerState {
  pipelineName: string;
  documentType: string;
  domain: string;
  file: { name: string; type: string; size: number } | null;
  analysisResults: typeof MOCK_ANALYSIS_DATA | null;
  chunkingMethod: string;
  chunkSize: number;
  chunkOverlap: number;
  embeddingModel: string;
  retrievalMethod: string;
  topK: number;
  reranking: boolean;
  rerankerModel: string;
  rerankTopN: number;
  llmModel: string;
  temperature: number;
  maxTokens: number;
  systemPrompt: string;
  testQueries: string[];
  evaluationResults: typeof MOCK_PERFORMANCE_METRICS | null;
  isEvaluating: boolean; // New state for global loading
}
export interface OptimizerActions {
  updateField: <K extends keyof OptimizerState>(
    field: K,
    value: OptimizerState[K]
  ) => void;
  setChunkSize: (value: number) => void;
  setChunkOverlap: (value: number) => void;
  setTopK: (value: number) => void;
  setRerankTopN: (value: number) => void;
  setTemperature: (value: number) => void;
  setMaxTokens: (value: number) => void;
  setIsEvaluating: (isEvaluating: boolean) => void; // New action
  saveState: () => void;
  loadState: () => void;
  resetState: () => void;
}
const initialState: OptimizerState = {
  pipelineName: 'My RAG Pipeline',
  documentType: DOCUMENT_TYPES[0],
  domain: DOMAINS[0],
  file: null,
  analysisResults: null,
  chunkingMethod: CHUNKING_METHODS[0].value,
  chunkSize: 512,
  chunkOverlap: 20,
  embeddingModel: EMBEDDING_MODELS[0].value,
  retrievalMethod: RETRIEVAL_METHODS[0].value,
  topK: 5,
  reranking: true,
  rerankerModel: RERANKER_MODELS[0].value,
  rerankTopN: 3,
  llmModel: LLM_MODELS[0].value,
  temperature: 0.7,
  maxTokens: 1024,
  systemPrompt: 'You are a helpful AI assistant. Answer the user\'s question based on the provided context.',
  testQueries: [],
  evaluationResults: null,
  isEvaluating: false,
};
export const useOptimizerStore = create<OptimizerState & OptimizerActions>((set, get) => ({
  ...initialState,
  updateField: (field, value) => set({ [field]: value }),
  setChunkSize: (value) => set({ chunkSize: value }),
  setChunkOverlap: (value) => set({ chunkOverlap: value }),
  setTopK: (value) => set({ topK: value }),
  setRerankTopN: (value) => set({ rerankTopN: value }),
  setTemperature: (value) => set({ temperature: value }),
  setMaxTokens: (value) => set({ maxTokens: value }),
  setIsEvaluating: (isEvaluating) => set({ isEvaluating }),
  saveState: () => {
    try {
      const state = get();
      const stateToSave = {} as OptimizerState;
      // Type-safe iteration to build the state object for saving
      (Object.keys(initialState) as Array<keyof OptimizerState>).forEach(key => {
        (stateToSave[key] as any) = state[key];
      });
      localStorage.setItem('cognitune_preset', JSON.stringify(stateToSave));
      alert('Preset saved successfully!');
    } catch (error) {
      console.error("Failed to save preset", error);
      alert('Failed to save preset.');
    }
  },
  loadState: () => {
    try {
      const savedState = localStorage.getItem('cognitune_preset');
      if (savedState) {
        set(JSON.parse(savedState));
        alert('Preset loaded successfully!');
      } else {
        alert('No saved preset found.');
      }
    } catch (error) {
      console.error("Failed to load preset", error);
      alert('Failed to load preset.');
    }
  },
  resetState: () => set(initialState),
}));