<template>
  <div class="container mt-3 mb-3">
    <div class="loader" v-if="loader"></div>
    <top-menu-user></top-menu-user>

    <top-menu></top-menu>

    <vue-headful title="Tickets de Suporte" description="Liquidex"/>
    <div class="all-wrapper with-side-panel solid-bg-all">
      <div class="layout-w">
        <div class="content-w">

          <div class="content-i">
            <div class="content-box">
              <div class="row">

                <div class="col-sm-12" v-if="isTicketVisible">
                  <div class="element-wrapper">
                    <div class="element-box">
                      <div class="element-info">
                        <div class="element-info-with-icon">
                          <div class="element-info-icon">
                            <div class="os-icon os-icon-plus"></div>
                          </div>
                          <div class="element-info-text">
                            <h5 class="element-inner-header">
                              Abrir Ticket
                            </h5>
                          </div>
                        </div>
                      </div>

                      <form @submit.prevent="storeTicket">

                        <div class="row">
                          <div class="col-sm-6">
                            <div class="form-group">
                              <label> Departamento</label>
                              <select required class="form-control"
                                      v-model="ticket.department">
                                <option :value="i" v-for="(dep, i) in departments">
                                  {{ dep}}
                                </option>
                              </select>
                            </div>
                          </div>
                          <div class="col-sm-6">
                            <div class="form-group">
                              <label for="subject">Assunto</label>
                              <input class="form-control" placeholder="Assunto"
                                     type="text"
                                     id="subject"
                                     required
                                     v-model="ticket.subject"
                              >
                            </div>
                          </div>
                        </div>

                        <div class="form-group">
                          <label for="ticket_message"> Mensagem</label>
                          <textarea class="form-control" placeholder="Sua mensagem"
                                    id="ticket_message"
                                    required
                                    v-model="ticket.message"></textarea>
                        </div>

                        <div class="form-group">
                          <div class="upload-btn-wrapper">
                            <button class="btn btn-block">
                              {{ file ? file.name : 'Anexar Arquivo'}}
                            </button>
                            <input type="file" id="file" ref="file" @change="loadFile()">
                          </div>
                        </div>

                        <div class="form-buttons-w text-right">
                          <button class="btn btn-danger" type="button"
                                  @click.prevent="isTicketVisible=false"> Cancelar
                          </button>
                          <button class="btn btn-primary" type="submit"> Enviar</button>
                        </div>
                      </form>

                    </div>
                  </div>
                </div>

                <div class="col-sm-12" v-if="isTicketMessageVisible">
                  <div class="element-wrapper mb-0 pb-0 pt-0">

                    <div class="element-box">

                      <div class="element-info mb-0 ">
                        <h5 class="element-inner-header">
                          Ticket #{{ ticket_message.id }} - {{ticket_message.subject}} <span
                          :class="'ml-2 py-2 px-2 badge badge-'+ticket_message.statusClass"> {{ticket_message.statusName}} </span>
                          <div class="element-actions">
                            <button class="btn btn-danger btn-sm"
                                    @click.prevent="isTicketMessageVisible=false">
                              Fechar
                            </button>
                          </div>
                        </h5>

                      </div>

                      <div class="mt-4" v-for="(msg,i) in ticket_message.messages">
                        <div :class="msg.user.email!==user.email ? 'text-right mb-1' : 'text-left mb-1'">
                          <strong class="font-bold" v-if="msg.user.email!==user.email">{{
                            msg.user.name }}</strong>
                          <strong class="font-bold" v-else>você </strong>
                          <span>em: {{ msg.createdLocal }}</span>
                        </div>
                        <div
                          :class="msg.user.email!==user.email ? 'd-block badge badge-warning py-4 px-2 text-right' : 'd-block badge badge-default py-4 px-2 text-left' ">
                          {{ msg.message }}
                        </div>

                        <div v-for="(msgfile, i) in msg.files">
                          <a class="badge badge-default mt-2" target="_blank"
                             :href="'data:image/'+msgfile.type+';base64, ' + msgfile.api_file"
                             v-if="['jpeg','jpg','gif','png'].includes(msgfile.type)"
                          >
                            <i class="os-icon os-icon-ui-51"></i><span>Anexo {{i+1}}</span>
                          </a>

                          <a class="badge badge-default mt-2" target="_blank"
                             v-else
                             :href="'data:application/'+msgfile.type+';base64, ' + msgfile.api_file">
                            <i class="os-icon os-icon-ui-51"></i><span>Anexo {{i+1}}</span>
                          </a>
                        </div>

                        <hr>
                      </div>

                      <form @submit.prevent="storeTicketMessage" class="mt-2"
                            v-if="ticket_message.status<3">

                        <div class="form-group">
                          <label for="ticket_message"> Nova Mensagem</label>
                          <textarea class="form-control"
                                    placeholder="Sua mensagem"
                                    id="message"
                                    required
                                    v-model="message.message"></textarea>
                        </div>

                        <div class="row">
                          <div class="col-sm-6">
                            <div class="form-group">
                              <label> Situação</label>
                              <select required class="form-control"
                                      v-model="message.status">
                                <option :value="i" v-for="(s, i) in status"
                                        v-if="i>1">
                                  {{ s }}
                                </option>
                              </select>
                            </div>
                          </div>
                          <div class="col-sm-6">
                            <div class="form-group">
                              <div class="upload-btn-wrapper mt-4">
                                <button class="btn btn-block">
                                  {{ file ? file.name : 'Anexar Arquivo'}}
                                </button>
                                <input type="file" id="message_file"
                                       ref="file"
                                       @change="loadFile()">
                              </div>
                            </div>
                          </div>
                        </div>


                        <div class="form-buttons-w text-right">
                          <button class="btn btn-primary" type="submit"> Enviar
                          </button>
                        </div>
                      </form>

                    </div>
                  </div>
                </div>

                <div class="col-sm-12">
                  <div class="element-wrapper mb-0 pb-0 pt-0">

                    <div class="element-box">

                      <div class="row alert alert-warning" v-show="isSupportClosed">
                        <div class="col-sm-11">
                          Abertura de Tickets Fechada para o fim de semana, após às {{ this.configs.fri_close_time }}. <br>
                          Reabertura na Segunda, às <strong>{{ this.configs.mon_opening_time }}</strong>
                        </div>
                      </div>

                      <div class="element-info mb-0 ">
                        <h5 class="element-inner-header">
                          Meus Tickets
                          <div class="element-actions">                            
                            <button class="btn btn-success btn-sm"
                                    @click.prevent="teste()">
                              <i class="os-icon os-icon-plus"></i><span> Abrir Ticket</span>
                            </button>
                          </div>
                        </h5>

                        <div class="element-inner-desc">
                          clique ao lado caso deseje abrir uma nova solicitação
                        </div>

                        <hr class="mb-2">
                        <div class="element-box-content">
                          <div class="table-responsive">
                            <table class="table table-lightborder table-striped">
                              <thead>
                              <tr>
                                <th><i class="os-icon os-icon-info"></i>
                                </th>
                                <th>
                                  <i class="os-icon os-icon-calendar-time"></i>
                                  Criado
                                  em
                                </th>
                                <th><i class="os-icon os-icon-info"></i>
                                  Status
                                </th>
                                <th><i class="os-icon os-icon-info"></i>
                                  Assunto
                                </th>
                                <th><i class="os-icon os-icon-info"></i>
                                  Última Mensagem
                                </th>
                              </tr>
                              </thead>
                              <tbody>
                              <tr v-for="ticket in tickets.data">
                                <td>
                                  <button @click.prevent="detailedTicket(ticket)"
                                          class="btn btn-rounded btn-sm btn-primary">
                                    <i
                                      class="os-icon os-icon-search"></i>
                                  </button>
                                </td>
                                <td>{{ ticket.createdLocal }}</td>
                                <td>
                                                                    <span
                                                                      :class="'py-2 px-2 badge badge-'+ticket.statusClass">
                                                                        {{ticket.statusName}}
                                                                    </span>
                                </td>
                                <td>{{ ticket.subject }}</td>
                                <td>{{ ticket.updatedLocal }}</td>
                              </tr>
                              <tr v-if="tickets.total===0">
                                <td colspan="5">
                                  nenhum registro
                                </td>
                              </tr>
                              </tbody>
                            </table>
                          </div>
                          <pagination :pagination="tickets"
                                      @paginate="retrieveTicketsList()"
                                      :offset="10"/>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
      <div class="display-type"></div>
    </div>
    <Footer></Footer>
  </div>

