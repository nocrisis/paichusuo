package com.police.common.validation;

import org.apache.commons.lang3.StringUtils;
import org.springframework.util.CollectionUtils;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

public class ValidateResult implements Serializable {

	private static final long serialVersionUID = 1L;

	private static final String EMPTY_MESSAGE = "";
	private static final String DEFAULT_MSG_SEPERATOR = ",";
	private List<String> messages = new ArrayList<>();

	public void addErrorMessage(String msg) {
		this.messages.add(msg);
	}

	public boolean hasError() {
		return !CollectionUtils.isEmpty(messages);
	}

	public String getErrorMessages() {
		if (!hasError()) {
			return EMPTY_MESSAGE;
		}
		return StringUtils.join(messages, DEFAULT_MSG_SEPERATOR);
	}

}
