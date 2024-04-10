<template>
  <div>
    <HeaderComponent />

    <div class="container">
      <br>
      <h2> LISTADO DE MASCOTAS EN LA GUARDERIA </h2>
      <br>
      <table class="table table-striped table-bordered">
        <thead>
          <tr>
            <th scope="col">Id.</th>
            <th scope="col">NOMBRE MASCOTA</th>
            <th scope="col">TIPO MASCOTA</th>
            <th scope="col">CLIENTE</th>
            <th scope="col">ACCIONES</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="mascota in mascotas" :key="mascota.dk">
            <td>{{ mascota.identifiacion_mascota }}</td>
            <td>{{ mascota.nombre_mascota }}</td>
            <td>{{ mascota.especie_mascota }}</td>
            <td>{{ mascota.cliente_fk.nombres_cliente }}</td>
            <td>
              <router-link :to="{ name: 'EditarMascota', params: { id: mascota.dk } }" class="btn btn-primary">Editar</router-link>
              <button class="btn btn-danger">Eliminar</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <FooterComponent />
  </div>
</template>

<script>
import HeaderComponent from "@/components/HeaderComponent.vue";
import FooterComponent from "@/components/FooterComponent.vue";
import axios from "axios";

export default {
  name: "DashboardView",
  data() {
    return {
      mascotas: [],
    };
  },
  components: {
    HeaderComponent,
    FooterComponent,
  },
  mounted() {
    let url = "http://localhost:8081/api/mascotas";
    axios
      .get(url)
      .then((response) => {
        this.mascotas = response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
</script>

<style scoped></style>
