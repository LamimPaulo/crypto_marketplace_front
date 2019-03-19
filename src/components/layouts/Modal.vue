<script>
  export default {
    name: 'modal',
    methods: {
      close() {
        this.$emit('close');
      },
    },
  };
</script>
<template>
  <transition name="vue-modal-fade">
    <div class="vue-modal-backdrop" @click="close">
      <div class="vue-modal" role="dialog">
        <header class="vue-modal-header">
          <slot name="header">
            default header
            <button type="button" class="btn-close" @click="close" aria-label="Fechar modal">
              x
            </button>
          </slot>
        </header>

        <section class="vue-modal-body">
          <slot name="body">
            default body
          </slot>
        </section>

        <footer class="vue-modal-footer">
          <slot name="footer">
            <button type="button" class="btn-green" @click="close" aria-label="Close modal" >
              Fechar
            </button>
          </slot>
        </footer>
      </div>
    </div>
  </transition>
</template>
<style>
  .vue-modal-backdrop {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 5;
  }

  .vue-modal{
    background: #FFFFFF;
    box-shadow: 2px 2px 20px 1px;
    overflow-x: auto;
    display: flex;
    flex-direction: column;
  }
  .vue-modal-footer {
    padding: 15px;
    color: #0a0b0b !important;
    /*display: flex;*/
  }

  .vue-modal-header {
    font-size: 1.26rem;
    line-height: 1.25;
    border-bottom: 1px solid #eeeeee;
    color: #4AAE9B;
    justify-content: space-between;
  }

  .vue-modal-footer {
    border-top: 1px solid #eeeeee;
    justify-content: flex-end;
    color: #0a0b0b !important;
  }

  .vue-modal-body {
    position: relative;
    padding: 20px 10px;
    color: #0a0b0b !important;
  }

  .btn-close {
    border: none;
    font-size: 20px;
    cursor: pointer;
    font-weight: bold;
    color: #4AAE9B;
    background: transparent;
  }

  .btn-green {
    color: white;
    background: #4AAE9B;
    border: 1px solid #4AAE9B;
    border-radius: 2px;
    cursor: pointer;
  }
</style>
