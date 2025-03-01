import { useState, useEffect } from "react";
import { Bebas_Neue } from "next/font/google";

const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  weight: ["400"],
});

interface CountdownProps {
  targetDate: string; 
}

const Countdown: React.FC<CountdownProps> = ({ targetDate }) => {
  const [daysLeft, setDaysLeft] = useState<number | null>(null);


  useEffect(() => {
    const calculateDaysLeft = () => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
    
      const targetParts = targetDate.split("-");
      const target = new Date(
        Number(targetParts[0]),
        Number(targetParts[1]) - 1, 
        Number(targetParts[2]) 
      );
    
      const diffTime = target.getTime() - today.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      setDaysLeft(diffDays);
    };

    calculateDaysLeft()
  }, [targetDate]);

  return (
    <div>
      { daysLeft !== null ? (
        <div className={`${bebasNeue.className} flex flex-col text-white text-right absolute right-7 top-10`}>
            <p className="text-3xl -mb-2">{daysLeft}</p>
            <span>dias</span>
        </div>
      ) : (
        <p>Calculando...</p>
      )}
    </div>
  );
};

export default Countdown;
