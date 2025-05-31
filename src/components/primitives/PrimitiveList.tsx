import React from 'react';
import { List } from 'antd';
import { Primitive } from '../../types/primitives';

interface PrimitiveListProps {
  primitives: Primitive[];
  selectedPrimitiveId: string | null;
  selectPrimitive: (id: string) => void;
  groups: { [groupId: string]: string };
}

export const PrimitiveList: React.FC<PrimitiveListProps> = ({
  primitives,
  selectedPrimitiveId,
  selectPrimitive,
  groups,
}) => {
  return (
    <List
      header={<div>Primitives</div>}
      bordered
      dataSource={primitives}
      renderItem={(item) => (
        <List.Item
          style={{
            backgroundColor: item.id === selectedPrimitiveId ? 'lightblue' : 'white',
            cursor: 'pointer',
          }}
          onClick={() => selectPrimitive(item.id)}
        >
          {`${item.type} - Position: ${item.position[0].toFixed(2)}, ${item.position[1].toFixed(
            2,
          )}, ${item.position[2].toFixed(2)} - Group: ${
            item.groupId ? groups[item.groupId] : 'None'
          } -`}
          <div
            style={{
              width: '20px',
              height: '20px',
              backgroundColor: item.color,
              border: '1px solid #ccc',
              display: 'inline-block',
            }}
          />
        </List.Item>
      )}
    />
  );
}; 