package com.xingHe.entity;

import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.io.Serializable;

/**
 * 角色表 
 * role entity.
 * @author EntityTool
 * @createdate 2020-03-15 15:56:14
 */
@Data
@TableName("role")
public class Role implements Serializable {
	/***
	 * 
	 * colTypes:varchar(50)
	 */
	private String id;
	/***
	 * 角色名称
	 * colTypes:varchar(50)
	 */
	private String roleName;
	/***
	 * 备注
	 * colTypes:varchar(1000)
	 */
	private String remark;
	/***
	 * 1-内部 2-外部
	 * colTypes:tinyint(4)
	 */
	private Integer roleType;
	/***
	 * 
	 * colTypes:varchar(50)
	 */
	private String createdby;
	/***
	 * 
	 * colTypes:datetime
	 */
	private java.sql.Timestamp createdTime;
	/***
	 * 
	 * colTypes:varchar(50)
	 */
	private String updatedby;
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
	 * 1-全部 2-部门 3-用户
	 */
	private  Integer manageType;


}

