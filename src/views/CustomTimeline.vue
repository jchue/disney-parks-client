<template>
  <div class="timeline">
    <div v-for="(clump, clumpIndex) in clumps" v-bind:key="clump.name" class="clump">
      <Event
      v-for="event in clump.branches" v-bind:key="event._id"
      v-bind:event="event"
      v-bind:start="event.startDate" v-bind:end="event.endDate"
      v-bind:basis="basis" v-bind:epoch="epoch"
      v-on:click.native="getClumps(event._id, clumpIndex)">
        {{ event.name }} {{ event.branches }}
      </Event>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { DateTime } from 'luxon';
import Event from '@/components/Event.vue';

export default {
  components: {
    Event,
  },
  data() {
    return {
      basis: 23884,
      epoch: '1955-07-17T00:00:00.000Z',
      events: [],
      clumps: [],
    };
  },
  async mounted() {
    // Get clumps of root node
    this.getClumps('5fcc2795f9da8a9c8487997b', 0);
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
      const url = `${process.env.VUE_APP_API}/events/${id}`;
      let { clumps } = (await axios.get(url)).data.data;
      clumps = this.sortClumps(clumps);

      // Insert clumps after clump of selected event
      this.clumps.splice((clumpIndex + 1), 0, ...clumps);
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

.test {
  color: red;
}
</style>
