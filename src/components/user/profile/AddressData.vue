<template>
  <div class="post-box">
    <div class="post-media address-data"></div>

    <fieldset class="post-content form-group">
      <legend v-if="data_group" @click.prevent="data_group=false">
        <span class="pull-left">Dados de Endereço</span>
        <span class="pull-right"><i class="os-icon os-icon-arrow-right3"></i></span>
      </legend>
      <legend v-if="!data_group" @click.prevent="data_group=true">
        <span class="pull-left">Dados de Endereço</span>
        <span class="pull-right"><i class="os-icon os-icon-arrow-right3"></i></span>
      </legend>

      <span>
                Seu endereço é necessário para habilitar pagamentos por boleto em nossa plataforma.
            </span>

      <form @submit.prevent="updateAddress" v-if="data_group">
        <div class="row">
          <div class="col-sm-6">
            <div class="form-group">
              <label for="zip">CEP</label>
              <input id="zip" class="form-control" type="text" placeholder="Cep"
                     @input="retrieveZipCode"
                     v-model="user.zip_code"
                     v-mask="['#####-###']">
            </div>
          </div>
          <div class="col-sm-6">
            <div class="form-group">
              <label for="state">Estado</label>
              <input id="state" type="text" class="form-control" placeholder="Estado"
                     v-model="user.state" readonly>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-sm-6">
            <div class="form-group">
              <label for="city">Cidade</label>
              <input id="city" class="form-control" type="text" placeholder="Cidade"
                     readonly v-model="user.city">
            </div>
          </div>
          <div class="col-sm-6">
            <div class="form-group">
              <label for="district">Bairro</label>
              <input id="district" class="form-control" placeholder="Bairro" type="text"
                     v-model="user.district" readonly>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-sm-9">
            <div class="form-group">
              <label for="address">Endereço</label>
              <input id="address" class="form-control" type="text" placeholder="Endereço" readonly
                     v-model="user.address">
            </div>
          </div>
          <div class="col-sm-3">
            <label for="number">Nº</label>
            <input id="number" class="form-control" type="text" placeholder="Nº"
                   v-model="user.number">
          </div>
          <div class="col-sm-12">
            <div class="form-group">
              <label for="complement">Complemento</label>
              <input id="complement" class="form-control" type="text" placeholder="Complemento"
                     v-model="user.complement">
            </div>
          </div>
        </div>

        <div class="form-buttons-w text-right">
          <button class="btn btn-grey pull-left" type="button" @click.prevent="data_group=false">
            Cancelar
          </button>
          <button class="btn btn-primary" type="submit" :disabled="!isCepFilled">
            Atualizar
          </button>
        </div>
      </form>
      <div class="form-desc pb-0 mb-0" v-if="!data_group" @click.prevent="data_group=true">
        <em>clique para atualizar seus dados de endereço</em>
      </div>

      <token-pin v-show="isTokenPinVisible" ref="tokenPinComponent"
                 @close-token-pin-modal="closeTokenPinModal" @token-data="handleTokenPinData"/>

    </fieldset>
  </div>
</template>

<script>
  import TokenPin from '../../verifications/TokenPin'
  import {mask} from 'vue-the-mask'
  import debounce from 'lodash/debounce'

  export default {
    name: "AddressData",
    props: ['user'],
    data() {
      return {
        data_group: false,
        isTokenPinVisible: false,
        token: {
          code: null,
          pin: null
        }
      }
    },
    methods: {
      retrieveZipCode: debounce(function (e) {
        if (this.user.zip_code.length === 9) {
          this.$store.dispatch('retrieveZipCode', this.user.zip_code)
            .then(this.$toasted.show('buscando endereço...', {position: 'bottom-left'}).goAway(3000))
            .then(response => {
              this.user.state = response.data.address.state
              this.user.city = response.data.address.city
              this.user.district = response.data.address.district
              this.user.address = response.data.address.address
            }).catch(error => {
            if (error.response) {
              this.handleErrors(error.response)
            }
          })
        }
      }, 500),
      updateAddress() {
        this.$store.dispatch('updateUserAddress', {
          zip_code: this.user.zip_code,
          state: this.user.state,
          city: this.user.city,
          district: this.user.district,
          address: this.user.address,
          number: this.user.number,
          complement: this.user.complement
        })
          .then(this.$toasted.show('salvando seu endereço...', {position: 'bottom-left'}).goAway(5000))
          .then(response => {
            this.$toasted.show(response.data.message, {position: 'bottom-left'}).goAway(3000)
          })
          .catch(error => {
            if (error.response) {
              this.handleErrors(error.response)
            }
          })
      },
      showTokenPinModal(method, action) {
        this.isTokenPinVisible = true
        this.$refs.tokenPinComponent.setData(method, action)
      },
      closeTokenPinModal() {
        this.isTokenPinVisible = false
      },
      handleTokenPinData(data) {
        this.token.code = data.code
        this.token.pin = data.pin
        // this.updateUser()
      }
    },
    computed: {
      isCepFilled() {
        return this.user.zip_code && this.user.number && true;
      }
    },
    directives: {
      mask
    },
    components: {
      TokenPin
    }
  }
</script>

<style scoped>
  .form-desc, legend {
    cursor: pointer;
  }

  .form-desc {
    border-bottom: none;
  }

  .address-data {
    background-image: url(../../../assets/img/icons/address-data.png);
    background-size: 80px;
    background-repeat: no-repeat;
  }
</style>
