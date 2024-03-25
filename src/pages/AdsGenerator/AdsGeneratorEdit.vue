<script>

  import { BaseTable } from "@/components";
  const tableColumns = ["Data", "Produto", "Plataforma", "Comissão"];
  const tableData = [
    {
      id: 1,
      date: "24/03/2024",
      product: "Puravive",
      platform: "ClickBank",
      comission: "$124,17",
      status: "Ativo"
    },
    {
      id: 2,
      date: "24/03/2024",
      product: "ProDentim",
      platform: "ClickBank",
      comission: "$146,41",
      status: "Inativo"
    },
  ];
  
  export default {
    components: {
      BaseTable,
    },
    data() {
      return {
        table: {
          title: "Anúncios Gerados",
          columns: [...tableColumns],
          data: [...tableData],
        },
      };
    },
    methods: {
      openProduct() {
        this.$router.push("/ads-generator-edit");
      },
    },
  };
  </script>
  <style></style>  

<template>
    <div class="row">
      <div class="col-12">
        <card :title="table.title">
          <div>
            <table class="table tablesorter">
                <thead class="text-primary">
                    <tr>
                        <th>Data</th>
                        <th>Produto</th>
                        <th>Plataforma</th>
                        <th>Comissão</th>
                        <th>Status</th>
                        <th class="text-center">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in table.data" :key="index">
                        <td>{{ item.date }}</td>
                        <td>{{ item.product }}</td>
                        <td>{{ item.platform }}</td>
                        <td>{{ item.comission }}</td>
                        <td>{{ item.status }}</td>
                        <td class="text-center">
                            <button class="btn btn-sm custom-button-text-with-icon" @click="openProduct">
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