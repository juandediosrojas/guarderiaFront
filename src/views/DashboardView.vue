<template>
  <div>
    <HeaderComponent/>

    <div class="container">
      <br />
      <h2>LISTADO DE MASCOTAS EN LA GUARDERIA</h2>
      <br />
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
          <tr v-for="registro in registros" :key="registro.dk">
            <td>{{ registro.mascota_fk.identifiacion }}</td>
            <td>{{ registro.mascota_fk.nombre }}</td>
            <td>{{ registro.mascota_fk.especie }}</td>
            <td>{{ registro.mascota_fk.cliente_fk.nombres_cliente }}</td>
            <td>
              <button
                title="Registrar Salida Mascota"
                v-on:click="registraSalida(registro.dk)"
              >
                <font-awesome-icon :icon="['fas', 'circle-xmark']" />
              </button>
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
import Swal from "sweetalert2";

export default {
  name: "DashboardView",
  data() {
    return {
      registros: [],
    };
  },
  components: {
    HeaderComponent,
    FooterComponent,
  },
  methods: {    
    registraSalida(id) {
      Swal.fire({
        title: "¿Estás seguro de registrar la salida de la mascota?",
        text: "No es posible revertir esto!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, registrar salida!",
      }).then((result) => {        
        if (result.isConfirmed) {
          let url = "http://localhost:8081/api/registros/" + id;
          axios
            .delete(url)
            .then((response) => {
              if (response.data.code === 200) {
                Swal.fire({
                  title: "Salida registrada",
                  text: response.data.message,
                  icon: "success",
                }).then(() => {
                  window.location.reload();
                });
              } else {
                Swal.fire({
                  title: "Error",
                  text: response.data.message,
                  icon: "error",
                });
              }
            })
            .catch((error) => {
              console.log(error);
              Swal.fire({
                title: "Error",
                text: "Ha ocurrido un error al registrar la salida de la mascota.",
                icon: "error",
              });
            });
        }
      });
    },
  },
  mounted() {
    let url = "http://localhost:8081/api/registros";
    axios
      .get(url)
      .then((response) => {
        this.registros = response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
</script>

<style scoped></style>
