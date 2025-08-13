import React from 'react';
import { getPasswordStrength } from '../utils/validation';

interface PasswordStrengthIndicatorProps {
  password: string;
  className?: string;
}

export const PasswordStrengthIndicator: React.FC<PasswordStrengthIndicatorProps> = ({
  password,
  className = ''
}) => {
  if (!password) {
    return null;
  }

  const { score, label, color } = getPasswordStrength(password);
  const percentage = Math.round((score / 7) * 100);

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'red':
        return 'bg-red-500 text-red-700';
      case 'orange':
        return 'bg-orange-500 text-orange-700';
      case 'yellow':
        return 'bg-yellow-500 text-yellow-700';
      case 'green':
        return 'bg-green-500 text-green-700';
      default:
        return 'bg-gray-500 text-gray-700';
    }
  };

  const getBorderColorClass = (color: string) => {
    switch (color) {
      case 'red':
        return 'border-red-200';
      case 'orange':
        return 'border-orange-200';
      case 'yellow':
        return 'border-yellow-200';
      case 'green':
        return 'border-green-200';
      default:
        return 'border-gray-200';
    }
  };

  return (
    <div className={`mt-2 ${className}`}>
      <div className="flex justify-between items-center mb-1">
        <span className="text-sm text-gray-600">Password Strength</span>
        <span className={`text-sm font-medium ${getColorClasses(color).split(' ')[1]}`}>
          {label}
        </span>
      </div>
      
      <div className={`w-full bg-gray-200 rounded-full h-2 border ${getBorderColorClass(color)}`}>
        <div
          className={`h-2 rounded-full transition-all duration-300 ${getColorClasses(color).split(' ')[0]}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
      
      <div className="mt-2 text-xs text-gray-500">
        <ul className="space-y-1">
          <li className={`flex items-center ${password.length >= 8 ? 'text-green-600' : 'text-gray-400'}`}>
            <span className="mr-2">{password.length >= 8 ? '✓' : '○'}</span>
            At least 8 characters
          </li>
          <li className={`flex items-center ${/[A-Z]/.test(password) ? 'text-green-600' : 'text-gray-400'}`}>
            <span className="mr-2">{/[A-Z]/.test(password) ? '✓' : '○'}</span>
            One uppercase letter
          </li>
          <li className={`flex items-center ${/[a-z]/.test(password) ? 'text-green-600' : 'text-gray-400'}`}>
            <span className="mr-2">{/[a-z]/.test(password) ? '✓' : '○'}</span>
            One lowercase letter
          </li>
          <li className={`flex items-center ${/\d/.test(password) ? 'text-green-600' : 'text-gray-400'}`}>
            <span className="mr-2">{/\d/.test(password) ? '✓' : '○'}</span>
            One number
          </li>
          <li className={`flex items-center ${/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>?]/.test(password) ? 'text-green-600' : 'text-gray-400'}`}>
            <span className="mr-2">{/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>?]/.test(password) ? '✓' : '○'}</span>
            One special character
          </li>
        </ul>
      </div>
    </div>
  );
};