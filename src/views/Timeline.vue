<template>
  <div class="timeline">
    <GChart
      :settings="{ packages: ['timeline'] }"
      type="Timeline"
      @ready="onChartReady"
      :events="chartEvents"
      :key="chartKey"
      ref="gChart"
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
      chartKey: 0,
      chartData: [
        ['group', 'name', 'start', 'end', 'id'],
      ],
      chartOptions: {
        height: 2500,
        timeline: {
          colorByRowLabel: true,
          showRowLabels: false,
        },
      },
      chartEvents: {
        select: async () => {
          // Get ID of selected event
          const table = this.$refs.gChart.chartObject;
          const selection = table.getSelection();
          const { row } = selection[0];
          const id = this.dataTable.getValue(row, 4);

          // Get branches of selected event
          const branches = await this.getBranches(id);

          // Insert branches
          if (branches) {
            this.addBranches(row, branches);
          }
        },
      },
    };
  },
  methods: {
    getEvents: async function getEvents() {
      const url = `${process.env.VUE_APP_API}/events`;

      // Retrieve list of events
      const eventObjects = (await axios.get(url)).data.data;

      // Convert to array format required by Google Charts
      const eventArrays = eventObjects.map(
        (event) => [
          event.heir.name,
          event.name,
          new Date(event.startDate),
          (event.endDate ? new Date(event.endDate) : new Date()),
          event._id,
        ],
      );

      return eventArrays;
    },
    onChartReady: async function onChartReady(chart, google) {
      // Retrieve root event and append to chartData if new page
      if (this.chartKey === 0) {
        const rootEvent = await this.getEvent('5c78ba6b16a7b09e4c938d80');
        this.chartData.push(rootEvent);
      }

      // Create dataTable to be accessible externally
      this.dataTable = await google.visualization.arrayToDataTable(this.chartData);

      // Hide ID column
      const dataView = new google.visualization.DataView(this.dataTable);
      dataView.hideColumns([4]);

      chart.draw(dataView, this.chartOptions);
    },
    getEvent: async function getEvent(id) {
      const url = `${process.env.VUE_APP_API}/events/${id}`;

      // Retrieve list of events
      const eventObject = (await axios.get(url)).data.data;

      // Convert to array format required by Google Charts
      const eventArray = [
        eventObject.heir.name,
        eventObject.name,
        new Date(eventObject.startDate),
        (eventObject.endDate ? new Date(eventObject.endDate) : new Date()),
        eventObject._id,
      ];

      return eventArray;
    },
    getBranches: async function getBranches(id) {
      const url = `${process.env.VUE_APP_API}/events/${id}/subtree`;

      const { branches } = (await axios.get(url)).data.data;

      return branches;
    },
    addBranches: async function addBranches(rowIndex, branchObjects) {
      // Convert to array format required by Google Charts
      const branchArrays = branchObjects.map((branch) => [
        branch.heir.name,
        branch.name,
        new Date(branch.startDate),
        (branch.endDate ? new Date(branch.endDate) : new Date()),
        branch._id,
      ]);

      // Adjust for array index
      const index = rowIndex + 2;

      // Splice at new index
      this.chartData.splice(index, 0, ...branchArrays);
      this.chartKey += 1;
    },
  },
};
</script>

<style lang="scss" scoped>
#site-body {
  padding-top: 0rem;
}
</style>
