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

const styles = theme => ({
  container: {
    position: 'relative',
    width: '24px',
    height: '24px',
    flexShrink: 0,
    borderRadius: '100%',
    backgroundColor: theme.palette.primary.light,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    [theme.breakpoints.up('md')]: {
      width: '30px',
      height: '30px',
    },
  },
  initials: {
    fontSize: '12px',
  },
  image: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
    borderRadius: '50%',
  },
})

function UserAvatar({
  classes, user,
}) {
  return (
    <div className={classes.container}>
      { user.imageUrl &&
        <img
          src={user.imageUrl}
          alt={`${user.firstName} ${user.lastName}`}
          className={classes.image}
          onError={(e) => { e.target.style.display = 'none' }}
        />
      }
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
