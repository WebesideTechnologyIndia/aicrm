import { useNavigate } from 'react-router-dom';
import { ShieldAlert, ArrowLeft } from 'lucide-react';
import Button from '../ui/Button';

const Unauthorized = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-24 h-24 bg-red-100 rounded-full mb-6">
          <ShieldAlert className="h-12 w-12 text-red-600" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Access Denied
        </h1>
        <p className="text-gray-600 mb-8 max-w-md">
          You don't have permission to access this page. Please contact your administrator if you believe this is a mistake.
        </p>
        <Button
          onClick={() => navigate(-1)}
          icon={<ArrowLeft className="h-5 w-5" />}
        >
          Go Back
        </Button>
      </div>
    </div>
  );
};

export default Unauthorized;