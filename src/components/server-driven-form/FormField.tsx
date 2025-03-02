
import React from 'react';
import { Form, Input, Select } from 'antd';
import { UISchemaField } from '@/lib/types';
import { IPListField } from './fields/IPListField';
import { HtmlField } from './fields/HtmlField';
import { SectionField } from './fields/SectionField';

interface FormFieldProps {
  field: UISchemaField;
  form: any;
}

export const FormField: React.FC<FormFieldProps> = ({ field, form }) => {
  switch (field.type) {
    case 'input':
      return (
        <Form.Item 
          name={field.name} 
          label={field.label} 
          rules={field.required ? [{ required: true, message: `${field.label} is required` }] : []}
          tooltip={field.description}
        >
          <Input placeholder={field.placeholder} />
        </Form.Item>
      );

    case 'select':
      return (
        <Form.Item 
          name={field.name} 
          label={field.label} 
          rules={field.required ? [{ required: true, message: `${field.label} is required` }] : []}
          tooltip={field.description}
        >
          <Select 
            placeholder={field.placeholder} 
            options={field.options}
            style={{ width: '100%' }}
          />
        </Form.Item>
      );

    case 'ipList':
      return <IPListField field={field} form={form} />;

    case 'html':
      return <HtmlField field={field} />;

    case 'section':
      return <SectionField field={field} form={form} />;

    case 'divider':
      return <div className={`border-t border-gray-200 my-6 ${field.cssClass || ''}`} style={field.style || {}}></div>;

    case 'space':
      return <div className={`h-${field.name || '4'} ${field.cssClass || ''}`} style={field.style || {}}></div>;

    default:
      return null;
  }
};
