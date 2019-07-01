<template>
    <!--------------------START - Notification System-------------------->
    <router-link to="/notifications" class="messages-notifications os-dropdown-trigger os-dropdown-position-left">
        <i class="os-icon os-icon-mail-14"></i>
        <div class="new-messages-count">{{this.total}}</div>

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
                total: 0
            }
        },
        methods: {
            retrieveTotalNotifications() {
                this.$store.dispatch('retrieveTotalNotifications')
                    .then(response => {
                        this.total = response.data
                    })
                    .catch(error => {
                        if (error.response) {
                            this.handleErrors(error.response)
                        }
                    })
            }
        },
        mounted() {
           this.retrieveTotalNotifications()
        }
    }
</script>

<style scoped>

</style>