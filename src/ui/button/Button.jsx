import React from 'react'
import { Link } from 'react-router-dom'

const Button = ({ text, link, handleClick, styleClass }) => {


	return (
		<Link to={link}>
			<button className={styleClass} onClick={handleClick}>
				{
					text
				}
			</button>
		</Link>
	)
}

export default Button