package com.xingHe.vo.department;

import com.xingHe.entity.Department;
import lombok.Data;

import java.io.Serializable;

/**
 * 部门VO类
 */
@Data
public class DepartmentVo extends Department implements Serializable {

    private String parentName;//父级部门名称

    private String optType;//操作类型  ADD:添加，EDIT:编辑

}
