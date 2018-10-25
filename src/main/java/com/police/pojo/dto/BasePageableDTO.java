package com.police.pojo.dto;

import com.alibaba.fastjson.annotation.JSONField;
import com.police.common.constant.enumeration.SortOrder;
import org.apache.commons.lang3.EnumUtils;
import org.springframework.util.StringUtils;

public class BasePageableDTO {
	
	@JSONField(name = "page_no")
	private Integer pageNo;
	
	@JSONField(name = "page_size")
	private Integer pageSize;
	
	@JSONField(name = "sort_field")
	private String sortField;
	
	@JSONField(name = "sort_order")
	private String order;

	public int getPageStart(){
		return (getPageNo() - 1) * getPageSize();
	}

	public String getSortField() {
		return sortField;
	}

	public void setSortField(String sortField) {
		this.sortField = sortField;
	}

	public String getOrder() {
		if(StringUtils.isEmpty(order)){
			return SortOrder.DESC.name();
		}
		SortOrder sortOrder = EnumUtils.getEnum(SortOrder.class, order.toUpperCase());
		return null == sortOrder ? SortOrder.DESC.name() : sortOrder.name();
	}

	public void setOrder(String order) {
		this.order = order;
	}

	public Integer getPageNo() {
		return null == pageNo || pageNo < 1 ? 1 : pageNo;
	}

	public void setPageNo(int pageNo) {
		this.pageNo = pageNo;
	}

	public Integer getPageSize() {
		return null == pageSize || pageSize < 1 ? 10 : pageSize;
	}

	public void setPageSize(int pageSize) {
		this.pageSize = pageSize;
	}


}
