package com.xingHe.vo.newsInfo;

import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.security.Timestamp;

@Data
public class EditNewsVo implements Serializable {

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
    @NotEmpty(message = "描述不能为空")
    private String descripe;
    /***
     * 显示顺序
     * colTypes:int(11)
     */
    private Integer showSeq;


    /***
     * 1-未删除  0-删除
     * colTypes:bit(1)
     */
    private boolean status;

    /**
     * 操作类型
     * ADD
     * EDIT
     */
    private  String optType;

}
