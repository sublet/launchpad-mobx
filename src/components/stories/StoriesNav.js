import _ from 'lodash'
import React, { Component } from 'react'
import { Link } from 'react-router'

class StoryNav extends Component {

  render () {
    return (
      <nav className="stories__container__section_nav">
        <ul className="kill--list float--list">
          <li><Link to="/">Standard Stories</Link></li>
          <li><Link to="/originals/">Barstool Originals</Link></li>
          <li><Link to="/podcasts/">Podcasts</Link></li>
        </ul>
      </nav>
    )
  }
}

export default StoryNav
