package com.xingHe.vo.authorities;



import com.xingHe.entity.Authorities;

import java.util.List;

/**
 * 权限菜单树形VO
 */
public class AuthoritiesTreeVo extends Authorities {


    private List<AuthoritiesTreeVo> children;//子节点
    private Boolean last;//是否是最后一级

    public List<AuthoritiesTreeVo> getChildren() {
        return children;
    }

    public void setChildren(List<AuthoritiesTreeVo> children) {
        this.children = children;
    }

    public Boolean getLast() {
        return last;
    }

    public void setLast(Boolean last) {
        this.last = last;
    }
}
