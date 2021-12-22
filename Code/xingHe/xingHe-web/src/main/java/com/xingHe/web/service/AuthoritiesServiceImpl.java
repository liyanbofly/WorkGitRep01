package com.xingHe.web.service;


import com.xingHe.entity.Authorities;
import com.xingHe.vo.ElaneUser;
import com.xingHe.vo.authorities.AuthoritiesTreeVo;
import com.xingHe.web.dao.IAuthoritiesMapper;

import com.xingHe.web.utils.ObjectUtil;
import org.apache.commons.lang.StringUtils;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

@Service
public class AuthoritiesServiceImpl implements IAuthoritiesService {

    @Resource
    IAuthoritiesMapper iAuthoritiesMapper;

    @Override
    public List<AuthoritiesTreeVo> getAllMenus(ElaneUser currUser) {

        List<Authorities> list = iAuthoritiesMapper.getAllMenus(currUser);

        List<AuthoritiesTreeVo> result = convertMenuData(list);

        return result;
    }

    /**
     * 获取树形结构菜单
     *
     * @param list
     * @return
     */

    @Override
    public List<AuthoritiesTreeVo> convertMenuData(List<Authorities> list) {
        if (ObjectUtil.isNullOrEmpty(list)) {
            return null;
        }

        List<AuthoritiesTreeVo> treeVos = new ArrayList<>();
        AuthoritiesTreeVo vo = null;
        for (Authorities a : list) {
            if (StringUtils.isEmpty(a.getParentId())) {
                vo = new AuthoritiesTreeVo();
                BeanUtils.copyProperties(a, vo);

                List<AuthoritiesTreeVo> temp = getChildren(list, vo.getId());
                vo.setChildren(temp);

                if (ObjectUtil.isNullOrEmpty(temp)) {
                    vo.setLast(true);
                } else {
                    vo.setLast(false);
                }

                treeVos.add(vo);
            }
        }

        return treeVos;
    }

    /**
     * 获取子节点
     *
     * @param list
     * @param parentId 父id
     * @return
     */
    private List<AuthoritiesTreeVo> getChildren(List<Authorities> list, String parentId) {
        List<AuthoritiesTreeVo> result = new ArrayList<>();
        AuthoritiesTreeVo vo = null;
        for (Authorities a : list) {
            if (parentId.equals(a.getParentId())) {
                vo = new AuthoritiesTreeVo();
                BeanUtils.copyProperties(a, vo);

                List<AuthoritiesTreeVo> temp = getChildren(list, vo.getId());
                if (ObjectUtil.isNullOrEmpty(temp)) {
                    vo.setLast(true);
                } else {
                    if (a.getSort() != null) Collections.sort(temp, Comparator.comparing(AuthoritiesTreeVo::getSort));
                    vo.setLast(false);
                }

                vo.setChildren(temp);

                result.add(vo);
            }

        }
        return result;
    }
}
