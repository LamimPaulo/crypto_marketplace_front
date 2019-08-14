<template>
    <div class="content-i">
        <div class="notification-box">
            <div class="app-email-w forse-show-content">
                <div class="app-email-i">

                    <div class="ae-list-w">
                        <div class="ael-head">
                            <div class="actions-right">
                                <h5>Notificações:</h5>
                            </div>
                        </div>
                        <div class="ae-list ps--theme_default ps--active-y"> <!-- .ps -->
                            <div>

                                <div v-for="message in messages.data" class="ae-item with-status status-green"
                                     v-bind:class="[message.id===singleMessage.id ? 'active' : '']">

                                    <div class="aei-content" @click="selectedMessage(message)">
                                        <h6 class="aei-title">{{message.subject}}</h6>
                                        <div class="aei-text" v-html="message.content.substring(0, 20) + ' ...'">...</div>
                                    </div>

                                </div>
                            </div>


                            <!--                    <div class="ps__scrollbar-x-rail" style="left: 0px; bottom: 0px;">-->
                            <!--                        <div class="ps__scrollbar-x" tabindex="0" style="left: 0px; width: 0px;"></div>-->
                            <!--                    </div>-->
                            <!--                    <div class="ps__scrollbar-y-rail" style="top: 0px; height: 1000px; right: 0px;">-->
                            <!--                        <div class="ps__scrollbar-y" tabindex="0" style="top: 0px; height: 593px;"></div>-->
                            <!--                    </div>-->
                        </div>
                        <a class="ae-load-more" href="#"><span>Load More Messages</span></a>
                    </div>


                    <div class="ae-content">
                        <div class="older-pack">
                            <div class="aec-full-message-w">
                                <div class="aec-full-message">
                                    <div class="message-head">
                                        <div class="user-w with-status status-green">
                                            <div class="user-avatar-w">
                                                <div class="user-avatar"><img alt="" src="img/avatar1.jpg"></div>
                                            </div>
                                            <div class="user-name">
                                                <h6 class="user-title">Bryan Kinskey</h6>
                                                <div class="user-role">Registration Question<span>&lt; bryan@solutions.com &gt;</span></div>
                                            </div>
                                        </div>
                                        <div class="message-info">{{this.singleMessage.created_at}}
                                            <br>2:27pm</div>
                                    </div>
                                    <div class="message-content">
                                        {{this.singleMessage.content}}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="aec-full-message-w show-pack">
                            <div class="more-messages" v-if="this.messages.total == 1">{{this.messages.total}} Mensagem</div>
                            <div class="more-messages" v-else>{{this.messages.total}} Mensagens</div>

                            <div class="aec-full-message">
                                <div class="message-head">
                                    <div class="user-w with-status status-green">
                                        <div class="user-name">
                                            <h6 class="user-title">{{singleMessage.subject}}</h6>
                                        </div>
                                    </div>
                                    <div class="message-info">{{this.singleMessage.created_at}}</div>
                                </div>
                                <div class="message-content" v-html="singleMessage.content"></div>
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
        name: "Notifications",
        data() {
            return {
                count: null,
                loader: true,
                isActive: true,
                singleMessage: [],
                messages: {
                    total: 0,
                    per_page: 10,
                    from: 1,
                    to: 0,
                    current_page: 1,
                }
            }
        },
        methods: {
            retrieveNotifications() {
                this.$store.dispatch('retrieveNotificationsList')
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
            selectedMessage(message) {
                this.singleMessage = message
                    // Check value
                    if(this.isActive){
                        this.isActive = false;
                    }else{
                        this.isActive = true;
                    }
            }
        },
        mounted() {
            this.retrieveNotifications()
        }
    }
</script>

<style scoped>
    .notification-box {

        vertical-align: top;
        padding: 1.5rem 0rem;
        -webkit-box-flex: 1;
        -ms-flex: 1;
        flex: 1;

    }
</style>