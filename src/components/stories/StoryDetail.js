import _ from 'lodash'
import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import StoryHeader from './StoryHeader'

@inject('storiesStore')
@observer class StoryDetail extends Component {

  render () {
    const { storiesStore } = this.props

    if (!storiesStore.active) return null

    return (
      <ul className="barstool_feed">
        <li className="barstool_feed__row barstool_feed__row--detail">
          <StoryHeader story={storiesStore.active} />
          <div className="barstool_feed__row__content">
            <div dangerouslySetInnerHTML={{__html: storiesStore.active.post_type_meta.standard_post.content}} />
          </div>
        </li>
      </ul>
    )
  }
}

export default StoryDetail
