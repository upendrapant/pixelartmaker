import { useState } from 'react';
import { motion } from 'framer-motion';

function GridSizeSelector({ gridSize, setGridSize }) {
  const [isOpen, setIsOpen] = useState(false);
  const presetSizes = [
    { name: '8×8', rows: 8, cols: 8 },
    { name: '16×16', rows: 16, cols: 16 },
    { name: '32×32', rows: 32, cols: 32 },
    { name: '64×64', rows: 64, cols: 64 }
  ];
  
  const [customSize, setCustomSize] = useState({ rows: gridSize.rows, cols: gridSize.cols });

  const handlePresetSelect = (preset) => {
    setGridSize(preset);
    setCustomSize(preset);
    setIsOpen(false);
  };

  const handleCustomSizeChange = (e, field) => {
    const value = parseInt(e.target.value) || 1;
    setCustomSize({
      ...customSize,
      [field]: Math.min(Math.max(value, 1), 64) // Clamp between 1 and 64
    });
  };

  const applyCustomSize = () => {
    setGridSize(customSize);
    setIsOpen(false);
  };

  return (
    <div className="grid-size-selector">
      <div className="grid-size-display" onClick={() => setIsOpen(!isOpen)}>
        <h3>Grid Size</h3>
        <div className="current-grid-size">
          <span>{gridSize.rows} × {gridSize.cols}</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d={isOpen ? "M18 15l-6-6-6 6" : "M6 9l6 6 6-6"} />
          </svg>
        </div>
      </div>
      
      {isOpen && (
        <motion.div 
          className="grid-size-dropdown"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          <div className="preset-sizes">
            <h4>Presets</h4>
            <div className="preset-buttons">
              {presetSizes.map((preset) => (
                <button 
                  key={preset.name}
                  className={`preset-btn ${gridSize.rows === preset.rows && gridSize.cols === preset.cols ? 'active' : ''}`}
                  onClick={() => handlePresetSelect(preset)}
                >
                  {preset.name}
                </button>
              ))}
            </div>
          </div>
          
          <div className="custom-size">
            <h4>Custom Size</h4>
            <div className="custom-size-inputs">
              <div className="input-group">
                <label>Rows:</label>
                <input 
                  type="number" 
                  min="1" 
                  max="64" 
                  value={customSize.rows} 
                  onChange={(e) => handleCustomSizeChange(e, 'rows')}
                />
              </div>
              <div className="input-group">
                <label>Columns:</label>
                <input 
                  type="number" 
                  min="1" 
                  max="64" 
                  value={customSize.cols} 
                  onChange={(e) => handleCustomSizeChange(e, 'cols')}
                />
              </div>
            </div>
            <button className="apply-btn" onClick={applyCustomSize}>Apply Custom Size</button>
          </div>
        </motion.div>
      )}
    </div>
  );
}

export default GridSizeSelector;