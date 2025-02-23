import { PacmanLoader } from 'react-spinners';

type LoadingSpinnerProps = {
  size?: 'tiny' | 'small' | 'medium' | 'large';
  className?: string;
};

const LoadingSpinner = ({ size = 'medium', className = '' }: LoadingSpinnerProps) => {
  const dimensions = {
    tiny: { width: '2rem', height: '2rem', loaderSize: 8 },
    small: { width: '8rem', height: '12rem', loaderSize: 25 },
    medium: { width: '14rem', height: '22rem', loaderSize: 40 },
    large: { width: '20rem', height: '30rem', loaderSize: 60 },
  };

  const { width, height, loaderSize } = dimensions[size];

  return (
    <div className={`flex justify-center items-center ${className}`} style={{ width, height }}>
      <PacmanLoader color="#ffffff" loading={true} size={loaderSize} />
    </div>
  );
};

export default LoadingSpinner;
