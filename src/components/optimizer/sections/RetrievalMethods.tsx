import React from 'react';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { SectionCard } from '../shared/SectionCard';
import { ConfigSlider } from '../shared/ConfigSlider';
import { RETRIEVAL_METHODS, RERANKER_MODELS } from '@/lib/constants';
import { useOptimizerStore } from '@/lib/optimizer-store';
import { AnimatePresence, motion } from 'framer-motion';
export function RetrievalMethods() {
  const retrievalMethod = useOptimizerStore((state) => state.retrievalMethod);
  const topK = useOptimizerStore((state) => state.topK);
  const reranking = useOptimizerStore((state) => state.reranking);
  const rerankerModel = useOptimizerStore((state) => state.rerankerModel);
  const rerankTopN = useOptimizerStore((state) => state.rerankTopN);
  const updateField = useOptimizerStore((state) => state.updateField);
  const setTopK = useOptimizerStore((state) => state.setTopK);
  const setRerankTopN = useOptimizerStore((state) => state.setRerankTopN);
  return (
    <SectionCard
      title="Retrieval Methods"
      description="Configure how relevant chunks are retrieved from the vector database."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="retrieval-method">Retrieval Type</Label>
            <Select
              value={retrievalMethod}
              onValueChange={(value) => updateField('retrievalMethod', value)}
            >
              <SelectTrigger id="retrieval-method">
                <SelectValue placeholder="Select a method" />
              </SelectTrigger>
              <SelectContent>
                {RETRIEVAL_METHODS.map((method) => (
                  <SelectItem key={method.value} value={method.value}>{method.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <ConfigSlider
            label="Top-K Results"
            value={topK}
            onValueChange={setTopK}
            min={1}
            max={10}
            step={1}
          />
        </div>
        <div className="space-y-6">
          <div className="flex items-center justify-between rounded-lg border p-4">
            <div className="space-y-0.5">
              <Label htmlFor="reranking-switch" className="text-base">Enable Re-ranking</Label>
              <p className="text-sm text-muted-foreground">
                Improve relevance by re-scoring the top results.
              </p>
            </div>
            <Switch
              id="reranking-switch"
              checked={reranking}
              onCheckedChange={(checked) => updateField('reranking', checked)}
            />
          </div>
          <AnimatePresence>
            {reranking && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6 border p-4 rounded-lg"
              >
                <div className="space-y-2">
                  <Label htmlFor="reranker-model">Re-ranker Model</Label>
                  <Select
                    value={rerankerModel}
                    onValueChange={(value) => updateField('rerankerModel', value)}
                  >
                    <SelectTrigger id="reranker-model">
                      <SelectValue placeholder="Select a model" />
                    </SelectTrigger>
                    <SelectContent>
                      {RERANKER_MODELS.map((model) => (
                        <SelectItem key={model.value} value={model.value}>{model.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <ConfigSlider
                  label="Re-rank Top-N"
                  value={rerankTopN}
                  onValueChange={setRerankTopN}
                  min={1}
                  max={20}
                  step={1}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </SectionCard>
  );
}