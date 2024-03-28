<script>
    import platformsService from "@/services/platformsService";
    import testingFlowService from "@/services/testingFlowService";
    import googleAdsModelsService from "@/services/googleAdsModelsService";

    // Import component
    import Loading from 'vue-loading-overlay';
    // Import stylesheet
    import 'vue-loading-overlay/dist/vue-loading.css';

    export default {
        components: {
            Loading
        },
        data() {
            return {
                model: {},
                platforms: [],
                statusAds: [],
                isLoading: false,
                product_comission_brl: ""
            };
        },
        async mounted() {
            await this.getPlatforms();
            await this.getStatusAds();
        },
        methods: {
            async getPlatforms() {
                this.platforms = await platformsService.getAll();
            },
            async getStatusAds() {
                this.statusAds = await googleAdsModelsService.getStatusAll();
            },
            async save() {
                this.isLoading = true;
                try {
                    const object = await testingFlowService.new(this.model);
                    this.$notify({
                        message: this.$t('testing_flow.add_success'),
                        icon: 'tim-icons icon-bell-55',
                        horizontalAlign: 'center',
                        verticalAlign: 'top',
                        type: 'success',
                        timeout: 3000,
                    });
                    this.isLoading = false;
                    this.$router.push("/testing-flow-list/");
                }
                catch (e) {
                    this.isLoading = false;
                    this.$notify({
                        message: this.$t('testing_flow.add_error'),
                        icon: 'tim-icons icon-bell-55',
                        horizontalAlign: 'center',
                        verticalAlign: 'top',
                        type: 'error',
                        timeout: 3000,
                    });
                }
            },
        },
        watch: {
            'model.product_comission': function (val) {
                if ( typeof(val) !== 'string' ) {
                    return;
                }
                var usd_value = val.replace("$", "");
                var brl_value = parseFloat(usd_value) * 5;
                if ( usd_value.length == 0 ) {
                    brl_value = 0;
                }
                this.product_comission_brl = "R$ " + brl_value;
            }
        }
    }
</script>
<style>
    .custom-input-disabled > input {
        color: #fff !important;
    }
</style>
<template>
    <card>
        <loading :active.sync="isLoading" :is-full-page="true" :loader="'bars'" :color="'#AA439D'" :background-color="'#000'" :opacity="0.8"></loading>

        <h5 slot="header" class="title">Dados do Produto</h5>
        <form v-on:submit.prevent="save">
            <div class="row">
                <div class="col-md-3">
                    <div class="form-group">
                        <label class="control-label">Status*</label>
                        <select v-model="model.status" class="form-control" required>
                            <option v-for="status in statusAds" v-bind:value="status" :key="status.id">
                                {{ status.name }}
                            </option>
                        </select>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-sm-12 col-md-3">
                    <div class="form-group">
                        <label class="control-label">Plataforma*</label>
                        <select v-model="model.platform" class="form-control" required>
                            <option v-for="platform in platforms" v-bind:value="platform" :key="platform.id">
                                {{ platform.name }}
                            </option>
                        </select>
                    </div>
                </div>
                <div class="col-sm-12 col-md-3">
                    <base-input
                        label="Nome do Produto*"
                        placeholder="Informe o nome do produto"
                        v-model="model.product_name"
                        required
                    >
                    </base-input>
                </div>
                <div class="col-sm-12 col-md-3">
                    <base-input
                        label="Comissão*"
                        placeholder="Informe o valor da comissão"
                        v-maska
                        data-maska="['$###.##', '$##.##']"
                        v-model="model.product_comission"
                        required
                    >
                    </base-input>
                </div>
                <div class="col-sm-12 col-md-3">
                    <base-input
                        label="Comissão em R$"
                        placeholder="Informe o valor da comissão"
                        v-model="product_comission_brl"
                        class="custom-input-disabled"
                        disabled
                    >
                    </base-input>
                </div>
            </div>
            <div class="row">
                <div class="col-md-3">
                    <base-input
                        label="Nome da campanha"
                        placeholder="Informe o nome da campanha"
                        v-model="model.campaign_name"
                    >
                    </base-input>
                </div>
            </div>
            <div class="row">
                <div class="col-md-12">
                    <label class="control-label">
                        Observações
                    </label>
                    <textarea class="form-control" rows="5" v-model="model.obs" placeholder="Faça suas anotações aqui" style="padding: 10px 18px 10px 18px; border: 1px solid #cad1d7; border-color: #2b3553; border-radius: 0.4285rem;"></textarea>
                </div>
            </div>
            <div class="row">
                <div class="col-md-12 text-right">
                    <button class="btn" type="submit">
                        Salvar Produto
                    </button>
                </div>
            </div>
        </form>
    </card>
</template>