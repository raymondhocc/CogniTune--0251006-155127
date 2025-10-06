import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { SectionCard } from '../shared/SectionCard';
import { DOCUMENT_TYPES, DOMAINS } from '@/lib/constants';
import { useOptimizerStore } from '@/lib/optimizer-store';
export function PipelineConfiguration() {
  const pipelineName = useOptimizerStore((state) => state.pipelineName);
  const documentType = useOptimizerStore((state) => state.documentType);
  const domain = useOptimizerStore((state) => state.domain);
  const updateField = useOptimizerStore((state) => state.updateField);
  return (
    <SectionCard
      title="Pipeline Configuration"
      description="Define the basic settings for your RAG pipeline."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="pipeline-name">Pipeline Name</Label>
          <Input
            id="pipeline-name"
            placeholder="e.g., 'Medical Research Pipeline'"
            value={pipelineName}
            onChange={(e) => updateField('pipelineName', e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="document-type">Document Type</Label>
          <Select
            value={documentType}
            onValueChange={(value) => updateField('documentType', value)}
          >
            <SelectTrigger id="document-type">
              <SelectValue placeholder="Select document type" />
            </SelectTrigger>
            <SelectContent>
              {DOCUMENT_TYPES.map((type) => (
                <SelectItem key={type} value={type}>{type}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="domain">Domain</Label>
          <Select
            value={domain}
            onValueChange={(value) => updateField('domain', value)}
          >
            <SelectTrigger id="domain">
              <SelectValue placeholder="Select domain" />
            </SelectTrigger>
            <SelectContent>
              {DOMAINS.map((domain) => (
                <SelectItem key={domain} value={domain}>{domain}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </SectionCard>
  );
}