import { useState } from 'react';
import { authAPI } from '../../services/api';
import Button from '../../components/ui/Button';

const TestAPI = () => {
  const [result, setResult] = useState(null);

  const testLogin = async () => {
    try {
      const response = await authAPI.login({
        email: 'deepak@test.com',
        password: '123456'
      });
      setResult(JSON.stringify(response.data, null, 2));
    } catch (error) {
      setResult(JSON.stringify(error.response?.data || error.message, null, 2));
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">API Test</h1>
      <Button onClick={testLogin}>Test Login API</Button>
      {result && (
        <pre className="mt-4 p-4 bg-gray-100 rounded">{result}</pre>
      )}
    </div>
  );
};

export default TestAPI;