DROP SCHEMA if EXISTS bd_telesync;

CREATE SCHEMA bd_telesync;

USE bd_telesync;

CREATE TABLE `tpermissao` (
	`codPermissao` INT NOT NULL,
	`tipoPermissao` VARCHAR(30) NOT NULL DEFAULT '' COLLATE 'utf8mb4_0900_ai_ci',
	PRIMARY KEY (`codPermissao`) USING BTREE
) COLLATE='utf8mb4_0900_ai_ci' ENGINE=InnoDB;

CREATE TABLE `tlogin` (
	`codLogin` VARCHAR(50) NOT NULL,
	`email` VARCHAR(40) NOT NULL COLLATE 'utf8mb4_0900_ai_ci',
	`senha` VARCHAR(50) NOT NULL COLLATE 'utf8mb4_0900_ai_ci',
	`codPermissao` INT NOT NULL,
	PRIMARY KEY (`codLogin`) USING BTREE,
	CONSTRAINT `FK_COD_PERMISSAO` FOREIGN KEY (`codPermissao`) REFERENCES `tpermissao` (`codPermissao`)
) COLLATE='utf8mb4_0900_ai_ci' ENGINE=InnoDB;

CREATE TABLE `tcliente` (
  `codCliente` INT NOT NULL,
  `CPF` VARCHAR(11) NOT NULL,
  `nome` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `dtNasc` DATE NOT NULL,
  `sexo` varchar(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `estadoCivil` varchar(9) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `nomeMae` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `uf` varchar(2) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `cidade` varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `logradouro` varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `cep` varchar(8) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `numero` int(11) NOT NULL,
  `complemento` varchar(80) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `bairro` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `profissao` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `liberacaoCredito` varchar(8) NOT NULL,
  `dtCadastroCliente` varchar(50) NOT NULL,
  `codLogin` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`codCliente`) USING BTREE,
  UNIQUE KEY `codLogin_UNIQUE` (`codLogin`),
  CONSTRAINT `fk_cod_login` FOREIGN KEY (`codLogin`) REFERENCES `tlogin` (`codLogin`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `ttipolinha` (
  `codTipoLinha` int(11) NOT NULL,
  `nomeTipoLinha` varchar(45) NOT NULL,
  PRIMARY KEY (`codTipoLinha`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `tminutostelefone` (
  `codPacMinutos` int(11) NOT NULL,
  `qtddeMinutos` int(11) DEFAULT NULL,
  `valorMinutos` decimal(6,2) DEFAULT NULL,
  `codTipoLinha` int(11) DEFAULT NULL,
  PRIMARY KEY (`codPacMinutos`),
  KEY `fk_cod_tipo_linha_idx` (`codTipoLinha`),
  CONSTRAINT `fk_tipo_linha` FOREIGN KEY (`codTipoLinha`) REFERENCES `ttipolinha` (`codTipoLinha`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `tinternet` (
  `codPacInternet` int(11) NOT NULL,
  `qtddeInternet` int(11) NOT NULL,
  `valortInternet` decimal(6,2) NOT NULL,
  PRIMARY KEY (`codPacInternet`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `ttipoplano` (
  `codTipoPlano` int(11) NOT NULL,
  `nomeTipoPlano` varchar(45) NOT NULL,
  PRIMARY KEY (`codTipoPlano`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `tplano` (
  `codPlano` int(11) NOT NULL,
  `nomePlano` varchar(45) NOT NULL,
  `valor` varchar(45) NOT NULL,
  `cicloDias` varchar(45) NOT NULL,
  `codTipoPlano` int(11) NOT NULL,
  `codPacInternet` int(11) NOT NULL,
  `codPacMinutos` int(11) NOT NULL,
  PRIMARY KEY (`codPlano`),
  KEY `fk_tipo_plano_idx` (`codTipoPlano`),
  KEY `fk_pac_internet_idx` (`codPacInternet`),
  KEY `fk_pac_minutos_idx` (`codPacMinutos`),
  CONSTRAINT `fk_pac_internet` FOREIGN KEY (`codPacInternet`) REFERENCES `tinternet` (`codPacInternet`),
  CONSTRAINT `fk_pac_minutos` FOREIGN KEY (`codPacMinutos`) REFERENCES `tminutostelefone` (`codPacMinutos`),
  CONSTRAINT `fk_tipo_plano` FOREIGN KEY (`codTipoPlano`) REFERENCES `ttipoplano` (`codTipoPlano`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


CREATE TABLE `tformapagamento` (
  `codFormaPag` int(11) NOT NULL,
  `formaPagamento` varchar(45) NOT NULL,
  PRIMARY KEY (`codFormaPag`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `tstatuspag` (
  `codStatusPag` int(11) NOT NULL,
  `Status` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`codStatusPag`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `tvenda` (
  `codVenda` int(11) NOT NULL,
  `codCliente` int(11) NOT NULL,
  `codFormaPag` int(11) NOT NULL,
  `qtddPlanos` varchar(45) NOT NULL,
  `dtVenda` varchar(45) NOT NULL,
  `dtVencimento` varchar(45) NOT NULL,
  `valorTotal` varchar(45) NOT NULL,
  `obs` varchar(45) DEFAULT NULL,
  `codStatusPag` int(11) NOT NULL,
  PRIMARY KEY (`codVenda`),
  KEY `cpfCliente_idx` (`codCliente`),
  KEY `codFormaPag_idx` (`codFormaPag`),
  KEY `codStatusPag_idx` (`codStatusPag`),
  CONSTRAINT `codVendaPlano` FOREIGN KEY (`codStatusPag`) REFERENCES `tstatuspag` (`codStatusPag`),
  CONSTRAINT `codCliente` FOREIGN KEY (`codCliente`) REFERENCES `tcliente` (`codCliente`),
  CONSTRAINT `tvenda_ibfk_1` FOREIGN KEY (`codFormaPag`) REFERENCES `tformapagamento` (`codFormaPag`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `ttipoalteracao` (
  `codTipoAlteracao` int(11) NOT NULL,
  `nomeTipoAlteracao` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`codTipoAlteracao`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `tvendaplano` (
  `codVendaPlano` int(11) NOT NULL,
  `codVenda` int(11) NOT NULL,
  `codPlano` int(11) NOT NULL,
  `ddd` varchar(45) NOT NULL,
  `numero` varchar(45) NOT NULL,
  `numChip` varchar(45) NOT NULL,
  PRIMARY KEY (`codVendaPlano`),
  KEY `codVenda_idx` (`codVenda`),
  KEY `codPlano_idx` (`codPlano`),
  CONSTRAINT `FK_COD_VENDA` FOREIGN KEY (`codVenda`) REFERENCES `tvenda` (`codVenda`),
  CONSTRAINT `FK_COD_PLANO` FOREIGN KEY (`codPlano`) REFERENCES `tplano` (`codPlano`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `tlog` (
  `codRegisto` int(11) NOT NULL,
  `dtAlteracao` varchar(45) NOT NULL,
  `codTipoAlteracao` int(11) NOT NULL,
  `codVendaPlano` int(11) NOT NULL,
  PRIMARY KEY (`codRegisto`),
  KEY `fk_tipo_alteracao_idx` (`codTipoAlteracao`),
  KEY `fk_venda_plano_log_idx` (`codVendaPlano`),
  CONSTRAINT `fk_tipo_alteracao` FOREIGN KEY (`codTipoAlteracao`) REFERENCES `ttipoalteracao` (`codTipoAlteracao`),
  CONSTRAINT `fk_venda_plano` FOREIGN KEY (`codVendaPlano`) REFERENCES `tvendaplano` (`codVendaPlano`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `tpermissao` VALUES(0, 'Acesso básico');
INSERT INTO `tpermissao` VALUES(1, 'Acesso a busca de clientes');
INSERT INTO `tpermissao` VALUES(2, 'Acesso a relatórios');

insert into tformapagamento values(1, "debito");
insert into tformapagamento values(2, "boleto");

insert into ttipolinha values (1, "privada");
insert into ttipolinha values (2, "publica");

insert into ttipoplano values (1, "movel");
insert into ttipoplano values (2, "fixa");

insert into tinternet values (0, "0", "0");
insert into tinternet values (1, "120", "200");
insert into tinternet values (2, "60", "120");
insert into tinternet values (3, "80", "150");

insert into tminutostelefone values (0, "0", "0", "1");
insert into tminutostelefone values (1, "120", "100", "2");
insert into tminutostelefone values (2, "200", "150", "2");

insert into tplano values(1, "familia", "300", "30", "1", "1", "1");
insert into tplano values(2, "selfie", "120", "30", "1", "2", "0");
insert into tplano values(3, "controle", "150", "30", "1", "3", "0");
insert into tplano values(4, "controle", "150", "30", "2", "0", "2");

select * from ttipolinha;

insert into tstatuspag values(1, "pago");
insert into tstatuspag values(2, "pendente");
insert into tstatuspag values(3, "suspenso");

INSERT INTO `tlogin` VALUES ('1','noob@noobmail.com','123',0);

INSERT INTO `tcliente` VALUES (1, 123,'noob','2000-02-02','m','Solteiro','mae','sn','são noob','avenida noobiudo',1234,'123','nooblan','nooblandia','desenvolvimento noob', "aprovado", "2019-02-02", "1");