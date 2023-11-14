import { CidadeDTO } from "./cidade.dto";

export class EmpresaDTO {
    idEmpresa!: number;
    nomeEmpresa!: string;
    enderecoEmpresa!: string;
    cnpjEmpresa!: string;
    cidade!: CidadeDTO;
}