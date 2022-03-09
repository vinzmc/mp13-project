package com.haibca.server.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity(name="users")
@Table(name="users")
public class User {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    @Column(name = "userid",columnDefinition = "UNSIGNED INT")
    private Integer userId;

    @Column(name = "useremail")
    private String userEmail;

    @Column(name="userpwd",columnDefinition="char(64)")
    private String userPwd;

    @Column(name="usersalt",columnDefinition="char(32)")
    private String userSalt;

    @Column(name = "username")
    private String userName;

    @Column(name = "userlevel")
    private Integer userLevel;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "datecreated")
    private Date dateCreated;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "lastaccess")
    private Date lastAccess;
}