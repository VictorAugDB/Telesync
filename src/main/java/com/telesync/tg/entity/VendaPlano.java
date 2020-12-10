package com.telesync.tg.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

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
@Table(name = "TVenda_Plano")
@ToString
public class VendaPlano {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "codvendaplano")
    private Integer codVendaPlano;

    @Column(name = "numerotelefone")
    private String numeroTelefone;

    private String ddd;

    private Long imei;

    @Column(name = "status")
    private boolean active;

    @ManyToOne
    @JoinColumn(name = "codvenda")
    private Venda venda;

    @ManyToOne
    @JoinColumn(name = "codplano")
    private Plano plano;
}
