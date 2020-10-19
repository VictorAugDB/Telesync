package com.telesync.tg.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
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
@Table(name = "TVenda_Plano")
public class VendaPlano {

    @Id
    @Column(name = "codvendaplano")
    private Integer codVendaPlano;

    @Column(name = "numerotelefone")
    private String numeroTelefone;

    private String ddd;

    private int imei;

    @ManyToOne
    @JoinColumn(name = "codVenda")
    private Venda venda;

    @ManyToOne
    @JoinColumn(name = "codPlano")
    private Plano plano;
}
