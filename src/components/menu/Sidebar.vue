<template>
  <div class="content-panel compact color-scheme-light">
    <!-- <div class="content-panel-close">
      <i class="os-icon os-icon-close"></i>
    </div> -->
    <div class="element-wrapper compact">
      <div class="element-box-tp">
        <div class="dark-bg ">
          <div class="market" v-for="coin in quotes">
            <div class="market-share">
              <strong class="share-name" style="color: #FFF">{{ coin.abbr }}</strong>
            </div>
            <div class="marketchangedata">
              <div class="marketpercent green">
                1CP
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>


    <div class="element-wrapper">
      <h6>
        <img :src="require(`@/assets/img/svg_icons/id-card.svg`)" width="30px" alt="">
        Verificação de Perfil
        <hr>
      </h6>
      <div class="element-box-tp">

        <div class="todo-list">
          <a class="todo-item" href="/levels" v-if="!user.api_key"
             style="border: 1px solid rgb(4, 123, 248);">
            <div class="ti-info">
              <div class="ti-header"> Key Code</div>
              <div class="ti-sub-header"> Você não possui Key Code</div>
            </div>
            <div class="ti-icon">
              <i class="os-icon os-icon-arrow-right7"></i>
            </div>
          </a>

          <a class="todo-item" v-tooltip.right="'Clique para Copiar'" @click="copyAddress" v-else
             style="border: 1px solid rgb(4, 123, 248);">
            <div class="ti-success">
              <div class="ti-header"> Key Code</div>
              <div class="ti-sub-header"> {{ user.api_key }}</div>
            </div>
            <div class="ti-icon">
              <i class="os-icon os-icon-copy"></i>
            </div>
          </a>


          <a class="todo-item error" href="/profile"
             v-if="!user.pin_filled">
            <div class="ti-info">
              <div class="ti-header"> Pin de Segurança</div>
              <div class="ti-sub-header"> Você ainda não criou seu pin</div>
            </div>
            <div class="ti-icon"><i class="os-icon os-icon-info"></i></div>
          </a>

          <a class="todo-item complete" href="/profile"
             v-if="user.pin_filled">
            <div class="ti-info">
              <div class="ti-header"> Pin de Segurança</div>
              <div class="ti-sub-header"> pin de segurança criado</div>
            </div>
            <div class="ti-icon"><i class="os-icon os-icon-check"></i></div>
          </a>

          <p v-if="user.document_verified">
            <a class="todo-item complete" href="#">
              <div class="ti-info">
                <div class="ti-header"> Identificado</div>
                <div class="ti-sub-header"> Dados pessoais preenchidos</div>
              </div>
              <div class="ti-icon"><i class="os-icon os-icon-check"></i></div>
            </a>
          </p>

          <p v-if="!user.document_verified">
            <a class="todo-item error" href="/profile"
               v-if="!user.document">
              <div class="ti-info">
                <div class="ti-header"> Dados Pessoais</div>
                <div class="ti-sub-header"> Seus dados estão incompletos</div>
              </div>
              <div class="ti-icon"><i class="os-icon os-icon-info"></i></div>
            </a>
          </p>

          <p v-if="user.user_level_id>1||user.country_id!==31">
            <a class="todo-item complete" href="#" v-if="documents.document_status==='valid'">
              <div class="ti-info">
                <div class="ti-header"> Envio de Documento</div>
                <div class="ti-sub-header"> {{ documents.document_message }}</div>
              </div>
              <div class="ti-icon"><i class="os-icon os-icon-check"></i></div>
            </a>

            <a class="todo-item pending" href="#" v-if="documents.document_status==='pending'">
              <div class="ti-info">
                <div class="ti-header"> Envio de Documento</div>
                <div class="ti-sub-header"> {{ documents.document_message }}</div>
              </div>
              <div class="ti-icon"><i class="os-icon os-icon-eye"></i></div>
            </a>

            <a class="todo-item error" href="/profile"
               v-if="documents.document_status==='not_found'||documents.document_status==='invalid'">
              <div class="ti-info">
                <div class="ti-header"> Envio de Documento</div>
                <div class="ti-sub-header"> {{ documents.document_message }}</div>
              </div>
              <div class="ti-icon"><i class="os-icon os-icon-info"></i></div>
            </a>

            <a class="todo-item complete" href="#" v-if="documents.selfie_status==='valid'">
              <div class="ti-info">
                <div class="ti-header"> Selfie de Segurança</div>
                <div class="ti-sub-header"> {{ documents.selfie_message }}</div>
              </div>
              <div class="ti-icon"><i class="os-icon os-icon-check"></i></div>
            </a>

            <a class="todo-item pending" href="#" v-if="documents.selfie_status==='pending'">
              <div class="ti-info">
                <div class="ti-header"> Selfie de Segurança</div>
                <div class="ti-sub-header"> {{ documents.selfie_message }}</div>
              </div>
              <div class="ti-icon"><i class="os-icon os-icon-eye"></i></div>
            </a>

            <a class="todo-item error" href="/profile"
               v-if="documents.selfie_status==='not_found'||documents.selfie_status==='invalid'">
              <div class="ti-info">
                <div class="ti-header"> Selfie de Segurança</div>
                <div class="ti-sub-header"> {{ documents.selfie_message }}</div>
              </div>
              <div class="ti-icon"><i class="os-icon os-icon-info"></i></div>
            </a>
          </p>

          <p v-if="user.user_level_id===3">
            <a class="todo-item error" href="/profile"
               v-if="!user.document">
              <div class="ti-info">
                <div class="ti-header"> Dados Pessoais</div>
                <div class="ti-sub-header"> Seus dados estão incompletos</div>
              </div>
              <div class="ti-icon"><i class="os-icon os-icon-info"></i></div>
            </a>
          </p>

        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import {mapGetters} from 'vuex'

  export default {
    name: "Sidebar",
    data() {
      return {
        count: null,
        documents: {
          selfie_status: 'not_found',
          selfie_message: 'Arquivo ainda não enviado',
          document_status: 'not_found',
          document_message: 'Arquivo ainda não enviado',
        },
        quotes: [],
        timer: '',
      }
    },
    computed: {
      ...mapGetters([
        'user'
      ]),
    },
    methods: {
      retrieveDocuments() {
        this.$store.dispatch('retrieveDocuments')
          .then(response => {
            this.documents.selfie_status = response.data.selfie.status
            this.documents.selfie_message = response.data.selfie.message
            this.documents.document_status = response.data.document.status
            this.documents.document_message = response.data.document.message
          }).catch(error => {
          if (error.response) {
            this.handleErrors(error.response)
          }
        })
      },
      retrieveQuotes() {
        this.$store.dispatch('retrieveQuotes')
          .then(response => {
            this.quotes = response.data

          }).catch(error => {
          if (error.response) {
            this.handleErrors(error.response)
          }
        })
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
        this.$toasted.show('Copiado!', {position: 'bottom-left', type: 'info'}).goAway(3000)
      }
    },
    mounted() {
      this.retrieveDocuments()
      this.retrieveQuotes();
      this.timer = setInterval(function () {
        this.retrieveQuotes();
      }.bind(this), 60000);

    },
  }
