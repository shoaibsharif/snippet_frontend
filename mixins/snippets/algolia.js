import {
  AisConfigure,
  AisHighlight,
  AisHits,
  AisIndex,
  AisInstantSearchSsr,
  AisPagination,
  AisPoweredBy,
  AisRefinementList,
  AisSearchBox,
  AisStats,
  createServerRootMixin
} from "vue-instantsearch";
import algoliasearch from "algoliasearch/lite";

function nuxtRouter(vueRouter) {
  return {
    read() {
      return vueRouter.currentRoute.query;
    },
    write(routeState) {
      vueRouter.push({
        query: routeState,
      });
    },
    createURL(routeState) {
      return vueRouter.resolve({
        query: routeState,
      }).href;
    },
    onUpdate(cb) {
      if (typeof window === 'undefined') return;

      this._onPopState = event => {
        const routeState = event.state;
        // On initial load, the state is read from the URL without
        // update. Therefore, the state object isn't present. In this
        // case, we fallback and read the URL.
        if (!routeState) {
          cb(this.read());
        } else {
          cb(routeState);
        }
      };
      window.addEventListener('popstate', this._onPopState);
    },
    dispose() {
      if (typeof window === 'undefined') return;

      window.removeEventListener('popstate', this._onPopState);
    },
  };
}

export default {
  beforeMount() {
    const results =
      (this.$nuxt.context && this.$nuxt.context.nuxtState.algoliaState) ||
      window.__NUXT__.algoliaState;

    this.instantsearch.hydrate(results);
  },
  serverPrefetch() {
    return this.instantsearch.findResultsState(this).then(algoliaState => {
      this.$ssrContext.nuxt.algoliaState = algoliaState;
    });
  },
  provide() {
    return {
      // Provide the InstantSearch instance for SSR
      $_ais_ssrInstantSearchInstance: this.instantsearch,
    };
  },
  components: {
    AisInstantSearchSsr,
    AisIndex,
    AisConfigure,
    AisRefinementList,
    AisHits,
    AisHighlight,
    AisSearchBox,
    AisStats,
    AisPagination,
    AisPoweredBy
  },
  data() {
    let mixin = createServerRootMixin({
      searchClient: algoliasearch(process.env.NUXT_ENV_ALGOLIA_APP_ID, process.env.NUXT_ENV_ALGOLIA_API_KEY),
      indexName: 'snippets',
      routing: {
        router: nuxtRouter(this.$router),
      },
    });

    return {
      ...mixin.data(),
    };

  },
}
