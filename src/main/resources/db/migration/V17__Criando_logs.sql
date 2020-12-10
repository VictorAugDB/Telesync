-- Adiconando auto increment na tabela log
ALTER TABLE tlog
CHANGE COLUMN codRegistro codRegistro INT NOT NULL AUTO_INCREMENT;

-- Populando ttipo_alteracao
INSERT INTO ttipo_alteracao VALUES (0, 'NOVO PLANO'), (1, 'CANCELAMENTO'), (2, 'ALTERACAO');