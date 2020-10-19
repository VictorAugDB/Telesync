package com.telesync.tg.model;

import com.telesync.tg.type.PlanoType;
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

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "TPlano")
public class Plano {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "codplano")
    private Integer codPlano;

    @Column(name = "nomeplano")
    private String nomePlano;

    @Column(name = "valorplano")
    private float valorPlano;

    @Column(name = "ciclodias")
    private int cicloDias;

    @ManyToOne
    @JoinColumn(name = "codpacinternet")
    private Internet internet;

    @ManyToOne
    @JoinColumn(name = "codpacminutos")
    private MinutosTelefone minutosTelefone;

    @Column(name = "codtipoplano")
    private PlanoType tipoPlano;
}
