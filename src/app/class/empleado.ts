import { StringDecoder } from "string_decoder";
import {Empresa} from '../class/empresa';
import {TipoEmpleado} from '../class/tipo-empleado';

export class Empleado {

    id:number;
    codigo:string;
    nombre:string;
	apellido:string;	
    nroIdentificacion:number;	
    email:string;
	fechaIngreso:Date;
    estado:boolean;	
	fechaInactivo:Date;
    empresa:Empresa;
    tipo_empleado:TipoEmpleado ;
	


}
