package com.xingHe.vo.userInfo;

import lombok.Data;

import java.io.Serializable;

@Data
public class AgentInfos implements Serializable {
    private String AgentName;
    private String AgentId;
    private String AgentMobile;
    private String AgentIdFrontPath;
}
