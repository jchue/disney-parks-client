<template>
  <div class="event" v-bind:style="'margin-left: ' + positionLeft + '%; width: ' + width + '%;'">
    <span class="name"><slot></slot></span>
    <div class="overlay">
      <span class="dates">
        {{ start | formatDate }} - {{ end | formatDate }}

        ({{ duration.segmented.years }} Years,
        {{ duration.segmented.months }} Months,
        {{ Math.floor(duration.segmented.days) }} Days)
      </span>

      <router-link v-bind:to="event._id" class="details-link">Details</router-link>
    </div>
  </div>
</template>

<script>
import { DateTime } from 'luxon';

export default {
  name: 'Event',
  data() {
    return {
    };
  },
  props: {
    event: Object,
    basis: Number,
    epoch: String,
    start: String,
    end: String,
  },
  computed: {
    duration() {
      return this.calculateDuration(this.start, this.end || DateTime.local());
    },
    positionLeft() {
      /**
       * Calculate position based on the number of days from epoch to start of current event
       * Normalize by calculating as a proportion of the basis
       * Multiply by 100 for percentage
       */
      const epochDate = DateTime.fromISO(this.epoch);
      const delay = this.calculateDuration(epochDate, this.start).totalDays.days;

      return (delay / this.basis) * 100;
    },
    width() {
      /**
       * Calculate width based on the duration of the current event compared to the basis
       * Multiply by 100 for percentage
       */
      return (this.duration.totalDays.days / this.basis) * 100;
    },
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
.event {
  background-color: #79b898;
  box-sizing: border-box;
  font-size: 0.875rem;
  margin-bottom: 1rem;
  overflow: hidden;
  padding: 0.438rem 0.5rem;
  white-space: nowrap;

  &:hover {
    cursor: pointer;
    overflow: visible;
  }
}

.name {
  font-weight: bold;
}

.overlay {
  max-height: 0;
  overflow: hidden;
  transition: max-height 5s;
}

.event:hover .overlay {
  max-height: 999rem;
  overflow: visible;
}

.dates {
  display: block;
  font-size: 0.75rem;
  margin-bottom: 0.313rem;
}

.details-link {
  background-color: #2c3e50;
  color: #fff;
  display: inline-block;
  font-size: 0.625rem;
  padding: 0.313rem;
  text-decoration: none;
  text-transform: uppercase;
  transition: background-color 0.2s;

  &:hover {
    background-color: lighten(#2c3e50, 10%);
  }
}
</style>
