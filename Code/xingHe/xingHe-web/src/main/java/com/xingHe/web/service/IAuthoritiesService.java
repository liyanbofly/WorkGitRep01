package com.xingHe.web.service;





import com.xingHe.entity.Authorities;
import com.xingHe.vo.ElaneUser;
import com.xingHe.vo.authorities.AuthoritiesTreeVo;

import java.util.List;

public interface IAuthoritiesService {

    /**
     * 查询当前登录用户分配的菜单
     *
     * @param currUser
     * @return
     */
    List<AuthoritiesTreeVo> getAllMenus(ElaneUser currUser);
    /**
     * 获取树形结构菜单
     *
     * @param list
     * @return
     */
    List<AuthoritiesTreeVo> convertMenuData(List<Authorities> list);

}
