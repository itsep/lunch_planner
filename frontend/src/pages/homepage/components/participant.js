import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import UserAvatar from './user_avatar'
import './participants.scss'


const mapStateToProps = (state, props) => ({
  participant: state.users[props.userId],
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
    email: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    imageUrl: PropTypes.string,
  }).isRequired,
}

export default connect(mapStateToProps)(Participant)
