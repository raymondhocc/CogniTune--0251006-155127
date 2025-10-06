import React, { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SectionCard } from '../shared/SectionCard';
import { useOptimizerStore } from '@/lib/optimizer-store';
import { cn, generateMockMetrics } from '@/lib/utils';
import { ArrowUp, ArrowDown, Minus, Loader2 } from 'lucide-react';
import type { PerformanceMetricStatus } from '@/lib/constants';
const statusStyles: Record<PerformanceMetricStatus, string> = {
  success: 'bg-green-500',
  warning: 'bg-yellow-500',
  danger: 'bg-red-500',
};
export function PerformanceEvaluation() {
  // CRITICAL FIX: Select primitives individually to prevent re-renders.
  // This provides stable references and fixes the "Maximum update depth exceeded" error.
  const chunkSize = useOptimizerStore((state) => state.chunkSize);
  const embeddingModel = useOptimizerStore((state) => state.embeddingModel);
  const llmModel = useOptimizerStore((state) => state.llmModel);
  const reranking = useOptimizerStore((state) => state.reranking);
  const isEvaluating = useOptimizerStore((state) => state.isEvaluating);
  const performanceMetrics = useMemo(() => generateMockMetrics({
    chunkSize,
    embeddingModel,
    llmModel,
    reranking,
  }), [chunkSize, embeddingModel, llmModel, reranking]);
  const recommendations = useMemo(() => {
    const recs = [];
    const latencyMetric = performanceMetrics.find(m => m.name.includes('Latency'));
    const hitRateMetric = performanceMetrics.find(m => m.name.includes('Hit Rate'));
    if (latencyMetric?.status === 'danger') {
      recs.push(`Latency is high. Consider using a smaller, faster LLM like GPT-3.5 Turbo or reducing the re-ranker's Top-N.`);
    }
    if (hitRateMetric?.status === 'warning' || hitRateMetric?.status === 'danger') {
      recs.push(`Hit Rate is below target. Try increasing Top-K for retrieval or using a more powerful embedding model.`);
    }
    if (recs.length === 0) {
      recs.push('Overall performance is strong. The current configuration is well-balanced.');
    }
    return recs;
  }, [performanceMetrics]);
  if (isEvaluating) {
    return (
      <SectionCard
        title="Performance Evaluation"
        description="Running optimization test..."
      >
        <div className="flex flex-col items-center justify-center min-h-[400px] text-muted-foreground">
          <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
          <p className="text-lg font-medium">Analyzing performance metrics...</p>
          <p>This will just take a moment.</p>
        </div>
      </SectionCard>
    );
  }
  return (
    <SectionCard
      title="Performance Evaluation"
      description="Review the performance metrics of your pipeline configuration after running an optimization test."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {performanceMetrics.map((metric) => (
          <MetricCard key={metric.name} {...metric} />
        ))}
      </div>
      <div className="mt-8">
        <Card>
          <CardHeader>
            <CardTitle className="font-display">Optimization Recommendations</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 list-disc list-inside text-muted-foreground">
              {recommendations.map((rec, i) => <li key={i}>{rec}</li>)}
            </ul>
          </CardContent>
        </Card>
      </div>
    </SectionCard>
  );
}
interface MetricCardProps {
  name: string;
  value: string;
  target: string;
  status: PerformanceMetricStatus;
}
function MetricCard({ name, value, target, status }: MetricCardProps) {
  const getTrendIcon = () => {
    if (status === 'success') return <ArrowUp className="h-4 w-4 text-green-500" />;
    if (status === 'warning') return <Minus className="h-4 w-4 text-yellow-500" />;
    return <ArrowDown className="h-4 w-4 text-red-500" />;
  };
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{name}</CardTitle>
        <div className={cn("h-2 w-2 rounded-full", statusStyles[status])} />
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold">{value}</div>
        <div className="flex items-center text-xs text-muted-foreground">
          {getTrendIcon()}
          <span className="ml-1">Target: {target}</span>
        </div>
      </CardContent>
    </Card>
  );
}