import { FaStar, FaStarHalfAlt, FaRegStar} from 'react-icons/fa'

const Rating = ({ value, text  }) => {
  return (
    <div className='w-full flex'>
      <span className='text-orange-400'>
        { value >= 1 ? <FaStar /> : value >= 0.5 ? <FaStarHalfAlt /> : <FaRegStar /> }
      </span>
      <span className='text-orange-400'>
        { value >= 2 ? <FaStar /> : value >= 1.5 ? <FaStarHalfAlt /> : <FaRegStar /> }
      </span>
      <span className='text-orange-400'>
        { value >= 3 ? <FaStar /> : value >= 2.5 ? <FaStarHalfAlt /> : <FaRegStar /> }
      </span>
      <span className='text-orange-400'>
        { value >= 4 ? <FaStar /> : value >= 3.5 ? <FaStarHalfAlt /> : <FaRegStar /> }
      </span>
      <span className='text-orange-400'>
        { value >= 5 ? <FaStar /> : value >= 4.5 ? <FaStarHalfAlt /> : <FaRegStar /> }
      </span>

    </div>
  )
}

export default Rating
