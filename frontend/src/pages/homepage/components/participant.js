import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import UserAvatar from '../../../components/user_avatar'
import './participants.scss'

const styles = theme => ({
  avatar: {
    width: '24px',
    height: '24px',
    [theme.breakpoints.up('md')]: {
      width: '30px',
      height: '30px',
    },
  },
})


const mapStateToProps = (state, props) => ({
  participant: state.users[props.userId],
})

function Participant({
  classes, participant,
}) {
  return (
    <div className="avatar-container">
      <UserAvatar
        user={participant}
        className={classes.avatar}
      />
    </div>
  )
}

Participant.propTypes = {
  participant: PropTypes.shape({
    email: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    imageUrl: PropTypes.string,
  }).isRequired,
  classes: PropTypes.object.isRequired,
}


export default withStyles(styles)(connect(mapStateToProps)(Participant))
