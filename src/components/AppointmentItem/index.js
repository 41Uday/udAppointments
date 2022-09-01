// Write your code here
import './index.css'

const AppointmentItem = props => {
  const {appointItem, isToggleOfImg} = props
  const {titleSearch, id, isFavorite, dateSearch} = appointItem

  const onImage = () => {
    isToggleOfImg(id)
  }

  const imgUrl = isFavorite
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  return (
    <li className="list-element">
      <div className="list-card">
        <p>{titleSearch}</p>
        <div>
          <button
            type="button"
            className="list-butt"
            onClick={onImage}
            testid="star"
          >
            <img src={imgUrl} alt="star" className="img-list" />
          </button>
        </div>
      </div>

      <p>{dateSearch}</p>
    </li>
  )
}

export default AppointmentItem
