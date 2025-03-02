
import React from 'react';
import { Button } from 'antd';
import { UISchemaAction } from '@/lib/types';

interface FormActionsProps {
  actions: UISchemaAction[];
  form: any;
}

export const FormActions: React.FC<FormActionsProps> = ({ actions, form }) => {
  if (!actions || actions.length === 0) {
    return null;
  }

  const renderAction = (action: UISchemaAction) => {
    switch (action.type) {
      case 'submit':
        return (
          <Button 
            type="primary" 
            htmlType="submit"
            className="bg-primary hover:bg-primary/90"
          >
            {action.label}
          </Button>
        );
      case 'reset':
        return (
          <Button 
            onClick={() => form.resetFields()}
          >
            {action.label}
          </Button>
        );
      case 'button':
        return (
          <Button 
            type={action.actionType || 'default'} 
            onClick={() => {
              // Handle custom actions here
              console.log('Custom action:', action.label);
            }}
          >
            {action.label}
          </Button>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex justify-end gap-3 mt-8">
      {actions.map((action, index) => (
        <span key={index}>
          {renderAction(action)}
        </span>
      ))}
    </div>
  );
};
