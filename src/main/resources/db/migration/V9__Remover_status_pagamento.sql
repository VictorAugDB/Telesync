ALTER TABLE tvenda
DROP FOREIGN KEY `fk_Status_Pagamento`;

ALTER TABLE tvenda
DROP COLUMN codStatusPag;

DROP TABLE tstatus_pagamento;