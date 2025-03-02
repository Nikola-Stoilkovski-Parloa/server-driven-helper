
import React from 'react';
import { Breadcrumb } from 'antd';
import { UISchema } from '@/lib/types';

interface FormHeaderProps {
  schema: UISchema;
}

export const FormHeader: React.FC<FormHeaderProps> = ({ schema }) => {
  // Render breadcrumb from schema
  const renderBreadcrumb = () => {
    if (!schema.breadcrumb || schema.breadcrumb.length === 0) {
      return null;
    }
    
    return (
      <Breadcrumb 
        items={schema.breadcrumb.map((item, index) => ({
          title: (
            <span className={index === schema.breadcrumb!.length - 1 ? 'breadcrumb-active' : 'breadcrumb-item'}>
              {item.label}
            </span>
          ),
          href: item.url
        }))}
        className="mb-4"
      />
    );
  };

  // Render title from schema
  const renderTitle = () => {
    if (!schema.title) {
      return null;
    }
    
    return <h1 className="form-title">{schema.title}</h1>;
  };

  return (
    <>
      {renderBreadcrumb()}
      {renderTitle()}
    </>
  );
};
