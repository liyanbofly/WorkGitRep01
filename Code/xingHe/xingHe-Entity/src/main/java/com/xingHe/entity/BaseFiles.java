package com.xingHe.entity;

import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.io.Serializable;

/**
 * base_files-附件表 
 * base_files entity.
 * @author EntityTool
 * @createdate 2020-03-21 14:22:03
 */
@Data
@TableName("base_files")
public class BaseFiles implements Serializable {
	/***
	 * id
	 * colTypes:varchar(32)
	 */
	private String id;
	/***
	 * 附件名称
	 * colTypes:varchar(200)
	 */
	private String fileName;
	/***
     * 文件类型：0其他，1营业执照，2法人身份证正面，3法人身份证反面
     * colTypes:smallint(4)
	 */
    private Integer type;
	/***
	 * 系统存储附件的地址
	 * colTypes:varchar(500)
	 */
	private String fileUrl;
	/***
	 * 附件的大小，单位为KB，整数
	 * colTypes:int(12)
	 */
	private Integer fileSize;
	/***
	 * 表名称
            
	 * colTypes:varchar(32)
	 */
	private String tableName;
	/***
	 * 表中的记录编号（数据ID）
	 * colTypes:varchar(32)
	 */
	private String recordId;
	/***
	 * 如文件需签章 存放签 章状态  枚举值 1-待签 2-已签
	 * colTypes:tinyint(2)
	 */
	private Integer signStatus;
	/***
	 * 重复签章码 当第一次未成功 生成一随机码 再签 
	 * colTypes:varchar(30)
	 */
	private String repeatFlag;
	/***
	 * 创建人
	 * colTypes:varchar(100)
	 */
	private String creator;
	/***
	 * 创建时间
	 * colTypes:timestamp
	 */
	private java.sql.Timestamp createTime;
	/***
	 * 修改人
	 * colTypes:varchar(100)
	 */
	private String changer;
	/***
	 * 修改时间
	 * colTypes:timestamp
	 */
	private java.sql.Timestamp changTime;
	/***
	 * 设置是否有效（1表示有效，0表示无效），默认为1
	 * colTypes:smallint(2)
	 */
	private Integer effective;
	/***
	 * 是否是缩略图，0否，1是
	 * colTypes:smallint(1)
	 */
	private Integer isThumbnail;

	/**
	 * 甲方签章时间
	 */
	private java.sql.Timestamp signTime1;

	/**
	 *已方签章时间
	 */
	private java.sql.Timestamp signTime2;

}

