import React from 'react'
import { render } from 'react-dom'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { enter } from 'react-router-promises'
import { Provider } from 'mobx-react'
import App from './components/App'
import StandardList from './components/stories/StandardList'
import OriginalsList from './components/stories/OriginalsList'
import PodcastsList from './components/stories/PodcastsList'
import StoryDetail from './components/stories/StoryDetail'
import StoriesStore from './stores/StoriesStore'

import './styles/index.scss'

const stores = { storiesStore: new StoriesStore() }

const onEnterUser = (nextState) => {
  stores.storiesStore.fetchStories()
    .then(function() {
      stores.storiesStore.setActiveStory(nextState.params.story_name)
      stores.storiesStore.fetchStoryDetail()
        .then((data) =>
          console.log('Data Inside: ', data)
        )
    })
}

render(
  <Provider {...stores}>
    <Router history={browserHistory}>
      <Route path='/' component={App}>
        <IndexRoute component={StandardList} storyType="" />
        <Route path='/originals/' component={OriginalsList} storyType="barstool_original" />
        <Route path='/podcasts/' component={PodcastsList} storyType="podcasts" />
        <Route path='/:category/:story_name' component={StoryDetail} onEnter={onEnterUser} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
)

if (module.hot) module.hot.accept()
