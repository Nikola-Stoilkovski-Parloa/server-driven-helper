
import React from 'react';
import { UISchemaField } from '@/lib/types';

interface HtmlFieldProps {
  field: UISchemaField;
}

export const HtmlField: React.FC<HtmlFieldProps> = ({ field }) => {
  const renderHTML = (htmlContent: string) => {
    return <div dangerouslySetInnerHTML={{ __html: htmlContent }} />;
  };

  const style = field.style || {};
  const className = field.cssClass || '';
  const attributes = field.attributes || {};
  
  return (
    <div 
      className={className}
      style={style}
      {...attributes}
    >
      {field.htmlContent && renderHTML(field.htmlContent)}
      {field.label && <div className="field-label">{field.label}</div>}
      {field.description && <div className="field-description">{field.description}</div>}
    </div>
  );
};
