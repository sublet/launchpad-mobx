import _ from 'lodash'
import React, { Component } from 'react'
import { Link } from 'react-router'

class StoryHeader extends Component {

  getAppTag () {
    return <span className="barstool_feed__row__meta--tag">Tag</span>
  }

  getAuthorName () {
    const { story } = this.props
    return <span className="barstool_feed__row__meta--author">{story.author.name}</span>
  }

  // TODO: Add MomentJS
  getPostDate () {
    const { story } = this.props
    return <span className="barstool_feed__row__meta--time_ago">{story.date}</span>
  }

  render () {
    const { story } = this.props

    const link = `/${story.category[0].slug}/${story.slug}`

    return (
      <header>
        <div className="barstool_feed__row__meta">
          {this.getAppTag()}
          {this.getAuthorName()}
          {this.getPostDate()}
          <span className="barstool_feed__row__meta--comments">0<i className="fa fa-comments"></i></span>
        </div>
        <h4 className="barstool_feed__row__title">{story.title}</h4>
      </header>
    )
  }
}

export default StoryHeader
