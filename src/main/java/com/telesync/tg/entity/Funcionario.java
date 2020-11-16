package com.telesync.tg.entity;

import com.telesync.tg.type.CargoType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import java.util.Date;

@Entity
@Table(name = "TFuncionario")
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
@ToString
public class Funcionario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "codfuncionario")
    private Integer codFuncionario;

    @Column(name = "codcargo")
    private CargoType cargoType;

    @Column(name = "cpftfuncionario")
    private Long cpfFuncionario;

    @Column(name = "nometfuncionario")
    private String nomeFuncionario;

    @Column(name = "dtnasctfuncionario")
    private Date dtNascFuncionario;

    @Column(name = "sexotfuncionario")
    private char sexoFuncionario;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "codlogin")
    private Login login;
}
