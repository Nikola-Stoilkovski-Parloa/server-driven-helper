
import React from 'react';
import { Form } from 'antd';
import { UISchema } from '@/lib/types';
import { FormHeader } from './FormHeader';
import { FormField } from './FormField';
import { FormActions } from './FormActions';

interface ServerDrivenFormProps {
  schema: UISchema;
  onSubmit?: (values: any) => void;
}

const ServerDrivenForm: React.FC<ServerDrivenFormProps> = ({ schema, onSubmit }) => {
  const [form] = Form.useForm();

  const handleSubmit = (values: any) => {
    if (onSubmit) {
      // Clean up empty values from IP list
      if (values.whitelistedIps) {
        values.whitelistedIps = values.whitelistedIps.filter((ip: string) => ip.trim() !== '');
      }
      onSubmit(values);
    }
  };

  // Get form layout configuration
  const getFormConfig = () => {
    return {
      layout: schema.form?.layout || 'vertical',
      className: `animate-slideIn ${schema.form?.cssClass || ''}`,
      style: schema.form?.style || {},
      validateTrigger: schema.form?.validateTrigger || ['onBlur', 'onChange']
    };
  };

  // Get container configuration
  const getContainerConfig = () => {
    return {
      className: schema.container?.cssClass || 'form-container',
      style: schema.container?.style || {}
    };
  };

  return (
    <div {...getContainerConfig()}>
      <FormHeader schema={schema} />
      
      <Form
        form={form}
        {...getFormConfig()}
        onFinish={handleSubmit}
        requiredMark
      >
        {schema.fields.map((field, index) => (
          <div key={index} className="mb-6">
            <FormField field={field} form={form} />
          </div>
        ))}
        
        <FormActions actions={schema.actions || []} form={form} />
      </Form>
    </div>
  );
};

export default ServerDrivenForm;
