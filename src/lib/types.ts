
export interface UISchemaField {
  type: string;
  name: string;
  label?: string;
  placeholder?: string;
  description?: string;
  required?: boolean;
  options?: Array<{ value: string; label: string }>;
  actions?: UISchemaAction[];
  fields?: UISchemaField[];
  defaultValue?: any;
}

export interface UISchemaAction {
  type: string;
  label: string;
  onClick?: string;
  actionType?: 'primary' | 'default' | 'dashed' | 'link' | 'text';
}

export interface UISchema {
  title: string;
  breadcrumb?: Array<{ label: string; url?: string }>;
  fields: UISchemaField[];
  actions?: UISchemaAction[];
}
