package com.xingHe.entity;


import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.io.Serializable;
import java.sql.Timestamp;


/**
 * 新闻表 
 * news_info entity.
 * @author EntityTool
 * @createdate 2021-06-03 15:09:46
 */
@TableName("news_info")
@Data
public class NewsInfo implements Serializable {
	/***
	 * 主键 
	 * colTypes:varchar(30)
	 */
	private String id;
	/***
	 * 新闻标题
	 * colTypes:varchar(100)
	 */
	private String title;
	/***
	 * 新闻标题图
	 * colTypes:varchar(200)
	 */
	private String tilteImage;
	/***
	 * 新闻类型
	 * colTypes:int(11)
	 */
	private Integer newsType;
	/***
	 * 新闻内容
	 * colTypes:varchar(8000)
	 */
	private String content;
	/***
	 * 摘要描述
	 * colTypes:varchar(200)
	 */
	private String descripe;
	/***
	 * 显示顺序
	 * colTypes:int(11)
	 */
	private Integer showSeq;
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
	private Timestamp createdTime;
	/***
	 * 
	 * colTypes:varchar(50)
	 */
	private String updatedby;
	/***
	 * 
	 * colTypes:timestamp
	 */
	private Timestamp updatedTime;
	/***
	 * 1-未删除  0-删除
	 * colTypes:bit(1)
	 */
	private boolean status=true;


}

