import React from 'react';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { SectionCard } from '../shared/SectionCard';
import { ConfigSlider } from '../shared/ConfigSlider';
import { LLM_MODELS } from '@/lib/constants';
import { useOptimizerStore } from '@/lib/optimizer-store';
export function GenerationTuning() {
  const llmModel = useOptimizerStore((state) => state.llmModel);
  const temperature = useOptimizerStore((state) => state.temperature);
  const maxTokens = useOptimizerStore((state) => state.maxTokens);
  const systemPrompt = useOptimizerStore((state) => state.systemPrompt);
  const updateField = useOptimizerStore((state) => state.updateField);
  const setTemperature = useOptimizerStore((state) => state.setTemperature);
  const setMaxTokens = useOptimizerStore((state) => state.setMaxTokens);
  return (
    <SectionCard
      title="Generation Tuning"
      description="Fine-tune the Language Model to generate the final response."
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="llm-model">LLM Model</Label>
            <Select
              value={llmModel}
              onValueChange={(value) => updateField('llmModel', value)}
            >
              <SelectTrigger id="llm-model">
                <SelectValue placeholder="Select a model" />
              </SelectTrigger>
              <SelectContent>
                {LLM_MODELS.map((model) => (
                  <SelectItem key={model.value} value={model.value}>{model.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <ConfigSlider
            label="Temperature"
            value={temperature}
            onValueChange={setTemperature}
            min={0}
            max={2}
            step={0.1}
          />
          <ConfigSlider
            label="Max Tokens"
            value={maxTokens}
            onValueChange={setMaxTokens}
            min={64}
            max={4096}
            step={64}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="system-prompt">Custom System Prompt</Label>
          <Textarea
            id="system-prompt"
            placeholder="Enter your system prompt here..."
            className="min-h-[200px] lg:min-h-[280px]"
            value={systemPrompt}
            onChange={(e) => updateField('systemPrompt', e.target.value)}
          />
        </div>
      </div>
    </SectionCard>
  );
}