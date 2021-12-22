package com.xingHe.vo.role;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

public class AuthTrreVo  implements Serializable {
    public AuthTrreVo (){
        checkArr.add(new CheckAtrrVo("0","0"));
    }
    private String parentId;//父节点
    private String id;//当前节点
    private String title;//当前节点名称
    private Integer level;//级别
    private Boolean last;//是否是最后一级
    private List<AuthTrreVo> children = new ArrayList<AuthTrreVo>();//子节点集合

    public List <CheckAtrrVo> getCheckArr() {
        return checkArr;
    }

    public void setCheckArr(List <CheckAtrrVo> checkArr) {
        this.checkArr = checkArr;
    }

    private List<CheckAtrrVo> checkArr=new ArrayList <CheckAtrrVo>();// 节点选中


    public String getParentId() {
        return parentId;
    }

    public void setParentId(String parentId) {
        this.parentId = parentId;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Integer getLevel() {
        return level;
    }

    public void setLevel(Integer level) {
        this.level = level;
    }

    public List<AuthTrreVo> getChildren() {
        return children;
    }

    public void setChildren(List<AuthTrreVo> children) {
        this.children = children;
    }

    public Boolean getLast() {
        return last;
    }

    public void setLast(Boolean last) {
        this.last = last;
    }
}
