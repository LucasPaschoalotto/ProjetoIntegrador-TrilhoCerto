CREATE DATABASE trilhocerto

CREATE TABLE IF NOT EXISTS voluntarios(
uuid uuid DEFAULT uuid_generate_v4(),
nome varchar(100) NOT NULL,
email varchar(100) NOT NULL,
cpf bigserial NOT NULL,
datahora timestamptz NOT NULL DEFAULT now(),

CONSTRAINT id_voluntario PRIMARY KEY (uuid)
);

CREATE TABLE IF NOT EXISTS doacao (
uuid uuid DEFAULT uuid_generate_v4(),
id_voluntario uuid NOT null,
valor float NOT NULL,
datahora timestamptz NOT NULL DEFAULT now(),

CONSTRAINT pk_doacao PRIMARY KEY (uuid)
);

CREATE INDEX ix_doacao_01 ON doacao USING btree (id_voluntario);
ALTER TABLE doacao ADD CONSTRAINT fk_doacao_01 FOREIGN KEY (id_voluntario) REFERENCES voluntarios (uuid);

CREATE TABLE IF NOT EXISTS bazar (
uuid uuid DEFAULT uuid_generate_v4(),
id_voluntario uuid NOT NULL,
descricao varchar(100) NOT NULL,
datahora timestamptz NOT NULL DEFAULT now(),

CONSTRAINT pk_bazar PRIMARY KEY (uuid)
);

CREATE INDEX ix_bazar_01 ON bazar USING btree (id_voluntario);
ALTER TABLE bazar ADD CONSTRAINT fk_bazar_01 FOREIGN KEY (id_voluntario) REFERENCES voluntarios (uuid);

CREATE TABLE IF NOT EXISTS bazarVendido (
uuid uuid DEFAULT uuid_generate_v4(),
id_voluntario uuid NOT NULL,
descricao varchar(100) NOT NULL,
datahora timestamptz NOT NULL DEFAULT now(),

CONSTRAINT pk_bazarVendido PRIMARY KEY (uuid)
);

CREATE INDEX ix_bazarVendido_01 ON bazarVendido USING btree (id_voluntario);
ALTER TABLE bazarVendido ADD CONSTRAINT fk_bazarVendido_01 FOREIGN KEY (id_voluntario) REFERENCES voluntarios (uuid);

CREATE TABLE IF NOT EXISTS contato(
uuid uuid DEFAULT uuid_generate_v4(),
nome varchar(100) NOT NULL,
email varchar(100) NOT NULL,
telefone bigserial NOT NULL,
mensagem varchar(500) NOT NULL,
tipoContato varchar(100) NOT NULL,
datahora timestamptz NOT NULL DEFAULT now()
);