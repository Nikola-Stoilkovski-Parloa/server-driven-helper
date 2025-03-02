
import React, { useState } from 'react';
import { 
  Form, Input, Button, Select, Checkbox, Radio, 
  Space, Divider, Card, Typography, Breadcrumb, Tag
} from 'antd';
import { PlusOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { UISchema, UISchemaField, UISchemaAction } from '@/lib/types';

const { Title, Text } = Typography;

interface ServerDrivenFormProps {
  schema: UISchema;
  onSubmit?: (values: any) => void;
}

const ServerDrivenForm: React.FC<ServerDrivenFormProps> = ({ schema, onSubmit }) => {
  const [form] = Form.useForm();
  const [ipList, setIpList] = useState<string[]>(['']);

  const handleSubmit = (values: any) => {
    if (onSubmit) {
      // Clean up empty values from IP list
      if (values.whitelistedIps) {
        values.whitelistedIps = values.whitelistedIps.filter((ip: string) => ip.trim() !== '');
      }
      onSubmit(values);
    }
  };

  // Function to safely render HTML content
  const renderHTML = (htmlContent: string) => {
    return <div dangerouslySetInnerHTML={{ __html: htmlContent }} />;
  };

  const renderField = (field: UISchemaField) => {
    // Handle custom HTML element type
    if (field.type === 'html') {
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
    }

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
        return (
          <Form.Item
            label={field.label}
            required={field.required}
            tooltip={field.description}
          >
            <div className="space-y-2">
              {ipList.map((_, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Form.Item
                    name={['whitelistedIps', index]}
                    noStyle
                  >
                    <Input placeholder="e.g. 192.168.1.1/24" />
                  </Form.Item>
                  {index > 0 && (
                    <CloseCircleOutlined
                      className="text-gray-400 hover:text-red-500 cursor-pointer"
                      onClick={() => {
                        const newIpList = [...ipList];
                        newIpList.splice(index, 1);
                        setIpList(newIpList);
                        
                        // Update form values
                        const currentIps = form.getFieldValue('whitelistedIps') || [];
                        currentIps.splice(index, 1);
                        form.setFieldsValue({ whitelistedIps: currentIps });
                      }}
                    />
                  )}
                </div>
              ))}
              <Button 
                type="default" 
                icon={<PlusOutlined />} 
                onClick={() => setIpList([...ipList, ''])}
                className="mt-2"
              >
                Add CIDR range
              </Button>
              {field.description && (
                <Text className="block mt-2 text-sm text-gray-500">
                  {field.description}
                </Text>
              )}
            </div>
          </Form.Item>
        );

      case 'section':
        return (
          <div className={`mb-6 ${field.cssClass || ''}`} style={field.style || {}}>
            {field.label && <h3 className="text-base font-medium mb-2">{field.label}</h3>}
            {field.description && <p className="text-sm text-gray-500 mb-4">{field.description}</p>}
            {field.fields && field.fields.map((subField, idx) => (
              <div key={idx} className="mb-4">
                {renderField(subField)}
              </div>
            ))}
          </div>
        );

      case 'divider':
        return <Divider className={field.cssClass || ''} style={field.style || {}} />;

      case 'space':
        return <div className={`h-${field.name || '4'} ${field.cssClass || ''}`} style={field.style || {}}></div>;

      default:
        return null;
    }
  };

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
    <div className="form-container">
      {schema.breadcrumb && (
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
      )}
      
      <h1 className="form-title">{schema.title}</h1>
      
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        requiredMark
        validateTrigger={['onBlur', 'onChange']}
        className="animate-slideIn"
      >
        {schema.fields.map((field, index) => (
          <div key={index} className="mb-6">
            {renderField(field)}
          </div>
        ))}
        
        <div className="flex justify-end gap-3 mt-8">
          {schema.actions && schema.actions.map((action, index) => (
            <span key={index}>
              {renderAction(action)}
            </span>
          ))}
        </div>
      </Form>
    </div>
  );
};

export default ServerDrivenForm;