</template>

<script>
  import {mapGetters} from 'vuex'
  import Sidebar from './../menu/Sidebar'
  import TopMenu from './../menu/TopMenu';
  import TopMenuUser from './../menu/TopMenuUser';
  import Footer from './../layouts/Footer';
  import Pagination from './../layouts/Pagination';

  export default {
    name: "UserTickets",
    data() {
      return {
        isTicketVisible: false,
        isTicketMessageVisible: false,
        isSupportClosed: false,
        loader: true,
        configs: {
          days_off: '6,0',
          fri_close_time: '00:00:00',
          mon_opening_time: '00:00:00'
        },
        ticket: {
          subject: null,
          message: null,
          department: null
        },
        ticket_message: {
          id: null,
          subject: null,
          message: null,
          department: null
        },
        message: {
          user_ticket_id: null,
          message: null,
          status: null,
        },
        file: null,
        formData: new FormData(),
        tickets: {
          total: 0,
          per_page: 10,
          from: 1,
          to: 0,
          current_page: 1
        },
        offset: 10,
        timer: null,
        status: null,
        departments: null,
      }
    },
    methods: {
      detailedTicket(ticket) {
        this.ticket_message = ticket
        this.message.status = ticket.status
        this.isTicketMessageVisible = true
      },
      loadFile() {
        this.file = this.$refs.file.files[0];
      },
      storeTicket() {
        this.loader = true
        if (this.file) {
          this.formData.append("file", this.file);
        }
        this.formData.append("subject", this.ticket.subject);
        this.formData.append("message", this.ticket.message);
        this.formData.append("department", this.ticket.department);

        this.$store
          .dispatch("storeUserTicket", this.formData)
          .then(
            this.$toasted
              .show("enviando...", {position: 'bottom-left', type: 'info'})
              .goAway(3000)
          )
          .then(response => {
            this.$toasted
              .show(response.data.message, {position: 'bottom-left', type: 'success'})
              .goAway(3000);

            this.retrieveTicketsList();
            this.ticket.subject = null
            this.ticket.message = null
            this.ticket.department = null
            this.file = null
            this.isTicketVisible = false
            this.isTicketMessageVisible = false
            this.formData = new FormData()

          })
          .catch(error => {
            if (error.response) {
              this.handleErrors(error.response);
            }
            this.loader = false
          });
      },
      storeTicketMessage() {
        this.loader = true
        if (this.file) {
          this.formData.append("file", this.file);
        }
        this.formData.append("message", this.message.message);
        this.formData.append("status", this.message.status);
        this.formData.append("user_ticket_id", this.ticket_message.id);

        this.$store
          .dispatch("storeUserTicketMessage", this.formData)
          .then(
            this.$toasted
              .show("enviando...", {position: 'bottom-left', type: 'info'})
              .goAway(3000)
          )
          .then(response => {
            this.$toasted
              .show(response.data.message, {position: 'bottom-left', type: 'success'})
              .goAway(3000);

            this.retrieveTicketsList();
            this.message.user_ticket_id = null
            this.message.message = null
            this.message.status = null
            this.file = null
            this.isTicketVisible = false
            this.isTicketMessageVisible = false
          })
          .catch(error => {
            if (error.response) {
              this.handleErrors(error.response);
            }
          });
      },
      retrieveTicketsList() {
        this.loader = true
        this.$store.dispatch('retrieveUserTicketsList', this.tickets.current_page)
          .then(response => {
            this.tickets = response.data
            this.loader = false
          })
          .catch(error => {
            if (error.response) {
              this.handleErrors(error.response)
            }
            this.loader = false
          })
      },
      retrieveTicketsConfig() {
        this.$store.dispatch('retrieveTicketsConfig')
          .then(response => {
            this.configs = response.data.config
            // this.configs = JSON.parse(JSON.stringify(response))
          })
          .catch(error => {
            if (error.response) {
              this.handleErrors(error.response)
            }
          })
      },
      retrieveTicketsStatus() {
        this.$store.dispatch('retrieveUserTicketsStatus')
          .then(response => {
            this.status = response.data
          })
          .catch(error => {
            if (error.response) {
              this.handleErrors(error.response)
            }
          })
      },
      retrieveTicketsDepartments() {
        this.$store.dispatch('retrieveUserTicketsDepartments')
          .then(response => {
            this.departments = response.data
          })
          .catch(error => {
            if (error.response) {
              this.handleErrors(error.response)
            }
          })
      },
      teste() {
        var d = new Date()
        var today = String(d.getDay())
        var time = d.getHours()+':'+d.getMinutes()
        var array = (this.configs.days_off.split(","))

        if(array.includes(today)) {
          this.isSupportClosed = true
        }
        else if(today == 5 && time >= this.configs.fri_close_time || today == 1 && time <= this.configs.mon_opening_time) {
          this.isSupportClosed = true
        }
        else{
          this.isSupportClosed = false
          this.isTicketVisible = true
        }
      },
    },
    mounted() {
      this.retrieveTicketsDepartments()
      this.retrieveTicketsStatus()
      this.retrieveTicketsList()
      this.retrieveTicketsConfig()
    },
    computed: {
      ...mapGetters([
        'user'
      ]),
    },
    components: {
      TopMenu,
      Sidebar,
      TopMenuUser,
      Footer,
      Pagination,
    },
    beforeCreate: function () {
      document.body.className = 'menu-position-side menu-side-left full-screen with-content-panel';
    }
  }
</script>

<style scoped>
  .layout-w {
    /*min-height: 100vh;*/
  }

  .badge {
    white-space: normal;
  }

  .form-desc {
    border-bottom: 0;
  }

  .badge-default {
    background-color: #f3f3f7;
  }

</style>
