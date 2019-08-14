<template>
    <div class="content-box">
        <div class="loader" v-if="loader"></div>
        <vue-headful title="Mensagens - Liquidex" description="Liquidex"/>

        <div class="col-sm-12 col-md-12 col-xl-12">
            <div class="element-wrapper">
                <h6 class="element-header">
                    Mensagens
                </h6>
                <div class="element-box-tp">
                    <div class="table-responsive">
                        <table class="table table-padded">

                            <thead>
                            <tr>
                                <th class="">Destinatário</th>
                                <th class="">Assunto</th>
                                <th class=""><i class="os-icon os-icon-mail"></i> Mensagem</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="message in messages.data"  @click.prevent="readNotification(message.id)" :class="message.statuses[0] && message.statuses[0]['status'] ? '' :'text-bold'">
                                <td v-if="message.type == 1 && message.user">{{ message.user.email }}</td>
                                <td v-else>Geral (Todos)</td>
                                <td>{{message.subject}}</td>
                                <td v-html="message.content.substring(0, 50)"> ...</td>

                                <td class="green" v-if="message.statuses[0]">
                                    <div v-if="message.statuses[0]['status']" class="status-pill green" data-title="Complete" data-toggle="tooltip" data-original-title="" title=""></div>
                                    <div v-else class="status-pill red" data-title="Complete" data-toggle="tooltip" data-original-title="" title=""></div>
                                </td>
                                <td v-else>
                                    <div class="status-pill red" data-title="Complete" data-toggle="tooltip" data-original-title="" title=""></div>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>

                    <pagination :pagination="messages" @paginate="retrieveNotifications()" :offset="10"/>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    import Pagination from './../../layouts/Pagination';

    export default {
        name: "NotificationsList",
        data() {
            return {
                isModalNewMessageVisible: false,
                count: null,
                loader: true,
                messages: {
                    total: 0,
                    per_page: 10,
                    from: 1,
                    to: 0,
                    current_page: 1
                }
            }
        },
        methods: {
            retrieveNotifications() {
                this.$store.dispatch('retrieveNotificationsList', this.messages.current_page)
                    .then(response => {
                        this.messages = response.data
                        this.count = response.data.count
                        this.loader = false
                    })
                    .catch(error => {
                        if (error.response) {
                            this.handleErrors(error.response)
                        }
                        this.loader = false
                    })
            },
            readNotification(id) {
                this.$router.push({name: 'read-notification', params: {id: id}})
            }
        },
        mounted() {
            this.retrieveNotifications()
        },
        components: {
            Pagination
        }
    }
</script>

<style scoped>
    tbody > tr {
        cursor: pointer;
    }

    .text-bold {
        font-weight: bold;
    }
</style>