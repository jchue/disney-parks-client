<template>
  <div class="timeline">
    <Event v-for="event in events" v-bind:key="event._id" class="event"
    v-bind:start="event.startDate" v-bind:end="event.endDate"
    v-bind:basis="basis" v-bind:epoch="epoch">
      {{ event.name }}
    </Event>
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
      chartData: [
        ['group', 'name', 'start', 'end', 'id'],
      ],
    };
  },
  async mounted() {
    const url = `${process.env.VUE_APP_API}/events`;
    this.events = (await axios.get(url)).data.data;
    this.events = this.events.map((event) => ({
      id: event._id,
      name: event.name,
      startDate: event.startDate,
      endDate: event.endDate || null,
    }));
  },
  methods: {
    formatDate(rawDate) {
      const newDate = new Date(rawDate);

      const year = newDate.getFullYear();
      const month = newDate.getMonth() + 1;
      const day = newDate.getDate();

      return `${month}/${day}/${year}`;
    },
    calculateDuration(startDate, endDate) {
      const start = DateTime.fromISO(startDate);
      const end = DateTime.fromISO(endDate);
      const duration = end.diff(start, 'days');

      return duration.days;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
