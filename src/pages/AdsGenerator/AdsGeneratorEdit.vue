<script>
  import platformsService from "@/services/platformsService";
  import generatedAdsService from "@/services/generatedAdsService";
  import googleAdsModelsService from "@/services/googleAdsModelsService";

    // Import component
    import Loading from 'vue-loading-overlay';
    // Import stylesheet
    import 'vue-loading-overlay/dist/vue-loading.css';

    import {
        VsaList,
        VsaItem,
        VsaHeading,
        VsaContent
    } from 'vue-simple-accordion';

  export default {
    components: {
        Loading,
        VsaList,
        VsaItem,
        VsaHeading,
        VsaContent
    },
    computed: {
      objId() {
        return this.$route.params.id;
      },
    },
    async mounted() {
      await this.getPlatforms();
      await this.getStatusAds();
      await this.getModel();
      this.isLoading = false;
    },
    data() {
      return {
        model: {},
        modelTmp: {},
        platforms: [],
        statusAds: [],
        titlesAds: [],
        descriptionsAds: [],
        isLoading: true
      };
    },
    methods: {
      async getModel() {
        this.modelTmp = await generatedAdsService.get(this.objId);
        await this.getTitlesAds();
        await this.getDescriptionsAds();
        this.model = this.modelTmp;
      },
      async getPlatforms() {
        this.platforms = await platformsService.getAll();
      },
      async getStatusAds() {
        this.statusAds = await googleAdsModelsService.getStatusAll();
      },
      async getTitlesAds() {
        
        var adsModelTitles = await googleAdsModelsService.getTitlesAll();
        for (let i = 0; i < adsModelTitles.length; i++) {
            adsModelTitles[i].value = adsModelTitles[i].value.replace('{product_name}', this.modelTmp.product_name);
            adsModelTitles[i].value = adsModelTitles[i].value.replace('{product_lowest_price}', this.modelTmp.product_bottle_lowest_price);
            
            var saveUpToValue = parseFloat(this.modelTmp.product_bottle_biggest_anchoring_price - this.modelTmp.product_bottle_biggest_total_price).toFixed(0);
            saveUpToValue = '$' + saveUpToValue;

            var saveUpToPercent = parseFloat(100 - (this.modelTmp.product_bottle_biggest_total_price * 100) / this.modelTmp.product_bottle_biggest_anchoring_price).toFixed(0);
            saveUpToPercent = saveUpToPercent + '%';

            adsModelTitles[i].value = adsModelTitles[i].value.replace('{save_up_to_value}', saveUpToValue);
            adsModelTitles[i].value = adsModelTitles[i].value.replace('{save_up_to_percent}', saveUpToPercent);

            adsModelTitles[i].value = adsModelTitles[i].value.replace('{product_guarantee}', this.modelTmp.product_guarantee);

            adsModelTitles[i].countWords = adsModelTitles[i].value.length;
        }
        this.titlesAds = adsModelTitles;
      },
      async getDescriptionsAds() {
        
        var adsModelDescriptions = await googleAdsModelsService.getDescriptionsAll();
        for (let i = 0; i < adsModelDescriptions.length; i++) {
            adsModelDescriptions[i].value = adsModelDescriptions[i].value.replace('{product_name}', this.modelTmp.product_name);
            adsModelDescriptions[i].value = adsModelDescriptions[i].value.replace('{product_lowest_price}', this.modelTmp.product_bottle_lowest_price);
            
            var saveUpToValue = parseFloat(this.modelTmp.product_bottle_biggest_anchoring_price - this.modelTmp.product_bottle_biggest_total_price).toFixed(0);
            saveUpToValue = '$' + saveUpToValue;

            var saveUpToPercent = parseFloat(100 - (this.modelTmp.product_bottle_biggest_total_price * 100) / this.modelTmp.product_bottle_biggest_anchoring_price).toFixed(0);
            saveUpToPercent = saveUpToPercent + '%';

            adsModelDescriptions[i].value = adsModelDescriptions[i].value.replace('{save_up_to_value}', saveUpToValue);
            adsModelDescriptions[i].value = adsModelDescriptions[i].value.replace('{save_up_to_percent}', saveUpToPercent);

            adsModelDescriptions[i].value = adsModelDescriptions[i].value.replace('{product_guarantee}', this.modelTmp.product_guarantee);

            adsModelDescriptions[i].countWords = adsModelDescriptions[i].value.length;
        }
        this.descriptionsAds = adsModelDescriptions;
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
            this.modelTmp = {};
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
        .vsa-item__trigger:hover {
            box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.4);
            -webkit-transform: translateY(-1px);
        }
        .vsa-item__trigger {
            width: 100%;
            cursor: pointer;
            border-width: 2px;
            border: none;
            position: relative;
            overflow: hidden;
            margin: 4px 1px;
            border-radius: 0.4285rem;
            background: #344675;
            background-image: linear-gradient(to bottom left, #344675, #263148, #344675);
            background-size: 210% 210%;
            background-position: top right;
            background-color: #344675;
            transition: all 0.15s ease;
            box-shadow: none;
            color: #ffffff;
            display: inline-block;
            font-weight: 600;
            text-align: center;
            white-space: nowrap;
            vertical-align: middle;
            user-select: none;
            padding: 11px 40px;
            font-size: 0.875rem;
            line-height: 1.35em;
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
            <h5 slot="header" class="title">Títulos e Descrições</h5>

            <div class="row">
                <div class="col-md-12">
                    <vsa-list>
                        <vsa-item>
                            <vsa-heading>
                                Títulos <i class="tim-icons icon-tap-02"></i>
                            </vsa-heading>

                            <vsa-content>
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
                                            <td width="70%">
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
                            </vsa-content>
                        </vsa-item>
                        
                        <vsa-item v-if="descriptionsAds.length > 0">
                            <vsa-heading>
                                Descrições <i class="tim-icons icon-tap-02"></i>
                            </vsa-heading>

                            <vsa-content>
                                <table class="table tablesorter">
                                    <thead class="text-primary">
                                        <tr>
                                            <th>Descrição</th>
                                            <th>Tamanho</th>
                                            <th style="text-align: center;">Copiar</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="description in descriptionsAds" :key="description.id">
                                            <td width="70%">
                                                <base-input
                                                    :id="description.id"
                                                    v-model="description.value"
                                                    class="custom-titles"
                                                    required
                                                    disabled
                                                >
                                                </base-input>
                                            </td>
                                            <td>
                                                {{ description.countWords }} / 90
                                                <i v-if="description.countWords <= 90" class="tim-icons icon-check-2" style="color: #02FF02;"></i>
                                                <i v-if="description.countWords > 90" class="tim-icons icon-simple-remove" style="color: red;"></i>
                                            </td>
                                            <td style="text-align: center;">
                                                <button class="btn btn-sm" @click="copyToClipboard(description.id)">
                                                    <i class="tim-icons icon-single-copy-04"></i>
                                                    Copiar
                                                </button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </vsa-content>
                        </vsa-item>
                    </vsa-list>
                </div>
            </div>
        </card>
    </div>
  
</template>