<template>
  <div>
    <b-navbar type="secondary" variant="info">
      <b-navbar-nav>
        <b-nav-item href="#">Home</b-nav-item>
        <!-- Navbar dropdowns -->
        <b-nav-item-dropdown text="Clientes" right>
          <b-dropdown-item href="#">Crear</b-dropdown-item>
          <b-dropdown-item href="#">Editar</b-dropdown-item>
          <b-dropdown-item href="#">Eliminar</b-dropdown-item>
          <b-dropdown-item href="#">Lista de Clientes</b-dropdown-item>
        </b-nav-item-dropdown>

        <b-nav-item-dropdown text="Mascotas" right>
          <b-dropdown-item href="#">Crear</b-dropdown-item>
          <b-dropdown-item href="#">Editar</b-dropdown-item>
          <b-dropdown-item href="#">Eliminar</b-dropdown-item>
          <b-dropdown-item href="#">Lista de Mascotas</b-dropdown-item>
        </b-nav-item-dropdown>

        <b-nav-item href="#">Ingresar Mascota</b-nav-item>

      </b-navbar-nav>
    </b-navbar>
  </div>
</template>

<script>
export default {
  name: 'HeaderComponent'
}
</script>

<style scoped>
/* Estilos específicos del componente */
</style>
