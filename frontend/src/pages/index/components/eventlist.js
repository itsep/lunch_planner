/* eslint react/prop-types: 0 */
/* eslint react/prefer-stateless-function: 0 */
import React, { Component } from 'react'
import cuid from 'cuid'
import { fromJS } from 'immutable'
import Event from './event'

function stateOfEventList() {
  return {
    data: fromJS({
      events: [
        {
          id: cuid(),
          title: 'Event Nr. 1',
          summary: 'Das erste und beste Event',
        },
      ],
      title: 'Verfügbare Events',
      summary: 'Events denen du beitreten kannst aus deiner Nähe.',
    }),
  }
}

export default class Eventlist extends Component {
  constructor(props) {
    super(props)
    this.state = stateOfEventList()
  }
  render() {
    const {
      events,
      title,
      summary,
      eventTitle,
      eventSummary,
    } = this.state.data.toJS()
    const onClickAdd = () => {
      this.state.data = this.state.data.update(
        'events',
        ev => ev.push(fromJS({
          id: cuid(),
          title: this.state.data.get('eventTitle'),
          summary: this.state.data.get('eventSummary'),
        }))
      )
      this.forceUpdate()
    }
    const onChangeEventTitle = (change) => {
      this.state.data = this.state.data.set('eventTitle', change.target.value)
    }
    const onChangeEventSummary = (change) => {
      this.state.data = this.state.data.set('eventSummary', change.target.value)
    }
    return (
      <div>
        <h2>{title}</h2>
        <p>{summary}</p>
        <div>
          <input placeholder="Title" value={eventTitle} onChange={onChangeEventTitle} />
          <input placeholder="Summary" value={eventSummary} onChange={onChangeEventSummary} />
          <button onClick={onClickAdd} >Add Event</button>
        </div>
        <ul>
          {events.map(event =>
            <Event key={event.id} title={event.title} description={event.summary} />)}
        </ul>
      </div>
    )
  }
}
