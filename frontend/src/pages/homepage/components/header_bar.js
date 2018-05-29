import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { AppBar, Avatar, Button } from 'material-ui'
import { withStyles } from 'material-ui/styles'
import DateBar from './date_bar'
import combineStyleClasses from './../../../lib/combineStyleClassses'
import { fetchLogout } from '../actions'

const styles = () => ({
  appBar: {
    color: '#404040',
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    backgroundColor: '#75A045',
    top: 0,
  },
  flexBoxItem: {
    flex: '1 1 0',
    margin: 'auto',
  },
  infoBar: {
    padding: '5px',
  },
  flexBoxContainer: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  profile: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  title: {
    textAlign: 'center',
  },
  userName: {
    textAlign: 'right',
  },
  logo: {
    fontWeight: 'bolder',
  },
  lunchspace: {
    fontWeight: 'bold',
    backgroundColor: '#75a045',
    color: 'white',
  },
  avatar: {
    float: 'right',
    margin: '5px',
    height: '60px',
    width: '60px',
  },
})

const mapStateToProps = state => ({
  user: state.user,
  lunchspace: state.lunchspace,
})

const mapDispatchToProps = dispatch => ({
  fetchLogoutAction: () => {
    dispatch(fetchLogout())
  },
})

function HeaderBar({
  classes, user, lunchspace, fetchLogoutAction,
}) {
  return (
    <div>
      <AppBar className={classes.appBar} position="static" color="default">
        <div className={combineStyleClasses(classes.infoBar, classes.flexBoxContainer)}>
          <div className={classes.flexBoxItem} />
          <div className={classes.flexBoxItem}>
            <h2 className={classes.title}>
              {lunchspace.name}
            </h2>
          </div>
          <div className={combineStyleClasses(classes.flexBoxItem, classes.profile)}>
            <p className={combineStyleClasses(classes.userName, classes.flexBoxItem)}>
              {user.firstName} {user.lastName}
            </p>
            <Avatar alt={`${user.firstName} ${user.lastName}`} src={user.imageUrl} className={combineStyleClasses(classes.avatar)} />
            <Button onClick={fetchLogoutAction}>Logout</Button>
          </div>
        </div>
        <div className={classes.dateBar}>
          <DateBar />
        </div>
      </AppBar>
    </div>
  )
}

HeaderBar.propTypes = {
  user: PropTypes.shape({
    src: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
  }).isRequired,
  lunchspace: PropTypes.shape({
    name: PropTypes.string.isRequired,
    subdomain: PropTypes.string.isRequired,
  }).isRequired,
  fetchLogoutAction: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(HeaderBar))
