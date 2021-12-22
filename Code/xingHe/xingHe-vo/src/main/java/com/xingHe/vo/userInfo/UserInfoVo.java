package com.xingHe.vo.userInfo;



import com.xingHe.entity.UserInfo;
import lombok.Data;

import java.io.Serializable;

/**
 * 用户所有权限项 authCategory：1-功能 2-航线 3-部门 4-人员
 */
@Data
public class UserInfoVo implements Serializable {

    public UserInfo userInfo;
//    public List<CustomerUser> company;


}
