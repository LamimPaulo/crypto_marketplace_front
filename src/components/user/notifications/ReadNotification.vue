<template>
    <div class="content-box">
        <vue-headful title="Editar Mensagem - Liquidex Admin" description="Liquidex"/>
        <div class="loader" v-if="loader"></div>

        <div class="element-wrapper compact ">
            <div class="element-actions d-none d-sm-block">
                <a class="btn btn-primary btn-sm" href="/notifications">
                    <i class="os-icon os-icon-arrow-left"></i><span> Voltar para mensagens </span>
                </a>
            </div>

            <h6 class="element-header mb-0" v-if="message">
                {{ message.subject }}
            </h6>
            <div class="element-box-tp pt-4" v-if="message">
                <div class="row">
                    <div class="col-12">

                        <div class="element-box">

                            <div class="row">
                                <div class="col-12 mb-4">
                                    <h4 v-html="message.subject" ></h4>
                                </div>

                                <div class="col-12">
                                    <hr>
                                </div>

                                <div class="col-12">
                                    <div id="editor" v-html="message.content"></div>
                                </div>

                                <div class="col-12">
                                    <hr>
                                </div>
                            </div>
                        </div>


                    </div>
                </div>


            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "ReadNotification",
        data() {
            return {
                errors: [],
                loader: false,
                message: {
                    user_id: null,
                    subject: null,
                    type: 0,
                    status: 0,
                    content: null
                }
            }
        },methods: {
            retrieveNotification() {
                this.loader = true
                this.$store.dispatch('retrieveNotification', this.$route.params.id)
                    .then(response => {
                        this.message = response.data.content
                        this.loader = false
                    })
                    .catch(error => {
                        if (error.response) {
                            this.handleErrors(error.response)
                        }
                        this.loader = false
                    })

            },
            refresh() {
                setTimeout(function () {
                    location.reload()
                }, 2000)
            }
        },
        mounted() {
            this.retrieveNotification()
        },
        components: {

        }
    }
</script>

<style scoped>

</style>