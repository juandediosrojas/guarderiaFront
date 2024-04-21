<template>
  <div>
    <b-navbar type="dark" variant="dark">
      <div class="container">
        <b-navbar-nav>
          <b-nav-item href="#">
            <font-awesome-icon :icon="['fas', 'paw']" />
          </b-nav-item>
          <div>
            <!-- Navbar dropdowns -->
            <b-nav-item-dropdown text="Clientes" right>
              <b-dropdown-item v-b-modal.crearCliente>Crear</b-dropdown-item>
              <b-dropdown-item v-b-modal.editarCliente>Editar</b-dropdown-item>
              <b-dropdown-item v-b-modal.listartClientes
                >Lista de Clientes</b-dropdown-item
              >
            </b-nav-item-dropdown>
          </div>
          <div>
            <b-nav-item-dropdown text="Mascotas" right>
              <b-dropdown-item href="#">Crear</b-dropdown-item>
              <b-dropdown-item href="#">Editar</b-dropdown-item>
              <b-dropdown-item href="#">Lista de Mascotas</b-dropdown-item>
            </b-nav-item-dropdown>
          </div>

          <b-nav-item @click="abrirModal">Ingresar Mascota</b-nav-item>
          <b-nav-item href="#">Bienvenido, {{ nombreEmpleado }}</b-nav-item>
          <b-nav-item href="#"
            >Salir
            <font-awesome-icon :icon="['fas', 'arrow-right-from-bracket']"
          /></b-nav-item>
        </b-navbar-nav>
      </div>

      <!-- Modal para ingresar mascota -->
      <b-modal
        id="ingresoMascota"
        title="Ingresar mascota a guardería"
        @ok="ingresarMascota"
      >
        <div>
          <b-form-select v-model="opcionSeleccionada" id="selectMascota">
            <template #first>
              <b-form-select-option :value="null" disabled
                >-- Please select an option --</b-form-select-option
              >
            </template>
            <b-form-select-option
              v-for="mascota in listaMascotas"
              :key="mascota.dk"
              :value="mascota.nombre_mascota"
            >
              {{ mascota.nombre_mascota }}
            </b-form-select-option>
          </b-form-select>
        </div>
      </b-modal>

      <!-- Modal para agregar cliente -->
      <b-modal
        id="crearCliente"
        title="CREACIÓN DE CLIENTE"
        @hidden="clearFormFields()"
        hide-footer
      >
        <form @submit.prevent="saveCliente">
          <b-form-group
            label="Identificación"
            label-for="identificacionCliente"
          >
            <b-form-input
              id="identificacionCliente"
              v-model="identificacionCliente"
              type="text"
              pattern="[0-9]*"
              maxlength="11"
              required
            ></b-form-input>
          </b-form-group>
          <b-form-group label="Nombres" label-for="nombresCliente">
            <b-form-input
              id="nombresCliente"
              v-model="nombresCliente"
              type="text"
              pattern="[A-Za-z ]*"
              maxlength="45"
              required
            ></b-form-input>
          </b-form-group>
          <b-form-group label="Apellidos" label-for="apellidosCliente">
            <b-form-input
              id="apellidosCliente"
              v-model="apellidosCliente"
              type="text"
              pattern="[A-Za-z ]*"
              maxlength="45"
              required
            ></b-form-input>
          </b-form-group>
          <b-form-group label="Dirección" label-for="direccionCliente">
            <b-form-input
              id="direccionCliente"
              v-model="direccionCliente"
              type="text"
              maxlength="100"
              required
            ></b-form-input>
          </b-form-group>
          <b-form-group label="Correo Electrónico" label-for="correoCliente">
            <b-form-input
              id="correoCliente"
              v-model="correoCliente"
              type="email"
              required
            ></b-form-input>
          </b-form-group>
          <b-form-group label="Teléfono" label-for="telefonoCliente">
            <b-form-input
              id="telefonoCliente"
              v-model="telefonoCliente"
              type="text"
              pattern="[0-9]*"
              maxlength="10"
              required
            ></b-form-input>
          </b-form-group>
          <br />
          <b-row align-h="center">
            <b-col cols="auto">
              <b-button type="submit" variant="success">
                <i class="fa-solid fa-check"></i> CREAR CLIENTE
              </b-button>
            </b-col>
          </b-row>
        </form>
      </b-modal>

      <!-- Modal para editar cliente -->
      <b-modal
        id="editarCliente"
        title="EDITAR CLIENTE"
        @hidden="clearFormFields()"
        hide-footer
      >
        <form @submit.prevent="consultarCliente">
          <b-form-group
            label="Identificación"
            label-for="identificacionCliente"
          >
            <b-form-input
              id="identificacionCliente"
              v-model="identificacionCliente"
              type="text"
              pattern="[0-9]*"
              maxlength="11"
              :disabled="clienteEncontrado"
            ></b-form-input>
          </b-form-group>
          <b-form-group
            label="Nombres"
            label-for="nombresCliente"
            v-bind:required="clienteEncontrado"
          >
            <b-form-input
              id="nombresCliente"
              v-model="nombresCliente"
              type="text"
              pattern="[A-Za-z ]*"
              maxlength="45"
              :disabled="!clienteEncontrado"
            ></b-form-input>
          </b-form-group>
          <b-form-group
            label="Apellidos"
            label-for="apellidosCliente"
            v-bind:required="clienteEncontrado"
          >
            <b-form-input
              id="apellidosCliente"
              v-model="apellidosCliente"
              type="text"
              pattern="[A-Za-z ]*"
              maxlength="45"
              :disabled="!clienteEncontrado"
            ></b-form-input>
          </b-form-group>
          <b-form-group
            label="Dirección"
            label-for="direccionCliente"
            v-bind:required="clienteEncontrado"
          >
            <b-form-input
              id="direccionCliente"
              v-model="direccionCliente"
              type="text"
              maxlength="100"
              :disabled="!clienteEncontrado"
            ></b-form-input>
          </b-form-group>
          <b-form-group
            label="Correo Electrónico"
            label-for="correoCliente"
            v-bind:required="clienteEncontrado"
          >
            <b-form-input
              id="correoCliente"
              v-model="correoCliente"
              type="email"
              :disabled="!clienteEncontrado"
            ></b-form-input>
          </b-form-group>
          <b-form-group
            label="Teléfono"
            label-for="telefonoCliente"
            v-bind:required="clienteEncontrado"
          >
            <b-form-input
              id="telefonoCliente"
              v-model="telefonoCliente"
              type="text"
              pattern="[0-9]*"
              maxlength="10"
              :disabled="!clienteEncontrado"
            ></b-form-input>
          </b-form-group>
          <br />
          <b-row align-h="center">
            <b-col cols="auto">
              <b-button type="submit" variant="success">
                <i class="fa-solid fa-check"></i> CONSULTAR CLIENTE
              </b-button>
            </b-col>
            <b-col cols="auto">
              <b-button
                :disabled="!clienteEncontrado"
                @click="actualizarCliente()"
                type="submit"
                variant="success"
              >
                <i class="fa-solid fa-check"></i> ACTUALIZAR CLIENTE
              </b-button>
            </b-col>
          </b-row>
        </form>
      </b-modal>

      <!-- modal para listar clientes -->
      <b-modal
        size="lg"
        id="listartClientes"
        title="LISTADO DE CLIENTES"
        @show="listadoClientes()"
        hide-footer
      >
        <table class="table table-striped mt-2 table-bordered">
          <thead>
            <tr>
              <th class="col-md-1">IDENTIFICACION.</th>
              <th class="col-md-4">NOMBRES Y APELLIDOS</th>
              <th class="col-md-2">CORREO</th>
              <th class="col-md-1">CELULAR</th>
              <th class="col"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="cliente in listaClientes" :key="cliente.cliente_dk">
              <td>{{ cliente.identificacion }}</td>
              <td>
                {{ cliente.nombres_cliente }} {{ cliente.apellidos_cliente }}
              </td>
              <td>{{ cliente.correo }}</td>
              <td>{{ cliente.celular }}</td>
              <td>
                <button
                  title="Eliminar Cliente"
                  v-on:click="eliminarCliente(cliente.identificacion)"
                >
                  <font-awesome-icon icon="trash" />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </b-modal>
    </b-navbar>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";
