import _ from 'lodash'
import { observable, action, computed } from 'mobx'
import axios from 'axios'

export default class CommentsStore {

  @observable comments = []
  @observable story_id = 0

  constructor (stories, story_id) {
    console.log("Constructor: ", stories, story_id)
  }

  @action fetchComments () {
    const _this = this
    return axios.get('http://union.barstoolsports.com/v1/comments/')
      .then(function(response) {
        _this.replaceStories(response.data.stories)
        return response.data.stories
      })
      .catch(function(err) {
        console.error(err)
      });
  }

}
