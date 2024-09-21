import React, { useEffect } from 'react'
import styles from './_trashButton.module.scss'
import axios from "axios"

export const ButtonTrash = ({ el }) => {
	async function deleteService() {
		const con = confirm('Are you sure you want to delete')
		if (con) {
			const res = await axios.delete(`/api/basket/${el.id}`)
			if (res.status === 200) {
				console.log('Service deleted')
				window.location.reload()
			}
		}
		else {
		}
	}
	return (
		<button onClick={() => deleteService()} className={styles.trash}>
			<img src="/assets/svg/trash.svg" alt="" />
		</button>
	)
}
