<template>
  <div class="notch" v-bind:style="'left: ' + positionLeft + '%; width: ' + width + '%;'">
    <span class="tick"></span>
    <span class="year"><slot></slot></span>
  </div>
</template>

<script>
import { DateTime } from 'luxon';

export default {
  name: 'Notch',
  data() {
    return {
    };
  },
  props: {
    basis: Number,
    epoch: String,
    start: Number,
    end: Number,
  },
  computed: {
    duration() {
      return this.calculateDuration(this.start, this.end || DateTime.local());
    },
    positionLeft() {
      /**
       * Calculate position based on the number of days from epoch to start of current node
       * Normalize by calculating as a proportion of the basis
       * Multiply by 100 for percentage
       */
      const epochDate = DateTime.fromISO(this.epoch);
      const delay = this.calculateDuration(epochDate, this.start).totalDays.days;

      return (delay / this.basis) * 100;
    },
    width() {
      /**
       * Calculate width based on the duration of the current node compared to the basis
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
.notch {
  position: absolute;
}

.tick {
  background-color: #2c3e50;
  display: block;
  height: 0.5rem;
  width: 1px;
}

.year {
  display: block;
  font-size: 0.875rem;
  left: -50%;
  padding: 0.25rem;
  position: relative;
  text-align: center;
}
</style>
