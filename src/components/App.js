import React, { Component } from 'react'
import { observer } from 'mobx-react'
import { Link } from 'react-router'
import DevTools from 'mobx-react-devtools'
import UsersList from '../components/UsersList'
import StoriesList from '../components/stories/StoriesList'

@observer class App extends Component {
  render () {
    return (
      <div className='app container'>

        <div className="header__container" >
          <header>
            <Link to='/'>
              Home
            </Link>
          </header>
        </div>

        <div className='columns'>
          <div className='column stories__container'>

            {this.props.children}

          </div>
          <div className='column is-narrow sidebar__container'>
            <div className='workspace-container'>
              Hello Sidebar
            </div>
          </div>
        </div>
        <DevTools />
      </div>
    )
  }
}

export default App
