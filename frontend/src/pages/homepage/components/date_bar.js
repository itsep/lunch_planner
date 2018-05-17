import React from 'react'
import PropTypes from 'prop-types'
import Button from 'material-ui/es/Button/Button'
import { connect } from 'react-redux'
import { withStyles } from 'material-ui/styles'


const styles = () => ({
  flexContainer: {
    padding: 0,
    margin: 0,
    listStyle: 'none',
    display: 'flex',
    justifyContent: 'space-between',
  },
  flexItem: {
    background: '#75a045',
    padding: '5px',
    width: '100%',
    height: '20px',
    marginTop: '70px',
    marginLeft: '1%',
    marginRight: '1%',

    borderRadius: '8px',
    lineHeight: '20px',
    color: 'white',
    fontWeight: 'bolder',
  },
})

const mapStateToProps = state => ({
  profile: state.profile,
  lunchspace: state.lunchspace,
})

function DateBar({ classes }) {
  return (
    <div>
      <ul className={classes.flexContainer}>
        <Button variant="raised" className={classes.flexItem}>
            yesterday
        </Button>
        <Button variant="raised" className={classes.flexItem}>
            today
        </Button>
        <Button variant="raised" className={classes.flexItem}>
            tomorrow
        </Button>
      </ul>
    </div>
  )
}

DateBar.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(connect(mapStateToProps)(DateBar))
