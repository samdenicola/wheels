import React from 'react'
import firebase from 'firebase'
import {Link} from 'react-router-dom'
import Settings from './Settings'

export default class Header extends React.Component {
  render () {
    // const {} = this.props
    return (
      <div className="app-header">
        <Link to={"/settings"}>
          <div className={'button'}>
            Settings
          </div>
        </Link>

      </div>
    )
  }
}