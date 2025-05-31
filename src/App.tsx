// src/App.tsx
import React from 'react';
import Scene from './components/Scene';
import UIController from './components/AppUI';
import SceneManager from './components/SceneManager';

const App: React.FC = () => {
  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <SceneManager>
        {({ primitives, selectedPrimitiveId, addPrimitives, selectPrimitive, clearScene }) => (
          <>
            <Scene 
              primitives={primitives} 
              selectedPrimitiveId={selectedPrimitiveId}
              selectPrimitive={selectPrimitive}
            />
            <UIController
              primitives={primitives}
              selectedPrimitiveId={selectedPrimitiveId}
              addPrimitives={addPrimitives}
              selectPrimitive={selectPrimitive}
              clearScene={clearScene}
            />
          </>
        )}
      </SceneManager>
    </div>
  );
};

export default App;
