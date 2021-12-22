package com.xingHe.entity;

import java.sql.*;

import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;
import org.apache.ibatis.type.JdbcType;
import java.io.Serializable;


/**
 * 公司信息 
 * compay_info entity.
 * @author EntityTool
 * @createdate 2021-06-03 15:09:46
 */
@TableName( "company_info")
@Data
public class CompanyInfo implements Serializable {
	/***
	 * 主键
	 * colTypes:varchar(30)
	 */
	private String id;
	/***
	 * 公司简介
	 * colTypes:varchar(4000)
	 */
	private String introduce;
	/***
	 * 公司名称
	 * colTypes:varchar(50)
	 */
	private String companyName;
	/***
	 * 公司地址
	 * colTypes:varchar(200)
	 */
	private String address;
	/***
	 * 公司电话
	 * colTypes:varchar(30)
	 */
	private String telephone;
	/***
	 * 企业邮箱
	 * colTypes:varchar(50)
	 */
	private String mail;
	/***
	 * 创建人名称
	 * colTypes:varchar(50)
	 */
	private String creator;
	/***
	 * 
	 * colTypes:varchar(50)
	 */
	private String createdby;
	/***
	 * 
	 * colTypes:datetime
	 */
	private Timestamp createdTime;
	/***
	 * 
	 * colTypes:varchar(50)
	 */
	private String updatedby;
	/***
	 * 
	 * colTypes:timestamp
	 */
	private Timestamp updatedTime;
	/***
	 * 1-未删除  0-删除
	 * colTypes:bit(1)
	 */
	private boolean status;

	public void setId(String id){
		this.id=id;
	}
	public String getId(){
		return id;
	}
	public void setIntroduce(String introduce){
		this.introduce=introduce;
	}
	public String getIntroduce(){
		return introduce;
	}
	public void setCompanyName(String companyName){
		this.companyName=companyName;
	}
	public String getCompanyName(){
		return companyName;
	}
	public void setAddress(String address){
		this.address=address;
	}
	public String getAddress(){
		return address;
	}
	public void setTelephone(String telephone){
		this.telephone=telephone;
	}
	public String getTelephone(){
		return telephone;
	}
	public void setMail(String mail){
		this.mail=mail;
	}
	public String getMail(){
		return mail;
	}
	public void setCreator(String creator){
		this.creator=creator;
	}
	public String getCreator(){
		return creator;
	}
	public void setCreatedby(String createdby){
		this.createdby=createdby;
	}
	public String getCreatedby(){
		return createdby;
	}
	public void setCreatedTime(Timestamp createdTime){
		this.createdTime=createdTime;
	}
	public Timestamp getCreatedTime(){
		return createdTime;
	}
	public void setUpdatedby(String updatedby){
		this.updatedby=updatedby;
	}
	public String getUpdatedby(){
		return updatedby;
	}
	public void setUpdatedTime(Timestamp updatedTime){
		this.updatedTime=updatedTime;
	}
	public Timestamp getUpdatedTime(){
		return updatedTime;
	}
	public void setStatus(boolean status){
		this.status=status;
	}
	public boolean getStatus(){
		return status;
	}
}

