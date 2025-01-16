import { memo } from 'react';
import { EnhancedStars } from './EnhancedStars';
import { Meteors } from './Meteors';
import { Mars } from './Mars';

const BackgroundEffects = memo(function BackgroundEffects() {
  return (
    <div className="fixed inset-0 pointer-events-none">
      <div className="transform-gpu">
        <div className="relative z-0">
          <EnhancedStars />
        </div>
        <div className="relative z-10">
          <Meteors />
        </div>
        <div className="relative z-20">
          <Mars />
        </div>
      </div>
    </div>
  );
});

export default BackgroundEffects; 