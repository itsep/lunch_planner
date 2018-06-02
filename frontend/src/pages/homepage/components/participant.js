import React from 'react'
import PropTypes from 'prop-types'
import { Button, Typography } from 'material-ui'
import { withStyles } from 'material-ui/styles'
import { connect } from 'react-redux'
import UserAvatar from './user_avatar'
import './participants.scss'


const mapStateToProps = (state, props) => ({
  participant: {
    userId: props.userId,
    ...state.users[props.userId],
  },
})

function Participant({
  participant,
}) {
  return (
    <div className="avatar-container"><UserAvatar user={participant} /></div>
  )
}

Participant.propTypes = {
  participant: PropTypes.shape({
    userId: PropTypes.number.isRequired,
    email: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    imageUrl: PropTypes.string,
  }).isRequired,
}

export default connect(mapStateToProps)(Participant)
