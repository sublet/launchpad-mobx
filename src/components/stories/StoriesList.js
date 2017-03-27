import _ from 'lodash'
import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { Link } from 'react-router'
import StoryCell from '../../components/stories/StoryCell'

@inject('storiesStore')
@observer class StoriesList extends Component {

  render () {
    const { storiesStore } = this.props

    return (
      <ul className="barstool_feed">
        {_.map(storiesStore.stories, (story) => {
          const key = `story-${story.id}`

          return (
            <StoryCell
              key={key}
              story={story} />
          )
        })}
      </ul>
    )
  }
}

export default StoriesList
