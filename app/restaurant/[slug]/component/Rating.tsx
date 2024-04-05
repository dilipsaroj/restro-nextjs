import { Review } from "@prisma/client";
import CalculateReviewRating from "../../../../utils/calculateReviewRating";
import Star from "../../../components/Stars";

const Rating = ({review}:{review:Review[]}) => {
    return (
        <div className='flex items-end '>
            <div className='ratings mt-2 flex items-center'>
                <Star reviews={review}/>
                <p className='text-reg ml-3'>{ CalculateReviewRating(review).toFixed(1)}</p>
            </div>
            <div>
                <p className="text-reg ml-4">{review.length} Review{review.length > 1 ? "s" : ""}</p>
            </div>
        </div>
    )
}
export default Rating;