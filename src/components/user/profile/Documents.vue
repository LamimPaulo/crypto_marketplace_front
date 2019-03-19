<template>
  <div>
    <fieldset class="form-group">
      <legend v-if="document_group" @click.prevent="document_group=false">
        <span class="pull-left">Documento de Identificação</span>
        <span class="pull-right"><i class="os-icon os-icon-arrow-down2"></i></span>
      </legend>
      <legend v-if="!document_group" @click.prevent="document_group=true">
        <span class="pull-left">Documento de Identificação</span>
        <span class="pull-right"><i class="os-icon os-icon-arrow-right3"></i></span>
      </legend>
      <form @submit.prevent="sendDocument"
            v-if="document_group&&(documents.document_status==='not_found'||documents.document_status==='invalid')">
        <div class="form-desc pb-0 mt-0">
          O documento enviado deve conter seu cpf e foto<br>
          Os formatos aceitos são: pdf, png e jpeg<br>
          O tamanho do arquivo não deve passar de 1MB
        </div>
        <div class="form-group">
          <div class="upload-btn-wrapper">
            <button class="btn">{{ document ? document.name : 'Anexar Documento'}}</button>
            <input type="file" id="document" ref="document" v-on:change="loadFile()" required/>
          </div>

        </div>

        <div class="form-buttons-w text-right">
          <button class="btn btn-grey pull-left" type="button" @click.prevent="document_group=false">
            Cancelar
          </button>
          <button class="btn btn-primary" type="button" @click.prevent="sendDocument()"
                  :disabled="!isDocumentFilled"> Enviar
          </button>
        </div>
      </form>

      <span v-if="!document_group&&documents.document_status==='not_found'" class="badge badge-warning">{{ documents.document_message }}</span>

      <span v-if="documents.document_status==='valid'"
            class="badge badge-success">{{ documents.document_message }}</span>

      <span v-if="documents.document_status==='invalid'"
            class="badge badge-danger">{{ documents.document_message }}</span>

      <span v-if="documents.document_status==='pending'"
            class="badge badge-primary">{{ documents.document_message }}</span>


    </fieldset>

    <fieldset class="form-group">
      <legend v-if="selfie_group" @click.prevent="selfie_group=false">
        <span class="pull-left">Selfie de Segurança</span>
        <span class="pull-right"><i class="os-icon os-icon-arrow-down2"></i></span>
      </legend>
      <legend v-if="!selfie_group" @click.prevent="selfie_group=true">
        <span class="pull-left">Selfie de Segurança</span>
        <span class="pull-right"><i class="os-icon os-icon-arrow-right3"></i></span>
      </legend>
      <form @submit.prevent="sendSelfie"
            v-if="selfie_group&&(documents.selfie_status==='not_found'||documents.selfie_status==='invalid')">
        <div class="form-desc pb-0 mt-0">
          A foto enviada deve ser uma selfie sua segurando o mesmo documento de identificação enviado
          anteriormente<br>
          Os formatos aceitos são: pdf, png e jpeg<br>
          O tamanho do arquivo não deve passar de 1MB
        </div>
        <div class="form-group">
          <div class="upload-btn-wrapper">
            <button class="btn">{{ selfie ? selfie.name : 'Anexar Documento'}}</button>
            <input type="file" id="selfie" ref="selfie" v-on:change="loadSelfie()" required/>
          </div>

        </div>

        <div class="form-buttons-w text-right">
          <button class="btn btn-grey pull-left" type="button" @click.prevent="selfie_group=false">
            Cancelar
          </button>
          <button class="btn btn-primary" type="button" @click.prevent="sendSelfie()"
                  :disabled="!isSelfieFilled"> Enviar
          </button>
        </div>
      </form>

      <span v-if="!selfie_group&&documents.selfie_status==='not_found'" class="badge badge-warning">{{ documents.selfie_message }}</span>

      <span v-if="documents.selfie_status==='valid'" class="badge badge-success">{{ documents.selfie_message }}</span>

      <span v-if="documents.selfie_status==='invalid'" class="badge badge-danger">{{ documents.selfie_message }}</span>

      <span v-if="documents.selfie_status==='pending'" class="badge badge-primary">{{ documents.selfie_message }}</span>


    </fieldset>
  </div>
</template>

<script>
  export default {
    name: "Documents",
    props: ['documents'],
    data() {
      return {
        document_group: false,
        selfie_group: false,
        document: null,
        selfie: null,
        formData: new FormData(),
      }
    },
    methods: {
      loadFile() {
        this.document = this.$refs.document.files[0];
      },
      loadSelfie() {
        this.selfie = this.$refs.selfie.files[0];
      },
      sendDocument() {
        this.formData.append('file', this.document)
        this.formData.append('document_type_id', 1)
        this.$store.dispatch('sendDocument', this.formData)
          .then(
            this.$toasted.show('enviando...', {position: 'bottom-left'}).goAway(3000)
          )
          .then(response => {
            this.$toasted.show(response.data.message, {position: 'bottom-left'}).goAway(3000)
            this.$emit('retrieve-documents')
          }).catch(error => {
          if (error.response) {
            this.handleErrors(error.response)
          }
        })
      },
      sendSelfie() {
        this.formData.append('file', this.selfie)
        this.formData.append('document_type_id', 2)
        this.$store.dispatch('sendDocument', this.formData)
          .then(
            this.$toasted.show('enviando...', {position: 'bottom-left'}).goAway(3000)
          )
          .then(response => {
            this.$toasted.show(response.data.message, {position: 'bottom-left'}).goAway(3000)
            this.$emit('retrieve-documents')
          }).catch(error => {
          if (error.response) {
            this.handleErrors(error.response)
          }
        })
      },
    },
    computed: {
      isDocumentFilled() {
        return this.document && true;
      },
      isSelfieFilled() {
        return this.selfie && true;
      }
    }
  }
</script>

<style scoped>

</style>
