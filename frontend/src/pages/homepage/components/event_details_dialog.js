import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'
import Button from '@material-ui/core/Button'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemText from '@material-ui/core/ListItemText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import withMobileDialog from '@material-ui/core/withMobileDialog'
import UserAvatar from '../../../components/user_avatar'
import localizedStrings from '../../../localization'

const mapDispatchToProps = null

const mapStateToProps = state => ({
  users: state.users,
  selectedUserId: state.selectedEvent && state.selectedEvent.selectedUserId,
})

const styles = theme => ({
  avatar: {
    width: '64px',
    height: '64px',
    fontSize: '26px',
  },
  dialogContent: {
    padding: 0,
  },
  selected: {
    backgroundColor: theme.palette.action.selected,
  },
})

function EventDetailsDialog(props) {
  const {
    classes, onClose, participantIds, users, show, fullScreen, selectedUserId,
  } = props
  const participants = participantIds.map(id => ({
    userId: id,
    ...users[id],
  }))
  return (
    <Dialog onClose={onClose} open={show} aria-labelledby="simple-dialog-title" fullScreen={fullScreen}>
      <DialogTitle>{localizedStrings.participants}</DialogTitle>
      <DialogContent className={classes.dialogContent}>
        <List>
          {participants.map(participant => (
            <ListItem key={participant.userId} className={participant.userId === selectedUserId ? classes.selected : ''}>
              <ListItemAvatar>
                <UserAvatar user={participant} className={classes.avatar} />
              </ListItemAvatar>
              <ListItemText primary={`${participant.firstName} ${participant.lastName}`} />
            </ListItem>
          ))}
        </List>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          {localizedStrings.close}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

EventDetailsDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  fullScreen: PropTypes.bool.isRequired,
  users: PropTypes.object.isRequired,
  participantIds: PropTypes.arrayOf(PropTypes.number).isRequired,
  selectedUserId: PropTypes.number,
}

EventDetailsDialog.defaultProps = {
  selectedUserId: undefined,
}

export default withStyles(styles)(withMobileDialog()(connect(
  mapStateToProps,
  mapDispatchToProps
)(EventDetailsDialog)))
