package com.piggy.PIGGY.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.piggy.PIGGY.entity.Post;
import com.piggy.PIGGY.entity.User;


public interface PostRepository extends JpaRepository<Post, Long>{
	
	List<Post> findByUser(User user);

	List<Post> findByUserAndVisited(User user, boolean visited);
}
