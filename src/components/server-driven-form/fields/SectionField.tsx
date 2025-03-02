
import React from 'react';
import { UISchemaField } from '@/lib/types';
import { FormField } from '../FormField';

interface SectionFieldProps {
  field: UISchemaField;
  form: any;
}

export const SectionField: React.FC<SectionFieldProps> = ({ field, form }) => {
  return (
    <div className={`mb-6 ${field.cssClass || ''}`} style={field.style || {}}>
      {field.label && <h3 className="text-base font-medium mb-2">{field.label}</h3>}
      {field.description && <p className="text-sm text-gray-500 mb-4">{field.description}</p>}
      {field.fields && field.fields.map((subField, idx) => (
        <div key={idx} className="mb-4">
          <FormField field={subField} form={form} />
        </div>
      ))}
    </div>
  );
};
