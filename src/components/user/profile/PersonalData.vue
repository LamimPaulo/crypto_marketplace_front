<template>
    <fieldset class="form-group" v-else>

        <div class="post-media personal-data"></div>

        <legend v-if="data_group" @click.prevent="data_group=false">
            <span class="pull-left">Personal Data</span>
            <span class="pull-right"><i class="os-icon os-icon-arrow-down2"></i></span>
        </legend>
        <legend v-if="!data_group" @click.prevent="data_group=true">
            <span class="pull-left">Personal Data</span>
            <span class="pull-right"><i class="os-icon os-icon-arrow-right3"></i></span>
        </legend>

        <form @submit.prevent="updateUserInt" v-if="data_group">
            <div class="element-inner-desc text-danger mb-2" @click.prevent="pin_group=true">
                To validate your registration in the platform you must fill in the fields below and send the files for
                verification.<br>
                Only those registers that have all the required data, identification document and selfie will be
                validated.
            </div>

            <div class="row">
                <div class="col-sm-6">
                    <div class="form-group">
                        <label for="cpf"> Document</label>
                        <input class="form-control" placeholder="Document" required="required" type="text" id="cpf"
                               autocomplete="false"
                               v-model="user.document">
                    </div>
                </div>
                <div class="col-sm-6">
                    <div class="form-group">
                        <label for="name">Name</label>
                        <input class="form-control" placeholder="Your Name" type="text" id="name" v-model="user.name">
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-sm-6">
                    <div class="form-group">
                        <label for="nascimento"> Birthdate</label>
                        <input class="form-control" placeholder="Birthdate (yyyy-mm-dd)" type="text" id="nascimento"
                               v-model="user.birthdate" v-mask="['####-##-##']">
                    </div>
                </div>
                <div class="col-sm-6">
                    <div class="form-group">
                        <label for="gender">Gender</label>
                        <select class="form-control" id="gender" v-model="user.gender" required>
                            <option value="M">Male</option>
                            <option value="F">Female</option>
                        </select>
                    </div>
                </div>
            </div>

            <div class="form-group">
                <label for="mothersname"> Mother's Name</label>
                <input class="form-control" placeholder="Mother's Name" type="text" id="mothersname"
                       v-model="user.mothers_name">
            </div>

            <div class="row">
                <div class="col-6">
                    <label> ID</label><br>
                    <span v-if="documents.document_status==='valid'"
                          class="badge badge-success">{{ documents.document_message }}</span>

                    <span v-if="documents.document_status==='pending'" class="badge badge-primary">{{ documents.document_message }}</span>

                    <div class="form-group"
                         v-if="documents.document_status==='not_found'||documents.document_status==='invalid'">

                        <span v-if="documents.document_status==='invalid'" class="badge badge-danger">{{ documents.document_message }}</span><br>
                        <div class="upload-btn-wrapper">
                            <button class="btn">{{ document ? document.name : 'Attach and Send File'}}</button>
                            <input type="file" id="document" ref="document" v-on:change="loadFileInt()" required/>
                        </div>

                    </div>
                    <div class="form-desc pb-0 mt-0"
                         v-if="documents.document_status==='not_found'||documents.document_status==='invalid'">
                        The submitted file must contain the document number registered above and photo.<br>
                        Accepted formats are: pdf, png e jpeg.<br>
                        The file size should not exceed 1MB.
                    </div>

                </div>
                <div class="col-6">
                    <label> Security Selfie</label><br>
                    <span v-if="documents.selfie_status==='valid'"
                          class="badge badge-success">{{ documents.selfie_message }}</span>

                    <span v-if="documents.selfie_status==='pending'"
                          class="badge badge-primary">{{ documents.selfie_message }}</span>

                    <div class="form-group"
                         v-if="documents.selfie_status==='not_found'||documents.selfie_status==='invalid'">
                        <div class="upload-btn-wrapper">

              <span v-if="documents.selfie_status==='invalid'"
                    class="badge badge-danger">{{ documents.selfie_message }}</span><br>
                            <button class="btn">{{ selfie ? selfie.name : 'Attach and Send Selfie'}}</button>
                            <input type="file" id="selfie" ref="selfie" v-on:change="loadSelfieInt()" required/>
                        </div>

                    </div>
                    <div class="form-desc pb-0 mt-0"
                         v-if="documents.selfie_status==='not_found'||documents.selfie_status==='invalid'">
                        The photo sent should be a selfie of yours holding the same ID
                        previously uploaded.<br>
                        Accepted formats are: pdf, png e jpeg.<br>
                        The file size should not exceed 1MB.
                    </div>
                </div>
            </div>

            <div class="form-buttons-w text-right">
                <button class="btn btn-grey pull-left" type="button" @click.prevent="data_group=false"> Cancel
                </button>
                <button class="btn btn-primary" type="button"
                        @click.prevent="showTokenPinModal('updateUserInt', 9)" :disabled="!isUserIntFilled"> Update
                </button>
            </div>

        </form>

        <div class="form-desc pb-0 mb-0" v-if="!data_group" @click.prevent="data_group=true"><em>clique para
            atualizar seus dados pessoais</em></div>

        <token-pin v-show="isTokenPinVisible" ref="tokenPinComponent"
                   @close-token-pin-modal="closeTokenPinModal" @token-data="handleTokenPinData"/>

    </fieldset>
</template>

<script>
	import TokenPin from '../../verifications/TokenPin'
	import {mask} from 'vue-the-mask'

	export default {
		name: "PersonalData",
		props: ['user', 'documents'],
		data() {
			return {
				document_group: false,
				selfie_group: false,
				document: null,
				selfie: null,
				formData: new FormData(),
				data_group: false,
				isTokenPinVisible: false,
				token: {
					code: null,
					pin: null
				},
			}
		},
		methods: {
			updateUserInt() {
				this.$store.dispatch('updateUserInt', {
					name: this.user.name,
					birthdate: this.user.birthdate,
					document: this.user.document,
					mothers_name: this.user.mothers_name,
					gender: this.user.gender,
					action: 9,
					code: this.token.code,
					pin: this.token.pin,
				})
					.then(this.$toasted.show('updating data...', {position: 'bottom-left'}).goAway(5000))
					.then(response => {
						this.$toasted.show(response.data.message, {position: 'bottom-left'}).goAway(3000)
					})
					.catch(error => {
						if (error.response) {
							this.handleErrors(error.response)
							this.$refs.tokenPinComponent.resetData()
						}
					})
			},
			loadFileInt() {
				this.document = this.$refs.document.files[0];
				this.sendDocument()
			},
			loadSelfieInt() {
				this.selfie = this.$refs.selfie.files[0];
				this.sendSelfie()
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
			showTokenPinModal(method, action) {
				this.isTokenPinVisible = true
				this.$refs.tokenPinComponent.setData(method, action)
			},
			closeTokenPinModal() {
				this.isTokenPinVisible = false;
			},
			handleTokenPinData(data) {
				this.token.code = data.code
				this.token.pin = data.pin
				this.updateUserInt()
			},
		},
		components: {
			TokenPin
		},
		directives: {
			mask
		},
		computed: {
			isUserIntFilled() {
				return this.user.document && this.user.mothers_name && this.user.name && this.user.birthdate && true;
			},
		},
	}
</script>

<style scoped>
    .form-desc, legend {
        cursor: pointer;
    }

    .form-desc {
        border-bottom: none;
    }

    .personal-data {
        background-image: url(../../../assets/img/icons/personal-data.png);
        background-size: 80px;
        background-repeat: no-repeat;
    }
</style>
