<script>

    import { BaseTable } from "@/components";
    import generatedAdsService from "@/services/generatedAdsService";
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
            await this.getGeneratedAds();
            this.isLoading = false;
        },
        methods: {
            openProduct(id) {
                this.$router.push("/ads-generator-edit/" + id);
            },
            async getGeneratedAds()  {
                this.table.data = await generatedAdsService.getAll();
            },
            formatDate(date) {
                return moment(date).format('DD/MM/YYYY');
            },
            newAds() {
                this.$router.push("/ads-generator-new");
            }
        },
    };
</script>

<style></style>  

<template>
    <div class="row">
        <loading :active.sync="isLoading" :is-full-page="true" :loader="'bars'" :color="'#AA439D'" :background-color="'#000'" :opacity="0.8"></loading>
      <div class="col-12">
        <card :buttonAddLabel="'Gerar Anúncio'" :buttonAddClick="newAds">
            <h5 slot="header" class="title">Anúncios Gerados</h5>
          <div>
            <table class="table tablesorter">
                <thead class="text-primary">
                    <tr>
                        <th>Data de Criação</th>
                        <th>Produto</th>
                        <th>Plataforma</th>
                        <th>Comissão</th>
                        <th>Status</th>
                        <th class="text-center">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in table.data" :key="index">
                        <td>{{ $formatDate(item.creation_date) }}</td>
                        <td>{{ item.product_name }}</td>
                        <td>{{ item.platform_name }}</td>
                        <td>{{ item.product_comission | toCurrency }}</td>
                        <td>{{ item.status_name }}</td>
                        <td class="text-center">
                            <button class="btn btn-sm custom-button-text-with-icon" @click="openProduct(item.id)">
                                <i class="tim-icons icon-tap-02"></i><br>
                                Abrir
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
          </div>
        </card>
      </div>
    </div>
</template>