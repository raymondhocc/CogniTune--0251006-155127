import React, { useMemo } from 'react';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { SectionCard } from '../shared/SectionCard';
import { ConfigSlider } from '../shared/ConfigSlider';
import { CHUNKING_METHODS } from '@/lib/constants';
import { useOptimizerStore } from '@/lib/optimizer-store';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { generateChunks } from '@/lib/utils';
const mockText = "Retrieval-Augmented Generation (RAG) is a technique that combines the strengths of pre-trained language models with external knowledge retrieval. By fetching relevant information from a knowledge base before generating a response, RAG models can produce more accurate, up-to-date, and contextually appropriate answers. This process involves three main steps: indexing, retrieval, and generation. Optimizing each step is crucial for overall performance.";
export function ChunkingStrategy() {
  const chunkingMethod = useOptimizerStore((state) => state.chunkingMethod);
  const chunkSize = useOptimizerStore((state) => state.chunkSize);
  const chunkOverlap = useOptimizerStore((state) => state.chunkOverlap);
  const updateField = useOptimizerStore((state) => state.updateField);
  const setChunkSize = useOptimizerStore((state) => state.setChunkSize);
  const setChunkOverlap = useOptimizerStore((state) => state.setChunkOverlap);
  const chunks = useMemo(() => {
    // We'll use character count as a proxy for token count for this mock preview
    const charChunkSize = chunkSize * 4; // Approx 4 chars per token
    return generateChunks(mockText, charChunkSize, chunkOverlap);
  }, [chunkSize, chunkOverlap]);
  return (
    <SectionCard
      title="Text Chunking Strategy"
      description="Configure how documents are split into smaller pieces for embedding and retrieval."
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="chunking-method">Chunking Method</Label>
            <Select
              value={chunkingMethod}
              onValueChange={(value) => updateField('chunkingMethod', value)}
            >
              <SelectTrigger id="chunking-method">
                <SelectValue placeholder="Select a method" />
              </SelectTrigger>
              <SelectContent>
                {CHUNKING_METHODS.map((method) => (
                  <SelectItem key={method.value} value={method.value}>{method.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <ConfigSlider
            label="Chunk Size (Tokens)"
            value={chunkSize}
            onValueChange={setChunkSize}
            min={64}
            max={2048}
            step={64}
          />
          <ConfigSlider
            label="Chunk Overlap (%)"
            value={chunkOverlap}
            onValueChange={setChunkOverlap}
            min={0}
            max={50}
            step={1}
          />
        </div>
        <Card className="bg-muted/50">
          <CardHeader>
            <CardTitle className="font-display">Real-time Preview ({chunks.length} chunks)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 max-h-64 overflow-y-auto p-4 border rounded-md bg-background">
              {chunks.map((chunk, index) => (
                <div key={index} className="p-3 bg-primary/5 rounded-md">
                  <p className="text-sm text-primary/80 break-words">
                    {chunk.length > 150 ? `${chunk.substring(0, 150)}...` : chunk}
                  </p>
                  <Separator className="my-2" />
                  <div className="text-xs text-muted-foreground">Chunk {index + 1} | Chars: {chunk.length}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </SectionCard>
  );
}