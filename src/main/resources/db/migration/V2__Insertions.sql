-- -----------------------------------------------------
-- Inserts
-- -----------------------------------------------------

INSERT INTO `tpermissao` VALUES(0, 'Acesso básico');
INSERT INTO `tpermissao` VALUES(1, 'Acesso a busca de clientes');
INSERT INTO `tpermissao` VALUES(2, 'Acesso a relatórios');

insert into tforma_pagamento values(1, "debito");
insert into tforma_pagamento values(2, "boleto");

insert into ttipo_linha values (1, "privada");
insert into ttipo_linha values (2, "publica");

insert into ttipo_plano values (1, "movel");
insert into ttipo_plano values (2, "fixa");

insert into tinternet values (0, "0", "0");
insert into tinternet values (1, "120", "200");
insert into tinternet values (2, "60", "120");
insert into tinternet values (3, "80", "150");

insert into tminutos_telefone values (0, "0", "0", "1");
insert into tminutos_telefone values (1, "120", "100", "2");
insert into tminutos_telefone values (2, "200", "150", "2");

insert into tplano values(1, "familia", "300", "30", "1", "1", "1");
insert into tplano values(2, "selfie", "120", "30", "1", "2", "0");
insert into tplano values(3, "controle", "150", "30", "1", "3", "0");
insert into tplano values(4, "controle", "150", "30", "2", "0", "2");

insert into tstatus_pagamento values(1, "pago");
insert into tstatus_pagamento values(2, "pendente");
insert into tstatus_pagamento values(3, "suspenso");

INSERT INTO `tlogin` VALUES ('1','noob@noobmail.com','123',0);

INSERT INTO `tcliente` VALUES (1, 123,'noob','2000-02-02','m','Solteiro','mae','sn','são noob','avenida noobiudo',1234,'123','nooblan','nooblandia','desenvolvimento noob', "aprovado", "2019-02-02", "1");

INSERT INTO `telesyncdb`.`tvenda` (`codVenda`, `quantidadeChips`, `dtVenda`, `dtVencim`, `valorTotal`, `codPagamento`, `codCliente`, `codStatusPag`) VALUES ('1', '1', '2020-02-02', '2020-03-02', '300', '1', '1', '1');

INSERT INTO `telesyncdb`.`tvenda_plano` (`codVendaPlano`, `numeroTelefone`, `ddd`, `imei`, `codVenda`, `codPlano`) VALUES ('2', '123123123', '12', '12323112', '1', '1');