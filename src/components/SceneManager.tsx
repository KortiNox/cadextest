// TODO: Исправить ошибку типизации:
// Type '({ children }: SceneManagerProps) => string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<...> | Promise<...> | null' is not assignable to type 'FC<SceneManagerProps>'.
// Type 'string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | Promise<...> | null' is not assignable to type 'ReactElement<any, any> | null'.
// Type 'string' is not assignable to type 'ReactElement<any, any>'.ts(2322)
// Причина: Возможно, компонент children возвращает строку, число или boolean напрямую, а не ReactElement.
// Решение: Проверить компоненты Scene и UIController и убедиться, что они всегда возвращают JSX-элементы или null.

import React, { useState, ReactNode } from 'react';

interface Primitive {
  id: string;
  type: 'box' | 'pyramid';
  position: [number, number, number];
  color: string;
  size: [number, number, number];
}

interface SceneManagerProps {
  children: (props: {
    primitives: Primitive[];
    selectedPrimitiveId: string | null;
    addPrimitives: (newPrimitives: Primitive[]) => void;
    selectPrimitive: (id: string) => void;
    clearScene: () => void;
  }) => ReactNode;
}

// ошибка,посмотреть
const SceneManager: React.FC<SceneManagerProps> = ({ children }) => {
  const [primitives, setPrimitives] = useState<Primitive[]>([]);
  const [selectedPrimitiveId, setSelectedPrimitiveId] = useState<string | null>(null);

  const addPrimitives = (newPrimitives: Primitive[]) => {
    setPrimitives([...primitives, ...newPrimitives]);
  };

  const selectPrimitive = (id: string) => {
    setSelectedPrimitiveId(id);
  };

  const clearScene = () => {
    setPrimitives([]);
    setSelectedPrimitiveId(null);
  };

  const renderProps = {
    primitives,
    selectedPrimitiveId,
    addPrimitives,
    selectPrimitive,
    clearScene,
  };

  try {
    const childrenResult = children(renderProps);
    return childrenResult !== undefined ? childrenResult : null;
  } catch (error) {
    console.error('Ошибка в SceneManager:', error);
    return null;
  }
};

export default SceneManager;
