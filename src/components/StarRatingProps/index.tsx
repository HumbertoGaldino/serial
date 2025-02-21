import { IoStar, IoStarHalf, IoStarOutline } from "react-icons/io5";

interface StarRatingProps {
  voteAverage: number;
}

const StarRating: React.FC<StarRatingProps> = ({ voteAverage }) => {
  const rating = (voteAverage / 2).toFixed(1);
  const fullStars = Math.floor(Number(rating)); 
  const hasHalfStar = Number(rating) % 1 >= 0.5; 

  return (
    <div className="flex items-center">
      {[...Array(5)].map((_, index) => (
        <div key={index} className="relative">
          {index < fullStars ? (
            <IoStar className="text-[#FFFE00] relative" size={24} />
          ) : index === fullStars && hasHalfStar ? (
            <IoStarHalf className="text-[#FFFE00] relative" size={24} />
          ) : (
            <IoStarOutline className="text-white relative" size={24} />
          )}
        </div>
      ))}
    </div>
  );
};

export default StarRating;
