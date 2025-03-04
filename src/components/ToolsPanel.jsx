import { HexColorPicker } from 'react-colorful';
import GridSizeSelector from './GridSizeSelector';

function ToolsPanel({ 
  currentColor, 
  setCurrentColor, 
  previousColors, 
  setPreviousColors, 
  activeTool, 
  setActiveTool, 
  gridSize,
  setGridSize,
  handleUndo,
  handleRedo,
  clearGrid,
  handleExport,
  historyIndex,
  history
}) {
  const handleColorChange = (color) => {
    setCurrentColor(color);
    // Add to previous colors if not already there
    if (!previousColors.includes(color)) {
      setPreviousColors(prev => [color, ...prev.slice(0, 4)]);
    }
  };

  return (
    <div className="tools-panel">
      <div className="panel-header">
        <h2 className="gradient-text">Tools</h2>
      </div>
      
      <div className="color-picker-container">
        <HexColorPicker color={currentColor} onChange={handleColorChange} />
        
        <div className="color-history">
          {previousColors.map((color, index) => (
            <div 
              key={index}
              className="color-swatch"
              style={{ backgroundColor: color }}
              onClick={() => setCurrentColor(color)}
            />
          ))}
        </div>
        
        <div className="current-color">
          <div 
            className="color-preview" 
            style={{ backgroundColor: currentColor }}
          />
          <input 
            type="text" 
            value={currentColor} 
            onChange={(e) => handleColorChange(e.target.value)}
          />
        </div>
      </div>
      
      <div className="tools-section">
        <h3>Drawing Tools</h3>
        <div className="tools">
          <button 
            className={`tool-btn ${activeTool === 'pencil' ? 'active' : ''}`}
            onClick={() => setActiveTool('pencil')}
            data-tooltip="Pencil"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"></path>
            </svg>
          </button>
          
          <button 
            className={`tool-btn ${activeTool === 'eraser' ? 'active' : ''}`}
            onClick={() => setActiveTool('eraser')}
            data-tooltip="Eraser"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m7 21-4.3-4.3c-1-1-1-2.5 0-3.4l9.6-9.6c1-1 2.5-1 3.4 0l5.6 5.6c1 1 1 2.5 0 3.4L13 21"></path>
              <path d="M22 21H7"></path>
              <path d="m5 11 9 9"></path>
            </svg>
          </button>
          
          <button 
            className={`tool-btn ${activeTool === 'fill' ? 'active' : ''}`}
            onClick={() => setActiveTool('fill')}
            data-tooltip="Fill"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m19 11-8-8-8.6 8.6a2 2 0 0 0 0 2.8l5.2 5.2c.8.8 2 .8 2.8 0L19 11Z"></path>
              <path d="m5 2 5 5"></path>
              <path d="M2 13h15"></path>
              <path d="M22 20a2 2 0 1 1-4 0c0-1.6 1.7-2.4 2-4 .3 1.6 2 2.4 2 4Z"></path>
            </svg>
          </button>
          
          <button 
            className={`tool-btn ${activeTool === 'eyedropper' ? 'active' : ''}`}
            onClick={() => setActiveTool('eyedropper')}
            data-tooltip="Color Picker"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m2 22 1-1h3l9-9"></path>
              <path d="M3 21v-3l9-9"></path>
              <path d="m15 6 3.5-3.5a2.12 2.12 0 0 1 3 3L18 9"></path>
              <path d="m15 6-6 6"></path>
              <path d="m16 16 6-6"></path>
            </svg>
          </button>
        </div>
      </div>
      
      <GridSizeSelector 
        gridSize={gridSize}
        setGridSize={setGridSize}
      />
      
      <div className="action-section">
        <h3>Actions</h3>
        <div className="action-buttons">
          <button 
            onClick={handleUndo} 
            disabled={historyIndex <= 0}
            data-tooltip="Undo"
            className="action-btn"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 7v6h6"></path>
              <path d="M3 13c0-4.4 3.6-8 8-8h10"></path>
            </svg>
            Undo
          </button>
          
          <button 
            onClick={handleRedo} 
            disabled={historyIndex >= history.length - 1}
            data-tooltip="Redo"
            className="action-btn"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 7v6h-6"></path>
              <path d="M21 13c0-4.4-3.6-8-8-8H3"></path>
            </svg>
            Redo
          </button>
          
          <button 
            onClick={clearGrid} 
            data-tooltip="Clear Grid"
            className="action-btn"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 6h18"></path>
              <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
              <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
              <line x1="10" y1="11" x2="10" y2="17"></line>
              <line x1="14" y1="11" x2="14" y2="17"></line>
            </svg>
            Clear
          </button>
          
          <button 
            onClick={handleExport} 
            data-tooltip="Export as PNG"
            className="action-btn export-btn"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="7 10 12 15 17 10"></polyline>
              <line x1="12" y1="15" x2="12" y2="3"></line>
            </svg>
            Export
          </button>
        </div>
      </div>
    </div>
  );
}

export default ToolsPanel;