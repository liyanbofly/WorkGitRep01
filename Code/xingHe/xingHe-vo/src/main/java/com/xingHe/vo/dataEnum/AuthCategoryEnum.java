package com.xingHe.vo.dataEnum;

    public enum AuthCategoryEnum {
        //操作名称：  功能权限、数据权限、管理权限-部门、管理权限-用户
        FunAuth(1, "功能权限"), Route(2, "数据权限"), Depar(3, "管理权限-部门"), UserI(4, "管理权限-用户");

        private Integer value;
        private String describe;

        public Integer getValue() {
            return value;
        }

        public void setValue(Integer value) {
            this.value = value;
        }

        public String getDescribe() {
            return describe;
        }

        public void setDescribe(String describe) {
            this.describe = describe;
        }

        AuthCategoryEnum(Integer value, String describe) {
            this.value = value;
            this.describe = describe;
        }
    }
