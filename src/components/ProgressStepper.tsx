import React from 'react';
import { Check, Clock, AlertCircle } from 'lucide-react';
import { DefenseRequestStatus } from '../types';

interface Step {
  id: string;
  title: string;
  description?: string;
  status: 'completed' | 'current' | 'pending';
}

interface ProgressStepperProps {
  currentStatus: DefenseRequestStatus;
  isFlagged: boolean;
  className?: string;
}

const ProgressStepper: React.FC<ProgressStepperProps> = ({ 
  currentStatus, 
  isFlagged, 
  className = '' 
}) => {
  const getFlaggedSteps = (status: DefenseRequestStatus): Step[] => {
    const steps = [
      {
        id: 'vpaa-justification',
        title: 'VPAA Review',
        description: 'Justification review',
        status: 'pending' as const
      },
      {
        id: 'research-center',
        title: 'Research Center Review',
        description: 'Research Center approval',
        status: 'pending' as const
      },
      {
        id: 'vpaa-final',
        title: 'VPAA Review',
        description: 'Final VPAA approval',
        status: 'pending' as const
      },
      {
        id: 'dean',
        title: 'Dean Review',
        description: 'Dean approval',
        status: 'pending' as const
      },
      {
        id: 'budget',
        title: 'Budget Review',
        description: 'Budget office approval',
        status: 'pending' as const
      },
      {
        id: 'approved',
        title: 'Fully Approved',
        description: 'Request completed',
        status: 'pending' as const
      }
    ];

    switch (status) {
      case 'Draft':
        return steps;
      case 'Research Center Approved':
        steps[0].status = 'completed';
        steps[1].status = 'completed';
        steps[2].status = 'current';
        return steps;
      case 'VPAA Approved':
        steps[0].status = 'completed';
        steps[1].status = 'completed';
        steps[2].status = 'completed';
        steps[3].status = 'current';
        return steps;
      case 'Dean Approved':
        steps[0].status = 'completed';
        steps[1].status = 'completed';
        steps[2].status = 'completed';
        steps[3].status = 'completed';
        steps[4].status = 'current';
        return steps;
      case 'Budget Approved':
        steps[0].status = 'completed';
        steps[1].status = 'completed';
        steps[2].status = 'completed';
        steps[3].status = 'completed';
        steps[4].status = 'completed';
        steps[5].status = 'completed';
        return steps;
      case 'Returned for Corrections':
        steps[0].status = 'completed';
        steps[1].status = 'completed';
        steps[2].status = 'current';
        return steps;
      case 'Rejected':
        steps[0].status = 'completed';
        return steps.map(step => ({ ...step, status: step.id === 'vpaa-justification' ? 'completed' : 'pending' }));
      default:
        return steps;
    }
  };

  const getNonFlaggedSteps = (status: DefenseRequestStatus): Step[] => {
    const steps = [
      {
        id: 'research-center',
        title: 'Research Center',
        description: 'Research Center approval',
        status: 'pending' as const
      },
      {
        id: 'vpaa',
        title: 'VPAA',
        description: 'VPAA approval',
        status: 'pending' as const
      },
      {
        id: 'budget',
        title: 'Budget',
        description: 'Budget approval',
        status: 'pending' as const
      },
      {
        id: 'approved',
        title: 'Fully Approved',
        description: 'Complete approval',
        status: 'pending' as const
      }
    ];

    switch (status) {
      case 'Draft':
        return steps;
      case 'Research Center Approved':
        steps[0].status = 'completed';
        steps[1].status = 'current';
        return steps;
      case 'VPAA Approved':
        steps[0].status = 'completed';
        steps[1].status = 'completed';
        steps[2].status = 'current';
        return steps;
      case 'Budget Approved':
        steps[0].status = 'completed';
        steps[1].status = 'completed';
        steps[2].status = 'completed';
        steps[3].status = 'completed';
        return steps;
      case 'Dean Approved':
        // Map Dean Approved to Budget Review step for 4-step process
        steps[0].status = 'completed';
        steps[1].status = 'completed';
        steps[2].status = 'current';
        return steps;
      case 'Returned for Corrections':
        steps[0].status = 'completed';
        steps[1].status = 'current';
        return steps;
      case 'Rejected':
        return steps.map(step => ({ ...step, status: 'pending' }));
      default:
        return steps;
    }
  };

  const steps = isFlagged ? getFlaggedSteps(currentStatus) : getNonFlaggedSteps(currentStatus);

  const getStepIcon = (step: Step) => {
    switch (step.status) {
      case 'completed':
        return (
          <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
            <Check className="w-4 h-4 text-white" />
          </div>
        );
      case 'current':
        return (
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
            <Clock className="w-4 h-4 text-white" />
          </div>
        );
      case 'pending':
        return (
          <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
            <div className="w-3 h-3 bg-gray-50 dark:bg-gray-7000 rounded-full" />
          </div>
        );
      default:
        return null;
    }
  };

  const getConnectorColor = (index: number) => {
    if (index >= steps.length - 1) return '';
    
    const currentStep = steps[index];
    const nextStep = steps[index + 1];
    
    if (currentStep.status === 'completed') {
      return 'bg-green-500';
    } else if (currentStep.status === 'current' && nextStep.status === 'pending') {
      return 'bg-gray-300';
    } else {
      return 'bg-gray-300';
    }
  };

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 ${className}`}>
      <div className="flex items-center space-x-2 mb-4">
        {isFlagged && <AlertCircle className="w-5 h-5 text-orange-500" />}
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
          {isFlagged ? 'Flagged Request Progress' : 'Request Progress'}
        </h3>
      </div>
      
      {isFlagged && (
        <div className="mb-4 p-3 bg-orange-50 border border-orange-200 rounded-lg">
          <p className="text-sm text-orange-800">
            This request contains flagged panel members and requires additional VPAA justification review.
          </p>
        </div>
      )}

      <div className="relative">
        {/* Mobile: Vertical layout */}
        <div className="block md:hidden">
          <div className="space-y-4">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-start space-x-3">
                <div className="flex flex-col items-center">
                  {getStepIcon(step)}
                  {index < steps.length - 1 && (
                    <div className={`w-0.5 h-8 mt-2 ${getConnectorColor(index)}`} />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium text-gray-800 dark:text-gray-200">{step.title}</h4>
                  {step.description && (
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">{step.description}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Desktop: Horizontal layout */}
        <div className="hidden md:block">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center flex-1">
                <div className="flex flex-col items-center text-center min-w-0">
                  {getStepIcon(step)}
                  <div className="mt-2">
                    <h4 className="text-sm font-medium text-gray-800 dark:text-gray-200 whitespace-nowrap">
                      {step.title}
                    </h4>
                    {step.description && (
                      <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 whitespace-nowrap">
                        {step.description}
                      </p>
                    )}
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div className="flex-1 mx-4">
                    <div className={`h-0.5 ${getConnectorColor(index)}`} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Status Legend */}
      <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex flex-wrap gap-4 text-xs">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full" />
            <span className="text-gray-600 dark:text-gray-400">Completed</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full" />
            <span className="text-gray-600 dark:text-gray-400">Current</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-gray-300 rounded-full" />
            <span className="text-gray-600 dark:text-gray-400">Pending</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressStepper;