package com.telesync.tg.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "TPergunta_Secreta")
@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class PerguntaSecreta {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "codperguntasecreta")
    private int codPerguntaSecreta;

    @Column(name = "perguntasecreta")
    private String perguntaSecreta;
}
