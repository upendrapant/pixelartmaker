import { useRef } from 'react';

function PixelGrid({ 
  grid, 
  gridSize, 
  activeTool, 
  currentColor, 
  handlePixelClick, 
  gridRef 
}) {
  const isDrawing = useRef(false);
  const lastPixel = useRef(null);
  
  const handleMouseDown = (rowIndex, colIndex) => {
    isDrawing.current = true;
    lastPixel.current = { row: rowIndex, col: colIndex };
    handlePixelClick(rowIndex, colIndex);
  };
  
  const handleMouseUp = () => {
    isDrawing.current = false;
    lastPixel.current = null;
  };
  
  const handleMouseEnter = (rowIndex, colIndex) => {
    if (!isDrawing.current || activeTool === 'fill') return;
    
    // If we're drawing with pencil or eraser, continue the action
    handlePixelClick(rowIndex, colIndex);
  };

  return (
    <div 
      className="pixel-grid" 
      ref={gridRef}
      style={{
        gridTemplateRows: `repeat(${gridSize.rows}, 1fr)`,
        gridTemplateColumns: `repeat(${gridSize.cols}, 1fr)`
      }}
      onMouseLeave={handleMouseUp}
    >
      {grid.map((row, rowIndex) => 
        row.map((cell, colIndex) => (
          <div 
            key={`${rowIndex}-${colIndex}`}
            className="pixel"
            style={{ backgroundColor: cell || 'transparent' }}
            onMouseDown={() => handleMouseDown(rowIndex, colIndex)}
            onMouseUp={handleMouseUp}
            onMouseEnter={() => handleMouseEnter(rowIndex, colIndex)}
          />
        ))
      )}
    </div>
  );
}

export default PixelGrid;