export interface IMisservicios {
    id: string;
    IdUsuario: string;
    IdCategoria?: number;
    IdSubcategoria?: number;
    IdTipoInsumo?: number;
    IdTipoTela?: number;
    IdTipoMaquinaria?: number;
    IdProducto?: string;
    Descripcion: string;
    cantidad?: number;
    pago?: number;
    Horario?: string;
    Domicilio?: string;

}

