import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

interface SidebarContextType {
  isCollapsed: boolean;
  toggleCollapse: () => void;
  activeSection: string | null;
  setActiveSection: (section: string | null) => void;
  isPinned: boolean;
  togglePin: () => void;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export function SidebarProvider({ children }: { children: ReactNode }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [isPinned, setIsPinned] = useState(false);

  const toggleCollapse = () => {
    setIsCollapsed((prev) => !prev);
    if (!isCollapsed) {
      setActiveSection(null); // Close secondary sidebar when collapsing
    }
  };

  const togglePin = () => {
    setIsPinned((prev) => !prev);
  };

  return (
    <SidebarContext.Provider
      value={{
        isCollapsed,
        toggleCollapse,
        activeSection,
        setActiveSection,
        isPinned,
        togglePin,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebar() {
  const context = useContext(SidebarContext);
  if (context === undefined) {
    throw new Error('useSidebar must be used within a SidebarProvider');
  }
  return context;
}
