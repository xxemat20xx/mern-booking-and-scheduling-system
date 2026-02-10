import { useState } from 'react';
import { Input } from '../components/UI';
import { Lock, Eye, EyeOff } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const ResetPassword = () => {
  const { token } = useParams();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const passwordsMatch =
    newPassword.length > 0 && newPassword === confirmPassword;

  const isDisabled =
    !newPassword || !confirmPassword || !passwordsMatch;

  const { resetPassword } = useAuthStore();
  const handleResetSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      console.error('Reset token missing');
      return;
    }
    try {
    await resetPassword(token, newPassword);
    setConfirmPassword('');
    setNewPassword('');
    setTimeout(() => {
      navigate('/login')
    }, 3000)
    } catch (error) {
      console.error(error);
    }
  };  

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md rounded-xl border bg-white p-8 shadow-sm">
        {/* Header */}
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-semibold text-gray-900">
            Reset your password
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Choose a strong password you haven’t used before
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleResetSubmit}>
        <div className="space-y-4">
          <Input
            label="New password"
            autoComplete=""
            type={showPassword ? 'text' : 'password'}
            icon={<Lock size={18} />}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />

          <Input
            label="Confirm password"
            type={showPassword ? 'text' : 'password'}
            autoComplete=""
            icon={<Lock size={18} />}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          {/* Password mismatch message */}
          {confirmPassword && !passwordsMatch && (
            <p className="text-sm text-red-500">
              Passwords do not match
            </p>
          )}

          {/* Show password toggle */}
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900"
          >
            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            {showPassword ? 'Hide passwords' : 'Show passwords'}
          </button>

          {/* Submit */}
          <button
            type='submit'
            disabled={isDisabled}
            className={`mt-4 w-full rounded-lg py-2.5 font-medium transition
              ${
                isDisabled
                  ? 'cursor-not-allowed bg-gray-200 text-gray-500'
                  : 'bg-black text-white hover:bg-gray-900'
              }`}
          >
            Reset password
          </button>
        </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
