
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/voip-configuration');
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f0f2f5]">
      <div className="text-center">
        <h1 className="text-2xl font-semibold mb-4">Redirecting to VOIP Configuration...</h1>
      </div>
    </div>
  );
};

export default Index;
