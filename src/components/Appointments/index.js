// Write your code here
import {Component} from 'react'

import {format} from 'date-fns'

import {v4 as uuidv4} from 'uuid'

import AppointmentItem from '../AppointmentItem'

import './index.css'

const initialList = []

class Appointments extends Component {
  state = {
    finalList: initialList,
    titleSearch: '',
    dateSearch: '',
    isStarred: false,
  }

  isToggleOfImg = id => {
    this.setState(prevState => ({
      finalList: prevState.finalList.map(e => {
        if (id === e.id) {
          return {...e, isFavorite: !e.isFavorite}
        }
        return e
      }),
    }))
  }

  isStarredResult = () => {
    this.setState(prevState => ({
      isStarred: !prevState.isStarred,
    }))
  }

  addComment = event => {
    event.preventDefault()
    const {titleSearch, dateSearch} = this.state
    const res = format(new Date(dateSearch), 'dd MMMM yyyy, EEEE')
    console.log('Triggered')
    const newAppointment = {
      id: uuidv4(),
      titleSearch,
      dateSearch: res,
      isFavorite: false,
      isStarred: false,
    }

    this.setState(prevState => ({
      finalList: [...prevState.finalList, newAppointment],
      titleSearch: '',
      dateSearch: '',
    }))

    this.setState({
      dateSearch: format(new Date(dateSearch), 'dd MMMM yyyy, EEEE'),
    })
  }

  onChangeTitle = event => {
    this.setState({titleSearch: event.target.value})
  }

  onChangeDate = event => {
    this.setState({
      dateSearch: event.target.value,
    })
  }

  render() {
    const {finalList, titleSearch, dateSearch, isStarred} = this.state

    const finalRes = isStarred
      ? finalList.filter(e => e.isFavorite === true)
      : finalList

    return (
      <div className="bg-container">
        <div className="card">
          <div className="card-1">
            <div className="media-card">
              <h1 className="head">Add Appointment</h1>
              <form onSubmit={this.addComment}>
                <label htmlFor="title" className="para-1">
                  TITLE
                </label>
                <br />
                <input
                  type="text"
                  id="title"
                  value={titleSearch}
                  className="type-1"
                  onChange={this.onChangeTitle}
                />
                <br />
                <label htmlFor="date" className="para-1">
                  DATE
                </label>
                <br />
                <input
                  type="date"
                  value={dateSearch}
                  id="date"
                  className="type-2"
                  onChange={this.onChangeDate}
                />
                <br />
                <button type="submit" className="butt-1">
                  Add
                </button>
              </form>
            </div>
            <div>
              <img
                src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
                alt="appointments"
                className="img-1"
              />
            </div>
          </div>
          <hr />
          <div>
            <div className="card-2">
              <h1 className="head-2">Appointments</h1>
              <button
                type="button"
                className="butt-2"
                onClick={this.isStarredResult}
              >
                Starred
              </button>
            </div>
            <ul className="list-container">
              {finalRes.map(e => (
                <AppointmentItem
                  key={e.id}
                  appointItem={e}
                  isToggleOfImg={this.isToggleOfImg}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Appointments