// import Swal from "sweetalert2";

export default {
  name: "HeaderComponent",
  data() {
    return {
      clienteEncontrado: false,
      nombreEmpleado: "",
      opcionSeleccionada: null,
      listaClientes: [],
      listaMascotas: [],
      clienteDk: "",
      identificacionCliente: "",
      nombresCliente: "",
      apellidosCliente: "",
      direccionCliente: "",
      correoCliente: "",
      telefonoCliente: "",
    };
  },
  methods: {
    clearFormFields() {
      this.clienteDk = "";
      this.identificacionCliente = "";
      this.nombresCliente = "";
      this.apellidosCliente = "";
      this.direccionCliente = "";
      this.correoCliente = "";
      this.telefonoCliente = "";
      this.clienteEncontrado = false;
    },
    listadoClientes() {
      let url = "http://localhost:8081/api/clientes";
      axios
        .get(url)
        .then((response) => {
          this.listaClientes = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    actualizarCliente() {
      let url =
        "http://localhost:8081/api/clientes/" + this.identificacionCliente;
      const cliente = {
        nombres_cliente: this.nombresCliente,
        apellidos_cliente: this.apellidosCliente,
        direccion: this.direccionCliente,
        correo: this.correoCliente,
        celular: this.telefonoCliente,
      };
      axios
        .put(url, cliente)
        .then((response) => {
          if (response.status === 200) {
            // Actualización exitosa, muestra una alerta o realiza otra acción
            Swal.fire({
              title: "Actualización de Cliente",
              text: "Cliente actualizado exitosamente",
              icon: "success",
            }).then(() => {
              this.clearFormFields();
              this.$bvModal.hide("editarCliente");
            });
          } else {
            Swal.fire({
              title: "Error",
              text: "Hubo un error al actualizar el cliente",
              icon: "error",
            });
          }
        })
        .catch((error) => {
          // Error al buscar el cliente
          if (error.response.status === 404) {
            // Si el error es debido a que no encontro el cliente
            // Muestra un mensaje de error al usuario
            Swal.fire({
              title: "Error",
              text: error.response.data,
              icon: "error",
            });
          } else {
            // Si el error es de otro tipo, muestra un mensaje de error genérico
            Swal.fire({
              title: "Error",
              text: "Ha ocurrido un error interno en el servidor",
              icon: "error",
            });
          }
        });
    },
    consultarCliente() {
      let url =
        "http://localhost:8081/api/clientes/" + this.identificacionCliente;
      axios
        .get(url)
        .then((response) => {
          if (response.status === 200) {
            if (response.data) {
              this.clienteDk = response.data.cliente_dk;
              this.nombresCliente = response.data.nombres_cliente;
              this.apellidosCliente = response.data.apellidos_cliente;
              this.direccionCliente = response.data.direccion;
              this.correoCliente = response.data.correo;
              this.telefonoCliente = response.data.celular;
              this.clienteEncontrado = true;
            } else {
              Swal.fire({
                title: "Error",
                text: "El cliente no fue encontrado",
                icon: "error",
              });
              // Establecer clienteEncontrado en false
              this.clienteEncontrado = false;
            }
          } else {
            Swal.fire({
              title: "Error",
              text: response.statusText,
              icon: "error",
            });
          }
        })
        .catch((error) => {
          // Error al buscar el cliente
          if (error.response.status === 404) {
            // Si el error es debido a que no encontro el cliente
            // Muestra un mensaje de error al usuario
            Swal.fire({
              title: "Error",
              text: error.response.data,
              icon: "error",
            });
          } else {
            // Si el error es de otro tipo, muestra un mensaje de error genérico
            Swal.fire({
              title: "Error",
              text: "Ha ocurrido un error interno en el servidor",
              icon: "error",
            });
          }
        });
    },
    saveCliente() {
      let url = "http://localhost:8081/api/clientes";
      const cliente = {
        identificacion: this.identificacionCliente,
        nombres_cliente: this.nombresCliente,
        apellidos_cliente: this.apellidosCliente,
        direccion: this.direccionCliente,
        correo: this.correoCliente,
        celular: this.telefonoCliente,
      };
      axios
        .post(url, cliente)
        .then((response) => {
          if (response.status === 200) {
            Swal.fire({
              title: "Creacion de Cliente",
              icon: "success",
            }).then(() => {
              this.clearFormFields();
              this.$bvModal.hide("crearCliente");
            });
          } else {
            Swal.fire({
              title: "Error",
              text: response.statusText,
              icon: "error",
            });
          }
        })
        .catch((error) => {
          // Si se produce un error
          if (error.response.status === 400) {
            // Si el error es debido a la duplicación de un valor único en la base de datos
            // Muestra un mensaje de error al usuario
            Swal.fire({
              title: "Error",
              text: error.response.data,
              icon: "error",
            });
          } else {
            // Si el error es de otro tipo, muestra un mensaje de error genérico
            Swal.fire({
              title: "Error",
              text: "Ha ocurrido un error interno en el servidor",
              icon: "error",
            });
          }
        });
    },
    eliminarCliente(identidicacion) {
      Swal.fire({
        title: "¿Estás seguro de elimar el cliente?",
        text: "No es posible revertir esto!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "SI, ELIMINAR",
        cancelButtonText: "NO, MEJOR NO",
      }).then((result) => {
        if (result.isConfirmed) {
          let url = "http://localhost:8081/api/clientes/" + identidicacion;
          axios
            .delete(url)
            .then((response) => {
              if (response.status === 200) {
                Swal.fire({
                  title: "Cliente eliminado con éxito",
                  text: response.data,
                  icon: "success",
                }).then(() => {
                  this.$bvModal.hide("listartClientes");
                });
              } else {
                Swal.fire({
                  title: "Error",
                  text: response.data,
                  icon: "error",
                });
              }
            })
            .catch((error) => {
              if (error.response.status === 404) {
                Swal.fire({
                  title: "Error eliminando cliente",
                  text: error.response.data,
                  icon: "error",
                });
              } else if(error.response.status === 400){
                Swal.fire({
                  title: "Error eliminando cliente",
                  text: error.response.data,
                  icon: "error",
                });
              } else {
                Swal.fire({
                  title: "Error eliminando cliente",
                  text: "Ha ocurrido un error interno en el servidor",
                  icon: "error",
                });
              }
            });
        }
      });
    },
    abrirModal() {
      let url = "http://localhost:8081/api/mascotas";
      axios.get(url).then((response) => {
        this.listaMascotas = response.data;
      });
      this.$bvModal.show("ingresoMascota");
    },
    ingresarMascota() {
      console.log(this.opcionSeleccionada);
    },
  },
  mounted() {
    this.nombreEmpleado = localStorage.getItem("nombreEmpleado");
  },
};
</script>

<style scoped>
th {
  text-align: center;
}
td {
  text-align: center;
}
</style>
