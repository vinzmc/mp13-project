package com.haibca.server.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity(name = "sessions")
@Table(name = "sessions")
public class Sessions {
    @Id
    @Column(name = "sessionid",columnDefinition = "CHAR(64)")
    private String sessionid;
}
