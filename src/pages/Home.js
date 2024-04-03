import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    // Navigate to /login when the component mounts
    navigate('/products');
  }, []);

  // The actual component rendering
  return (
    <div>
      {/* Your component content goes here */}
    </div>
  );
}
