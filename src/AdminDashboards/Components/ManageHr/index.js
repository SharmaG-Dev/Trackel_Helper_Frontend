import React, { Fragment, useEffect, useState } from 'react'
import AdminHeader from '../AdminHeader'
import AnimatedBackground from '../../Elements/AnimatedBacground'
import AdminNavItems from '../../Elements/AdminNavItems'
import { TabContent, TabPane } from 'reactstrap'
import ManageEmployee from './ManageEmployee'
import ManageServiceProvider from './ManageServiceProvider'
import { useUserRoleContext } from '../../../Context/RolesContext'

const AdminManageHr = () => {
  const [attendanceActive, setActiveAttendance] = useState("employee")
  const { userRole, setUserRole, UserRoleCalled } = useUserRoleContext();
  // to set the active page 
  const ActiveTabFunction = () => {
    if (userRole.ManageEmployee) {
      setActiveAttendance('employee')
    } else if (userRole.ManageServiceProvider) {
      setActiveAttendance("service-provider")
    }
  }

  useEffect(() => {
    ActiveTabFunction()
  }, [userRole])

  useEffect(() => {
    UserRoleCalled()
  }, [])

  return (
    <Fragment>
      <AdminHeader />
      <div className='position-relative'>
        <AnimatedBackground />
        <div className='BackgroundTopContents'>
          <AdminNavItems />
          <div className="AttendenceTabs px-3">
            {userRole && userRole.ManageEmployee ? <span className={` ${attendanceActive === "employee" ? "AttendenceTabs_Active" : ""}`} onClick={() => { setActiveAttendance("employee") }}>Manage Employee</span> : null}
            {userRole && userRole.ManageServiceProvider ? <span className={` ${attendanceActive === "service-provider" ? "AttendenceTabs_Active" : ""}`} onClick={() => { setActiveAttendance("service-provider") }}>Manage Service Provider</span> : null}
          </div>
          <TabContent activeTab={attendanceActive} >
            {userRole && userRole.ManageEmployee || userRole.ManageHR ?
              <TabPane tabId="employee">
                <ManageEmployee setActiveAttendance={setActiveAttendance} />
              </TabPane>
              : userRole.ManageServiceProvider ?
                <TabPane tabId="service-provider">
                  <ManageServiceProvider setActiveAttendance={setActiveAttendance} />
                </TabPane>
                : null}
          </TabContent>
        </div>
      </div>
    </Fragment>
  )
}
export default AdminManageHr