package com.piggy.PIGGY.entity;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@ToString
@Getter
@Entity
public class User {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long uId;
	
	@Column
	private String nickname;
	
	@Column
	private String email;
	
	@Column
	private String password;
	
	@Column
	private Integer ranking;
	
	@Column
	private String image;
	
	@OneToMany(mappedBy = "user", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	private List<Post> feeds = new ArrayList<>();

	@Builder
	private User(String nickname, String email, Integer ranking, String image) {
		this.nickname = nickname;
		this.email = email;
		this.ranking = ranking;
		this.image = image;
	}
	
}
