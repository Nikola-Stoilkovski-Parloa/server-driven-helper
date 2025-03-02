
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
  // Support for custom HTML elements
  htmlContent?: string;
  cssClass?: string;
  style?: Record<string, string>;
  attributes?: Record<string, string>;
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
  // Form container configuration
  container?: {
    cssClass?: string;
    style?: Record<string, string>;
  };
  // Form layout configuration
  form?: {
    layout?: 'vertical' | 'horizontal' | 'inline';
    cssClass?: string;
    style?: Record<string, string>;
    validateTrigger?: string[];
  };
}
