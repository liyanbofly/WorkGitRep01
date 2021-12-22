package com.xingHe.vo.userInfo;
import com.xingHe.entity.UserInfo;
import lombok.Data;

import java.io.Serializable;

@Data
public class UserInfoLoginVo implements Serializable {
    /**
     * 是否是管理端用户 【1:是   0:否】
     */
    private Integer adminUserFlag;

    /**
     * 用户信息
     */
    private UserInfo userInfo;
}