</script>

<style scoped>
  .todo-item {
    cursor: pointer;
  }

  .content-panel {
    border: 1px solid #cecece;
    border-top: none;
    background-color: #e6e6ea;
  }

  .element-header {
    font-weight: 500;
    line-height: 1.2;
  }

  select option {
    color: #000;
  }

  /* Animated heading border */
  @keyframes primary-short {
    0% {
      width: 15%;
    }
    50% {
      width: 90%;
    }
    100% {
      width: 10%;
    }
  }

  @keyframes primary-long {
    0% {
      width: 80%;
    }
    50% {
      width: 0%;
    }
    100% {
      width: 80%;
    }
  }

  .dark-bg {
    background-color: #293144;
    padding:10px;
    z-index: 20
  }

  .market {
    width: 100%;
    display: inline-block;
    height: 36px;
    /*padding: 10px;*/
    font-size: 1.5em !important;
  }

  .market .market-share {
    float: left;
  }

  .market .market-share .share-name {
    float: left;
    margin: 0;
  }

  .market .market-share .share-name a {
    color: #fff;
  }

  .market .market-share .marketdata {
    float: right;
  }

  .market .marketchangedata {
    float: right;
  }

  .market .marketchangedata .marketLast {
    color: #fff;
    float: left;
    font-size: 1.3em;
  }

  .market .marketchangedata .marketlastchange {
    float: left;
    color: #fff;
  }

  .market .marketchangedata .marketpercent {
    float: right;
    color: #fff;
  }

  .market .marketchangedata .marketpercent i {
    padding-right: 5px;
  }

  .market .marketpercent.red i, .market .marketlastchange.red, .market .marketpercent.red {
    color: #f44336;
    font-size: .9em;
    cursor: pointer;
  }

  .market .marketpercent.green i, .market .marketlastchange.green, .market .marketpercent.green {
    color: #26c281;
    font-size: 1.1em;
    cursor: pointer;
  }

  .red {
    color: #f44336;
  }

  .green {
    color: #26c281;
  }

  @media (max-width: 767px) {
    .test {
      max-width: 100%
    }

  }
</style>
