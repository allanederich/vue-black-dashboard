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
    computed: {
      objId() {
        return this.$route.params.id;
      },
    },
    async mounted() {
      await this.getPlatforms();
      await this.getStatusAds();
      await this.getTitlesAds();
      await this.getModel();
      this.isLoading = false;
    },
    data() {
      return {
        model: {},
        platforms: [],
        statusAds: [],
        titlesAds: [],
        isLoading: true
      };
    },
    methods: {
      async getModel() {
        var generatedAds = await generatedAdsService.get(this.objId);
        for (let i = 0; i < this.titlesAds.length; i++) {
            this.titlesAds[i].value = this.titlesAds[i].value.replace('{product_name}', generatedAds.product_name);
            this.titlesAds[i].value = this.titlesAds[i].value.replace('{product_lowest_price}', generatedAds.product_bottle_lowest_price);
            
            var saveUpToValue = parseFloat(generatedAds.product_bottle_biggest_anchoring_price - generatedAds.product_bottle_biggest_total_price).toFixed(0);
            saveUpToValue = '$' + saveUpToValue;

            var saveUpToPercent = parseFloat(100 - (generatedAds.product_bottle_biggest_total_price * 100) / generatedAds.product_bottle_biggest_anchoring_price).toFixed(0);
            saveUpToPercent = saveUpToPercent + '%';

            this.titlesAds[i].value = this.titlesAds[i].value.replace('{save_up_to_value}', saveUpToValue);
            this.titlesAds[i].value = this.titlesAds[i].value.replace('{save_up_to_percent}', saveUpToPercent);

            this.titlesAds[i].countWords = this.titlesAds[i].value.length;
        }
        this.model = generatedAds;
      },
      async getPlatforms() {
        this.platforms = await platformsService.getAll();
      },
      async getStatusAds() {
        this.statusAds = await googleAdsModelsService.getStatusAll();
      },
      async getTitlesAds() {
        this.titlesAds = await googleAdsModelsService.getTitlesAll();
      },
      async save () {
        this.regenerateAds();
      },
      async regenerateAds() {
        try {
            this.isLoading = true;
            this.titlesAds = [];
            await generatedAdsService.update(this.model);
            this.model = {};
            await this.getTitlesAds();
            await this.getModel();
            this.isLoading = false;
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
      copyToClipboard(id) {
        var copyText = document.getElementById(id);
        // Select the text field
        copyText.select();
        copyText.setSelectionRange(0, 99999); // For mobile devices

        // Copy the text inside the text field
        navigator.clipboard.writeText(copyText.value);

        this.$notify({
            message: this.$t('ads_generator.copy_to_clipboard_success'),
            icon: 'tim-icons icon-bell-55',
            horizontalAlign: 'center',
            verticalAlign: 'top',
            type: 'success',
            timeout: 3000,
        });
      },
    },
  };
  </script>
    <style>
        .custom-titles > input {
            color: white !important;
        }
    </style>  

<template>
    <div>
        <loading :active.sync="isLoading" :is-full-page="true" :loader="'bars'" :color="'#AA439D'" :background-color="'#000'" :opacity="0.8"></loading>
        <card>
            <h5 slot="header" class="title">Dados do Produto</h5>

            <form v-on:submit.prevent="regenerateAds">
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
                                Regerar Anúncio
                            </button>
                            <button class="btn" type="button" @click="save">
                                Salvar
                            </button>
                        </div>
                    </div>
                </form>
        </card>

        <card v-if="titlesAds.length > 0">
            <h5 slot="header" class="title">Títulos Gerados</h5>

            <table class="table tablesorter">
                <thead class="text-primary">
                    <tr>
                        <th>Título</th>
                        <th>Tamanho</th>
                        <th style="text-align: center;">Copiar</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="title in titlesAds" :key="title.id">
                        <td>
                            <base-input
                                :id="title.id"
                                v-model="title.value"
                                class="custom-titles"
                                required
                                disabled
                            >
                            </base-input>
                        </td>
                        <td>
                            {{ title.countWords }} / 30
                            <i v-if="title.countWords <= 30" class="tim-icons icon-check-2" style="color: #02FF02;"></i>
                            <i v-if="title.countWords > 30" class="tim-icons icon-simple-remove" style="color: red;"></i>
                        </td>
                        <td style="text-align: center;">
                            <button class="btn btn-sm" @click="copyToClipboard(title.id)">
                                <i class="tim-icons icon-single-copy-04"></i>
                                Copiar
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>

        </card>
    </div>
  
</template>