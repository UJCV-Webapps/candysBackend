export const getNavbarFromRole = ( role: string ) => {
    switch( role.toLowerCase() ) {
        case 'cliente':
            return [ { path: 'cart', name: 'Carrito' }, { path: 'account', name: 'Cuenta' }, { path: 'auth/logout', name: 'Cerrar Sesión' } ];
        case 'administrador':
            return [ { path: 'cart', name: 'Carrito' }, { path: 'dashboard', name: 'Dashboard' }, { path: 'account', name: 'Cuenta' }, { path: 'auth/logout', name: 'Cerrar Sesión' } ];
    }
}