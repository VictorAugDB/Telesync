-- -----------------------------------------------------
-- Inserts
-- -----------------------------------------------------

INSERT INTO `tpermissao` VALUES(0, 'Acesso básico');
INSERT INTO `tpermissao` VALUES(1, 'Acesso a busca de clientes');
INSERT INTO `tpermissao` VALUES(2, 'Acesso a relatórios');

insert into tforma_pagamento values(0, "debito");
insert into tforma_pagamento values(1, "boleto");

insert into ttipo_linha values (0, "privada");
insert into ttipo_linha values (1, "publica");

insert into ttipo_plano values (0, "movel");
insert into ttipo_plano values (1, "fixa");

insert into tinternet values (0, "0", "0");
insert into tinternet values (1, "1", "30");
insert into tinternet values (2, "5", "100");
insert into tinternet values (3, "10", "180");
insert into tinternet values (4, "20", "270");

insert into tminutos_telefone values (0, "0", "0", "0");
insert into tminutos_telefone values (1, "60", "60", "1");
insert into tminutos_telefone values (2, "120", "90", "1");
insert into tminutos_telefone values (3, "500", "150", "1");

insert into tplano (`nomePlano`, `valorPlano`, `cicloDias`, `codTipoPlano`, `codPacInternet`, `codPacMinutos`) values("Pré-pago 60 minutos", "60", "30", "0", "0", "1");
insert into tplano (`nomePlano`, `valorPlano`, `cicloDias`, `codTipoPlano`, `codPacInternet`, `codPacMinutos`) values("Pré-pago 120 minutos", "90", "30", "0", "0", "2");
insert into tplano (`nomePlano`, `valorPlano`, `cicloDias`, `codTipoPlano`, `codPacInternet`, `codPacMinutos`) values("Pós-pago 60 minutos", "70", "30", "0", "0", "1");
insert into tplano (`nomePlano`, `valorPlano`, `cicloDias`, `codTipoPlano`, `codPacInternet`, `codPacMinutos`) values("Pós-pago 120 minutos", "100", "30", "0", "0", "2");
insert into tplano (`nomePlano`, `valorPlano`, `cicloDias`, `codTipoPlano`, `codPacInternet`, `codPacMinutos`) values("Controle 60 minutos", "70", "30", "0", "0", "1");
insert into tplano (`nomePlano`, `valorPlano`, `cicloDias`, `codTipoPlano`, `codPacInternet`, `codPacMinutos`) values("Internet 5 gb ", "100", "30", "0", "2", "0");
insert into tplano (`nomePlano`, `valorPlano`, `cicloDias`, `codTipoPlano`, `codPacInternet`, `codPacMinutos`) values("Internet 10 gb ", "180", "30", "0", "3", "0");
insert into tplano (`nomePlano`, `valorPlano`, `cicloDias`, `codTipoPlano`, `codPacInternet`, `codPacMinutos`) values("Internet 20 gb ", "270", "30", "0", "4", "0");
insert into tplano (`nomePlano`, `valorPlano`, `cicloDias`, `codTipoPlano`, `codPacInternet`, `codPacMinutos`) values("Telefonia fixa ", "150", "30", "1", "0", "3");

insert into tstatus_pagamento values(0, "pago");
insert into tstatus_pagamento values(1, "pendente");
insert into tstatus_pagamento values(2, "suspenso");

INSERT INTO `tlogin` VALUES ('1','carlos_almeida@gmail.com','123',0);

INSERT INTO `tcliente` VALUES (1, 80815629826,'Carlos','2000-02-02','m','Solteiro','Maria Aparecida','SP','Jundiaí','rua eloy chaves',13218040,'1201','Casa','Ponte de São João','Psiquiatra', "aprovado", "2019-02-02", "1");

INSERT INTO `telesyncdb`.`tvenda` (`quantidadeChips`, `dtVenda`, `dtVencim`, `valorTotal`, `codPagamento`, `codCliente`, `codStatusPag`) VALUES ('1', '2020-02-02', '2020-03-02', '60', '0', '1', '0');

INSERT INTO `telesyncdb`.`tvenda_plano` (`numeroTelefone`, `ddd`, `imei`, `codVenda`, `codPlano`) VALUES ('15993239663', '13', '398654871298562', '1', '1');