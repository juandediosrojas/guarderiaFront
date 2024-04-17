<template>
  <div class="page-container">
    <div class="container">
      <div class="image-container">
        <img src="@/assets/MASCOTA_LOGIN.jpg" alt="Image" />
      </div>
      <div class="form-container">
        <form v-on:submit.prevent="login">
          <h2>Iniciar Sesión</h2>
          <div class="input-container">
            <font-awesome-icon icon="user" />
            <input
              type="text"
              placeholder="Usuario"
              required
              v-model="usuario"
            />
          </div>
          <div class="input-container">
            <font-awesome-icon icon="key" />
            <input
              type="password"
              placeholder="Contraseña"
              required
              v-model="password"
              @input="validatePassword"
            />
          </div>
          <p v-if="passwordError" class="error-message">
            La contraseña debe tener al menos 8 caracteres.
          </p>
          <b-button
            type="submit"
            variant="outline-secondary"
            :disabled="passwordError"
            >Ingresar</b-button
          >
        </form>
        <font-awesome-icon icon="right-to-bracket" />
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from "axios";
import Swal from "sweetalert2";
// import bcrypt from 'bcryptjs';

export default {
  name: "HomeView",
  components: {},
  data() {
    return {
      usuario: "",
      password: "",
      error: false,
      msgError: "",
      passwordError: false,
    };
  },
  methods: {
    validatePassword() {
      if (this.password.length < 8) {
        this.passwordError = true;
      } else {
        this.passwordError = false;
      }
    },
    async login() {
      // const hashedPassword = await bcrypt.hash(this.password, 10);
      let json = {
        usuario: this.usuario,
        password: this.password,
      };
      axios
        .post("http://localhost:8081/api/login", json)
        .then((response) => {
          if (response.data.code === 200) {
            localStorage.setItem("token", response.data.token);
            this.$router.push("dashboard");
            Swal.fire({
              position: "top-end",
              icon: "success",
              showConfirmButton: false,
              timer: 1500,
              width: 400,
              heightAuto: true,
            });
          } else {
            this.error = true;
            this.msgError = response.data.message;
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: this.msgError,
            });
          }
        })
        .catch((error) => {
          console.error("Error de conexiónaa:", error);
          this.error = true;
          this.msgError = "Error de conexión con la API";
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: this.msgError,
          });
        });
    },
  },
};
</script>

<style scoped>
.error-message {
  color: red;
}
.page-container {
  display: flex;
  justify-content: center; /* Centra el contenido horizontalmente */
  align-items: center; /* Centra el contenido verticalmente */
  height: 100vh; /* Ajusta el alto para ocupar el 100% de la pantalla */
}

.container {
  display: flex;
  flex-direction: row;
  align-items: center;
  border: 1px solid #ccc;
  padding: 20px;
  flex-wrap: nowrap;
}

.image-container {
  max-width: 100%; /* Ajustar el tamaño de la imagen */
}

.form-container {
  width: 100%; /* Ajusta el ancho del formulario al 100% */
  margin-top: 20px; /* Espacio entre la imagen y el formulario */
}

form {
  max-width: 300px; /* Limitar el ancho del formulario */
  margin: 0 auto; /* Centrar el formulario */
}

.input-container {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

input {
  padding: 10px;
  margin-left: 10px;
  width: 100%; /* Ajusta el ancho del input */
  box-sizing: border-box; /* Incluye el padding en el ancho */
}

h2 {
  margin-top: 20px;
  margin-bottom: 20px; /* Espacio entre el título y los inputs */
}

/* Media query para dispositivos con un ancho máximo de 768px (tablets y móviles) */
@media (max-width: 768px) {
  .container {
    flex-direction: column; /* Cambia la dirección del contenedor a columna */
  }
  .form-container {
    margin-top: 0; /* Elimina el espacio superior del formulario */
  }
}
</style>
