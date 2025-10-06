import React from 'react';
import { UploadCloud, FileText, Loader2 } from 'lucide-react';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SectionCard } from '../shared/SectionCard';
import { MOCK_ANALYSIS_DATA } from '@/lib/constants';
import { Skeleton } from '@/components/ui/skeleton';
import { useOptimizerStore } from '@/lib/optimizer-store';
const chartData = [
  { name: 'Flesch Reading Ease', value: MOCK_ANALYSIS_DATA.fleschReadingEase, fill: 'var(--color-flesch)' },
  { name: 'SMOG Index', value: MOCK_ANALYSIS_DATA.smogIndex, fill: 'var(--color-smog)' },
];
export function DocumentAnalysis() {
  const file = useOptimizerStore((state) => state.file);
  const analysisResults = useOptimizerStore((state) => state.analysisResults);
  const updateField = useOptimizerStore((state) => state.updateField);
  const isAnalyzing = file && !analysisResults;
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = event.target.files?.[0];
    if (uploadedFile) {
      updateField('file', {
        name: uploadedFile.name,
        type: uploadedFile.type,
        size: uploadedFile.size,
      });
      updateField('analysisResults', null); // Set to null to indicate loading
      // Simulate analysis delay
      setTimeout(() => {
        updateField('analysisResults', MOCK_ANALYSIS_DATA);
      }, 1500);
    }
  };
  return (
    <SectionCard
      title="Document Analysis"
      description="Upload a sample document to analyze its characteristics and get optimization recommendations."
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-6">
          <div className="relative border-2 border-dashed border-border rounded-lg p-8 flex flex-col items-center justify-center text-center h-48 hover:border-primary transition-colors duration-200">
            <UploadCloud className="h-12 w-12 text-muted-foreground" />
            <p className="mt-4 text-sm text-muted-foreground">
              Drag & drop a file here or <span className="font-semibold text-primary">click to upload</span>
            </p>
            <input type="file" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" onChange={handleFileChange} />
          </div>
          {file && (
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Uploaded File</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-lg font-bold truncate">{file.name}</div>
                <p className="text-xs text-muted-foreground">{`${(file.size / 1024 / 1024).toFixed(2)} MB`}</p>
              </CardContent>
            </Card>
          )}
        </div>
        <div className="lg:col-span-2 grid grid-cols-2 md:grid-cols-3 gap-4">
          <StatCard title="Word Count" value={analysisResults?.wordCount.toLocaleString()} isLoading={isAnalyzing} />
          <StatCard title="Character Count" value={analysisResults?.charCount.toLocaleString()} isLoading={isAnalyzing} />
          <StatCard title="Sentence Count" value={analysisResults?.sentenceCount.toLocaleString()} isLoading={isAnalyzing} />
          <StatCard title="Flesch Reading Ease" value={analysisResults?.fleschReadingEase.toString()} description="Higher is easier" isLoading={isAnalyzing} />
          <StatCard title="SMOG Index" value={analysisResults?.smogIndex.toString()} description="Years of education needed" isLoading={isAnalyzing} />
        </div>
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle className="font-display">Readability Visualization</CardTitle>
          </CardHeader>
          <CardContent className="h-64">
            <style>{`:root { --color-flesch: hsl(var(--chart-1)); --color-smog: hsl(var(--chart-2)); }`}</style>
            {isAnalyzing ? (
              <div className="flex items-center justify-center h-full"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
            ) : analysisResults ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} layout="vertical" margin={{ left: 30 }}>
                  <XAxis type="number" hide />
                  <YAxis type="category" dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} width={150} />
                  <Tooltip cursor={{ fill: 'hsl(var(--muted) / 0.3)' }} contentStyle={{ backgroundColor: 'hsl(var(--background))', border: '1px solid hsl(var(--border))' }} />
                  <Bar dataKey="value" radius={[4, 4, 4, 4]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-full text-muted-foreground">Upload a document to see analysis.</div>
            )}
          </CardContent>
        </Card>
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle className="font-display">Automatic Recommendations</CardTitle>
          </CardHeader>
          <CardContent>
            {isAnalyzing ? (
              <div className="space-y-2">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
              </div>
            ) : analysisResults ? (
              <ul className="space-y-2 list-disc list-inside text-muted-foreground">
                {analysisResults.recommendations.map((rec, i) => <li key={i}>{rec}</li>)}
              </ul>
            ) : (
              <div className="text-sm text-muted-foreground">Recommendations will appear here after analysis.</div>
            )}
          </CardContent>
        </Card>
      </div>
    </SectionCard>
  );
}
function StatCard({ title, value, description, isLoading }: { title: string; value?: string; description?: string; isLoading: boolean }) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <Skeleton className="h-8 w-1/2" />
        ) : (
          <div className="text-2xl font-bold">{value || '-'}</div>
        )}
        {description && <p className="text-xs text-muted-foreground mt-1">{description}</p>}
      </CardContent>
    </Card>
  );
}