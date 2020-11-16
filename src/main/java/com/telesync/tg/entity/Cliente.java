package com.telesync.tg.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.telesync.tg.converter.LiberacaoCreditoConverter;
import com.telesync.tg.type.LiberacaoCreditoType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Convert;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import java.util.Date;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
@ToString
@JsonIgnoreProperties(ignoreUnknown = true)
@Table(name = "TCliente")
public class Cliente {

    private final static String DATE_FORMAT = "yyyy-MM-dd";

    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column(name = "codcliente")
    private Integer codCliente;

    @Column(name = "cpfcliente")
    private Long cpfCliente;

    @Column(name = "nomecliente")
    private String nomeCliente;

    @Column(name = "dtnasccliente")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = DATE_FORMAT)
    private Date dtNascCliente;

    @Column(name = "sexocliente")
    private char sexoCliente;

    @Column(name = "estadocivilcliente")
    private String estadoCivilCliente;

    @Column(name = "nomemaecliente")
    private String nomeMaeCliente;

    @Column(name = "ufcliente")
    private String ufCliente;

    @Column(name = "cidadecliente")
    private String cidadeCliente;

    @Column(name = "logradourocliente")
    private String logradouroCliente;

    @Column(name = "cepcliente")
    private int cepCliente;

    @Column(name = "numerocliente")
    private int numeroCliente;

    @Column(name = "complementocliente")
    private String complementoCliente;

    @Column(name = "bairrocliente")
    private String bairroCliente;

    @Column(name = "profissaocliente")
    private String profissaoCliente;

    @Column(name = "liberacaocredito")
    @Convert(converter = LiberacaoCreditoConverter.class)
    private LiberacaoCreditoType liberacaoCredito;

    @Column(name = "dtcadastrocliente")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = DATE_FORMAT)
    private Date dtCadastroCliente;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "codlogin")
    private Login login;
}
