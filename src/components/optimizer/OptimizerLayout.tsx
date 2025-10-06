import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ThemeToggle } from '@/components/ThemeToggle';
import { PipelineConfiguration } from './sections/PipelineConfiguration';
import { DocumentAnalysis } from './sections/DocumentAnalysis';
import { ChunkingStrategy } from './sections/ChunkingStrategy';
import { EmbeddingModels } from './sections/EmbeddingModels';
import { RetrievalMethods } from './sections/RetrievalMethods';
import { GenerationTuning } from './sections/GenerationTuning';
import { PerformanceEvaluation } from './sections/PerformanceEvaluation';
import { Rocket, Save, Download, Upload, Loader2, Info } from 'lucide-react';
import { useOptimizerStore } from '@/lib/optimizer-store';
import { downloadJson } from '@/lib/utils';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
const TABS = [
  { value: 'config', label: '1. Pipeline', component: <PipelineConfiguration /> },
  { value: 'analysis', label: '2. Document Analysis', component: <DocumentAnalysis /> },
  { value: 'chunking', label: '3. Chunking', component: <ChunkingStrategy /> },
  { value: 'embedding', label: '4. Embedding', component: <EmbeddingModels /> },
  { value: 'retrieval', label: '5. Retrieval', component: <RetrievalMethods /> },
  { value: 'generation', label: '6. Generation', component: <GenerationTuning /> },
  { value: 'evaluation', label: '7. Evaluation', component: <PerformanceEvaluation /> },
];
export function OptimizerLayout() {
  const [activeTab, setActiveTab] = useState('config');
  const [showApiNotice, setShowApiNotice] = useState(false);
  const loadState = useOptimizerStore(state => state.loadState);
  const saveState = useOptimizerStore(state => state.saveState);
  const isEvaluating = useOptimizerStore(state => state.isEvaluating);
  const setIsEvaluating = useOptimizerStore(state => state.setIsEvaluating);
  useEffect(() => {
    const noticeShown = sessionStorage.getItem('apiNoticeShown');
    if (!noticeShown) {
      setShowApiNotice(true);
      sessionStorage.setItem('apiNoticeShown', 'true');
    }
  }, []);
  const handleRunOptimization = () => {
    setIsEvaluating(true);
    setTimeout(() => {
      setIsEvaluating(false);
      setActiveTab('evaluation');
    }, 2000);
  };
  const handleExport = () => {
    const state = useOptimizerStore.getState();
    const {
      pipelineName,
      documentType,
      domain,
      file,
      analysisResults,
      chunkingMethod,
      chunkSize,
      chunkOverlap,
      embeddingModel,
      retrievalMethod,
      topK,
      reranking,
      rerankerModel,
      rerankTopN,
      llmModel,
      temperature,
      maxTokens,
      systemPrompt,
      testQueries,
      evaluationResults,
    } = state;
    const configToExport = {
      pipelineName,
      documentType,
      domain,
      file,
      analysisResults,
      chunkingMethod,
      chunkSize,
      chunkOverlap,
      embeddingModel,
      retrievalMethod,
      topK,
      reranking,
      rerankerModel,
      rerankTopN,
      llmModel,
      temperature,
      maxTokens,
      systemPrompt,
      testQueries,
      evaluationResults,
    };
    downloadJson(configToExport, `${pipelineName.replace(/\s+/g, '_')}_config.json`);
  };
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container max-w-7xl mx-auto h-16 flex items-center justify-between px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold font-display text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-500 to-pink-500">
            CogniTune
          </h1>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" onClick={loadState}><Upload className="mr-2 h-4 w-4" /> Load</Button>
            <Button variant="outline" size="sm" onClick={saveState}><Save className="mr-2 h-4 w-4" /> Save</Button>
            <Button variant="outline" size="sm" onClick={handleExport}><Download className="mr-2 h-4 w-4" /> Export</Button>
            <ThemeToggle className="relative top-0 right-0" />
          </div>
        </div>
      </header>
      <main className="flex-1 w-full">
        <div className="container max-w-7xl mx-auto py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 mb-8">
              {TABS.map(tab => (
                <TabsTrigger key={tab.value} value={tab.value}>{tab.label}</TabsTrigger>
              ))}
            </TabsList>
            {TABS.map(tab => (
              <TabsContent key={tab.value} value={tab.value} forceMount={tab.value === activeTab || tab.value === 'evaluation' ? true : undefined}>
                {tab.component}
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </main>
      <footer className="sticky bottom-0 z-40 w-full border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container max-w-7xl mx-auto h-20 flex items-center justify-between px-4 sm:px-6 lg:px-8">
          <p className="text-sm text-muted-foreground">Built with ❤️ at Cloudflare</p>
          <Button
            size="lg"
            className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
            onClick={handleRunOptimization}
            disabled={isEvaluating}
          >
            {isEvaluating ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <Rocket className="mr-2 h-5 w-5" />}
            {isEvaluating ? 'Optimizing...' : 'Run Optimization'}
          </Button>
        </div>
      </footer>
      <Dialog open={showApiNotice} onOpenChange={setShowApiNotice}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center"><Info className="mr-2 h-5 w-5 text-blue-500" />Important Information</DialogTitle>
            <DialogDescription>
              Regarding AI Model Functionality
            </DialogDescription>
          </DialogHeader>
          <div className="py-4 text-sm text-muted-foreground space-y-4">
            <p>
              This application demonstrates full AI capabilities, but for security reasons, live API key integration is disabled in this public preview.
            </p>
            <p>
              To use your own AI provider keys (OpenAI, Cohere, etc.), you must export the application to your own GitHub repository, add your keys as environment variables, and deploy it yourself.
            </p>
            <p>
              This ensures your credentials remain secure. All functionality you see here is a complete, working simulation.
            </p>
          </div>
          <DialogFooter>
            <Button onClick={() => setShowApiNotice(false)}>I Understand</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}