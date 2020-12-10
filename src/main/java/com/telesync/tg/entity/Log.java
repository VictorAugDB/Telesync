package com.telesync.tg.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import java.util.Date;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
@Table(name = "TLog")
public class Log {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "codregistro")
    private Integer codRegistro;

    @Column(name = "dtalteracao")
    private Date dataAlteracao;

    @Column(name = "codtipoalteracao")
    private int tipoAlteracao;

    @ManyToOne
    @JoinColumn(name = "codvendaplano")
    private VendaPlano vendaPlano;
}
