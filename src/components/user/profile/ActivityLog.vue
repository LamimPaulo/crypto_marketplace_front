<template>
  <div class="element-wrapper">
    <div class="element-box">
      <h6 class="element-header">
        Sua Atividade
      </h6>
      <div class="timed-activities compact">
        <div class="timed-activity">

          <div class="ta-record-w">
            <div class="ta-record" v-for="hist in logs">
              <div class="ta-timestamp">
                <strong>{{ hist.localCreated}}</strong>
              </div>
              <div class="ta-activity">
                {{ hist.description }}
              </div>
            </div>


          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "ActivityLog",
    data() {
      return {
        logs: []
      }
    },
    methods: {
      retrieveHist() {
        this.$store.dispatch('retrieveHist')
          .then(response => {
            this.logs = response.data.logs
          })
          .catch(error => {
            if (error.response) {
              this.handleErrors(error.response)
            }
          })
      }
    },
    mounted() {
      this.retrieveHist()
    }
  }
</script>

<style scoped>

</style>
