<script>

    import { BaseTable } from "@/components";
    import testingFlowService from "@/services/testingFlowService";
    import moment from 'moment';
    import Helper from "@/plugins/Helper";

    // Import component
    import Loading from 'vue-loading-overlay';
    // Import stylesheet
    import 'vue-loading-overlay/dist/vue-loading.css';

    import Vue from 'vue';
    Vue.use(Helper);

    export default {
        components: {
            BaseTable,
            Loading
        },
        data() {
            return {
                table: {
                    data: [],
                },
                helper: Helper,
                isLoading: true,
            };
        },
        async mounted() {
            await this.getTestingFlow();
            this.isLoading = false;
        },
        methods: {
            openProduct(id) {
                this.$router.push("/testing-flow-edit/" + id);
            },
            async getTestingFlow()  {
                this.table.data = await testingFlowService.getAll();
            },
            formatDate(date) {
                return moment(date).format('DD/MM/YYYY');
            },
            add() {
                this.$router.push("/testing-flow-new");
            }
        },
    };
</script>

<style></style>  

<template>
    <div class="row">
        <loading :active.sync="isLoading" :is-full-page="true" :loader="'bars'" :color="'#AA439D'" :background-color="'#000'" :opacity="0.8"></loading>
      <div class="col-12">
        <card :buttonAddLabel="'Adicionar Produto'" :buttonAddClick="add">
            <h5 slot="header" class="title">Produtos</h5>
          <div>
            <table class="table tablesorter">
                <thead class="text-primary">
                    <tr>
                        <th width="10%">Data de Criação</th>
                        <th width="10%">Plataforma</th>
                        <th width="25%">Produto</th>
                        <th width="25%">Campanha</th>
                        <th width="10%">Comissão</th>
                        <th width="10%">Status</th>
                        <th width="10%" class="text-center">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in table.data" :key="index">
                        <td>{{ $formatDate(item.creation_date) }}</td>
                        <td>{{ item.platform_name }}</td>
                        <td>{{ item.product_name }}</td>
                        <td>{{ item.campaign_name ?? "Sem Campanha" }}</td>
                        <td>{{ item.product_comission | toCurrency }}</td>
                        <td>{{ item.status_name }}</td>
                        <td class="text-center">
                            <button class="btn btn-sm custom-button-text-with-icon" @click="openProduct(item.id)">
                                <i class="tim-icons icon-tap-02"></i><br>
                                Abrir
                            </button>
                        </td>
                    </tr>
                    <tr v-if="table.data.length === 0">
                        <td colspan="6" class="text-center"><i>Nenhum produto na esteira. Clique em <b>Adicionar Produto</b> e comece sua esteira de testes!</i></td>
                    </tr>
                </tbody>
            </table>
          </div>
        </card>
      </div>
    </div>
</template>