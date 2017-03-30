import React from 'react'
import { render } from 'react-dom'
import { Router, Route, IndexRoute, IndexRedirect, browserHistory } from 'react-router'
import { Provider } from 'mobx-react'
import App from './components/App'
import StandardList from './components/stories/StandardList'
import OriginalsList from './components/stories/OriginalsList'
import PodcastsList from './components/stories/PodcastsList'
import StoryDetail from './components/stories/StoryDetail'
import StoriesStore from './stores/StoriesStore'
import CommentsStore from './stores/CommentsStore'

import './styles/index.scss'

const stores = {
  storiesStore: new StoriesStore(),
  commentsStore: new CommentsStore()
}

const onEnterStory = (nextState, replaceState, callback) => {
  stores.storiesStore.fetchStories()
    .then(() => {
      stores.storiesStore.setActiveStory(nextState.params.story_name)
      stores.storiesStore.fetchStoryDetail()
        .then(() => {
          callback(null)
        })
        .catch((error) => {
          callback(error)
        })
    })
    .catch((error) => {
      callback(error)
    })

  // stores.storiesStore.fetchStories()
  //   .then(function() {
  //     stores.storiesStore.setActiveStory(nextState.params.story_name)
  //     stores.storiesStore.fetchStoryDetail()
  //       .then((data) =>
  //         console.log('Data Inside: ', data)
  //       )
  //   })
}

const onEnterFeatured = (nextState, replaceState, callback) => {
  stores.storiesStore.fetchFeatured()
    .then(() => {
      callback(null)
    })
    .catch((error) => {
      callback(error)
    })
}

const onEnterOriginals = (nextState, replaceState, callback) => {
  stores.storiesStore.fetchOriginals()
    .then(() => {
      callback(null)
    })
    .catch((error) => {
      callback(error)
    })
}

const onEnterPodcasts = (nextState, replaceState, callback) => {
  stores.storiesStore.fetchPodcasts()
    .then(() => {
      callback(null)
    })
    .catch((error) => {
      callback(error)
    })
}

//
// const onEnterStory = (nextState, replaceState, callback) => {
//   _.assign(stores.commentsStore, stores.storiesStore.active.comments)
// }

render(
  <Provider {...stores}>
    <Router history={browserHistory}>
      <Route path='/' component={App}>
        <IndexRedirect to='/featured' />
        <Route path='/featured' onEnter={onEnterFeatured}>
          <IndexRoute component={StandardList} />
        </Route>
        <Route path='/originals' onEnter={onEnterOriginals}>
          <IndexRoute component={OriginalsList} />
        </Route>
        <Route path='/podcasts' onEnter={onEnterPodcasts}>
          <IndexRoute component={PodcastsList} />
        </Route>
        <Route path='/:category/:story_name' component={StoryDetail} onEnter={onEnterStory} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
)

if (module.hot) module.hot.accept()
