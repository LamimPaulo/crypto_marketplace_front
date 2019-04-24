<template>
  <transition name="vue-modal-fade">
    <div class="vue-modal-backdrop" @click.self="close">
      <div class="modal" tabindex="-1" role="dialog">
        <div class="modal-dialog modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <slot name="header">
                <h5 class="modal-title">default header</h5>
              </slot>

<!--              <button @click.self="closeModal" type="button" class="close" data-dismiss="modal" aria-label="Fechar modal">-->
<!--                <span aria-hidden="true">&times;</span>-->
<!--              </button>-->

            </div>
            <div class="modal-body">
              <slot name="body">
                default body
              </slot>
            </div>
<!--            <div class="modal-footer">-->
<!--              <slot name="footer">-->
<!--                <button @click="close" type="button" class="btn btn-secondary" data-dismiss="modal" aria-label="Close modal">-->
<!--                  Fechar-->
<!--                </button>-->
<!--              </slot>-->
<!--            </div>-->
          </div>
        </div>
      </div>
    </div>
  </transition>



<!--  <div class="modal" tabindex="-1" role="dialog">-->
<!--    <div class="modal-dialog" role="document">-->
<!--      <div class="modal-content">-->
<!--        <div class="modal-header">-->
<!--          <slot name="header">-->
<!--            <h5 class="modal-title">default header</h5>-->
<!--            <button  @click="close"type="button" class="close" data-dismiss="modal" aria-label="Fechar modal">-->
<!--              <span aria-hidden="true">&times;</span>-->
<!--            </button>-->
<!--          </slot>-->
<!--        </div>-->
<!--        <div class="modal-body">-->
<!--          <slot name="body">-->
<!--            default body-->
<!--          </slot>-->
<!--        </div>-->
<!--        <div class="modal-footer">-->
<!--          <slot name="footer">-->
<!--            <button @click="close" type="button" class="btn btn-secondary" data-dismiss="modal" aria-label="Close modal">-->
<!--              Fechar-->
<!--            </button>-->
<!--          </slot>-->
<!--        </div>-->
<!--      </div>-->
<!--    </div>-->
<!--  </div>-->


</template>
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
<style>
  .modal {
    display: block;
    color: #000;
  }
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
    z-index: 9999;
  }

  .os-tabs-w {
    width: 100%;
  }

  .vue-modal{
    background: #FFFFFF;
    box-shadow: 2px 2px 20px 1px;
    overflow-x: auto;
    display: flex;
    flex-direction: column;
    z-index: 9999;
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
