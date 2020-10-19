-- MySQL Workbench Forward Engineering
SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema telesyncDB
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `telesyncDB` DEFAULT CHARACTER SET utf8 ;
USE `telesyncDB` ;

-- -----------------------------------------------------
-- Table `telesyncDB`.`TPermissao`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `telesyncDB`.`TPermissao` (
  `codPermissao` INT NOT NULL,
  `tipoPermissao` VARCHAR(30) NULL,
  PRIMARY KEY (`codPermissao`),
  UNIQUE INDEX `codPermissao_UNIQUE` (`codPermissao` ASC))
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `telesyncDB`.`TLogin`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `telesyncDB`.`TLogin` (
  `codLogin` INT NOT NULL  AUTO_INCREMENT,
  `email` VARCHAR(25) NOT NULL,
  `senha` VARCHAR(10) NULL,
  `codPermissao` INT NOT NULL,
  PRIMARY KEY (`codLogin`),
  INDEX `fk_TLoginFuncionario_TPermissao1_idx` (`codPermissao` ASC),
  CONSTRAINT `fk_TLoginFuncionario_TPermissao1`
    FOREIGN KEY (`codPermissao`)
    REFERENCES `telesyncDB`.`TPermissao` (`codPermissao`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `telesyncDB`.`TCliente`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `telesyncDB`.`TCliente` (
  `codCliente` INT NOT NULL AUTO_INCREMENT,
  `cpfCliente` BIGINT UNSIGNED NOT NULL,
  `nomeCliente` VARCHAR(40) NOT NULL,
  `dtNascCliente` DATE NOT NULL,
  `sexoCliente` CHAR(1) NOT NULL,
  `estadoCivilCliente` VARCHAR(30) NULL,
  `nomeMaeCliente` VARCHAR(40) NULL,
  `ufCliente` CHAR(2) NOT NULL,
  `cidadeCliente` VARCHAR(40) NOT NULL,
  `logradouroCliente` VARCHAR(40) NOT NULL,
  `cepCliente` INT NOT NULL,
  `numeroCliente` INT NOT NULL,
  `complementoCliente` VARCHAR(40) NULL,
  `bairroCliente` VARCHAR(30) NOT NULL,
  `profissaoCliente` VARCHAR(20) NULL,
  `liberacaoCredito` VARCHAR(9) NULL,
  `dtCadastroCliente` DATE NOT NULL,
  `codLogin` INT NOT NULL,
  PRIMARY KEY (`codCliente`),
  UNIQUE INDEX `cpfCliente_UNIQUE` (`cpfCliente` ASC),
  UNIQUE INDEX `fk_TCliente_TLogin1_idx` (`codLogin` ASC),
  CONSTRAINT `fk_TCliente_TLogin1`
    FOREIGN KEY (`codLogin`)
    REFERENCES `telesyncDB`.`TLogin` (`codLogin`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `telesyncDB`.`TTipo_Linha`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `telesyncDB`.`TTipo_Linha` (
  `codTipoLinha` INT NOT NULL,
  `nomeTipoLinha` VARCHAR(15) NOT NULL,
  PRIMARY KEY (`codTipoLinha`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `telesyncDB`.`TMinutos_Telefone`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `telesyncDB`.`TMinutos_Telefone` (
  `codPacMinutos` INT NOT NULL,
  `quantMinutos` INT NOT NULL,
  `valorMinutos` FLOAT NOT NULL,
  `codTipoLinha` INT NOT NULL,
  PRIMARY KEY (`codPacMinutos`),
  INDEX `fk_TMinutosTelefone_tipoLinha1_idx` (`codTipoLinha` ASC),
  CONSTRAINT `fk_TMinutosTelefone_tipoLinha1`
    FOREIGN KEY (`codTipoLinha`)
    REFERENCES `telesyncDB`.`TTipo_Linha` (`codTipoLinha`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `telesyncDB`.`TInternet`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `telesyncDB`.`TInternet` (
  `codPacInternet` INT NOT NULL,
  `quantInternet` INT NOT NULL,
  `valorInternet` FLOAT NOT NULL,
  PRIMARY KEY (`codPacInternet`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `telesyncDB`.`TTipo_Plano`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `telesyncDB`.`TTipo_Plano` (
  `codTipoPlano` INT NOT NULL,
  `nomeTipoPlano` VARCHAR(15) NOT NULL,
  PRIMARY KEY (`codTipoPlano`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `telesyncDB`.`TPlano`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `telesyncDB`.`TPlano` (
  `codPlano` INT AUTO_INCREMENT NOT NULL,
  `nomePlano` VARCHAR(15) NOT NULL,
  `valorPlano` FLOAT NOT NULL,
  `cicloDias` INT NOT NULL,
  `codTipoPlano` INT NOT NULL,
  `codPacInternet` INT NOT NULL,
  `codPacMinutos` INT NOT NULL,
  PRIMARY KEY (`codPlano`),
  INDEX `fk_TPlano_TInternet1_idx` (`codPacInternet` ASC),
  INDEX `fk_TPlano_TTipoPlano1_idx` (`codTipoPlano` ASC),
  INDEX `fk_TPlano_TTelefone1_idx` (`codPacMinutos` ASC),
  CONSTRAINT `fk_TPlano_TInternet1`
    FOREIGN KEY (`codPacInternet`)
    REFERENCES `telesyncDB`.`TInternet` (`codPacInternet`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_TPlano_TTipoPlano1`
    FOREIGN KEY (`codTipoPlano`)
    REFERENCES `telesyncDB`.`TTipo_Plano` (`codTipoPlano`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_TPlano_TTelefone1`
    FOREIGN KEY (`codPacMinutos`)
    REFERENCES `telesyncDB`.`TMinutos_Telefone` (`codPacMinutos`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `telesyncDB`.`TForma_Pagamento`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `telesyncDB`.`TForma_Pagamento` (
  `codPagamento` INT NOT NULL,
  `descricaoFormaPagamento` VARCHAR(30) NOT NULL,
  PRIMARY KEY (`codPagamento`))
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `telesyncDB`.`TStatus_Pagamento`
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS `tstatus_pagamento` (
  `codStatusPag` int(11) NOT NULL,
  `Status` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`codStatusPag`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- -----------------------------------------------------
-- Table `telesyncDB`.`TVenda`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `telesyncDB`.`TVenda` (
  `codVenda` INT AUTO_INCREMENT NOT NULL,
  `quantidadeChips` INT NOT NULL,
  `dtVenda` DATE NOT NULL,
  `dtVencim` DATE NOT NULL,
  `valorTotal` FLOAT NOT NULL,
  `obs` VARCHAR(45) NULL,
  `codPagamento` INT NOT NULL,
  `codCliente` INT NOT NULL,
  `codStatusPag` INT NOT NULL,
  PRIMARY KEY (`codVenda`),
  INDEX `fk_TVenda_TForma_Pagamento1_idx` (`codPagamento` ASC),
  INDEX `fk_TVenda_TCliente1_idx` (`codCliente` ASC),
  INDEX `fk_Cod_Pagamento` (`codStatusPag` ASC),
  CONSTRAINT `fk_TVenda_TForma_Pagamento1`
    FOREIGN KEY (`codPagamento`)
    REFERENCES `telesyncDB`.`TForma_Pagamento` (`codPagamento`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_TVenda_TCliente1`
    FOREIGN KEY (`codCliente`)
    REFERENCES `telesyncDB`.`TCliente` (`codCliente`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
	CONSTRAINT `fk_Status_Pagamento`
    FOREIGN KEY (`codStatusPag`)
    REFERENCES `tstatus_pagamento` (`codStatusPag`))
ENGINE = InnoDB;


-- ----------------------------------------------------
-- Table `telesyncDB`.`TVenda_Plano`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `telesyncDB`.`TVenda_Plano` (
  `codVendaPlano` INT AUTO_INCREMENT NOT NULL,
  `numeroTelefone` VARCHAR(11) NOT NULL UNIQUE,
  `ddd` VARCHAR(2) NOT NULL,
  `imei` INT NOT NULL UNIQUE,
  `codVenda` INT NOT NULL,
  `codPlano` INT NOT NULL,
  PRIMARY KEY (`codVendaPlano`),
  UNIQUE INDEX `codVendaPlano_UNIQUE` (`codVendaPlano` ASC),
  CONSTRAINT `fk_TVenda_Plano_TVenda1`
    FOREIGN KEY (`codVenda`)
    REFERENCES `telesyncDB`.`TVenda` (`codVenda`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
    CONSTRAINT `fk_TPlano_Plano_TVenda1`
    FOREIGN KEY (`codPlano`)
    REFERENCES `telesyncDB`.`TPlano` (`codPlano`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `telesyncDB`.`TTipo_Alteracao`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `telesyncDB`.`TTipo_Alteracao` (
  `codTipoAlteracao` INT NOT NULL,
  `nomeAlteracao` VARCHAR(15) NOT NULL,
  PRIMARY KEY (`codTipoAlteracao`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `telesyncDB`.`TLog`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `telesyncDB`.`TLog` (
  `codRegistro` INT NOT NULL,
  `dtAlteracao` DATE NOT NULL,
  `codTipoAlteracao` INT NOT NULL,
  `codVendaPlano` INT NOT NULL,
  PRIMARY KEY (`codRegistro`),
  INDEX `fk_TLog_TAlteracao1_idx` (`codTipoAlteracao` ASC),
  INDEX `fk_TLog_TVenda_Plano1_idx` (`codVendaPlano` ASC),
  CONSTRAINT `fk_TLog_TAlteracao1`
    FOREIGN KEY (`codTipoAlteracao`)
    REFERENCES `telesyncDB`.`TTipo_Alteracao` (`codTipoAlteracao`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `telesyncDB`.`TCargo`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `telesyncDB`.`TCargo` (
  `codTCargo` INT NOT NULL,
  `tipoCargo` VARCHAR(45) NULL,
  PRIMARY KEY (`codTCargo`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `telesyncDB`.`TFuncionario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `telesyncDB`.`TFuncionario` (
  `codFuncionario` INT NOT NULL,
  `codCargo` INT NOT NULL,
  `cpfTFuncionario` INT NOT NULL,
  `nomeTFuncionario` VARCHAR(40) NOT NULL,
  `dtNascTFuncionario` DATE NOT NULL,
  `sexoTFuncionario` CHAR(1) NOT NULL,
  `codLogin` INT NOT NULL,
  PRIMARY KEY (`codFuncionario`),
  UNIQUE INDEX `cpfVendedor_UNIQUE` (`cpfTFuncionario` ASC),
  INDEX `fk_TFuncionario_TCargo1_idx` (`codCargo` ASC),
  INDEX `fk_TFuncionario_TLogin1_idx` (`codLogin` ASC),
  CONSTRAINT `fk_TFuncionario_TCargo1`
    FOREIGN KEY (`codCargo`)
    REFERENCES `telesyncDB`.`TCargo` (`codTCargo`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_TFuncionario_TLogin1`
    FOREIGN KEY (`codLogin`)
    REFERENCES `telesyncDB`.`TLogin` (`codLogin`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;