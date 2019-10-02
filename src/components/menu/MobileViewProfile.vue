<template>
    <div class="compact color-scheme-light" id="content">

        <div class="element-wrapper compact">
            <h6>
                <img :src="require(`@/assets/img/svg_icons/id-card.svg`)" width="25px" alt=""> Verificação de Perfil
                <span class="animate-border mt-2 mb-3"></span>
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

                    <a class="todo-item error" href="/profile" v-if="!user.pin_filled">
                        <div class="ti-info">
                            <div class="ti-header"> Pin de Segurança</div>
                            <div class="ti-sub-header"> Você ainda não criou seu pin</div>
                        </div>
                        <div class="ti-icon"><i class="os-icon os-icon-info"></i></div>
                    </a>

                    <a class="todo-item complete" href="/profile" v-if="user.pin_filled">
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

        <span class="animate-border"></span>

    </div>
</template>

<script>
	import {mapGetters} from 'vuex'
	import Pin from './../verifications/Pin'
    import Vue from 'vue'


	export default {
		name: "MobileViewProfile",
		data() {
			return {
				count: null,
				count_accounts: null,
				documents: {
					selfie_status: 'not_found',
					selfie_message: 'Arquivo ainda não enviado',
					document_status: 'not_found',
					document_message: 'Arquivo ainda não enviado',
				},
			}
		},
		computed: {
			...mapGetters([
				'user'
			])
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
		},
		components: {
			Pin,
		}
	}
</script>

<style scoped>
    .todo-item {
        cursor: pointer;
    }

    #content-panel {
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

</style>
