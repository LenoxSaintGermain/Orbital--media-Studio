import React from 'react';
import { Sidebar } from './components/layout/Sidebar';
import { TopBar } from './components/layout/TopBar';
import { AgentPanel } from './components/workspace/AgentPanel';
import { PageCanvas } from './components/canvas/PageCanvas';
import { Feed } from './components/workspace/Feed';
import { BibleDashboard } from './components/studio/BibleDashboard';
import { BottomDock } from './components/workspace/BottomDock';
import { useAppStore } from './stores/appStore';

const App: React.FC = () => {
  const { ui } = useAppStore();

  const renderMainContent = () => {
      switch (ui.mode) {
          case 'create':
              return <Feed />;
          case 'refine':
              return <BibleDashboard />;
          case 'compose':
              return <PageCanvas />;
          default:
              return <Feed />;
      }
  };

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-neutral-950 text-neutral-100 font-sans">
      <TopBar />
      <div className="flex flex-1 overflow-hidden relative">
        <Sidebar />
        
        <main className="flex-1 flex flex-col relative overflow-hidden bg-neutral-900/50">
            {/* Main Content Area Swaps based on Mode */}
            {renderMainContent()}
            
            {/* Bottom Dock is hidden in Refine mode to focus on form, visible in Create */}
            {ui.mode === 'create' && <BottomDock />}
        </main>
        
        <AgentPanel />
      </div>
    </div>
  );
};

export default App;