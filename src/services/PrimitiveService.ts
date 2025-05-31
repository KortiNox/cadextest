import { Primitive, PrimitiveFormData, GroupFormData } from '../types/primitives';
import { SCENE_CONSTANTS } from '../constants/scene';

export class PrimitiveService {
  static createPrimitive(
    formData: PrimitiveFormData, 
    useRandomColors: boolean = false,
    existingPrimitives: Primitive[] = []
  ): Primitive {
    const colors = useRandomColors 
      ? Array(formData.type === 'box' ? 6 : 5)
          .fill(null)
          .map(() => this.generateRandomColor())
      : [this.generateRandomColor()];

    const position = this.generateNonOverlappingPosition(
      existingPrimitives,
      [formData.length, formData.width, formData.height]
    );

    return {
      id: this.generateId(),
      type: formData.type,
      position,
      color: colors[0],
      colors: useRandomColors ? colors : undefined,
      size: [formData.length, formData.width, formData.height],
      useRandomColors,
    };
  }

  static createPrimitiveGroup(
    formData: GroupFormData,
    existingPrimitives: Primitive[]
  ): { primitives: Primitive[]; groupId: string } {
    const groupId = this.generateId();
    const primitives: Primitive[] = [];

    for (let i = 0; i < formData.number; i++) {
      const newPrimitive = this.createPrimitive(
        formData,
        true,
        [...existingPrimitives, ...primitives]
      );
      primitives.push({
        ...newPrimitive,
        groupId,
      });
    }

    return { primitives, groupId };
  }

  private static generateId(): string {
    return Math.random().toString(36).substring(2, 15);
  }

  private static generateNonOverlappingPosition(
    existingPrimitives: Primitive[],
    size: [number, number, number]
  ): [number, number, number] {
    const maxAttempts = 100;
    let attempts = 0;
    
    while (attempts < maxAttempts) {
      const position = this.generateRandomPosition();
      
      const hasOverlap = existingPrimitives.some(primitive => {
        const dx = Math.abs(position[0] - primitive.position[0]);
        const dy = Math.abs(position[1] - primitive.position[1]);
        const dz = Math.abs(position[2] - primitive.position[2]);

        const minDistanceX = (size[0] + primitive.size[0]) / 2 + SCENE_CONSTANTS.SPACING.MIN_DISTANCE;
        const minDistanceY = (size[1] + primitive.size[1]) / 2 + SCENE_CONSTANTS.SPACING.MIN_DISTANCE;
        const minDistanceZ = (size[2] + primitive.size[2]) / 2 + SCENE_CONSTANTS.SPACING.MIN_DISTANCE;

        return dx < minDistanceX && dy < minDistanceY && dz < minDistanceZ;
      });

      if (!hasOverlap) {
        return position;
      }

      attempts++;
    }

    return this.generateRandomPosition(SCENE_CONSTANTS.BOUNDS.EXPANDED);
  }

  private static generateRandomPosition(scale: number = SCENE_CONSTANTS.BOUNDS.DEFAULT): [number, number, number] {
    return [
      (Math.random() - 0.5) * scale,
      (Math.random() - 0.5) * scale,
      (Math.random() - 0.5) * scale,
    ];
  }

  private static generateRandomColor(): string {
    return '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
  }
} 