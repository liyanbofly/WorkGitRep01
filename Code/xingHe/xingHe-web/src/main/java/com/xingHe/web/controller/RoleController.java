package com.xingHe.web.controller;


import com.xingHe.web.service.IRoleService;
import com.xingHe.web.utils.Log;
import com.xingHe.vo.ResultVO;
import com.xingHe.vo.common.LayuiTable;
import com.xingHe.vo.role.AuthTrreVo;
import com.xingHe.vo.role.EditRoleVo;
import com.xingHe.vo.role.SearchRoleVo;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin
@RestController
public class RoleController {
    private static final Logger logger = LoggerFactory.getLogger(RoleController.class);


    @Autowired
    private IRoleService roleService;

    /**
     * 角色列表
     *
     * @param search
     * @return
     */
    @PostMapping("role/queryList")
    public LayuiTable queryListByPage(SearchRoleVo search) {
        Log.error("It is error");
        return roleService.queryListByPage(search);
    }


    /**
     * 获取的甩角色信息
     * @return
     */
    @PostMapping("role/getAllRole")
    public ResultVO getAllRole(@RequestParam(value = "roleName", required = false) String roleName){
        return  roleService.getAllRole(roleName);
    }

    /**
     * 保存角色
     *
     * @param role
     * @return
     */
    @PostMapping("role/saveRoleAuth")
    public ResultVO saveRoleAuth(EditRoleVo role) {
        return roleService.saveRoleAuth(role);
    }

    /**
     * 获取所有 权限列表
     *
     * @return
     */
    @PostMapping("role/getAuthList")
    public List <AuthTrreVo> getAuthList(@RequestParam(value = "authName", required = false) String authName, @RequestParam(value = "dataType", required = false) Integer dataType) {
        return roleService.getAuthList(authName, dataType);
    }

    /**
     * 获取角权限关系 根据角色Id和权限类别
     *
     * @param dataType
     * @param roleId
     * @return
     */
    @PostMapping("role/getListAR")
    public ResultVO getListAR(@RequestParam(value = "dataType", required = true)int dataType, @RequestParam(value = "roleId", required = false) String roleId) {
        return roleService.getListAR(dataType, roleId);
    }

    /**
     * 删除角色
     * @param roleId
     * @return
     */
    @PostMapping("role/deleteRole")
    public ResultVO deleteRole(@RequestParam(value = "roleId", required = true)String roleId){
        return  roleService.deleteRole(roleId);
    }

}
