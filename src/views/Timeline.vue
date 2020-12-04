<template>
  <div class="timeline">
    <GChart
      :settings="{ packages: ['timeline'] }"
      type="Timeline"
      :data="chartData"
      :options="chartOptions"
    />
  </div>
</template>

<script>
import axios from 'axios';
import { GChart } from 'vue-google-charts';

export default {
  components: {
    GChart,
  },
  data() {
    return {
      chartData: [
        ['group', 'name', 'start', 'end'],
      ],
      chartOptions: {
        height: 2500,
        timeline: {
          colorByRowLabel: true,
          showRowLabels: false,
        },
      },
    };
  },
  async mounted() {
    const events = await this.getEvents();
    this.chartData = this.chartData.concat(events);
  },
  methods: {
    getEvents: async function getEvents() {
      const api = process.env.VUE_APP_API;

      // Retrieve list of events
      const eventObjects = (await axios.get(api)).data.data;

      // Convert to array format required by Google Charts
      const eventArrays = eventObjects.map(
        (event) => [
          event.heir.name,
          event.name,
          new Date(event.startDate),
          (event.endDate ? new Date(event.endDate) : new Date()),
        ],
      );

      return eventArrays;
    },
  },
};
</script>
