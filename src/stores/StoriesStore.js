import _ from 'lodash'
import { observable, action, computed } from 'mobx'
import axios from 'axios'

export default class StoriesStore {

  @observable type = 'standard'
  @observable endpoint = 'http://union.barstoolsports.com/v1/stories'

  @observable stories = []
  @observable section_title = "Standard"
  @observable active_story_id = 0

  constructor (stories, story_id) {
    console.log("Constructor: ", stories, story_id)
    if (!_.isEmpty(stories)) this.replaceStories(stories, story_id)
  }

  @computed get active () {
    const found = _.find(this.stories, (story) => story.id === this.active_story_id)
    return found
  }

  @computed get title () {
    if ( this.type === 'podcasts' ) {
      return 'Podcasts'
    } else if ( this.type === 'barstool_originals' ) {
      return 'Originals'
    }
    return 'Posts'
  }

  @computed get endPoint () {
    if ( this.type === 'podcasts' ) {
      return 'http://union.barstoolsports.com/v1/type/podcast'
    } else if ( this.type === 'barstool_originals' ) {
      return 'http://union.barstoolsports.com/v1/type/barstool_original'
    }
    return 'http://union.barstoolsports.com/v1/stories'
  }

  @action parseStoriesPayload (res) {
    return ( typeof(res.stories) !== 'undefined' ) ? res.stories : res;
  }

  @action setActiveStory (post_name) {
    const found = _.find(this.stories, (story) => story.slug === post_name)
    if (!found) return
    this.active_story_id = found.id
    return this.active
  }

  @action fetchFeatured () {
    this.type = "featured"
    return this.fetchStories()
  }

  @action fetchPodcasts () {
    this.type = "podcasts"
    return this.fetchStories()
  }

  @action fetchOriginals () {
    this.type = "barstool_originals"
    return this.fetchStories()
  }

  @action fetchStories () {
    const _this = this
    this.section_title = this.title
    return axios.get(this.endPoint)
      .then(function(response) {
        const stories = _this.parseStoriesPayload(response.data);
        _this.replaceStories(stories)
        return response.data.stories
      })
      .catch(function(err) {
        console.error(err)
      });
  }

  @action fetchStoryDetail () {
    const _this = this
    return axios.get('http://union.barstoolsports.com/v1/stories/' + this.active.id)
      .then(function(response) {
        _this.updateStoryContent(response.data.post_type_meta)
        return response.data;
      })
      .catch(function(err) {
        console.error(err)
      });
  }

  @action replaceStories (items, story_id) {
    this.stories = _.map(items, (item) => {
      return item
    })

    if (story_id) {
      const found = _.find(this.stories, (story) => story.id === story_id)
      this.activeUserId = found.id
      this.setActiveStory(story_id)
    }

  }

  @action updateStoryContent (post_meta) {
    this.active.post_type_meta = post_meta
  }

}
