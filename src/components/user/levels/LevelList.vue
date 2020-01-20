<template>
  <div class="container mt-3 mb-3">
    <div class="loader" v-if="loader"></div>
    <top-menu-user></top-menu-user>
    <top-menu></top-menu>
    <vue-headful title="Comprar Key Code Liquidex" description="Liquidex"/>
    <div class="all-wrapper with-side-panel solid-bg-all">
      <div class="layout-w">
        <div class="content-w">
          <!-- <topbar></topbar> -->
          <div class="content-i">
            <!--Content-->
            <div class="content-box">
              <div class="section-heading centered">
                <h3>
                  Geração de Key Code
                </h3>
              </div>

              <div id="generic_price_table">
                <section>
                  <div class="container">

                    <!--BLOCK ROW START-->
                    <div class="row">
                      <div class="col-md-12 col-sm-12 mb-5 text-center">

                        <div>
                          <button class="btn btn-lg btn-outline-dark mb-5"

                                  @click.prevent="copyAddress()">
                            <i class="fa fa-copy mr-2"></i>{{ user.api_key }}
                          </button>

                          <button class="btn btn-lg btn-success mb-5"
                                  @click.prevent="showTokenPinModal()">
                            GERAR NOVO
                          </button>
                        </div>
                        <div>
                          Ao clicar em "GERAR NOVO" você declara estar ciente da desativação permanente do keycode anterior.
                        </div>
                        <!--//BUTTON END-->

                      </div>
                      <!--//BLOCK ROW END-->

                    </div>
                  </div>
                </section>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer></Footer>

    <token-pin v-show="isTokenPinVisible" ref="tokenPinComponent"
               @close-token-pin-modal="closeTokenPinModal" @token-data="handleTokenPinData"/>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  import TopMenu from './../../menu/TopMenu';
  import TopMenuUser from './../../menu/TopMenuUser';
  import Footer from './../../layouts/Footer';
  import TokenPin from '../../verifications/TokenPin'

  export default {
    name: "LevelList",
    data() {
      return {
        levels: [],
        level_popup: null,
        loader: false,
        isTokenPinVisible: false,
        isModalVisible: false,
        token: {
          code: null,
          pin: null
        },
        action: 11,
        level: null
      }
    },
    methods: {
      closeThisModal() {
        this.isModalVisible = false
      },
      copyAddress() {
        const selBox = document.createElement('textarea');
        selBox.style.position = 'fixed';
        selBox.style.left = '0';
        selBox.style.top = '0';
        selBox.style.opacity = '0';
        selBox.value = this.user.api_key;
        document.body.appendChild(selBox);
        selBox.focus();
        selBox.select();
        document.execCommand('copy');
        document.body.removeChild(selBox);
        this.$toasted.show("Copiado", {position: 'top-center'}).goAway(3000)
      },
      buyLevel() {
        this.loader = true
        this.isModalVisible = false
        this.$store.dispatch('buyLevel', {
          action: this.action,
          code: this.token.code,
          pin: this.token.pin,
        })
          .then(response => {
            this.loader = false
            this.$toasted.show(response.data.message, {position: 'bottom-left', type: 'success'}).goAway(3000)
            this.$store.dispatch('retrieveUser')
            this.refresh()
          })
          .catch(error => {
            this.loader = false
            if (error.response) {
              this.handleErrors(error.response)
            }
          })
      },
      refresh() {
        setTimeout(function () {
          location.reload()
        }, 2000)
      },
      showTokenPinModal(method) {
        this.isTokenPinVisible = true
        this.isModalVisible = false
        this.$refs.tokenPinComponent.setData(method, this.action)
      },
      closeTokenPinModal() {
        this.isTokenPinVisible = false;
      },
      handleTokenPinData(data) {
        this.token.code = data.code
        this.token.pin = data.pin
        this.buyLevel()
      },
    },
    computed: {
      ...mapGetters([
        'user'
      ]),
    },
    components: {
      TopMenu,
      TopMenuUser,
      Footer,
      TokenPin,
    }
  }
</script>

<style scoped>
  .alert {
    color: #fff;
  }

  .level-2, .level-8 {
    color: #94d1e4;
  }

  .bt-level-2,
  .bt-level-8 {
    border-top: 5px solid #94d1e4;
  }

  .pricing-plan .plan-description ul .li-level-2:before,
  .pricing-plan .plan-description ul .li-level-8:before {
    color: #94d1e4;
  }

  .btn-level-2,
  .btn-level-8 {
    color: #fff;
    background-color: #94d1e4;
    border-color: #94d1e4;
  }

  .level-3,
  .level-9 {
    color: #4eb3d3;
  }

  .bt-level-3,
  .bt-level-9 {
    border-top: 5px solid #4eb3d3;
  }

  .pricing-plan .plan-description ul .li-level-3:before,
  .pricing-plan .plan-description ul .li-level-9:before {
    color: #4eb3d3;
  }

  .btn-level-3,
  .btn-level-9 {
    color: #fff;
    background-color: #4eb3d3;
    border-color: #4eb3d3;
  }

  .level-4,
  .level-10 {
    color: #2b8cbe;
  }

  .bt-level-4,
  .bt-level-10 {
    border-top: 5px solid #2b8cbe;
  }

  .pricing-plan .plan-description ul .li-level-4:before,
  .pricing-plan .plan-description ul .li-level-10:before {
    color: #2b8cbe;
  }

  .btn-level-4,
  .btn-level-10 {
    color: #fff;
    background-color: #2b8cbe;
    border-color: #2b8cbe;
  }

  .level-5,
  .level-11 {
    color: #ffbd1b;
  }

  .bt-level-5,
  .bt-level-11 {
    border-top: 5px solid #ffbd1b;
  }

  .pricing-plan .plan-description ul .li-level-5:before,
  .pricing-plan .plan-description ul .li-level-11:before {
    color: #ffbd1b;
  }

  .btn-level-5,
  .btn-level-11 {
    color: #fff;
    background-color: #ffbd1b;
    border-color: #ffbd1b;
  }

  .level-6,
  .level-12 {
    color: #5cd150;
  }

  .bt-level-6,
  .bt-level-12 {
    border-top: 5px solid #5cd150;
  }

  .pricing-plan .plan-description ul .li-level-6:before,
  .pricing-plan .plan-description ul .li-level-12:before {
    color: #5cd150;
  }

  .btn-level-6,
  .btn-level-12 {
    color: #fff;
    background-color: #5cd150;
    border-color: #5cd150;
  }

  .price-crossed {
    text-decoration: line-through;
  }
</style>
