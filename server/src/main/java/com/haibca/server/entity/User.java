package com.haibca.server.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity(name = "users")
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "userid", columnDefinition = "UNSIGNED INT")
    private Integer userId;

    @Column(name = "useremail")
    private String userEmail;

    @Column(name = "userpwd", columnDefinition = "CHAR(64)")
    private String userPwd;

    @Column(name = "usersalt", columnDefinition = "CHAR(32)")
    private String userSalt;

    @Column(name = "username")
    private String userName;

    @Column(name = "userlevel", columnDefinition = "INT")
    private Integer userLevel;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "usersession", referencedColumnName = "sessionid")
    private Sessions userSession;
}