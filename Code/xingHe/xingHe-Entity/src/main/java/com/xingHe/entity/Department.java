package com.xingHe.entity;

import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.io.Serializable;

/**
 * 部门表 
 * department entity.
 * @author EntityTool
 * @createdate 2020-03-15 15:56:14
 */
@Data
@TableName("department")
public class Department implements Serializable {
	/***
	 * 
	 * colTypes:varchar(50)
	 */
	private String id;
	/***
	 * 部门名称
	 * colTypes:varchar(100)
	 */
	private String deptName;
	/***
	 * 上级部门Id
	 * colTypes:varchar(50)
	 */
	private String parentId;
	/***
     * 级别
     * colTypes:tinyint(4)
     */
    private Integer level;
    /***
     * 部门状态 1-启用 2-禁用
     * colTypes:tinyint(4)
     */
    private Integer deptStatus;
	/***
	 * 创建人名称
	 * colTypes:varchar(50)
	 */
	private String creator;
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

}

