<template>
  <ais-instant-search-ssr>


    <div class="bg-white mb-16">
      <div class="container py-10 pb-16">
        <h1 class="text-4xl text-gray-700 font-medium leading-tight mb-4">Search</h1>
        <ais-search-box autofocus :show-loading-indicator="true"/>
        <ais-configure :hits-per-page.camel="10"/>
        <div class="flex justify-between items-center mt-2 mx-3">
          <ais-stats/>
          <client-only>
            <ais-powered-by/>
          </client-only>
        </div>
      </div>
    </div>
    <div class="container">
      <h1 class="text-xl text-gray-600 font-medium mb-6">All snippet</h1>


      <ais-hits>
        <template
          slot="item"
          slot-scope="{ item }"
        >
          <search-snippet-card :snippet="item"/>
        </template>

      </ais-hits>

      <ais-pagination/>
    </div>


  </ais-instant-search-ssr>
</template>


<script>
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
  createServerRootMixin,
} from 'vue-instantsearch';
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
  async middleware(ctx) {
    const data = await ctx.$axios.$get('/api/keys/algolia')
    console.log(data.data.data)
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
</script>
<style lang="scss">


.ais-SearchBox {
  &-form {
    @apply flex w-full;
  }

  &-input {
    @apply rounded-full border border-2 border-gray-300 font-sans px-3 py-2 focus:outline-none appearance-none w-full;
  }

  &-submit {
    @apply hidden;
    svg {
      @apply h-6 w-6;
    }
  }

  &-reset {
    @apply hidden;
  }
}

.ais-Pagination {
  @apply flex w-full mt-6;
  &-list {
    @apply flex mx-auto;
  }

  &-link {
    @apply p-3;
  }

  &-item {
    @apply rounded shadow-md m-3 h-10 w-10 flex items-center justify-center bg-gradient-to-t from-purple-100 to-gray-100 dark:from-gray-700 dark:to-gray-700 dark:text-white;
    &--selected {
      @apply bg-gradient-to-t from-purple-500 to-purple-700 dark:from-purple-500 dark:to-purple-700;
      .ais-Pagination-link {
        @apply text-white;
      }
    }

  }

}

</style>
