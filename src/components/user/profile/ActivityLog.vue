<template>

  <div class="element-wrapper">
    <h6 class="element-header">Atividades Recentes</h6>
    <div class="element-box-tp">

      <div class="activity-boxes-w">

        <div class="activity-box-w" v-for="hist in logs">
          <div class="activity-time">{{ hist.localCreated}}</div>
          <div class="activity-box">
            <div class="activity-info">
              <!--              <div class="activity-role">John Mayers</div>-->
              <strong class="activity-title">{{ hist.description }}</strong>
            </div>
          </div>
        </div>

        <div v-if="!this.logs" class="activity-box-w">
          <span class="badge badge-danger">Sem atividade recente!</span>
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
