<template>
  <div class="countdown center">
    <div class="block">
      <p class="digit">{{ hours | two_digits }}</p>
    </div>
    <div class="block">
      <p class="digit">:</p>
    </div>
    <div class="block">
      <p class="digit">{{ minutes | two_digits }}</p>
    </div>
    <div class="block">
      <p class="digit">:</p>
    </div>
    <div class="block">
      <p class="digit">{{ seconds | two_digits }}</p>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'

  Vue.filter('two_digits', (value) => {
    if (value < 0) {
      return '00';
    }
    if (value.toString().length <= 1) {
      return `0${value}`;
    }
    return value;
  });

  export default {
    name: "Timer",
    props: {
      starttime: '',
      endtime: '',
    },
    data: function () {
      return {
        timer: "",
        start: "",
        end: "",
        interval: "",
        days: "",
        minutes: "",
        hours: "",
        seconds: "",
      };
    },
    mounted() {
      this.start = new Date(this.starttime).getTime();
      this.end = new Date(this.endtime).getTime();
      // Update the count down every 1 second
      this.timerCount(this.start, this.end);
      this.interval = setInterval(() => {
        this.start = this.start + 1000
        this.timerCount(this.start, this.end);
      }, 1000);
    },
    methods: {
      timerCount: function (start, end) {
        // Get todays date and time
        let now = new Date(start).getTime();

        // Find the distance between now an the count down date
        let distance = start - now;
        let passTime = end - now;


         if (distance < 0 && passTime < 0) {
           clearInterval(this.interval);
           return;
         }else{
           this.calcTime(passTime);
         }
      },
      calcTime: function (dist) {
        // Time calculations for days, hours, minutes and seconds
        this.days = Math.floor(dist / (1000 * 60 * 60 * 24));
        this.hours = Math.floor((dist % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        this.minutes = Math.floor((dist % (1000 * 60 * 60)) / (1000 * 60));
        this.seconds = Math.floor((dist % (1000 * 60)) / 1000);
      }

    }
  }
</script>

<style scoped>
  .countdown {
    display: flex;
  }

  .center {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .block {
    display: flex;
    flex-direction: column;
    padding-right: 0.2em;
  }

  .text {
    text-align: center;
  }

  .digit {
    text-align: center;
  }
</style>
