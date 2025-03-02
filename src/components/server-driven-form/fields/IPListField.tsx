
import React, { useState } from 'react';
import { Form, Input, Button } from 'antd';
import { PlusOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { Typography } from 'antd';
import { UISchemaField } from '@/lib/types';

const { Text } = Typography;

interface IPListFieldProps {
  field: UISchemaField;
  form: any;
}

export const IPListField: React.FC<IPListFieldProps> = ({ field, form }) => {
  const [ipList, setIpList] = useState<string[]>(['']);

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
};
