package com.xingHe.vo.userInfo;


import com.xingHe.entity.Authorities;
import lombok.Data;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@Data
public class UnionAuthVo implements Serializable {

    // 权限——用户Id
    private List<String> listUserId=new ArrayList <String>();
    // 权限——航线Id
    private List<String> listRouteId=new ArrayList <String>();
    // 权限——功能菜单和按钮
    private List<Authorities> listFun=new ArrayList <Authorities>();

    // 该用户拥有的所有角色Id
    private List<String> listRoleId=new ArrayList<String>();

    /**
     * 1或其它-否 2-是
     * 所有部门人员都可看
     */
    private Integer allUserAuth=1;


    /**
     * 1-管理员 2-其它
     */
    private int haveAdmin;



}
