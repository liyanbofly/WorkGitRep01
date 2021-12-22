package com.xingHe.entity;

//import com.baomidou.mybatisplus.annotation.FieldStrategy;
//import com.baomidou.mybatisplus.annotation.TableField;
//import com.baomidou.mybatisplus.annotation.TableName;

import lombok.Data;

import java.io.Serializable;
import java.math.BigDecimal;

/**
 *  
 * user_info entity.
 * @author EntityTool
 * @createdate 2020-03-15 15:56:14
 */
@Data
//@TableName("user_info")
public class UserInfo implements Serializable {
	/***
	 * 
	 * colTypes:varchar(50)
	 */
	private String id;
	/***
	 * 登录名
	 * colTypes:varchar(50)
	 */
	private String loginId;
	/***
	 * 密码
	 * colTypes:varchar(300)
	 */
	private String password;
	/***
	 * 用户名称
	 * colTypes:varchar(50)
	 */
	private String userName;
	/***
	 * 所属公司
	 * colTypes:varchar(50)
	 */
//	@TableField(updateStrategy = FieldStrategy.IGNORED)
	private String custId;
	/***
	 * 手机号
	 * colTypes:varchar(50)
	 */
	private String mobile;
	/***
	 * 邮箱
	 * colTypes:varchar(50)
	 */
	private String email;
	/***
	 * QQ
	 * colTypes:varchar(50)
	 */
	private String qq;
	/***
	 * 所属部门
	 * colTypes:varchar(50)
	 */
	private String departId;
	/***
	 * 1-客户端用户 2-管理端用户
	 * colTypes:tinyint(4)
	 */
	private Integer userType;
	/***
	 * 1-启用 2-停用
	 * colTypes:tinyint(4)
	 */
	private Integer userStatus;
	/***
	 * 
	 * colTypes:varchar(200)
	 */
    private String shipxyOpenid;
	/***
	 * 
	 * colTypes:varchar(50)
	 */
	private String createdby;
	/***
	 * 
	 * colTypes:datetime
	 */
	private String createdTime;
	/***
	 * 
	 * colTypes:varchar(50)
	 */
	private String updatedby;
	/***
	 * 
	 * colTypes:datetime
	 */
	private String updatedTime;
	/***
	 * 1-未删除  0-删除
	 * colTypes:bit(1)
	 */
	private Boolean status;
	/***
	 * 客户用户角色 1-管理员 2-业务员 3-财务 4-运营 9-游客
	 * colTypes:tinyint(4)
	 */
	private Integer custUserRole;
	/***
	 *  创建人名称
	 * colTypes:varchar(50)
	 */
	private String creator;
	/***
	 * 中运职务
	 * colTypes:varchar(100)
	 */
	private Integer duty;
	/***
	 * 个人积分（鲸币）
	 * colTypes:decimal(10,0)
	 */
	private BigDecimal integral;

	private Boolean firstLogin;

	private String backgroundUser;
	//注册渠道:1-pc;2-小程序
	private String regChannel;
	//用户来源:1-其它；2-船讯网
	private String userSource;
	//备注
	private String remark;
}

