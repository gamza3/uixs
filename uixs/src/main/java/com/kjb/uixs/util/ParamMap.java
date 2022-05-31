package com.kjb.uixs.util;

import org.apache.commons.collections4.map.ListOrderedMap;
import org.springframework.jdbc.support.JdbcUtils;
import com.sun.tools.javac.util.StringUtils;


public class ParamMap extends ListOrderedMap {
	
	public Object put(Object key, Object value) {
        // StringUtils.lowerCase 로 key값을 소문자로 변경 (USER_NAME => user_name)
        // JdbcUtils.convertUnderscoreNameToPropertyName 로 key값을 camelCase로 변경 (user_name => userName)
        //return super.put(JdbcUtils.convertUnderscoreNameToPropertyName(StringUtils.toLowerCase((String) key)), value);
        return super.put(StringUtils.toLowerCase((String) key), value);
    }
}
