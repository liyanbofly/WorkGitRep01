package com.xingHe.entity;

import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.io.Serializable;

/**
 * 用户角色系表 
 * user_role_relation entity.
 * @author EntityTool
 * @createdate 2020-03-15 15:56:14
 */
@Data
@TableName("user_role_relation")
public class UserRoleRelation implements Serializable {
	/***
	 * 
	 * colTypes:int(11)
	 */
	private Integer id;
	/***
	 * 用户Id
	 * colTypes:varchar(50)
	 */
	private String userId;
	/***
	 * 角色id
	 * colTypes:varchar(50)
	 */
	private String roleId;
	/***
	 * 
	 * colTypes:datetime
	 */
	private java.sql.Timestamp createdTime;
	/***
	 * 
	 * colTypes:datetime
	 */
	private java.sql.Timestamp updatedTime;
	/***
	 * 1-未删除  0-删除
	 * colTypes:bit(1)
	 */
	private Boolean status;

}

