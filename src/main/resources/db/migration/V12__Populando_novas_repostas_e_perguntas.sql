UPDATE tcliente
SET respostaSecreta = '$2a$10$7kVDThSz35YUb5PlpBCsLOvt.xLbjQKeTwgJhhjyOvXvXHBF/elvW'
where codCliente = 1;


insert into tpergunta_secreta
values(0, 'Qual o nome do seu primeiro animal de estimação?');

insert into tpergunta_secreta
values(1, 'Qual o nome da primeira escola em que estudou?');

insert into tpergunta_secreta
values(2, 'Qual a cidade de nascimento de sua mãe?');