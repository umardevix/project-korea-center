import React from 'react'
import styles from './_admin_header.module.scss'
import { Link } from 'react-router-dom'

export const AdminHeader = () => {
	return (
		<header>
			<div className="container">
				<div className={styles.admin_header}>
					<div className={styles.admin_header_logo}>
						<Link to={'/admin'}>
							<img src="/assets/svg/logo.svg" alt="" />
						</Link>
					</div>
					<nav className={styles.admin_header_link}>
						<Link className={styles.admin_header_link_item} to='/admin'>
							Товары
						</Link>
						<Link className={styles.admin_header_link_item} to='/admin/order'>
							Заказы
						</Link>
					</nav>
				</div>
			</div>
		</header>
	)
}
