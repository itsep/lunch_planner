import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import UserAvatar from '../../../components/user_avatar'
import './participants.scss'
import combineStyleClassses from '../../../lib/combineStyleClassses'

const styles = theme => ({
  avatarContainer: {
    transition: 'zIndex 400ms',
    '&:hover': {
      zIndex: 1,
    },
  },
  avatar: {
    width: '24px',
    height: '24px',
    [theme.breakpoints.up('md')]: {
      width: '30px',
      height: '30px',
      fontSize: '14px',
    },
    '@media (hover: hover)': {
      transition: 'transform 250ms',
      '&:hover': {
        transform: 'scale(1.6)',
      },
    },
  },
})


const mapStateToProps = (state, props) => ({
  participant: state.users[props.userId],
})

function Participant({
  classes, participant, onClick,
}) {
  return (
    <div
      className={combineStyleClassses('avatar-container', classes.avatarContainer)}
      onClick={onClick}
    >
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
  onClick: PropTypes.func,
}

Participant.defaultProps = {
  onClick: undefined,
}


export default withStyles(styles)(connect(mapStateToProps)(Participant))
