import { motion, useAnimation, useMotionValue } from 'motion/react';
import { useState } from 'react';

const ITEM_HEIGHT = 40;

const VISIBLE_ITEMS = 5;

export const FlatWheelPicker = ({ options, onChange }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const containerHeight = ITEM_HEIGHT * VISIBLE_ITEMS;
  const padding = (containerHeight - ITEM_HEIGHT) / 2;
  
  const controls = useAnimation();
  const y = useMotionValue(0);

  const handleDragEnd = (_, info) => {
    // Calculate which item is closest to the center based on scroll offset
    const currentY = y.get();
    const exactIndex = -currentY / ITEM_HEIGHT;
    const targetIndex = Math.max(0, Math.min(options.length - 1, Math.round(exactIndex)));

    // Snap to the closest item
    controls.start({
      y: -targetIndex * ITEM_HEIGHT,
      transition: { type: "spring", stiffness: 300, damping: 30 }
    });

    setSelectedIndex(targetIndex);
    onChange?.(options[targetIndex]);
  };

  return (
    <div 
      style={{ 
        height: containerHeight, 
        overflow: 'hidden', 
        position: 'relative',
        background: '#f4f4f4',
        width: '200px',
        borderRadius: '8px'
      }}
    >
      {/* Center Highlight Overlay */}
      <div style={{
        position: 'absolute',
        top: padding,
        left: 0,
        right: 0,
        height: ITEM_HEIGHT,
        borderTop: '1px solid #ddd',
        borderBottom: '1px solid #ddd',
        pointerEvents: 'none',
        backgroundColor: 'rgba(0,0,0,0.02)'
      }} />

      <motion.div
        drag="y"
        dragConstraints={{ 
          top: -((options.length - 1) * ITEM_HEIGHT), 
          bottom: 0 
        }}
        animate={controls}
        style={{ y, paddingTop: padding, paddingBottom: padding }}
        onDragEnd={handleDragEnd}
      >
        {options.map((option, i) => (
          <div
            key={i}
            style={{
              height: ITEM_HEIGHT,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '16px',
              color: selectedIndex === i ? '#000' : '#888',
              fontWeight: selectedIndex === i ? 'bold' : 'normal',
              transition: 'color 0.2s'
            }}
          >
            {option.label}
          </div>
        ))}
      </motion.div>
    </div>
  );
};