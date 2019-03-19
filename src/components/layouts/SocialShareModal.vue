<template>
  <div>
    <modal>
      <template slot="header">
        <h6 class="pull-left ml-3 mt-2">
          <i class="os-icon os-icon-share"></i>
          Compartilhe
        </h6>
        <button class="btn btn-grey pull-right mt-3 mr-3 mb-3" type="button" @click="closeThisModal"><i
          class="os-icon os-icon-close"></i></button>
      </template>

      <template slot="body">
          <vue-goodshare-facebook
            page_url="https://github.com"
            has_icon
          ></vue-goodshare-facebook>
          <vue-goodshare-twitter
            page_url="https://github.com"
            has_icon
          ></vue-goodshare-twitter>
          
          <vue-goodshare-whats-app has_icon page_url="https://github.com"/>
          <vue-goodshare-linked-in has_icon/>
          <vue-goodshare-google-plus has_icon/>
          <vue-goodshare-telegram has_icon/>
          <vue-goodshare-email has_icon/>
      </template>
      <template slot="footer">
        link: 
      </template>
    </modal>
  </div>
</template>

<script>
  import Modal from './Modal'
  import VueGoodshareFacebook from "vue-goodshare/src/providers/Facebook.vue";
  import VueGoodshareTwitter from "vue-goodshare/src/providers/Twitter.vue";
  import VueGoodshareWhatsApp from "vue-goodshare/src/providers/WhatsApp.vue";
  import VueGoodshareGooglePlus from "vue-goodshare/src/providers/GooglePlus.vue";
  import VueGoodshareLinkedIn from "vue-goodshare/src/providers/LinkedIn.vue";
  import VueGoodshareTelegram from "vue-goodshare/src/providers/Telegram.vue";
  import VueGoodshareEmail from "vue-goodshare/src/providers/Email.vue";

  export default {
    name: "SocialShareModal",
    data() {
      return {
        data: {
        }
      }
    },
    methods: {
      closeThisModal() {
        this.$emit('close-social-share-modal')
      },
    },
    components: {
      Modal,
      VueGoodshareFacebook,
      VueGoodshareGooglePlus,
      VueGoodshareLinkedIn,
      VueGoodshareTwitter,
      VueGoodshareTelegram,
      VueGoodshareWhatsApp,
      VueGoodshareEmail
    }
  }
</script>

<style scoped>
  h6 {
    padding-top: 15px;
    text-align: center;
    font-size: 1.26rem;
    line-height: 1.25;
    color: #334152 !important;
  }

  h6 .os-icon {
    color: #047bf8;
  }

.button-social {
  color: #fff !important;
}
</style>
