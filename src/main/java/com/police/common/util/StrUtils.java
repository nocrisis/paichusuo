package com.police.common.util;

import org.apache.commons.lang3.StringUtils;

import java.util.List;
import java.util.Objects;
import java.util.UUID;

public class StrUtils {

    /**
     * 获取唯一Id
     *
     * @return
     */
    public static String getUUID() {
        String uuid = UUID.randomUUID().toString();
        return uuid.toUpperCase().replace("-", "");
    }

    /**
     * 检查指定的字符串是否为空。
     * <ul>
     * <li>SysUtils.isEmpty(null) = true</li>
     * <li>SysUtils.isEmpty("") = true</li>
     * <li>SysUtils.isEmpty("   ") = true</li>
     * <li>SysUtils.isEmpty("abc") = false</li>
     * </ul>
     *
     * @param value 待检查的字符串
     * @return true/false
     */
    public static boolean isEmpty(String value) {
        int strLen;
        if (value == null || (strLen = value.length()) == 0
                || "null".equals(value)) {
            return true;
        }
        for (int i = 0; i < strLen; i++) {
            if ((Character.isWhitespace(value.charAt(i)) == false)) {
                return false;
            }
        }
        return true;
    }

    public static int occurTimes(String string, String a) {
        int pos = -2;
        int n = 0;
        while (pos != -1) {
            if (pos == -2) {
                pos = -1;
            }
            pos = string.indexOf(a, pos + 1);
            if (pos != -1) {
                n++;
            }
        }
        return n;
    }


    public static String checkIsNull(String s) {
        return Objects.isNull(s) ? "" : s;
    }

    public static String escapeSearchCharacter(String request) {
        if (StringUtils.isNotBlank(request)) {
            request = request.trim();
            request = request.replaceAll("\\\\", "\\\\\\\\");
            request = request.replaceAll("%", "\\\\%");
            request = request.replaceAll("_", "\\\\_");
        }
        return request;
    }

    public static String buildList2String(List<String> input) {
        StringBuilder sb = new StringBuilder();
        if (!input.isEmpty()) {
            for (int i = 0; i < input.size(); i++) {
                if (Objects.isNull(input.get(i))) {
                    continue;
                }
                if (i == input.size() - 1) {
                    sb.append(input.get(i));
                } else {
                    sb.append(input.get(i)).append(",");
                }
            }
        }
        return sb.toString();
    }

    public static String underscoreName(String camelCaseName) {
        StringBuilder result = new StringBuilder();
        if (camelCaseName != null && camelCaseName.length() > 0) {
            result.append(camelCaseName.substring(0, 1).toLowerCase());
            for (int i = 1; i < camelCaseName.length(); i++) {
                char ch = camelCaseName.charAt(i);
                if (Character.isUpperCase(ch)) {
                    result.append("_");
                    result.append(Character.toLowerCase(ch));
                } else {
                    result.append(ch);
                }
            }
        }
        return result.toString();
    }

    public static String hiddenPhoneNumber(String phoneNumber) {
        if(StringUtils.isEmpty(phoneNumber)) {
            return "";
        }
        return phoneNumber.replaceAll( "(\\d{3})\\d{4}(\\d{4})","$1****$2");
    }
}
