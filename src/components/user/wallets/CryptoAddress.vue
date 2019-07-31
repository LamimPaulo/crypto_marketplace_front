<template>
  <div class="element-wrapper mb-0 pb-0 pt-0">
    <div class="element-box">

      <div class="element-info">
        <div class="element-info-with-icon">
          <div class="element-info-icon">
            <img alt="" style="width: 30px !important;" :src="require(`@/assets/img/${icon}`)">
          </div>
          <div class="element-info-text">
            <h5 class="element-inner-header">
              Receber Fundos
            </h5>
            <div class="element-inner-desc">
              utilize o endereço abaixo para receber fundos em sua carteira
            </div>
          </div>
        </div>
      </div>

      <table class="table table-clean">
        <tr>
          <td>
            <qr-code :text="address" :size="qrcode_size" error-level="L"></qr-code>
          </td>
          <td style="word-break: break-all; padding: 8px">
            <div class="value">{{ address }}</div>
            <span class="sub-value">sua carteira {{ abbr }}</span>
          </td>
          <td class="text-right">
            <div class="value">
              <button class="btn btn-grey" @click="copyAddress">Copiar</button>
            </div>
          </td>
        </tr>
      </table>

    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import VueQRCodeComponent from 'vue-qrcode-component'
  Vue.component('qr-code', VueQRCodeComponent)

  export default {
    name: "CryptoAddress",
    props: ['address', 'icon', 'abbr'],
    data() {
      return {
        qrcode_size: 120
      }
    },
    methods: {
      copyAddress() {
        const selBox = document.createElement('textarea');
        selBox.style.position = 'fixed';
        selBox.style.left = '0';
        selBox.style.top = '0';
        selBox.style.opacity = '0';
        selBox.value = this.address;
        document.body.appendChild(selBox);
        selBox.focus();
        selBox.select();
        document.execCommand('copy');
        document.body.removeChild(selBox);
        this.$toasted.show('Copiado!', {position: 'top-center'}).goAway(3000)
      }
    }
  }
</script>

<style scoped>

</style>
