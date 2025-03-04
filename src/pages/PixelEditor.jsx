import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { toPng } from 'html-to-image';
import { saveAs } from 'file-saver';

// Components
import Header from '../components/Header';
import ToolsPanel from '../components/ToolsPanel';
import PixelGrid from '../components/PixelGrid';
import Footer from '../components/Footer';
import SettingsModal from '../components/SettingsModal';

function PixelEditor({ onLogout }) {
  // State for grid dimensions
  const [gridSize, setGridSize] = useState({ rows: 16, cols: 16 });
  
  // State for pixel grid
  const [grid, setGrid] = useState([]);
  
  // State for color and tools
  const [currentColor, setCurrentColor] = useState('#6366F1');
  const [previousColors, setPreviousColors] = useState(['#6366F1', '#EF4444', '#10B981', '#F59E0B', '#EC4899']);
  const [activeTool, setActiveTool] = useState('pencil');
  
  // State for history (undo/redo)
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  
  // State for settings
  const [theme, setTheme] = useState('dark');
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  
  // Refs
  const gridRef = useRef(null);
  
  // Initialize grid
  useEffect(() => {
    initializeGrid();
  }, [gridSize]);
  
  // Add to history when grid changes
  useEffect(() => {
    if (grid.length > 0) {
      // Only add to history if it's a new action (not from undo/redo)
      if (historyIndex === history.length - 1) {
        setHistory(prev => [...prev.slice(0, historyIndex + 1), [...grid]]);
        setHistoryIndex(prev => prev + 1);
      }
    }
  }, [grid]);
  
  const initializeGrid = () => {
    const newGrid = Array(gridSize.rows).fill().map(() => 
      Array(gridSize.cols).fill(null)
    );
    setGrid(newGrid);
    // Reset history when creating a new grid
    setHistory([[...newGrid]]);
    setHistoryIndex(0);
  };
  
  const handlePixelClick = (rowIndex, colIndex) => {
    if (activeTool === 'eyedropper') {
      const pixelColor = grid[rowIndex][colIndex];
      if (pixelColor) {
        setCurrentColor(pixelColor);
        setActiveTool('pencil');
      }
      return;
    }
    
    const newGrid = [...grid];
    
    if (activeTool === 'fill') {
      const targetColor = grid[rowIndex][colIndex];
      fillArea(newGrid, rowIndex, colIndex, targetColor, currentColor);
    } else {
      // For pencil or eraser
      newGrid[rowIndex][colIndex] = activeTool === 'eraser' ? null : currentColor;
    }
    
    setGrid(newGrid);
  };
  
  const fillArea = (grid, row, col, targetColor, replacementColor) => {
    // If target is already the replacement color, return
    if (targetColor === replacementColor) return;
    
    const stack = [{row, col}];
    
    while (stack.length > 0) {
      const {row, col} = stack.pop();
      
      // Check if this pixel is valid and has the target color
      if (
        row < 0 || row >= gridSize.rows || 
        col < 0 || col >= gridSize.cols || 
        grid[row][col] !== targetColor
      ) {
        continue;
      }
      
      // Replace the color
      grid[row][col] = replacementColor;
      
      // Add adjacent pixels to stack
      stack.push({row: row + 1, col});
      stack.push({row: row - 1, col});
      stack.push({row, col: col + 1});
      stack.push({row, col: col - 1});
    }
  };
  
  const handleUndo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(prev => prev - 1);
      setGrid([...history[historyIndex - 1]]);
    }
  };
  
  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(prev => prev + 1);
      setGrid([...history[historyIndex + 1]]);
    }
  };
  
  const handleExport = async () => {
    if (gridRef.current) {
      try {
        const dataUrl = await toPng(gridRef.current, { 
          pixelRatio: 3,
          backgroundColor: '#0A0A0A'
        });
        saveAs(dataUrl, 'pixel-art.png');
      } catch (error) {
        console.error('Error exporting image:', error);
      }
    }
  };
  
  const clearGrid = () => {
    const newGrid = Array(gridSize.rows).fill().map(() => 
      Array(gridSize.cols).fill(null)
    );
    setGrid(newGrid);
  };

  return (
    <div className={`app-container ${theme}`}>
      <div className="editor-gradient-bg">
        <Header onLogout={onLogout} />
        
        <main className="editor-main">
          <motion.div 
            className="tools-panel-container"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <ToolsPanel 
              currentColor={currentColor}
              setCurrentColor={setCurrentColor}
              previousColors={previousColors}
              setPreviousColors={setPreviousColors}
              activeTool={activeTool}
              setActiveTool={setActiveTool}
              gridSize={gridSize}
              setGridSize={setGridSize}
              handleUndo={handleUndo}
              handleRedo={handleRedo}
              clearGrid={clearGrid}
              handleExport={handleExport}
              historyIndex={historyIndex}
              history={history}
            />
          </motion.div>
          
          <motion.div 
            className="grid-container"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <PixelGrid 
              grid={grid}
              gridSize={gridSize}
              activeTool={activeTool}
              currentColor={currentColor}
              handlePixelClick={handlePixelClick}
              gridRef={gridRef}
            />
          </motion.div>
        </main>
        
        <Footer />
        
        <SettingsModal 
          isOpen={showSettingsModal}
          onClose={() => setShowSettingsModal(false)}
          theme={theme}
          setTheme={setTheme}
        />
        
        <button 
          className="settings-button"
          onClick={() => setShowSettingsModal(true)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path>
            <circle cx="12" cy="12" r="3"></circle>
          </svg>
        </button>
      </div>
    </div>
  );
}

export default PixelEditor;