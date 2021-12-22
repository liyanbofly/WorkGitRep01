package com.xingHe.entity;

import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.io.Serializable;

/**
 * 角色权限关系表 
 * auth_relation entity.
 * @author EntityTool
 * @createdate 2020-03-15 15:56:14
 */
@Data
@TableName("auth_relation")
public class AuthRelation implements Serializable {
	/***
	 * 
	 * colTypes:int(11)
	 */
	private Integer id;
	/***
	 * 角色id
	 * colTypes:varchar(50)
	 */
	private String roleId;
	/***
	 * 权限Id
	 * colTypes:varchar(50)
	 */
	private String authId;
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


	/**
	 * 1-功能 2-航线 3-部门 4-人员
	 */
    private Integer authCategory;
    private Boolean isAll;
}

