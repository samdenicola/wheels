import React from 'react'
import firebase from 'firebase'
import {Link} from 'react-router-dom'

export default class Header extends React.Component {
  render () {
    // const {} = this.props
    return (
      <div className="app-header">
        <Link to={"/"}>
          <div className={'button'}>
            Back
          </div>
        </Link>
        <div onClick={() => {
          firebase.auth().signOut()
        }} className={'button'}>
          Log Out
        </div>

        <Link to={"/settings/addVehicle"}>
          <div className={'button'}>
            Settings
          </div>
        </Link>

        
      </div>
    )
  }
}