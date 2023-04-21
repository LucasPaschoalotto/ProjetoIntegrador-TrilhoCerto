import dataBase from "../database/db.js";

class RouteController{
    //Método para criar voluntário
    async createVoluntario(nome, email, cpf, telefone){
        const createVoluntario = `
        INSERT INTO voluntarios (nome, email, cpf, telefone)
        VALUES ($1, $2, $3, $4)
        `;
        
        const createVoluntarioValues = [nome, email, cpf, telefone];
        const {rows} = await dataBase.query(createVoluntario, createVoluntarioValues);
        const [newVoluntario] = rows;
    
        return newVoluntario;
    }

    //Método para criar doação
    async createDoacao(valor, id_voluntario){
        const createDoacao = `
        INSERT INTO doacao (valor, id_voluntario)
        VALUES ($1, $2)
        `;
        
        const createDoacaoValues = [valor, id_voluntario];
        const {rows} = await dataBase.query(createDoacao, createDoacaoValues);
        const [newDoacao] = rows;
    
        return newDoacao;
    }

    //Método para criar despesa
    async createBazar(descricao, id_voluntario){
        const createBazar = `
        INSERT INTO bazar (descricao, id_voluntario)
        VALUES ($1, $2)
        `;
        
        const createBazarValues = [descricao, id_voluntario];
        const {rows} = await dataBase.query(createBazar, createBazarValues);
        const [newBazar] = rows;
    
        return newBazar;
    }

    //Método para criar contato
    async createContato(nome, email, telefone, mensagem, tipoContato){
        const createContato = `
        INSERT INTO contato (nome, email, telefone, mensagem, tipoContato)
        VALUES ($1, $2, $3, $4, $5)
        `;
        
        const createContatoValues = [nome, email, telefone, mensagem, tipoContato];
        const {rows} = await dataBase.query(createContato, createContatoValues);
        const [newContato] = rows;
    
        return newContato;
    }

    //Método para listar todo os voluntários
    async findAllVoluntarios(){
        const findVoluntarios = `
        SELECT uuid, nome, email, cpf, telefone
        FROM voluntarios
        `;

        const {rows} = await dataBase.query(findVoluntarios);
        
        return rows || [];
    }
    
    //Método para listar todo as doações
    async findAllDoacoes(){
        const findDoacoes = `
        SELECT valor, id_voluntario, datahora
        FROM doacao
        `;

        const {rows} = await dataBase.query(findDoacoes);
        
        return rows || [];
    }
    
    //Método para listar todo os itens do bazar
    async findAllBazar(){
        const findBazar = `
        SELECT descricao, id_voluntario, datahora
        FROM bazar
        `;

        const {rows} = await dataBase.query(findBazar);
        
        return rows || [];
    }
}

export default new RouteController();