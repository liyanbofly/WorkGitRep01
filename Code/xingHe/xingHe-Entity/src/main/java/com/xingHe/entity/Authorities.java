package com.xingHe.entity;

import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.io.Serializable;

/**
 * 和角色建产关系使用 
 * authorities entity.
 * @author EntityTool
 * @createdate 2020-03-15 15:56:14
 */
@Data
@TableName("authorities")
public class Authorities implements Serializable {
	/***
	 * 
	 * colTypes:varchar(50)
	 */
	private String id;
	/***
	 *  存放菜单或按钮名称
	 * colTypes:varchar(100)
	 */
	private String authName;
	/***
	 * UserPage, UserPage_Add, 可通过UserPage 获取对应按钮权限
	 * colTypes:varchar(200)
	 */
	private String authCode;
	/***
	 * 1-菜单 2-按钮
	 * colTypes:tinyint(4)
	 */
	private Integer authType;
	/***
	 *  
	 * colTypes:varchar(50)
	 */
	private String parentId;
	/***
	 * 菜单顺序
	 * colTypes:int(11)
	 */
	private Integer sort;
	/***
	 * 页面地址
	 * colTypes:varchar(200)
	 */
	private String pageUrl;
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

	private String iconWhite;

	private String iconGrey;

	/**
	 * 当权限是按钮时存放页面按钮Id
	 */
	private  String buttonId;


}

