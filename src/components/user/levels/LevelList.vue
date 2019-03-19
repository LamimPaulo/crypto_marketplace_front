<template>
  <div>
    <div class="loader" v-if="loader"></div>
    <vue-headful title="Níveis de usuário - Navi Capital" description="Navi Capital"/>

    <div class="element-wrapper compact pt-4">
      <div class="element-actions d-none d-sm-block">
        <a class="btn btn-primary btn-sm" href="#">
          <i class="os-icon os-icon-copy"></i><span> Copiar Api Code</span>
        </a>
      </div>
      <h6 class="element-header">
        Níveis de usuário
      </h6>
      <div class="element-box-tp">
        <div class="inline-profile-tiles">
          <div class="row">

            <div class="col-4 col-sm-4 col-xxl-3" v-for="level in levels">
              <div class="profile-tile profile-tile-inlined">
                <a class="profile-tile-box">
                  <div class="pt-avatar-w">
                    <i class="os-icon os-icon-star"></i>
                    <i v-if="level.id>1" class="os-icon os-icon-star"></i>
                    <i v-if="level.id>2" class="os-icon os-icon-star"></i>
                    <i v-if="level.id>3" class="os-icon os-icon-star"></i>
                    <i v-if="level.id>4" class="os-icon os-icon-star"></i>
                    <i v-if="level.id>5" class="os-icon os-icon-star"></i>
                  </div>
                  <div class="pt-user-name">
                    <p>{{ level.name}}
                      <span class="badge badge-success" v-if="user.country_id===31 && user.user_level_id===level.id"> <i
                        class="os-icon os-icon-check-circle"></i> </span>
                      <span class="badge badge-success" v-if="user.country_id!==31 && user.user_level_id===level.id"><i
                        class="os-icon os-icon-check-circle"></i> </span>
                    </p>
                    <p v-if="level.id>1"><i class="os-icon os-icon-check text-success"></i> Api Pagamentos</p>
                    <p v-if="level.id===1"><i class="os-icon os-icon-close text-danger"></i> Api Pagamentos</p>
                    <p class="alert alert-primary">
                      Limites Diários:<br>
                      {{ level.btcDiary}} BTC<br>
                      <span v-if="user.country_id!==31">{{ level.usdDiary}}</span>
                      <span v-if="user.country_id===31">{{ level.brlDiary}}</span>
                    </p>

                    <p class="alert alert-secondary">
                      Corretagem:<br>
                      {{ level.brokeragePercent}}<br>
                    </p>


                  </div>
                </a>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'

  export default {
    name: "LevelList",
    data() {
      return {
        levels: [],
        loader: true,
      }
    },
    methods: {
      retrieveLevels() {
        this.$store.dispatch('retrieveLevels')
          .then(response => {
            this.levels = response.data
            this.loader = false
          })
          .catch(error => {
            if (error.response) {
              this.handleErrors(error.response)
            }
          })
      },
      buyLevel(level, coin) {
        this.$store.dispatch('buyLevel', {
          level_id: level,
          abbr: coin
        })
          .then(response => {
            this.$toasted.show(response.data.message, {position: 'bottom-left'}).goAway(3000)
          })
          .catch(error => {
            if (error.response) {
              this.handleErrors(error.response)
            }
          })
      }
    },
    mounted() {
      this.retrieveLevels()
    },
    computed: {
      ...mapGetters([
        'user'
      ]),
    },
  }
</script>

<style scoped>
  .alert {
    color: #fff;
  }
</style>
