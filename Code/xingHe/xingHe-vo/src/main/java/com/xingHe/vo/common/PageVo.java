package com.xingHe.vo.common;

import java.io.Serializable;

/**
 * 分页VO类
 */
public class PageVo  implements Serializable {

    /**
     *第几页
     */
    private Integer page=1;
    /**
     * 每页行数
     */
    private Integer limit=10;
    /**
     * 起始索引
     */
    private Integer offset;

    public Integer getLimit() {
        return limit;
    }

    public void setLimit(Integer limit) {
        this.limit = limit;
    }

    public Integer getPage() {
        return page;
    }

    public void setPage(Integer page) {
        this.page = page;
    }
    public Integer getOffset() {
        return offset;
    }

    public void setOffset(Integer offset) {
        this.offset = offset;
    }

    // 计算起始行索引
    public void   setOffsetV(){
        if(page!=null && limit!=null)
            offset=(page-1)*limit;
    }

}
