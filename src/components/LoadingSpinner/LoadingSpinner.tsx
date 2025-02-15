import { PacmanLoader } from 'react-spinners';

const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center w-[14rem] h-[22rem]">
      <PacmanLoader color="#ffffff" loading={true} size={40} />
    </div>
  )
}

export default LoadingSpinner;