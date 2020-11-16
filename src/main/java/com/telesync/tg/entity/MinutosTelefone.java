package com.telesync.tg.entity;

import com.telesync.tg.type.LinhaType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "TMinutos_Telefone")
public class MinutosTelefone {

    @Id
    @Column(name = "codpacminutos")
    private Integer codPacMinutos;

    @Column(name = "quantminutos")
    private int quantMinutos;

    @Column(name = "valorminutos")
    private float valorMinutos;

    @Column(name = "codtipolinha")
    private LinhaType tipoLinha;
}
