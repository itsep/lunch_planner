import React from 'react'
import { FormControl, FormHelperText } from 'material-ui/Form'
import { ValidatorComponent } from 'react-material-ui-form-validator'
import Input from 'material-ui/Input'

export default class FormControlInputValidator extends ValidatorComponent {
  render() {
    const {
      inputLabel, className, errorMessages, validators,
      requiredError, errorText, validatorListener, children, ...rest
    } = this.props
    const { isValid } = this.state

    return (
      <FormControl className={className} error={!isValid}>
        {inputLabel}
        <Input
          ref={(r) => { this.input = r }}
          {...rest}
        />
        <FormHelperText id="name-error-text">
          {(!isValid && this.getErrorMessage()) || errorText}
        </FormHelperText>
      </FormControl>
    )
  }
}
