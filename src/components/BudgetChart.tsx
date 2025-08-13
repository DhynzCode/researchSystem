import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

interface BudgetData {
  program: string;
  budget: number;
  requests: number;
}

interface BudgetChartProps {
  data: BudgetData[];
  totalBudget: number;
  chartType?: 'bar' | 'doughnut';
}

const BudgetChart: React.FC<BudgetChartProps> = ({ data, totalBudget, chartType = 'doughnut' }) => {
  const colors = [
    '#10B981', // Green
    '#3B82F6', // Blue  
    '#F59E0B', // Amber
    '#EF4444', // Red
    '#8B5CF6', // Purple
  ];

  const barChartData = {
    labels: data.map(item => item.program),
    datasets: [
      {
        label: 'Budget (₱)',
        data: data.map(item => item.budget),
        backgroundColor: colors.slice(0, data.length),
        borderColor: colors.slice(0, data.length).map(color => color + 'DD'),
        borderWidth: 2,
        borderRadius: 8,
        borderSkipped: false,
      },
    ],
  };

  const doughnutChartData = {
    labels: data.map(item => item.program),
    datasets: [
      {
        label: 'Budget Distribution',
        data: data.map(item => item.budget),
        backgroundColor: colors.slice(0, data.length).map(color => color + 'CC'),
        borderColor: colors.slice(0, data.length),
        borderWidth: 2,
        hoverOffset: 8,
      },
    ],
  };

  const barChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(17, 24, 39, 0.95)',
        titleColor: '#F9FAFB',
        bodyColor: '#F9FAFB',
        borderColor: '#374151',
        borderWidth: 1,
        callbacks: {
          label: function(context: any) {
            const budget = context.parsed.y;
            const program = data[context.dataIndex];
            const percentage = ((budget / totalBudget) * 100).toFixed(1);
            return [
              `Budget: ₱${budget.toLocaleString()}`,
              `Requests: ${program.requests}`,
              `Share: ${percentage}%`
            ];
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: '#E5E7EB',
        },
        ticks: {
          callback: function(value: any) {
            return '₱' + value.toLocaleString();
          },
          color: '#6B7280',
        }
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: '#6B7280',
        }
      }
    },
    animation: {
      duration: 1500,
      easing: 'easeInOutQuart' as const,
    }
  };

  const doughnutChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          padding: 20,
          usePointStyle: true,
          pointStyle: 'circle',
          color: '#374151',
          font: {
            size: 12,
            family: 'Inter, sans-serif',
          }
        }
      },
      tooltip: {
        backgroundColor: 'rgba(17, 24, 39, 0.95)',
        titleColor: '#F9FAFB',
        bodyColor: '#F9FAFB',
        borderColor: '#374151',
        borderWidth: 1,
        callbacks: {
          label: function(context: any) {
            const budget = context.parsed;
            const program = data[context.dataIndex];
            const percentage = ((budget / totalBudget) * 100).toFixed(1);
            return [
              `${context.label}`,
              `Budget: ₱${budget.toLocaleString()}`,
              `Requests: ${program.requests}`,
              `Share: ${percentage}%`
            ];
          }
        }
      }
    },
    cutout: '60%',
    animation: {
      animateRotate: true,
      duration: 2000,
    }
  };

  if (chartType === 'bar') {
    return (
      <div className="h-80 w-full">
        <Bar data={barChartData} options={barChartOptions} />
      </div>
    );
  }

  return (
    <div className="h-80 w-full relative">
      <Doughnut data={doughnutChartData} options={doughnutChartOptions} />
      {/* Center text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <div className="text-2xl font-bold text-gray-800 dark:text-gray-200">
          ₱{totalBudget.toLocaleString()}
        </div>
        <div className="text-sm text-gray-600 dark:text-gray-400">
          Total Budget
        </div>
      </div>
    </div>
  );
};

export default BudgetChart;