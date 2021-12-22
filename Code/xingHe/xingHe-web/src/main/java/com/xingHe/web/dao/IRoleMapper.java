package com.xingHe.web.dao;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;

import com.xingHe.entity.Role;
import com.xingHe.vo.role.SearchRoleVo;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface IRoleMapper  extends BaseMapper<Role> {

    /**
     * 根据用户Id获取所拥有角色
     * @param userId
     * @return
     */
   List<Role> getRoleByUserId(@Param("userId") String userId);

    /**
     * 分页查询角色列表
     *
     * @param page
     * @param search
     * @return
     */

    IPage<Role> queryListByPage(Page<Role> page, @Param("search") SearchRoleVo search);
}

