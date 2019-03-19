<template>
  <svg class="pie">
    <circle
      v-for="item in dataObjects"
      v-bind:style="{strokeDasharray: `${item.relativeSize} ${circleLength}`, strokeDashoffset: item.offset}"
      r="25%"
      cx="50%"
      cy="50%"
    />
  </svg>
</template>

<script>
  export default {
    name: 'PieChart',
    mounted() {
      setTimeout(() => {
        this.hasMounted = true
      }, 0);
    },
    data() {
      return {
        circleLength: 371.9451599121094,
        hasMounted: false,
        data: [100]
      }
    },
    methods: {
      setData(data){
        this.data = data
      }
    },
    computed: {
      dataTotal() {
        return this.data.reduce((previous, current) => previous + current);
      },
      dataObjects() {
        let startingPoint = 0;

        return this.data.map(item => {
          let relativeSize = ((item / this.dataTotal) * this.circleLength);

          let dataObject = {relativeSize: this.hasMounted ? relativeSize : 0, offset: -startingPoint};

          startingPoint += relativeSize;

          return dataObject;
        })
      }
    },
  }
</script>

<style lang="scss">
  .pie {
    display: block;
    margin: 0 auto;
  }

  .pie circle {
    fill: none;
    stroke-width: 32;
    transition: stroke-dasharray 0.3s ease-in-out, stroke-dashoffset 0.3s ease-in-out;
  }

  $colors: #FF6600 ,#004C39 ,#4893E0 ,#C06C81 ,#C4ADFF ,#FF0000 ,#125442 ,#92D4F4 ,#335878 ,#A0B7FF ,#F0CC00 ,#23A47B ,#1D3775 ,#FFAD95 ,#EDA0FF ,#FF9900 ,#228B6B ,#326FC0 ,#F67780 ,#C191E8 ,#FF3300 ;

  @for $i from 1 through length($colors) {
    .pie circle:nth-child(#{$i}) {
      stroke: nth($colors, $i);
    }
  }
</style>
