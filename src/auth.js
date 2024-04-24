
export function isAuthenticated() {
    const token = localStorage.getItem('token');
    // Aquí puedes agregar la lógica para verificar si el token es válido
    return !!token; // Retorna true si el token existe, de lo contrario false
  }
  
  export const authGuard = (to, from, next) => {
    if (isAuthenticated()) {
      // Si el usuario está autenticado, permite el acceso a la ruta solicitada
      next();
    } else {
      // Si el usuario no está autenticado, redirige a la página de inicio de sesión
      next('/');
    }
  };
  