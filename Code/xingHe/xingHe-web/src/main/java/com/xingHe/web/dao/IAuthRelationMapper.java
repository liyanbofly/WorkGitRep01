package com.xingHe.web.dao;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;

import com.xingHe.entity.AuthRelation;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface IAuthRelationMapper extends BaseMapper<AuthRelation> {

    /**
     * 批量插入角色权限关系
     * @param listAR
     * @return
     */
    int batchInsert(@Param("listAR") List<AuthRelation> listAR);
}

