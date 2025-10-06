import React from 'react';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { SectionCard } from '../shared/SectionCard';
import { EMBEDDING_MODELS } from '@/lib/constants';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Layers } from 'lucide-react';
import { useOptimizerStore } from '@/lib/optimizer-store';
export function EmbeddingModels() {
  const embeddingModel = useOptimizerStore((state) => state.embeddingModel);
  const updateField = useOptimizerStore((state) => state.updateField);
  const selectedModel = EMBEDDING_MODELS.find(m => m.value === embeddingModel) || EMBEDDING_MODELS[0];
  return (
    <SectionCard
      title="Embedding Model Selection"
      description="Choose a model to convert text chunks into numerical vectors."
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-6">
          <div className="space-y-2">
            <Label htmlFor="embedding-model">Embedding Model</Label>
            <Select
              value={selectedModel.value}
              onValueChange={(value) => updateField('embeddingModel', value)}
            >
              <SelectTrigger id="embedding-model">
                <SelectValue placeholder="Select a model" />
              </SelectTrigger>
              <SelectContent>
                {EMBEDDING_MODELS.map((model) => (
                  <SelectItem key={model.value} value={model.value}>{model.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Vector Dimensions</CardTitle>
              <Layers className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{selectedModel.dimensions}</div>
              <p className="text-xs text-muted-foreground">Dimensions per vector</p>
            </CardContent>
          </Card>
        </div>
        <div className="lg:col-span-2">
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="font-display">Similarity Matrix (Placeholder)</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center justify-center h-full min-h-64 bg-muted/50 rounded-b-lg">
              <div className="text-muted-foreground">Chart will be displayed here</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </SectionCard>
  );
}