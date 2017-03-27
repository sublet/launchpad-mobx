import _ from 'lodash'
import React, { Component } from 'react'
import { Link } from 'react-router'
import { moment } from 'moment'

class StoryCell extends Component {

  getImage () {
    const { thumbnail } = this.props.story
    return <img src={thumbnail.location + thumbnail.images[thumbnail.type]} />
  }

  getAppTag () {
    const { story } = this.props
    if (story.tag !== '') {
      return <span className="barstool_feed__row__meta--tag">{story.tag}</span>
    }
    return
  }

  getAuthorName () {
    const { story } = this.props
    return <span className="barstool_feed__row__meta--author">{story.author.name}</span>
  }

  // TODO: Add MomentJS
  getPostDate () {
    const { story } = this.props
    // const date = moment(story.date).fromNow(true);
    return <span className="barstool_feed__row__meta--time_ago">{story.date}</span>
  }

  getClassNames () {
    const { story } = this.props
    return `barstool_feed__row barstool_feed__row--${story.type}`
  }

  render () {
    const { story } = this.props

    const link = `/${story.category[0].slug}/${story.slug}`

    return (
      <li className={this.getClassNames()}>
        <Link to={link}>
          <header>
            <div className="barstool_feed__row__meta">
              {this.getAppTag()}
              {this.getAuthorName()}
              {this.getPostDate()}
              <span className="barstool_feed__row__meta--comments">0<i className="fa fa-comments"></i></span>
            </div>
            <h4 className="barstool_feed__row__title">{story.title}</h4>
          </header>
          <div className="barstool_feed__row__image">
            {this.getImage()}
          </div>
        </Link>
      </li>
    )
  }
}

export default StoryCell
