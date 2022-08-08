import { useState, useImperativeHandle, forwardRef } from 'react'
import PropTypes from 'prop-types'

const Toggable = forwardRef((props, ref) => {
	const [visible, setVisible] = useState(false)
	const hideFunc = { display: visible ? 'none' : '' }
	const showFunc = { display: visible ? '' : 'none' }

	const toggleVisibility = () => {
		setVisible(!visible)
	}

	useImperativeHandle(ref, () => {
		return {
			toggleVisibility,
		}
	})

	return (
		<div>
			<div style={hideFunc}>
				<button onClick={toggleVisibility}>{props.buttonLabel}</button>
			</div>
			<div style={showFunc}>
				{props.children}
				<button onClick={toggleVisibility}>cancel</button>
			</div>
		</div>
	)
})

Toggable.displayName = 'Toggable'
Toggable.propTypes = {
	buttonLabel: PropTypes.string.isRequired,
}

export default Toggable
