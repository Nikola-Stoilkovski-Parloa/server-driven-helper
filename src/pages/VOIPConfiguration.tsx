
import React from 'react';
import ServerDrivenForm from '@/components/ServerDrivenForm';
import { voipConfigSchema } from '@/schemas/voipConfigSchema';
import { toast } from 'sonner';

const VOIPConfiguration = () => {
  const handleSubmit = (values: any) => {
    console.log('VOIP Configuration submitted:', values);
    toast.success('VOIP Configuration created successfully!');
  };

  return (
    <div className="min-h-screen bg-[#f0f2f5] py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <ServerDrivenForm
          schema={voipConfigSchema}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
};

export default VOIPConfiguration;
