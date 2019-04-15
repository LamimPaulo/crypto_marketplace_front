<template>
    <div>
        <div class="loader" v-if="loader"></div>

        <vue-headful title="Seu Perfil Liquidex" description="Liquidex"
        />
        <div class="content-box">

            <div class="row">

                <div class="col-sm-12 col-md-12 col-lg-7">
                    <div class="element-wrapper">
                        <div class="element-box-tp">

                            <div class="element-info">
                                <div class="element-info-with-icon">
                                    <div class="element-info-icon">
                                        <div class="os-icon os-icon-wallet-loaded"></div>
                                    </div>
                                    <div class="element-info-text">
                                        <h5 class="element-inner-header">
                                            Dados do Perfil
                                        </h5>
                                        <div class="element-inner-desc text-danger">
                                            Validações de documentos e cpf são necessárias para operações com moeda
                                            Brasileira
                                            (BRL)
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <pin-change :user="user" @refresh="refresh()" @reset-token="resetToken()"></pin-change>

                            <google2fa :user="user" @refresh="refresh()"
                                             @reset-token="resetToken()"></google2fa>

                            <dados-pessoais :user="user" v-if="user.country_id===31" @refresh="refresh()"
                                            @reset-token="resetToken()"></dados-pessoais>

                            <personal-data :user="user" :documents="documents" @retrieve-documents="retrieveDocuments()"
                                           v-else></personal-data>

                            <phone-verify :user="user" @refresh="refresh()" @reset-token="resetToken()"></phone-verify>

                            <password-change :user="user" @refresh="refresh()"
                                             @reset-token="resetToken()"></password-change>

                            <documents :documents="documents" v-if="user.country_id===31"
                                       @retrieve-documents="retrieveDocuments()"></documents>

                        </div>
                    </div>
                </div>
                <div class="col-sm-12 col-md-12 col-lg-5">
                    <activity-log></activity-log>
                </div>

            </div>

        </div>
    </div>
</template>

<script>
	import {mapGetters} from 'vuex'
	import ActivityLog from './ActivityLog'
	import PasswordChange from './PasswordChange'
	import PinChange from './PinChange'
	import DadosPessoais from "./DadosPessoais";
	import PersonalData from "./PersonalData";
	import PhoneVerify from "./PhoneVerify";
	import Documents from "./Documents";
	import Google2fa from "./Google2fa";

	export default {
		name: "profile",
		data() {
			return {
				loader: false,
				documents: {
					selfie_status: 'not_found',
					selfie_message: 'Arquivo ainda não enviado',
					document_status: 'not_found',
					document_message: 'Arquivo ainda não enviado',
				}
			}
		},
		methods: {
			refresh() {
				setTimeout(function () {
					location.reload()
				}, 3000)
			},
			retrieveDocuments() {
				this.loader = true
				this.$store.dispatch('retrieveDocuments')
					.then(response => {
						this.documents.selfie_status = response.data.selfie.status
						this.documents.selfie_message = response.data.selfie.message
						this.documents.document_status = response.data.document.status
						this.documents.document_message = response.data.document.message
						this.loader = false
					}).catch(error => {
					if (error.response) {
						this.handleErrors(error.response)
					}
					this.loader = false
				})
			},

		},
		computed: {
			...mapGetters([
				'user'
			]),
		},
		components: {
			DadosPessoais,
			PersonalData,
			ActivityLog,
			PasswordChange,
			PinChange,
			PhoneVerify,
			Documents,
            Google2fa
		},
		mounted() {
			//this.retrieveDocuments()
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
</style>
