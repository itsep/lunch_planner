import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'

function firstLetterOf(potentialString) {
  if (typeof potentialString !== 'string') {
    return ''
  }
  return potentialString.charAt(0)
}

function initialsOf(user) {
  const { firstName, lastName } = user
  return firstLetterOf(firstName) + firstLetterOf(lastName)
}

const styles = () => ({
  container: {
    width: '24px',
    height: '24px',
    flexShrink: 0,
    borderRadius: '100%',
    backgroundColor: '#75a045',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  initials: {
    fontSize: '12px',
  },
})

function UserAvatar({
  classes, user,
}) {
  if (user.imageUrl) {
    return (
      <div className={classes.container}>
        <img src={user.imageUrl} alt={`${user.firstName} ${user.lastName}`} />
      </div>
    )
  }
  return (
    <div className={classes.container}>
      <span className={classes.initials}>{initialsOf(user)}</span>
    </div>
  )
}

UserAvatar.propTypes = {
  user: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    imageUrl: PropTypes.string,
  }).isRequired,
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(UserAvatar)
