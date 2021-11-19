<template>
  <div class="timeline">
    <transition name="fade" mode="out-in">
      <Loader v-if="loading"></Loader>
      <div v-if="!loading">
        <div
          v-for="(subgroup, subgroupIndex) in subgroups"
          v-bind:key="subgroup.name"
          class="subgroup">
          <Node
          v-for="node in subgroup.subnodes" v-bind:key="node.slug"
          v-bind:node="node"
          v-bind:start="node.startDate" v-bind:end="node.endDate"
          v-bind:basis="basis" v-bind:epoch="epoch"
          v-on:click.native="getSubgroups(node.slug, subgroupIndex)">
            {{ node.name }} {{ node.subnodes }}
          </Node>
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
import Node from '@/components/Node.vue';
import Notch from '@/components/Notch.vue';

export default {
  components: {
    Node,
    Loader,
    Notch,
  },
  data() {
    return {
      subgroups: [],
      epoch: '1955-07-17T00:00:00.000Z',
      nodes: [],
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
      // Calculate difference between start date of first node and horizon (today)
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
    // Get subgroups of root node
    this.getSubgroups('timeline', 0);
  },
  methods: {
    calculateDuration(startDate, endDate) {
      const start = DateTime.fromISO(startDate);
      const end = DateTime.fromISO(endDate);
      const duration = end.diff(start, 'days');

      return duration.days;
    },
    async getSubgroups(id, subgroupIndex) {
      // Get subgroups of selected node
      const url = `${process.env.VUE_APP_API}/${id}`;
      let { subgroups } = (await axios.get(url)).data.data;
      subgroups = this.sortSubgroups(subgroups);

      // Insert subgroups after subgroup of selected node
      this.subgroups.splice((subgroupIndex + 1), 0, ...subgroups);

      this.loading = false;
    },
    sortSubgroups(subgroups) {
      // Sort the subnodes within each subgroup
      subgroups.forEach((subgroup) => {
        subgroup.subnodes.sort((a, b) => {
          const startDateA = DateTime.fromISO(a.startDate);
          const startDateB = DateTime.fromISO(b.startDate);
          const dateDiff = startDateA.diff(startDateB, 'days');

          return dateDiff.days;
        });
      });

      // Sort the subgroups themselves
      const sortedSubgroups = subgroups.sort((a, b) => {
        // Compare the earliest subnodes from each subgroup
        const firstStartDateA = DateTime.fromISO(a.subnodes[0].startDate);
        const firstStartDateB = DateTime.fromISO(b.subnodes[0].startDate);
        const dateDiff = firstStartDateA.diff(firstStartDateB, 'days');

        return dateDiff.days;
      });

      return sortedSubgroups;
    },
  },
};
</script>

<style lang="scss" scoped>
.subgroup {
  background-color: rgba(0, 0, 0, 0.1);
}

.ruler {
  position: relative;
}
</style>
