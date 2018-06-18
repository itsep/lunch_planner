import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

const styles = theme => ({
  section: {
    maxWidth: '960px',
    marginLeft: 'auto',
    marginRight: 'auto',
    padding: theme.spacing.unit * 2,
  },
})

function Imprint({ classes }) {
  return (
    <section className={classes.section}>
      <Typography variant="display2" gutterBottom>
        Legal Disclosure
      </Typography>
      <Typography variant="body">
        Information in accordance with Section 5 TMG
      </Typography>
    </section>
  )
}

Imprint.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Imprint)
