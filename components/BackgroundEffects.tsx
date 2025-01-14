import { memo } from 'react';
import { StarField } from './StarField';
import { Meteors } from './Meteors';
import { Mars } from './Mars';

const BackgroundEffects = memo(function BackgroundEffects() {
  return (
    <div className="fixed inset-0 pointer-events-none">
      <div className="transform-gpu">
        <StarField /> 
        <Meteors /> 
        <Mars />
      </div>
    </div>
  );
});

export default BackgroundEffects; 