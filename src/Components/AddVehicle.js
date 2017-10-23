import React from 'react'
import firebase from 'firebase'
import {Link} from 'react-router-dom'
import Settings from './Settings'
import {db} from '../fire'

export default class Header extends React.Component {
  render () {
    const {user} = this.props
    return (
      <div className="wh-add-vehicle">
        Cool Vehicle Picker Here
        <div onClick={() => {
          db.collection('vehicles').add({
            
            vehicleType: 'sprinter',
            vehicleName: 'wanda'
          })
        }} className={'button'}>
          Add Vehicle
        </div>
      </div>
    )
  }
}