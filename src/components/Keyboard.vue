<template>
  <Bar
    :chart-options="chartOptions"
    :chart-data="chartData"
    :chart-id="chartId"
    :dataset-id-key="datasetIdKey"
    :plugins="plugins"
    :css-classes="cssClasses"
    :styles="styles"
    :width="width"
    :height="height"
  />
</template>

<script>
import { Bar } from "vue-chartjs/legacy";
import order from "@/axios/order";

import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

export default {
  name: "BarChart",
  components: {
    Bar,
  },
  props: {
    chartId: {
      type: String,
      default: "bar-chart",
    },
    datasetIdKey: {
      type: String,
      default: "label",
    },
    width: {
      type: Number,
      default: 400,
    },
    height: {
      type: Number,
      default: 600,
    },
    cssClasses: {
      default: "",
      type: String,
    },
    styles: {
      type: Object,
      default: () => {},
    },
    plugins: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      tableData: [],
      showData: [],
      data: [],
      chartData: {
        labels: [
          "1月 ",
          "2月 ",
          "3月 ",
          "4月 ",
          "5月 ",
          "6月 ",
          "7月 ",
          "8月 ",
          "9月 ",
          "10月 ",
          "11月 ",
          "12月 ",
        ],
        datasets: [
          {
            label: "订单",
            backgroundColor: "#f87979",
            data: [40, 20, 12, 39, 10, 40, 39, 80, 40, 20, 12, 11],
          },
        ],
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
      },
    };
  },
  async created() {
    let data = await order.search();
    if (data.data.status == "success") {
      this.tableData = data.data.data;
      this.showData = this.tableData;
      let a = 0;
      let b = 0;
      let c = 0;
      let d = 0;
      let e = 0;
      let f = 0;
      let g = 0;
      let h = 0;
      let i = 0;
      let j = 0;
      let k = 0;
      let l = 0;
      this.showData.forEach((item) => {
        const moment = require("moment");
        item.time = moment(item.time).format("MM");
        if (item.time == "01") {
          a++;
        } else if (item.time == "02") {
          b++;
        } else if (item.time == "03") {
          c++;
        } else if (item.time == "04") {
          d++;
        } else if (item.time == "05") {
          e++;
        } else if (item.time == "06") {
          f++;
        } else if (item.time == "07") {
          g++;
        } else if (item.time == "08") {
          h++;
        } else if (item.time == "09") {
          i++;
        } else if (item.time == "10") {
          j++;
        } else if (item.time == "11") {
          k++;
        } else if (item.time == "12") {
          l++;
        }
      });
      this.data = [a,b,c,d,e,f,g,h,i,j,k,l]
    }
    this.chartData.datasets[0].data = this.data
  },
};
</script>
