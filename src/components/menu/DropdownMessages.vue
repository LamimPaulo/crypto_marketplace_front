<template>
    <!--------------------START - Notification System-------------------->
    <router-link to="/notifications" class="messages-notifications os-dropdown-trigger os-dropdown-position-left">
        <i class="os-icon os-icon-mail-14"></i>
        <div class="new-messages-count">{{this.messages.total}}</div>

<!--        <div class="os-dropdown light message-list">-->
<!--            <ul>-->
<!--                <li v-for="message in messages.data">-->
<!--                    <a href="#">-->
<!--                        <div class="message-content">-->
<!--                            <h6 class="message-from">{{message.subject}}</h6>-->
<!--                            <h6 class="message-title" v-html="message.content.substring(0, 22)">...</h6>-->
<!--                        </div>-->
<!--                    </a>-->
<!--                </li>-->

<!--            </ul>-->
<!--        </div>-->
    </router-link>
    <!--------------------END - Notification System-------------------->
</template>

<script>
    export default {
        name: "DropdownMessages",
        data() {
            return {
                count:null,
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
                this.$store.dispatch('retrieveNotificationsList')
                    .then(response => {
                        this.messages = response.data
                        this.loader = false
                    })
                    .catch(error => {
                        if (error.response) {
                            this.handleErrors(error.response)
                        }
                        this.loader = false
                    })
            }
        },
        mounted() {
            this.retrieveNotifications()
        }
    }
</script>

<style scoped>

</style>