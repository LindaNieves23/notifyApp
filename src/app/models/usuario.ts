export interface Usuario {
    uid: string;
    email: string;
    pass?: string;
    nombre?: string;
    apellido?: string;
    telefono?: string;
    contactos?: Usuario[];
    notificacion?: any[];
    url_photo?: string;
}
