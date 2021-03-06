<template>
  <div class="event">
    <transition name="fade" mode="out-in">
      <Loader v-if="loading"></Loader>

      <div v-if="!loading" class="wrapper">
        <header class="page-header">
          <h1>{{ name }}</h1>

          <section class="dates">
          {{ startDate | formatDate }} - {{ endDate | formatDate }}

          ({{ duration.segmented.years }} Years,
          {{ duration.segmented.months }} Months,
          {{ Math.floor(duration.segmented.days) }} Days)
          </section>

          <section class="lineage">
            <span v-if="predecessor" class="predecessor">
              <router-link v-bind:to="predecessor._id">
                <strong>Predecessor:</strong> {{ predecessor.name }}
              </router-link>
            </span>
            <span v-if="successor" class="successor">
              <router-link v-bind:to="successor._id">
                <strong>Successor:</strong> {{ successor.name }}
              </router-link>
            </span>
          </section>
        </header>

        <p v-html="description"></p>

        <section v-if="branches" class="branches">
          <h2>Members</h2>

          <ul>
            <li v-for="branch in branches" v-bind:key="branch._id">
              <router-link v-bind:to="branch._id">{{ branch.name }}</router-link>
            </li>
          </ul>
        </section>
      </div>
    </transition>
  </div>
</template>

<script>
import axios from 'axios';
import { DateTime } from 'luxon';
import Loader from '@/components/Loader.vue';

export default {
  components: {
    Loader,
  },
  data() {
    return {
      name: '',
      description: '',
      startDate: '',
      endDate: '',
      predecessor: null,
      successor: null,
      branches: [],
      loading: true,
    };
  },
  computed: {
    duration() {
      return this.calculateDuration(this.startDate, this.endDate || DateTime.local());
    },
  },
  async mounted() {
    const url = `${process.env.VUE_APP_API}/events/${this.$route.params.eventId}`;
    const response = (await axios.get(url)).data.data;

    this.name = response.name;
    this.description = response.description;
    this.startDate = response.startDate;
    this.endDate = response.endDate;
    this.predecessor = response.predecessor;
    this.successor = response.successor;
    this.branches = response.branches;
    this.loading = false;
  },
  methods: {
    calculateDuration(startDate, endDate) {
      const start = DateTime.fromISO(startDate);
      const end = DateTime.fromISO(endDate);
      const totalDays = end.diff(start, 'days');
      const segmented = end.diff(start, ['years', 'months', 'days']);

      return { totalDays, segmented };
    },
  },
};
</script>

<style scoped lang="scss">
.page-header {
  margin-bottom: 2rem;
  text-align: center;
}

.dates {
  margin: -1rem 0 1rem 0;
}

.lineage {
  .predecessor,
  .successor {
    margin: 0 1px;
  }

  .predecessor a,
  .successor a {
    background-color: #42b983;
    box-sizing: border-box;
    color: #fff;
    display: inline-block;
    font-size: 0.875rem;
    height: 2rem;
    padding: 0.5rem 0.5rem;
    text-decoration: none;
    transition: background-color 0.2s;
    vertical-align: middle;
  }

  .predecessor:hover a,
  .successor:hover a {
    background-color: lighten(#42b983, 10%);
  }

  .predecessor::before,
  .successor::after {
    border-bottom: 1rem solid transparent;
    border-left: 1rem solid transparent;
    border-right: 1rem solid transparent;
    border-top: 1rem solid transparent;
    content: '';
    display: inline-block;
    height: 0;
    width: 0;
    vertical-align: middle;
  }

  .predecessor::before {
    border-right: 1rem solid #42b983;
    transition: border-right 0.2s;
  }

  .predecessor:hover::before {
    border-right: 1rem solid lighten(#42b983, 10%);
  }

  .successor::after {
    border-left: 1rem solid #42b983;
    transition: border-left 0.2s;
  }

  .successor:hover::after {
    border-left: 1rem solid lighten(#42b983, 10%);
  }
}
</style>
