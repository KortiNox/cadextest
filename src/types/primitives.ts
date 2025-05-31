export interface Primitive {
  id: string;
  type: 'box' | 'pyramid';
  position: [number, number, number];
  color: string;
  colors?: string[]; // Массив цветов для разных сторон
  size: [number, number, number];
  groupId?: string;
  useRandomColors?: boolean;
}

export interface PrimitiveFormData {
  type: 'box' | 'pyramid';
  length: number;
  width: number;
  height: number;
  number: number;
}

export interface GroupFormData extends PrimitiveFormData {
  groupName: string;
} 