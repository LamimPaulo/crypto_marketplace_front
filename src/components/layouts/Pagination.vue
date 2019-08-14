<template>
  <div class="paging_simple_numbers text-center">

    <span>Mostrando de {{ pagination.from }} à {{ pagination.to }} do total de {{ pagination.total }} registros</span>
    <br>
    <br>
    <ul class="pagination">
      <li class="paginate_button page-item previous" v-if="pagination.current_page > 1">
        <a class="page-link" href="javascript:void(0)" aria-label="Anterior" v-on:click.prevent="changePage(pagination.current_page - 1)">
          <span aria-hidden="true"> < </span>
        </a>
      </li>
      <li v-for="page in pagesNumber"
          :class="page == pagination.current_page ? 'page-item active': 'page-item'">
        <a class="page-link" href="javascript:void(0)" v-on:click.prevent="changePage(page)">{{ page }}</a>
      </li>
      <li class="paginate_button page-item next" v-if="pagination.current_page < pagination.last_page">
        <a class="page-link" href="javascript:void(0)" aria-label="Próxima" v-on:click.prevent="changePage(pagination.current_page + 1)">
          <span aria-hidden="true"> > </span>
        </a>
      </li>
    </ul>
    <div class="clearfix"></div>
  </div>
</template>
<script>
  export default {
    name: 'Pagination',
    props: {
      pagination: {
      },
      offset: {}
    },
    computed: {
      pagesNumber() {
        if (!this.pagination.to) {
          return [];
        }
        let from = this.pagination.current_page - this.offset;
        if (from < 1) {
          from = 1;
        }
        let to = from + (this.offset * 2);
        if (to >= this.pagination.last_page) {
          to = this.pagination.last_page;
        }
        let pagesArray = [];
        for (let page = from; page <= to; page++) {
          pagesArray.push(page);
        }
        return pagesArray;
      }
    },
    methods: {
      changePage(page) {
        this.pagination.current_page = page;
        this.$emit('paginate');
      }
    }
  }
</script>
<style scoped>
  ul.pagination{
    display: inline;
  }

  li.page-item {
    display: inline-block !important;
  }
</style>
