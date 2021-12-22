package com.xingHe.web.dao;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;

import com.xingHe.entity.UserRoleRelation;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface IUserRoleRelationMapper extends BaseMapper<UserRoleRelation> {


    /**
     * 批量插入用户拥有的角色
     * @param listUR
     * @return
     */
    int batchInsert(@Param("listUR") List<UserRoleRelation> listUR);
}

