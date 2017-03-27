import _ from 'lodash'
import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { Link } from 'react-router'
import StoriesList from '../../components/stories/StoriesList'
import StoriesNav from '../../components/stories/StoriesNav'
import StoryCell from '../../components/stories/StoryCell'

@inject('storiesStore')
@observer class OriginalsList extends Component {

  componentDidMount() {
    const { storiesStore } = this.props
    storiesStore.fetchOriginals()
  }

  render () {
    const { storiesStore } = this.props

    return (
      <div>
        <h1>{storiesStore.section_title}</h1>
        <StoriesNav />
        <StoriesList />
      </div>
    )
  }
}

export default OriginalsList
