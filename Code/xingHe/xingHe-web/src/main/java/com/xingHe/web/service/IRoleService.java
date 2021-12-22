package com.xingHe.web.service;


import com.xingHe.vo.ResultVO;
import com.xingHe.vo.common.LayuiTable;
import com.xingHe.vo.role.AuthTrreVo;
import com.xingHe.vo.role.EditRoleVo;
import com.xingHe.vo.role.SearchRoleVo;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface IRoleService {

    /**
     * 分页查询角色列表
     * @param search
     * @return
     */
    LayuiTable queryListByPage(@Param("search") SearchRoleVo search);



    /**
     * 保存角色权限信息
     * @param role
     * @return
     */
    ResultVO saveRoleAuth(EditRoleVo role);


    /**
     * 获取所有 权限列表
     * @param authName
     * @return
     */
      List<AuthTrreVo> getAuthList(String authName, int dataType);

    /**
     * 获取角权限关系 根据角色Id和权限类别
     * @param dataType
     * @param roleId
     * @return
     */
    ResultVO getListAR(int dataType, String roleId);

    /**
     * 获取所有角色
     * @return
     */
      ResultVO getAllRole(String roleName);

    /**
     * 删除角色
     * @param roleId
     * @return
     */
     ResultVO deleteRole(String roleId);

}
