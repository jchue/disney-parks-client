<template>
  <div class="timeline">
    <transition name="fade" mode="out-in">
      <Loader v-if="loading"></Loader>
      <div v-if="!loading">
        <div v-for="(clump, clumpIndex) in clumps" v-bind:key="clump.name" class="clump">
          <Event
          v-for="event in clump.branches" v-bind:key="event.slug"
          v-bind:event="event"
          v-bind:start="event.startDate" v-bind:end="event.endDate"
          v-bind:basis="basis" v-bind:epoch="epoch"
          v-on:click.native="getClumps(event.slug, clumpIndex)">
            {{ event.name }} {{ event.branches }}
          </Event>
        </div>
        <div class="ruler">
            <Notch v-for="notch in notches" v-bind:key="notch"
            v-bind:start="notch" v-bind:end="notch + increment"
            v-bind:basis="basis" v-bind:epoch="epoch">{{ notch }}</Notch>
          </div>
      </div>
    </transition>
  </div>
</template>

<script>
import axios from 'axios';
import { DateTime } from 'luxon';
import Loader from '@/components/Loader.vue';
import Event from '@/components/Event.vue';
import Notch from '@/components/Notch.vue';

export default {
  components: {
    Event,
    Loader,
    Notch,
  },
  data() {
    return {
      clumps: [],
      epoch: '1955-07-17T00:00:00.000Z',
      events: [],
      increment: 5,
      loading: true,
    };
  },
  computed: {
    horizon() {
      // Assume current date as the last date
      return DateTime.local();
    },
    basis() {
      // Calculate difference between start date of first event and horizon (today)
      return this.calculateDuration(this.epoch, this.horizon);
    },
    firstNotch() {
      const epochDate = DateTime.fromISO(this.epoch);
      let yearToRound;

      // If epoch is precisely Jan 1, use the year
      // Otherwise, date falls in the middle of the year, so use the following year
      if (epochDate.month === 1 && epochDate.day === 1) {
        yearToRound = epochDate.year;
      } else {
        yearToRound = epochDate.year + 1;
      }

      // Round up to the nearest increment
      return Math.ceil(yearToRound / this.increment) * this.increment;
    },
    lastNotch() {
      // Get year of horizon date
      const horizonDate = this.horizon;
      const yearToRound = horizonDate.year;

      // Round down to the nearest increment
      return Math.floor(yearToRound / this.increment) * this.increment;
    },
    notches() {
      const notches = [];
      let notch = this.firstNotch;

      do {
        notches.push(notch);
        notch += this.increment;
      } while (notch <= this.lastNotch);

      return notches;
    },
  },
  async mounted() {
    console.log(this.basis);
    // Get clumps of root node
    this.getClumps('root', 0);
  },
  methods: {
    calculateDuration(startDate, endDate) {
      const start = DateTime.fromISO(startDate);
      const end = DateTime.fromISO(endDate);
      const duration = end.diff(start, 'days');

      return duration.days;
    },
    async getClumps(id, clumpIndex) {
      // Get clumps of selected event
      const url = `${process.env.VUE_APP_API}/${id}`;
      let { clumps } = (await axios.get(url)).data.data;
      clumps = this.sortClumps(clumps);

      // Insert clumps after clump of selected event
      this.clumps.splice((clumpIndex + 1), 0, ...clumps);

      this.loading = false;
    },
    sortClumps(clumps) {
      // Sort the branches within each clump
      clumps.forEach((clump) => {
        clump.branches.sort((a, b) => {
          const startDateA = DateTime.fromISO(a.startDate);
          const startDateB = DateTime.fromISO(b.startDate);
          const dateDiff = startDateA.diff(startDateB, 'days');

          return dateDiff.days;
        });
      });

      // Sort the clumps themselves
      const sortedClumps = clumps.sort((a, b) => {
        // Compare the earliest branches from each clump
        const firstStartDateA = DateTime.fromISO(a.branches[0].startDate);
        const firstStartDateB = DateTime.fromISO(b.branches[0].startDate);
        const dateDiff = firstStartDateA.diff(firstStartDateB, 'days');

        return dateDiff.days;
      });

      return sortedClumps;
    },
  },
};
</script>

<style lang="scss" scoped>
.clump {
  background-color: rgba(0, 0, 0, 0.1);
}

.ruler {
  position: relative;
}
</style>
