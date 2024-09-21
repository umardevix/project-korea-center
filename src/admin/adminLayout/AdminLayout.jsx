import React from 'react'
import { AdminHeader } from '../components/adminHeader/AdminHeader'
import { Outlet } from 'react-router-dom'

export const AdminLayout = () => {
	return (
		<>
			<AdminHeader />
			<Outlet />
		</>
	)
}
