package com.xingHe.web.dao;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;

import com.xingHe.entity.Authorities;
import com.xingHe.vo.ElaneUser;
import com.xingHe.vo.role.AuthTrreVo;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface IAuthoritiesMapper  extends BaseMapper<Authorities> {

    /**
     * 获取当前用户分配的菜单
     *
     * @param currUser
     * @return
     */
    List<Authorities> getAllMenus(ElaneUser currUser);


    /**
     * 获取所有权限信息
     * @param authName
     * @return
     */
    List<AuthTrreVo> getAuthList(@Param("authName") String authName);
}

