SET FOREIGN_KEY_CHECKS=0;

CREATE TABLE `tpergunta_secreta` (
	`codPerguntaSecreta` INT NOT NULL,
	`perguntaSecreta` VARCHAR(70) NOT NULL COLLATE 'utf8mb4_0900_ai_ci',
	PRIMARY KEY (`codPerguntaSecreta`) USING BTREE
)
COLLATE='utf8mb4_0900_ai_ci'
ENGINE=MyISAM
;

ALTER TABLE `tcliente`
	ADD COLUMN `codPerguntaSecreta` INT NOT NULL AFTER `dtCadastroCliente`,
	ADD UNIQUE INDEX `codPerguntaSecreta` (`codPerguntaSecreta`),
	ADD CONSTRAINT `FK_TPergunta_Secreta` FOREIGN KEY (`codPerguntaSecreta`) REFERENCES tpergunta_secreta (`codPerguntaSecreta`);

ALTER TABLE `tcliente`
    ADD COLUMN respostaSecreta VARCHAR(70) NOT NULL AFTER `codPerguntaSecreta`;

SET FOREIGN_KEY_CHECKS=1;