export const SCENE_CONSTANTS = {
  BOUNDS: {
    DEFAULT: 10,
    EXPANDED: 15,
  },
  SPACING: {
    MIN_DISTANCE: 3,
  },
  CAMERA: {
    POSITION: [15, 15, 15] as [number, number, number],
    FOV: 50,
    NEAR: 0.1,
    FAR: 1000,
    CONTROLS: {
      MIN_DISTANCE: 5,
      MAX_DISTANCE: 50,
      DAMPING: true,
      DAMPING_FACTOR: 0.05,
      ROTATE_SPEED: 0.5,
    },
  },
  ANIMATION: {
    PULSE: {
      SPEED: 10,
      INTENSITY: 0.1,
    },
  },
  LIGHTING: {
    AMBIENT: {
      INTENSITY: 1.5,
    },
    DIRECTIONAL: {
      POSITION: [2, 2, 2] as [number, number, number],
      INTENSITY: 1,
    },
  },
  GRID: {
    SIZE: 20,
    DIVISIONS: 20,
    COLOR: 'gray',
  },
  AXES: {
    SIZE: 5,
  },
}; 