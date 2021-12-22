package com.xingHe.web.dao;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;

import com.xingHe.entity.Department;
import com.xingHe.vo.department.DepartmentSearchVo;
import com.xingHe.vo.department.DepartmentVo;
import com.xingHe.vo.department.DeptTreeVo;
import com.xingHe.vo.role.AuthTrreVo;
import org.apache.ibatis.annotations.Param;

import java.util.List;


public interface IDepartmentMapper extends BaseMapper<Department> {

    /**
     * 分页查询部门列表
     *
     * @param page
     * @param search
     * @return
     */
    IPage<DepartmentVo> queryListByPage(Page<DepartmentVo> page, @Param("search") DepartmentSearchVo search);

    /**
     * 查询部门下拉
     *
     * @param wrapper
     * @return
     */
    List<DeptTreeVo> selectDeptList(QueryWrapper<Department> wrapper);


    /**
     * 获取部门信息用于权限
     * @param wrapper
     * @return
     */
    List<AuthTrreVo>  getDeptList(QueryWrapper<Department> wrapper);
}

