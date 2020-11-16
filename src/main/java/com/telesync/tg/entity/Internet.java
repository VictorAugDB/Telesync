package com.telesync.tg.entity;

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
@Table(name = "TInternet")
public class Internet {

    @Id
    @Column(name = "codpacinternet")
    private Integer codPacInternet;

    @Column(name = "quantinternet")
    private int quantInternet;

    @Column(name = "valorinternet")
    private float valorInternet;
}
