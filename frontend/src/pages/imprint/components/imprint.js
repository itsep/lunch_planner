import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import localizedStrings from '../../../lib/localization'

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
      <Typography variant="headline" gutterBottom>
        {localizedStrings.legalDisclosure}
      </Typography>
      <Typography variant="title" gutterBottom>
        {localizedStrings.section5Tmg}
      </Typography>
      <Typography variant="body" gutterBottom>
        David Nadoba
        <br />
        67117 Limburgerhof
        <br />
        Erpholzheimer Straße 17
      </Typography>
      <Typography variant="title" gutterBottom>
        {localizedStrings.contact}
      </Typography>
      <Typography variant="body2">
        {localizedStrings.phone}: +491627657742
        <br />
        {localizedStrings.email}: dnadoba@gmail.com
        <br />
        {localizedStrings.support}: itsep.info@gmail.com
      </Typography>
    </section>
  )
}

Imprint.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Imprint)
