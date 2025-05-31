import React from 'react';
import { Form, Input, Select } from 'antd';
import { FormInstance } from 'antd/lib/form';
import { PrimitiveFormData } from '../../types/primitives';

interface PrimitiveFormProps {
  form: FormInstance;
  isGroup?: boolean;
}

const FORM_RULES = {
  required: { required: true, message: 'This field is required' },
  number: { type: 'number' as const },
  positive: { min: 0.1, message: 'Value must be greater than 0' },
};

export const PrimitiveForm: React.FC<PrimitiveFormProps> = ({ form, isGroup }) => {
  return (
    <Form form={form} layout="vertical">
      {isGroup && (
        <Form.Item
          name="groupName"
          label="Group Name"
          rules={[FORM_RULES.required]}
        >
          <Input />
        </Form.Item>
      )}
      <Form.Item
        name="type"
        label="Type"
        rules={[FORM_RULES.required]}
      >
        <Select>
          <Select.Option value="box">Box</Select.Option>
          <Select.Option value="pyramid">Pyramid</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item
        name="length"
        label="Length"
        rules={[FORM_RULES.required, FORM_RULES.number, FORM_RULES.positive]}
      >
        <Input type="number" step="0.1" />
      </Form.Item>
      <Form.Item
        name="width"
        label="Width"
        rules={[FORM_RULES.required, FORM_RULES.number, FORM_RULES.positive]}
      >
        <Input type="number" step="0.1" />
      </Form.Item>
      <Form.Item
        name="height"
        label="Height"
        rules={[FORM_RULES.required, FORM_RULES.number, FORM_RULES.positive]}
      >
        <Input type="number" step="0.1" />
      </Form.Item>
      <Form.Item
        name="number"
        label="Number"
        rules={[FORM_RULES.required, FORM_RULES.number, { min: 1, message: 'Must be at least 1' }]}
      >
        <Input type="number" min={1} />
      </Form.Item>
    </Form>
  );
}; 