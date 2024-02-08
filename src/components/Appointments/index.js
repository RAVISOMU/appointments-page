import {Component} from 'react'

import {v4 as uuidv4} from 'uuid'

import {format} from 'date-fns'

import AppointmentItem from '../AppointmentItem'

import './index.css'

class Appointments extends Component {
  state = {appointmentsList: [], title: '', date: '', isFiltered: false}

  onFilter = () => {
    const {isFiltered} = this.state
    this.setState({isFiltered: !isFiltered})
  }

  onChangeTitle = event => {
    this.setState({title: event.target.value})
  }

  onChangeDate = event => {
    this.setState({date: event.target.value})
  }

  addNewAppointment = event => {
    event.preventDefault()
    const {title, date} = this.state
    const formattedDate = date
      ? format(new Date(date), 'dd MMMM yyyy, EEEE')
      : ''
    const newAppointment = {
      id: uuidv4(),
      title,
      date: formattedDate,
      isStarred: false,
    }
    this.setState(prevState => ({
      appointmentsList: [...prevState.appointmentsList, newAppointment],
      title: '',
      date: '',
    }))
  }

  toggleIsStarred = id => {
    this.setState(prevState => ({
      appointmentsList: prevState.appointmentsList.map(eachAppointment => {
        if (eachAppointment.id === id) {
          return {...eachAppointment, isStarred: !eachAppointment.isStarred}
        }
        return eachAppointment
      }),
    }))
  }

  getFilteredAppointmentsList = () => {
    const {appointmentsList, isFiltered} = this.state
    if (isFiltered) {
      return appointmentsList.filter(
        eachAppointment => eachAppointment.isStarred === true,
      )
    }
    return appointmentsList
  }

  render() {
    const {title, date, isFiltered} = this.state
    const starredClass = isFiltered ? 'filled-button' : 'empty-button'
    const filteredAppointmentsList = this.getFilteredAppointmentsList()

    return (
      <div className="appointments-page-container">
        <div className="appointments-responsive-container">
          <div className="appointments-header-container">
            <div className="add-appointments-container">
              <form className="user-form" onSubmit={this.addNewAppointment}>
                <h1 className="add-appointment-heading">Add Appointment</h1>
                <label htmlFor="textInput" className="label-text">
                  TITLE
                </label>
                <input
                  type="text"
                  id="textInput"
                  value={title}
                  onChange={this.onChangeTitle}
                  className="text-input"
                  placeholder="Title"
                />
                <label htmlFor="dateInput" className="label-text">
                  DATE
                </label>
                <input
                  type="date"
                  id="dateInput"
                  value={date}
                  onChange={this.onChangeDate}
                  className="date-input"
                />
                <button type="submit" className="add-appointment-button">
                  Add
                </button>
              </form>
              <img
                src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
                alt="appointments"
                className="appointments-image"
              />
            </div>
            <hr />
            <div className="heading-filter-button-container">
              <h1 className="mini-heading">Appointments</h1>
              <button
                type="button"
                className={`starred-button ${starredClass}`}
                onClick={this.onFilter}
              >
                Starred
              </button>
            </div>
            <ul className="appointments-list">
              {filteredAppointmentsList.map(eachAppointment => (
                <AppointmentItem
                  key={eachAppointment.id}
                  appointmentDetails={eachAppointment}
                  toggleIsStarred={this.toggleIsStarred}
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
