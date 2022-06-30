import { render } from 'lit-html'
import { mainTemplate } from '../template/main'
import { relatedResultsTemplate } from '../template/related-search'
import { urlParameterMap } from '../utils/urlParameter'
import { API_URL } from '../utils/constants'
import {noResultsTemplate} from '../template/no-results';

export class SearchModule {
  private spinnerEl: HTMLInputElement | null
  private readonly siteInput: HTMLInputElement | null
  private readonly urlParameter: any

  constructor () {
    this.urlParameter = urlParameterMap()
    this.spinnerEl = document.querySelector('.qg-search-results__spinner')
    this.siteInput = document.querySelector('.qg-site-search__component .qg-search-site__input')

    // check if query porameter is set to start fetch process
    const queryParam = this.urlParameter.query
    if (queryParam) {
      this.processData()
      if (this.siteInput) {
        this.siteInput.value = queryParam
      }
    }
  }

  /**
     * fetchData function fetch the results from the funnelback API and show the loading spinner
     * @return {undefined}
     * */
  async fetchData () {
    this.spinnerEl?.removeAttribute('hidden')
    const response = await fetch(`${API_URL}?query=${this.urlParameter.query}&num_ranks=${this.urlParameter.numRanks}&tiers=off&collection=${this.urlParameter.collection}&profile=${this.urlParameter.profile}&scope=${this.urlParameter.scope}&start_rank=${this.urlParameter.startRank}`)
    return await response.json()
  }

  /**
     * processData function process the results fetched and render templates
     * @return {undefined}
     * */
  processData () {
    this.fetchData().then(data => {
      const { contextualNavigation, results } = data.response.resultPacket;
      if(results.length > 0){
        this.spinnerEl?.setAttribute('hidden', '')
        render(mainTemplate(data?.response, this.urlParameter), document.getElementById('qg-search-results__container')!)
        if(contextualNavigation){
          render(relatedResultsTemplate(contextualNavigation), document.getElementById('related-search__tags')!)
        }
      } else {
        document.querySelector('.qg-search-results__spinner')!.remove();
        render(noResultsTemplate(), document.getElementById('qg-search-results__container')!)
      }
    })
  }
}
