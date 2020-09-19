<template>
  <div>
     <div class="row">
    <h3>Number of states with positive COVID19 cases per day</h3>
    <div :style="divStyle" v-if="loaded" class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-8 col-md-offset-2">
      <pie-chart :data="chartStateData" />
    </div>
     </div>
    <hr>
     <div class="row">
    <h3>Number of total increased deaths per day</h3>
    <div :style="divStyle" v-if="loaded" class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-8 col-md-offset-2">
      <line-chart :data="chartdeathIncreaseData" />
    </div>
     </div>
    <hr>
     <div class="row">
    <h3>Number of positive COVID19 cases per day</h3>
     <div :style="divStyle" v-if="loaded" class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-8 col-md-offset-2">
      <bar-chart :data="chartPositiveData" />
    </div>
  </div>
  </div>
</template>


<script>
import PieChart from "@dpc-sdp/myvic-pie-chart";
import BarChart from "@dpc-sdp/myvic-bar-chart";
import LineChart from '@dpc-sdp/myvic-line-chart'
import moment from "moment";

const chStyle = {
  width: "500px",
  height: "600px"
};
export default {
  components: {
    PieChart,
    BarChart,
    LineChart
  },
  data() {
    return {
      labelToDate: [],
      covidStates: [],
      covidpositive: [],
      coviddeathIncrease: [],
      statedatasets: [],
      positivedatasets: [],
      deathIncreasedatasets: [],
      chartStateData: null,
      chartPositiveData: null,
      chartdeathIncreaseData: null,
      loaded: false
    };
  },
  props: {
    divStyle: {
      default: () => chStyle
    }
  },
  methods: {
    fetchData() {
      this.$http
        .get("https://covidtracking.com/api/us/daily")
        .then(response => {
          return response.json();
        })
        .then(data => {
          data.forEach(d => {
            const date = moment(d.date, "YYYYMMDD").format("MM/DD");

            const {
              positive,
              // hospitalizedCurrently,
              // inIcuCurrently,
              // onVentilatorCurrently,
              // recovered,
              // death,
              deathIncrease,
              states
            } = d;
            console.log(d);
            this.labelToDate.push(date);
            this.covidStates.push(states);
            this.covidpositive.push(positive);
            this.coviddeathIncrease.push(deathIncrease);
          });
          this.statedatasets.push({ data: this.covidStates.slice(0, 50) });
          this.chartStateData = {
            labels: this.labelToDate.slice(0, 50),
            datasets: this.statedatasets
          };
          this.positivedatasets.push({ data: this.covidpositive.slice(0, 50) });
          this.chartPositiveData = {
            labels: this.labelToDate.slice(0, 50),
            datasets: this.positivedatasets
          };
          this.deathIncreasedatasets.push({ data: this.coviddeathIncrease.slice(0, 50) });
          this.chartdeathIncreaseData = {
            labels: this.labelToDate.slice(0, 50),
            datasets: this.deathIncreasedatasets
          };
          this.loaded = true;
        });
    }
  },
  async created() {
    this.fetchData();
  }
};
</script>
