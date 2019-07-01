<template>
    <div class="vue-modal-backdrop">
        <div class="modal" id="modal-one" aria-hidden="true">

            <nav class="nav-container">
                <svg viewBox="0 0 13 20" class="nav nav--prev" @click="nav(-1)" title="Prev">
                    <polyline points="10,3 3,10 10,17"></polyline>
                </svg>

                <svg viewBox="0 0 13 20" class="nav nav--next" @click="nav(1)" title="Next">
                    <polyline points="10,3 3,10 10,17" transform="rotate(180 6.5,10)"></polyline>
                </svg>
            </nav>

            <transition-group tag="div" class="slide-group"
                              :name="transitionName"
                              @before-leave="sgBeforeLeave">

                <h1 class="text-white" key="title">Aviso Liquidex </h1>

                <div :key="current" class="slide" @click="nav(1)">
                    <h4 v-html="slides[current].subject"></h4>
                    <div v-html="slides[current].content"></div>
                </div>

                <footer class="slide-group__footer text-info" key="footer" @click="closeThisModal">
                    <h4 class="pointer text-info" @click="closeThisModal">X FECHAR</h4>
                </footer>

            </transition-group>

        </div>
    </div>
</template>

<script>
    import Modal from './../../layouts/Modal'

    export default {
        name: "NotificationModal",
        data() {
            return {
                count: null,
                dir: 0,
                current: 0,
                use3d: true,
                slides: ['carregando...']
            }
        },
        methods: {
            retrieveNotifications() {
                this.$store.dispatch('retrieveNotificationsList')
                    .then(response => {
                        this.slides = response.data.data
                        this.loader = false
                    })
                    .catch(error => {
                        if (error.response) {
                            this.handleErrors(error.response)
                        }
                        this.loader = false
                    })
            },
            nav(dir){
                this.dir = dir;
                var len = this.slides.length;
                // Loop around the array so last slide goes to first slide & vice-versa.
                this.current = ( ( this.current + dir % len) + len ) % len;
            },

            // When transitioning an element out, applying `position: absolute` or `position: fixed` keeps the container from snapping in size dramatically and helps the whole transition run smoother.
            // You can use CSS on the `-leave-active` class (see commented out CSS in the CSS tab), but that often leads to the element flying out in weird directions or snapping to the edges of the container.
            // Instead, let's apply the positioning in JavaScript with `position: fixed` and the right positioning + sizing to elements that are leaving so they don't snap in odd ways.
            sgBeforeLeave(el){
                var rect = el.getBoundingClientRect();
                el.style.width = (rect.right - rect.left) + 'px';
                el.style.height = (rect.bottom - rect.top) + 'px';
                el.style.position = 'fixed';
                el.style.top = rect.top + 'px';
                el.style.left = rect.left + 'px';
            },
            closeThisModal() {
                this.$emit('close-modal')
            }
        },
        computed: {
            transitionName(){
                return 'sg-' +
                    ( this.use3d ? '3d-' : '' ) +
                    ( this.dir > 0 ? 'right' : 'left' );
            }
        },
        mounted() {
          this.retrieveNotifications()
          setTimeout(()=>{ this.nav(1); },200);
        },
        components: {
            Modal
        }
    }
</script>

<style scoped>
    .vue-modal-backdrop {
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: rgba(0, 0, 0, 0.7);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
    }
    .modal {
        top:1.6rem;
    }
    .sg-left-move,
    .sg-right-move {
        transition: transform 0.6s cubic-bezier(0.29, 0.15, 0.24, 0.97);
    }
    .sg-left-leave-active,
    .sg-right-leave-active {
        transition: opacity 0.3s linear, transform 0.3s cubic-bezier(0.64, 0.01, 0.67, 0.92);
    }
    .sg-left-enter-active,
    .sg-right-enter-active {
        transition: opacity 0.3s linear, transform 0.3s cubic-bezier(0.29, 0.15, 0.24, 0.97);
        transition-delay: .25s, .3s;
    }
    .sg-left-enter,
    .sg-right-enter,
    .sg-left-leave-to,
    .sg-right-leave-to {
        opacity: 0;
    }
    .sg-left-leave-to,
    .sg-right-enter {
        transform: translateX(30%);
    }
    .sg-left-enter,
    .sg-right-leave-to {
        transform: translateX(-30%);
    }
    /* ////////////////////////////////////////////////////////////////////////// */
    .sg-3d-left-move,
    .sg-3d-right-move {
        transition: transform 0.6s cubic-bezier(0.29, 0.15, 0.24, 0.97);
    }
    .sg-3d-left-leave-active,
    .sg-3d-right-leave-active,
    .sg-3d-left-enter-active,
    .sg-3d-right-enter-active {
        transform: perspective(700px) rotateY(0deg);
    }
    .sg-3d-left-leave-active,
    .sg-3d-right-leave-active {
        transition: transform 0.3s cubic-bezier(0.64, 0.01, 0.67, 0.92), opacity 0.1s linear;
        transition-delay: 0s, .2s;
    }
    .sg-3d-left-enter-active,
    .sg-3d-right-enter-active {
        transition: transform 0.3s cubic-bezier(0.29, 0.15, 0.24, 0.97), opacity 0.1s linear;
        transition-delay: .2s, .2s;
    }
    .sg-3d-left-enter,
    .sg-3d-right-enter,
    .sg-3d-left-leave-to,
    .sg-3d-right-leave-to {
        opacity: 0;
    }
    .sg-3d-left-leave-to,
    .sg-3d-right-enter {
        transform: perspective(700px) translateZ(-300px) rotateY(90deg);
    }
    .sg-3d-left-enter,
    .sg-3d-right-leave-to {
        transform: perspective(700px) translateZ(-300px) rotateY(-90deg);
    }
    /* ////////////////////////////////////////////////////////////////////////// */
    .slide-group {
        width: 80%;
        max-width: 90em;
        margin: auto;
        text-align: center;
    }
    .slide {
        background: #FFF;
        text-align: left;
        border: solid 1px #ccc;
        padding: 1rem;
        margin: 1rem 0;
        max-height: 40rem;
        overflow: auto;
    }
    .slide img {
        display: block;
        margin-bottom: 1rem;
    }
    /* ////////////////////////////////////////////////////////////////////////// */
    .nav-container {
        width: 90%;
        margin: auto;
        position: absolute;
        /*position: fixed;*/
        top: 50%;
        left: 0;
        right: 0;
        transform: translateY(-50%);
        display: flex;
        justify-content: space-between;
        z-index: 2;
    }
    .nav {
        display: block;
        width: 2em;
        fill: none;
        stroke: #000;
        cursor: pointer;
        transition: stroke 0.2s linear;
    }
    .nav:hover,
    .nav:focus {
        stroke: #f15268;
    }
    /* ////////////////////////////////////////////////////////////////////////// */
    .preloader {
        position: absolute;
        top: 0;
        left: 0;
        width: 1px;
        height: 1px;
        padding: 1px;
        box-sizing: content-box;
        overflow: hidden;
    }
    /* ////////////////////////////////////////////////////////////////////////// */
    * {
        box-sizing: border-box;
    }
    button {
        cursor: pointer;
    }
    svg,
    img {
        max-width: 100%;
        height: auto;
    }
    h1,
    h2,
    h3,
    h4,
    h5,
    p {
        margin: 0 0 1rem;
    }
    .pointer {
        cursor: pointer;
        text-decoration: underline red;
    }

</style>