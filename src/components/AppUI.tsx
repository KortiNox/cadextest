// src/components/AppUI.tsx
import React, { useState } from 'react';
import { Button, Space, Modal, Form } from 'antd';
import { PrimitiveList } from './primitives/PrimitiveList';
import { PrimitiveForm } from './forms/PrimitiveForm';
import { PrimitiveService } from '../services/PrimitiveService';
import { Primitive, PrimitiveFormData, GroupFormData } from '../types/primitives';

interface UIControllerProps {
  primitives: Primitive[];
  selectedPrimitiveId: string | null;
  addPrimitives: (newPrimitives: Primitive[]) => void;
  selectPrimitive: (id: string) => void;
  clearScene: () => void;
}

const UIController: React.FC<UIControllerProps> = ({
  primitives,
  selectedPrimitiveId,
  addPrimitives,
  selectPrimitive,
  clearScene,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isGroupModalOpen, setIsGroupModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [groupForm] = Form.useForm();
  const [groups, setGroups] = useState<{ [groupId: string]: string }>({});

  const handleAddPrimitive = () => setIsModalOpen(true);
  const handleAddGroup = () => setIsGroupModalOpen(true);

  const handleGroupModalOk = async () => {
    try {
      const values = await groupForm.validateFields() as GroupFormData;
      const { primitives: newPrimitives, groupId } = PrimitiveService.createPrimitiveGroup(values, primitives);
      setGroups({ ...groups, [groupId]: values.groupName });
      addPrimitives(newPrimitives);
      setIsGroupModalOpen(false);
      groupForm.resetFields();
    } catch (info) {
      console.log('Validate Failed:', info);
    }
  };

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields() as PrimitiveFormData;
      const newPrimitives = Array.from({ length: values.number }, (_, index) => 
        PrimitiveService.createPrimitive(values, false, [...primitives].slice(0, index))
      );
      addPrimitives(newPrimitives);
      setIsModalOpen(false);
      form.resetFields();
    } catch (info) {
      console.log('Validate Failed:', info);
    }
  };

  return (
    <div style={{ width: '30%', padding: '20px' }}>
      <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
        <Button type="primary" onClick={handleAddPrimitive}>
          Add Primitive
        </Button>

        <Button type="primary" onClick={handleAddGroup}>
          Add Group
        </Button>

        <PrimitiveList
          primitives={primitives}
          selectedPrimitiveId={selectedPrimitiveId}
          selectPrimitive={selectPrimitive}
          groups={groups}
        />

        <Button onClick={clearScene}>Clear Scene</Button>
      </Space>

      <Modal
        title="Add Primitive"
        open={isModalOpen}
        onOk={handleModalOk}
        onCancel={() => setIsModalOpen(false)}
      >
        <PrimitiveForm form={form} />
      </Modal>

      <Modal
        title="Add Group"
        open={isGroupModalOpen}
        onOk={handleGroupModalOk}
        onCancel={() => setIsGroupModalOpen(false)}
      >
        <PrimitiveForm form={groupForm} isGroup />
      </Modal>
    </div>
  );
};

export default UIController;
