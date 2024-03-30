<script>
    import platformsService from "@/services/platformsService";
    import generatedAdsService from "@/services/generatedAdsService";
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
            };
        },
        mounted() {
            this.getPlatforms();
            this.getStatusAds();
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
                    const object = await generatedAdsService.new(this.model);
                    this.$notify({
                        message: this.$t('ads_generator.generated_ads_success'),
                        icon: 'tim-icons icon-bell-55',
                        horizontalAlign: 'center',
                        verticalAlign: 'top',
                        type: 'success',
                        timeout: 3000,
                    });
                    this.isLoading = false;
                    this.$router.push("/ads-generator-edit/" + object.id);
                }
                catch (e) {
                    this.isLoading = false;
                    this.$notify({
                        message: this.$t('ads_generator.generated_ads_error'),
                        icon: 'tim-icons icon-bell-55',
                        horizontalAlign: 'center',
                        verticalAlign: 'top',
                        type: 'error',
                        timeout: 3000,
                    });
                }
            },
        }
    }
</script>
<template>
    <card>
        <loading :active.sync="isLoading" :is-full-page="true" :loader="'bars'" :color="'#AA439D'" :background-color="'#000'" :opacity="0.8"></loading>

        <h5 slot="header" class="title">Dados do Produto</h5>
        <form v-on:submit.prevent="save">
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
                        data-maska="['$#####']"
                        v-model="model.product_comission"
                        required
                    >
                    </base-input>
                </div>
                <div class="col-sm-12 col-md-3">
                    <base-input
                        label="Tempo de Garantia (em dias)*"
                        placeholder="Informe o tempo de garantia"
                        v-model="model.product_guarantee"
                        v-maska
                        data-maska="['###']"
                        required
                    >
                    </base-input>
                </div>
            </div>
            <div class="row">
                <div class="col-sm-12 col-md-3">
                    <base-input
                        label="Menor preço dos potes*"
                        placeholder="Informe o valor"
                        v-maska
                        data-maska="['$##']"
                        v-model="model.product_bottle_lowest_price"
                        required
                    >
                    </base-input>
                </div>
                <div class="col-sm-12 col-md-3">
                    <base-input
                        label="Quantidade de potes no menor preço*"
                        placeholder="Informe a quantidade"
                        v-maska
                        data-maska="['##']"
                        v-model="model.product_bottle_lowest_price_quantity"
                        required
                    >
                    </base-input>
                </div>
                <div class="col-sm-12 col-md-3">
                    <base-input
                        label="Preço médio dos potes*"
                        placeholder="Informe o valor"
                        v-maska
                        data-maska="['$##']"
                        v-model="model.product_bottle_middle_price"
                        required
                    >
                    </base-input>
                </div>
                <div class="col-sm-12 col-md-3">
                    <base-input
                        label="Quantidade de potes no preço médio*"
                        placeholder="Informe a quantidade"
                        v-maska
                        data-maska="['##']"
                        v-model="model.product_bottle_middle_price_quantity"
                        required
                    >
                    </base-input>
                </div>
            </div>
            <div class="row">
                <div class="col-sm-12 col-md-3">
                    <base-input
                        label="Maior preço dos potes*"
                        placeholder="Informe o valor"
                        v-maska
                        data-maska="['$##']"
                        v-model="model.product_bottle_biggest_price"
                        required
                    >
                    </base-input>
                </div>
                <div class="col-sm-12 col-md-3">
                    <base-input
                        label="Quantidade de potes no preço maior*"
                        placeholder="Informe a quantidade"
                        v-maska
                        data-maska="['##']"
                        v-model="model.product_bottle_biggest_price_quantity"
                        required
                    >
                    </base-input>
                </div>
                <div class="col-sm-12 col-md-3">
                    <base-input
                        label="Preço total (kit completo)*"
                        placeholder="Informe o valor"
                        v-maska
                        data-maska="['$####']"
                        v-model="model.product_bottle_biggest_total_price"
                        required
                    >
                    </base-input>
                </div>
                <div class="col-sm-12 col-md-3">
                    <base-input
                        label="Preço de ancoragem (kit completo)*"
                        placeholder="Informe o valor"
                        v-maska
                        data-maska="['$####']"
                        v-model="model.product_bottle_biggest_anchoring_price"
                        required
                    >
                    </base-input>
                </div>
            </div>
            <div class="row">
                <div class="col-md-9">
                    <base-input
                        label="URL final do anúncio (que você vai colocar no Google)*"
                        placeholder="Informe a URL"
                        v-model="model.url"
                        required
                    >
                    </base-input>
                </div>
                <div class="col-md-3">
                    <div class="form-group">
                        <label class="control-label">Status do Anúncio*</label>
                        <select v-model="model.status" class="form-control" required>
                            <option v-for="status in statusAds" v-bind:value="status" :key="status.id">
                                {{ status.name }}
                            </option>
                        </select>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-12 text-right">
                    <button class="btn" type="submit">
                        Gerar Anúncio
                    </button>
                </div>
            </div>
        </form>
    </card>
</template>