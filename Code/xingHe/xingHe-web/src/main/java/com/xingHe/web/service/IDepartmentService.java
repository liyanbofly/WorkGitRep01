package com.xingHe.web.service;

import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.xingHe.entity.Department;
import com.xingHe.vo.ElaneUser;
import com.xingHe.vo.department.DepartmentSearchVo;
import com.xingHe.vo.department.DepartmentVo;
import com.xingHe.vo.department.DeptTreeVo;


import java.util.List;

public interface IDepartmentService {

    /**
     * 分页查询部门列表
     *
     * @param page
     * @param map
     * @return
     */
    IPage<DepartmentVo> getAllByPage(Page<DepartmentVo> page, DepartmentSearchVo map);

    /**
     * 查询部门树形下拉
     *
     * @param search
     * @return
     */
    List<DeptTreeVo> getAllDepartment(DepartmentSearchVo search);

    /**
     * 查询部门下拉-select
     *
     * @param search
     * @return
     */
    List<DeptTreeVo> getAllDepartmentSelect(DepartmentSearchVo search);

    /**
     * 新增部门
     *
     * @param dvo
     * @param currentUser
     * @return
     */
    int add(DepartmentVo dvo, ElaneUser currentUser);

    /**
     * 编辑部门
     *
     * @param dvo
     * @param currentUser
     * @return
     */
    int edit(DepartmentVo dvo, ElaneUser currentUser);

    /**
     * 查询部门信息
     *
     * @param deptId
     * @return
     */
    Department get(String deptId);

    /**
     * 更新部门状态
     *
     * @param dvo
     * @param currUser
     * @return
     */
    int updateStatus(DepartmentVo dvo, ElaneUser currUser);
}
